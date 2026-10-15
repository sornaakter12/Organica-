import React from 'react';
import { useCart } from '../context/CartContext';
import {
  CheckCircle,
  Package,
  Calendar,
  MapPin,
  Phone,
  FileCheck,
  ShoppingBag,
  ExternalLink,
  Printer
} from 'lucide-react';

export const OrderSuccessModal: React.FC = () => {
  const { completedOrder, setCompletedOrder } = useCart();

  if (!completedOrder) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div
        className="relative bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-[#E3F0D7] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Success Icon */}
        <div className="flex flex-col items-center text-center mb-6">
          <div className="w-16 h-16 rounded-full bg-[#E3F0D7] text-[#315F39] flex items-center justify-center mb-3 ring-8 ring-[#E3F0D7]/40 animate-in zoom-in-50 duration-300">
            <CheckCircle className="w-10 h-10" />
          </div>
          <span className="text-xs uppercase font-bold tracking-widest text-[#7EA778] mb-1">
            Demo Order Confirmed
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#315F39]">
            Thank You, {completedOrder.formData.fullName}!
          </h2>
          <p className="text-xs sm:text-sm text-[#203D26]/75 mt-1 max-w-sm">
            Your demo order reference is{' '}
            <strong className="text-[#315F39] bg-[#E3F0D7] px-2 py-0.5 rounded-md font-mono">
              {completedOrder.orderId}
            </strong>
          </p>
        </div>

        {/* Demo Notification Label */}
        <div className="bg-[#F7FAEF] border border-[#E3F0D7] rounded-2xl p-3 text-xs text-[#203D26]/80 text-center mb-6">
          🌾 <strong className="text-[#315F39]">Note:</strong> This is a completed simulated demo order. In a live store, an SMS/email confirmation and live driver tracking link would now be sent to <span className="font-semibold text-[#203D26]">{completedOrder.formData.phone}</span>.
        </div>

        {/* Order Details Grid */}
        <div className="space-y-4 mb-6">
          <div className="bg-[#F7FAEF] rounded-2xl p-4 border border-[#E3F0D7] space-y-2.5 text-xs">
            <div className="flex items-center gap-2 text-[#203D26]">
              <Calendar className="w-4 h-4 text-[#7EA778] shrink-0" />
              <span>
                Estimated Delivery:{' '}
                <strong className="text-[#315F39]">{completedOrder.estimatedDelivery}</strong>
              </span>
            </div>

            <div className="flex items-center gap-2 text-[#203D26]">
              <MapPin className="w-4 h-4 text-[#7EA778] shrink-0" />
              <span>
                Destination:{' '}
                <strong>
                  {completedOrder.formData.address}, {completedOrder.formData.city}
                </strong>
              </span>
            </div>

            <div className="flex items-center gap-2 text-[#203D26]">
              <Phone className="w-4 h-4 text-[#7EA778] shrink-0" />
              <span>
                Recipient Phone: <strong>{completedOrder.formData.phone}</strong>
              </span>
            </div>

            <div className="flex items-center gap-2 text-[#203D26]">
              <Package className="w-4 h-4 text-[#7EA778] shrink-0" />
              <span>
                Payment:{' '}
                <strong className="capitalize">
                  {completedOrder.formData.paymentMethod === 'cod'
                    ? 'Cash on Delivery (COD)'
                    : 'bKash / Mobile Wallet (Demo)'}
                </strong>
              </span>
            </div>
          </div>

          {/* Itemized List */}
          <div className="border border-[#E3F0D7] rounded-2xl p-4 max-h-48 overflow-y-auto space-y-2 text-xs">
            <p className="font-bold text-[#315F39] uppercase tracking-wider text-[11px] mb-2">
              Order Items ({completedOrder.items.length})
            </p>
            {completedOrder.items.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between py-1 border-b border-[#E3F0D7]/50 last:border-0">
                <span className="text-[#203D26]">
                  {item.quantity}x {item.product.name} ({item.product.unit})
                </span>
                <span className="font-semibold text-[#315F39]">
                  ৳{item.product.price * item.quantity}
                </span>
              </div>
            ))}

            <div className="pt-2 border-t border-[#E3F0D7] space-y-1 font-medium">
              <div className="flex justify-between text-[#203D26]/70">
                <span>Subtotal</span>
                <span>৳{completedOrder.subtotal}</span>
              </div>
              {completedOrder.discount > 0 && (
                <div className="flex justify-between text-[#315F39]">
                  <span>Discount</span>
                  <span>-৳{completedOrder.discount}</span>
                </div>
              )}
              <div className="flex justify-between text-[#203D26]/70">
                <span>Delivery</span>
                <span>{completedOrder.deliveryFee === 0 ? 'FREE' : `৳${completedOrder.deliveryFee}`}</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-[#315F39] pt-1">
                <span>Total</span>
                <span>৳{completedOrder.total}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => setCompletedOrder(null)}
            className="flex-1 py-3.5 px-6 rounded-2xl bg-[#315F39] hover:bg-[#234529] text-white font-semibold text-xs tracking-wider uppercase transition-colors shadow-md text-center"
          >
            Continue Shopping
          </button>
          <button
            onClick={handlePrint}
            className="px-5 py-3.5 rounded-2xl bg-[#F7FAEF] hover:bg-[#E3F0D7] text-[#315F39] font-medium text-xs tracking-wider uppercase transition-colors border border-[#E3F0D7] flex items-center justify-center gap-2"
          >
            <Printer className="w-4 h-4" />
            <span>Print Receipt</span>
          </button>
        </div>
      </div>
    </div>
  );
};
