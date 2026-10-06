import express from 'express';
import { db, generateReferenceNumber } from '../db.js';

const router = express.Router();

// POST /api/enquiries - Public Enquiry Submission
router.post('/', (req, res) => {
  try {
    const {
      name,
      phone,
      email,
      city,
      state = '',
      country = 'India',
      productName,
      productSlug = '',
      quantity,
      deliveryPreference,
      preferredContact = 'WhatsApp',
      message = ''
    } = req.body;

    // Server-side validations
    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return res.status(400).json({ success: false, error: 'Please enter a valid full name.' });
    }

    if (!phone || typeof phone !== 'string' || phone.replace(/\D/g, '').length < 7) {
      return res.status(400).json({ success: false, error: 'Please enter a valid contact phone number.' });
    }

    if (!email || !email.includes('@') || !email.includes('.')) {
      return res.status(400).json({ success: false, error: 'Please enter a valid email address.' });
    }

    if (!city || typeof city !== 'string' || city.trim().length < 2) {
      return res.status(400).json({ success: false, error: 'Please provide your city.' });
    }

    if (!productName || typeof productName !== 'string') {
      return res.status(400).json({ success: false, error: 'Please select or specify the product(s) interested in.' });
    }

    const parsedQty = parseInt(quantity, 10);
    if (isNaN(parsedQty) || parsedQty < 1) {
      return res.status(400).json({ success: false, error: 'Quantity must be a valid positive number.' });
    }

    if (!deliveryPreference) {
      return res.status(400).json({ success: false, error: 'Please choose your delivery preference.' });
    }

    const referenceNumber = generateReferenceNumber();
    const now = new Date().toISOString();

    const insertStmt = db.prepare(`
      INSERT INTO enquiries (
        reference_number, name, phone, email, city, state, country,
        product_name, product_slug, quantity, delivery_preference,
        preferred_contact, message, status, created_at, updated_at
      ) VALUES (
        ?, ?, ?, ?, ?, ?, ?,
        ?, ?, ?, ?,
        ?, ?, 'NEW', ?, ?
      )
    `);

    const result = insertStmt.run(
      referenceNumber,
      name.trim(),
      phone.trim(),
      email.trim().toLowerCase(),
      city.trim(),
      (state || '').trim(),
      (country || 'India').trim(),
      productName.trim(),
      productSlug.trim(),
      parsedQty,
      deliveryPreference,
      preferredContact,
      (message || '').trim(),
      now,
      now
    );

    const enquiryId = result.lastInsertRowid;

    // Log Activity
    db.prepare(`
      INSERT INTO activity_logs (enquiry_id, action, details, timestamp)
      VALUES (?, ?, ?, ?)
    `).run(
      enquiryId,
      'Enquiry Received',
      `Enquiry submitted online for ${productName} (Qty: ${parsedQty}, Delivery: ${deliveryPreference})`,
      now
    );

    return res.status(201).json({
      success: true,
      message: 'Thank you! Your enquiry has been received successfully.',
      referenceNumber,
      enquiry: {
        referenceNumber,
        name: name.trim(),
        productName: productName.trim(),
        quantity: parsedQty,
        deliveryPreference,
        createdAt: now
      }
    });
  } catch (error) {
    console.error('Error in POST /api/enquiries:', error);
    return res.status(500).json({ success: false, error: 'Failed to process enquiry. Please try again or call us directly.' });
  }
});

// GET /api/enquiries/track/:ref - Public Tracking of own enquiry by reference code
router.get('/track/:ref', (req, res) => {
  try {
    const { ref } = req.params;
    if (!ref) {
      return res.status(400).json({ success: false, error: 'Reference number is required' });
    }

    const lead = db.prepare(`
      SELECT reference_number, name, product_name, quantity, delivery_preference, status, created_at
      FROM enquiries
      WHERE reference_number = ?
    `).get(ref.toUpperCase());

    if (!lead) {
      return res.status(404).json({ success: false, error: 'Enquiry not found. Please check your reference ID.' });
    }

    // Mask name for privacy (e.g. R*** T***)
    const maskedName = lead.name.split(' ').map(part => part[0] + '*'.repeat(Math.max(1, part.length - 1))).join(' ');

    return res.json({
      success: true,
      data: {
        referenceNumber: lead.reference_number,
        name: maskedName,
        productName: lead.product_name,
        quantity: lead.quantity,
        deliveryPreference: lead.delivery_preference,
        status: lead.status,
        createdAt: lead.created_at
      }
    });
  } catch (err) {
    console.error('Error tracking enquiry:', err);
    return res.status(500).json({ success: false, error: 'Server error' });
  }
});

export default router;
