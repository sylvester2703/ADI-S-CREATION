import React, { useState } from 'react';
import ProductCard from '../components/ProductCard';
import ProductFilter from '../components/ProductFilter';
import { PRODUCTS_DATA } from '../data/brochureProducts';
import { Sparkles, ArrowLeft } from 'lucide-react';

export default function CollectionPage({ setActivePage, onSelectProduct, onOpenEnquiry }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [priceUnitFilter, setPriceUnitFilter] = useState('all');

  const filteredProducts = PRODUCTS_DATA.filter((item) => {
    if (selectedCategory === 'bestsellers' && !item.isBestSeller) return false;
    if (selectedCategory === 'pairs' && !item.category.includes('Pairs') && !item.categoryTag.includes('Pairs')) return false;
    if (selectedCategory === 'samai' && !item.category.includes('Samai')) return false;
    if (selectedCategory === 'hanging' && !item.category.includes('Hanging')) return false;
    if (selectedCategory === 'peacock' && !item.category.includes('Peacock') && !item.categoryTag.includes('Peacock')) return false;
    if (selectedCategory === 'lantern' && !item.category.includes('Lantern')) return false;
    if (selectedCategory === 'decorative' && !item.category.includes('Decorative')) return false;
    if (selectedCategory === 'festive' && !item.category.includes('Festive') && !item.category.includes('Laxmi Ganpati')) return false;

    if (priceUnitFilter === 'pair' && !item.pairPrice) return false;
    if (priceUnitFilter === 'single' && !item.singlePrice) return false;

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
    <div className="section-padding" style={{ background: 'var(--bg-primary)', flexGrow: 1 }}>
      <div className="container">
        
        {/* Breadcrumbs */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
          <button onClick={() => setActivePage('home')} style={{ color: 'var(--maroon-800)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <ArrowLeft size={14} /> Home
          </button>
          <span>/</span>
          <span>Collection 2026</span>
        </div>

        {/* Page Header */}
        <div className="section-header">
          <div className="section-subtitle">
            <Sparkles size={15} color="#D4AF37" className="diya-glow" />
            <span>Complete Diya Catalogue 2026</span>
          </div>
          <h1 className="section-title">
            Handcrafted Diya Collection
          </h1>
          <div className="ornament-divider">
            <span className="ornament-line"></span>
            <span className="ornament-icon">🪔</span>
            <span className="ornament-line"></span>
          </div>
          <p className="section-desc">
            Explore every artisan piece from the original brochure — from royal peacock pillar samais to protective dome akhand diyas and hanging temple arches.
          </p>
        </div>

        {/* Filter Controls */}
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

        {/* Product Grid */}
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
    </div>
  );
}
