import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// GET /api/brochure/download - Download original PDF
router.get('/download', (req, res) => {
  const pdfPath = path.join(__dirname, '../../public/assets/brochure/Adis_Creation_Diya_Collection_2026.pdf');
  if (fs.existsSync(pdfPath)) {
    return res.download(pdfPath, 'Adis_Creation_Diya_Collection_2026.pdf');
  }
  return res.status(404).json({ success: false, error: 'Brochure PDF file not found' });
});

export default router;
