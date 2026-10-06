import React from 'react';
import { Search, X, Filter, ArrowUpDown, Sparkles } from 'lucide-react';
import { CATEGORIES } from '../data/brochureProducts';

export default function ProductFilter({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  sortBy,
  setSortBy,
  priceUnitFilter,
  setPriceUnitFilter,
  totalResults
}) {
  return (
    <div style={{
      background: '#FFF',
      padding: '1.25rem',
      borderRadius: 'var(--radius-lg)',
      border: '1px solid var(--border-subtle)',
      boxShadow: 'var(--shadow-sm)',
      marginBottom: '2rem'
    }}>
      {/* Search Bar & Dropdowns Row */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: '1rem',
        marginBottom: '1.25rem'
      }} className="filter-top-row">
        
        {/* Search Input */}
        <div style={{ position: 'relative' }}>
          <Search 
            size={18} 
            color="#877476" 
            style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} 
          />
          <input
            type="text"
            placeholder="Search by name, motif (peacock, samai, elephant, shankh, sup)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="form-control"
            style={{ paddingLeft: '2.6rem', paddingRight: searchQuery ? '2.5rem' : '1rem' }}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              style={{
                position: 'absolute',
                right: '0.85rem',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#877476',
                padding: '0.2rem'
              }}
              aria-label="Clear search"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Dropdowns Container */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: '0.75rem'
        }}>
          {/* Price Unit Filter */}
          <div style={{ position: 'relative' }}>
            <select
              value={priceUnitFilter}
              onChange={(e) => setPriceUnitFilter(e.target.value)}
              className="form-control"
              style={{ fontSize: '0.88rem', padding: '0.65rem 0.85rem' }}
              aria-label="Filter by pricing unit"
            >
              <option value="all">All Units (Single &amp; Pairs)</option>
              <option value="pair">In Pairs Only</option>
              <option value="single">Single Pieces Only</option>
            </select>
          </div>

          {/* Sort By Dropdown */}
          <div style={{ position: 'relative' }}>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="form-control"
              style={{ fontSize: '0.88rem', padding: '0.65rem 0.85rem' }}
              aria-label="Sort products"
            >
              <option value="featured">Featured Brochure Order</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name-asc">Name: A to Z</option>
            </select>
          </div>
        </div>

      </div>

      {/* Category Pills Strip */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        overflowX: 'auto',
        paddingBottom: '0.5rem',
        scrollbarWidth: 'thin'
      }}>
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              style={{
                padding: '0.45rem 0.95rem',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.85rem',
                fontWeight: isSelected ? 700 : 500,
                whiteSpace: 'nowrap',
                transition: 'all var(--transition-fast)',
                background: isSelected 
                  ? 'linear-gradient(135deg, var(--maroon-800) 0%, var(--maroon-900) 100%)' 
                  : 'var(--bg-secondary)',
                color: isSelected ? '#FFF' : 'var(--text-primary)',
                border: isSelected 
                  ? '1px solid var(--gold-500)' 
                  : '1px solid var(--border-subtle)',
                boxShadow: isSelected ? 'var(--shadow-sm)' : 'none'
              }}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Active Filter Stats & Reset */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: '0.85rem',
        paddingTop: '0.75rem',
        borderTop: '1px solid var(--border-subtle)',
        fontSize: '0.82rem',
        color: 'var(--text-secondary)'
      }}>
        <div>
          Showing <strong>{totalResults}</strong> handcrafted designs
          {selectedCategory !== 'all' && <span> in <em>{CATEGORIES.find(c => c.id === selectedCategory)?.label}</em></span>}
          {searchQuery && <span> matching "<strong>{searchQuery}</strong>"</span>}
        </div>

        {(selectedCategory !== 'all' || searchQuery || priceUnitFilter !== 'all') && (
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSearchQuery('');
              setPriceUnitFilter('all');
              setSortBy('featured');
            }}
            style={{
              color: 'var(--maroon-800)',
              fontWeight: 600,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.25rem'
            }}
          >
            <X size={14} /> Reset Filters
          </button>
        )}
      </div>

      <style>{`
        @media (min-width: 768px) {
          .filter-top-row {
            grid-template-columns: 1.5fr 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
