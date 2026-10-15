import React from 'react';
import { Star, Quote, CheckCircle2 } from 'lucide-react';

interface Testimonial {
  name: string;
  role: string;
  location: string;
  avatar: string;
  rating: number;
  comment: string;
  favoriteItem: string;
}

export const TestimonialsSection: React.FC = () => {
  const testimonials: Testimonial[] = [
    {
      name: 'Nusrat Jahan',
      role: 'Home Chef & Mother',
      location: 'Gulshan 2, Dhaka',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      rating: 5,
      comment: 'The broccoli and tomatoes taste completely different from supermarket ones—sweeter, crunchier, and real. My children actually ask for steamed greens now!',
      favoriteItem: 'Fresh Green Broccoli'
    },
    {
      name: 'Dr. Shahriar Rahman',
      role: 'Clinical Nutritionist',
      location: 'Banani, Dhaka',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      rating: 5,
      comment: 'I routinely advise patients with digestive inflammation to avoid pesticide-laden produce. Organica’s raw honey and rolled oats are exceptional in purity.',
      favoriteItem: 'Pure Natural Honey'
    },
    {
      name: 'Afsana Karim',
      role: 'Yoga Instructor',
      location: 'Dhanmondi, Dhaka',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
      rating: 5,
      comment: 'Their morning delivery in Dhaka is impeccably punctual. The avocados arrive perfectly ripened and without dark bruises. Will keep ordering every week.',
      favoriteItem: 'Organic Avocado'
    }
  ];

  return (
    <section className="w-full py-14 sm:py-20 bg-[#F7FAEF] border-t border-[#E3F0D7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase font-bold tracking-widest text-[#7EA778] mb-2 block">
            Sample Customer Stories
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#315F39] mb-4">
            Loved By Healthy Families
          </h2>
          <p className="text-sm sm:text-base text-[#203D26]/75">
            Discover what conscious food lovers say about their daily Organica deliveries.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {testimonials.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E3F0D7] shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                {/* Quote Icon & Stars */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 stroke-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-[#7EA778]/40" />
                </div>

                {/* Comment */}
                <p className="text-sm text-[#203D26]/85 italic leading-relaxed mb-6">
                  "{item.comment}"
                </p>
              </div>

              {/* User Bio */}
              <div className="pt-4 border-t border-[#E3F0D7]/60 flex items-center gap-3.5">
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="w-11 h-11 rounded-full object-cover border-2 border-[#E3F0D7]"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h4 className="font-serif text-sm font-bold text-[#203D26] truncate">
                      {item.name}
                    </h4>
                    <span title="Verified Buyer">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#315F39] shrink-0" />
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-500 truncate">{item.role} • {item.location}</p>
                  <p className="text-[10px] text-[#7EA778] font-semibold mt-0.5">
                    Favorite: {item.favoriteItem}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
