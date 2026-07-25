import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Heart, Send, Instagram, Twitter, Youtube, Facebook, CheckCircle2 } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className="bg-gradient-to-b from-[#FFF9FB] via-[#FFF8F3] to-[#FADADD]/20 border-t border-[#F7CAD0]/40 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#F7CAD0]/40">
          
          {/* Column 1: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-[#D98CA3] to-[#F7E7CE] p-0.5 shadow-sm">
                <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-[#D98CA3]" />
                </div>
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight text-[#33272A]">
                ShadeMatch<span className="text-[#D98CA3]">.</span>
              </span>
            </div>
            <p className="text-sm text-[#5C4D51] leading-relaxed max-w-sm">
              Your personal BeautyTech studio. Discover science-backed foundation matches, virtual lookbook styles, and luxury artist appointments crafted uniquely for your complexion.
            </p>
            
            {/* Social Links */}
            <div className="flex items-center gap-3 pt-2">
              {[
                { icon: Instagram, href: '#' },
                { icon: Youtube, href: '#' },
                { icon: Twitter, href: '#' },
                { icon: Facebook, href: '#' },
              ].map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  className="w-9 h-9 rounded-2xl bg-white border border-[#F7CAD0]/50 flex items-center justify-center text-[#5C4D51] hover:text-[#D98CA3] hover:border-[#D98CA3] hover:bg-[#FADADD]/20 transition-all shadow-2xs"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Studio Navigation */}
          <div className="space-y-3">
            <h4 className="font-serif text-base font-semibold text-[#33272A] uppercase tracking-wider">
              Studio & Tools
            </h4>
            <ul className="space-y-2 text-sm text-[#5C4D51]">
              <li><Link to="/profile" className="hover:text-[#D98CA3] transition-colors">Beauty Profile</Link></li>
              <li><Link to="/shade-match" className="hover:text-[#D98CA3] transition-colors">AI Shade Comparison</Link></li>
              <li><Link to="/products" className="hover:text-[#D98CA3] transition-colors">Curated Cosmetics</Link></li>
              <li><Link to="/virtual-lookbook" className="hover:text-[#D98CA3] transition-colors">Virtual Lookbook</Link></li>
              <li><Link to="/appointments" className="hover:text-[#D98CA3] transition-colors">Artist Appointments</Link></li>
            </ul>
          </div>

          {/* Column 3: Platform */}
          <div className="space-y-3">
            <h4 className="font-serif text-base font-semibold text-[#33272A] uppercase tracking-wider">
              Account & Insights
            </h4>
            <ul className="space-y-2 text-sm text-[#5C4D51]">
              <li><Link to="/dashboard" className="hover:text-[#D98CA3] transition-colors">Personal Dashboard</Link></li>
              <li><Link to="/analytics" className="hover:text-[#D98CA3] transition-colors">Skin Health Analytics</Link></li>
              <li><Link to="/settings" className="hover:text-[#D98CA3] transition-colors">Settings & Preferences</Link></li>
              <li><a href="#how-it-works" className="hover:text-[#D98CA3] transition-colors">Shade Science Guide</a></li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div className="space-y-3">
            <h4 className="font-serif text-base font-semibold text-[#33272A] uppercase tracking-wider">
              The Beauty Edit
            </h4>
            <p className="text-xs text-[#5C4D51]">
              Receive early access to shade drops, masterclass invitations, and bespoke skin health tips.
            </p>
            
            {subscribed ? (
              <div className="flex items-center gap-2 p-3 rounded-2xl bg-[#EADCF8]/40 border border-[#C9A7EB]/50 text-xs font-semibold text-[#33272A]">
                <CheckCircle2 className="w-4 h-4 text-[#D98CA3]" />
                <span>You're subscribed to The Beauty Edit!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full pl-3 pr-10 py-2.5 rounded-2xl bg-white border border-[#F7CAD0] text-xs text-[#33272A] placeholder-[#5C4D51]/50 focus:outline-hidden focus:border-[#D98CA3] transition-all shadow-2xs"
                  />
                  <button
                    type="submit"
                    className="absolute right-1.5 top-1.5 bottom-1.5 px-3 rounded-xl bg-gradient-to-r from-[#D98CA3] to-[#E8B4B8] text-white flex items-center justify-center hover:opacity-90 transition-opacity"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            )}
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#5C4D51] gap-4">
          <p>© {new Date().getFullYear()} ShadeMatch Studio Inc. Crafted for Hackathon Excellence.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-[#D98CA3] transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-[#D98CA3] transition-colors">Terms of Service</a>
            <span className="flex items-center gap-1 text-[#D98CA3]">
              Made with <Heart className="w-3 h-3 fill-current" /> for BeautyTech
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
