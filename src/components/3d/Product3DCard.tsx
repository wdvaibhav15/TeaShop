import React, { useState, useRef } from 'react';
import { Heart, ShoppingBag, Eye, Star, Rotate3D, Check, ShieldCheck, Zap } from 'lucide-react';
import { Product } from '../../types';
import { useApp } from '../../context/AppContext';

interface Product3DCardProps {
  product: Product;
  onNavigateToDetail?: (product: Product) => void;
  featuredMode?: boolean;
}

export const Product3DCard: React.FC<Product3DCardProps> = ({
  product,
  onNavigateToDetail,
  featuredMode = false
}) => {
  const {
    formatPrice,
    addToCart,
    toggleWishlist,
    isInWishlist,
    setQuickViewProduct
  } = useApp();

  const [isFlipped, setIsFlipped] = useState(false);
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0]?.name);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // 3D Parallax Tilt state
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [tiltStyle, setTiltStyle] = useState({
    transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
    transition: 'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)'
  });
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || isFlipped) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -12; // Max 12 deg tilt
    const rotateY = ((x - centerX) / centerX) * 12;

    setTiltStyle({
      transform: `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.025, 1.025, 1.025)`,
      transition: 'transform 0.08s ease-out'
    });

    setGlarePos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.22
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTiltStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
      transition: 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)'
    });
    setGlarePos(prev => ({ ...prev, opacity: 0 }));
  };

  const handleColorClick = (name: string, imgIdx?: number, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setSelectedColor(name);
    if (imgIdx !== undefined && product.images?.[imgIdx]) {
      setActiveImageIndex(imgIdx);
    }
  };

  const isFavorite = isInWishlist(product.id);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={tiltStyle}
      className={`group relative rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-xl transition-shadow duration-300 preserve-3d select-none flex flex-col justify-between overflow-hidden ${
        featuredMode ? 'ring-1 ring-indigo-500/20' : ''
      }`}
    >
      {/* Glare Sheen layer */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl z-30 transition-opacity duration-300 mix-blend-overlay"
        style={{
          opacity: glarePos.opacity,
          background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255, 255, 255, 0.9), transparent 60%)`
        }}
      />

      {/* CARD FLIP CONTAINER */}
      <div
        className={`w-full h-full flex flex-col justify-between transition-transform duration-700 preserve-3d ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
        style={{
          transformStyle: 'preserve-3d',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
        }}
      >
        {/* FRONT FACE */}
        <div className="flex flex-col flex-1 backface-hidden">
          {/* Top Badges & Actions */}
          <div className="relative w-full pt-[82%] overflow-hidden rounded-t-2xl bg-slate-100 dark:bg-slate-800/60">
            {/* 3D Floating Badges */}
            <div className="absolute top-3 left-3 z-20 flex flex-col gap-1.5 transform-gpu" style={{ transform: 'translateZ(30px)' }}>
              {product.discount > 0 && (
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold bg-rose-600 text-white shadow-xs">
                  {product.discount}% OFF
                </span>
              )}
              {product.isFlashSale && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold bg-amber-500 text-slate-950 shadow-xs">
                  <Zap className="w-2.5 h-2.5 fill-current" />
                  Flash Deal
                </span>
              )}
              {product.isBestSeller && !product.isFlashSale && (
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold bg-indigo-600 text-white shadow-xs">
                  Best Seller
                </span>
              )}
            </div>

            {/* Top Right Actions (Wishlist & 3D Flip) */}
            <div className="absolute top-3 right-3 z-20 flex flex-col gap-1.5 transform-gpu" style={{ transform: 'translateZ(30px)' }}>
              <button
                type="button"
                onClick={e => {
                  e.stopPropagation();
                  toggleWishlist(product.id);
                }}
                aria-label="Toggle Wishlist"
                className={`w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md transition-all shadow-xs ${
                  isFavorite
                    ? 'bg-rose-50 dark:bg-rose-950/80 text-rose-600'
                    : 'bg-white/90 dark:bg-slate-800/90 text-slate-600 dark:text-slate-300 hover:text-rose-500 hover:scale-110'
                }`}
              >
                <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
              </button>

              <button
                type="button"
                onClick={e => {
                  e.stopPropagation();
                  setIsFlipped(true);
                }}
                title="Inspect 3D Specs"
                className="w-8 h-8 rounded-full bg-white/90 dark:bg-slate-800/90 text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:scale-110 flex items-center justify-center backdrop-blur-md transition-all shadow-xs"
              >
                <Rotate3D className="w-4 h-4" />
              </button>
            </div>

            {/* Product Image with 3D Pop Out effect */}
            <div
              onClick={() => onNavigateToDetail?.(product)}
              className="absolute inset-0 cursor-pointer flex items-center justify-center p-6 group-hover:scale-105 transition-transform duration-500 transform-gpu"
              style={{ transform: 'translateZ(25px)' }}
            >
              <img
                src={product.images?.[activeImageIndex] || product.images?.[0] || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80'}
                alt={product.name}
                loading="lazy"
                className="w-full h-full object-contain filter drop-shadow-md group-hover:drop-shadow-xl transition-all duration-300"
              />
            </div>

            {/* Hover Quick View Button */}
            <div className="absolute inset-x-3 bottom-3 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 transform-gpu" style={{ transform: 'translateZ(35px)' }}>
              <button
                type="button"
                onClick={e => {
                  e.stopPropagation();
                  setQuickViewProduct(product);
                }}
                className="w-full py-2 px-3 rounded-xl bg-slate-900/90 dark:bg-white/90 text-white dark:text-slate-900 text-xs font-semibold backdrop-blur-md shadow-lg flex items-center justify-center gap-1.5 hover:bg-indigo-600 dark:hover:bg-indigo-500 dark:hover:text-white transition-colors"
              >
                <Eye className="w-3.5 h-3.5" />
                Quick View 3D
              </button>
            </div>
          </div>

          {/* Product Info Block */}
          <div className="p-4 flex flex-col flex-1 justify-between gap-3 transform-gpu" style={{ transform: 'translateZ(15px)' }}>
            <div>
              {/* Category & Brand */}
              <div className="flex items-center justify-between text-[11px] font-medium text-slate-500 dark:text-slate-400 mb-1">
                <span>{product.brand}</span>
                <span className="truncate max-w-[120px]">{product.category}</span>
              </div>

              {/* Title */}
              <h3
                onClick={() => onNavigateToDetail?.(product)}
                className="font-display font-semibold text-sm sm:text-base text-slate-900 dark:text-white line-clamp-1 cursor-pointer hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              >
                {product.name}
              </h3>

              {/* Rating & Stock */}
              <div className="flex items-center gap-1.5 mt-1.5 text-xs text-slate-600 dark:text-slate-300">
                <div className="flex items-center text-amber-500">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span className="ml-1 font-bold">{product.rating}</span>
                </div>
                <span className="text-slate-400">({product.reviewCount})</span>
                <span className="text-slate-300 dark:text-slate-600">•</span>
                <span className={`text-[11px] font-medium ${product.stock < 10 ? 'text-rose-500' : 'text-emerald-600 dark:text-emerald-400'}`}>
                  {product.stock < 10 ? `Only ${product.stock} left` : 'In Stock'}
                </span>
              </div>

              {/* Color variant selectors if any */}
              {product.colors && product.colors.length > 0 && (
                <div className="flex items-center gap-1.5 mt-2.5">
                  {product.colors.map(col => (
                    <button
                      key={col.name}
                      type="button"
                      onClick={e => handleColorClick(col.name, col.imageIndex, e)}
                      title={col.name}
                      className={`w-4 h-4 rounded-full border transition-transform ${
                        selectedColor === col.name
                          ? 'ring-2 ring-indigo-500 scale-110 border-white'
                          : 'border-slate-300 dark:border-slate-600 hover:scale-105'
                      }`}
                      style={{ backgroundColor: col.hex }}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Price and Add to Cart Action */}
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="text-base sm:text-lg font-bold font-display text-slate-900 dark:text-white">
                    {formatPrice(product.price)}
                  </span>
                  {product.originalPrice > product.price && (
                    <span className="text-xs text-slate-400 line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                </div>
                <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">
                  Free 2-Day Shipping
                </div>
              </div>

              <button
                type="button"
                onClick={e => {
                  e.stopPropagation();
                  addToCart(product, 1, selectedColor);
                }}
                className="p-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white transition-transform active:scale-95 shadow-md shadow-indigo-600/20 flex items-center justify-center"
                aria-label={`Add ${product.name} to cart`}
              >
                <ShoppingBag className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* BACK FACE (3D Technical Matrix / Quick Specs) */}
        <div
          className="absolute inset-0 p-4 rounded-2xl bg-slate-900 text-white flex flex-col justify-between backface-hidden"
          style={{
            transform: 'rotateY(180deg)',
            backfaceVisibility: 'hidden'
          }}
        >
          <div>
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-xs font-semibold text-indigo-400 flex items-center gap-1.5">
                <Rotate3D className="w-3.5 h-3.5" />
                3D Tech Specs
              </span>
              <button
                type="button"
                onClick={() => setIsFlipped(false)}
                className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 hover:bg-slate-700 transition-colors"
              >
                Flip Front
              </button>
            </div>

            <h4 className="font-display font-semibold text-sm mt-3 line-clamp-1">{product.name}</h4>
            <p className="text-xs text-slate-400 mt-1 line-clamp-2">{product.description}</p>

            {/* Key Specs Table */}
            <div className="mt-3 space-y-1.5 text-xs">
              {Object.entries(product.specifications).slice(0, 4).map(([key, value]) => (
                <div key={key} className="flex justify-between items-center py-1 border-b border-slate-800/80 text-[11px]">
                  <span className="text-slate-400">{key}:</span>
                  <span className="font-medium text-slate-200 text-right truncate max-w-[130px]">{value}</span>
                </div>
              ))}
            </div>

            {/* Assurance Badges */}
            <div className="mt-3 flex items-center gap-2 text-[10px] text-emerald-400">
              <ShieldCheck className="w-3 h-3 shrink-0" />
              <span>2-Year Full Coverage Warranty</span>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800 flex gap-2">
            <button
              type="button"
              onClick={() => {
                setIsFlipped(false);
                onNavigateToDetail?.(product);
              }}
              className="flex-1 py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-medium text-white transition-colors"
            >
              Full Details
            </button>
            <button
              type="button"
              onClick={() => {
                addToCart(product, 1, selectedColor);
                setIsFlipped(false);
              }}
              className="flex-1 py-2 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-xs font-medium text-white transition-colors flex items-center justify-center gap-1"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              Buy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
