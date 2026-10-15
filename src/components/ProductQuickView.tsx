import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { X, Star, CheckCircle, ShoppingBag, Plus, Minus, ShieldCheck, Heart } from 'lucide-react';

export const ProductQuickView: React.FC = () => {
  const { quickViewProduct, setQuickViewProduct, addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [imageError, setImageError] = useState(false);

  if (!quickViewProduct) return null;

  const handleAdd = () => {
    addToCart(quickViewProduct, quantity);
    setQuickViewProduct(null);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div
        className="relative bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl border border-[#E3F0D7] animate-in zoom-in-95 duration-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#F7FAEF] hover:bg-[#E3F0D7] text-[#203D26] flex items-center justify-center transition-colors z-10"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Left: Product Image */}
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-[#F7FAEF] border border-[#E3F0D7]">
            <img
              src={imageError ? quickViewProduct.fallbackImage : quickViewProduct.image}
              alt={quickViewProduct.name}
              onError={() => setImageError(true)}
              className="w-full h-full object-cover object-center"
            />
            {quickViewProduct.discountBadge && (
              <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold bg-[#315F39] text-white shadow-md">
                {quickViewProduct.discountBadge}
              </span>
            )}
            <div className="absolute bottom-3 left-3 right-3 bg-white/90 backdrop-blur-xs px-3 py-1.5 rounded-xl text-xs text-[#203D26] font-medium flex items-center justify-between">
              <span>Origin: {quickViewProduct.origin}</span>
              <span className="text-[#315F39] font-bold">100% Organic</span>
            </div>
          </div>

          {/* Right: Product Details */}
          <div className="flex flex-col">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs uppercase font-bold tracking-wider text-[#7EA778] bg-[#E3F0D7]/60 px-2.5 py-0.5 rounded-full">
                {quickViewProduct.categoryLabel}
              </span>
              <div className="flex items-center gap-1 text-amber-500 font-semibold text-xs ml-auto">
                <Star className="w-4 h-4 fill-amber-400 stroke-amber-400" />
                <span>{quickViewProduct.rating}</span>
                <span className="text-gray-400">({quickViewProduct.reviewCount} customer reviews)</span>
              </div>
            </div>

            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#315F39] mb-2 leading-tight">
              {quickViewProduct.name}
            </h2>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-4">
              <span className="text-3xl font-bold text-[#315F39]">
                ৳{quickViewProduct.price}
              </span>
              {quickViewProduct.originalPrice && (
                <span className="text-sm text-gray-400 line-through">
                  ৳{quickViewProduct.originalPrice}
                </span>
              )}
              <span className="text-sm text-[#203D26]/70">
                per {quickViewProduct.unit}
              </span>
            </div>

            {/* Long Description */}
            <p className="text-sm text-[#203D26]/80 leading-relaxed mb-4">
              {quickViewProduct.description}
            </p>

            {/* Nutrition Breakdown */}
            <div className="bg-[#F7FAEF] rounded-2xl p-3.5 mb-4 border border-[#E3F0D7]">
              <p className="text-xs font-bold text-[#315F39] uppercase tracking-wider mb-2">
                Nutritional Profile (per portion)
              </p>
              <div className="grid grid-cols-4 gap-2 text-center text-xs">
                <div className="bg-white p-1.5 rounded-lg border border-[#E3F0D7]/60">
                  <span className="text-gray-400 text-[10px] block">Energy</span>
                  <span className="font-bold text-[#203D26]">{quickViewProduct.nutrition.calories}</span>
                </div>
                <div className="bg-white p-1.5 rounded-lg border border-[#E3F0D7]/60">
                  <span className="text-gray-400 text-[10px] block">Protein</span>
                  <span className="font-bold text-[#203D26]">{quickViewProduct.nutrition.protein}</span>
                </div>
                <div className="bg-white p-1.5 rounded-lg border border-[#E3F0D7]/60">
                  <span className="text-gray-400 text-[10px] block">Carbs</span>
                  <span className="font-bold text-[#203D26]">{quickViewProduct.nutrition.carbs}</span>
                </div>
                <div className="bg-white p-1.5 rounded-lg border border-[#E3F0D7]/60">
                  <span className="text-gray-400 text-[10px] block">Fiber</span>
                  <span className="font-bold text-[#203D26]">{quickViewProduct.nutrition.fiber}</span>
                </div>
              </div>
            </div>

            {/* Benefits list */}
            <div className="mb-6">
              <p className="text-xs font-bold text-[#203D26] uppercase tracking-wider mb-2">
                Why You'll Love It:
              </p>
              <ul className="space-y-1.5">
                {quickViewProduct.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-center gap-2 text-xs text-[#203D26]/85">
                    <CheckCircle className="w-4 h-4 text-[#7EA778] shrink-0" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Stepper and Add to Cart */}
            <div className="flex items-center gap-3 pt-3 border-t border-[#E3F0D7]">
              <div className="flex items-center border border-[#E3F0D7] bg-[#F7FAEF] rounded-xl px-2 py-1.5">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  disabled={quantity <= 1}
                  className="w-8 h-8 flex items-center justify-center text-[#203D26] hover:text-[#315F39] disabled:opacity-30"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-8 text-center text-sm font-bold text-[#203D26]">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => Math.min(50, q + 1))}
                  className="w-8 h-8 flex items-center justify-center text-[#203D26] hover:text-[#315F39]"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <button
                onClick={handleAdd}
                className="flex-1 py-3.5 px-6 rounded-xl bg-[#315F39] hover:bg-[#234529] text-[#F7FAEF] font-semibold text-sm tracking-wider uppercase transition-all duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg active:scale-98"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Basket • ৳{quickViewProduct.price * quantity}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
