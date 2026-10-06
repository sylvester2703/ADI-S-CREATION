import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import rateLimit from 'express-rate-limit';

import './db.js'; // initialize db and admin security hash
import enquiriesRouter from './routes/enquiries.js';
import adminRouter from './routes/admin.js';
import productsRouter from './routes/products.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Trust reverse proxy if behind one
app.set('trust proxy', 1);

// Middleware
app.use(cors({
  origin: true,
  credentials: true
}));
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true, limit: '2mb' }));

// Global Rate Limiter for enquiry endpoints to prevent spam
const enquiryLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 30, // max 30 enquiries per 15 min per IP
  message: { success: false, error: 'Too many submissions from this IP, please try again in 15 minutes.' },
  standardHeaders: true,
  legacyHeaders: false,
});

// Routes
app.use('/api/enquiries', enquiryLimiter, enquiriesRouter);
app.use('/api/admin', adminRouter);
app.use('/api/brochure', productsRouter);

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    brand: 'Adi’s Creation – Lights n Lamps',
    collection: 'Diya Collection 2026',
    timestamp: new Date().toISOString()
  });
});

// Serve static assets in production if built
const distPath = path.join(__dirname, '../dist');
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  app.get('*', (req, res) => {
    if (!req.path.startsWith('/api')) {
      res.sendFile(path.join(distPath, 'index.html'));
    }
  });
}

app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`✨ ADI’S CREATION – Lights n Lamps (Diya Collection 2026)`);
  console.log(`🚀 Production Server running on port ${PORT}`);
  console.log(`🔒 Admin authentication secured with bcrypt & JWT`);
  console.log(`====================================================`);
});
