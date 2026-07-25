import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShoppingBag, Plus, Minus, Trash2, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useApp } from '../context/AppContext';

export const CartDrawer: React.FC = () => {
  const { isCartOpen, setIsCartOpen, cart, updateCartQuantity, removeFromCart, clearCart } = useApp();
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoMessage, setPromoMessage] = useState('');
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discount = (subtotal * discountPercent) / 100;
  const freeShippingThreshold = 2500;
  const shipping = subtotal >= freeShippingThreshold || subtotal === 0 ? 0 : 250;
  const total = subtotal - discount + shipping;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'BEAUTY15' || promoCode.trim().toUpperCase() === 'SHADEMATCH') {
      setDiscountPercent(15);
      setPromoMessage('15% Hackathon VIP Discount Applied!');
    } else {
      setPromoMessage('Invalid promo code. Try BEAUTY15');
    }
  };

  const handleCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setOrderComplete(true);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#D98CA3', '#E8B4B8', '#F7E7CE', '#C9A7EB']
      });
      setTimeout(() => {
        clearCart();
        setOrderComplete(false);
        setIsCartOpen(false);
      }, 3000);
    }, 1200);
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black/30 backdrop-blur-xs z-50"
          />

          {/* Drawer Slide Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white z-50 shadow-2xl flex flex-col border-l border-[#F7CAD0]/50"
          >
            {/* Header */}
            <div className="p-6 border-b border-[#F7CAD0]/40 flex items-center justify-between bg-[#FFF8F3]/60">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#FADADD]/40 flex items-center justify-center text-[#D98CA3]">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold text-[#33272A]">Your Beauty Bag</h3>
                  <p className="text-xs text-[#5C4D51] font-medium">
                    {cart.reduce((sum, item) => sum + item.quantity, 0)} item(s) selected
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsCartOpen(false)}
                className="w-8 h-8 rounded-full bg-white border border-[#F7CAD0]/60 flex items-center justify-center text-[#5C4D51] hover:text-[#D98CA3] transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Free Shipping Progress */}
            <div className="px-6 py-3 bg-[#FFF9FB] border-b border-[#F7CAD0]/30 text-xs text-[#5C4D51]">
              {subtotal >= freeShippingThreshold ? (
                <div className="flex items-center gap-2 text-emerald-600 font-semibold">
                  <Sparkles className="w-4 h-4 fill-current" />
                  <span>You unlocked FREE Express Beauty Shipping!</span>
                </div>
              ) : (
                <div className="space-y-1.5">
                  <p className="font-medium">
                    Add <span className="font-bold text-[#D98CA3]">₹{(freeShippingThreshold - subtotal).toLocaleString('en-IN')}</span> more for FREE Shipping!
                  </p>
                  <div className="w-full h-1.5 rounded-full bg-[#FADADD]/40 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#D98CA3] to-[#E8B4B8] transition-all duration-300"
                      style={{ width: `${Math.min(100, (subtotal / freeShippingThreshold) * 100)}%` }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Body / Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {orderComplete ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="font-serif text-2xl font-bold text-[#33272A]">Order Confirmed!</h4>
                  <p className="text-sm text-[#5C4D51]">
                    Thank you for shopping at ShadeMatch Studio. Your personalized cosmetics are being prepped.
                  </p>
                </div>
              ) : cart.length === 0 ? (
                <div className="text-center py-16 space-y-4">
                  <div className="w-20 h-20 rounded-full bg-[#FFF8F3] border border-[#F7CAD0]/50 mx-auto flex items-center justify-center text-[#D98CA3]">
                    <ShoppingBag className="w-8 h-8" />
                  </div>
                  <h4 className="font-serif text-xl font-bold text-[#33272A]">Your Bag is Empty</h4>
                  <p className="text-xs text-[#5C4D51] max-w-xs mx-auto">
                    Explore our curated beauty products and AI shade recommendations to fill your bag with glow.
                  </p>
                </div>
              ) : (
                cart.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex gap-4 p-3.5 rounded-2xl bg-[#FFF9FB] border border-[#F7CAD0]/40 shadow-2xs relative group"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-20 h-20 rounded-xl object-cover border border-[#F7CAD0]/40"
                    />

                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between">
                          <div>
                            <span className="text-[10px] uppercase font-bold tracking-wider text-[#D98CA3]">
                              {item.product.brand}
                            </span>
                            <h5 className="font-semibold text-xs text-[#33272A] line-clamp-1">
                              {item.product.name}
                            </h5>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.product.id)}
                            className="text-[#5C4D51]/50 hover:text-red-500 transition-colors p-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {item.selectedShade && (
                          <p className="text-[11px] text-[#5C4D51] mt-0.5">
                            Shade: <span className="font-medium text-[#33272A]">{item.selectedShade}</span>
                          </p>
                        )}
                      </div>

                      <div className="flex items-center justify-between mt-2">
                        <span className="text-sm font-bold text-[#33272A]">
                          ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                        </span>

                        <div className="flex items-center gap-2 bg-white border border-[#F7CAD0]/60 rounded-xl px-2 py-1 shadow-2xs">
                          <button
                            onClick={() => updateCartQuantity(item.product.id, -1)}
                            className="text-[#5C4D51] hover:text-[#D98CA3] transition-colors p-0.5"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-bold text-[#33272A] min-w-4 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateCartQuantity(item.product.id, 1)}
                            className="text-[#5C4D51] hover:text-[#D98CA3] transition-colors p-0.5"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer / Summary Checkout */}
            {cart.length > 0 && !orderComplete && (
              <div className="p-6 border-t border-[#F7CAD0]/40 bg-[#FFF8F3]/70 space-y-4">
                {/* Promo Code input */}
                <form onSubmit={handleApplyPromo} className="flex gap-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Promo Code (BEAUTY15)"
                    className="flex-1 px-3 py-2 rounded-xl bg-white border border-[#F7CAD0] text-xs text-[#33272A] uppercase placeholder:normal-case focus:outline-hidden focus:border-[#D98CA3]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-[#FADADD] hover:bg-[#E8B4B8] text-[#33272A] text-xs font-bold transition-colors"
                  >
                    Apply
                  </button>
                </form>
                {promoMessage && (
                  <p className={`text-[11px] font-medium ${discountPercent > 0 ? 'text-emerald-600' : 'text-rose-500'}`}>
                    {promoMessage}
                  </p>
                )}

                {/* Subtotals */}
                <div className="space-y-1.5 text-xs text-[#5C4D51] pt-2 border-t border-[#F7CAD0]/30">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-semibold text-[#33272A]">₹{subtotal.toLocaleString('en-IN')}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-emerald-600">
                      <span>Promo Discount</span>
                      <span className="font-semibold">-₹{discount.toLocaleString('en-IN')}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="font-semibold text-[#33272A]">
                      {shipping === 0 ? 'FREE' : `₹${shipping.toLocaleString('en-IN')}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-base font-bold text-[#33272A] pt-2 border-t border-[#F7CAD0]/40">
                    <span>Total</span>
                    <span className="text-[#D98CA3]">₹{total.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                {/* Checkout Button */}
                <button
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#D98CA3] via-[#E8B4B8] to-[#D98CA3] text-white font-bold text-sm shadow-md hover:shadow-lg hover:opacity-95 transition-all flex items-center justify-center gap-2 group"
                >
                  {isCheckingOut ? (
                    <span>Processing Luxury Order...</span>
                  ) : (
                    <>
                      <span>Checkout Now</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
