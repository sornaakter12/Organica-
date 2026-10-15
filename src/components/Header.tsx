import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { ShoppingBag, Search, Menu, X, Leaf, PhoneCall, Sparkles } from 'lucide-react';
import { BUSINESS_INFO } from '../data/products';

interface HeaderProps {
  onSearchQueryChange?: (query: string) => void;
  searchQuery?: string;
}

export const Header: React.FC<HeaderProps> = ({ onSearchQueryChange, searchQuery = '' }) => {
  const { totalItemsCount, setIsCartOpen } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300">
      {/* Top Announcement Bar */}
      <div className="bg-[#315F39] text-[#F7FAEF] text-xs font-medium py-2 px-4 text-center tracking-wide">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <span className="hidden sm:inline-flex items-center gap-1.5 opacity-90">
            <Sparkles className="w-3.5 h-3.5 text-[#E3F0D7]" />
            100% Certified Organic • Harvested Daily
          </span>
          <span className="mx-auto sm:mx-0">
            🎉 Use code <span className="font-bold underline text-[#E3F0D7]">ORGANIC10</span> for 10% OFF • Free delivery in Dhaka over ৳1,000!
          </span>
          <a
            href={`tel:${BUSINESS_INFO.phone}`}
            className="hidden md:inline-flex items-center gap-1 hover:text-[#E3F0D7] transition-colors"
          >
            <PhoneCall className="w-3 h-3" />
            <span>{BUSINESS_INFO.phone}</span>
          </a>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div
        className={`w-full transition-all duration-200 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-[#E3F0D7]'
            : 'bg-[#F7FAEF] border-b border-[#E3F0D7]/60'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('home');
              }}
              className="flex items-center gap-2.5 group"
            >
              <div className="w-10 h-10 rounded-full bg-[#E3F0D7] flex items-center justify-center text-[#315F39] group-hover:scale-105 transition-transform duration-200">
                <Leaf className="w-5 h-5 fill-[#315F39]" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-2xl sm:text-3xl font-bold tracking-wider text-[#315F39]">
                  ORGANICA
                </span>
                <span className="text-[10px] uppercase tracking-widest text-[#7EA778] font-semibold -mt-1">
                  Pure & Healthy
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-8 text-[15px] font-medium text-[#203D26]">
              <button
                onClick={() => scrollToSection('home')}
                className="hover:text-[#315F39] transition-colors py-1 relative group cursor-pointer"
              >
                Home
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#315F39] transition-all duration-200 group-hover:w-full" />
              </button>
              <button
                onClick={() => scrollToSection('shop')}
                className="hover:text-[#315F39] transition-colors py-1 relative group cursor-pointer"
              >
                Shop
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#315F39] transition-all duration-200 group-hover:w-full" />
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className="hover:text-[#315F39] transition-colors py-1 relative group cursor-pointer"
              >
                About Us
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#315F39] transition-all duration-200 group-hover:w-full" />
              </button>
              <button
                onClick={() => scrollToSection('why-us')}
                className="hover:text-[#315F39] transition-colors py-1 relative group cursor-pointer"
              >
                Why Choose Us
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#315F39] transition-all duration-200 group-hover:w-full" />
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="hover:text-[#315F39] transition-colors py-1 relative group cursor-pointer"
              >
                Contact
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#315F39] transition-all duration-200 group-hover:w-full" />
              </button>
            </nav>

            {/* Right Action Icons */}
            <div className="flex items-center gap-3 sm:gap-4">
              {/* Search Toggle */}
              <div className="relative">
                <button
                  onClick={() => {
                    setIsSearchOpen(!isSearchOpen);
                    if (!isSearchOpen) {
                      setTimeout(() => {
                        const input = document.getElementById('header-search-input');
                        input?.focus();
                      }, 100);
                    }
                  }}
                  className="w-10 h-10 rounded-full flex items-center justify-center text-[#203D26] hover:bg-[#E3F0D7] hover:text-[#315F39] transition-colors"
                  aria-label="Search products"
                >
                  <Search className="w-5 h-5" />
                </button>

                {/* Search Popover */}
                {isSearchOpen && (
                  <div className="absolute right-0 top-12 w-72 sm:w-80 bg-white p-3 rounded-2xl shadow-xl border border-[#E3F0D7] animate-in fade-in zoom-in-95 duration-150 z-50">
                    <div className="relative flex items-center">
                      <Search className="w-4 h-4 text-[#7EA778] absolute left-3 pointer-events-none" />
                      <input
                        id="header-search-input"
                        type="text"
                        placeholder="Search broccoli, honey, avocado..."
                        value={searchQuery}
                        onChange={(e) => {
                          onSearchQueryChange?.(e.target.value);
                          const shopEl = document.getElementById('shop');
                          if (shopEl) {
                            shopEl.scrollIntoView({ behavior: 'smooth' });
                          }
                        }}
                        className="w-full pl-9 pr-8 py-2 text-sm bg-[#F7FAEF] rounded-xl border border-[#E3F0D7] focus:outline-none focus:ring-2 focus:ring-[#315F39] text-[#203D26]"
                      />
                      {searchQuery && (
                        <button
                          onClick={() => onSearchQueryChange?.('')}
                          className="absolute right-2.5 text-gray-400 hover:text-gray-600"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Cart Button */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative flex items-center gap-2 px-3 py-2 rounded-full bg-[#E3F0D7] hover:bg-[#7EA778]/25 text-[#315F39] transition-all duration-200 group"
                aria-label="View shopping basket"
              >
                <div className="relative">
                  <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  {totalItemsCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-[#315F39] text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-md animate-in zoom-in">
                      {totalItemsCount}
                    </span>
                  )}
                </div>
                <span className="hidden sm:inline font-semibold text-xs tracking-wide">
                  Basket
                </span>
              </button>

              {/* Mobile Menu Hamburger */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden w-10 h-10 rounded-full flex items-center justify-center text-[#203D26] hover:bg-[#E3F0D7] transition-colors"
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#F7FAEF] border-b border-[#E3F0D7] px-6 py-5 shadow-lg animate-in slide-in-from-top-2">
          <nav className="flex flex-col gap-4 text-base font-medium text-[#203D26]">
            <button
              onClick={() => scrollToSection('home')}
              className="text-left py-2 border-b border-[#E3F0D7]/60 hover:text-[#315F39]"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('shop')}
              className="text-left py-2 border-b border-[#E3F0D7]/60 hover:text-[#315F39]"
            >
              Shop All Products
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="text-left py-2 border-b border-[#E3F0D7]/60 hover:text-[#315F39]"
            >
              About Us
            </button>
            <button
              onClick={() => scrollToSection('why-us')}
              className="text-left py-2 border-b border-[#E3F0D7]/60 hover:text-[#315F39]"
            >
              Why Choose Us
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-left py-2 hover:text-[#315F39]"
            >
              Contact & Store Location
            </button>
            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsCartOpen(true);
                }}
                className="w-full py-3 bg-[#315F39] text-[#F7FAEF] rounded-xl font-semibold flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                View Basket ({totalItemsCount} items)
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
