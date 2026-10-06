import React, { useState } from 'react';
import Hero from '../components/Hero';
import TrustHighlights from '../components/TrustHighlights';
import AboutSection from '../components/AboutSection';
import BestSellers from '../components/BestSellers';
import ProductCard from '../components/ProductCard';
import ProductFilter from '../components/ProductFilter';
import SupplyInfoSection from '../components/SupplyInfoSection';
import ContactSection from '../components/ContactSection';
import { PRODUCTS_DATA, CATEGORIES } from '../data/brochureProducts';
import { BookOpen, ArrowRight, Sparkles } from 'lucide-react';

export default function HomePage({ setActivePage, onSelectProduct, onOpenEnquiry }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [priceUnitFilter, setPriceUnitFilter] = useState('all');

  // Filter & Sort Logic
  const filteredProducts = PRODUCTS_DATA.filter((item) => {
    // Category match
    if (selectedCategory === 'bestsellers' && !item.isBestSeller) return false;
    if (selectedCategory === 'pairs' && !item.category.includes('Pairs') && !item.categoryTag.includes('Pairs')) return false;
    if (selectedCategory === 'samai' && !item.category.includes('Samai')) return false;
    if (selectedCategory === 'hanging' && !item.category.includes('Hanging')) return false;
    if (selectedCategory === 'peacock' && !item.category.includes('Peacock') && !item.categoryTag.includes('Peacock')) return false;
    if (selectedCategory === 'lantern' && !item.category.includes('Lantern')) return false;
    if (selectedCategory === 'decorative' && !item.category.includes('Decorative')) return false;
    if (selectedCategory === 'festive' && !item.category.includes('Festive') && !item.category.includes('Laxmi Ganpati')) return false;

    // Pricing unit match
    if (priceUnitFilter === 'pair' && !item.pairPrice) return false;
    if (priceUnitFilter === 'single' && !item.singlePrice) return false;

    // Search query match
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = item.name.toLowerCase().includes(q);
      const matchCat = item.category.toLowerCase().includes(q) || item.categoryTag.toLowerCase().includes(q);
      const matchDesc = item.description.toLowerCase().includes(q);
      const matchColors = item.coloursList && item.coloursList.some(c => c.toLowerCase().includes(q));
      if (!matchName && !matchCat && !matchDesc && !matchColors) return false;
    }

    return true;
  }).sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
    return a.brochurePage - b.brochurePage;
  });

  return (
    <div style={{ flexGrow: 1 }}>
      {/* 1. Hero Section */}
      <Hero
        onExploreClick={() => {
          const el = document.getElementById('catalogue-section');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        onViewBrochureClick={() => setActivePage('brochure')}
        onOpenEnquiry={() => onOpenEnquiry()}
      />

      {/* 2. Trust Highlights */}
      <TrustHighlights />

      {/* 3. About Us Section */}
      <AboutSection
        onExploreClick={() => {
          const el = document.getElementById('catalogue-section');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenEnquiry={() => onOpenEnquiry()}
      />

      {/* 4. Best Sellers Showcase */}
      <BestSellers
        onSelectProduct={onSelectProduct}
        onOpenEnquiry={onOpenEnquiry}
        onViewAllClick={() => {
          const el = document.getElementById('catalogue-section');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* 5. Main Product Catalogue Section */}
      <section id="catalogue-section" className="section-padding" style={{
        background: 'var(--bg-primary)',
        borderBottom: '1px solid var(--border-subtle)'
      }}>
        <div className="container">
          
          <div className="section-header">
            <div className="section-subtitle">
              <Sparkles size={15} color="#D4AF37" className="diya-glow" />
              <span>Diya Collection 2026</span>
            </div>
            <h2 className="section-title">
              Explore Our Handcrafted Collection
            </h2>
            <div className="ornament-divider">
              <span className="ornament-line"></span>
              <span className="ornament-icon">🪔</span>
              <span className="ornament-line"></span>
            </div>
            <p className="section-desc">
              Browse over 50+ varieties of authentic handcrafted terracotta diyas directly sourced from our 2026 brochure.
            </p>
          </div>

          {/* Filter Bar */}
          <ProductFilter
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            sortBy={sortBy}
            setSortBy={setSortBy}
            priceUnitFilter={priceUnitFilter}
            setPriceUnitFilter={setPriceUnitFilter}
            totalResults={filteredProducts.length}
          />

          {/* Products Grid */}
          {filteredProducts.length > 0 ? (
            <div className="product-grid">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onSelect={onSelectProduct}
                  onEnquire={onOpenEnquiry}
                />
              ))}
            </div>
          ) : (
            <div style={{
              background: '#FFF',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-xl)',
              padding: '3rem 1.5rem',
              textAlign: 'center',
              maxWidth: '540px',
              margin: '2rem auto'
            }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🪔</div>
              <h3 style={{ fontFamily: 'var(--font-serif)', color: 'var(--maroon-900)', marginBottom: '0.5rem' }}>
                No diyas match your current filter
              </h3>
              <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                Try searching for another keyword or reset the category filters to browse all 26 catalog designs.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSearchQuery('');
                  setPriceUnitFilter('all');
                  setSortBy('featured');
                }}
                className="btn btn-outline"
              >
                Reset All Filters
              </button>
            </div>
          )}

        </div>
      </section>

      {/* 6. Digital Brochure Featurette Banner */}
      <section style={{
        background: 'linear-gradient(135deg, #3D0816 0%, #5C0F22 100%)',
        padding: '3.5rem 0',
        color: '#FFF',
        borderBottom: '1px solid var(--border-subtle)'
      }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2.5rem',
            alignItems: 'center'
          }}>
            <div>
              <div className="badge-gold" style={{ marginBottom: '0.85rem' }}>
                <BookOpen size={13} />
                <span>OFFICIAL 2026 CATALOGUE</span>
              </div>
              <h2 style={{ color: '#F6E6AC', fontSize: '2rem', marginBottom: '1rem' }}>
                Download Original Diya Collection Brochure
              </h2>
              <p style={{ color: '#EEDBDF', fontSize: '1rem', lineHeight: 1.7, marginBottom: '1.75rem' }}>
                View all 18 pages of authentic product photographs, dimensions, color variants, and pricing. Available for online preview or instant PDF download.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.85rem' }}>
                <button
                  onClick={() => setActivePage('brochure')}
                  className="btn btn-gold btn-lg"
                >
                  <BookOpen size={18} />
                  <span>Interactive 18-Page Viewer</span>
                </button>
                <a
                  href="/assets/brochure/Adis_Creation_Diya_Collection_2026.pdf"
                  download="Adis_Creation_Diya_Collection_2026.pdf"
                  className="btn btn-outline"
                  style={{ color: '#FFF', borderColor: 'rgba(255,255,255,0.4)' }}
                >
                  <span>Download PDF</span>
                </a>
              </div>
            </div>

            <div style={{ textAlign: 'center' }}>
              <img
                src="/assets/brochure/page-01.jpg"
                alt="Adi's Creation Brochure Cover"
                style={{
                  maxWidth: '280px',
                  margin: '0 auto',
                  borderRadius: 'var(--radius-lg)',
                  boxShadow: '0 12px 36px rgba(0,0,0,0.4)',
                  border: '2px solid var(--gold-500)'
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 7. Supply & Logistics Info */}
      <SupplyInfoSection onOpenEnquiry={() => onOpenEnquiry()} />

      {/* 8. Contact Section */}
      <ContactSection onOpenEnquiry={() => onOpenEnquiry()} />

    </div>
  );
}
