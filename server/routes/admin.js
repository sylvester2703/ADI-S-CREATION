import express from 'express';
import bcrypt from 'bcryptjs';
import { db } from '../db.js';
import { signToken, requireAdminAuth } from '../auth.js';

const router = express.Router();

// Rate limiting state for admin login attempts
const loginAttempts = new Map();

// POST /api/admin/login
router.post('/login', (req, res) => {
  try {
    const { loginId, email, password } = req.body;
    const identifier = (loginId || email || '').trim();
    const ip = req.ip || req.connection.remoteAddress || 'unknown';

    // Basic brute-force rate-limiting
    const now = Date.now();
    const attempts = loginAttempts.get(ip) || { count: 0, firstAttempt: now };
    if (attempts.count >= 6 && now - attempts.firstAttempt < 15 * 60 * 1000) {
      return res.status(429).json({
        success: false,
        error: 'Too many failed login attempts. Please wait 15 minutes before trying again.'
      });
    }

    if (!identifier || !password) {
      return res.status(400).json({ success: false, error: 'Login ID and password are required.' });
    }

    const user = db.prepare('SELECT * FROM admin_users WHERE username = ? OR email = ?').get(identifier, identifier.toLowerCase());

    if (!user || !bcrypt.compareSync(password, user.password_hash)) {
      attempts.count += 1;
      loginAttempts.set(ip, attempts);
      return res.status(401).json({ success: false, error: 'Invalid credentials. Please check your Login ID and password.' });
    }

    // Reset attempts on successful login
    loginAttempts.delete(ip);

    const token = signToken(user);

    return res.json({
      success: true,
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        name: user.name,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Error in /api/admin/login:', error);
    return res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

// GET /api/admin/me - Verify current session
router.get('/me', requireAdminAuth, (req, res) => {
  return res.json({ success: true, user: req.user });
});

// GET /api/admin/stats - Dynamic Lead KPI Statistics
router.get('/stats', requireAdminAuth, (req, res) => {
  try {
    const total = db.prepare('SELECT COUNT(*) as count FROM enquiries').get().count;
    const newLeads = db.prepare("SELECT COUNT(*) as count FROM enquiries WHERE status = 'NEW'").get().count;
    const contacted = db.prepare("SELECT COUNT(*) as count FROM enquiries WHERE status = 'CONTACTED'").get().count;
    const followUp = db.prepare("SELECT COUNT(*) as count FROM enquiries WHERE status = 'FOLLOW-UP'").get().count;
    const converted = db.prepare("SELECT COUNT(*) as count FROM enquiries WHERE status = 'CONVERTED'").get().count;
    const closed = db.prepare("SELECT COUNT(*) as count FROM enquiries WHERE status = 'CLOSED'").get().count;
    const notInterested = db.prepare("SELECT COUNT(*) as count FROM enquiries WHERE status = 'NOT INTERESTED'").get().count;

    const deliveryBreakdown = db.prepare(`
      SELECT delivery_preference, COUNT(*) as count 
      FROM enquiries 
      GROUP BY delivery_preference
    `).all();

    const recent = db.prepare(`
      SELECT id, reference_number, name, phone, city, product_name, quantity, status, created_at
      FROM enquiries
      ORDER BY id DESC
      LIMIT 5
    `).all();

    return res.json({
      success: true,
      stats: {
        total,
        newLeads,
        contacted,
        followUp,
        converted,
        closed,
        notInterested,
        conversionRate: total > 0 ? Math.round((converted / total) * 100) : 0,
        deliveryBreakdown,
        recent
      }
    });
  } catch (err) {
    console.error('Error fetching admin stats:', err);
    return res.status(500).json({ success: false, error: 'Failed to calculate stats' });
  }
});

// GET /api/admin/enquiries - List / Search / Filter Enquiries
router.get('/enquiries', requireAdminAuth, (req, res) => {
  try {
    const { status, search, delivery, sortBy = 'id', sortOrder = 'DESC' } = req.query;

    let query = 'SELECT * FROM enquiries WHERE 1=1';
    const params = [];

    if (status && status !== 'ALL') {
      query += ' AND status = ?';
      params.push(status);
    }

    if (delivery && delivery !== 'ALL') {
      query += ' AND delivery_preference = ?';
      params.push(delivery);
    }

    if (search && search.trim() !== '') {
      const term = `%${search.trim()}%`;
      query += ' AND (reference_number LIKE ? OR name LIKE ? OR phone LIKE ? OR email LIKE ? OR city LIKE ? OR product_name LIKE ?)';
      params.push(term, term, term, term, term, term);
    }

    const validCols = ['id', 'created_at', 'name', 'status', 'quantity'];
    const col = validCols.includes(sortBy) ? sortBy : 'id';
    const ord = sortOrder.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';

    query += ` ORDER BY ${col} ${ord}`;

    const enquiries = db.prepare(query).all(...params);

    return res.json({
      success: true,
      count: enquiries.length,
      enquiries
    });
  } catch (err) {
    console.error('Error in GET /api/admin/enquiries:', err);
    return res.status(500).json({ success: false, error: 'Failed to retrieve enquiries' });
  }
});

// GET /api/admin/enquiries/:id - Lead Details with Activity Log
router.get('/enquiries/:id', requireAdminAuth, (req, res) => {
  try {
    const { id } = req.params;
    const enquiry = db.prepare('SELECT * FROM enquiries WHERE id = ?').get(id);

    if (!enquiry) {
      return res.status(404).json({ success: false, error: 'Lead not found' });
    }

    const logs = db.prepare('SELECT * FROM activity_logs WHERE enquiry_id = ? ORDER BY id DESC').all(id);

    return res.json({
      success: true,
      enquiry,
      logs
    });
  } catch (err) {
    console.error('Error in GET /api/admin/enquiries/:id:', err);
    return res.status(500).json({ success: false, error: 'Server error' });
  }
});

// PATCH /api/admin/enquiries/:id/status - Update Status
router.patch('/enquiries/:id/status', requireAdminAuth, (req, res) => {
  try {
    const { id } = req.params;
    const { status, note = '' } = req.body;

    const validStatuses = ['NEW', 'CONTACTED', 'FOLLOW-UP', 'CONVERTED', 'CLOSED', 'NOT INTERESTED'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ success: false, error: 'Invalid lead status.' });
    }

    const now = new Date().toISOString();
    const existing = db.prepare('SELECT * FROM enquiries WHERE id = ?').get(id);
    if (!existing) {
      return res.status(404).json({ success: false, error: 'Lead not found' });
    }

    const lastContacted = (status === 'CONTACTED' || status === 'FOLLOW-UP' || status === 'CONVERTED') ? now : existing.last_contacted_at;

    db.prepare(`
      UPDATE enquiries 
      SET status = ?, last_contacted_at = ?, updated_at = ?
      WHERE id = ?
    `).run(status, lastContacted, now, id);

    const actionDesc = `Status updated to ${status}${note ? `: ${note}` : ''}`;
    db.prepare(`
      INSERT INTO activity_logs (enquiry_id, action, details, timestamp)
      VALUES (?, ?, ?, ?)
    `).run(id, `Status Change (${status})`, actionDesc, now);

    return res.json({
      success: true,
      message: `Status updated to ${status}`,
      status,
      updatedAt: now
    });
  } catch (err) {
    console.error('Error updating lead status:', err);
    return res.status(500).json({ success: false, error: 'Failed to update status' });
  }
});

// POST /api/admin/enquiries/:id/notes - Add Note & Follow Up Date
router.post('/enquiries/:id/notes', requireAdminAuth, (req, res) => {
  try {
    const { id } = req.params;
    const { notes, followUpDate } = req.body;

    const now = new Date().toISOString();
    const existing = db.prepare('SELECT * FROM enquiries WHERE id = ?').get(id);
    if (!existing) {
      return res.status(404).json({ success: false, error: 'Lead not found' });
    }

    db.prepare(`
      UPDATE enquiries 
      SET notes = ?, follow_up_date = ?, updated_at = ?
      WHERE id = ?
    `).run(notes || '', followUpDate || null, now, id);

    let details = `Note updated.`;
    if (followUpDate) details += ` Follow-up scheduled for ${followUpDate}.`;
    if (notes) details += ` "${notes}"`;

    db.prepare(`
      INSERT INTO activity_logs (enquiry_id, action, details, timestamp)
      VALUES (?, ?, ?, ?)
    `).run(id, 'Notes / Follow-up Updated', details, now);

    return res.json({
      success: true,
      message: 'Notes and follow-up saved',
      notes,
      followUpDate,
      updatedAt: now
    });
  } catch (err) {
    console.error('Error saving notes:', err);
    return res.status(500).json({ success: false, error: 'Failed to save notes' });
  }
});

// GET /api/admin/export/csv - Export leads to CSV
router.get('/export/csv', requireAdminAuth, (req, res) => {
  try {
    const rows = db.prepare(`
      SELECT reference_number, created_at, name, phone, email, city, state, country, 
             product_name, quantity, delivery_preference, preferred_contact, status, notes, follow_up_date, message
      FROM enquiries 
      ORDER BY id DESC
    `).all();

    const headers = [
      'Reference No', 'Date Submitted', 'Customer Name', 'Phone', 'Email', 'City', 'State', 'Country',
      'Product Name', 'Quantity', 'Delivery Preference', 'Preferred Contact', 'Status', 'Notes', 'Follow Up Date', 'Customer Message'
    ];

    const escapeCsv = (val) => {
      if (val === null || val === undefined) return '""';
      const str = String(val).replace(/"/g, '""');
      return `"${str}"`;
    };

    const csvLines = [];
    csvLines.push(headers.join(','));

    for (const row of rows) {
      csvLines.push([
        escapeCsv(row.reference_number),
        escapeCsv(row.created_at),
        escapeCsv(row.name),
        escapeCsv(row.phone),
        escapeCsv(row.email),
        escapeCsv(row.city),
        escapeCsv(row.state),
        escapeCsv(row.country),
        escapeCsv(row.product_name),
        escapeCsv(row.quantity),
        escapeCsv(row.delivery_preference),
        escapeCsv(row.preferred_contact),
        escapeCsv(row.status),
        escapeCsv(row.notes),
        escapeCsv(row.follow_up_date),
        escapeCsv(row.message)
      ].join(','));
    }

    const csvContent = csvLines.join('\r\n');
    const filename = `Adis_Creation_Leads_${new Date().toISOString().slice(0, 10)}.csv`;

    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    return res.send(csvContent);
  } catch (err) {
    console.error('Error exporting CSV:', err);
    return res.status(500).json({ success: false, error: 'Failed to export CSV' });
  }
});

export default router;
