import jwt from 'jsonwebtoken';
import DeliveryBoy from '../models/deliveryBoyModel.js';

export const protectDeliveryBoy = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.deliveryBoy = await DeliveryBoy.findById(decoded.id).select('-password');
      if (!req.deliveryBoy) {
        return res.status(401).json({ message: 'Delivery boy not found' });
      }
      next();
    } catch (error) {
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};
