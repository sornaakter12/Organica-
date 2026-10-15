import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CartItem, Product, OrderConfirmation } from '../types';
import { BUSINESS_INFO } from '../data/products';

interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  type?: 'success' | 'info' | 'warning';
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  totalItemsCount: number;
  subtotal: number;
  deliveryFee: number;
  discount: number;
  promoCode: string;
  promoApplied: boolean;
  applyPromoCode: (code: string) => { success: boolean; message: string };
  removePromoCode: () => void;
  finalTotal: number;
  
  // Modals & Panels
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;
  
  // Order Confirmation
  completedOrder: OrderConfirmation | null;
  setCompletedOrder: (order: OrderConfirmation | null) => void;
  
  // Toast notifications
  toasts: ToastMessage[];
  showToast: (title: string, description?: string, type?: 'success' | 'info' | 'warning') => void;
  dismissToast: (id: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const STORAGE_KEY = 'organica_cart_items_v2';
const PROMO_KEY = 'organica_promo_code_v2';

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {
      // ignore
    }
    return [];
  });

  const [promoCode, setPromoCode] = useState<string>(() => {
    try {
      return localStorage.getItem(PROMO_KEY) || '';
    } catch {
      return '';
    }
  });

  const [promoApplied, setPromoApplied] = useState<boolean>(() => {
    try {
      const code = localStorage.getItem(PROMO_KEY) || '';
      return code.toUpperCase() === 'ORGANIC10';
    } catch {
      return false;
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [completedOrder, setCompletedOrder] = useState<OrderConfirmation | null>(null);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.warn('Failed to save cart to localStorage', e);
    }
  }, [items]);

  // Sync promo code
  useEffect(() => {
    try {
      if (promoCode) {
        localStorage.setItem(PROMO_KEY, promoCode);
      } else {
        localStorage.removeItem(PROMO_KEY);
      }
    } catch (e) {
      console.warn('Failed to save promo to localStorage', e);
    }
  }, [promoCode]);

  const showToast = (title: string, description?: string, type: 'success' | 'info' | 'warning' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, title, description, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const addToCart = (product: Product, quantity = 1) => {
    const safeQty = Math.max(1, Math.floor(quantity));
    setItems((prevItems) => {
      const existing = prevItems.find((item) => item.product.id === product.id);
      if (existing) {
        return prevItems.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + safeQty }
            : item
        );
      }
      return [...prevItems, { product, quantity: safeQty }];
    });

    showToast(
      `Added to Basket`,
      `${safeQty}x ${product.name} (${product.unit}) added.`,
      'success'
    );
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    const safeQty = Math.min(99, Math.max(1, Math.floor(quantity)));
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.product.id === productId ? { ...item, quantity: safeQty } : item
      )
    );
  };

  const removeFromCart = (productId: string) => {
    const itemToRemove = items.find((i) => i.product.id === productId);
    setItems((prevItems) => prevItems.filter((item) => item.product.id !== productId));
    if (itemToRemove) {
      showToast('Item Removed', `${itemToRemove.product.name} removed from your basket.`, 'info');
    }
  };

  const clearCart = () => {
    setItems([]);
  };

  const applyPromoCode = (code: string) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'ORGANIC10') {
      setPromoCode('ORGANIC10');
      setPromoApplied(true);
      showToast('Coupon Applied!', '10% discount applied to your order subtotal.', 'success');
      return { success: true, message: '10% discount applied!' };
    }
    if (clean === 'FREESHIP') {
      setPromoCode('FREESHIP');
      setPromoApplied(true);
      showToast('Coupon Applied!', 'Free shipping applied to your order.', 'success');
      return { success: true, message: 'Free shipping promo applied!' };
    }
    return { success: false, message: 'Invalid coupon code. Try ORGANIC10' };
  };

  const removePromoCode = () => {
    setPromoCode('');
    setPromoApplied(false);
    showToast('Coupon Removed', 'Discount removed from your order.', 'info');
  };

  const totalItemsCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  // Delivery fee logic: Free if subtotal >= 1000 or FREESHIP code, otherwise standard ৳60 (0 if cart empty)
  const isFreeDelivery = subtotal >= BUSINESS_INFO.freeDeliveryThreshold || promoCode === 'FREESHIP';
  const deliveryFee = subtotal === 0 ? 0 : isFreeDelivery ? 0 : BUSINESS_INFO.standardDeliveryFee;

  // Discount calculation
  let discount = 0;
  if (promoApplied && promoCode === 'ORGANIC10') {
    discount = Math.round(subtotal * 0.1);
  }

  const finalTotal = Math.max(0, subtotal - discount + deliveryFee);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        totalItemsCount,
        subtotal,
        deliveryFee,
        discount,
        promoCode,
        promoApplied,
        applyPromoCode,
        removePromoCode,
        finalTotal,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        quickViewProduct,
        setQuickViewProduct,
        completedOrder,
        setCompletedOrder,
        toasts,
        showToast,
        dismissToast
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
