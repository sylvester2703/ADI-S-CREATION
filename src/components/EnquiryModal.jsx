import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, AlertCircle, Loader2, MessageSquare, Phone, Sparkles, Send, MapPin, Truck, Globe, Info } from 'lucide-react';
import confetti from 'canvas-confetti';
import { PRODUCTS_DATA } from '../data/brochureProducts';
import { BRAND_INFO } from '../data/brandInfo';

const INDIAN_STATES = [
  "Maharashtra", "Gujarat", "Delhi NCR", "Karnataka", "Tamil Nadu", "Telangana",
  "Rajasthan", "Uttar Pradesh", "Madhya Pradesh", "West Bengal", "Punjab", "Haryana",
  "Kerala", "Andhra Pradesh", "Goa", "Other State / UT"
];

export default function EnquiryModal({ initialProduct, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    city: '',
    state: 'Maharashtra',
    country: 'India',
    productName: initialProduct ? initialProduct.name : PRODUCTS_DATA[0].name,
    productSlug: initialProduct ? initialProduct.slug : PRODUCTS_DATA[0].slug,
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

  useEffect(() => {
    if (initialProduct) {
      setFormData(prev => ({
        ...prev,
        productName: initialProduct.name,
        productSlug: initialProduct.slug
      }));
    }
  }, [initialProduct]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && !isSubmitting) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [onClose, isSubmitting]);

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim() || formData.name.trim().length < 2) {
      newErrors.name = 'Please enter your full name.';
    }

    const cleanPhone = formData.phone.replace(/\D/g, '');
    if (!cleanPhone || cleanPhone.length < 8 || cleanPhone.length > 15) {
      newErrors.phone = 'Please enter a valid phone/mobile number.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (!formData.city.trim() || formData.city.trim().length < 2) {
      newErrors.city = 'Please enter your city/town.';
    }

    if (!formData.country.trim()) {
      newErrors.country = 'Please select your country.';
    }

    if (!formData.productName.trim()) {
      newErrors.productName = 'Please choose a product.';
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

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to submit enquiry.');
      }

      setReferenceNumber(data.referenceNumber);
      setSubmitSuccess(true);
      if (onSuccess) onSuccess(data.referenceNumber);

      // Trigger celebratory confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#D4AF37', '#73132D', '#C25934', '#E6C555']
        });
      } catch (err) {}

    } catch (err) {
      console.error('Enquiry submission error:', err);
      setServerError(err.message || 'Something went wrong. Please call us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleProductChange = (e) => {
    const selectedName = e.target.value;
    const prod = PRODUCTS_DATA.find(p => p.name === selectedName);
    setFormData(prev => ({
      ...prev,
      productName: selectedName,
      productSlug: prod ? prod.slug : ''
    }));
  };

  const handleQuantityStep = (delta) => {
    setFormData(prev => ({
      ...prev,
      quantity: Math.max(1, (parseInt(prev.quantity, 10) || 1) + delta)
    }));
  };

  const whatsappFollowUpMsg = encodeURIComponent(
    `Hello Adi’s Creation, I have just submitted an online enquiry (Ref: ${referenceNumber}) for "${formData.productName}" (Qty: ${formData.quantity}). Please share confirmation and details.`
  );

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="enquiry-modal-title">
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '680px', width: '100%', padding: 0 }}
      >
        {/* Header */}
        <div style={{
          padding: '1.25rem 1.5rem',
          borderBottom: '1px solid var(--border-subtle)',
          background: 'linear-gradient(135deg, #FCF8F3 0%, #FAF1E4 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontSize: '0.75rem',
              fontWeight: 700,
              color: 'var(--terracotta-600)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              marginBottom: '0.2rem'
            }}>
              <Sparkles size={13} color="#D4AF37" className="diya-glow" />
              <span>ADI’S CREATION • DIRECT ENQUIRY</span>
            </div>
            <h2 id="enquiry-modal-title" style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1.45rem',
              color: 'var(--maroon-900)',
              lineHeight: 1.2
            }}>
              {submitSuccess ? 'Enquiry Confirmed' : 'Make an Enquiry'}
            </h2>
          </div>

          <button
            onClick={onClose}
            disabled={isSubmitting}
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: '#FFF',
              border: '1px solid var(--border-subtle)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--maroon-900)'
            }}
            aria-label="Close Enquiry Form"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '1.5rem', overflowY: 'auto', maxHeight: 'calc(90vh - 80px)' }}>

          {/* SUCCESS SCREEN */}
          {submitSuccess ? (
            <div style={{ textAlign: 'center', padding: '1rem 0' }}>
              <div style={{
                width: '72px',
                height: '72px',
                borderRadius: '50%',
                background: 'var(--status-converted-bg)',
                border: '2px solid var(--status-converted-text)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.25rem auto'
              }}>
                <CheckCircle2 size={42} color="var(--status-converted-text)" />
              </div>

              <h3 style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.6rem',
                color: 'var(--maroon-900)',
                marginBottom: '0.5rem'
              }}>
                Thank You for Your Enquiry!
              </h3>

              <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', maxWidth: '480px', margin: '0 auto 1.5rem auto' }}>
                We have received your enquiry successfully. Rani Toshniwal and our team will review your order requirements and contact you shortly.
              </p>

              {/* Reference Number Box */}
              <div style={{
                background: 'var(--bg-primary)',
                border: '1.5px dashed var(--gold-500)',
                borderRadius: 'var(--radius-lg)',
                padding: '1.25rem',
                maxWidth: '420px',
                margin: '0 auto 1.75rem auto'
              }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', marginBottom: '0.35rem' }}>
                  Your Enquiry Reference ID
                </div>
                <div style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.8rem',
                  fontWeight: 800,
                  color: 'var(--maroon-900)',
                  letterSpacing: '0.05em'
                }}>
                  {referenceNumber}
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '0.35rem' }}>
                  Please quote this reference number for fast assistance.
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxWidth: '420px', margin: '0 auto' }}>
                <a
                  href={`https://wa.me/${BRAND_INFO.whatsappNumber}?text=${whatsappFollowUpMsg}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp btn-lg"
                  style={{ width: '100%' }}
                >
                  <MessageSquare size={18} />
                  <span>Send Confirmation on WhatsApp</span>
                </a>

                <button
                  onClick={onClose}
                  className="btn btn-outline"
                  style={{ width: '100%' }}
                >
                  <span>Back to Collection</span>
                </button>
              </div>
            </div>
          ) : (
            /* ENQUIRY FORM */
            <form onSubmit={handleSubmit}>
              <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                Tell us what you’re looking for and we’ll get back to you. No account creation required.
              </p>

              {serverError && (
                <div style={{
                  background: '#FEF3F2',
                  border: '1px solid #FDA29B',
                  borderRadius: 'var(--radius-md)',
                  padding: '0.85rem 1rem',
                  color: '#B42318',
                  fontSize: '0.88rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  marginBottom: '1.25rem'
                }}>
                  <AlertCircle size={18} />
                  <span>{serverError}</span>
                </div>
              )}

              {/* Product Selection & Quantity */}
              <div style={{
                background: 'var(--bg-secondary)',
                padding: '1.25rem',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--border-subtle)',
                marginBottom: '1.5rem'
              }}>
                <div className="form-group">
                  <label className="form-label" htmlFor="enquiry-product">
                    Product / Product(s) Interested In <span className="required">*</span>
                  </label>
                  <select
                    id="enquiry-product"
                    value={formData.productName}
                    onChange={handleProductChange}
                    className={`form-control ${errors.productName ? 'error' : ''}`}
                  >
                    {PRODUCTS_DATA.map((p) => (
                      <option key={p.id} value={p.name}>
                        {p.name} ({p.priceDisplay}) – Page {p.brochurePage}
                      </option>
                    ))}
                    <option value="Multiple Products / Custom Diya Assortment">
                      Multiple Products / Custom Diya Assortment
                    </option>
                  </select>
                  {errors.productName && <div className="form-error-msg">{errors.productName}</div>}
                </div>

                {/* Quantity Stepper */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
                  <label className="form-label" style={{ marginBottom: 0 }}>
                    Estimated Quantity <span className="required">*</span>
                  </label>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <button
                      type="button"
                      onClick={() => handleQuantityStep(-1)}
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: 'var(--radius-md)',
                        background: '#FFF',
                        border: '1px solid var(--border-subtle)',
                        fontWeight: 700,
                        fontSize: '1.1rem'
                      }}
                      aria-label="Decrease quantity"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      min="1"
                      value={formData.quantity}
                      onChange={(e) => setFormData({ ...formData, quantity: Math.max(1, parseInt(e.target.value, 10) || 1) })}
                      className="form-control"
                      style={{ width: '80px', textAlign: 'center', padding: '0.5rem', fontWeight: 700 }}
                      aria-label="Quantity value"
                    />
                    <button
                      type="button"
                      onClick={() => handleQuantityStep(1)}
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: 'var(--radius-md)',
                        background: '#FFF',
                        border: '1px solid var(--border-subtle)',
                        fontWeight: 700,
                        fontSize: '1.1rem'
                      }}
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Customer Contact Details */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label" htmlFor="enquiry-name">
                    Full Name <span className="required">*</span>
                  </label>
                  <input
                    id="enquiry-name"
                    type="text"
                    placeholder="e.g. Ananya Sharma"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={`form-control ${errors.name ? 'error' : ''}`}
                    required
                  />
                  {errors.name && <div className="form-error-msg">{errors.name}</div>}
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="enquiry-phone">
                    Mobile / WhatsApp Number <span className="required">*</span>
                  </label>
                  <input
                    id="enquiry-phone"
                    type="tel"
                    placeholder="e.g. 9876543210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className={`form-control ${errors.phone ? 'error' : ''}`}
                    required
                  />
                  {errors.phone && <div className="form-error-msg">{errors.phone}</div>}
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="enquiry-email">
                  Email Address <span className="required">*</span>
                </label>
                <input
                  id="enquiry-email"
                  type="email"
                  placeholder="e.g. ananya@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={`form-control ${errors.email ? 'error' : ''}`}
                  required
                />
                {errors.email && <div className="form-error-msg">{errors.email}</div>}
              </div>

              {/* Location Fields */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label" htmlFor="enquiry-city">
                    City / Town <span className="required">*</span>
                  </label>
                  <input
                    id="enquiry-city"
                    type="text"
                    placeholder="e.g. Pune / Mumbai"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className={`form-control ${errors.city ? 'error' : ''}`}
                    required
                  />
                  {errors.city && <div className="form-error-msg">{errors.city}</div>}
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="enquiry-state">
                    State / Region
                  </label>
                  <select
                    id="enquiry-state"
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="form-control"
                  >
                    {INDIAN_STATES.map((st) => (
                      <option key={st} value={st}>{st}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="enquiry-country">
                    Country <span className="required">*</span>
                  </label>
                  <select
                    id="enquiry-country"
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    className="form-control"
                  >
                    <option value="India">India</option>
                    <option value="United States">United States</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="UAE / Middle East">UAE / Middle East</option>
                    <option value="Australia">Australia</option>
                    <option value="Canada">Canada</option>
                    <option value="Singapore">Singapore</option>
                    <option value="Other Country">Other Country</option>
                  </select>
                </div>
              </div>

              {/* Delivery Preference */}
              <div className="form-group">
                <label className="form-label">
                  Delivery Preference <span className="required">*</span>
                </label>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                  gap: '0.6rem'
                }}>
                  {[
                    { id: 'Home Delivery', label: 'Home Delivery', icon: <Truck size={14} /> },
                    { id: 'Pickup in Pune', label: 'Pickup in Pune', icon: <MapPin size={14} /> },
                    { id: 'International Supply', label: 'International Supply', icon: <Globe size={14} /> },
                    { id: 'Not Sure', label: 'Not Sure / Advice', icon: <Info size={14} /> }
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, deliveryPreference: opt.id })}
                      style={{
                        padding: '0.65rem 0.75rem',
                        borderRadius: 'var(--radius-md)',
                        fontSize: '0.82rem',
                        fontWeight: formData.deliveryPreference === opt.id ? 700 : 500,
                        background: formData.deliveryPreference === opt.id ? 'var(--maroon-800)' : '#FFF',
                        color: formData.deliveryPreference === opt.id ? '#FFF' : 'var(--text-primary)',
                        border: formData.deliveryPreference === opt.id ? '1px solid var(--maroon-900)' : '1px solid var(--border-subtle)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.4rem',
                        cursor: 'pointer'
                      }}
                    >
                      {opt.icon}
                      <span>{opt.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Preferred Contact Method */}
              <div className="form-group">
                <label className="form-label">Preferred Contact Method</label>
                <div style={{ display: 'flex', gap: '1.25rem', fontSize: '0.9rem' }}>
                  {['WhatsApp', 'Phone Call', 'Email'].map((method) => (
                    <label key={method} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer' }}>
                      <input
                        type="radio"
                        name="preferredContact"
                        value={method}
                        checked={formData.preferredContact === method}
                        onChange={(e) => setFormData({ ...formData, preferredContact: e.target.value })}
                      />
                      <span>{method}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Message / Bulk Quantity */}
              <div className="form-group">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <label className="form-label" htmlFor="enquiry-msg">
                    Message / Special Requirements / Bulk Order Info
                  </label>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Optional</span>
                </div>
                <textarea
                  id="enquiry-msg"
                  rows="3"
                  placeholder="Mention color preferences, bulk quantity requirements, or festive gifting notes..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="form-control"
                  style={{ resize: 'vertical' }}
                />
              </div>

              {/* Transparent Delivery Notice */}
              <div style={{
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-gold)',
                borderRadius: 'var(--radius-md)',
                padding: '0.85rem 1rem',
                fontSize: '0.8rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.6,
                marginBottom: '1.5rem'
              }}>
                <div style={{ fontWeight: 700, color: 'var(--maroon-900)', marginBottom: '0.2rem' }}>
                  Delivery &amp; Shipping Policy
                </div>
                <div>• {BRAND_INFO.deliveryNotice}</div>
                <div>• {BRAND_INFO.indiaSupplyNotice}</div>
                <div>• {BRAND_INFO.internationalNotice}</div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary btn-lg"
                style={{ width: '100%', padding: '1rem' }}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    <span>Submitting Enquiry...</span>
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    <span>Submit Diya Enquiry</span>
                  </>
                )}
              </button>
            </form>
          )}

        </div>
      </div>
    </div>
  );
}
