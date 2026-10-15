import React from 'react';
import { Leaf, Phone, Mail, MapPin, Heart } from 'lucide-react';
import { BUSINESS_INFO } from '../data/products';
import { ProductCategory } from '../types';

interface FooterProps {
  onSelectCategory: (category: ProductCategory) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectCategory }) => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCategoryClick = (category: ProductCategory) => {
    onSelectCategory(category);
    scrollTo('shop');
  };

  return (
    <footer className="w-full bg-[#234529] text-[#F7FAEF] pt-16 pb-12 border-t border-[#315F39]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#315F39]">
          {/* Brand info (2 cols on lg) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-[#E3F0D7] flex items-center justify-center text-[#315F39]">
                <Leaf className="w-5 h-5 fill-[#315F39]" />
              </div>
              <span className="font-serif text-2xl font-bold tracking-wider text-white">
                ORGANICA
              </span>
            </div>

            <p className="text-xs sm:text-sm text-[#F7FAEF]/75 leading-relaxed max-w-sm">
              Discover fresh, natural, and wholesome food for a healthier everyday lifestyle. 100% farm-traceable produce harvested daily from organic bio-soils.
            </p>

            <div className="pt-2 text-xs text-[#E3F0D7] space-y-1.5">
              <p className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#7EA778] shrink-0" />
                <span>Banani / Gulshan 2, Dhaka, Bangladesh</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#7EA778] shrink-0" />
                <span>Hotline: {BUSINESS_INFO.phone}</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#7EA778] shrink-0" />
                <span>{BUSINESS_INFO.email}</span>
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-serif text-base font-bold text-white tracking-wide">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-[#F7FAEF]/75">
              <li>
                <button
                  onClick={() => scrollTo('home')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('shop')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Shop Catalogue
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('about')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  About Us & Farms
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('why-us')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Why Choose Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('contact')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Contact & Store Hours
                </button>
              </li>
            </ul>
          </div>

          {/* Product Categories */}
          <div className="space-y-3">
            <h4 className="font-serif text-base font-bold text-white tracking-wide">
              Categories
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-[#F7FAEF]/75">
              <li>
                <button
                  onClick={() => handleCategoryClick('vegetables')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Fresh Vegetables
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryClick('fruits')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Organic Fruits
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryClick('nuts')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Nuts & Seeds
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryClick('natural-foods')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Natural Pantry & Honey
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryClick('all')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  All Products
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Care & Hours */}
          <div className="space-y-3">
            <h4 className="font-serif text-base font-bold text-white tracking-wide">
              Customer Support
            </h4>
            <p className="text-xs text-[#F7FAEF]/75 leading-relaxed">
              Our support team is available 7 days a week to assist with fresh produce deliveries and farm inquiries.
            </p>
            <div className="bg-[#315F39]/60 p-3 rounded-xl border border-[#315F39] text-xs text-[#E3F0D7]">
              <span className="block font-semibold">Standard Dhaka Delivery</span>
              <span className="text-[11px] text-[#F7FAEF]/70">7:30 AM – 9:30 PM Everyday</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Payment Badges */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#F7FAEF]/65">
          <p>© {new Date().getFullYear()} Organica Food Store. All rights reserved.</p>

          <div className="flex items-center gap-3 text-[11px]">
            <span className="bg-[#315F39] px-2.5 py-1 rounded-md text-white font-medium">
              Cash on Delivery
            </span>
            <span className="bg-[#315F39] px-2.5 py-1 rounded-md text-white font-medium">
              bKash / Nagad
            </span>
            <span className="bg-[#315F39] px-2.5 py-1 rounded-md text-white font-medium">
              100% Organic Guaranteed
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
