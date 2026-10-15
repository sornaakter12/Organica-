import React, { useState } from 'react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { Star, Plus, Minus, ShoppingBag, Eye, Check } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, setQuickViewProduct } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [imageError, setImageError] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const handleIncrement = (e: React.MouseEvent) => {
    e.stopPropagation();
    setQuantity((prev) => Math.min(prev + 1, 50));
  };

  const handleDecrement = (e: React.MouseEvent) => {
    e.stopPropagation();
    setQuantity((prev) => Math.max(prev - 1, 1));
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsAdding(true);
    addToCart(product, quantity);
    setTimeout(() => {
      setIsAdding(false);
    }, 700);
  };

  return (
    <div
      onClick={() => setQuickViewProduct(product)}
      className="group bg-white rounded-3xl p-4 sm:p-5 border border-[#E3F0D7] hover:border-[#7EA778]/50 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer relative"
    >
      <div>
        {/* Image Container with Badges */}
        <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-[#F7FAEF] mb-4">
          <img
            src={imageError ? product.fallbackImage : product.image}
            alt={product.name}
            onError={() => setImageError(true)}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
            loading="lazy"
          />

          {/* Badges Overlay */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
            {product.discountBadge && (
              <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#315F39] text-white shadow-xs">
                {product.discountBadge}
              </span>
            )}
            {product.badge && !product.discountBadge && (
              <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[#E3F0D7] text-[#315F39] shadow-xs">
                {product.badge}
              </span>
            )}
          </div>

          {/* Quick View Hover Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setQuickViewProduct(product);
            }}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-[#203D26] shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            title="Quick preview"
            aria-label={`Preview ${product.name}`}
          >
            <Eye className="w-4 h-4 text-[#315F39]" />
          </button>

          {/* Origin pill */}
          <div className="absolute bottom-2.5 left-2.5 right-2.5">
            <span className="inline-block text-[10px] font-medium tracking-wide bg-white/90 backdrop-blur-xs text-[#203D26]/80 px-2 py-0.5 rounded-md shadow-xs">
              📍 {product.origin}
            </span>
          </div>
        </div>

        {/* Rating and category */}
        <div className="flex items-center justify-between text-xs mb-2">
          <span className="text-[#7EA778] font-semibold uppercase tracking-wider text-[11px]">
            {product.categoryLabel}
          </span>
          <div className="flex items-center gap-1 text-amber-500 font-semibold">
            <Star className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400" />
            <span className="text-[#203D26] font-medium text-xs">
              {product.rating} <span className="text-gray-400 text-[10px]">({product.reviewCount})</span>
            </span>
          </div>
        </div>

        {/* Product Title */}
        <h3 className="font-serif text-lg font-bold text-[#203D26] group-hover:text-[#315F39] transition-colors leading-snug line-clamp-1 mb-1">
          {product.name}
        </h3>

        {/* Unit and short description */}
        <p className="text-xs text-[#203D26]/70 line-clamp-2 leading-relaxed mb-3">
          {product.shortDescription}
        </p>
      </div>

      <div>
        {/* Price and Unit */}
        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-xl sm:text-2xl font-bold text-[#315F39] font-sans">
            ৳{product.price}
          </span>
          {product.originalPrice && (
            <span className="text-xs text-gray-400 line-through">
              ৳{product.originalPrice}
            </span>
          )}
          <span className="text-xs text-[#203D26]/60 font-medium ml-auto">
            per {product.unit}
          </span>
        </div>

        {/* Bottom Actions: Quantity Selector & Add to Basket Button */}
        <div className="flex items-center gap-2 pt-2 border-t border-[#E3F0D7]/60">
          {/* Stepper */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="flex items-center border border-[#E3F0D7] bg-[#F7FAEF] rounded-xl px-1.5 py-1"
          >
            <button
              onClick={handleDecrement}
              disabled={quantity <= 1}
              className="w-7 h-7 flex items-center justify-center text-[#203D26] hover:text-[#315F39] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              aria-label="Decrease quantity"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="w-6 text-center text-xs font-bold text-[#203D26]">
              {quantity}
            </span>
            <button
              onClick={handleIncrement}
              className="w-7 h-7 flex items-center justify-center text-[#203D26] hover:text-[#315F39] transition-colors"
              aria-label="Increase quantity"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Add Button */}
          <button
            onClick={handleAddToCart}
            className={`flex-1 py-2.5 px-3 rounded-xl font-semibold text-xs tracking-wider uppercase transition-all duration-200 flex items-center justify-center gap-1.5 shadow-xs ${
              isAdding
                ? 'bg-[#7EA778] text-white scale-95'
                : 'bg-[#315F39] hover:bg-[#234529] text-[#F7FAEF] active:scale-95'
            }`}
          >
            {isAdding ? (
              <>
                <Check className="w-3.5 h-3.5 stroke-[3]" />
                <span>ADDED</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>ADD TO CART</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
