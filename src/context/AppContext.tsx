import React, { createContext, useContext, useState, useEffect } from 'react';
import { BeautyProfile, Product, CartItem, LookbookItem, Appointment } from '../types';
import { initialBeautyProfile, mockProducts, mockLookbookItems, mockAppointments } from '../data/mockData';

interface AppContextType {
  profile: BeautyProfile;
  updateProfile: (updatedProfile: Partial<BeautyProfile>) => void;
  cart: CartItem[];
  addToCart: (product: Product, selectedShade?: string, flyingElement?: HTMLElement | null) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, delta: number) => void;
  clearCart: () => void;
  savedLookIds: string[];
  toggleSaveLook: (lookId: string) => void;
  wishlistIds: string[];
  toggleWishlist: (productId: string) => void;
  appointments: Appointment[];
  addAppointment: (appointment: Omit<Appointment, 'id'>) => void;
  cancelAppointment: (id: string) => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  flyingProduct: { x: number; y: number; image: string } | null;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Beauty Profile
  const [profile, setProfile] = useState<BeautyProfile>(() => {
    const saved = localStorage.getItem('shadematch_profile');
    return saved ? JSON.parse(saved) : initialBeautyProfile;
  });

  useEffect(() => {
    localStorage.setItem('shadematch_profile', JSON.stringify(profile));
  }, [profile]);

  const updateProfile = (updated: Partial<BeautyProfile>) => {
    setProfile(prev => ({ ...prev, ...updated }));
  };

  // Cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('shadematch_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [flyingProduct, setFlyingProduct] = useState<{ x: number; y: number; image: string } | null>(null);

  useEffect(() => {
    localStorage.setItem('shadematch_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product, selectedShade?: string, flyingElement?: HTMLElement | null) => {
    if (flyingElement) {
      const rect = flyingElement.getBoundingClientRect();
      setFlyingProduct({
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
        image: product.image,
      });

      setTimeout(() => {
        setFlyingProduct(null);
      }, 800);
    }

    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id && item.selectedShade === selectedShade);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id && item.selectedShade === selectedShade
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1, selectedShade }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const updateCartQuantity = (productId: string, delta: number) => {
    setCart(prev =>
      prev
        .map(item => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const clearCart = () => setCart([]);

  // Saved Looks
  const [savedLookIds, setSavedLookIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('shadematch_saved_looks');
    return saved ? JSON.parse(saved) : ['look-1', 'look-2'];
  });

  useEffect(() => {
    localStorage.setItem('shadematch_saved_looks', JSON.stringify(savedLookIds));
  }, [savedLookIds]);

  const toggleSaveLook = (lookId: string) => {
    setSavedLookIds(prev =>
      prev.includes(lookId) ? prev.filter(id => id !== lookId) : [...prev, lookId]
    );
  };

  // Wishlist
  const [wishlistIds, setWishlistIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('shadematch_wishlist');
    return saved ? JSON.parse(saved) : ['prod-1', 'prod-3', 'prod-5'];
  });

  useEffect(() => {
    localStorage.setItem('shadematch_wishlist', JSON.stringify(wishlistIds));
  }, [wishlistIds]);

  const toggleWishlist = (productId: string) => {
    setWishlistIds(prev =>
      prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]
    );
  };

  // Appointments
  const [appointments, setAppointments] = useState<Appointment[]>(() => {
    const saved = localStorage.getItem('shadematch_appointments');
    return saved ? JSON.parse(saved) : mockAppointments;
  });

  useEffect(() => {
    localStorage.setItem('shadematch_appointments', JSON.stringify(appointments));
  }, [appointments]);

  const addAppointment = (newAppt: Omit<Appointment, 'id'>) => {
    const created: Appointment = {
      ...newAppt,
      id: `app-${Date.now()}`,
    };
    setAppointments(prev => [created, ...prev]);
  };

  const cancelAppointment = (id: string) => {
    setAppointments(prev => prev.map(a => (a.id === id ? { ...a, status: 'Cancelled' as const } : a)));
  };

  return (
    <AppContext.Provider
      value={{
        profile,
        updateProfile,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        savedLookIds,
        toggleSaveLook,
        wishlistIds,
        toggleWishlist,
        appointments,
        addAppointment,
        cancelAppointment,
        isCartOpen,
        setIsCartOpen,
        flyingProduct,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
