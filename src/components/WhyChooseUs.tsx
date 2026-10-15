import React from 'react';
import { ShieldCheck, Truck, Sparkles, Sprout, HeartPulse, Recycle } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const points = [
    {
      icon: Sparkles,
      title: 'Dawn Harvest Guarantee',
      description: 'Greens and tomatoes are harvested before sunrise so they reach you crisp, hydrated, and nutrient-dense.'
    },
    {
      icon: ShieldCheck,
      title: 'Certified Organic Roots',
      description: 'Strict organic auditing ensures soil free from heavy metals, synthetic NPK fertilizers, and glyphosates.'
    },
    {
      icon: Truck,
      title: 'Express Doorstep Delivery',
      description: 'Swift insulated delivery across Dhaka city with real-time route optimization to preserve botanical freshness.'
    },
    {
      icon: HeartPulse,
      title: 'Better Health for Loved Ones',
      description: 'Protect children and elders from accumulated chemical residues while enjoying pure, deeply satisfying flavors.'
    },
    {
      icon: Recycle,
      title: 'Biodegradable Packaging',
      description: 'We pack in unbleached paper bags, jute sacks, and recyclable glass jars rather than single-use petroleum plastics.'
    },
    {
      icon: Sprout,
      title: '100% Happiness Guarantee',
      description: 'If any produce arrives damaged or less than peak crispness, we replace it or refund you immediately—no hassle.'
    }
  ];

  return (
    <section id="why-us" className="w-full py-14 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase font-bold tracking-widest text-[#7EA778] mb-2 block">
            Quality You Can Taste & Trust
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#315F39] mb-4">
            Why Choose Organica
          </h2>
          <p className="text-sm sm:text-base text-[#203D26]/75">
            Every apple, honey droplet, and broccoli head undergoes rigorous care so you can cook with confidence.
          </p>
        </div>

        {/* 6 Grid items */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {points.map((pt, i) => {
            const Icon = pt.icon;
            return (
              <div
                key={i}
                className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E3F0D7] shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#E3F0D7] text-[#315F39] flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif text-lg font-bold text-[#203D26] mb-2">
                    {pt.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#203D26]/75 leading-relaxed">
                    {pt.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
