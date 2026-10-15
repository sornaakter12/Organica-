import React from 'react';
import { ArrowRight } from 'lucide-react';
import { ProductCategory } from '../types';

interface PromotionalBannersProps {
  onSelectCategory: (category: ProductCategory) => void;
}

export const PromotionalBanners: React.FC<PromotionalBannersProps> = ({ onSelectCategory }) => {
  const handleBannerAction = (category: ProductCategory) => {
    onSelectCategory(category);
    const shopEl = document.getElementById('shop');
    if (shopEl) {
      shopEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="w-full py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {/* Banner A: Organic Vegetables */}
          <div className="group relative overflow-hidden rounded-[2rem] bg-[#E3F0D7] p-8 sm:p-10 border border-[#CDE4BF] shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between min-h-[280px]">
            {/* Background Image on Right Side */}
            <div className="absolute right-0 bottom-0 top-0 w-1/2 sm:w-5/12 overflow-hidden pointer-events-none">
              <img
                src="https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=700&q=80"
                alt="Organic vegetables and avocado"
                className="w-full h-full object-cover object-center opacity-85 group-hover:scale-105 transition-transform duration-500 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#E3F0D7] via-[#E3F0D7]/70 to-transparent" />
            </div>

            {/* Left Content */}
            <div className="relative z-10 max-w-[65%]">
              <span className="text-xs uppercase font-bold tracking-widest text-[#7EA778] mb-2 block">
                Fresh Harvest
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#315F39] leading-tight mb-2">
                Organic Vegetables
              </h3>
              <p className="text-sm sm:text-base text-[#203D26]/80 font-normal mb-6 leading-relaxed">
                Fresh picks for your healthy lifestyle.
              </p>
            </div>

            <div className="relative z-10 pt-2">
              <button
                onClick={() => handleBannerAction('vegetables')}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#315F39] hover:bg-[#234529] text-[#F7FAEF] font-semibold text-xs sm:text-sm tracking-wider uppercase transition-all duration-200 shadow-sm cursor-pointer group-hover:gap-3"
              >
                <span>EXPLORE NOW</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Banner B: Natural & Healthy */}
          <div className="group relative overflow-hidden rounded-[2rem] bg-[#E8F3DE] p-8 sm:p-10 border border-[#CDE4BF] shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between min-h-[280px]">
            {/* Background Image on Right Side */}
            <div className="absolute right-0 bottom-0 top-0 w-1/2 sm:w-5/12 overflow-hidden pointer-events-none">
              <img
                src="https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=700&q=80"
                alt="Natural grains, oats and nuts"
                className="w-full h-full object-cover object-center opacity-85 group-hover:scale-105 transition-transform duration-500 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#E8F3DE] via-[#E8F3DE]/70 to-transparent" />
            </div>

            {/* Left Content */}
            <div className="relative z-10 max-w-[65%]">
              <span className="text-xs uppercase font-bold tracking-widest text-[#7EA778] mb-2 block">
                Wholesome Pantry
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#315F39] leading-tight mb-2">
                Natural & Healthy
              </h3>
              <p className="text-sm sm:text-base text-[#203D26]/80 font-normal mb-6 leading-relaxed">
                Good food, naturally better.
              </p>
            </div>

            <div className="relative z-10 pt-2">
              <button
                onClick={() => handleBannerAction('natural-foods')}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#315F39] hover:bg-[#234529] text-[#F7FAEF] font-semibold text-xs sm:text-sm tracking-wider uppercase transition-all duration-200 shadow-sm cursor-pointer group-hover:gap-3"
              >
                <span>DISCOVER MORE</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
