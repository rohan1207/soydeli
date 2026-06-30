import express from 'express';
import { getMenu, addMenuItem, updateMenuItem, deleteMenuItem } from '../controllers/menuController.js';
import { protectAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// @route   GET /api/menu
router.route('/').get(getMenu);
router.post('/item', protectAdmin, addMenuItem);
router.put('/item/:sku', protectAdmin, updateMenuItem);
router.delete('/item/:sku', protectAdmin, deleteMenuItem);

export default router;
