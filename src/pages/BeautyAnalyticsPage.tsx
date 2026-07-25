import React from 'react';
import { motion } from 'motion/react';
import { 
  BarChart3, 
  TrendingUp, 
  Sparkles, 
  Heart, 
  Calendar, 
  BookOpen,
  PieChart as PieChartIcon,
  ShieldCheck,
  Droplets
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  BarChart, 
  Bar,
  CartesianGrid
} from 'recharts';
import { useApp } from '../context/AppContext';
import { mockProducts } from '../data/mockData';

export const BeautyAnalyticsPage: React.FC = () => {
  const { profile, wishlistIds, savedLookIds, appointments } = useApp();

  // Mock Recharts Data Series
  const skinHealthData = [
    { month: 'Jan', hydration: 65, barrierScore: 70, matchPrecision: 82 },
    { month: 'Feb', hydration: 72, barrierScore: 78, matchPrecision: 88 },
    { month: 'Mar', hydration: 80, barrierScore: 82, matchPrecision: 92 },
    { month: 'Apr', hydration: 88, barrierScore: 89, matchPrecision: 96 },
    { month: 'May', hydration: 94, barrierScore: 92, matchPrecision: 98 },
  ];

  const categoryDistribution = [
    { name: 'Foundations', value: 35, color: '#D98CA3' },
    { name: 'Lipsticks', value: 25, color: '#E8B4B8' },
    { name: 'Skincare', value: 20, color: '#F7E7CE' },
    { name: 'Blush & Eye', value: 20, color: '#C9A7EB' },
  ];

  const undertoneMatchScore = [
    { brand: 'Dior Beauty', score: 98 },
    { brand: 'Charlotte T.', score: 95 },
    { brand: 'Rhode Skin', score: 99 },
    { brand: 'Rare Beauty', score: 92 },
    { brand: 'Fenty Beauty', score: 90 },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header Banner */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FADADD]/40 border border-[#E8B4B8]/50 text-xs font-bold text-[#D98CA3]">
          <BarChart3 className="w-3.5 h-3.5" />
          <span>Complexion Intelligence</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#33272A]">
          Beauty Analytics
        </h1>
        <p className="text-xs sm:text-sm text-[#5C4D51]">
          Dermatological insights, barrier health progress, and cosmetic purchase breakdown for {profile.name}.
        </p>
      </div>

      {/* Top Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        
        <div className="glass-card p-5 rounded-3xl space-y-2 border border-[#F7CAD0]">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-bold text-[#D98CA3]">Beauty Score</span>
            <Sparkles className="w-4 h-4 text-[#D98CA3]" />
          </div>
          <p className="font-serif text-3xl font-bold text-[#33272A]">{profile.beautyScore}</p>
          <p className="text-[10px] text-emerald-600 font-bold">+12% vs last month</p>
        </div>

        <div className="glass-card p-5 rounded-3xl space-y-2 border border-[#F7CAD0]">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-bold text-[#D98CA3]">Wishlist Items</span>
            <Heart className="w-4 h-4 text-[#D98CA3]" />
          </div>
          <p className="font-serif text-3xl font-bold text-[#33272A]">{wishlistIds.length}</p>
          <p className="text-[10px] text-[#5C4D51]">Saved products</p>
        </div>

        <div className="glass-card p-5 rounded-3xl space-y-2 border border-[#F7CAD0]">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-bold text-[#D98CA3]">Saved Looks</span>
            <BookOpen className="w-4 h-4 text-[#D98CA3]" />
          </div>
          <p className="font-serif text-3xl font-bold text-[#33272A]">{savedLookIds.length}</p>
          <p className="text-[10px] text-[#5C4D51]">Lookbook styles</p>
        </div>

        <div className="glass-card p-5 rounded-3xl space-y-2 border border-[#F7CAD0]">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-bold text-[#D98CA3]">Appointments</span>
            <Calendar className="w-4 h-4 text-[#D98CA3]" />
          </div>
          <p className="font-serif text-3xl font-bold text-[#33272A]">{appointments.length}</p>
          <p className="text-[10px] text-[#5C4D51]">Total sessions</p>
        </div>

      </div>

      {/* Main Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Chart 1: Skin Hydration & Precision Trend (8 cols) */}
        <div className="lg:col-span-8 glass-card p-6 rounded-3xl space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-serif text-xl font-bold text-[#33272A]">
                Skin Barrier & Match Precision Progress
              </h3>
              <p className="text-xs text-[#5C4D51]">5-month hydration level and undertone match telemetry.</p>
            </div>
            <span className="text-xs font-bold text-[#D98CA3] bg-[#FADADD]/40 px-3 py-1 rounded-full">
              Live Biometrics
            </span>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={skinHealthData}>
                <defs>
                  <linearGradient id="colorHydration" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#D98CA3" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#D98CA3" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorPrecision" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#C9A7EB" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#C9A7EB" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" stroke="#5C4D51" fontSize={11} />
                <YAxis stroke="#5C4D51" fontSize={11} />
                <Tooltip contentStyle={{ backgroundColor: '#FFF', borderRadius: '16px', border: '1px solid #F7CAD0' }} />
                <Area type="monotone" dataKey="hydration" stroke="#D98CA3" fillOpacity={1} fill="url(#colorHydration)" name="Hydration Score" />
                <Area type="monotone" dataKey="matchPrecision" stroke="#C9A7EB" fillOpacity={1} fill="url(#colorPrecision)" name="Match Precision %" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Category Pie Distribution (4 cols) */}
        <div className="lg:col-span-4 glass-card p-6 rounded-3xl space-y-6">
          <div>
            <h3 className="font-serif text-xl font-bold text-[#33272A]">
              Routine Category Balance
            </h3>
            <p className="text-xs text-[#5C4D51]">Distribution of products in your collection.</p>
          </div>

          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs font-semibold text-[#5C4D51]">
            {categoryDistribution.map((c) => (
              <div key={c.name} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: c.color }} />
                <span>{c.name} ({c.value}%)</span>
              </div>
            ))}
          </div>
        </div>

        {/* Chart 3: Brand Match Precision Bar Chart (12 cols) */}
        <div className="lg:col-span-12 glass-card p-6 rounded-3xl space-y-6">
          <div>
            <h3 className="font-serif text-xl font-bold text-[#33272A]">
              Brand Match Precision Rating (%)
            </h3>
            <p className="text-xs text-[#5C4D51]">Highest performing shade matches across luxury beauty houses.</p>
          </div>

          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={undertoneMatchScore}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F7CAD0/40" />
                <XAxis dataKey="brand" stroke="#5C4D51" fontSize={11} />
                <YAxis domain={[80, 100]} stroke="#5C4D51" fontSize={11} />
                <Tooltip contentStyle={{ backgroundColor: '#FFF', borderRadius: '16px', border: '1px solid #F7CAD0' }} />
                <Bar dataKey="score" fill="#D98CA3" radius={[12, 12, 0, 0]} name="Match Precision %" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
};
