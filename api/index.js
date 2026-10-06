import express from 'express';
import cors from 'cors';

import '../server/db.js';
import enquiriesRouter from '../server/routes/enquiries.js';
import adminRouter from '../server/routes/admin.js';
import productsRouter from '../server/routes/products.js';

const app = express();

app.set('trust proxy', 1);

app.use(cors({
  origin: true,
  credentials: true
}));
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true, limit: '2mb' }));

app.use('/api/enquiries', enquiriesRouter);
app.use('/api/admin', adminRouter);
app.use('/api/brochure', productsRouter);

app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    brand: 'Adi’s Creation – Lights n Lamps',
    collection: 'Diya Collection 2026',
    platform: 'Vercel Serverless',
    timestamp: new Date().toISOString()
  });
});

export default app;
