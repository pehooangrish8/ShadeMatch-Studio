import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  Sun, 
  CloudRain, 
  Wind, 
  Snowflake, 
  Check, 
  ShoppingBag, 
  TrendingUp, 
  Palette, 
  RefreshCw,
  Info,
  ChevronRight,
  Zap
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { mockProducts } from '../data/mockData';
import { Product } from '../types';

interface SeasonalPalette {
  season: 'Summer' | 'Autumn' | 'Winter' | 'Spring';
  seasonIcon: any;
  title: string;
  trendTagline: string;
  undertone: string;
  matchScore: number;
  paletteColors: {
    category: 'Complexion & Base' | 'Lips & Blush' | 'Eye & Highlight' | 'Accent Accent';
    name: string;
    hex: string;
    description: string;
  }[];
  recommendedProductIds: string[];
  stylingTips: string[];
}

export const SeasonalTrendsFeed: React.FC = () => {
  const { profile, addToCart, setFlyingImage } = useApp();

  // Selected season & undertone state
  const [selectedSeason, setSelectedSeason] = useState<'Summer' | 'Autumn' | 'Winter' | 'Spring'>('Summer');
  const [activeUndertone, setActiveUndertone] = useState<string>(profile.undertone || 'Warm');
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  const undertoneOptions = ['Warm', 'Cool', 'Neutral', 'Olive', 'Peach'];
  const seasonOptions: Array<{ key: 'Summer' | 'Autumn' | 'Winter' | 'Spring'; label: string; icon: any; glowColor: string }> = [
    { key: 'Summer', label: 'Summer Glow', icon: Sun, glowColor: 'from-amber-200 via-rose-200 to-orange-200' },
    { key: 'Autumn', label: 'Autumn Spice', icon: Wind, glowColor: 'from-orange-300 via-amber-300 to-red-300' },
    { key: 'Winter', label: 'Winter Velvet', icon: Snowflake, glowColor: 'from-blue-200 via-purple-200 to-indigo-200' },
    { key: 'Spring', label: 'Spring Bloom', icon: CloudRain, glowColor: 'from-emerald-200 via-pink-200 to-yellow-200' },
  ];

  // Palette Generator Matrix based on Season + Undertone
  const activePalette = useMemo<SeasonalPalette>(() => {
    let colors: SeasonalPalette['paletteColors'] = [];
    let productIds: string[] = [];
    let tips: string[] = [];
    let title = '';
    let tagline = '';
    let matchScore = 98;

    if (selectedSeason === 'Summer') {
      if (activeUndertone === 'Warm') {
        title = 'Golden Hour Dew & Terracotta Heat';
        tagline = 'Sun-drenched warmth with dewy bronzed cheekbones & honey-glazed lips';
        matchScore = 99;
        colors = [
          { category: 'Complexion & Base', name: 'Warm Honey Gold', hex: '#dca98d', description: 'Radiant sheer bronzing base with golden reflective pigments.' },
          { category: 'Lips & Blush', name: 'Terracotta Peach Glow', hex: '#d88568', description: 'Sun-kissed warmth that enhances warm undertone flushing.' },
          { category: 'Eye & Highlight', name: 'Champagne Shimmer', hex: '#f3e1b9', description: 'High-beam light reflection for inner eye corners and brow arches.' },
          { category: 'Accent Accent', name: 'Soft Mahogany Nude', hex: '#a65b4c', description: 'Satin defined lip outline for sunset glam.' }
        ];
        productIds = ['prod-3', 'prod-2', 'prod-11', 'prod-1'];
        tips = [
          'Blend liquid bronzer into moisturizer for an effortless, sun-blessed glaze.',
          'Dab peach-gold blush across the bridge of your nose for a natural sun flush.',
          'Pair with a clear peptide lip oil to lock in 12-hour hydration.'
        ];
      } else if (activeUndertone === 'Cool') {
        title = 'Rose Gold Dew & Soft Petal Shimmer';
        tagline = 'Fresh rose-water radiance with soft mauves and pearl highlights';
        matchScore = 97;
        colors = [
          { category: 'Complexion & Base', name: 'Porcelain Neutral Glow', hex: '#e8b4b8', description: 'Cool pearlescent base that neutralizes redness.' },
          { category: 'Lips & Blush', name: 'Berry Rose Dew', hex: '#d89b9e', description: 'Fresh flushed pink tint with blue-pink undertone undertones.' },
          { category: 'Eye & Highlight', name: 'Icy Rose Quartz', hex: '#e8cbdb', description: 'Cool-toned champagne sparkle with iridescent lilac reflects.' },
          { category: 'Accent Accent', name: 'Cool Cocoa Plum', hex: '#8a5068', description: 'Sophisticated smokey eye accent tone.' }
        ];
        productIds = ['prod-4', 'prod-5', 'prod-8', 'prod-11'];
        tips = [
          'Cool undertones pop under rose-quartz highlights without turning brassy.',
          'Use cream blushes with cool berry notes for a youthful translucent flush.'
        ];
      } else if (activeUndertone === 'Olive') {
        title = 'Golden Olive Glass & Warm Fig';
        tagline = 'Sophisticated muted bronze tones with fig-tinged lips & golden olive glass skin';
        matchScore = 96;
        colors = [
          { category: 'Complexion & Base', name: 'Muted Golden Olive', hex: '#ca9273', description: 'Custom olive balance cancelling ashiness in bright sunlight.' },
          { category: 'Lips & Blush', name: 'Warm Fig Nude', hex: '#b36d5a', description: 'Earthy neutral rouge that complements subtle green skin undertones.' },
          { category: 'Eye & Highlight', name: 'Bronze Topaz Reflect', hex: '#c89d6e', description: 'Multi-dimensional golden bronze lid wash.' },
          { category: 'Accent Accent', name: 'Earthy Amber', hex: '#8d4f30', description: 'Warm smudged liner accent.' }
        ];
        productIds = ['prod-4', 'prod-6', 'prod-5', 'prod-3'];
        tips = [
          'Stick to neutral-golden bronzers to complement olive undertones seamlessly.',
          'Avoid overly pink blushes; opt for terracotta or warm fig shades instead.'
        ];
      } else {
        // Neutral or Peach
        title = 'Sunlit Peach & Luminous Bare Skin';
        tagline = 'Harmonious peach-beige tones for balanced skin harmony in warm weather';
        matchScore = 98;
        colors = [
          { category: 'Complexion & Base', name: 'Peachy Sand Base', hex: '#e5b299', description: 'Balanced warm-cool skin tint with radiant silk sheen.' },
          { category: 'Lips & Blush', name: 'Coral Kiss Blush', hex: '#e69076', description: 'Juicy coral-peach blush for healthy radiance.' },
          { category: 'Eye & Highlight', name: 'Soft Gold Glaze', hex: '#f7e7ce', description: 'Featherlight liquid shimmer for eyelids.' },
          { category: 'Accent Accent', name: 'Mocha Rose', hex: '#a86f68', description: 'Natural nude lip enhancer.' }
        ];
        productIds = ['prod-3', 'prod-2', 'prod-12', 'prod-11'];
        tips = [
          'Neutral undertones can flex between warm peach and soft rose easily.',
          'Focus on ultra-hydration with peptide liquids for effortless glass skin.'
        ];
      }
    } else if (selectedSeason === 'Autumn') {
      title = 'Copper Spice & Cinnamon Velvet';
      tagline = 'Rich rich terracotta, warm copper, and velvety mahogany warmth';
      matchScore = 98;
      colors = [
        { category: 'Complexion & Base', name: 'Warm Amber Base', hex: '#d6a282', description: 'Velvety golden coverage protecting skin from dry autumn winds.' },
        { category: 'Lips & Blush', name: 'Cinnamon Spice', hex: '#b85d43', description: 'Deep warm russet lip with cashmere finish.' },
        { category: 'Eye & Highlight', name: 'Burnished Copper', hex: '#a6542d', description: 'Intense metallic copper shimmer.' },
        { category: 'Accent Accent', name: 'Deep Espresso', hex: '#4a2e2b', description: 'Definitive sultry eye boundary.' }
      ];
      productIds = ['prod-5', 'prod-8', 'prod-9', 'prod-12'];
      tips = [
        'Switch to richer cream moisturizers before applying matte velvet bases.',
        'Smudge warm copper eyeshadow along lower lash lines for an autumnal smolder.'
      ];
    } else if (selectedSeason === 'Winter') {
      title = 'Plum Velvet & Frost Champagne';
      tagline = 'Luxe jewel tones, deep burgundy lip glaze, and icy candlelight radiance';
      matchScore = 97;
      colors = [
        { category: 'Complexion & Base', name: 'Hydrating Porcelain', hex: '#e2b399', description: 'High-moisture barrier base for winter cold protection.' },
        { category: 'Lips & Blush', name: 'Royal Plum Berry', hex: '#7a283c', description: 'Rich deep berry rouge statement.' },
        { category: 'Eye & Highlight', name: 'Icy Moonlight Sparkle', hex: '#e0e6f8', description: 'Crisp diamond reflectivity for winter soirées.' },
        { category: 'Accent Accent', name: 'Midnight Onyx', hex: '#2b232a', description: 'Sultry evening definition.' }
      ];
      productIds = ['prod-8', 'prod-9', 'prod-4', 'prod-12'];
      tips = [
        'Prevent winter flakiness by pressing facial oil over high points of face.',
        'Bold berry lips contrast strikingly against crisp winter outfits.'
      ];
    } else {
      // Spring
      title = 'Cherry Blossom & Fresh Nectar',
      tagline = 'Soft pastel pinks, fresh dew drops, and luminous blooming coral cheeks';
      matchScore = 99;
      colors = [
        { category: 'Complexion & Base', name: 'Fresh Bloom Tint', hex: '#e8b4b8', description: 'Lightweight breathable tint with floral botanical extracts.' },
        { category: 'Lips & Blush', name: 'Pastel Peony Pink', hex: '#ea9ab2', description: 'Youthful fresh flush resembling spring petals.' },
        { category: 'Eye & Highlight', name: 'Rose Nectar Shimmer', hex: '#f7d0cb', description: 'Soft romantic eyelids with subtle shimmer.' },
        { category: 'Accent Accent', name: 'Soft Hazel Nude', hex: '#b07f78', description: 'Natural lip define tone.' }
      ];
      productIds = ['prod-2', 'prod-11', 'prod-1', 'prod-5'];
      tips = [
        'Spring is about breathing life back into skin with lightweight liquid blush.',
        'Pair pink petal lips with minimal mascara for a youthful, fresh look.'
      ];
    }

    return {
      season: selectedSeason,
      seasonIcon: seasonOptions.find(s => s.key === selectedSeason)?.icon || Sun,
      title,
      trendTagline: tagline,
      undertone: activeUndertone,
      matchScore,
      paletteColors: colors,
      recommendedProductIds: productIds,
      stylingTips: tips
    };
  }, [selectedSeason, activeUndertone]);

  const recommendedProducts = useMemo(() => {
    return activePalette.recommendedProductIds
      .map(id => mockProducts.find(p => p.id === id))
      .filter(Boolean) as Product[];
  }, [activePalette]);

  const handleCopyHex = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 2000);
  };

  const handleAddToCartWithAnim = (e: React.MouseEvent, product: Product) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setFlyingImage({
      src: product.image,
      startX: rect.left + rect.width / 2,
      startY: rect.top + rect.height / 2,
    });
    addToCart(product);
  };

  return (
    <section className="relative overflow-hidden py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto rounded-3xl my-10 bg-gradient-to-b from-[#FFF5F7] via-[#FFF9FB] to-white border border-[#F7CAD0]/60 shadow-xl">
      
      {/* Background Animated Shimmer Orbs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[#FADADD]/40 to-[#EADCF8]/30 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-[#FFD6C9]/30 to-[#F7E7CE]/40 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 space-y-10">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-[#F7CAD0]/50 pb-8">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FADADD]/50 border border-[#E8B4B8]/60 text-xs font-bold text-[#D98CA3] shadow-2xs">
              <Sparkles className="w-4 h-4 animate-spin text-[#D98CA3]" style={{ animationDuration: '6s' }} />
              <span>AI Complexion Radar • Seasonal Trends Feed</span>
            </div>
            
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#33272A] tracking-tight">
              Seasonal Palette & Shade Match Trends
            </h2>

            <p className="text-xs sm:text-sm text-[#5C4D51] leading-relaxed">
              Dynamically calibrated color theory recommendations matching the current season and your calibrated <span className="font-bold text-[#33272A] uppercase underline decoration-[#D98CA3]">{activeUndertone}</span> undertone.
            </p>
          </div>

          {/* Undertone Selector Pill Bar */}
          <div className="space-y-2">
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#D98CA3] block">
              Active Skin Undertone
            </span>
            <div className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-2xl bg-white border border-[#F7CAD0]/80 shadow-2xs">
              {undertoneOptions.map((ut) => {
                const isActive = activeUndertone === ut;
                return (
                  <button
                    key={ut}
                    onClick={() => setActiveUndertone(ut)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      isActive 
                        ? 'bg-gradient-to-r from-[#D98CA3] to-[#E8B4B8] text-white shadow-xs scale-105' 
                        : 'text-[#5C4D51] hover:text-[#33272A] hover:bg-[#FFF5F7]'
                    }`}
                  >
                    {ut}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Season Switcher Tabs with Animated Glow Aura */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {seasonOptions.map((s) => {
            const Icon = s.icon;
            const isSelected = selectedSeason === s.key;
            return (
              <button
                key={s.key}
                onClick={() => setSelectedSeason(s.key)}
                className={`relative p-4 rounded-2xl border text-left transition-all duration-300 overflow-hidden ${
                  isSelected
                    ? 'bg-white border-[#D98CA3] shadow-lg ring-2 ring-[#D98CA3]/30 scale-[1.02]'
                    : 'bg-white/70 border-[#F7CAD0]/50 hover:bg-white hover:border-[#D98CA3]/60'
                }`}
              >
                {/* Active Inner Gradient Glow */}
                {isSelected && (
                  <motion.div
                    layoutId="seasonGlow"
                    className={`absolute inset-0 bg-gradient-to-r ${s.glowColor} opacity-20 pointer-events-none`}
                  />
                )}

                <div className="relative z-10 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
                      isSelected ? 'bg-[#D98CA3] text-white' : 'bg-[#FADADD]/40 text-[#D98CA3]'
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-serif text-sm font-bold text-[#33272A]">{s.label}</h4>
                      <span className="text-[10px] text-[#5C4D51] font-medium">Trend Collection</span>
                    </div>
                  </div>

                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-5 h-5 rounded-full bg-[#D98CA3] text-white flex items-center justify-center text-[10px]"
                    >
                      <Check className="w-3 h-3 stroke-[3]" />
                    </motion.div>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Palette Visualizer Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${selectedSeason}-${activeUndertone}`}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
          >
            
            {/* Color Swatch Display (7 cols) */}
            <div className="lg:col-span-7 glass-card p-6 sm:p-8 rounded-3xl space-y-6 border border-[#F7CAD0] relative overflow-hidden bg-white/90">
              
              {/* Header Badge */}
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#D98CA3]">
                    {selectedSeason} • {activeUndertone} Undertone Match
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-[#33272A] mt-0.5">
                    {activePalette.title}
                  </h3>
                </div>

                <div className="px-3 py-1.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold flex items-center gap-1.5 shadow-2xs">
                  <Zap className="w-3.5 h-3.5 fill-current text-emerald-500" />
                  <span>{activePalette.matchScore}% Match Harmony</span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-[#5C4D51] italic">
                "{activePalette.trendTagline}"
              </p>

              {/* Swatch Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {activePalette.paletteColors.map((col) => (
                  <button
                    key={col.name}
                    type="button"
                    onClick={() => handleCopyHex(col.hex)}
                    className="group relative p-3 rounded-2xl bg-[#FFF9FB] border border-[#F7CAD0]/60 hover:border-[#D98CA3] text-left transition-all hover:shadow-md"
                  >
                    {/* Color Swatch Circle with Advanced Shimmer Outer Ring */}
                    <div className="relative w-full aspect-square rounded-xl mb-3 overflow-hidden shadow-inner flex items-center justify-center" style={{ backgroundColor: col.hex }}>
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-bold text-white bg-black/40 px-2 py-1 rounded-full backdrop-blur-xs">
                        {copiedHex === col.hex ? 'Copied!' : 'Click Hex'}
                      </span>
                    </div>

                    <span className="text-[9px] uppercase font-bold tracking-wider text-[#D98CA3] block line-clamp-1">
                      {col.category}
                    </span>
                    <h5 className="font-serif text-xs font-bold text-[#33272A] line-clamp-1 mt-0.5">
                      {col.name}
                    </h5>
                    <span className="text-[10px] font-mono text-[#5C4D51] block mt-1">
                      {col.hex}
                    </span>
                  </button>
                ))}
              </div>

              {/* Styling Tips */}
              <div className="p-4 rounded-2xl bg-[#FFF8F3] border border-[#F7CAD0]/50 space-y-2">
                <h5 className="font-serif text-xs font-bold text-[#33272A] flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5 text-[#D98CA3]" />
                  <span>Dermatological Colorist Pro Tips</span>
                </h5>
                <ul className="space-y-1 text-xs text-[#5C4D51]">
                  {activePalette.stylingTips.map((tip, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-[#D98CA3] font-bold">•</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

            {/* Recommended Cosmetics Products in INR (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-center justify-between px-1">
                <h4 className="font-serif text-lg font-bold text-[#33272A] flex items-center gap-2">
                  <ShoppingBag className="w-4 h-4 text-[#D98CA3]" />
                  <span>Matching Cosmetics (INR ₹)</span>
                </h4>
                <span className="text-xs text-[#D98CA3] font-semibold">Curated for Season</span>
              </div>

              <div className="space-y-3">
                {recommendedProducts.map((product) => (
                  <div
                    key={product.id}
                    className="p-3.5 rounded-2xl bg-white border border-[#F7CAD0]/60 hover:border-[#D98CA3] transition-all flex items-center gap-4 shadow-2xs group"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-16 h-16 rounded-xl object-cover border border-[#F7CAD0]/40 group-hover:scale-105 transition-transform"
                    />

                    <div className="flex-1 min-w-0">
                      <span className="text-[9px] uppercase font-bold tracking-wider text-[#D98CA3] block">
                        {product.brand}
                      </span>
                      <h5 className="font-serif text-xs font-bold text-[#33272A] truncate">
                        {product.name}
                      </h5>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="font-bold text-xs text-[#33272A]">
                          ₹{product.price.toLocaleString('en-IN')}
                        </span>
                        {product.shadeName && (
                          <span className="text-[10px] text-[#5C4D51] truncate bg-[#FADADD]/30 px-2 py-0.5 rounded-full">
                            {product.shadeName}
                          </span>
                        )}
                      </div>
                    </div>

                    <button
                      onClick={(e) => handleAddToCartWithAnim(e, product)}
                      className="p-2.5 rounded-xl bg-[#FADADD] hover:bg-[#D98CA3] text-[#33272A] hover:text-white transition-all shadow-2xs hover:scale-105 shrink-0"
                      title="Add to Beauty Bag"
                    >
                      <ShoppingBag className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
};
