import React, { useState, useMemo } from 'react';
import { SAMPLE_PRODUCTS, CATEGORIES } from '../data/products';
import { ProductCategory, Product } from '../types';
import { ProductCard } from './ProductCard';
import { Search, SlidersHorizontal, ArrowUpDown, X, Sparkles } from 'lucide-react';

interface ProductCatalogueProps {
  activeCategory: ProductCategory;
  onCategoryChange: (category: ProductCategory) => void;
  searchQuery: string;
  onSearchQueryChange: (query: string) => void;
}

export const ProductCatalogue: React.FC<ProductCatalogueProps> = ({
  activeCategory,
  onCategoryChange,
  searchQuery,
  onSearchQueryChange
}) => {
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating' | 'name'>('featured');

  // Filter & Sort
  const filteredProducts = useMemo(() => {
    let result = [...SAMPLE_PRODUCTS];

    // Filter by Category
    if (activeCategory !== 'all') {
      result = result.filter((p) => p.category === activeCategory);
    }

    // Filter by Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.shortDescription.toLowerCase().includes(q) ||
          p.categoryLabel.toLowerCase().includes(q) ||
          p.origin.toLowerCase().includes(q)
      );
    }

    // Sort
    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'name') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [activeCategory, searchQuery, sortBy]);

  const resetFilters = () => {
    onCategoryChange('all');
    onSearchQueryChange('');
    setSortBy('featured');
  };

  return (
    <section id="shop" className="w-full py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E3F0D7] text-[#315F39] text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            Fresh From Certified Soils
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#315F39] mb-3">
            Our Products
          </h2>
          <p className="text-sm sm:text-base text-[#203D26]/75">
            Handpicked daily from eco-conscious local farms, delivered cold and crisp to your kitchen table.
          </p>
        </div>

        {/* Filter and Search Controls */}
        <div className="bg-white rounded-3xl p-4 sm:p-5 border border-[#E3F0D7] shadow-xs mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => onCategoryChange(cat.id as ProductCategory)}
                  className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-[#315F39] text-[#F7FAEF] shadow-xs'
                      : 'bg-[#F7FAEF] text-[#203D26] hover:bg-[#E3F0D7] border border-[#E3F0D7]/80'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Search & Sort Controls */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            {/* Search Input */}
            <div className="relative flex-1 md:w-64">
              <Search className="w-4 h-4 text-[#7EA778] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => onSearchQueryChange(e.target.value)}
                className="w-full pl-9 pr-8 py-2 text-xs sm:text-sm bg-[#F7FAEF] rounded-full border border-[#E3F0D7] focus:outline-none focus:ring-2 focus:ring-[#315F39] text-[#203D26]"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchQueryChange('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="appearance-none bg-[#F7FAEF] border border-[#E3F0D7] text-[#203D26] text-xs sm:text-sm font-semibold rounded-full pl-3.5 pr-8 py-2 focus:outline-none focus:ring-2 focus:ring-[#315F39] cursor-pointer"
                aria-label="Sort products"
              >
                <option value="featured">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="name">Alphabetical</option>
              </select>
              <ArrowUpDown className="w-3.5 h-3.5 text-[#7EA778] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Results stats */}
        <div className="flex items-center justify-between text-xs text-[#203D26]/70 mb-6 px-1">
          <span>
            Showing <strong className="text-[#315F39]">{filteredProducts.length}</strong> organic foods
            {activeCategory !== 'all' && <span> in <strong className="capitalize">{activeCategory.replace('-', ' ')}</strong></span>}
            {searchQuery && <span> matching "<strong className="text-[#315F39]">{searchQuery}</strong>"</span>}
          </span>
          {(activeCategory !== 'all' || searchQuery) && (
            <button
              onClick={resetFilters}
              className="text-[#315F39] hover:underline font-semibold"
            >
              Clear all filters
            </button>
          )}
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="bg-white rounded-3xl p-12 text-center border border-[#E3F0D7] max-w-lg mx-auto shadow-xs my-6">
            <div className="w-16 h-16 rounded-full bg-[#E3F0D7] text-[#315F39] flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8" />
            </div>
            <h3 className="font-serif text-xl font-bold text-[#315F39] mb-2">No matching products found</h3>
            <p className="text-sm text-[#203D26]/75 mb-6">
              We couldn't find any organic food matching your filters. Try adjusting your search keyword or browse all items.
            </p>
            <button
              onClick={resetFilters}
              className="px-6 py-3 rounded-full bg-[#315F39] hover:bg-[#234529] text-white font-semibold text-xs tracking-wider uppercase transition-colors"
            >
              Show All Products
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
