import asyncHandler from 'express-async-handler';
import DeliveryBoy from '../models/deliveryBoyModel.js';
import Order from '../models/orderModel.js';
import { broadcastOrderUpdate, computeDistanceKm, computeEtaMinutes } from '../utils/orderSSE.js';
import generateToken from '../utils/generateToken.js';

// @desc    Auth delivery boy & get token
// @route   POST /api/delivery/login
// @access  Public
const authDeliveryBoy = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const deliveryBoy = await DeliveryBoy.findOne({ email });

  if (deliveryBoy && (await deliveryBoy.matchPassword(password))) {
    res.json({
      _id: deliveryBoy._id,
      name: deliveryBoy.name,
      email: deliveryBoy.email,
      phone: deliveryBoy.phone,
      token: generateToken(deliveryBoy._id),
    });
  } else {
    res.status(401).json({ message: 'Invalid email or password' });
  }
});

// @desc    Get ONLY orders assigned to the authenticated delivery boy that are still active
// @route   GET /api/delivery/orders
// @access  Private/DeliveryBoy
const getAssignedOrders = asyncHandler(async (req, res) => {
  const deliveryBoyId = req.deliveryBoy._id;
  const activeStatuses = ['Processing', 'Shipped'];
  const orders = await Order.find({
    deliveryBoy: deliveryBoyId,
    orderStatus: { $in: activeStatuses },
  })
    .populate('user', 'name')
    .populate('shippingAddress')
    .sort({ createdAt: -1 });
  res.json(orders);
});

// @desc    Update order status by delivery boy
// @route   PUT /api/delivery/orders/:id
// @access  Private/DeliveryBoy
const updateOrderStatus = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  const { orderStatus } = req.body;

  if (order) {
    // Delivery boys should only be able to mark as Shipped or Delivered
    if (orderStatus === 'Shipped' || orderStatus === 'Delivered') {
      order.orderStatus = orderStatus;
      const updatedOrder = await order.save();
      const populated = await Order.findById(updatedOrder._id)
        .populate('deliveryBoy', 'name phone lastKnownLat lastKnownLng lastLocationUpdatedAt')
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
      res.status(400).json({ message: 'Invalid status update' });
    }
  } else {
    res.status(404).json({ message: 'Order not found' });
  }
});

// @desc    Update delivery boy live location (independent of specific order)
// @route   POST /api/delivery/location
// @access  Private/DeliveryBoy
const updateDeliveryLocation = asyncHandler(async (req, res) => {
  const { latitude, longitude } = req.body;
  if (typeof latitude !== 'number' || typeof longitude !== 'number') {
    res.status(400).json({ message: 'Latitude and longitude required' });
    return;
  }
  const deliveryBoy = await DeliveryBoy.findById(req.deliveryBoy._id);
  if (!deliveryBoy) {
    res.status(404).json({ message: 'Delivery boy not found' });
    return;
  }
  deliveryBoy.lastKnownLat = latitude;
  deliveryBoy.lastKnownLng = longitude;
  deliveryBoy.lastLocationUpdatedAt = new Date();
  await deliveryBoy.save();
  res.json({ success: true });
});

export { authDeliveryBoy, getAssignedOrders, updateOrderStatus, updateDeliveryLocation };
