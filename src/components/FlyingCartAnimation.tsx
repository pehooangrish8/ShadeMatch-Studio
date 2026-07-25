import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../context/AppContext';

export const FlyingCartAnimation: React.FC = () => {
  const { flyingProduct } = useApp();

  return (
    <AnimatePresence>
      {flyingProduct && (
        <motion.div
          key="flying-product"
          initial={{
            x: flyingProduct.x,
            y: flyingProduct.y,
            scale: 1,
            opacity: 1,
          }}
          animate={{
            x: window.innerWidth - 60,
            y: 30,
            scale: 0.2,
            opacity: 0.8,
          }}
          exit={{ opacity: 0, scale: 0.1 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="fixed pointer-events-none z-50 w-16 h-16 rounded-2xl overflow-hidden border-2 border-[#D98CA3] shadow-2xl bg-white"
        >
          <img
            src={flyingProduct.image}
            alt="Flying product"
            className="w-full h-full object-cover"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
