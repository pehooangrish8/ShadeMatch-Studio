import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  User, 
  Sparkles, 
  CheckCircle2, 
  Save, 
  Heart, 
  SlidersHorizontal,
  Droplets,
  Palette,
  Scissors,
  DollarSign,
  ShieldAlert
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SkinTone, Undertone, SkinType, HairType } from '../types';

export const BeautyProfilePage: React.FC = () => {
  const { profile, updateProfile } = useApp();

  const [formData, setFormData] = useState({ ...profile });
  const [savedSuccess, setSavedSuccess] = useState(false);

  const skinTones: { name: SkinTone; hex: string; desc: string }[] = [
    { name: 'Fair', hex: '#fdf0e6', desc: 'Porcelain with delicate porcelain hue' },
    { name: 'Light', hex: '#f8d9c4', desc: 'Ivory to creamy beige' },
    { name: 'Medium', hex: '#e2b399', desc: 'Golden sand to warm olive' },
    { name: 'Tan', hex: '#c58e69', desc: 'Rich honey to sun-kissed bronze' },
    { name: 'Deep', hex: '#8d5538', desc: 'Chestnut to rich espresso' },
    { name: 'Rich Deep', hex: '#522e1b', desc: 'Ebony to deep cocoa velvet' },
  ];

  const undertones: { name: Undertone; color: string; desc: string }[] = [
    { name: 'Cool', color: 'bg-rose-200', desc: 'Pink, red, or bluish undertones' },
    { name: 'Warm', color: 'bg-amber-200', desc: 'Yellow, peachy, or golden undertones' },
    { name: 'Neutral', color: 'bg-stone-200', desc: 'Equal balance of cool & warm tones' },
    { name: 'Olive', color: 'bg-emerald-200', desc: 'Subtle greenish or golden hue' },
    { name: 'Peach', color: 'bg-orange-200', desc: 'Soft apricot or warm peach flush' },
  ];

  const skinTypes: SkinType[] = ['Dry', 'Combination', 'Oily', 'Normal', 'Sensitive'];
  const hairTypes: HairType[] = ['Straight', 'Wavy', 'Curly', 'Coily'];

  const hairConcernsList = ['Hydration', 'Frizz Control', 'Volume', 'Shine Enhancement', 'Color Protection', 'Scalp Health'];
  const makeupStyles = ['Natural', 'Soft Glam', 'Full Glam', 'Editorial', 'Clean Girl'];
  const budgetOptions: Array<'Budget' | 'Mid-Range' | 'Luxury' | 'Ultra-Luxury'> = ['Budget', 'Mid-Range', 'Luxury', 'Ultra-Luxury'];
  
  const popularBrands = [
    'Rhode Skin', 'Rare Beauty', 'Dior Beauty', 'Charlotte Tilbury', 'Fenty Beauty', 
    'Pat McGrath Labs', 'NARS', 'Kérastase', 'Lancôme', 'Armani Beauty'
  ];

  const toggleHairConcern = (concern: string) => {
    setFormData(prev => ({
      ...prev,
      hairConcerns: prev.hairConcerns.includes(concern)
        ? prev.hairConcerns.filter(c => c !== concern)
        : [...prev.hairConcerns, concern]
    }));
  };

  const toggleBrand = (brand: string) => {
    setFormData(prev => ({
      ...prev,
      favoriteBrands: prev.favoriteBrands.includes(brand)
        ? prev.favoriteBrands.filter(b => b !== brand)
        : [...prev.favoriteBrands, brand]
    }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    // Recalculate score based on profile completion
    const newScore = Math.min(100, 75 + formData.favoriteBrands.length * 3 + formData.hairConcerns.length * 2);
    updateProfile({ ...formData, beautyScore: newScore });
    
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 4000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-[#F7CAD0]/50">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 text-xs uppercase font-bold tracking-wider text-[#D98CA3]">
            <Sparkles className="w-4 h-4" />
            <span>Personalization Engine</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#33272A]">
            Your Beauty Profile
          </h1>
          <p className="text-sm text-[#5C4D51]">
            Customize your unique complexion, undertones, and hair goals for high-precision shade matching.
          </p>
        </div>

        {/* Beauty Score Badge */}
        <div className="glass-card p-4 rounded-2xl flex items-center gap-4 border border-[#F7CAD0] shadow-sm">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#D98CA3] to-[#F7E7CE] flex items-center justify-center text-white font-serif font-bold text-xl shadow-xs">
            {formData.beautyScore}
          </div>
          <div>
            <p className="text-xs uppercase font-bold text-[#D98CA3]">Beauty Profile Score</p>
            <p className="text-xs text-[#5C4D51]">
              {formData.beautyScore >= 90 ? 'Optimized Calibration' : 'Complete fields to boost precision'}
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-10">
        
        {/* Section 1: Basic Info */}
        <div className="glass-card p-6 sm:p-8 rounded-3xl space-y-6">
          <h2 className="font-serif text-xl font-bold text-[#33272A] flex items-center gap-2">
            <User className="w-5 h-5 text-[#D98CA3]" />
            <span>Personal Information</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#33272A] mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 rounded-2xl bg-white border border-[#F7CAD0] text-sm text-[#33272A] focus:outline-hidden focus:border-[#D98CA3] transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#33272A] mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 rounded-2xl bg-white border border-[#F7CAD0] text-sm text-[#33272A] focus:outline-hidden focus:border-[#D98CA3] transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Skin Tone & Undertone Selection */}
        <div className="glass-card p-6 sm:p-8 rounded-3xl space-y-8">
          <div>
            <h2 className="font-serif text-xl font-bold text-[#33272A] flex items-center gap-2 mb-1">
              <Palette className="w-5 h-5 text-[#D98CA3]" />
              <span>Complexion & Undertone Calibration</span>
            </h2>
            <p className="text-xs text-[#5C4D51]">
              Select the skin tone swatch and undertone that best mirrors your bare skin in natural sunlight.
            </p>
          </div>

          {/* Skin Tone Swatches */}
          <div className="space-y-3">
            <label className="block text-xs font-bold uppercase tracking-wider text-[#33272A]">
              1. Skin Tone Category: <span className="text-[#D98CA3]">{formData.skinTone}</span>
            </label>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {skinTones.map((st) => (
                <button
                  key={st.name}
                  type="button"
                  onClick={() => setFormData({ ...formData, skinTone: st.name })}
                  className={`p-3 rounded-2xl border text-center transition-all ${
                    formData.skinTone === st.name
                      ? 'border-[#D98CA3] bg-[#FADADD]/30 ring-2 ring-[#D98CA3]/30 scale-[1.02]'
                      : 'border-[#F7CAD0]/50 hover:border-[#D98CA3] bg-white'
                  }`}
                >
                  <div
                    className="w-12 h-12 rounded-full mx-auto mb-2 shadow-inner border border-black/10"
                    style={{ backgroundColor: st.hex }}
                  />
                  <h4 className="font-bold text-xs text-[#33272A]">{st.name}</h4>
                  <p className="text-[10px] text-[#5C4D51] mt-0.5 line-clamp-1">{st.desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Undertone Picker */}
          <div className="space-y-3 pt-4 border-t border-[#F7CAD0]/40">
            <label className="block text-xs font-bold uppercase tracking-wider text-[#33272A]">
              2. Undertone Balance: <span className="text-[#D98CA3]">{formData.undertone}</span>
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
              {undertones.map((ut) => (
                <button
                  key={ut.name}
                  type="button"
                  onClick={() => setFormData({ ...formData, undertone: ut.name })}
                  className={`p-3.5 rounded-2xl border text-left transition-all ${
                    formData.undertone === ut.name
                      ? 'border-[#D98CA3] bg-[#FADADD]/30 ring-2 ring-[#D98CA3]/30 font-bold'
                      : 'border-[#F7CAD0]/50 hover:border-[#D98CA3] bg-white'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <div className={`w-3.5 h-3.5 rounded-full ${ut.color} border border-black/10`} />
                    <h5 className="text-xs font-bold text-[#33272A]">{ut.name}</h5>
                  </div>
                  <p className="text-[10px] text-[#5C4D51]">{ut.desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Skin Type */}
          <div className="space-y-3 pt-4 border-t border-[#F7CAD0]/40">
            <label className="block text-xs font-bold uppercase tracking-wider text-[#33272A]">
              3. Skin Type Focus: <span className="text-[#D98CA3]">{formData.skinType}</span>
            </label>

            <div className="flex flex-wrap gap-2">
              {skinTypes.map((st) => (
                <button
                  key={st}
                  type="button"
                  onClick={() => setFormData({ ...formData, skinType: st })}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    formData.skinType === st
                      ? 'bg-[#D98CA3] text-white shadow-xs'
                      : 'bg-white border border-[#F7CAD0] text-[#5C4D51] hover:border-[#D98CA3]'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Section 3: Hair Type & Concerns */}
        <div className="glass-card p-6 sm:p-8 rounded-3xl space-y-6">
          <h2 className="font-serif text-xl font-bold text-[#33272A] flex items-center gap-2">
            <Scissors className="w-5 h-5 text-[#D98CA3]" />
            <span>Hair Profile & Goal Concerns</span>
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#33272A] mb-2">
                Hair Texture Type
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {hairTypes.map((ht) => (
                  <button
                    key={ht}
                    type="button"
                    onClick={() => setFormData({ ...formData, hairType: ht })}
                    className={`py-3 px-4 rounded-xl text-xs font-bold border transition-all ${
                      formData.hairType === ht
                        ? 'border-[#D98CA3] bg-[#FADADD]/40 text-[#D98CA3]'
                        : 'border-[#F7CAD0] bg-white text-[#5C4D51]'
                    }`}
                  >
                    {ht}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#33272A] mb-2">
                Hair Concerns (Select Multiple)
              </label>
              <div className="flex flex-wrap gap-2">
                {hairConcernsList.map((concern) => {
                  const isSelected = formData.hairConcerns.includes(concern);
                  return (
                    <button
                      key={concern}
                      type="button"
                      onClick={() => toggleHairConcern(concern)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                        isSelected
                          ? 'bg-[#EADCF8] text-[#33272A] border border-[#C9A7EB]'
                          : 'bg-white border border-[#F7CAD0] text-[#5C4D51]'
                      }`}
                    >
                      {isSelected ? '✓ ' : '+ '}{concern}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Section 4: Preferences & Favorite Brands */}
        <div className="glass-card p-6 sm:p-8 rounded-3xl space-y-6">
          <h2 className="font-serif text-xl font-bold text-[#33272A] flex items-center gap-2">
            <Heart className="w-5 h-5 text-[#D98CA3]" />
            <span>Cosmetic Style & Brand Preferences</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#33272A] mb-2">
                Preferred Makeup Style
              </label>
              <select
                value={formData.makeupStyle}
                onChange={(e) => setFormData({ ...formData, makeupStyle: e.target.value })}
                className="w-full px-4 py-3 rounded-2xl bg-white border border-[#F7CAD0] text-sm text-[#33272A] focus:outline-hidden focus:border-[#D98CA3]"
              >
                {makeupStyles.map(style => (
                  <option key={style} value={style}>{style}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#33272A] mb-2">
                Shopping Tier Budget
              </label>
              <select
                value={formData.budget}
                onChange={(e) => setFormData({ ...formData, budget: e.target.value as any })}
                className="w-full px-4 py-3 rounded-2xl bg-white border border-[#F7CAD0] text-sm text-[#33272A] focus:outline-hidden focus:border-[#D98CA3]"
              >
                {budgetOptions.map(b => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#33272A] mb-2">
              Favorite Brands (Used for AI Recommendation Boosting)
            </label>
            <div className="flex flex-wrap gap-2">
              {popularBrands.map((brand) => {
                const isSelected = formData.favoriteBrands.includes(brand);
                return (
                  <button
                    key={brand}
                    type="button"
                    onClick={() => toggleBrand(brand)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                      isSelected
                        ? 'bg-[#FADADD] text-[#33272A] border border-[#E8B4B8]'
                        : 'bg-white border border-[#F7CAD0] text-[#5C4D51]'
                    }`}
                  >
                    {isSelected ? '♥ ' : '+ '}{brand}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Submit Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
          {savedSuccess ? (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2 text-emerald-600 font-bold text-sm bg-emerald-50 px-4 py-3 rounded-2xl border border-emerald-200"
            >
              <CheckCircle2 className="w-5 h-5" />
              <span>Beauty Profile Successfully Calibrated!</span>
            </motion.div>
          ) : (
            <p className="text-xs text-[#5C4D51]">
              Changes are saved locally and synchronize seamlessly across all studio views.
            </p>
          )}

          <button
            type="submit"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-[#D98CA3] via-[#E8B4B8] to-[#D98CA3] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Save Beauty Profile</span>
          </button>
        </div>

      </form>
    </div>
  );
};
