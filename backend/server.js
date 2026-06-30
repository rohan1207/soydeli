import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Import the Menu model
import menuRoutes from './routes/menuRoutes.js';
import userRoutes from './routes/userRoutes.js';
import addressRoutes from './routes/addressRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import deliveryRoutes from './routes/deliveryRoutes.js';

// --- Configuration ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '.env') });

// --- App Initialization ---
const app = express();
const PORT = process.env.PORT || 5000;

// --- Middleware ---
// CORS Allowed Origins (hardcoded as requested)
// Raw entries may include trailing slashes or paths; they are normalized to scheme+host(+port)
let rawAllowedOrigins = [
  'https://viransh-adminpanel.onrender.com/',
  'https://viransh-1.onrender.com/menu',
  'https://viransh-deliverypanel.onrender.com'
];
// Add local dev origins automatically when not in production
if (process.env.NODE_ENV !== 'production') {
  rawAllowedOrigins = rawAllowedOrigins.concat([
    'http://localhost:5173',
    'http://localhost:5174'
  ]);
}
const whitelist = rawAllowedOrigins.map(entry => {
  try {
    const url = new URL(entry);
    return url.origin; // strips path/query
  } catch (e) {
    console.warn('Skipping invalid CORS origin entry:', entry, e.message);
    return null;
  }
}).filter(Boolean);

// Helper to determine if origin matches whitelist entry (supports regex with prefix 're:')
function originAllowed(origin) {
  if (whitelist.length === 0) return true; // open if none specified
  const normalized = origin.replace(/\/$/, '');
  return whitelist.some(entry => {
    if (entry.startsWith('re:')) {
      try {
        const pattern = new RegExp(entry.slice(3));
        return pattern.test(origin);
      } catch (e) {
        console.warn('Invalid CORS regex pattern:', entry, e.message);
        return false;
      }
    }
    return entry === normalized;
  });
}

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true); // server-to-server or same-origin
    if (originAllowed(origin)) return callback(null, true);
    console.warn(`CORS blocked origin: ${origin}`);
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  methods: ['GET','POST','PUT','PATCH','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization']
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // preflight
app.use(express.json({ limit: '1mb' }));

console.log('CORS whitelist (hardcoded, normalized):', whitelist);

// --- Database Connection ---
const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI not found in .env file.');
    }
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: 'viransh-restaurant'
    });
    console.log('✅ Successfully connected to MongoDB.');
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    // Exit process with failure
    process.exit(1);
  }
};

// --- API Routes ---
app.get('/api/health', (req,res)=>{
  res.json({ ok: true, uptime: process.uptime(), timestamp: Date.now() });
});

// Wrap route mounting in try/catch to surface any path-to-regexp issues with more context
function safeMount(pathBase, router) {
  try {
    app.use(pathBase, router);
  } catch (e) {
    console.error(`Failed mounting router at '${pathBase}':`, e);
    throw e;
  }
}

safeMount('/api/menu', menuRoutes);
safeMount('/api/users', userRoutes);
safeMount('/api/address', addressRoutes);
safeMount('/api/orders', orderRoutes);
safeMount('/api/cart', cartRoutes);
safeMount('/api/admin', adminRoutes);
safeMount('/api/delivery', deliveryRoutes);

// Optional route diagnostics
if (process.env.DIAG_ROUTES) {
  const list = [];
  app._router.stack.forEach(mw => {
    if (mw.route && mw.route.path) {
      Object.keys(mw.route.methods).forEach(method => {
        list.push(`${method.toUpperCase()} ${mw.route.path}`);
      });
    } else if (mw.name === 'router' && mw.handle.stack) {
      mw.handle.stack.forEach(handler => {
        if (handler.route) {
          Object.keys(handler.route.methods).forEach(method => {
            list.push(`${method.toUpperCase()} ${handler.route.path}`);
          });
        }
      });
    }
  });
  console.log('Registered routes (diagnostic):');
  list.sort().forEach(r => console.log('  ', r));
}

// CORS error handler to return 403 instead of crashing
app.use((err, req, res, next) => {
  if (err && err.message === 'Not allowed by CORS') {
    return res.status(403).json({ error: 'CORS blocked', origin: req.headers.origin });
  }
  next(err);
});

// --- Start Server ---
const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
  });
};

startServer();