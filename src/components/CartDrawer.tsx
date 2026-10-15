import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { BUSINESS_INFO } from '../data/products';
import {
  X,
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  ArrowRight,
  Sparkles,
  Tag,
  Truck,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    items,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    clearCart,
    subtotal,
    deliveryFee,
    discount,
    promoCode,
    promoApplied,
    applyPromoCode,
    removePromoCode,
    finalTotal,
    setIsCheckoutOpen
  } = useCart();

  const [inputCoupon, setInputCoupon] = useState('');
  const [couponError, setCouponError] = useState('');

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCoupon.trim()) return;
    const res = applyPromoCode(inputCoupon);
    if (!res.success) {
      setCouponError(res.message);
    } else {
      setCouponError('');
      setInputCoupon('');
    }
  };

  const amountToFreeShipping = Math.max(0, BUSINESS_INFO.freeDeliveryThreshold - subtotal);
  const freeShippingProgress = Math.min(100, (subtotal / BUSINESS_INFO.freeDeliveryThreshold) * 100);

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div
        className="w-full max-w-md bg-[#F7FAEF] h-full shadow-2xl flex flex-col justify-between border-l border-[#E3F0D7] animate-in slide-in-from-right duration-300 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-5 sm:p-6 bg-white border-b border-[#E3F0D7] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-full bg-[#E3F0D7] text-[#315F39] flex items-center justify-center">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif text-xl font-bold text-[#315F39]">Your Organic Basket</h2>
              <p className="text-xs text-[#203D26]/70">
                {items.length} {items.length === 1 ? 'item' : 'items'} selected
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsCartOpen(false)}
            className="w-9 h-9 rounded-full bg-[#F7FAEF] hover:bg-[#E3F0D7] text-[#203D26] flex items-center justify-center transition-colors"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Meter */}
        {items.length > 0 && (
          <div className="bg-[#E3F0D7]/60 px-5 py-3 border-b border-[#CDE4BF]">
            <div className="flex items-center justify-between text-xs font-semibold text-[#315F39] mb-1.5">
              <span className="flex items-center gap-1.5">
                <Truck className="w-4 h-4" />
                {amountToFreeShipping === 0
                  ? '🎉 You unlocked FREE Dhaka Delivery!'
                  : `Add ৳${amountToFreeShipping} more for FREE delivery`}
              </span>
              <span>{Math.round(freeShippingProgress)}%</span>
            </div>
            <div className="w-full h-2 bg-white rounded-full overflow-hidden">
              <div
                className="h-full bg-[#315F39] transition-all duration-500 rounded-full"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>
        )}

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6">
              <div className="w-20 h-20 rounded-full bg-[#E3F0D7] text-[#315F39] flex items-center justify-center mb-4">
                <ShoppingBag className="w-10 h-10" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#315F39] mb-2">
                Your basket is empty
              </h3>
              <p className="text-sm text-[#203D26]/70 mb-6 max-w-xs">
                Looks like you haven't added any fresh organic harvest yet. Explore our fresh vegetables, fruits and pantry picks!
              </p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="px-8 py-3.5 rounded-full bg-[#315F39] text-[#F7FAEF] font-semibold text-xs tracking-wider uppercase shadow-md hover:bg-[#234529] transition-all"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            items.map(({ product, quantity }) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl p-3.5 border border-[#E3F0D7] shadow-xs flex items-center gap-3.5 transition-all hover:shadow-sm"
              >
                {/* Thumbnail */}
                <div className="w-16 h-16 rounded-xl overflow-hidden bg-[#F7FAEF] shrink-0 border border-[#E3F0D7]">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover object-center"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h4 className="font-serif text-sm font-bold text-[#203D26] truncate">
                    {product.name}
                  </h4>
                  <p className="text-[11px] text-[#203D26]/60">
                    ৳{product.price} / {product.unit}
                  </p>
                  
                  {/* Stepper */}
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex items-center border border-[#E3F0D7] bg-[#F7FAEF] rounded-lg px-1 py-0.5">
                      <button
                        onClick={() => updateQuantity(product.id, quantity - 1)}
                        className="w-5 h-5 flex items-center justify-center text-[#203D26] hover:text-[#315F39]"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-6 text-center text-xs font-bold text-[#203D26]">
                        {quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(product.id, quantity + 1)}
                        className="w-5 h-5 flex items-center justify-center text-[#203D26] hover:text-[#315F39]"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(product.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors p-1"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Line Price */}
                <div className="text-right">
                  <span className="text-sm font-bold text-[#315F39]">
                    ৳{product.price * quantity}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer with Totals and Checkout */}
        {items.length > 0 && (
          <div className="p-5 sm:p-6 bg-white border-t border-[#E3F0D7] space-y-4 shadow-lg">
            {/* Promo Code Input */}
            <div>
              {promoApplied ? (
                <div className="flex items-center justify-between bg-[#E3F0D7] text-[#315F39] px-3 py-2 rounded-xl text-xs font-medium border border-[#CDE4BF]">
                  <span className="flex items-center gap-1.5 font-bold">
                    <CheckCircle2 className="w-4 h-4 text-[#315F39]" />
                    Coupon {promoCode} applied!
                  </span>
                  <button
                    onClick={removePromoCode}
                    className="text-xs text-red-600 hover:underline font-semibold"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-3.5 h-3.5 text-[#7EA778] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Coupon: ORGANIC10"
                      value={inputCoupon}
                      onChange={(e) => {
                        setInputCoupon(e.target.value);
                        setCouponError('');
                      }}
                      className="w-full pl-8 pr-3 py-2 text-xs bg-[#F7FAEF] rounded-xl border border-[#E3F0D7] uppercase tracking-wider font-semibold focus:outline-none focus:ring-1 focus:ring-[#315F39]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#7EA778] hover:bg-[#315F39] text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-colors"
                  >
                    Apply
                  </button>
                </form>
              )}
              {couponError && (
                <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {couponError}
                </p>
              )}
            </div>

            {/* Calculations Breakdown */}
            <div className="space-y-1.5 text-xs text-[#203D26]/80 pt-1">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-[#203D26]">৳{subtotal}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-[#315F39] font-medium">
                  <span>Discount ({promoCode})</span>
                  <span>-৳{discount}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Estimated Delivery</span>
                <span>
                  {deliveryFee === 0 ? (
                    <span className="text-[#315F39] font-bold">FREE</span>
                  ) : (
                    <span className="font-semibold text-[#203D26]">৳{deliveryFee}</span>
                  )}
                </span>
              </div>
              <div className="flex justify-between text-base font-bold text-[#315F39] pt-2 border-t border-[#E3F0D7]">
                <span>Total Amount</span>
                <span>৳{finalTotal}</span>
              </div>
            </div>

            {/* Checkout Action */}
            <div className="flex flex-col gap-2">
              <button
                onClick={handleProceedToCheckout}
                className="w-full py-4 rounded-xl bg-[#315F39] hover:bg-[#234529] text-[#F7FAEF] font-bold text-sm tracking-wider uppercase transition-all duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg active:scale-98"
              >
                <span>PROCEED TO CHECKOUT</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-between pt-1">
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="text-xs text-[#7EA778] hover:underline font-semibold"
                >
                  Continue Shopping
                </button>
                <button
                  onClick={clearCart}
                  className="text-xs text-gray-400 hover:text-red-500 transition-colors"
                >
                  Clear basket
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
