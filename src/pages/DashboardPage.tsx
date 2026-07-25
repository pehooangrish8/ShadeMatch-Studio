import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  Sparkles, 
  Calendar, 
  BookOpen, 
  Heart, 
  ShoppingBag, 
  ArrowRight, 
  Plus, 
  Palette, 
  Clock, 
  CheckCircle2,
  TrendingUp,
  Star,
  ChevronRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { mockProducts, mockLookbookItems } from '../data/mockData';

export const DashboardPage: React.FC = () => {
  const { profile, wishlistIds, savedLookIds, appointments, addToCart } = useApp();

  const recommendedProducts = mockProducts.filter(p =>
    p.suitableSkinType.includes(profile.skinType) ||
    (p.suitableSkinTone && p.suitableSkinTone.includes(profile.skinTone)) ||
    profile.favoriteBrands.includes(p.brand)
  ).slice(0, 4);

  const upcomingAppointment = appointments.find(a => a.status === 'Upcoming');
  const savedLooks = mockLookbookItems.filter(l => savedLookIds.includes(l.id));
  const wishlistProducts = mockProducts.filter(p => wishlistIds.includes(p.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Top Banner / Welcome */}
      <div className="relative rounded-3xl p-8 bg-gradient-to-r from-[#FFF8F3] via-[#FADADD]/40 to-[#EADCF8]/30 border border-[#F7CAD0] shadow-sm overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-5">
            <img
              src={profile.avatar}
              alt={profile.name}
              className="w-16 h-16 rounded-3xl object-cover ring-4 ring-white shadow-md"
            />
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#D98CA3] bg-white px-3 py-1 rounded-full border border-[#F7CAD0]/50">
                VIP Beauty Member
              </span>
              <h1 className="font-serif text-3xl font-bold text-[#33272A]">
                Welcome Back, {profile.name.split(' ')[0]}
              </h1>
              <p className="text-xs text-[#5C4D51]">
                Complexion: <span className="font-bold text-[#33272A]">{profile.skinTone} · {profile.undertone} Undertone</span> | Focus: <span className="font-bold text-[#33272A]">{profile.skinType} Skin</span>
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <Link
              to="/shade-match"
              className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-[#D98CA3] to-[#E8B4B8] text-white text-xs font-bold shadow-xs hover:shadow-md transition-all flex items-center gap-2"
            >
              <Palette className="w-4 h-4" />
              <span>New Shade Match</span>
            </Link>

            <Link
              to="/appointments"
              className="px-4 py-2.5 rounded-2xl bg-white border border-[#F7CAD0] hover:border-[#D98CA3] text-[#33272A] text-xs font-bold transition-all flex items-center gap-2 shadow-2xs"
            >
              <Calendar className="w-4 h-4 text-[#D98CA3]" />
              <span>Book Artist</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column (8 cols): Beauty Score & Recommendations */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Beauty Score & Calibration Metrics */}
          <div className="glass-card p-6 rounded-3xl space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-serif text-xl font-bold text-[#33272A] flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[#D98CA3]" />
                  <span>Beauty Score & Skin Calibration</span>
                </h3>
                <p className="text-xs text-[#5C4D51]">AI precision rating based on your shade profile and routine preferences.</p>
              </div>

              <span className="font-serif text-3xl font-bold text-[#D98CA3]">
                {profile.beautyScore}/100
              </span>
            </div>

            {/* Score Progress Bar */}
            <div className="space-y-2">
              <div className="w-full h-3 rounded-full bg-[#FADADD]/40 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${profile.beautyScore}%` }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                  className="h-full bg-gradient-to-r from-[#D98CA3] via-[#E8B4B8] to-[#C9A7EB]"
                />
              </div>

              <div className="flex justify-between text-[11px] font-semibold text-[#5C4D51]">
                <span>Basic Profile</span>
                <span>Sub-surface Undertone Matched</span>
                <span className="text-[#D98CA3]">High Precision (98%)</span>
              </div>
            </div>
          </div>

          {/* Personalized Recommendations */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-serif text-xl font-bold text-[#33272A]">
                  Tailored For Your Complexion
                </h3>
                <p className="text-xs text-[#5C4D51]">Matched specifically for {profile.skinTone} skin with {profile.undertone} undertones.</p>
              </div>
              <Link to="/products" className="text-xs font-bold text-[#D98CA3] hover:underline flex items-center gap-1">
                <span>View All</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {recommendedProducts.map((product) => (
                <motion.div
                  key={product.id}
                  whileHover={{ y: -4 }}
                  className="glass-card p-4 rounded-2xl flex gap-4 border border-[#F7CAD0]/40 group"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-20 h-20 rounded-xl object-cover"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-[#D98CA3]">{product.brand}</span>
                      <h4 className="font-semibold text-xs text-[#33272A] line-clamp-1">{product.name}</h4>
                      <p className="text-[11px] text-[#5C4D51]">${product.price} · {product.category}</p>
                    </div>

                    <button
                      onClick={(e) => addToCart(product, undefined, e.currentTarget)}
                      className="mt-2 text-xs font-bold text-[#D98CA3] hover:text-[#33272A] flex items-center gap-1 transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add to Bag</span>
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Saved Looks Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-serif text-xl font-bold text-[#33272A]">
                  Saved Virtual Looks ({savedLooks.length})
                </h3>
                <p className="text-xs text-[#5C4D51]">Quick access to your bookmarked makeup styles.</p>
              </div>
              <Link to="/virtual-lookbook" className="text-xs font-bold text-[#D98CA3] hover:underline">
                Explore Lookbook
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {savedLooks.map((look) => (
                <div key={look.id} className="glass-card rounded-2xl overflow-hidden border border-[#F7CAD0]/40 flex gap-3 p-3">
                  <img
                    src={look.image}
                    alt={look.title}
                    className="w-20 h-20 rounded-xl object-cover"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-[#D98CA3] uppercase">{look.category}</span>
                      <h4 className="font-bold text-xs text-[#33272A]">{look.title}</h4>
                      <p className="text-[10px] text-[#5C4D51]">{look.durationMinutes} mins · {look.difficulty}</p>
                    </div>

                    <Link to="/virtual-lookbook" className="text-[11px] font-bold text-[#D98CA3] hover:underline">
                      View Steps →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column (4 cols): Upcoming Appointment & Activity */}
        <div className="lg:col-span-4 space-y-8">
          
          {/* Upcoming Appointment Card */}
          <div className="glass-card p-6 rounded-3xl space-y-4 border border-[#F7CAD0]">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#D98CA3] bg-[#FADADD]/40 px-2.5 py-1 rounded-full">
                Upcoming Session
              </span>
              <Calendar className="w-4 h-4 text-[#D98CA3]" />
            </div>

            {upcomingAppointment ? (
              <div className="space-y-3">
                <h4 className="font-serif text-lg font-bold text-[#33272A] leading-snug">
                  {upcomingAppointment.serviceName}
                </h4>
                
                <div className="space-y-1 text-xs text-[#5C4D51]">
                  <p className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-[#D98CA3]" />
                    <span className="font-semibold text-[#33272A]">{upcomingAppointment.date} at {upcomingAppointment.timeSlot}</span>
                  </p>
                  <p className="text-[11px]">Artist: <span className="font-bold text-[#33272A]">{upcomingAppointment.artistName}</span></p>
                  <p className="text-[10px] text-[#5C4D51]/80">{upcomingAppointment.location}</p>
                </div>

                <Link
                  to="/appointments"
                  className="block w-full py-2.5 text-center rounded-xl bg-[#FFF8F3] border border-[#F7CAD0] text-xs font-bold text-[#33272A] hover:bg-[#FADADD]/30 transition-colors"
                >
                  Manage Reservation
                </Link>
              </div>
            ) : (
              <div className="text-center py-6 space-y-3">
                <p className="text-xs text-[#5C4D51]">No upcoming appointment scheduled.</p>
                <Link
                  to="/appointments"
                  className="inline-block px-4 py-2 rounded-xl bg-[#D98CA3] text-white text-xs font-bold"
                >
                  Book Artist Session
                </Link>
              </div>
            )}
          </div>

          {/* Wishlist Overview */}
          <div className="glass-card p-6 rounded-3xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-lg font-bold text-[#33272A] flex items-center gap-2">
                <Heart className="w-4 h-4 text-[#D98CA3] fill-current" />
                <span>Wishlist ({wishlistProducts.length})</span>
              </h3>
              <Link to="/products" className="text-xs font-bold text-[#D98CA3]">Shop All</Link>
            </div>

            <div className="space-y-3">
              {wishlistProducts.slice(0, 3).map((p) => (
                <div key={p.id} className="flex items-center justify-between p-2 rounded-xl bg-[#FFF9FB] border border-[#F7CAD0]/30">
                  <div className="flex items-center gap-3">
                    <img src={p.image} alt={p.name} className="w-10 h-10 rounded-lg object-cover" />
                    <div>
                      <h5 className="font-semibold text-xs text-[#33272A] line-clamp-1">{p.name}</h5>
                      <span className="text-[10px] text-[#5C4D51]">${p.price}</span>
                    </div>
                  </div>
                  <button
                    onClick={(e) => addToCart(p, undefined, e.currentTarget)}
                    className="p-1.5 rounded-lg bg-[#FADADD]/40 text-[#D98CA3] hover:bg-[#D98CA3] hover:text-white transition-colors"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity Timeline */}
          <div className="glass-card p-6 rounded-3xl space-y-4">
            <h3 className="font-serif text-lg font-bold text-[#33272A] flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-[#D98CA3]" />
              <span>Studio Activity</span>
            </h3>

            <div className="space-y-3 text-xs text-[#5C4D51]">
              <div className="flex gap-3">
                <div className="w-2 h-2 rounded-full bg-[#D98CA3] mt-1.5 shrink-0" />
                <div>
                  <p className="font-semibold text-[#33272A]">AI Undertone Re-calibrated</p>
                  <p className="text-[10px] text-[#5C4D51]/80">Matched to Dior 2N & Charlotte 6W</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-2 h-2 rounded-full bg-[#C9A7EB] mt-1.5 shrink-0" />
                <div>
                  <p className="font-semibold text-[#33272A]">Look Saved to Collection</p>
                  <p className="text-[10px] text-[#5C4D51]/80">Parisian Soft Glam step tutorial</p>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
