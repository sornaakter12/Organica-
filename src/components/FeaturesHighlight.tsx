import React from 'react';
import { Sprout, Clock, ShieldCheck, HeartHandshake } from 'lucide-react';

export const FeaturesHighlight: React.FC = () => {
  const features = [
    {
      icon: Sprout,
      title: '100% Organic Soil',
      description: 'Cultivated in bio-active soils without synthetic chemical fertilizers or toxic sprays.'
    },
    {
      icon: Clock,
      title: 'Farm-to-Door in 24h',
      description: 'Harvested at dawn, packed carefully, and delivered swiftly to keep maximum natural nutrition.'
    },
    {
      icon: ShieldCheck,
      title: 'Lab-Tested Quality',
      description: 'Rigorous batch inspections ensuring zero harmful residues and pristine purity.'
    },
    {
      icon: HeartHandshake,
      title: 'Fair Farmer Support',
      description: 'We partner directly with family farms, guaranteeing fair prices and sustainable livelihoods.'
    }
  ];

  return (
    <section className="w-full py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="bg-white/80 hover:bg-white rounded-2xl p-6 border border-[#E3F0D7] shadow-xs hover:shadow-md transition-all duration-300 flex flex-col items-start"
              >
                <div className="w-12 h-12 rounded-xl bg-[#E3F0D7] text-[#315F39] flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-[#203D26] mb-1.5">{feature.title}</h3>
                <p className="text-xs sm:text-sm text-[#203D26]/75 leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
