import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { FlyingCartAnimation } from './components/FlyingCartAnimation';

import { LandingPage } from './pages/LandingPage';
import { BeautyProfilePage } from './pages/BeautyProfilePage';
import { DashboardPage } from './pages/DashboardPage';
import { ProductsPage } from './pages/ProductsPage';
import { ShadeMatchPage } from './pages/ShadeMatchPage';
import { VirtualLookbookPage } from './pages/VirtualLookbookPage';
import { AppointmentSchedulingPage } from './pages/AppointmentSchedulingPage';
import { BeautyAnalyticsPage } from './pages/BeautyAnalyticsPage';
import { SettingsPage } from './pages/SettingsPage';

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default function App() {
  return (
    <AppProvider>
      <Router>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col bg-[#FFF9FB] text-[#33272A] selection:bg-[#FADADD] selection:text-[#33272A]">
          {/* Flying Product Animation Canvas */}
          <FlyingCartAnimation />

          {/* Sticky Luxury Header */}
          <Navbar />

          {/* Slide-over Cart Drawer */}
          <CartDrawer />

          {/* Main Body View */}
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/profile" element={<BeautyProfilePage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/shade-match" element={<ShadeMatchPage />} />
              <Route path="/virtual-lookbook" element={<VirtualLookbookPage />} />
              <Route path="/appointments" element={<AppointmentSchedulingPage />} />
              <Route path="/analytics" element={<BeautyAnalyticsPage />} />
              <Route path="/settings" element={<SettingsPage />} />
            </Routes>
          </main>

          {/* Footer */}
          <Footer />
        </div>
      </Router>
    </AppProvider>
  );
}
