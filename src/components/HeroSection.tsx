import React from 'react';
import { ArrowRight, ShieldCheck, Truck, Sparkles, CheckCircle2 } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const scrollToShop = () => {
    const shopEl = document.getElementById('shop');
    if (shopEl) {
      shopEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="w-full pt-4 pb-10 sm:pb-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Pale Mint Hero Container */}
        <div className="relative overflow-hidden rounded-[2rem] sm:rounded-[2.5rem] bg-[#E3F0D7] p-8 sm:p-12 lg:p-16 border border-[#CDE4BF] shadow-sm">
          {/* Subtle Decorative Background Rings */}
          <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-[#D4E8C5]/50 blur-2xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-[#C7E2B5]/40 blur-3xl pointer-events-none" />

          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            {/* Left Content Column (7 cols on lg) */}
            <div className="lg:col-span-7 flex flex-col items-start z-10">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 border border-[#7EA778]/40 shadow-xs mb-5">
                <Sparkles className="w-4 h-4 text-[#315F39]" />
                <span className="text-xs font-bold uppercase tracking-wider text-[#315F39]">
                  100% Certified Organic Harvest
                </span>
              </div>

              {/* Main Heading */}
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#315F39] leading-[1.15] mb-5">
                Healthy Organic Food
              </h1>

              {/* Description */}
              <p className="text-base sm:text-lg lg:text-xl text-[#203D26]/85 font-normal leading-relaxed max-w-xl mb-8">
                Discover fresh, natural and wholesome food for a healthier everyday lifestyle.
              </p>

              {/* Primary Call to Action */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mb-10">
                <button
                  onClick={scrollToShop}
                  className="px-8 py-4 rounded-full bg-[#315F39] hover:bg-[#234529] text-[#F7FAEF] font-semibold text-sm sm:text-base tracking-wider uppercase transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center justify-center gap-3 cursor-pointer group"
                >
                  <span>SHOP NOW</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>

                <a
                  href="#about"
                  className="px-6 py-4 rounded-full bg-white/70 hover:bg-white text-[#315F39] font-medium text-sm sm:text-base text-center transition-all duration-200 border border-[#7EA778]/30"
                >
                  Our Farm Story
                </a>
              </div>

              {/* Quality Highlights row */}
              <div className="grid grid-cols-3 gap-3 sm:gap-6 pt-6 border-t border-[#7EA778]/25 w-full">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-[#315F39]/10 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-4 h-4 text-[#315F39]" />
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-[#203D26]">Zero Chemicals</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-[#315F39]/10 flex items-center justify-center shrink-0">
                    <Truck className="w-4 h-4 text-[#315F39]" />
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-[#203D26]">Daily Fresh Pick</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-[#315F39]/10 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-4 h-4 text-[#315F39]" />
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-[#203D26]">Eco Guarantee</span>
                </div>
              </div>
            </div>

            {/* Right Visual Food Photography Composition (5 cols on lg) */}
            <div className="lg:col-span-5 relative flex justify-center items-center">
              {/* Organic circular pedestal backdrop */}
              <div className="relative w-full max-w-[420px] aspect-square rounded-full bg-gradient-to-tr from-[#7EA778]/30 via-white/50 to-[#C7E2B5]/40 p-4 shadow-inner flex items-center justify-center">
                
                {/* Main Hero Food Arrangement Image */}
                <div className="relative w-full h-full rounded-full overflow-hidden shadow-2xl border-4 border-white/90">
                  <img
                    src="https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=900&q=85"
                    alt="Fresh organic green vegetables, broccoli, avocado, spinach and nuts"
                    className="w-full h-full object-cover object-center scale-105 hover:scale-110 transition-transform duration-700 ease-out"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Floating Badge 1: Fresh Pick / 100% Organic */}
                <div className="absolute -top-3 -right-2 sm:right-0 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-xl border border-[#7EA778]/30 flex items-center gap-2.5 animate-bounce-subtle">
                  <div className="w-3 h-3 rounded-full bg-[#315F39] animate-ping" />
                  <div>
                    <p className="text-[10px] uppercase font-bold tracking-wider text-[#7EA778]">Harvested Daily</p>
                    <p className="text-xs font-bold text-[#203D26]">Pure & pesticide-free</p>
                  </div>
                </div>

                {/* Floating Badge 2: Organic Certified Seal */}
                <div className="absolute -bottom-3 -left-3 sm:left-0 bg-[#315F39] text-[#F7FAEF] px-4 py-3 rounded-2xl shadow-xl flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#E3F0D7] text-[#315F39] flex items-center justify-center font-bold text-xs">
                    100%
                  </div>
                  <div className="text-left">
                    <p className="text-[11px] font-semibold text-[#E3F0D7] uppercase tracking-wider">Certified Organic</p>
                    <p className="text-xs font-bold">Natural Goodness</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
