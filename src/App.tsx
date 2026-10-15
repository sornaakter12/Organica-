import React, { useState } from 'react';
import { CartProvider } from './context/CartContext';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { FeaturesHighlight } from './components/FeaturesHighlight';
import { PromotionalBanners } from './components/PromotionalBanners';
import { ProductCatalogue } from './components/ProductCatalogue';
import { AboutSection } from './components/AboutSection';
import { WhyChooseUs } from './components/WhyChooseUs';
import { TestimonialsSection } from './components/TestimonialsSection';
import { ContactSection } from './components/ContactSection';
import { Newsletter } from './components/Newsletter';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderSuccessModal } from './components/OrderSuccessModal';
import { ProductQuickView } from './components/ProductQuickView';
import { ToastContainer } from './components/Toast';
import { ProductCategory } from './types';

export default function App() {
  const [activeCategory, setActiveCategory] = useState<ProductCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col bg-[#F2F6ED] text-[#203D26] selection:bg-[#7EA778]/30">
        {/* Navigation Header */}
        <Header
          searchQuery={searchQuery}
          onSearchQueryChange={setSearchQuery}
        />

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col">
          {/* Hero Section inspired by reference image */}
          <HeroSection />

          {/* Trust Highlights */}
          <FeaturesHighlight />

          {/* Promotional Banners: Organic Vegetables & Natural Healthy */}
          <PromotionalBanners onSelectCategory={setActiveCategory} />

          {/* Product Catalogue with Filters and Sorting */}
          <ProductCatalogue
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
            searchQuery={searchQuery}
            onSearchQueryChange={setSearchQuery}
          />

          {/* About Us & Sustainable Farm Story */}
          <AboutSection />

          {/* Why Choose Us & Freshness Standards */}
          <WhyChooseUs />

          {/* Customer Reviews & Testimonials */}
          <TestimonialsSection />

          {/* Contact Details & Message Form */}
          <ContactSection />

          {/* Newsletter Signup with Discount Voucher */}
          <Newsletter />
        </main>

        {/* Footer */}
        <Footer onSelectCategory={setActiveCategory} />

        {/* Global Overlays & Modals */}
        <CartDrawer />
        <CheckoutModal />
        <OrderSuccessModal />
        <ProductQuickView />
        <ToastContainer />
      </div>
    </CartProvider>
  );
}
