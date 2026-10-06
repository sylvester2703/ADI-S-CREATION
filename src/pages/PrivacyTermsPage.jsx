import React from 'react';
import { ArrowLeft, ShieldCheck, FileText, Lock, Sparkles } from 'lucide-react';
import { BRAND_INFO } from '../data/brandInfo';

export default function PrivacyTermsPage({ setActivePage }) {
  return (
    <div className="section-padding" style={{ background: 'var(--bg-primary)', flexGrow: 1 }}>
      <div className="container" style={{ maxWidth: '840px' }}>
        
        {/* Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
          <button onClick={() => setActivePage('home')} style={{ color: 'var(--maroon-800)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <ArrowLeft size={14} /> Home
          </button>
          <span>/</span>
          <span>Privacy Policy &amp; Terms</span>
        </div>

        <div className="section-header" style={{ textAlign: 'left', margin: '0 0 2rem 0' }}>
          <div className="section-subtitle">
            <ShieldCheck size={15} color="#D4AF37" />
            <span>Transparency &amp; Trust</span>
          </div>
          <h1 className="section-title">
            Privacy Policy &amp; Business Terms
          </h1>
          <div className="ornament-divider" style={{ margin: '1rem 0' }}>
            <span className="ornament-line" style={{ width: '60px' }}></span>
            <span className="ornament-icon">🪔</span>
            <span className="ornament-line" style={{ width: '60px' }}></span>
          </div>
        </div>

        <div className="card-luxury" style={{ padding: '2rem', background: '#FFF', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
            <Lock size={22} color="var(--maroon-800)" />
            <h2 style={{ fontSize: '1.3rem', color: 'var(--maroon-900)', margin: 0 }}>
              Privacy &amp; Data Handling Policy
            </h2>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
            <p>
              At <strong>Adi’s Creation – Lights n Lamps</strong>, we value the trust of our customers. When you submit an enquiry through our website, we collect your name, mobile number, email address, location, and product requirements.
            </p>
            <ul style={{ paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li><strong>Purpose of Data Collection:</strong> Customer information is collected solely for the purpose of communicating regarding product availability, answering enquiries, and coordinating delivery.</li>
              <li><strong>Privacy Guarantee:</strong> Customer contact details and order details are never published, shared, or sold to any third-party marketing companies.</li>
              <li><strong>Restricted Admin Access:</strong> Enquiry information is securely stored and accessible only to authorized administrators (Rani Toshniwal &amp; team) managing client orders.</li>
              <li><strong>No Financial Card Storage:</strong> Our website functions as an artisan product catalogue and enquiry portal. We do not collect or store credit card, debit card, or net banking credentials.</li>
            </ul>
          </div>
        </div>

        <div className="card-luxury" style={{ padding: '2rem', background: '#FFF' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
            <FileText size={22} color="var(--gold-800)" />
            <h2 style={{ fontSize: '1.3rem', color: 'var(--maroon-900)', margin: 0 }}>
              Product Catalogue &amp; Delivery Terms
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
            <p>
              Please note the following operational terms regarding our 2026 Diya Collection:
            </p>
            <ul style={{ paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li><strong>Handcrafted Character:</strong> All diyas are handcrafted by skilled artisans. Minor variations in hand-painted motifs, stone accents, or color shades are natural characteristics of authentic artisan craftsmanship.</li>
              <li><strong>Brochure Prices:</strong> Prices displayed on this website strictly reflect the official 2026 Season Brochure rates. Product availability is subject to seasonal stock.</li>
              <li><strong>Home Delivery Charges:</strong> Home delivery is available across India. Delivery charges are not included in the catalogue product price and will be calculated separately based on destination pincode and total order weight.</li>
              <li><strong>International Shipping:</strong> International supply is available. Freight, customs duty (if any), and applicable handling costs are calculated individually based on destination country and parcel size.</li>
              <li><strong>Bulk &amp; Festive Enquiries:</strong> For larger quantities or custom festive gifting sets, customers are encouraged to submit their requirements in advance to ensure timely artisan production.</li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
}
