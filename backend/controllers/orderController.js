import asyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';
import DeliveryBoy from '../models/deliveryBoyModel.js';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import Transaction from '../models/transactionModel.js';
import { addOrderWatcher, removeOrderWatcher, broadcastOrderUpdate, computeDistanceKm, computeEtaMinutes } from '../utils/orderSSE.js';

// @desc    Create Razorpay order for payment
// @route   POST /api/orders/create-payment
// @access  Private
const createPaymentIntent = asyncHandler(async (req, res) => {
  const { totalPrice } = req.body;

  if (!totalPrice || totalPrice <= 0) {
    res.status(400);
    throw new Error('Invalid total price');
  }

  // Create Razorpay order
  const instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });

  const options = {
    amount: Math.round(totalPrice * 100), // amount in smallest currency unit (paise)
    currency: 'INR',
    receipt: `receipt_order_${Date.now()}`,
  };

  try {
    const razorpayOrder = await instance.orders.create(options);
    // We only send back the razorpay order details, no local order is created yet
    res.status(201).json({ razorpayOrder });
  } catch (error) {
    res.status(500);
    throw new Error('Failed to create Razorpay order');
  }
});

// @desc    Verify payment and create order
// @route   POST /api/orders/verify-payment
// @access  Private
const verifyPaymentAndCreateOrder = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    totalPrice,
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
  } = req.body;

  const body = razorpay_order_id + '|' + razorpay_payment_id;
  const expectedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    .update(body.toString())
    .digest('hex');

  if (expectedSignature !== razorpay_signature) {
    res.status(400).json({ success: false, message: 'Payment verification failed' });
    return;
  }

  // If payment is verified, create the order and transaction
  const order = new Order({
    orderItems,
    user: req.user._id,
    shippingAddress: shippingAddress._id,
    paymentMethod: 'Razorpay',
    totalPrice,
    isPaid: true,
    paidAt: Date.now(),
    status: 'CONFIRMED',
    paymentResult: {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    },
  });

  const createdOrder = await order.save();

  const transaction = new Transaction({
    user: req.user._id,
    order: createdOrder._id,
    amount: -totalPrice,
    paymentId: razorpay_payment_id,
    description: `Order #${createdOrder._id}`,
    status: 'Completed',
  });

  await transaction.save();

  res.status(201).json({ success: true, order: createdOrder });
});

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).populate('shippingAddress', 'street city state postalCode country phone');
  res.json(orders);
});

// @desc    Get tracking info for a specific order (user only)
// @route   GET /api/orders/:id/tracking
// @access  Private
const getOrderTracking = asyncHandler(async (req, res) => {
  const order = await Order.findOne({ _id: req.params.id, user: req.user._id })
    .populate('shippingAddress')
    .populate('deliveryBoy', 'name email phone lastKnownLat lastKnownLng lastLocationUpdatedAt');
  if (!order) {
    res.status(404); throw new Error('Order not found');
  }
  const destination = order.shippingAddress ? {
    lat: order.shippingAddress.latitude || null,
    lng: order.shippingAddress.longitude || null,
  } : null;
  // Delivery boy location placeholder (needs live tracking integration)
  let deliveryLocation = null;
  if (order.deliveryBoy) {
    // In future store lastKnownLat/Long in DeliveryBoy model; for now null
    deliveryLocation = {
  lat: order.deliveryBoy.lastKnownLat ?? null,
  lng: order.deliveryBoy.lastKnownLng ?? null,
      name: order.deliveryBoy.name,
      phone: order.deliveryBoy.phone,
  updatedAt: order.deliveryBoy.lastLocationUpdatedAt || null,
    };
  }
  res.json({
    orderId: order._id,
    status: order.orderStatus,
    deliveryBoy: order.deliveryBoy ? { name: order.deliveryBoy.name, phone: order.deliveryBoy.phone } : null,
    destination,
    deliveryLocation,
    etaMinutes: (deliveryLocation && destination && deliveryLocation.lat != null && destination.lat != null)
      ? computeEtaMinutes(computeDistanceKm(deliveryLocation.lat, deliveryLocation.lng, destination.lat, destination.lng))
      : null,
  });
});

// @desc    SSE stream for real-time tracking
// @route   GET /api/orders/:id/stream
// @access  Private (User)
const streamOrderTracking = asyncHandler(async (req, res) => {
  const order = await Order.findOne({ _id: req.params.id, user: req.user._id })
    .populate('shippingAddress')
    .populate('deliveryBoy', 'name phone lastKnownLat lastKnownLng lastLocationUpdatedAt orderStatus');
  if (!order) { res.status(404); throw new Error('Order not found'); }
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    Connection: 'keep-alive',
  });
  res.write('\n');
  const orderId = String(order._id);
  addOrderWatcher(orderId, res);
  req.on('close', () => removeOrderWatcher(orderId, res));
  // Send initial snapshot
  const destination = order.shippingAddress ? { lat: order.shippingAddress.latitude ?? null, lng: order.shippingAddress.longitude ?? null } : null;
  const deliveryLocation = order.deliveryBoy ? {
    lat: order.deliveryBoy.lastKnownLat ?? null,
    lng: order.deliveryBoy.lastKnownLng ?? null,
    name: order.deliveryBoy.name,
    phone: order.deliveryBoy.phone,
    updatedAt: order.deliveryBoy.lastLocationUpdatedAt || null,
  } : null;
  const etaMinutes = (deliveryLocation && destination && deliveryLocation.lat != null && destination.lat != null) ?
    computeEtaMinutes(computeDistanceKm(deliveryLocation.lat, deliveryLocation.lng, destination.lat, destination.lng)) : null;
  res.write(`data: ${JSON.stringify({ orderId, status: order.orderStatus, destination, deliveryLocation, etaMinutes })}\n\n`);
});

// @desc    Delivery boy updates current location for an order they are delivering
// @route   POST /api/orders/:id/update-location
// @access  Private (Delivery Boy)
const updateOrderLocation = asyncHandler(async (req, res) => {
  const { latitude, longitude } = req.body;
  if (typeof latitude !== 'number' || typeof longitude !== 'number') {
    res.status(400); throw new Error('Latitude and longitude are required numbers');
  }
  const order = await Order.findById(req.params.id);
  if (!order) { res.status(404); throw new Error('Order not found'); }
  // Expect delivery boy middleware to attach req.deliveryBoy
  if (!order.deliveryBoy || String(order.deliveryBoy) !== String(req.deliveryBoy?._id)) {
    res.status(403); throw new Error('Not authorized to update location for this order');
  }
  const deliveryBoy = await DeliveryBoy.findById(req.deliveryBoy._id);
  if (!deliveryBoy) { res.status(404); throw new Error('Delivery boy not found'); }
  deliveryBoy.lastKnownLat = latitude;
  deliveryBoy.lastKnownLng = longitude;
  deliveryBoy.lastLocationUpdatedAt = new Date();
  await deliveryBoy.save();
  await deliveryBoy.save();
  // Broadcast to watchers if any orders assigned to this delivery boy are active and match this order
  const destination = null; // we don't have order loaded here beyond id, fetch minimal for broadcast
  try {
    const orderFull = await Order.findById(order._id).populate('shippingAddress');
    const dest = orderFull?.shippingAddress ? { lat: orderFull.shippingAddress.latitude ?? null, lng: orderFull.shippingAddress.longitude ?? null } : null;
    const dl = { lat: deliveryBoy.lastKnownLat, lng: deliveryBoy.lastKnownLng, name: deliveryBoy.name, phone: deliveryBoy.phone, updatedAt: deliveryBoy.lastLocationUpdatedAt };
    const etaMinutes = (dl && dest && dl.lat != null && dest?.lat != null) ? computeEtaMinutes(computeDistanceKm(dl.lat, dl.lng, dest.lat, dest.lng)) : null;
    broadcastOrderUpdate(String(order._id), { orderId: String(order._id), status: orderFull.orderStatus, destination: dest, deliveryLocation: dl, etaMinutes });
  } catch (_) { /* ignore */ }
  res.json({ success: true });
});

export { getMyOrders, createPaymentIntent, verifyPaymentAndCreateOrder, getOrderTracking, streamOrderTracking, updateOrderLocation };
