import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isVercel = !!process.env.VERCEL;
const dataDir = isVercel ? path.join('/tmp', 'adis_data') : path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const dbPath = path.join(dataDir, 'adis_creation.db');
export const db = new Database(dbPath);

// Enable WAL mode for high performance concurrency (or standard DELETE journal on serverless if needed)
try {
  db.pragma('journal_mode = WAL');
} catch (e) {
  // fallback for memory or restricted serverless FS
}

// Initialize Tables
db.exec(`
  CREATE TABLE IF NOT EXISTS admin_users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT,
    email TEXT,
    password_hash TEXT NOT NULL,
    name TEXT NOT NULL,
    role TEXT DEFAULT 'admin',
    created_at TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS enquiries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    reference_number TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT NOT NULL,
    city TEXT NOT NULL,
    state TEXT,
    country TEXT NOT NULL,
    product_name TEXT NOT NULL,
    product_slug TEXT,
    quantity INTEGER NOT NULL,
    delivery_preference TEXT NOT NULL,
    preferred_contact TEXT,
    message TEXT,
    status TEXT DEFAULT 'NEW',
    notes TEXT,
    follow_up_date TEXT,
    last_contacted_at TEXT,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS activity_logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    enquiry_id INTEGER NOT NULL,
    action TEXT NOT NULL,
    details TEXT,
    timestamp TEXT NOT NULL,
    FOREIGN KEY (enquiry_id) REFERENCES enquiries(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS products (
    id TEXT PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    category_tag TEXT,
    price INTEGER NOT NULL,
    price_display TEXT,
    price_unit TEXT,
    single_price INTEGER,
    pair_price INTEGER,
    dimensions TEXT,
    available_colours INTEGER DEFAULT 1,
    colours_list TEXT,
    images TEXT,
    is_bestseller INTEGER DEFAULT 0,
    is_featured INTEGER DEFAULT 0,
    is_active INTEGER DEFAULT 1,
    brochure_page INTEGER NOT NULL,
    description TEXT,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
  );
`);

// Check if username column exists in admin_users, if not add it
const tableInfo = db.prepare("PRAGMA table_info(admin_users)").all();
const hasUsername = tableInfo.some(col => col.name === 'username');
if (!hasUsername) {
  db.exec("ALTER TABLE admin_users ADD COLUMN username TEXT;");
}

// Seed / Update Admin User (Login ID: aditi@1234, Bcrypt Hash for aditi@8208841529)
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'aditi@1234';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'knowaboutrani@gmail.com';
const ADMIN_HASH = process.env.ADMIN_HASH || '$2a$10$s/gBYCXkLcmB9P8syoMV9eBlWaV07ENAueZA7F64YKefuYM/Miuuy';

const existingAdmin = db.prepare('SELECT id FROM admin_users WHERE username = ? OR email = ?').get(ADMIN_USERNAME, ADMIN_EMAIL);
if (!existingAdmin) {
  db.prepare(`
    INSERT INTO admin_users (username, email, password_hash, name, role, created_at)
    VALUES (?, ?, ?, ?, ?, ?)
  `).run(ADMIN_USERNAME, ADMIN_EMAIL, ADMIN_HASH, 'Rani Toshniwal (Admin)', 'admin', new Date().toISOString());
} else {
  db.prepare(`
    UPDATE admin_users 
    SET username = ?, email = ?, password_hash = ?
    WHERE id = ?
  `).run(ADMIN_USERNAME, ADMIN_EMAIL, ADMIN_HASH, existingAdmin.id);
}

export function generateReferenceNumber() {
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  const ref = `AC-2026-${randomSuffix}`;
  const existing = db.prepare('SELECT id FROM enquiries WHERE reference_number = ?').get(ref);
  if (existing) {
    return generateReferenceNumber();
  }
  return ref;
}
