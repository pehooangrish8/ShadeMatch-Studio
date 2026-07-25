import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  BookOpen, 
  Heart, 
  Clock, 
  Check, 
  Plus, 
  X, 
  ShoppingBag,
  Sparkle,
  Bookmark,
  ChevronRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { mockLookbookItems, mockProducts } from '../data/mockData';
import { LookbookItem } from '../types';

export const VirtualLookbookPage: React.FC = () => {
  const { savedLookIds, toggleSaveLook, addToCart } = useApp();

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeLookModal, setActiveLookModal] = useState<LookbookItem | null>(null);

  const categories = ['All', 'Natural', 'Office', 'Party', 'Bridal', 'Soft Glam'];

  const filteredLooks = mockLookbookItems.filter(
    look => selectedCategory === 'All' || look.category === selectedCategory
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header Banner */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FADADD]/40 border border-[#E8B4B8]/50 text-xs font-bold text-[#D98CA3]">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Interactive Style Gallery</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#33272A]">
          Virtual Lookbook
        </h1>
        <p className="text-xs sm:text-sm text-[#5C4D51]">
          Explore step-by-step masterclass beauty looks designed for every mood, occasion, and skin undertone.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all ${
              selectedCategory === cat
                ? 'bg-gradient-to-r from-[#D98CA3] to-[#E8B4B8] text-white shadow-xs scale-105'
                : 'bg-white border border-[#F7CAD0] text-[#5C4D51] hover:border-[#D98CA3]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Lookbook Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence mode="popLayout">
          {filteredLooks.map((look) => {
            const isSaved = savedLookIds.includes(look.id);

            return (
              <motion.div
                key={look.id}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                whileHover={{ y: -6 }}
                className="glass-card rounded-3xl overflow-hidden border border-[#F7CAD0]/50 flex flex-col justify-between group cursor-pointer"
                onClick={() => setActiveLookModal(look)}
              >
                {/* Look Cover Image */}
                <div className="relative aspect-[4/3] overflow-hidden bg-[#FFF8F3]">
                  <img
                    src={look.image}
                    alt={look.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/80 backdrop-blur-md text-[#D98CA3] text-[10px] font-bold uppercase tracking-wider border border-[#F7CAD0]/50">
                    {look.category}
                  </div>

                  {/* Save Bookmark Toggle */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleSaveLook(look.id);
                    }}
                    className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-[#5C4D51] hover:text-[#D98CA3] transition-colors shadow-xs"
                  >
                    <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-[#D98CA3] text-[#D98CA3]' : ''}`} />
                  </button>
                </div>

                {/* Look Info */}
                <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs font-semibold text-[#5C4D51]">
                      <Clock className="w-3.5 h-3.5 text-[#D98CA3]" />
                      <span>{look.durationMinutes} Mins</span>
                      <span>·</span>
                      <span className="text-[#D98CA3]">{look.difficulty} Level</span>
                    </div>

                    <h3 className="font-serif text-2xl font-bold text-[#33272A] group-hover:text-[#D98CA3] transition-colors">
                      {look.title}
                    </h3>

                    <p className="text-xs text-[#5C4D51] line-clamp-2">
                      {look.description}
                    </p>
                  </div>

                  {/* Tags & Action */}
                  <div className="pt-4 border-t border-[#F7CAD0]/30 flex items-center justify-between">
                    <div className="flex flex-wrap gap-1">
                      {look.tags.slice(0, 2).map((tag) => (
                        <span key={tag} className="text-[10px] px-2 py-0.5 rounded-md bg-[#FFF8F3] text-[#5C4D51]">
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <span className="text-xs font-bold text-[#D98CA3] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      <span>View Routine</span>
                      <ChevronRight className="w-4 h-4" />
                    </span>
                  </div>

                </div>

              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Look Detail Modal */}
      <AnimatePresence>
        {activeLookModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveLookModal(null)}
              className="fixed inset-0 bg-black/40 backdrop-blur-xs"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-[#F7CAD0] overflow-hidden max-h-[90vh] flex flex-col z-10"
            >
              {/* Header */}
              <div className="p-6 border-b border-[#F7CAD0]/40 flex items-center justify-between bg-[#FFF8F3]">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-full bg-[#FADADD] text-[#D98CA3] text-xs font-bold uppercase">
                    {activeLookModal.category}
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-[#33272A]">
                    {activeLookModal.title}
                  </h3>
                </div>

                <button
                  onClick={() => setActiveLookModal(null)}
                  className="w-8 h-8 rounded-full bg-white border border-[#F7CAD0] flex items-center justify-center text-[#5C4D51] hover:text-[#D98CA3]"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 overflow-y-auto space-y-8">
                
                {/* Hero preview */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                  <img
                    src={activeLookModal.image}
                    alt={activeLookModal.title}
                    className="w-full h-56 rounded-2xl object-cover shadow-sm border border-[#F7CAD0]"
                  />
                  <div className="space-y-3">
                    <p className="text-sm text-[#5C4D51] leading-relaxed">
                      {activeLookModal.description}
                    </p>

                    <div className="flex items-center gap-4 text-xs font-bold text-[#33272A]">
                      <span>Duration: {activeLookModal.durationMinutes} mins</span>
                      <span>Difficulty: {activeLookModal.difficulty}</span>
                    </div>

                    <button
                      onClick={() => toggleSaveLook(activeLookModal.id)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                        savedLookIds.includes(activeLookModal.id)
                          ? 'bg-[#FADADD] text-[#D98CA3]'
                          : 'bg-white border border-[#F7CAD0] text-[#5C4D51]'
                      }`}
                    >
                      <Bookmark className="w-4 h-4" />
                      <span>{savedLookIds.includes(activeLookModal.id) ? 'Saved to Collection' : 'Bookmark Look'}</span>
                    </button>
                  </div>
                </div>

                {/* Step-by-Step Routine */}
                <div className="space-y-4">
                  <h4 className="font-serif text-xl font-bold text-[#33272A] flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-[#D98CA3]" />
                    <span>Step-by-Step Routine</span>
                  </h4>

                  <div className="space-y-4">
                    {activeLookModal.steps.map((step) => (
                      <div key={step.stepNumber} className="p-4 rounded-2xl bg-[#FFF9FB] border border-[#F7CAD0]/40 space-y-2">
                        <div className="flex items-center gap-2 font-bold text-xs text-[#D98CA3]">
                          <span className="w-6 h-6 rounded-full bg-[#FADADD] flex items-center justify-center text-[#33272A]">
                            {step.stepNumber}
                          </span>
                          <span className="font-serif text-base text-[#33272A]">{step.title}</span>
                        </div>
                        <p className="text-xs text-[#5C4D51] pl-8">{step.description}</p>
                        {step.proTip && (
                          <p className="text-[11px] text-[#D98CA3] font-semibold italic pl-8">
                            ★ Pro Tip: {step.proTip}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Products Used */}
                <div className="space-y-4">
                  <h4 className="font-serif text-xl font-bold text-[#33272A] flex items-center gap-2">
                    <ShoppingBag className="w-5 h-5 text-[#D98CA3]" />
                    <span>Products Used in This Look</span>
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {mockProducts
                      .filter(p => activeLookModal.productsUsedIds.includes(p.id))
                      .map((p) => (
                        <div key={p.id} className="p-3 rounded-2xl bg-[#FFF8F3] border border-[#F7CAD0]/50 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <img src={p.image} alt={p.name} className="w-12 h-12 rounded-xl object-cover" />
                            <div>
                              <span className="text-[10px] font-bold text-[#D98CA3] uppercase">{p.brand}</span>
                              <h5 className="font-semibold text-xs text-[#33272A] line-clamp-1">{p.name}</h5>
                              <p className="text-[10px] text-[#5C4D51]">${p.price}</p>
                            </div>
                          </div>

                          <button
                            onClick={(e) => addToCart(p, undefined, e.currentTarget)}
                            className="p-2 rounded-xl bg-[#D98CA3] text-white hover:bg-[#E8B4B8] transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                  </div>
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
