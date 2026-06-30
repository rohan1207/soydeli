import express from 'express';
import { getCart, addToCart, updateCart, clearCart, mergeCart } from '../controllers/cartController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(protect, getCart)
  .post(protect, addToCart);

router.route('/update')
  .put(protect, updateCart);

router.route('/clear')
  .delete(protect, clearCart);

router.route('/merge')
  .post(protect, mergeCart);

export default router;
