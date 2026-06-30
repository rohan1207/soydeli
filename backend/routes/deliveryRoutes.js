import express from 'express';
import {
  authDeliveryBoy,
  getAssignedOrders,
  updateOrderStatus,
  updateDeliveryLocation,
} from '../controllers/deliveryController.js';
import { protectDeliveryBoy } from '../middleware/deliveryAuthMiddleware.js';

const router = express.Router();

router.post('/login', authDeliveryBoy);
router.get('/orders', protectDeliveryBoy, getAssignedOrders);
router.put('/orders/:id', protectDeliveryBoy, updateOrderStatus);
router.post('/location', protectDeliveryBoy, updateDeliveryLocation);

export default router;
