import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  ShoppingBag, 
  Star, 
  Heart, 
  Filter, 
  Check, 
  Plus, 
  Search,
  SlidersHorizontal,
  Droplets
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { mockProducts } from '../data/mockData';
import { ProductCategory, Product } from '../types';

export const ProductsPage: React.FC = () => {
  const { addToCart, wishlistIds, toggleWishlist } = useApp();

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating'>('featured');

  const categories: string[] = [
    'All',
    'Foundation',
    'Lipstick',
    'Concealer',
    'Mascara',
    'Blush',
    'Eyeshadow',
    'Perfume',
    'Haircare',
    'Skincare'
  ];

  const filteredProducts = mockProducts
    .filter(product => {
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      const matchesSearch = 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // featured
    });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header Banner */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FADADD]/40 border border-[#E8B4B8]/50 text-xs font-bold text-[#D98CA3]">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Curated Beauty Collection</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#33272A]">
          Cosmetics & Skincare
        </h1>
        <p className="text-xs sm:text-sm text-[#5C4D51]">
          Dermatologically tested formulations matched to your undertone profile with instant fly-to-bag ordering.
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div className="glass-card p-4 sm:p-6 rounded-3xl space-y-4">
        
        {/* Top Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Search Input */}
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#5C4D51]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products, brands, ingredients..."
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white border border-[#F7CAD0] text-xs text-[#33272A] placeholder-[#5C4D51]/50 focus:outline-hidden focus:border-[#D98CA3] transition-colors"
            />
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <span className="text-xs font-bold text-[#5C4D51] shrink-0">Sort By:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-2 rounded-xl bg-white border border-[#F7CAD0] text-xs font-semibold text-[#33272A] focus:outline-hidden focus:border-[#D98CA3]"
            >
              <option value="featured">Featured Picks</option>
              <option value="rating">Highest Rated</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>

        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pt-2 pb-1 no-scrollbar">
          {categories.map((category) => {
            const isSelected = selectedCategory === category;
            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all shrink-0 ${
                  isSelected
                    ? 'bg-gradient-to-r from-[#D98CA3] to-[#E8B4B8] text-white shadow-xs'
                    : 'bg-white border border-[#F7CAD0]/60 text-[#5C4D51] hover:border-[#D98CA3]'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

      </div>

      {/* Product Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredProducts.map((product) => {
            const isWishlisted = wishlistIds.includes(product.id);

            return (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                whileHover={{ y: -6 }}
                className="glass-card rounded-3xl overflow-hidden border border-[#F7CAD0]/40 flex flex-col justify-between group relative"
              >
                {/* Image Box */}
                <div className="relative aspect-square overflow-hidden bg-[#FFF8F3]">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                    {product.isBestSeller && (
                      <span className="px-2.5 py-1 rounded-full bg-[#D98CA3] text-white text-[10px] font-bold uppercase tracking-wider shadow-xs">
                        Best Seller
                      </span>
                    )}
                    {product.isNew && (
                      <span className="px-2.5 py-1 rounded-full bg-[#EADCF8] text-[#33272A] text-[10px] font-bold uppercase tracking-wider border border-[#C9A7EB]">
                        New Drop
                      </span>
                    )}
                  </div>

                  {/* Wishlist Button */}
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 backdrop-blur-xs flex items-center justify-center text-[#5C4D51] hover:text-[#D98CA3] transition-colors shadow-xs"
                    aria-label="Wishlist"
                  >
                    <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-[#D98CA3] text-[#D98CA3]' : ''}`} />
                  </button>
                </div>

                {/* Content Box */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-[#D98CA3]">
                        {product.brand}
                      </span>
                      <div className="flex items-center gap-1 text-[11px] font-bold text-[#33272A]">
                        <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                        <span>{product.rating}</span>
                        <span className="text-[10px] text-[#5C4D51] font-normal">({product.reviewsCount})</span>
                      </div>
                    </div>

                    <h3 className="font-serif text-base font-bold text-[#33272A] group-hover:text-[#D98CA3] transition-colors mt-1 line-clamp-1">
                      {product.name}
                    </h3>

                    <p className="text-xs text-[#5C4D51] line-clamp-2 mt-1">
                      {product.description}
                    </p>

                    {/* Suitable Skin Types */}
                    <div className="flex flex-wrap gap-1 mt-2.5">
                      {product.suitableSkinType.slice(0, 3).map((st) => (
                        <span
                          key={st}
                          className="px-2 py-0.5 rounded-md bg-[#FFF8F3] border border-[#F7CAD0]/50 text-[10px] font-medium text-[#5C4D51]"
                        >
                          {st} Skin
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Price & Add to Cart */}
                  <div className="pt-3 border-t border-[#F7CAD0]/30 flex items-center justify-between">
                    <span className="font-bold text-base text-[#33272A]">
                      ₹{product.price.toLocaleString('en-IN')}
                    </span>

                    <button
                      onClick={(e) => addToCart(product, product.shadeName, e.currentTarget)}
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#D98CA3] to-[#E8B4B8] text-white text-xs font-bold shadow-xs hover:shadow-md hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-1.5"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add to Cart</span>
                    </button>
                  </div>
                </div>

              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

    </div>
  );
};
