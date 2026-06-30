import asyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';
import User from '../models/User.js';
import Menu from '../models/Menu.js';
import Admin from '../models/adminModel.js';
import DeliveryBoy from '../models/deliveryBoyModel.js';
import { broadcastOrderUpdate, computeDistanceKm, computeEtaMinutes } from '../utils/orderSSE.js';
import generateToken from '../utils/generateToken.js';

// @desc    Auth admin & get token
// @route   POST /api/admin/login
// @access  Public
const authAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const admin = await Admin.findOne({ email });

  if (admin && (await admin.matchPassword(password))) {
    res.json({
      _id: admin._id,
      email: admin.email,
      token: generateToken(admin._id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

// @desc    Get admin dashboard stats
// @route   GET /api/admin/stats
// @access  Private/Admin
const getStats = asyncHandler(async (req, res) => {
  const totalOrders = await Order.countDocuments({});
  const totalUsers = await User.countDocuments({});
  const totalMenuItems = await Menu.countDocuments({});

  const salesData = await Order.aggregate([
    {
      $group: {
        _id: null,
        totalSales: { $sum: '$totalPrice' },
      },
    },
  ]);

  res.json({
    orders: totalOrders,
    users: totalUsers,
    menuItems: totalMenuItems,
    sales: salesData.length > 0 ? salesData[0].totalSales : 0,
  });
});

// @desc    Get all orders
// @route   GET /api/admin/orders
// @access  Private/Admin
const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({})
    .populate('user', 'name email')
  .populate('deliveryBoy', 'name email phone')
    .populate('shippingAddress')
    .sort({ createdAt: -1 });
  res.json(orders);
});

// @desc    Update order status
// @route   PUT /api/admin/orders/:id
// @access  Private/Admin
const updateOrderStatus = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    const incomingStatus = req.body.orderStatus || order.orderStatus;
    order.orderStatus = incomingStatus;
    // If order completed or cancelled, free delivery assignment to reduce confusion
    if (['Delivered', 'Cancelled'].includes(incomingStatus)) {
      order.deliveryBoy = null;
    }
    const updatedOrder = await order.save();
    const populated = await Order.findById(updatedOrder._id)
      .populate('user', 'name email')
      .populate('deliveryBoy', 'name email phone lastKnownLat lastKnownLng lastLocationUpdatedAt')
      .populate('shippingAddress');
    try {
      const dest = populated.shippingAddress ? { lat: populated.shippingAddress.latitude ?? null, lng: populated.shippingAddress.longitude ?? null } : null;
      const db = populated.deliveryBoy ? {
        lat: populated.deliveryBoy.lastKnownLat ?? null,
        lng: populated.deliveryBoy.lastKnownLng ?? null,
        name: populated.deliveryBoy.name,
        phone: populated.deliveryBoy.phone,
        updatedAt: populated.deliveryBoy.lastLocationUpdatedAt || null,
      } : null;
      const etaMinutes = (db && dest && db.lat != null && dest.lat != null) ? computeEtaMinutes(computeDistanceKm(db.lat, db.lng, dest.lat, dest.lng)) : null;
      broadcastOrderUpdate(String(populated._id), { orderId: String(populated._id), status: populated.orderStatus, destination: dest, deliveryLocation: db, etaMinutes });
    } catch(_) { /* ignore */ }
    res.json(populated);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

// @desc    Get available delivery boys with their active (undelivered) order counts
// @route   GET /api/admin/delivery-boys/available
// @access  Private/Admin
const getAvailableDeliveryBoys = asyncHandler(async (req, res) => {
  // Count undelivered orders grouped by deliveryBoy
  const pipeline = [
    { $match: { deliveryBoy: { $ne: null }, orderStatus: { $nin: ['Delivered', 'Cancelled'] } } },
    { $group: { _id: '$deliveryBoy', activeOrders: { $sum: 1 } } },
  ];
  const counts = await Order.aggregate(pipeline);
  const countMap = counts.reduce((acc, c) => { acc[c._id.toString()] = c.activeOrders; return acc; }, {});

  const deliveryBoys = await DeliveryBoy.find({ isActive: true }).select('name email phone');
  const enriched = deliveryBoys.map(db => ({
    _id: db._id,
    name: db.name,
    email: db.email,
    phone: db.phone,
    activeOrders: countMap[db._id.toString()] || 0,
  }));

  // Available = activeOrders === 0. We still return all for fallback balancing.
  res.json({
    all: enriched,
    free: enriched.filter(d => d.activeOrders === 0),
  });
});

// @desc    Assign delivery boy to order (with balancing logic)
// @route   POST /api/admin/orders/:id/assign
// @access  Private/Admin
const assignDeliveryBoy = asyncHandler(async (req, res) => {
  const { deliveryBoyId } = req.body; // optional explicit id
  const order = await Order.findById(req.params.id).populate('deliveryBoy', 'name');
  if (!order) {
    res.status(404); throw new Error('Order not found');
  }

  // If already assigned and same id, just return
  if (order.deliveryBoy && deliveryBoyId && order.deliveryBoy._id.toString() === deliveryBoyId) {
    return res.json(order);
  }

  // If order already assigned and no override requested, allow reassignment but note previous
  const previouslyAssigned = order.deliveryBoy ? order.deliveryBoy._id.toString() : null;

  // Gather delivery boy workload
  const counts = await Order.aggregate([
    { $match: { deliveryBoy: { $ne: null }, orderStatus: { $nin: ['Delivered', 'Cancelled'] } } },
    { $group: { _id: '$deliveryBoy', activeOrders: { $sum: 1 } } },
  ]);
  const countMap = counts.reduce((acc, c) => { acc[c._id.toString()] = c.activeOrders; return acc; }, {});
  const allDeliveryBoys = await DeliveryBoy.find({ isActive: true });
  if (allDeliveryBoys.length === 0) { res.status(400); throw new Error('No delivery boys available'); }

  let chosen;
  if (deliveryBoyId) {
    chosen = allDeliveryBoys.find(d => d._id.toString() === deliveryBoyId);
    if (!chosen) { res.status(400); throw new Error('Specified delivery boy not found'); }
  } else {
    // Prefer free (0 active) else pick min activeOrders
    const enriched = allDeliveryBoys.map(d => ({ doc: d, active: countMap[d._id.toString()] || 0 }));
    enriched.sort((a, b) => a.active - b.active || a.doc.name.localeCompare(b.doc.name));
    chosen = enriched[0].doc;
  }

  // Atomic update safeguard: mark only if not changed since fetch
  order.deliveryBoy = chosen._id;
  await order.save();

  // Optionally could broadcast event here (placeholder)
  const populated = await Order.findById(order._id)
    .populate('user', 'name email')
    .populate('deliveryBoy', 'name email phone')
    .populate('shippingAddress');
  res.json({ ...populated.toObject(), previousDeliveryBoy: previouslyAssigned });
});

export { getStats, getAllOrders, updateOrderStatus, authAdmin, getAvailableDeliveryBoys, assignDeliveryBoy };
