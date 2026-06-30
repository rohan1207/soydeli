import express from 'express';
import { addAddress, getAddresses } from '../controllers/addressController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(protect, addAddress).get(protect, getAddresses);

export default router;
