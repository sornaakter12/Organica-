import React, { useState } from 'react';
import { Mail, CheckCircle2, Sparkles, AlertCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const Newsletter: React.FC = () => {
  const { showToast } = useCart();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setError('Please provide your email address.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please provide a valid email address.');
      return;
    }

    setError('');
    setSubscribed(true);
    showToast('Subscribed!', 'Use coupon ORGANIC10 for 10% off your first organic order.', 'success');
  };

  return (
    <section className="w-full py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[2rem] sm:rounded-[2.5rem] bg-[#315F39] text-[#F7FAEF] p-8 sm:p-12 lg:p-14 shadow-xl">
          {/* Subtle floral/leaf background glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#7EA778]/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-80 h-80 bg-[#E3F0D7]/10 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E3F0D7]/20 text-[#E3F0D7] text-xs font-bold uppercase tracking-wider mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              Join the Organica Circle
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              Get 10% Off Your First Harvest
            </h2>

            <p className="text-sm sm:text-base text-[#E3F0D7]/85 mb-8 leading-relaxed">
              Subscribe to receive weekly seasonal harvest alerts, farm recipes, and exclusive seasonal harvest discounts directly to your inbox.
            </p>

            {subscribed ? (
              <div className="bg-[#E3F0D7] text-[#315F39] p-4 sm:p-5 rounded-2xl flex flex-col sm:flex-row items-center justify-center gap-3 shadow-md animate-in zoom-in-95">
                <CheckCircle2 className="w-6 h-6 shrink-0" />
                <div className="text-center sm:text-left">
                  <p className="text-sm font-bold">You are subscribed to weekly updates!</p>
                  <p className="text-xs text-[#203D26]/80 mt-0.5">
                    Your exclusive code is <strong className="font-mono bg-white px-2 py-0.5 rounded text-[#315F39]">ORGANIC10</strong>. Enter it in your basket.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
                <div className="relative flex-1">
                  <Mail className="w-4 h-4 text-[#7EA778] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="email"
                    placeholder="Enter your email address..."
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (error) setError('');
                    }}
                    className="w-full pl-11 pr-4 py-3.5 rounded-full text-sm bg-white text-[#203D26] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E3F0D7]"
                  />
                </div>
                <button
                  type="submit"
                  className="px-8 py-3.5 rounded-full bg-[#7EA778] hover:bg-[#E3F0D7] hover:text-[#315F39] text-[#F7FAEF] font-bold text-xs tracking-wider uppercase transition-colors shadow-md cursor-pointer whitespace-nowrap"
                >
                  Subscribe
                </button>
              </form>
            )}

            {error && (
              <p className="text-xs text-amber-200 mt-2 flex items-center justify-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {error}
              </p>
            )}

            <p className="text-[11px] text-[#E3F0D7]/60 mt-4">
              Demo Newsletter • No spam, unsubscribe anytime with one click.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
