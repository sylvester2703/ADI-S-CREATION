import React, { useState } from 'react';
import { ArrowLeft, Sparkles, CheckCircle2, Truck, Globe, MapPin, Send, MessageSquare, Phone, AlertCircle, Loader2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { BRAND_INFO } from '../data/brandInfo';
import { PRODUCTS_DATA } from '../data/brochureProducts';

const INDIAN_STATES = [
  "Maharashtra", "Gujarat", "Delhi NCR", "Karnataka", "Tamil Nadu", "Telangana",
  "Rajasthan", "Uttar Pradesh", "Madhya Pradesh", "West Bengal", "Punjab", "Haryana",
  "Kerala", "Andhra Pradesh", "Goa", "Other State / UT"
];

export default function HowToEnquirePage({ setActivePage }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    city: '',
    state: 'Maharashtra',
    country: 'India',
    productName: PRODUCTS_DATA[0].name,
    productSlug: PRODUCTS_DATA[0].slug,
    quantity: 2,
    deliveryPreference: 'Home Delivery',
    preferredContact: 'WhatsApp',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [referenceNumber, setReferenceNumber] = useState('');
  const [serverError, setServerError] = useState('');

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      newErrors.name = 'Please enter your full name.';
    }
    const cleanPhone = formData.phone.replace(/\D/g, '');
    if (!cleanPhone || cleanPhone.length < 8) {
      newErrors.phone = 'Please enter a valid contact number.';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address.';
    }
    if (!formData.city.trim()) {
      newErrors.city = 'Please enter your city/town.';
    }
    const qty = parseInt(formData.quantity, 10);
    if (isNaN(qty) || qty < 1) {
      newErrors.quantity = 'Quantity must be at least 1.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Submission failed');
      }
      setReferenceNumber(data.referenceNumber);
      setSubmitSuccess(true);
      try {
        confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
      } catch (e) {}
    } catch (err) {
      setServerError(err.message || 'Error sending enquiry. Please call us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const whatsappFollowUp = encodeURIComponent(
    `Hello Adi’s Creation, I have submitted an enquiry (Ref: ${referenceNumber}) for "${formData.productName}" (Qty: ${formData.quantity}). Please share confirmation and details.`
  );

  return (
    <div className="section-padding" style={{ background: 'var(--bg-primary)', flexGrow: 1 }}>
      <div className="container">
        
        {/* Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
          <button onClick={() => setActivePage('home')} style={{ color: 'var(--maroon-800)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <ArrowLeft size={14} /> Home
          </button>
          <span>/</span>
          <span>How to Enquire</span>
        </div>

        {/* Section Header */}
        <div className="section-header">
          <div className="section-subtitle">
            <Sparkles size={15} color="#D4AF37" className="diya-glow" />
            <span>Simple 4-Step Process</span>
          </div>
          <h1 className="section-title">
            How to Enquire &amp; Order
          </h1>
          <div className="ornament-divider">
            <span className="ornament-line"></span>
            <span className="ornament-icon">🪔</span>
            <span className="ornament-line"></span>
          </div>
          <p className="section-desc">
            We operate as an artisanal product catalogue and enquiry service. No account creation is required — simply submit your requirement below or connect with Rani Toshniwal directly.
          </p>
        </div>

        {/* 4 Steps Visual Timeline */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '1.5rem',
          marginBottom: '3.5rem'
        }}>
          {[
            {
              step: '01',
              title: 'Browse Catalogue / Brochure',
              desc: 'Select your preferred designs from our 2026 Collection, with exact prices and single/pair details.'
            },
            {
              step: '02',
              title: 'Specify Quantity & Delivery',
              desc: 'Choose pickup in Hadapsar Pune, All-India home delivery, or worldwide international supply.'
            },
            {
              step: '03',
              title: 'Submit Enquiry Online',
              desc: 'Receive your unique reference number (AC-2026-XXXX) for instant follow-up without creating an account.'
            },
            {
              step: '04',
              title: 'Order Confirmation & Dispatch',
              desc: 'Rani Toshniwal & team coordinates directly with you regarding stock availability, delivery charges, and dispatch.'
            }
          ].map((item, idx) => (
            <div key={idx} className="card-luxury" style={{ padding: '1.75rem', background: '#FFF' }}>
              <div style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '2rem',
                fontWeight: 800,
                color: 'var(--gold-500)',
                marginBottom: '0.5rem',
                lineHeight: 1
              }}>
                {item.step}
              </div>
              <h3 style={{ fontSize: '1.1rem', color: 'var(--maroon-900)', marginBottom: '0.4rem' }}>
                {item.title}
              </h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Two Column Layout: Standalone Form & Policy Notices */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '2.5rem',
          maxWidth: '1080px',
          margin: '0 auto'
        }} className="enquire-page-grid">
          
          {/* Left Column: Embedded Form */}
          <div className="card-luxury" style={{ padding: '2rem', background: '#FFF' }}>
            <h2 style={{ fontSize: '1.4rem', color: 'var(--maroon-900)', marginBottom: '0.5rem' }}>
              Submit Your Diya Enquiry
            </h2>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
              Fill in your contact details and desired diyas. Our team will get back to you promptly.
            </p>

            {submitSuccess ? (
              <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
                <CheckCircle2 size={56} color="var(--status-converted-text)" style={{ margin: '0 auto 1rem auto' }} />
                <h3 style={{ fontSize: '1.5rem', color: 'var(--maroon-900)', marginBottom: '0.5rem' }}>
                  Enquiry Received Successfully!
                </h3>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                  Thank you! Your enquiry has been received. Our team will reach out shortly.
                </p>
                <div style={{
                  background: 'var(--bg-primary)',
                  border: '1.5px dashed var(--gold-500)',
                  borderRadius: 'var(--radius-md)',
                  padding: '1rem',
                  maxWidth: '360px',
                  margin: '0 auto 1.5rem auto'
                }}>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Reference Number</div>
                  <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--maroon-900)' }}>
                    {referenceNumber}
                  </div>
                </div>

                <a
                  href={`https://wa.me/${BRAND_INFO.whatsappNumber}?text=${whatsappFollowUp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp"
                  style={{ width: '100%', maxWidth: '360px', margin: '0 auto' }}
                >
                  <MessageSquare size={16} />
                  <span>Confirm on WhatsApp</span>
                </a>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                {serverError && (
                  <div style={{
                    background: '#FEF3F2',
                    border: '1px solid #FDA29B',
                    borderRadius: 'var(--radius-md)',
                    padding: '0.85rem',
                    color: '#B42318',
                    fontSize: '0.88rem',
                    marginBottom: '1rem'
                  }}>
                    {serverError}
                  </div>
                )}

                <div className="form-group">
                  <label className="form-label" htmlFor="page-product">
                    Product Interested In <span className="required">*</span>
                  </label>
                  <select
                    id="page-product"
                    value={formData.productName}
                    onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
                    className="form-control"
                  >
                    {PRODUCTS_DATA.map((p) => (
                      <option key={p.id} value={p.name}>
                        {p.name} ({p.priceDisplay}) – Page {p.brochurePage}
                      </option>
                    ))}
                    <option value="Custom Festive Assortment / Multiple Items">
                      Custom Festive Assortment / Multiple Items
                    </option>
                  </select>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label" htmlFor="page-name">Full Name <span className="required">*</span></label>
                    <input
                      id="page-name"
                      type="text"
                      placeholder="Your Full Name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={`form-control ${errors.name ? 'error' : ''}`}
                    />
                    {errors.name && <div className="form-error-msg">{errors.name}</div>}
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="page-phone">Phone / WhatsApp <span className="required">*</span></label>
                    <input
                      id="page-phone"
                      type="tel"
                      placeholder="10-digit number"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className={`form-control ${errors.phone ? 'error' : ''}`}
                    />
                    {errors.phone && <div className="form-error-msg">{errors.phone}</div>}
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label" htmlFor="page-email">Email Address <span className="required">*</span></label>
                    <input
                      id="page-email"
                      type="email"
                      placeholder="name@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={`form-control ${errors.email ? 'error' : ''}`}
                    />
                    {errors.email && <div className="form-error-msg">{errors.email}</div>}
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="page-city">City / Town <span className="required">*</span></label>
                    <input
                      id="page-city"
                      type="text"
                      placeholder="e.g. Pune"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className={`form-control ${errors.city ? 'error' : ''}`}
                    />
                    {errors.city && <div className="form-error-msg">{errors.city}</div>}
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label">Quantity</label>
                    <input
                      type="number"
                      min="1"
                      value={formData.quantity}
                      onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value, 10) || 1 })}
                      className="form-control"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Delivery Type</label>
                    <select
                      value={formData.deliveryPreference}
                      onChange={(e) => setFormData({ ...formData, deliveryPreference: e.target.value })}
                      className="form-control"
                    >
                      <option value="Home Delivery">Home Delivery (India)</option>
                      <option value="Pickup in Pune">Pickup in Hadapsar Pune</option>
                      <option value="International Supply">International Supply</option>
                      <option value="Not Sure">Not Sure</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="page-msg">Special Requirements / Bulk Notes</label>
                  <textarea
                    id="page-msg"
                    rows="3"
                    placeholder="Provide specific notes, color requests, or event dates..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="form-control"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary btn-lg"
                  style={{ width: '100%' }}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      <span>Submitting Enquiry...</span>
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      <span>Submit Enquiry</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Key Policies & Direct Contacts */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Delivery Transparency Card */}
            <div className="card-luxury" style={{ padding: '1.75rem', background: 'var(--bg-primary)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
                <Truck size={22} color="var(--terracotta-600)" />
                <h3 style={{ fontSize: '1.15rem', color: 'var(--maroon-900)', margin: 0 }}>
                  Delivery Charges Policy
                </h3>
              </div>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '0.75rem' }}>
                {BRAND_INFO.deliveryNotice}
              </p>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.7, margin: 0 }}>
                {BRAND_INFO.internationalNotice}
              </p>
            </div>

            {/* Direct Phone Assistance */}
            <div className="card-luxury" style={{ padding: '1.75rem', background: 'var(--bg-primary)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
                <Phone size={22} color="var(--maroon-800)" />
                <h3 style={{ fontSize: '1.15rem', color: 'var(--maroon-900)', margin: 0 }}>
                  Need Immediate Assistance?
                </h3>
              </div>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1rem' }}>
                Speak directly with Rani Toshniwal for urgent orders, society gifting, or custom requirements:
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {BRAND_INFO.phones.map((p, idx) => (
                  <a key={idx} href={`tel:${p.number}`} className="btn btn-outline" style={{ width: '100%', fontSize: '0.9rem' }}>
                    <Phone size={15} />
                    <span>Call {p.number}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Studio Pickup */}
            <div className="card-luxury" style={{ padding: '1.75rem', background: 'var(--bg-primary)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.75rem' }}>
                <MapPin size={22} color="var(--gold-800)" />
                <h3 style={{ fontSize: '1.15rem', color: 'var(--maroon-900)', margin: 0 }}>
                  Hadapsar, Pune Studio
                </h3>
              </div>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
                Orders can be scheduled for pickup directly in Hadapsar, Pune upon prior confirmation.
              </p>
            </div>
          </div>

        </div>

      </div>

      <style>{`
        @media (min-width: 992px) {
          .enquire-page-grid {
            grid-template-columns: 1.25fr 0.75fr !important;
          }
        }
      `}</style>
    </div>
  );
}
