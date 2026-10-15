import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { CheckoutFormData, OrderConfirmation } from '../types';
import {
  X,
  ShieldAlert,
  ShoppingBag,
  CreditCard,
  Truck,
  CheckCircle2,
  AlertCircle,
  Clock,
  MapPin,
  User,
  Phone,
  Mail,
  FileText
} from 'lucide-react';

export const CheckoutModal: React.FC = () => {
  const {
    items,
    isCheckoutOpen,
    setIsCheckoutOpen,
    subtotal,
    deliveryFee,
    discount,
    promoCode,
    finalTotal,
    clearCart,
    setCompletedOrder
  } = useCart();

  const [formData, setFormData] = useState<CheckoutFormData>({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    city: 'Dhaka',
    orderNotes: '',
    paymentMethod: 'cod'
  });

  const [errors, setErrors] = useState<Partial<Record<keyof CheckoutFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isCheckoutOpen) return null;

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof CheckoutFormData, string>> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Please enter your full name.';
    } else if (formData.fullName.trim().length < 3) {
      newErrors.fullName = 'Name must be at least 3 characters.';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Please provide your contact phone number.';
    } else if (!/^(\+?88)?01[3-9]\d{8}$/.test(formData.phone.replace(/[\s-]/g, ''))) {
      newErrors.phone = 'Please enter a valid 11-digit Bangladeshi mobile number (e.g. 01711234567).';
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please provide a valid email format or leave blank.';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Please specify your complete delivery address.';
    } else if (formData.address.trim().length < 10) {
      newErrors.address = 'Please provide house, road, and area details for smooth delivery.';
    }

    if (!formData.city.trim()) {
      newErrors.city = 'Please select or enter your city/district.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Simulate demo order placement delay
    setTimeout(() => {
      const orderRef = `ORG-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;
      
      // Calculate estimated delivery
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const deliveryEst = `${tomorrow.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric'
      })}, Between 9:00 AM - 1:00 PM`;

      const confirmation: OrderConfirmation = {
        orderId: orderRef,
        items: [...items],
        formData: { ...formData },
        subtotal,
        deliveryFee,
        discount,
        promoCode: promoCode || undefined,
        total: finalTotal,
        createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        estimatedDelivery: deliveryEst
      };

      // Set order confirmation and clear cart
      setCompletedOrder(confirmation);
      clearCart();
      setIsSubmitting(false);
      setIsCheckoutOpen(false);
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div
        className="relative bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-[#E3F0D7] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#E3F0D7] mb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#E3F0D7] text-[#315F39] flex items-center justify-center">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#315F39]">
                Checkout & Delivery
              </h2>
              <p className="text-xs text-[#203D26]/70">
                Fresh organic delivery straight to your doorstep
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsCheckoutOpen(false)}
            className="w-9 h-9 rounded-full bg-[#F7FAEF] hover:bg-[#E3F0D7] text-[#203D26] flex items-center justify-center transition-colors"
            aria-label="Close checkout"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Demo Notice Banner */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3.5 mb-6 flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
          <div className="text-xs text-amber-900 leading-relaxed">
            <strong className="font-bold">DEMO CHECKOUT MODE:</strong> No real payment or debit transaction will occur. This simulator verifies customer address formatting and generates a demo order confirmation for testing.
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Full Name */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#203D26] mb-1.5 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-[#7EA778]" />
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Tanvir Ahmed"
                value={formData.fullName}
                onChange={(e) => {
                  setFormData({ ...formData, fullName: e.target.value });
                  if (errors.fullName) setErrors({ ...errors, fullName: undefined });
                }}
                className={`w-full px-3.5 py-2.5 rounded-xl text-sm bg-[#F7FAEF] border ${
                  errors.fullName ? 'border-red-400 focus:ring-red-400' : 'border-[#E3F0D7] focus:ring-[#315F39]'
                } focus:outline-none focus:ring-2`}
              />
              {errors.fullName && (
                <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.fullName}
                </p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#203D26] mb-1.5 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-[#7EA778]" />
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                placeholder="e.g. 01711234567"
                value={formData.phone}
                onChange={(e) => {
                  setFormData({ ...formData, phone: e.target.value });
                  if (errors.phone) setErrors({ ...errors, phone: undefined });
                }}
                className={`w-full px-3.5 py-2.5 rounded-xl text-sm bg-[#F7FAEF] border ${
                  errors.phone ? 'border-red-400 focus:ring-red-400' : 'border-[#E3F0D7] focus:ring-[#315F39]'
                } focus:outline-none focus:ring-2`}
              />
              {errors.phone && (
                <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.phone}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Email (Optional) */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#203D26] mb-1.5 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-[#7EA778]" />
                Email Address <span className="text-gray-400 font-normal lowercase">(optional)</span>
              </label>
              <input
                type="email"
                placeholder="tanvir@example.com"
                value={formData.email}
                onChange={(e) => {
                  setFormData({ ...formData, email: e.target.value });
                  if (errors.email) setErrors({ ...errors, email: undefined });
                }}
                className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-[#F7FAEF] border border-[#E3F0D7] focus:outline-none focus:ring-2 focus:ring-[#315F39]"
              />
              {errors.email && (
                <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.email}
                </p>
              )}
            </div>

            {/* City / District */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#203D26] mb-1.5 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#7EA778]" />
                City / District <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-[#F7FAEF] border border-[#E3F0D7] focus:outline-none focus:ring-2 focus:ring-[#315F39]"
              >
                <option value="Dhaka">Dhaka (Same-day & Next-day)</option>
                <option value="Chittagong">Chittagong (24-48 Hours)</option>
                <option value="Sylhet">Sylhet (24-48 Hours)</option>
                <option value="Rajshahi">Rajshahi (24-48 Hours)</option>
                <option value="Khulna">Khulna (24-48 Hours)</option>
                <option value="Barisal">Barisal (48 Hours)</option>
                <option value="Rangpur">Rangpur (48 Hours)</option>
              </select>
            </div>
          </div>

          {/* Delivery Address */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#203D26] mb-1.5 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#7EA778]" />
              Delivery Street Address <span className="text-red-500">*</span>
            </label>
            <textarea
              rows={2}
              placeholder="Apartment / Flat, House number, Road number, Sector / Area"
              value={formData.address}
              onChange={(e) => {
                setFormData({ ...formData, address: e.target.value });
                if (errors.address) setErrors({ ...errors, address: undefined });
              }}
              className={`w-full px-3.5 py-2.5 rounded-xl text-sm bg-[#F7FAEF] border ${
                errors.address ? 'border-red-400 focus:ring-red-400' : 'border-[#E3F0D7] focus:ring-[#315F39]'
              } focus:outline-none focus:ring-2`}
            />
            {errors.address && (
              <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {errors.address}
              </p>
            )}
          </div>

          {/* Order Notes (Optional) */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#203D26] mb-1.5 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-[#7EA778]" />
              Special Delivery Instructions <span className="text-gray-400 font-normal lowercase">(optional)</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Please ring bell twice or leave at reception"
              value={formData.orderNotes}
              onChange={(e) => setFormData({ ...formData, orderNotes: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl text-xs bg-[#F7FAEF] border border-[#E3F0D7] focus:outline-none focus:ring-2 focus:ring-[#315F39]"
            />
          </div>

          {/* Payment Method Selector */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#203D26] mb-2">
              Payment Method
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label
                className={`flex items-center gap-3 p-3.5 rounded-2xl border cursor-pointer transition-all ${
                  formData.paymentMethod === 'cod'
                    ? 'border-[#315F39] bg-[#E3F0D7]/40 text-[#203D26] shadow-xs'
                    : 'border-[#E3F0D7] bg-[#F7FAEF] text-gray-600'
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cod"
                  checked={formData.paymentMethod === 'cod'}
                  onChange={() => setFormData({ ...formData, paymentMethod: 'cod' })}
                  className="accent-[#315F39]"
                />
                <div className="flex-1 text-xs">
                  <p className="font-bold text-[#203D26]">Cash on Delivery (COD)</p>
                  <p className="text-gray-500 text-[11px]">Pay when your fresh produce arrives</p>
                </div>
              </label>

              <label
                className={`flex items-center gap-3 p-3.5 rounded-2xl border cursor-pointer transition-all ${
                  formData.paymentMethod === 'bkash'
                    ? 'border-[#315F39] bg-[#E3F0D7]/40 text-[#203D26] shadow-xs'
                    : 'border-[#E3F0D7] bg-[#F7FAEF] text-gray-600'
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="bkash"
                  checked={formData.paymentMethod === 'bkash'}
                  onChange={() => setFormData({ ...formData, paymentMethod: 'bkash' })}
                  className="accent-[#315F39]"
                />
                <div className="flex-1 text-xs">
                  <p className="font-bold text-[#203D26]">bKash / Digital (Demo)</p>
                  <p className="text-gray-500 text-[11px]">Instant mobile wallet test checkout</p>
                </div>
              </label>
            </div>
          </div>

          {/* Order Summary Recap */}
          <div className="bg-[#F7FAEF] p-4 rounded-2xl border border-[#E3F0D7] space-y-1.5 text-xs">
            <div className="flex justify-between text-[#203D26]">
              <span>Items Total ({items.reduce((s, i) => s + i.quantity, 0)} items)</span>
              <span>৳{subtotal}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-[#315F39] font-medium">
                <span>Discount ({promoCode})</span>
                <span>-৳{discount}</span>
              </div>
            )}
            <div className="flex justify-between text-[#203D26]">
              <span>Delivery Fee ({formData.city})</span>
              <span>{deliveryFee === 0 ? 'FREE' : `৳${deliveryFee}`}</span>
            </div>
            <div className="flex justify-between text-base font-bold text-[#315F39] pt-2 border-t border-[#E3F0D7]">
              <span>Final Total</span>
              <span>৳{finalTotal}</span>
            </div>
          </div>

          {/* Submit Action */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 rounded-2xl bg-[#315F39] hover:bg-[#234529] text-[#F7FAEF] font-bold text-sm tracking-wider uppercase transition-all duration-200 flex items-center justify-center gap-2 shadow-lg disabled:opacity-60 cursor-pointer"
          >
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Confirming Demo Order...</span>
              </div>
            ) : (
              <span>CONFIRM DEMO ORDER (৳{finalTotal})</span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
