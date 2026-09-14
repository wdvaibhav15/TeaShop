import React, { useState } from 'react';
import { X, Star, Heart, ShoppingBag, Rotate3D, Check, Shield, Truck, Zap } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Model3DViewer } from '../3d/Model3DViewer';

interface QuickViewModalProps {
  onNavigateToDetail?: (productId: string) => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({ onNavigateToDetail }) => {
  const {
    quickViewProduct,
    setQuickViewProduct,
    formatPrice,
    addToCart,
    toggleWishlist,
    isInWishlist
  } = useApp();

  const [activeTab, setActiveTab] = useState<'photos' | '3d'>('photos');
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState(1);

  if (!quickViewProduct) return null;

  const product = quickViewProduct;
  const isFavorite = isInWishlist(product.id);

  const handleAddToCart = (buyNow = false) => {
    addToCart(product, quantity, selectedColor || product.colors?.[0]?.name, selectedSize || product.sizes?.[0]);
    if (buyNow && onNavigateToDetail) {
      setQuickViewProduct(null);
      // handled in parent or opens cart
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-fade-in">
      <div
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl p-6 md:p-8"
        onClick={e => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors z-30"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column: Visual Media (Photos or 3D Model) */}
          <div className="flex flex-col gap-4">
            {/* View Mode Switcher */}
            <div className="flex items-center gap-2 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl w-fit">
              <button
                type="button"
                onClick={() => setActiveTab('photos')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                  activeTab === 'photos'
                    ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Photo Gallery ({(product.images || []).length})
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('3d')}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                  activeTab === '3d'
                    ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Rotate3D className="w-3.5 h-3.5" />
                3D Spatial Canvas
              </button>
            </div>

            {activeTab === 'photos' ? (
              <div className="space-y-3">
                {/* Main Large Image */}
                <div className="relative w-full h-[280px] sm:h-[340px] bg-slate-100 dark:bg-slate-800/60 rounded-2xl p-6 flex items-center justify-center overflow-hidden">
                  <img
                    src={(product.images && product.images[activeImageIdx]) || (product.images && product.images[0]) || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80'}
                    alt={product.name}
                    className="w-full h-full object-contain filter drop-shadow-lg"
                  />
                  {product.discount > 0 && (
                    <span className="absolute top-3 left-3 px-2.5 py-1 bg-rose-600 text-white font-bold text-xs rounded-full">
                      {product.discount}% OFF
                    </span>
                  )}
                </div>

                {/* Thumbnails Row */}
                <div className="flex items-center gap-2 overflow-x-auto pb-1">
                  {(product.images || []).map((img, idx) => (
                    <button
                      key={img}
                      type="button"
                      onClick={() => setActiveImageIdx(idx)}
                      className={`w-16 h-16 rounded-xl border-2 overflow-hidden bg-slate-100 dark:bg-slate-800 shrink-0 transition-all ${
                        activeImageIdx === idx
                          ? 'border-indigo-600 scale-105 shadow-md'
                          : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="thumb" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <Model3DViewer
                modelType={product.model3DType || 'gadget'}
                productName={product.name}
              />
            )}
          </div>

          {/* Right Column: Product Information & Interactive Controls */}
          <div className="flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400">
                <span className="text-indigo-600 dark:text-indigo-400">{product.brand}</span>
                <span>Category: {product.category}</span>
              </div>

              <h2 className="font-display font-bold text-xl sm:text-2xl text-slate-900 dark:text-white mt-1">
                {product.name}
              </h2>

              {/* Rating */}
              <div className="flex items-center gap-2 mt-2 text-xs">
                <div className="flex items-center text-amber-500">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="ml-1 font-bold">{product.rating}</span>
                </div>
                <span className="text-slate-400">({product.reviewCount} customer reviews)</span>
                <span className="text-slate-300 dark:text-slate-700">•</span>
                <span className={`font-semibold ${product.stock < 10 ? 'text-rose-500' : 'text-emerald-500'}`}>
                  {product.stock < 10 ? `Only ${product.stock} units left` : 'Ready to Ship'}
                </span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 mt-3">
                <span className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900 dark:text-white">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice > product.price && (
                  <span className="text-sm text-slate-400 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
                <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                  Save {formatPrice(product.originalPrice - product.price)}
                </span>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-3 leading-relaxed">
                {product.description}
              </p>

              {/* Color variant */}
              {product.colors && product.colors.length > 0 && (
                <div className="mt-4">
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Finish Color: <span className="text-indigo-500 font-bold">{selectedColor || product.colors[0].name}</span>
                  </label>
                  <div className="flex items-center gap-2">
                    {product.colors.map(col => (
                      <button
                        key={col.name}
                        type="button"
                        onClick={() => {
                          setSelectedColor(col.name);
                          if (col.imageIndex !== undefined) setActiveImageIdx(col.imageIndex);
                        }}
                        className={`px-3 py-1.5 rounded-xl text-xs font-medium border flex items-center gap-2 transition-all ${
                          (selectedColor || product.colors?.[0]?.name) === col.name
                            ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-300 font-bold'
                            : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
                        }`}
                      >
                        <span className="w-3 h-3 rounded-full border" style={{ backgroundColor: col.hex }} />
                        {col.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Size variant */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="mt-4">
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Select Size:
                  </label>
                  <div className="flex items-center gap-2 flex-wrap">
                    {product.sizes.map(size => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => setSelectedSize(size)}
                        className={`px-3 py-1 text-xs font-semibold rounded-lg border transition-all ${
                          (selectedSize || product.sizes?.[0]) === size
                            ? 'border-indigo-600 bg-indigo-600 text-white'
                            : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-slate-400'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity selector */}
              <div className="mt-4 flex items-center gap-3">
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">Quantity:</span>
                <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-l-xl"
                  >
                    -
                  </button>
                  <span className="px-3 py-1 text-xs font-bold text-slate-900 dark:text-white">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="px-3 py-1 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-r-xl"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-2 pt-4 border-t border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => handleAddToCart(false)}
                  className="flex-1 py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-bold shadow-lg shadow-indigo-600/25 flex items-center justify-center gap-2 transition-transform active:scale-95"
                >
                  <ShoppingBag className="w-4 h-4" />
                  Add to Cart ({formatPrice(product.price * quantity)})
                </button>

                <button
                  type="button"
                  onClick={() => toggleWishlist(product.id)}
                  aria-label="Wishlist"
                  className={`p-3 rounded-xl border transition-colors ${
                    isFavorite
                      ? 'border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-600'
                      : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-rose-500'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
                </button>
              </div>

              {onNavigateToDetail && (
                <button
                  type="button"
                  onClick={() => {
                    setQuickViewProduct(null);
                    onNavigateToDetail(product.id);
                  }}
                  className="w-full py-2.5 text-center text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  View Full Product Specification Page & Reviews →
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
