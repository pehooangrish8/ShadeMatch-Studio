import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Settings as SettingsIcon, 
  Bell, 
  Palette, 
  ShieldCheck, 
  Download, 
  Trash2, 
  CheckCircle2, 
  User, 
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const SettingsPage: React.FC = () => {
  const { profile, updateProfile, clearCart } = useApp();

  const [notifications, setNotifications] = useState({
    shadeDrops: true,
    appointmentReminders: true,
    beautyEditNewsletter: false,
    aiReCalibrations: true,
  });

  const [themeAccent, setThemeAccent] = useState<string>('Rose Quartz');
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleExportData = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(profile, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `shadematch_profile_${profile.name.toLowerCase().replace(/\s+/g, '_')}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 4000);
  };

  const handleResetData = () => {
    if (confirm('Are you sure you want to reset local ShadeMatch Studio data?')) {
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header */}
      <div className="space-y-2 border-b border-[#F7CAD0]/50 pb-6">
        <div className="inline-flex items-center gap-2 text-xs uppercase font-bold tracking-wider text-[#D98CA3]">
          <SettingsIcon className="w-4 h-4" />
          <span>System & Preferences</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#33272A]">
          Studio Settings
        </h1>
        <p className="text-xs sm:text-sm text-[#5C4D51]">
          Manage account privacy, notification channels, theme accents, and exported beauty telemetry.
        </p>
      </div>

      {/* 1. Account Info */}
      <div className="glass-card p-6 rounded-3xl space-y-6">
        <h3 className="font-serif text-xl font-bold text-[#33272A] flex items-center gap-2">
          <User className="w-5 h-5 text-[#D98CA3]" />
          <span>Account Preferences</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#33272A] mb-2">
              Currency Format
            </label>
            <select className="w-full px-4 py-3 rounded-2xl bg-white border border-[#F7CAD0] text-sm text-[#33272A]">
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
              <option value="GBP">GBP (£)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#33272A] mb-2">
              Studio Language
            </label>
            <select className="w-full px-4 py-3 rounded-2xl bg-white border border-[#F7CAD0] text-sm text-[#33272A]">
              <option value="en">English (US)</option>
              <option value="fr">Français (Paris)</option>
            </select>
          </div>
        </div>
      </div>

      {/* 2. Notifications */}
      <div className="glass-card p-6 rounded-3xl space-y-6">
        <h3 className="font-serif text-xl font-bold text-[#33272A] flex items-center gap-2">
          <Bell className="w-5 h-5 text-[#D98CA3]" />
          <span>Notification Alerts</span>
        </h3>

        <div className="space-y-4">
          {[
            { key: 'shadeDrops', label: 'Exclusive Brand Shade Drops', desc: 'Get alerted when new foundation undertones drop from Dior, Rhode & Charlotte Tilbury.' },
            { key: 'appointmentReminders', label: 'Artist Appointment Reminders', desc: 'SMS and email reminders 24 hours prior to masterclass studio bookings.' },
            { key: 'aiReCalibrations', label: 'Seasonal AI Re-calibrations', desc: 'Prompts to adjust undertones when transitioning between summer tan & winter skin.' },
            { key: 'beautyEditNewsletter', label: 'The Beauty Edit Weekly Digest', desc: 'Curated skincare news, peptide research, and lookbook trends.' },
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between p-4 rounded-2xl bg-[#FFF9FB] border border-[#F7CAD0]/40">
              <div className="space-y-0.5">
                <h4 className="font-bold text-xs text-[#33272A]">{item.label}</h4>
                <p className="text-[11px] text-[#5C4D51]">{item.desc}</p>
              </div>

              <input
                type="checkbox"
                checked={(notifications as any)[item.key]}
                onChange={() => setNotifications(prev => ({ ...prev, [item.key]: !(prev as any)[item.key] }))}
                className="w-5 h-5 accent-[#D98CA3] rounded-md cursor-pointer"
              />
            </div>
          ))}
        </div>
      </div>

      {/* 3. Theme Accents */}
      <div className="glass-card p-6 rounded-3xl space-y-6">
        <h3 className="font-serif text-xl font-bold text-[#33272A] flex items-center gap-2">
          <Palette className="w-5 h-5 text-[#D98CA3]" />
          <span>Luxury Theme Accent</span>
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { name: 'Rose Quartz', color: 'bg-[#F7CAD0]' },
            { name: 'Lavender Mist', color: 'bg-[#EADCF8]' },
            { name: 'Soft Peach', color: 'bg-[#FFD6C9]' },
            { name: 'Champagne Glow', color: 'bg-[#F7E7CE]' },
          ].map((theme) => (
            <button
              key={theme.name}
              type="button"
              onClick={() => setThemeAccent(theme.name)}
              className={`p-4 rounded-2xl border text-center transition-all ${
                themeAccent === theme.name
                  ? 'border-[#D98CA3] bg-[#FADADD]/40 ring-2 ring-[#D98CA3]/30 font-bold'
                  : 'border-[#F7CAD0] bg-white text-[#5C4D51]'
              }`}
            >
              <div className={`w-8 h-8 rounded-full ${theme.color} mx-auto mb-2 border border-black/10`} />
              <span className="text-xs text-[#33272A]">{theme.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 4. Connected Accounts */}
      <div className="glass-card p-6 rounded-3xl space-y-6">
        <h3 className="font-serif text-xl font-bold text-[#33272A] flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-[#D98CA3]" />
          <span>Connected Beauty Rewards</span>
        </h3>

        <div className="space-y-3">
          {[
            { name: 'Dior Beauty Privé', status: 'Connected', Tier: 'Gold VIP' },
            { name: 'Sephora Beauty Insider', status: 'Connected', Tier: 'Rouge Tier' },
            { name: 'Rhode Glaze Club', status: 'Connected', Tier: 'Member' },
          ].map((acc) => (
            <div key={acc.name} className="flex items-center justify-between p-4 rounded-2xl bg-[#FFF9FB] border border-[#F7CAD0]/40">
              <div>
                <h4 className="font-bold text-xs text-[#33272A]">{acc.name}</h4>
                <span className="text-[10px] text-[#D98CA3] font-semibold">{acc.Tier}</span>
              </div>
              <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                <ShieldCheck className="w-4 h-4" />
                <span>{acc.status}</span>
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Data Export & Reset */}
      <div className="glass-card p-6 rounded-3xl space-y-6">
        <h3 className="font-serif text-xl font-bold text-[#33272A] flex items-center gap-2">
          <Download className="w-5 h-5 text-[#D98CA3]" />
          <span>Data Portability & Management</span>
        </h3>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1">
            <h4 className="font-bold text-xs text-[#33272A]">Export Beauty Telemetry</h4>
            <p className="text-xs text-[#5C4D51]">Download a JSON snapshot of your shade calibration & wishlist.</p>
          </div>

          <button
            onClick={handleExportData}
            className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-[#FFF8F3] border border-[#F7CAD0] text-xs font-bold text-[#33272A] hover:border-[#D98CA3] flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4 text-[#D98CA3]" />
            <span>Download Backup</span>
          </button>
        </div>

        {downloadSuccess && (
          <p className="text-xs text-emerald-600 font-bold flex items-center gap-1">
            <CheckCircle2 className="w-4 h-4" />
            <span>Beauty profile exported successfully!</span>
          </p>
        )}

        <div className="pt-6 border-t border-[#F7CAD0]/40 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1">
            <h4 className="font-bold text-xs text-rose-600">Reset Local Storage</h4>
            <p className="text-xs text-[#5C4D51]">Clears local cart, appointments, and saved lookbooks.</p>
          </div>

          <button
            onClick={handleResetData}
            className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-rose-50 border border-rose-200 text-xs font-bold text-rose-600 hover:bg-rose-100 flex items-center justify-center gap-2"
          >
            <Trash2 className="w-4 h-4" />
            <span>Reset Local App State</span>
          </button>
        </div>
      </div>

    </div>
  );
};
