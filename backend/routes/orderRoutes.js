import express from 'express';
import { getMyOrders, createPaymentIntent, verifyPaymentAndCreateOrder, getOrderTracking, streamOrderTracking, updateOrderLocation } from '../controllers/orderController.js';
import { protectDeliveryBoy } from '../middleware/deliveryAuthMiddleware.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/create-payment').post(protect, createPaymentIntent);
router.route('/verify-payment').post(protect, verifyPaymentAndCreateOrder);
router.route('/myorders').get(protect, getMyOrders);
router.route('/:id/tracking').get(protect, getOrderTracking);
router.route('/:id/stream').get(protect, streamOrderTracking);
// TODO: add deliveryBoyProtect middleware once implemented for delivery boy auth
router.route('/:id/update-location').post(protectDeliveryBoy, updateOrderLocation);

export default router;
