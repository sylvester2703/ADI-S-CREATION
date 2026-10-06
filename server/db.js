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

const dbFilePath = path.join(dataDir, 'adis_creation_db.json');

// Default Database State
const initialData = {
  admin_users: [],
  enquiries: [],
  activity_logs: [],
  products: []
};

class MemoryJsonDatabase {
  constructor(filePath) {
    this.filePath = filePath;
    this.data = this.load();
  }

  load() {
    try {
      if (fs.existsSync(this.filePath)) {
        const raw = fs.readFileSync(this.filePath, 'utf-8');
        return JSON.parse(raw);
      }
    } catch (err) {
      console.warn('Could not read db file, initializing with defaults:', err.message);
    }
    return JSON.parse(JSON.stringify(initialData));
  }

  save() {
    try {
      fs.writeFileSync(this.filePath, JSON.stringify(this.data, null, 2), 'utf-8');
    } catch (err) {
      console.error('Error saving db file:', err.message);
    }
  }

  exec(sql) {
    // DDL commands are safely handled as memory table initializations
    return this;
  }

  pragma(sql) {
    return [];
  }

  prepare(sql) {
    const trimmed = sql.trim();
    const upper = trimmed.toUpperCase();

    return {
      run: (...params) => {
        // Flatten params if passed as array
        if (params.length === 1 && Array.isArray(params[0])) params = params[0];

        // 1. INSERT INTO admin_users
        if (upper.startsWith('INSERT INTO ADMIN_USERS')) {
          const id = (this.data.admin_users.length > 0 ? Math.max(...this.data.admin_users.map(u => u.id || 0)) : 0) + 1;
          const user = {
            id,
            username: params[0],
            email: params[1],
            password_hash: params[2],
            name: params[3],
            role: params[4] || 'admin',
            created_at: params[5] || new Date().toISOString()
          };
          this.data.admin_users.push(user);
          this.save();
          return { changes: 1, lastInsertRowid: id };
        }

        // 2. UPDATE admin_users
        if (upper.startsWith('UPDATE ADMIN_USERS')) {
          // SET username = ?, email = ?, password_hash = ? WHERE id = ?
          const id = params[3];
          const user = this.data.admin_users.find(u => u.id == id);
          if (user) {
            user.username = params[0];
            user.email = params[1];
            user.password_hash = params[2];
            this.save();
            return { changes: 1 };
          }
          return { changes: 0 };
        }

        // 3. INSERT INTO enquiries
        if (upper.startsWith('INSERT INTO ENQUIRIES')) {
          const id = (this.data.enquiries.length > 0 ? Math.max(...this.data.enquiries.map(e => e.id || 0)) : 0) + 1;
          const enquiry = {
            id,
            reference_number: params[0],
            name: params[1],
            phone: params[2],
            email: params[3],
            city: params[4],
            state: params[5] || '',
            country: params[6] || 'India',
            product_name: params[7],
            product_slug: params[8] || '',
            quantity: Number(params[9]) || 1,
            delivery_preference: params[10] || 'Home Delivery',
            preferred_contact: params[11] || 'WhatsApp',
            message: params[12] || '',
            status: 'NEW',
            notes: '',
            follow_up_date: '',
            last_contacted_at: '',
            created_at: params[13] || new Date().toISOString(),
            updated_at: params[14] || new Date().toISOString()
          };
          this.data.enquiries.push(enquiry);
          this.save();
          return { changes: 1, lastInsertRowid: id };
        }

        // 4. INSERT INTO activity_logs
        if (upper.startsWith('INSERT INTO ACTIVITY_LOGS')) {
          const id = (this.data.activity_logs.length > 0 ? Math.max(...this.data.activity_logs.map(l => l.id || 0)) : 0) + 1;
          const log = {
            id,
            enquiry_id: Number(params[0]),
            action: params[1],
            details: params[2],
            timestamp: params[3] || new Date().toISOString()
          };
          this.data.activity_logs.push(log);
          this.save();
          return { changes: 1, lastInsertRowid: id };
        }

        // 5. UPDATE enquiries SET status = ?, last_contacted_at = ?, updated_at = ? WHERE id = ?
        if (upper.includes('UPDATE ENQUIRIES') && upper.includes('STATUS = ?')) {
          const status = params[0];
          const last_contacted_at = params[1];
          const updated_at = params[2];
          const id = Number(params[3]);
          const enq = this.data.enquiries.find(e => e.id === id);
          if (enq) {
            enq.status = status;
            if (last_contacted_at) enq.last_contacted_at = last_contacted_at;
            enq.updated_at = updated_at;
            this.save();
            return { changes: 1 };
          }
          return { changes: 0 };
        }

        // 6. UPDATE enquiries SET notes = ?, follow_up_date = ?, updated_at = ? WHERE id = ?
        if (upper.includes('UPDATE ENQUIRIES') && upper.includes('NOTES = ?')) {
          const notes = params[0];
          const follow_up_date = params[1];
          const updated_at = params[2];
          const id = Number(params[3]);
          const enq = this.data.enquiries.find(e => e.id === id);
          if (enq) {
            enq.notes = notes;
            enq.follow_up_date = follow_up_date;
            enq.updated_at = updated_at;
            this.save();
            return { changes: 1 };
          }
          return { changes: 0 };
        }

        // 7. DELETE FROM activity_logs WHERE enquiry_id = ?
        if (upper.startsWith('DELETE FROM ACTIVITY_LOGS')) {
          const enquiry_id = Number(params[0]);
          const before = this.data.activity_logs.length;
          this.data.activity_logs = this.data.activity_logs.filter(l => l.enquiry_id !== enquiry_id);
          this.save();
          return { changes: before - this.data.activity_logs.length };
        }

        // 8. DELETE FROM enquiries WHERE id = ?
        if (upper.startsWith('DELETE FROM ENQUIRIES')) {
          const id = Number(params[0]);
          const before = this.data.enquiries.length;
          this.data.enquiries = this.data.enquiries.filter(e => e.id !== id);
          this.save();
          return { changes: before - this.data.enquiries.length };
        }

        return { changes: 0 };
      },

      get: (...params) => {
        // Flatten params if passed as array
        if (params.length === 1 && Array.isArray(params[0])) params = params[0];

        // 1. Check Admin User (SELECT * FROM admin_users WHERE username = ? OR email = ?)
        if (upper.includes('FROM ADMIN_USERS')) {
          const user1 = params[0];
          const user2 = params[1] || params[0];
          return this.data.admin_users.find(u => 
            (u.username && u.username.toLowerCase() === String(user1).toLowerCase()) ||
            (u.email && u.email.toLowerCase() === String(user2).toLowerCase())
          );
        }

        // 2. Count enquiries (SELECT COUNT(*) as count FROM enquiries WHERE ...)
        if (upper.includes('SELECT COUNT(*)') && upper.includes('FROM ENQUIRIES')) {
          if (upper.includes("STATUS = 'NEW'")) {
            return { count: this.data.enquiries.filter(e => e.status === 'NEW').length };
          }
          if (upper.includes("STATUS = 'CONTACTED'")) {
            return { count: this.data.enquiries.filter(e => e.status === 'CONTACTED').length };
          }
          if (upper.includes("STATUS = 'FOLLOW-UP'")) {
            return { count: this.data.enquiries.filter(e => e.status === 'FOLLOW-UP').length };
          }
          if (upper.includes("STATUS = 'CONVERTED'")) {
            return { count: this.data.enquiries.filter(e => e.status === 'CONVERTED').length };
          }
          if (upper.includes("STATUS = 'CLOSED'")) {
            return { count: this.data.enquiries.filter(e => e.status === 'CLOSED').length };
          }
          if (upper.includes("STATUS = 'NOT INTERESTED'")) {
            return { count: this.data.enquiries.filter(e => e.status === 'NOT INTERESTED').length };
          }
          return { count: this.data.enquiries.length };
        }

        // 3. Enquiry by reference_number
        if (upper.includes('FROM ENQUIRIES WHERE REFERENCE_NUMBER = ?')) {
          const ref = params[0];
          return this.data.enquiries.find(e => e.reference_number === ref);
        }

        // 4. Enquiry by id
        if (upper.includes('FROM ENQUIRIES WHERE ID = ?') || upper.includes('SELECT ID, REFERENCE_NUMBER FROM ENQUIRIES WHERE ID = ?')) {
          const id = Number(params[0]);
          return this.data.enquiries.find(e => e.id === id);
        }

        return undefined;
      },

      all: (...params) => {
        // Flatten params if passed as array
        if (params.length === 1 && Array.isArray(params[0])) params = params[0];

        // 1. Table info PRAGMA
        if (upper.includes('PRAGMA TABLE_INFO')) {
          return [
            { name: 'id' },
            { name: 'username' },
            { name: 'email' },
            { name: 'password_hash' }
          ];
        }

        // 2. Activity logs by enquiry_id
        if (upper.includes('FROM ACTIVITY_LOGS WHERE ENQUIRY_ID = ?')) {
          const enquiry_id = Number(params[0]);
          return this.data.activity_logs
            .filter(l => l.enquiry_id === enquiry_id)
            .sort((a, b) => b.id - a.id);
        }

        // 3. Delivery breakdown (SELECT delivery_preference, COUNT(*) as count FROM enquiries GROUP BY delivery_preference)
        if (upper.includes('GROUP BY DELIVERY_PREFERENCE')) {
          const map = {};
          this.data.enquiries.forEach(e => {
            const key = e.delivery_preference || 'Other';
            map[key] = (map[key] || 0) + 1;
          });
          return Object.keys(map).map(delivery_preference => ({
            delivery_preference,
            count: map[delivery_preference]
          }));
        }

        // 4. Recent enquiries (SELECT * FROM enquiries ORDER BY id DESC LIMIT 5)
        if (upper.includes('FROM ENQUIRIES') && upper.includes('LIMIT 5')) {
          return [...this.data.enquiries].sort((a, b) => b.id - a.id).slice(0, 5);
        }

        // 5. Filtered enquiries in Admin Dashboard
        if (upper.includes('FROM ENQUIRIES')) {
          let list = [...this.data.enquiries];

          // Dynamic SQL filtering simulation
          if (params.length > 0) {
            let paramIdx = 0;
            if (upper.includes('STATUS = ?')) {
              const statusVal = params[paramIdx++];
              list = list.filter(e => e.status === statusVal);
            }
            if (upper.includes('DELIVERY_PREFERENCE = ?')) {
              const delVal = params[paramIdx++];
              list = list.filter(e => e.delivery_preference === delVal);
            }
            if (upper.includes('LIKE ?')) {
              const searchPattern = (params[paramIdx++] || '').replace(/%/g, '').toLowerCase();
              if (searchPattern) {
                list = list.filter(e =>
                  (e.name && e.name.toLowerCase().includes(searchPattern)) ||
                  (e.phone && e.phone.includes(searchPattern)) ||
                  (e.email && e.email.toLowerCase().includes(searchPattern)) ||
                  (e.city && e.city.toLowerCase().includes(searchPattern)) ||
                  (e.reference_number && e.reference_number.toLowerCase().includes(searchPattern)) ||
                  (e.product_name && e.product_name.toLowerCase().includes(searchPattern))
                );
              }
            }
          }

          return list.sort((a, b) => b.id - a.id);
        }

        return [];
      }
    };
  }
}

export const db = new MemoryJsonDatabase(dbFilePath);

// Initialize / Seed Admin User (Login ID: aditi@1234, Bcrypt Hash for aditi@8208841529)
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
