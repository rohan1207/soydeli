import express from 'express';
import {
  getStats,
  getAllOrders,
  updateOrderStatus,
  authAdmin,
  getAvailableDeliveryBoys,
  assignDeliveryBoy,
} from '../controllers/adminController.js';
import { protectAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/login', authAdmin);
router.route('/stats').get(protectAdmin, getStats);
router.route('/orders').get(protectAdmin, getAllOrders);
router.route('/orders/:id').put(protectAdmin, updateOrderStatus);
router.route('/delivery-boys/available').get(protectAdmin, getAvailableDeliveryBoys);
router.route('/orders/:id/assign').post(protectAdmin, assignDeliveryBoy);

export default router;
