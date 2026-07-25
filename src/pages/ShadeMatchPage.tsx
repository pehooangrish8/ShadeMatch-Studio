import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  Palette, 
  Check, 
  Plus, 
  ShoppingBag, 
  SlidersHorizontal,
  Info,
  CheckCircle2,
  Layers,
  Award
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { mockFoundationShades } from '../data/mockData';
import { FoundationShade } from '../types';

export const ShadeMatchPage: React.FC = () => {
  const { profile, addToCart } = useApp();

  const [selectedShadeIds, setSelectedShadeIds] = useState<string[]>(['shade-1', 'shade-2']);
  const [filterUndertone, setFilterUndertone] = useState<string>('All');

  const toggleSelectShade = (id: string) => {
    setSelectedShadeIds(prev => {
      if (prev.includes(id)) {
        if (prev.length <= 1) return prev; // Keep at least 1 for comparison
        return prev.filter(sId => sId !== id);
      } else {
        if (prev.length >= 4) return [...prev.slice(1), id]; // Max 4 compared
        return [...prev, id];
      }
    });
  };

  const filteredShades = mockFoundationShades.filter(s =>
    filterUndertone === 'All' || s.undertone === filterUndertone
  );

  const comparedShades = mockFoundationShades.filter(s => selectedShadeIds.includes(s.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header Banner */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FADADD]/40 border border-[#E8B4B8]/50 text-xs font-bold text-[#D98CA3]">
          <Palette className="w-3.5 h-3.5" />
          <span>Multi-Shade Color Science</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#33272A]">
          AI Shade Comparison
        </h1>
        <p className="text-xs sm:text-sm text-[#5C4D51]">
          Side-by-side analysis of foundation undertones, finish, coverage, and formulation compatibility with your skin tone.
        </p>
      </div>

      {/* User Calibrated Profile Quick Summary */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-[#FFF8F3] via-[#FADADD]/30 to-[#FFF9FB] border border-[#F7CAD0] flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <img src={profile.avatar} alt={profile.name} className="w-10 h-10 rounded-full object-cover ring-2 ring-[#E8B4B8]" />
          <div>
            <p className="text-xs font-bold text-[#33272A]">Your Calibrated Complexion Profile</p>
            <p className="text-xs text-[#5C4D51]">
              Category: <span className="font-bold text-[#D98CA3]">{profile.skinTone}</span> · Undertone: <span className="font-bold text-[#D98CA3]">{profile.undertone}</span> · Type: <span className="font-bold text-[#33272A]">{profile.skinType}</span>
            </p>
          </div>
        </div>

        <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-white border border-[#F7CAD0] text-[#D98CA3]">
          Target Match Level: 95%+
        </span>
      </div>

      {/* Shade Selection Drawer / Swatches Bar */}
      <div className="glass-card p-6 rounded-3xl space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-serif text-lg font-bold text-[#33272A]">
              Select Shades to Compare (2 to 4 Selected)
            </h3>
            <p className="text-xs text-[#5C4D51]">Tap swatch cards to toggle comparison in the live table matrix below.</p>
          </div>

          {/* Undertone Filter Buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            {['All', 'Neutral', 'Warm', 'Peach', 'Olive'].map((ut) => (
              <button
                key={ut}
                onClick={() => setFilterUndertone(ut)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  filterUndertone === ut
                    ? 'bg-[#D98CA3] text-white shadow-xs'
                    : 'bg-white border border-[#F7CAD0] text-[#5C4D51] hover:border-[#D98CA3]'
                }`}
              >
                {ut}
              </button>
            ))}
          </div>
        </div>

        {/* Swatches Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {filteredShades.map((shade) => {
            const isSelected = selectedShadeIds.includes(shade.id);

            return (
              <button
                key={shade.id}
                onClick={() => toggleSelectShade(shade.id)}
                className={`p-3 rounded-2xl border text-left transition-all relative ${
                  isSelected
                    ? 'border-[#D98CA3] bg-[#FADADD]/30 ring-2 ring-[#D98CA3]/30 scale-[1.02]'
                    : 'border-[#F7CAD0]/50 hover:border-[#D98CA3] bg-white'
                }`}
              >
                {isSelected && (
                  <span className="absolute top-2 right-2 w-5 h-5 rounded-full bg-[#D98CA3] text-white flex items-center justify-center text-[10px] font-bold">
                    ✓
                  </span>
                )}

                <div
                  className="w-10 h-10 rounded-xl mb-2 shadow-inner border border-black/10"
                  style={{ backgroundColor: shade.hex }}
                />

                <span className="text-[10px] uppercase font-bold text-[#D98CA3] block">{shade.brand}</span>
                <h4 className="font-bold text-xs text-[#33272A] line-clamp-1">{shade.shadeName}</h4>
                <p className="text-[10px] text-[#5C4D51] mt-0.5">{shade.matchPercentage}% Match</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Comparison Cards Matrix */}
      <div className="space-y-4">
        <h2 className="font-serif text-2xl font-bold text-[#33272A] flex items-center gap-2">
          <Layers className="w-5 h-5 text-[#D98CA3]" />
          <span>Side-by-Side Swatch Matrix</span>
        </h2>

        <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-${Math.min(4, comparedShades.length)} gap-6`}>
          <AnimatePresence mode="popLayout">
            {comparedShades.map((shade) => (
              <motion.div
                key={shade.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="glass-card rounded-3xl p-6 border-2 border-[#F7CAD0] flex flex-col justify-between space-y-6 relative overflow-hidden"
              >
                {/* Match Percentage Ribbon */}
                <div className="absolute top-0 right-0 bg-gradient-to-l from-[#D98CA3] to-[#E8B4B8] text-white px-4 py-1.5 rounded-bl-2xl text-xs font-bold shadow-xs">
                  {shade.matchPercentage}% AI Match
                </div>

                <div className="space-y-4 pt-2">
                  {/* Swatch & Brand header */}
                  <div className="flex items-center gap-4">
                    <div
                      className="w-14 h-14 rounded-2xl shadow-md border-2 border-white ring-2 ring-[#F7CAD0]"
                      style={{ backgroundColor: shade.hex }}
                    />
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#D98CA3]">{shade.brand}</span>
                      <h3 className="font-serif text-lg font-bold text-[#33272A]">{shade.shadeName}</h3>
                      <p className="text-xs font-semibold text-[#5C4D51]">Code: {shade.shadeCode}</p>
                    </div>
                  </div>

                  {/* Attributes List */}
                  <div className="space-y-2.5 text-xs text-[#5C4D51] pt-3 border-t border-[#F7CAD0]/40">
                    <div className="flex justify-between py-1 border-b border-[#F7CAD0]/20">
                      <span className="font-semibold text-[#33272A]">Undertone</span>
                      <span className="font-bold text-[#D98CA3]">{shade.undertone}</span>
                    </div>

                    <div className="flex justify-between py-1 border-b border-[#F7CAD0]/20">
                      <span className="font-semibold text-[#33272A]">Skin Tone Category</span>
                      <span>{shade.skinToneCategory}</span>
                    </div>

                    <div className="flex justify-between py-1 border-b border-[#F7CAD0]/20">
                      <span className="font-semibold text-[#33272A]">Finish Effect</span>
                      <span className="font-semibold text-[#33272A]">{shade.finish}</span>
                    </div>

                    <div className="flex justify-between py-1 border-b border-[#F7CAD0]/20">
                      <span className="font-semibold text-[#33272A]">Coverage Level</span>
                      <span>{shade.coverage}</span>
                    </div>

                    <div className="flex justify-between py-1">
                      <span className="font-semibold text-[#33272A]">Price</span>
                      <span className="font-bold text-[#33272A]">₹{shade.price.toLocaleString('en-IN')}</span>
                    </div>
                  </div>

                  {/* Formulation Notes */}
                  <div className="p-3 rounded-2xl bg-[#FFF8F3] border border-[#F7CAD0]/50 text-xs text-[#5C4D51] space-y-1">
                    <div className="flex items-center gap-1.5 font-bold text-[#33272A]">
                      <Info className="w-3.5 h-3.5 text-[#D98CA3]" />
                      <span>Artist Formulation Note</span>
                    </div>
                    <p className="text-[11px] leading-snug">{shade.notes}</p>
                  </div>
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={(e) => {
                    const mockProductMatch = {
                      id: shade.id,
                      name: `${shade.productName} (${shade.shadeCode})`,
                      brand: shade.brand,
                      category: 'Foundation' as const,
                      price: shade.price,
                      rating: 4.9,
                      reviewsCount: 120,
                      image: shade.image,
                      suitableSkinType: ['Dry' as const, 'Combination' as const, 'Normal' as const],
                      description: shade.notes,
                      tags: [shade.undertone, shade.finish],
                    };
                    addToCart(mockProductMatch, shade.shadeName, e.currentTarget);
                  }}
                  className="w-full py-3 rounded-2xl bg-gradient-to-r from-[#D98CA3] to-[#E8B4B8] text-white text-xs font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add Shade to Bag</span>
                </button>

              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

    </div>
  );
};
