import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import Admin from '../models/adminModel.js';

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from the token
      req.user = await User.findById(decoded.id).select('-password');

      if (!req.user) {
        res.status(401).json({ message: 'User not found' });
        return;
      }

      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Not authorized, token failed' });
      return;
    }
  }

  // Fallback: token via query param (SSE/EventSource cannot set headers)
  if (!token && req.query && req.query.token) {
    try {
      token = req.query.token;
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password');
      if (!req.user) {
        return res.status(401).json({ message: 'User not found' });
      }
      return next();
    } catch (e) {
      return res.status(401).json({ message: 'Not authorized, token invalid' });
    }
  }
  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }
};

// Admin protect: validates token against Admin collection
const protectAdmin = async (req, res, next) => {
  let token;
  if (req.headers.authorization?.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const admin = await Admin.findById(decoded.id).select('-password');
      if (!admin) {
        return res.status(401).json({ message: 'Admin not found' });
      }
      req.admin = admin; // keep separate from req.user
      return next();
    } catch (err) {
      console.error('Admin auth error:', err.message);
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }
  return res.status(401).json({ message: 'Not authorized, no token' });
};

// Generic user admin flag check (for legacy user-based admin system)
const admin = (req, res, next) => {
  if ((req.user && req.user.isAdmin) || req.admin) {
    return next();
  }
  return res.status(401).json({ message: 'Not authorized as admin' });
};

export { protect, admin, protectAdmin };
