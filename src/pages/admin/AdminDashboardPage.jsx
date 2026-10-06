import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Search,
  Filter,
  Download,
  Phone,
  MessageSquare,
  Eye,
  LogOut,
  RefreshCw,
  Clock,
  CheckCircle,
  AlertTriangle,
  Layers,
  Truck,
  Globe,
  MapPin,
  FileSpreadsheet,
  ChevronRight,
  TrendingUp,
  UserCheck,
  Trash2,
  Send
} from 'lucide-react';
import AdminLeadDrawer from './AdminLeadDrawer';

export const getWhatsAppConfirmationUrl = (lead) => {
  const customerCleanPhone = (lead.phone || '').replace(/\D/g, '');
  const formattedPhone = customerCleanPhone.length === 10 ? '91' + customerCleanPhone : customerCleanPhone;
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

  return `https://wa.me/${formattedPhone}?text=${encodeURIComponent(whatsappConfirmationText)}`;
};

export default function AdminDashboardPage({ token, user, onLogout, onBackToSite }) {
  const [stats, setStats] = useState(null);
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [deliveryFilter, setDeliveryFilter] = useState('ALL');
  const [selectedLead, setSelectedLead] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const fetchDashboardData = async () => {
    setRefreshing(true);
    try {
      // 1. Fetch Stats
      const statsRes = await fetch('/api/admin/stats', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const statsData = await statsRes.json();
      if (statsData.success) {
        setStats(statsData.stats);
      }

      // 2. Fetch Enquiries
      const enquiriesRes = await fetch(`/api/admin/enquiries?status=${statusFilter}&delivery=${deliveryFilter}&search=${encodeURIComponent(searchQuery)}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const enquiriesData = await enquiriesRes.json();
      if (enquiriesData.success) {
        setEnquiries(enquiriesData.enquiries);
      }
    } catch (err) {
      console.error('Error fetching admin data:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, [statusFilter, deliveryFilter]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchDashboardData();
  };

  const handleExportCSV = async () => {
    try {
      const res = await fetch('/api/admin/export/csv', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Adis_Creation_Leads_${new Date().toISOString().slice(0, 10)}.csv`;
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (err) {
      console.error('Error downloading CSV:', err);
      alert('Failed to export CSV.');
    }
  };

  const handleQuickStatusToggle = async (lead, e) => {
    e.stopPropagation();
    const nextStatus = lead.status === 'NEW' ? 'CONTACTED' : (lead.status === 'CONTACTED' ? 'CONVERTED' : 'NEW');
    try {
      const res = await fetch(`/api/admin/enquiries/${lead.id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: nextStatus })
      });
      const data = await res.json();
      if (data.success) {
        setEnquiries(prev => prev.map(l => l.id === lead.id ? { ...l, status: nextStatus } : l));
        fetchDashboardData();
      }
    } catch (err) {
      console.error('Error quick updating status:', err);
    }
  };

  const handleDeleteLead = async (leadId, e) => {
    if (e) e.stopPropagation();
    if (!window.confirm('Are you sure you want to permanently delete this enquiry entry? This action cannot be undone.')) {
      return;
    }
    setDeletingId(leadId);
    try {
      const res = await fetch(`/api/admin/enquiries/${leadId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setEnquiries(prev => prev.filter(l => l.id !== leadId));
        if (selectedLead && selectedLead.id === leadId) {
          setSelectedLead(null);
        }
        fetchDashboardData();
      } else {
        alert(data.error || 'Failed to delete lead');
      }
    } catch (err) {
      console.error('Error deleting lead:', err);
      alert('Failed to delete lead');
    } finally {
      setDeletingId(null);
    }
  };

  const handleUpdateLead = (updated) => {
    setEnquiries(prev => prev.map(l => l.id === updated.id ? updated : l));
    setSelectedLead(updated);
    fetchDashboardData();
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-secondary)', display: 'flex', flexDirection: 'column' }}>
      
      {/* Top Admin Navigation Bar */}
      <header style={{
        background: 'linear-gradient(90deg, #24060E 0%, #3D0816 100%)',
        color: '#FFF',
        borderBottom: '2px solid var(--gold-500)',
        padding: '0.85rem 1.5rem',
        position: 'sticky',
        top: 0,
        zIndex: 50
      }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <img
              src="/assets/brand/adis_creation_logo.jpg"
              alt="Adi's Creation"
              style={{ height: '40px', borderRadius: '6px', border: '1px solid var(--gold-500)' }}
            />
            <div>
              <div style={{
                fontFamily: 'var(--font-serif)',
                fontWeight: 800,
                fontSize: '1.1rem',
                color: '#F6E6AC',
                letterSpacing: '0.04em'
              }}>
                ADI’S CREATION • CRM
              </div>
              <div style={{ fontSize: '0.72rem', color: '#D4AF37', textTransform: 'uppercase' }}>
                Diya Collection 2026 Admin Portal
              </div>
            </div>
          </div>

          {/* User & Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button
              onClick={onBackToSite}
              className="btn btn-sm"
              style={{
                background: 'rgba(255,255,255,0.1)',
                color: '#FDFBF7',
                border: '1px solid rgba(212, 175, 55, 0.3)'
              }}
            >
              <span>View Storefront</span>
            </button>

            <button
              onClick={onLogout}
              className="btn btn-sm btn-outline"
              style={{
                color: '#F6E6AC',
                borderColor: 'rgba(212, 175, 55, 0.4)'
              }}
              title="Sign Out"
            >
              <LogOut size={14} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Dashboard Container */}
      <main className="container" style={{ padding: '2rem 1.25rem', flexGrow: 1 }}>

        {/* Top Header & Refresh / Export Actions */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
          marginBottom: '2rem'
        }}>
          <div>
            <h1 style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1.8rem',
              color: 'var(--maroon-900)',
              marginBottom: '0.2rem'
            }}>
              Enquiries &amp; Lead Management
            </h1>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', margin: 0 }}>
              Real-time customer enquiries submitted through the 2026 catalogue website.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <button
              onClick={fetchDashboardData}
              disabled={refreshing}
              className="btn btn-outline btn-sm"
              style={{ background: '#FFF' }}
            >
              <RefreshCw size={14} className={refreshing ? 'animate-spin' : ''} />
              <span>Refresh</span>
            </button>

            <button
              onClick={handleExportCSV}
              className="btn btn-gold btn-sm"
            >
              <FileSpreadsheet size={15} />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        {/* KPI Stat Cards Grid */}
        {stats && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))',
            gap: '1rem',
            marginBottom: '2rem'
          }}>
            {/* Total Enquiries */}
            <div className="card-luxury" style={{ padding: '1.25rem', background: '#FFF' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                Total Enquiries
              </div>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', fontWeight: 800, color: 'var(--maroon-900)', margin: '0.25rem 0' }}>
                {stats.total}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                All leads received
              </div>
            </div>

            {/* New Leads */}
            <div className="card-luxury" style={{ padding: '1.25rem', background: '#FFF', borderLeft: '4px solid #026AA7' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#026AA7', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#026AA7' }} />
                <span>New Leads</span>
              </div>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', fontWeight: 800, color: '#026AA7', margin: '0.25rem 0' }}>
                {stats.newLeads}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                Requires initial contact
              </div>
            </div>

            {/* Contacted */}
            <div className="card-luxury" style={{ padding: '1.25rem', background: '#FFF', borderLeft: '4px solid #B54708' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#B54708', textTransform: 'uppercase' }}>
                Contacted
              </div>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', fontWeight: 800, color: '#B54708', margin: '0.25rem 0' }}>
                {stats.contacted}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                Under discussion
              </div>
            </div>

            {/* Follow-up */}
            <div className="card-luxury" style={{ padding: '1.25rem', background: '#FFF', borderLeft: '4px solid #C11574' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#C11574', textTransform: 'uppercase' }}>
                Follow-Up
              </div>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', fontWeight: 800, color: '#C11574', margin: '0.25rem 0' }}>
                {stats.followUp}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                Scheduled reminder
              </div>
            </div>

            {/* Converted */}
            <div className="card-luxury" style={{ padding: '1.25rem', background: '#FFF', borderLeft: '4px solid #027A48' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#027A48', textTransform: 'uppercase' }}>
                Converted
              </div>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', fontWeight: 800, color: '#027A48', margin: '0.25rem 0' }}>
                {stats.converted}
              </div>
              <div style={{ fontSize: '0.75rem', color: '#027A48', fontWeight: 600 }}>
                {stats.conversionRate}% Conversion
              </div>
            </div>

            {/* Closed */}
            <div className="card-luxury" style={{ padding: '1.25rem', background: '#FFF', borderLeft: '4px solid #667085' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#667085', textTransform: 'uppercase' }}>
                Closed
              </div>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', fontWeight: 800, color: '#344054', margin: '0.25rem 0' }}>
                {stats.closed}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                Fulfilled / Completed
              </div>
            </div>
          </div>
        )}

        {/* Filter & Search Bar */}
        <div style={{
          background: '#FFF',
          padding: '1.25rem',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-subtle)',
          marginBottom: '1.5rem',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem',
            alignItems: 'center'
          }}>
            {/* Search Input */}
            <form onSubmit={handleSearchSubmit} style={{ position: 'relative' }}>
              <Search size={16} color="#877476" style={{ position: 'absolute', left: '0.9rem', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="text"
                placeholder="Search name, phone, ref..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="form-control"
                style={{ paddingLeft: '2.4rem', fontSize: '0.88rem' }}
              />
            </form>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="form-control"
              style={{ fontSize: '0.88rem' }}
            >
              <option value="ALL">All Statuses</option>
              <option value="NEW">New Leads Only</option>
              <option value="CONTACTED">Contacted</option>
              <option value="FOLLOW-UP">Follow-Up</option>
              <option value="CONVERTED">Converted</option>
              <option value="CLOSED">Closed</option>
              <option value="NOT INTERESTED">Not Interested</option>
            </select>

            {/* Delivery Filter */}
            <select
              value={deliveryFilter}
              onChange={(e) => setDeliveryFilter(e.target.value)}
              className="form-control"
              style={{ fontSize: '0.88rem' }}
            >
              <option value="ALL">All Delivery Types</option>
              <option value="Home Delivery">Home Delivery (India)</option>
              <option value="Pickup in Pune">Pickup in Pune</option>
              <option value="International Supply">International Supply</option>
              <option value="Not Sure">Not Sure</option>
            </select>
          </div>
        </div>

        {/* Enquiries Table Card */}
        <div className="card-luxury" style={{ background: '#FFF', overflow: 'hidden' }}>
          {loading ? (
            <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
              Loading lead enquiries...
            </div>
          ) : enquiries.length > 0 ? (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
                <thead>
                  <tr style={{ background: 'var(--bg-primary)', borderBottom: '2px solid var(--border-subtle)', color: 'var(--maroon-900)' }}>
                    <th style={{ padding: '0.85rem 1rem', fontWeight: 700 }}>Ref / Date</th>
                    <th style={{ padding: '0.85rem 1rem', fontWeight: 700 }}>Customer</th>
                    <th style={{ padding: '0.85rem 1rem', fontWeight: 700 }}>Contact Info</th>
                    <th style={{ padding: '0.85rem 1rem', fontWeight: 700 }}>Product &amp; Qty</th>
                    <th style={{ padding: '0.85rem 1rem', fontWeight: 700 }}>Delivery Mode</th>
                    <th style={{ padding: '0.85rem 1rem', fontWeight: 700 }}>Status</th>
                    <th style={{ padding: '0.85rem 1rem', fontWeight: 700, textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {enquiries.map((lead) => (
                    <tr
                      key={lead.id}
                      onClick={() => setSelectedLead(lead)}
                      style={{
                        borderBottom: '1px solid var(--border-subtle)',
                        cursor: 'pointer',
                        transition: 'background var(--transition-fast)'
                      }}
                      onMouseOver={(e) => e.currentTarget.style.background = 'var(--bg-primary)'}
                      onMouseOut={(e) => e.currentTarget.style.background = '#FFF'}
                    >
                      {/* Ref & Date */}
                      <td style={{ padding: '1rem' }}>
                        <div style={{ fontWeight: 800, color: 'var(--maroon-900)' }}>
                          {lead.reference_number}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                          {new Date(lead.created_at).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}
                        </div>
                      </td>

                      {/* Customer Name & City */}
                      <td style={{ padding: '1rem' }}>
                        <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>
                          {lead.name}
                        </div>
                        <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                          {lead.city}, {lead.country}
                        </div>
                      </td>

                      {/* Phone & WhatsApp */}
                      <td style={{ padding: '1rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                          <Phone size={13} color="var(--maroon-800)" />
                          <a
                            href={`tel:${lead.phone}`}
                            onClick={(e) => e.stopPropagation()}
                            style={{ color: 'var(--maroon-800)', fontWeight: 600 }}
                          >
                            {lead.phone}
                          </a>
                        </div>
                        <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                          {lead.email}
                        </div>
                      </td>

                      {/* Product & Qty */}
                      <td style={{ padding: '1rem' }}>
                        <div style={{ fontWeight: 600, color: 'var(--maroon-900)', maxWidth: '200px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={lead.product_name}>
                          {lead.product_name}
                        </div>
                        <div style={{ fontSize: '0.78rem', color: 'var(--terracotta-700)', fontWeight: 700 }}>
                          Qty: {lead.quantity} units
                        </div>
                      </td>

                      {/* Delivery Mode */}
                      <td style={{ padding: '1rem' }}>
                        <span style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.3rem',
                          background: 'var(--bg-secondary)',
                          padding: '0.2rem 0.6rem',
                          borderRadius: 'var(--radius-full)',
                          fontSize: '0.75rem',
                          fontWeight: 600
                        }}>
                          {lead.delivery_preference}
                        </span>
                      </td>

                      {/* Status */}
                      <td style={{ padding: '1rem' }}>
                        <button
                          type="button"
                          onClick={(e) => handleQuickStatusToggle(lead, e)}
                          title="Click to cycle status"
                          style={{
                            background: 'transparent',
                            cursor: 'pointer',
                            display: 'inline-block'
                          }}
                        >
                          <span className={`status-chip status-${lead.status.replace(/\s+/g, '-')}`}>
                            {lead.status}
                          </span>
                        </button>
                      </td>

                      {/* Actions */}
                      <td style={{ padding: '1rem', textAlign: 'right' }}>
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', justifyContent: 'flex-end' }}>
                          <a
                            href={getWhatsAppConfirmationUrl(lead)}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="btn btn-whatsapp btn-sm"
                            style={{ padding: '0.35rem 0.65rem', fontSize: '0.75rem', textDecoration: 'none' }}
                            title="Send WhatsApp Order Confirmation"
                          >
                            <MessageSquare size={13} />
                            <span>WhatsApp</span>
                          </a>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedLead(lead);
                            }}
                            className="btn btn-outline btn-sm"
                            style={{ padding: '0.35rem 0.65rem', fontSize: '0.75rem', background: '#FFF' }}
                            title="View Full Details"
                          >
                            <Eye size={13} />
                            <span>View</span>
                          </button>

                          <button
                            type="button"
                            onClick={(e) => handleDeleteLead(lead.id, e)}
                            disabled={deletingId === lead.id}
                            className="btn btn-sm"
                            style={{
                              padding: '0.35rem 0.55rem',
                              fontSize: '0.75rem',
                              background: '#FEF3F2',
                              color: '#B42318',
                              border: '1px solid #FDA29B'
                            }}
                            title="Delete this enquiry entry"
                          >
                            <Trash2 size={13} />
                            <span>{deletingId === lead.id ? '...' : 'Delete'}</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            /* EMPTY STATE */
            <div style={{ padding: '4rem 1.5rem', textAlign: 'center' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>📭</div>
              <h3 style={{ fontFamily: 'var(--font-serif)', color: 'var(--maroon-900)', marginBottom: '0.4rem' }}>
                No enquiries yet
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', maxWidth: '440px', margin: '0 auto' }}>
                Customer enquiries will appear here automatically when submitted through the website catalogue.
              </p>
            </div>
          )}
        </div>

      </main>

      {/* Lead Details Drawer Modal */}
      {selectedLead && (
        <AdminLeadDrawer
          lead={selectedLead}
          token={token}
          onClose={() => setSelectedLead(null)}
          onUpdateLead={handleUpdateLead}
          onDeleteLead={(deletedId) => {
            setEnquiries(prev => prev.filter(l => l.id !== deletedId));
            setSelectedLead(null);
            fetchDashboardData();
          }}
        />
      )}

    </div>
  );
}
