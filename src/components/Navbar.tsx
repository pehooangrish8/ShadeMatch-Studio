import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  ShoppingBag, 
  User, 
  Menu, 
  X, 
  Palette, 
  Calendar, 
  BarChart3, 
  Compass, 
  Search,
  Sparkle,
  Sliders
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const { profile, cart, setIsCartOpen } = useApp();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Beauty Profile', path: '/profile' },
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Products', path: '/products' },
    { name: 'Shade Comparison', path: '/shade-match' },
    { name: 'Lookbook', path: '/virtual-lookbook' },
    { name: 'Appointments', path: '/appointments' },
    { name: 'Analytics', path: '/analytics' },
    { name: 'Settings', path: '/settings' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-[#F7CAD0]/40 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#D98CA3] via-[#E8B4B8] to-[#F7E7CE] p-0.5 shadow-md group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-[#D98CA3]" />
              </div>
            </div>
            <div>
              <span className="font-serif text-2xl font-bold tracking-tight text-[#33272A] block leading-none">
                ShadeMatch<span className="text-[#D98CA3]">.</span>
              </span>
              <span className="text-[10px] tracking-widest uppercase font-medium text-[#D98CA3] block mt-0.5">
                BeautyTech Studio
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative px-3 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                    isActive
                      ? 'text-[#D98CA3] bg-[#FADADD]/30'
                      : 'text-[#5C4D51] hover:text-[#D98CA3] hover:bg-[#FFF8F3]'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="navIndicator"
                      className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#D98CA3] rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {/* Quick Profile Badge */}
            <Link
              to="/profile"
              className="hidden sm:flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full bg-[#FFF8F3] border border-[#F7CAD0]/50 hover:border-[#D98CA3] transition-all group"
            >
              <img
                src={profile.avatar}
                alt={profile.name}
                className="w-7 h-7 rounded-full object-cover ring-2 ring-[#E8B4B8]"
              />
              <div className="text-left">
                <p className="text-xs font-semibold text-[#33272A] leading-tight group-hover:text-[#D98CA3] transition-colors">
                  {profile.name.split(' ')[0]}
                </p>
                <div className="flex items-center gap-1 text-[10px] text-[#D98CA3] font-medium">
                  <Sparkle className="w-2.5 h-2.5 fill-current" />
                  <span>{profile.skinTone} · {profile.undertone}</span>
                </div>
              </div>
            </Link>

            {/* Cart Trigger Button */}
            <button
              id="cart-icon-btn"
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-2xl bg-[#FFF8F3] hover:bg-[#FADADD]/40 border border-[#F7CAD0]/60 text-[#33272A] hover:text-[#D98CA3] transition-all shadow-2xs group"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <AnimatePresence>
                {totalCartItems > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-gradient-to-r from-[#D98CA3] to-[#E8B4B8] text-white text-[10px] font-bold flex items-center justify-center shadow-sm"
                  >
                    {totalCartItems}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-2xl bg-[#FFF8F3] border border-[#F7CAD0]/60 text-[#33272A]"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white/95 backdrop-blur-xl border-b border-[#F7CAD0]/50 overflow-hidden"
          >
            <div className="px-4 pt-3 pb-6 space-y-2">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block px-4 py-2.5 rounded-2xl text-sm font-semibold transition-all ${
                      isActive
                        ? 'bg-[#FADADD]/40 text-[#D98CA3] font-bold'
                        : 'text-[#5C4D51] hover:bg-[#FFF8F3]'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
