import React from 'react';
import { Truck, Globe, MapPin, Package, ShieldCheck, Clock } from 'lucide-react';
import { BRAND_INFO } from '../data/brandInfo';

export default function SupplyInfoSection({ onOpenEnquiry }) {
  return (
    <section className="section-padding" style={{
      background: 'var(--bg-secondary)',
      borderBottom: '1px solid var(--border-subtle)'
    }}>
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header">
          <div className="section-subtitle">
            <Truck size={15} color="#C25934" />
            <span>Delivery &amp; Logistics</span>
          </div>
          <h2 className="section-title">
            India-Wide &amp; International Supply
          </h2>
          <div className="ornament-divider">
            <span className="ornament-line"></span>
            <span className="ornament-icon">🪔</span>
            <span className="ornament-line"></span>
          </div>
          <p className="section-desc">
            Whether you require diyas for your home, festive gifting, society celebrations, or international delivery, we facilitate safe and secure shipments.
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.75rem',
          marginBottom: '2.5rem'
        }}>
          {/* India-Wide Supply Card */}
          <div className="card-luxury" style={{ padding: '2rem', background: '#FFF' }}>
            <div style={{
              width: '52px',
              height: '52px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--maroon-100)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1.25rem'
            }}>
              <Truck size={26} color="var(--maroon-800)" />
            </div>
            <h3 style={{ fontSize: '1.25rem', color: 'var(--maroon-900)', marginBottom: '0.6rem' }}>
              All-India Home Delivery
            </h3>
            <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '1rem' }}>
              {BRAND_INFO.indiaSupplyNotice}
            </p>
            <div style={{
              background: 'var(--bg-primary)',
              padding: '0.75rem 1rem',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.82rem',
              color: 'var(--text-secondary)',
              borderLeft: '3px solid var(--maroon-800)'
            }}>
              {BRAND_INFO.deliveryNotice}
            </div>
          </div>

          {/* International Supply Card */}
          <div className="card-luxury" style={{ padding: '2rem', background: '#FFF' }}>
            <div style={{
              width: '52px',
              height: '52px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--gold-100)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1.25rem'
            }}>
              <Globe size={26} color="var(--gold-800)" />
            </div>
            <h3 style={{ fontSize: '1.25rem', color: 'var(--maroon-900)', marginBottom: '0.6rem' }}>
              Worldwide International Supply
            </h3>
            <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '1rem' }}>
              Bringing the authentic warmth of Indian Diwali diyas to families and diaspora across the world.
            </p>
            <div style={{
              background: 'var(--bg-primary)',
              padding: '0.75rem 1rem',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.82rem',
              color: 'var(--text-secondary)',
              borderLeft: '3px solid var(--gold-600)'
            }}>
              {BRAND_INFO.internationalNotice}
            </div>
          </div>

          {/* Pune Pickup Card */}
          <div className="card-luxury" style={{ padding: '2rem', background: '#FFF' }}>
            <div style={{
              width: '52px',
              height: '52px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--terracotta-100)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1.25rem'
            }}>
              <MapPin size={26} color="var(--terracotta-700)" />
            </div>
            <h3 style={{ fontSize: '1.25rem', color: 'var(--maroon-900)', marginBottom: '0.6rem' }}>
              Local Hadapsar, Pune Pickup
            </h3>
            <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '1rem' }}>
              Customers in Pune can arrange direct order pickup from Hadapsar after confirming their requirements.
            </p>
            <div style={{
              background: 'var(--bg-primary)',
              padding: '0.75rem 1rem',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.82rem',
              color: 'var(--text-secondary)',
              borderLeft: '3px solid var(--terracotta-600)'
            }}>
              Direct coordination with Rani Toshniwal for pickup scheduling.
            </div>
          </div>
        </div>

        {/* Action Banner */}
        <div style={{
          background: 'linear-gradient(135deg, var(--maroon-900) 0%, var(--maroon-800) 100%)',
          borderRadius: 'var(--radius-xl)',
          padding: '2rem',
          color: '#FFF',
          border: '1px solid var(--gold-500)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1.5rem',
          boxShadow: 'var(--shadow-md)'
        }}>
          <div>
            <h3 style={{ color: '#F6E6AC', fontSize: '1.35rem', marginBottom: '0.35rem' }}>
              Have Questions About Shipping &amp; Large Orders?
            </h3>
            <p style={{ color: '#EADBCE', fontSize: '0.92rem', margin: 0 }}>
              Submit an enquiry with your destination city or country and our team will provide delivery estimates.
            </p>
          </div>

          <button
            onClick={onOpenEnquiry}
            className="btn btn-gold btn-lg"
          >
            <span>Request Delivery Estimate</span>
          </button>
        </div>

      </div>
    </section>
  );
}
