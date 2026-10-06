import React, { useState } from 'react';
import { X, Phone, MessageSquare, Mail, Calendar, CheckCircle, Clock, FileText, User, MapPin, Truck, Sparkles, Trash2, AlertTriangle, Send } from 'lucide-react';
import { BRAND_INFO } from '../../data/brandInfo';

export default function AdminLeadDrawer({ lead, token, onClose, onUpdateLead, onDeleteLead }) {
  const [status, setStatus] = useState(lead.status);
  const [notes, setNotes] = useState(lead.notes || '');
  const [followUpDate, setFollowUpDate] = useState(lead.follow_up_date || '');
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [logs, setLogs] = useState([]);

  React.useEffect(() => {
    // Fetch detailed activity logs
    if (lead && lead.id) {
      fetch(`/api/admin/enquiries/${lead.id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
        .then(res => res.json())
        .then(data => {
          if (data.success && data.logs) {
            setLogs(data.logs);
          }
        })
        .catch(err => console.error('Error fetching lead logs:', err));
    }
  }, [lead, token]);

  const handleStatusChange = async (newStatus) => {
    setStatus(newStatus);
    setIsSaving(true);
    try {
      const res = await fetch(`/api/admin/enquiries/${lead.id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });
      const data = await res.json();
      if (data.success) {
        onUpdateLead({ ...lead, status: newStatus });
        setLogs(prev => [
          { id: Date.now(), action: `Status Changed`, details: `Status updated to ${newStatus}`, timestamp: new Date().toISOString() },
          ...prev
        ]);
      }
    } catch (err) {
      console.error('Error updating status:', err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveNotes = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const res = await fetch(`/api/admin/enquiries/${lead.id}/notes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ notes, followUpDate })
      });
      const data = await res.json();
      if (data.success) {
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 2500);
        onUpdateLead({ ...lead, notes, follow_up_date: followUpDate });
        setLogs(prev => [
          { id: Date.now(), action: 'Notes Updated', details: `Notes saved. Follow-up: ${followUpDate || 'None'}`, timestamp: new Date().toISOString() },
          ...prev
        ]);
      }
    } catch (err) {
      console.error('Error saving notes:', err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/admin/enquiries/${lead.id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        if (onDeleteLead) onDeleteLead(lead.id);
        onClose();
      } else {
        alert(data.error || 'Failed to delete entry');
      }
    } catch (err) {
      console.error('Error deleting enquiry:', err);
      alert('Network error while deleting entry');
    } finally {
      setIsDeleting(false);
    }
  };

  const customerCleanPhone = (lead.phone || '').replace(/\D/g, '');
  const formattedPhone = customerCleanPhone.length === 10 ? '91' + customerCleanPhone : customerCleanPhone;

  // Professional WhatsApp Order Confirmation Template
  const whatsappConfirmationText = 
`Hello ${lead.name}! 💫🪔
Thank you for your enquiry with Adi’s Creation – Lights n Lamps (Diya Collection 2026).

📌 Order Details:
• Reference No: ${lead.reference_number}
• Product: ${lead.product_name}
• Quantity: ${lead.quantity} units
• Delivery Mode: ${lead.delivery_preference}

We have confirmed your requirement. Our team is preparing your handcrafted diyas and will share dispatch and delivery details with you.

Warm regards,
Rani Toshniwal
Adi’s Creation, Hadapsar, Pune
📞 7058182383 / 8208841529
📧 knowaboutrani@gmail.com
“Decorate Your Homes With Adi’s Creation”`;

  const confirmationWhatsAppLink = `https://wa.me/${formattedPhone}?text=${encodeURIComponent(whatsappConfirmationText)}`;

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '820px',
          width: '100%',
          padding: 0,
          background: '#FFF'
        }}
      >
        {/* Drawer Header */}
        <div style={{
          padding: '1.25rem 1.5rem',
          borderBottom: '1px solid var(--border-subtle)',
          background: 'var(--bg-primary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.2rem' }}>
              <span style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.25rem',
                fontWeight: 800,
                color: 'var(--maroon-900)'
              }}>
                Lead #{lead.reference_number}
              </span>
              <span className={`status-chip status-${status.replace(/\s+/g, '-')}`}>
                {status}
              </span>
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Received on {new Date(lead.created_at).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: '#FFF',
              border: '1px solid var(--border-subtle)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Drawer Body */}
        <div style={{ padding: '1.75rem', overflowY: 'auto', maxHeight: 'calc(90vh - 80px)' }}>

          {/* Official WhatsApp Order Confirmation Card */}
          <div style={{
            background: 'linear-gradient(135deg, #F0FDF4 0%, #DCFCE7 100%)',
            border: '1.5px solid #86EFAC',
            borderRadius: 'var(--radius-lg)',
            padding: '1.25rem',
            marginBottom: '1.75rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <MessageSquare size={18} color="#15803D" />
                <span style={{ fontWeight: 800, color: '#14532D', fontSize: '0.95rem' }}>
                  Send WhatsApp Order Confirmation
                </span>
              </div>
              <span className="badge-gold" style={{ fontSize: '0.72rem' }}>
                Direct Customer Phone: {lead.phone}
              </span>
            </div>

            <p style={{ fontSize: '0.85rem', color: '#166534', lineHeight: 1.6, marginBottom: '1rem' }}>
              Click below to send a pre-formatted official order confirmation directly to the customer's WhatsApp number with their reference code and order summary:
            </p>

            <a
              href={confirmationWhatsAppLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp btn-sm"
              style={{ padding: '0.65rem 1.25rem', fontWeight: 700 }}
            >
              <Send size={15} />
              <span>Send WhatsApp Order Confirmation Now</span>
            </a>
          </div>

          {/* Direct Contact Buttons */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '0.75rem',
            marginBottom: '1.75rem'
          }}>
            <a
              href={`tel:${lead.phone}`}
              className="btn btn-outline btn-sm"
              style={{ width: '100%', background: '#FFF' }}
            >
              <Phone size={15} color="var(--maroon-800)" />
              <span>Call {lead.phone}</span>
            </a>

            <a
              href={`mailto:${lead.email}?subject=Adi's Creation Diya Order Confirmation (Ref: ${lead.reference_number})`}
              className="btn btn-outline btn-sm"
              style={{ width: '100%', background: '#FFF' }}
            >
              <Mail size={15} color="var(--maroon-800)" />
              <span>Email Customer</span>
            </a>
          </div>

          {/* Customer & Order Information Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.5rem',
            marginBottom: '1.75rem'
          }}>
            {/* Customer Details Box */}
            <div className="card-luxury" style={{ padding: '1.25rem', background: '#FFF' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--maroon-900)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <User size={16} color="var(--maroon-800)" />
                <span>Customer Profile</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', fontSize: '0.9rem' }}>
                <div><strong>Name:</strong> {lead.name}</div>
                <div><strong>Phone:</strong> <a href={`tel:${lead.phone}`} style={{ color: 'var(--maroon-800)', fontWeight: 600 }}>{lead.phone}</a></div>
                <div><strong>Email:</strong> <a href={`mailto:${lead.email}`} style={{ color: 'var(--maroon-800)' }}>{lead.email}</a></div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <MapPin size={14} color="#877476" />
                  <span>{lead.city}, {lead.state ? lead.state + ', ' : ''}{lead.country}</span>
                </div>
                <div><strong>Preferred Contact:</strong> {lead.preferred_contact || 'WhatsApp'}</div>
              </div>
            </div>

            {/* Order Requirements Box */}
            <div className="card-luxury" style={{ padding: '1.25rem', background: '#FFF' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--maroon-900)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Truck size={16} color="var(--terracotta-600)" />
                <span>Order Requirements</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', fontSize: '0.9rem' }}>
                <div><strong>Product:</strong> <span style={{ color: 'var(--maroon-900)', fontWeight: 700 }}>{lead.product_name}</span></div>
                <div><strong>Quantity:</strong> <span className="badge-gold" style={{ fontSize: '0.82rem' }}>{lead.quantity} Units</span></div>
                <div><strong>Delivery Mode:</strong> {lead.delivery_preference}</div>
                {lead.message && (
                  <div style={{
                    marginTop: '0.5rem',
                    padding: '0.6rem',
                    background: 'var(--bg-primary)',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.85rem',
                    color: 'var(--text-secondary)',
                    fontStyle: 'italic',
                    borderLeft: '3px solid var(--gold-500)'
                  }}>
                    "{lead.message}"
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Status & Quick Stage Controls */}
          <div style={{
            background: 'var(--bg-primary)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-lg)',
            padding: '1.25rem',
            marginBottom: '1.75rem'
          }}>
            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--maroon-900)', marginBottom: '0.75rem' }}>
              Update Lead Pipeline Status
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
              {['NEW', 'CONTACTED', 'FOLLOW-UP', 'CONVERTED', 'CLOSED', 'NOT INTERESTED'].map((st) => (
                <button
                  key={st}
                  type="button"
                  onClick={() => handleStatusChange(st)}
                  style={{
                    padding: '0.4rem 0.85rem',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    background: status === st ? 'var(--maroon-800)' : '#FFF',
                    color: status === st ? '#FFF' : 'var(--text-primary)',
                    border: status === st ? '1px solid var(--maroon-900)' : '1px solid var(--border-subtle)'
                  }}
                >
                  {st}
                </button>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                onClick={() => handleStatusChange('CONTACTED')}
                className="btn btn-outline btn-sm"
              >
                Mark as Contacted
              </button>
              <button
                onClick={() => handleStatusChange('CONVERTED')}
                className="btn btn-gold btn-sm"
              >
                Mark as Converted
              </button>
              <button
                onClick={() => handleStatusChange('CLOSED')}
                className="btn btn-outline btn-sm"
              >
                Close Lead
              </button>
            </div>
          </div>

          {/* CRM Internal Notes & Follow-up Scheduler Form */}
          <form onSubmit={handleSaveNotes} style={{
            background: '#FFF',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-lg)',
            padding: '1.25rem',
            marginBottom: '1.75rem'
          }}>
            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--maroon-900)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <FileText size={16} color="var(--gold-800)" />
              <span>Admin Internal Notes &amp; Follow-up Date</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
              <div>
                <label className="form-label" htmlFor="lead-followup">Scheduled Follow-up Date</label>
                <input
                  id="lead-followup"
                  type="date"
                  value={followUpDate}
                  onChange={(e) => setFollowUpDate(e.target.value)}
                  className="form-control"
                />
              </div>

              <div>
                <label className="form-label" htmlFor="lead-notes">Internal Order Notes</label>
                <textarea
                  id="lead-notes"
                  rows="2"
                  placeholder="e.g. Confirmed 4 sets available. Delivery scheduled to Pune by 20 Oct..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="form-control"
                />
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <button
                type="submit"
                disabled={isSaving}
                className="btn btn-primary btn-sm"
              >
                <span>Save Notes &amp; Follow-up</span>
              </button>
              {saveSuccess && (
                <span style={{ fontSize: '0.85rem', color: '#027A48', fontWeight: 600 }}>
                  ✓ Saved successfully!
                </span>
              )}
            </div>
          </form>

          {/* Activity Logs & History Timeline */}
          <div style={{ marginBottom: '2rem' }}>
            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--maroon-900)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Clock size={16} color="var(--maroon-800)" />
              <span>Lead Activity &amp; Contact History</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {logs && logs.length > 0 ? (
                logs.map((log) => (
                  <div
                    key={log.id}
                    style={{
                      background: 'var(--bg-primary)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: 'var(--radius-md)',
                      padding: '0.65rem 0.9rem',
                      display: 'flex',
                      alignItems: 'flex-start',
                      justifyContent: 'space-between',
                      gap: '1rem',
                      fontSize: '0.82rem'
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 700, color: 'var(--maroon-900)' }}>{log.action}</div>
                      <div style={{ color: 'var(--text-secondary)', marginTop: '0.1rem' }}>{log.details}</div>
                    </div>
                    <div style={{ color: 'var(--text-muted)', whiteSpace: 'nowrap', fontSize: '0.75rem' }}>
                      {new Date(log.timestamp).toLocaleString('en-IN', { dateStyle: 'short', timeStyle: 'short' })}
                    </div>
                  </div>
                ))
              ) : (
                <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                  Enquiry received on {new Date(lead.created_at).toLocaleString('en-IN')}.
                </div>
              )}
            </div>
          </div>

          {/* Danger Zone: Delete Entry */}
          <div style={{
            background: '#FEF3F2',
            border: '1px solid #FECDCA',
            borderRadius: 'var(--radius-lg)',
            padding: '1.25rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem'
          }}>
            <div>
              <div style={{ fontWeight: 700, color: '#B42318', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <AlertTriangle size={16} />
                <span>Delete This Enquiry</span>
              </div>
              <div style={{ fontSize: '0.8rem', color: '#7A271A' }}>
                Permanently delete this enquiry record and its activity history.
              </div>
            </div>

            {showDeleteConfirm ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <button
                  type="button"
                  onClick={handleDelete}
                  disabled={isDeleting}
                  style={{
                    background: '#D92D20',
                    color: '#FFF',
                    padding: '0.45rem 0.9rem',
                    borderRadius: 'var(--radius-md)',
                    fontSize: '0.8rem',
                    fontWeight: 700
                  }}
                >
                  {isDeleting ? 'Deleting...' : 'Yes, Delete Permanently'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowDeleteConfirm(false)}
                  style={{
                    background: '#FFF',
                    color: 'var(--text-primary)',
                    border: '1px solid var(--border-subtle)',
                    padding: '0.45rem 0.75rem',
                    borderRadius: 'var(--radius-md)',
                    fontSize: '0.8rem'
                  }}
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setShowDeleteConfirm(true)}
                style={{
                  background: '#FFF',
                  color: '#B42318',
                  border: '1px solid #FDA29B',
                  padding: '0.45rem 0.9rem',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  cursor: 'pointer'
                }}
              >
                <Trash2 size={14} />
                <span>Delete Entry</span>
              </button>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
