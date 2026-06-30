import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  orderItems: [
    {
      name: { type: String, required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
      sku: { type: String, required: true },
    },
  ],
  shippingAddress: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Address',
  },
  paymentMethod: {
    type: String,
    required: true,
    default: 'Razorpay',
  },
  paymentResult: {
    razorpay_order_id: { type: String },
    razorpay_payment_id: { type: String },
    razorpay_signature: { type: String },
  },
  totalPrice: {
    type: Number,
    required: true,
    default: 0.0,
  },
  isPaid: {
    type: Boolean,
    required: true,
    default: false,
  },
  paidAt: {
    type: Date,
  },
  orderStatus: {
    type: String,
    required: true,
    default: 'Pending',
    enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
  },
  status: {
    type: String,
    required: true,
    default: 'PAYMENT_PENDING',
    enum: ['PAYMENT_PENDING', 'CONFIRMED', 'FAILED'],
  },
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);

export default Order;
