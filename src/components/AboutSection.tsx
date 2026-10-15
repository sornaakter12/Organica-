import React from 'react';
import { Leaf, Award, Heart, ShieldCheck } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="w-full py-14 sm:py-20 bg-white/70 border-y border-[#E3F0D7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Image Mosaic */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-xl border-4 border-white aspect-4/3">
              <img
                src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80"
                alt="Organic farming landscape with fresh vegetables"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#203D26]/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <p className="text-xs font-bold uppercase tracking-widest text-[#E3F0D7]">
                  Certified Agro Land
                </p>
                <p className="font-serif text-lg font-bold">Rooted in Organic Living</p>
              </div>
            </div>

            {/* Floating Overlap Card */}
            <div className="hidden sm:flex absolute -bottom-6 -right-4 bg-[#E3F0D7] p-4 rounded-2xl shadow-xl border border-[#CDE4BF] items-center gap-3 max-w-xs">
              <div className="w-10 h-10 rounded-full bg-[#315F39] text-white flex items-center justify-center shrink-0">
                <Award className="w-5 h-5" />
              </div>
              <div className="text-xs">
                <p className="font-bold text-[#315F39]">100% Traceable Harvest</p>
                <p className="text-[#203D26]/80 text-[11px]">Direct from 40+ certified organic partner farms.</p>
              </div>
            </div>
          </div>

          {/* Right Column: Story & Principles */}
          <div className="lg:col-span-7 flex flex-col items-start">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E3F0D7] text-[#315F39] text-xs font-bold uppercase tracking-wider mb-3">
              <Leaf className="w-3.5 h-3.5" />
              Our Natural Mission
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#315F39] leading-tight mb-4">
              Pure Food, Straight From Honest Soil
            </h2>

            <p className="text-base text-[#203D26]/85 leading-relaxed mb-4">
              Organica was established with a single unwavering promise: to deliver food exactly as nature intended — wholesome, nutrient-rich, and free from synthetic preservatives, chemical ripening agents, and harmful pesticide sprays.
            </p>

            <p className="text-sm text-[#203D26]/75 leading-relaxed mb-8">
              We work directly with dedicated bio-farmers across Bangladesh and selective international organic grower cooperatives. By eliminating conventional middle-market warehouses, your greens and pantry items move from harvest ground to your dining table within 24 hours.
            </p>

            {/* 3 Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
              <div className="bg-[#F7FAEF] p-4 rounded-2xl border border-[#E3F0D7]">
                <h4 className="font-serif font-bold text-sm text-[#315F39] mb-1">0% Artificial Sprays</h4>
                <p className="text-xs text-[#203D26]/70 leading-normal">
                  Zero toxic pest sprays or systemic herbicides in our soils.
                </p>
              </div>

              <div className="bg-[#F7FAEF] p-4 rounded-2xl border border-[#E3F0D7]">
                <h4 className="font-serif font-bold text-sm text-[#315F39] mb-1">Eco Cold Chain</h4>
                <p className="text-xs text-[#203D26]/70 leading-normal">
                  Chilled eco-friendly transit preserves enzymes and vitamins.
                </p>
              </div>

              <div className="bg-[#F7FAEF] p-4 rounded-2xl border border-[#E3F0D7]">
                <h4 className="font-serif font-bold text-sm text-[#315F39] mb-1">Fair Trade Pride</h4>
                <p className="text-xs text-[#203D26]/70 leading-normal">
                  30% higher compensation paid directly to grower families.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
