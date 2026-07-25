import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Star, 
  SlidersHorizontal, 
  Palette, 
  BookOpen, 
  Calendar, 
  BarChart3, 
  Heart,
  Droplets,
  Sparkle,
  ChevronRight,
  ShieldCheck,
  Award
} from 'lucide-react';
import { mockProducts } from '../data/mockData';
import { SeasonalTrendsFeed } from '../components/SeasonalTrendsFeed';

export const LandingPage: React.FC = () => {
  // Counters animation state
  const [counts, setCounts] = useState({ users: 0, matches: 0, appointments: 0 });

  useEffect(() => {
    const duration = 2000;
    const steps = 50;
    const stepTime = duration / steps;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      setCounts({
        users: Math.floor(50000 * Math.min(1, progress)),
        matches: Math.floor(10000 * Math.min(1, progress)),
        appointments: Math.floor(500 * Math.min(1, progress)),
      });

      if (currentStep >= steps) clearInterval(timer);
    }, stepTime);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="space-y-24 pb-20">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 pb-20 overflow-hidden bg-gradient-to-b from-[#FFF8F3] via-[#FFF9FB] to-white">
        {/* Soft Background Accents */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-[#FADADD]/40 via-[#F7CAD0]/30 to-[#EADCF8]/20 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Hero Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FADADD]/40 border border-[#E8B4B8]/50 text-xs font-bold text-[#D98CA3] tracking-wide"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>AI-Powered Undertone & Shade Science</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#33272A] leading-[1.08]"
              >
                Your Beauty.<br />
                <span className="italic font-normal text-[#D98CA3]">Personalized Beautifully.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="text-base sm:text-lg text-[#5C4D51] leading-relaxed max-w-2xl mx-auto lg:mx-0 font-normal"
              >
                Discover your flawless foundation shade match, curate interactive virtual lookbooks, and schedule bespoke sessions with master beauty artists.
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2"
              >
                <Link
                  to="/profile"
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-[#D98CA3] via-[#E8B4B8] to-[#D98CA3] text-white font-bold text-sm shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all flex items-center justify-center gap-2 group"
                >
                  <span>Get Started</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  to="/products"
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white border border-[#F7CAD0] hover:border-[#D98CA3] text-[#33272A] font-bold text-sm hover:bg-[#FFF8F3] transition-all flex items-center justify-center gap-2 shadow-2xs"
                >
                  <span>Explore Features</span>
                  <ChevronRight className="w-4 h-4 text-[#D98CA3]" />
                </Link>
              </motion.div>

              {/* Trust Indicators */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="pt-6 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs font-semibold text-[#5C4D51]"
              >
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#D98CA3]" />
                  <span>Dermatologist Approved Science</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-[#D98CA3] fill-current" />
                  <span>4.9/5 from 50k+ Matchers</span>
                </div>
              </motion.div>
            </div>

            {/* Hero Right Visuals (Floating Cards & Product Mockup) */}
            <div className="lg:col-span-5 relative flex items-center justify-center">
              
              {/* Main Center Image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="relative w-full max-w-md aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-4 border-white"
              >
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=900"
                  alt="Beauty model glowing skin"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#FADADD]">
                    Live AI Shade Match
                  </span>
                  <p className="font-serif text-2xl font-bold">Medium 2N Neutral Glow</p>
                  <p className="text-xs text-white/80">98.4% Precision Undertone Match</p>
                </div>
              </motion.div>

              {/* Floating Card 1: Match Badge */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-6 -left-4 sm:-left-8 bg-white/90 backdrop-blur-md p-4 rounded-2xl border border-[#F7CAD0] shadow-xl max-w-[190px]"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#FADADD] flex items-center justify-center text-[#D98CA3]">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-[#D98CA3]">AI Score</p>
                    <p className="font-serif text-lg font-bold text-[#33272A]">98% Match</p>
                  </div>
                </div>
              </motion.div>

              {/* Floating Card 2: Product Highlight */}
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute -bottom-6 -right-4 sm:-right-8 bg-white/90 backdrop-blur-md p-3.5 rounded-2xl border border-[#F7CAD0] shadow-xl flex items-center gap-3 max-w-[220px]"
              >
                <img
                  src={mockProducts[0].image}
                  alt={mockProducts[0].name}
                  className="w-12 h-12 rounded-xl object-cover"
                />
                <div>
                  <p className="text-[10px] uppercase font-bold text-[#D98CA3]">Recommended</p>
                  <p className="font-semibold text-xs text-[#33272A] line-clamp-1">{mockProducts[0].name}</p>
                  <p className="text-[10px] text-[#5C4D51]">₹{mockProducts[0].price.toLocaleString('en-IN')} · Rhode Skin</p>
                </div>
              </motion.div>

            </div>

          </div>
        </div>
      </section>

      {/* DYNAMIC SEASONAL TRENDS FEED COMPONENT */}
      <SeasonalTrendsFeed />

      {/* 2. FEATURE SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs uppercase tracking-widest font-bold text-[#D98CA3]">
            Intelligent Features
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#33272A]">
            Designed for Flawless Precision
          </h2>
          <p className="text-sm text-[#5C4D51]">
            Every module in ShadeMatch Studio is tailored to eliminate guessing and bring luxury personal styling into your daily routine.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: SlidersHorizontal,
              title: 'Beauty Profile',
              desc: 'Calibrate your skin tone, undertone, hair type, and favorite cosmetic preferences in seconds.',
              path: '/profile',
              tag: 'Personalized'
            },
            {
              icon: Palette,
              title: 'AI Shade Match',
              desc: 'Side-by-side comparison of foundation undertones, finishes, and coverage ratios.',
              path: '/shade-match',
              tag: '99% Accuracy'
            },
            {
              icon: BookOpen,
              title: 'Virtual Lookbook',
              desc: 'Curated step-by-step beauty tutorials from Parisian Soft Glam to Clean Girl Glass Skin.',
              path: '/virtual-lookbook',
              tag: 'Interactive'
            },
            {
              icon: Calendar,
              title: 'Appointments',
              desc: 'Reserve 1-on-1 shade trials and facial prep sessions with master celebrity makeup artists.',
              path: '/appointments',
              tag: 'Concierge'
            },
            {
              icon: BarChart3,
              title: 'Analytics Dashboard',
              desc: 'Track skin barrier metrics, beauty scores, wishlist distributions, and routine logs.',
              path: '/analytics',
              tag: 'Data-Backed'
            },
            {
              icon: Heart,
              title: 'Curated Cosmetics',
              desc: 'Shop dermatologically tested foundations, lip glazes, and serums with fly-to-cart delight.',
              path: '/products',
              tag: 'Luxury Brands'
            }
          ].map((feature, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -6 }}
              className="glass-card p-6 rounded-3xl space-y-4 relative group cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#FADADD] to-[#FFF8F3] border border-[#F7CAD0] flex items-center justify-center text-[#D98CA3] group-hover:scale-110 transition-transform">
                  <feature.icon className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#EADCF8]/40 text-[#5C4D51] border border-[#C9A7EB]/30">
                  {feature.tag}
                </span>
              </div>

              <div className="space-y-2">
                <h3 className="font-serif text-xl font-bold text-[#33272A] group-hover:text-[#D98CA3] transition-colors">
                  {feature.title}
                </h3>
                <p className="text-xs text-[#5C4D51] leading-relaxed">
                  {feature.desc}
                </p>
              </div>

              <Link
                to={feature.path}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#D98CA3] group-hover:gap-2 transition-all pt-2"
              >
                <span>Explore Module</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. CATEGORIES SECTION */}
      <section className="bg-[#FFF8F3] py-20 border-y border-[#F7CAD0]/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs uppercase tracking-widest font-bold text-[#D98CA3]">
              Curated Collections
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#33272A]">
              Explore Beauty Pillars
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              {
                title: 'Skincare',
                desc: 'Hydrators, essences & peptide balms.',
                image: 'https://images.unsplash.com/photo-1608248597262-838d823438f2?auto=format&fit=crop&q=80&w=600',
                count: '42 Products'
              },
              {
                title: 'Makeup',
                desc: 'Flawless foundations, blushes & lip glosses.',
                image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&q=80&w=600',
                count: '85 Products'
              },
              {
                title: 'Haircare',
                desc: 'Nourishing botanical elixirs & oils.',
                image: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&q=80&w=600',
                count: '28 Products'
              },
              {
                title: 'Appointments',
                desc: 'Bespoke 1-on-1 studio consultations.',
                image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=600',
                count: 'Master Artists'
              },
              {
                title: 'Analytics',
                desc: 'Personalized skin score tracking.',
                image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=600',
                count: 'Real-time Metrics'
              }
            ].map((cat, idx) => (
              <Link
                key={idx}
                to="/products"
                className="group relative rounded-3xl overflow-hidden aspect-[3/4] shadow-md hover:shadow-xl transition-all"
              >
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 text-white space-y-1">
                  <span className="text-[10px] uppercase font-bold text-[#FADADD] tracking-wider">
                    {cat.count}
                  </span>
                  <h3 className="font-serif text-xl font-bold">{cat.title}</h3>
                  <p className="text-xs text-white/80 line-clamp-1">{cat.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. HOW IT WORKS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs uppercase tracking-widest font-bold text-[#D98CA3]">
            Simple 4-Step Process
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#33272A]">
            How ShadeMatch Works
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {[
            {
              step: '01',
              title: 'Create Beauty Profile',
              desc: 'Specify skin tone, undertone, skin type, and favorite cosmetic textures.'
            },
            {
              step: '02',
              title: 'Get Recommendations',
              desc: 'AI algorithms calculate formulation matches with up to 99% color precision.'
            },
            {
              step: '03',
              title: 'Compare Shades',
              desc: 'Filter side-by-side foundation swatches, coverage levels, and radiant finishes.'
            },
            {
              step: '04',
              title: 'Book Appointment',
              desc: 'Reserve a studio trial or order curated shade kits straight to your doorstep.'
            }
          ].map((item, idx) => (
            <div
              key={idx}
              className="glass-card p-6 rounded-3xl space-y-4 relative border border-[#F7CAD0]/50"
            >
              <span className="font-serif text-4xl font-bold text-[#D98CA3]/30 block">
                {item.step}
              </span>
              <h3 className="font-serif text-lg font-bold text-[#33272A]">{item.title}</h3>
              <p className="text-xs text-[#5C4D51] leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. TESTIMONIALS */}
      <section className="bg-gradient-to-b from-[#FFF9FB] via-[#FFF8F3] to-[#FFF9FB] py-20 border-y border-[#F7CAD0]/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs uppercase tracking-widest font-bold text-[#D98CA3]">
              Loved by Thousands
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#33272A]">
              What Our Community Says
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Isabella Rossi',
                role: 'Fashion Model & Content Creator',
                comment: 'Finding a true neutral olive foundation shade was nearly impossible until ShadeMatch Studio calibrated my exact undertone. Dior 2N was a spot-on recommendation!',
                avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
                rating: 5
              },
              {
                name: 'Clara Thorne',
                role: 'Executive Director',
                comment: 'The Virtual Lookbook saved my morning routine. The 10-minute Clean Girl tutorial with Rhode Glazing Milk gives me glass skin all day without oxidation.',
                avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200',
                rating: 5
              },
              {
                name: 'Aria Chen',
                role: 'Bridal Stylist',
                comment: 'I book my bridal client trials directly through the appointment portal with Elena Vance. The level of care and shade science precision is unmatched.',
                avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=200',
                rating: 5
              }
            ].map((t, idx) => (
              <div key={idx} className="glass-card p-6 rounded-3xl space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex gap-1 text-[#D98CA3]">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-xs text-[#5C4D51] italic leading-relaxed">
                    "{t.comment}"
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-[#F7CAD0]/30">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-[#E8B4B8]"
                  />
                  <div>
                    <h4 className="font-bold text-xs text-[#33272A]">{t.name}</h4>
                    <p className="text-[10px] text-[#5C4D51]">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. ANIMATED STATISTICS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-10 rounded-3xl bg-gradient-to-r from-[#FADADD]/50 via-[#EADCF8]/40 to-[#F7E7CE]/50 border border-[#F7CAD0] shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            
            <div className="space-y-1">
              <span className="font-serif text-4xl sm:text-5xl font-bold text-[#33272A]">
                {counts.users.toLocaleString()}+
              </span>
              <p className="text-xs font-bold uppercase tracking-wider text-[#D98CA3]">
                Happy Users
              </p>
            </div>

            <div className="space-y-1">
              <span className="font-serif text-4xl sm:text-5xl font-bold text-[#33272A]">
                {counts.matches.toLocaleString()}+
              </span>
              <p className="text-xs font-bold uppercase tracking-wider text-[#D98CA3]">
                Shade Matches
              </p>
            </div>

            <div className="space-y-1">
              <span className="font-serif text-4xl sm:text-5xl font-bold text-[#33272A]">
                {counts.appointments.toLocaleString()}+
              </span>
              <p className="text-xs font-bold uppercase tracking-wider text-[#D98CA3]">
                Appointments Booked
              </p>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};
