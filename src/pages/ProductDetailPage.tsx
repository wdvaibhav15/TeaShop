import React, { useState } from 'react';
import {
  Star,
  Heart,
  ShoppingBag,
  Share2,
  Shield,
  Truck,
  RotateCcw,
  Check,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  Rotate3D,
  Sparkles,
  Layers,
  ThumbsUp,
  Image as ImageIcon,
  MessageSquare
} from 'lucide-react';
import { Product, Review } from '../types';
import { useApp } from '../context/AppContext';
import { Model3DViewer } from '../components/3d/Model3DViewer';
import { Product3DCard } from '../components/3d/Product3DCard';
import { REVIEWS } from '../constants/data';

interface ProductDetailPageProps {
  product: Product;
  onBack: () => void;
  onSelectProduct: (product: Product) => void;
  onProceedToCheckout: () => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  product,
  onBack,
  onSelectProduct,
  onProceedToCheckout
}) => {
  const {
    formatPrice,
    addToCart,
    toggleWishlist,
    isInWishlist,
    products,
    showToast
  } = useApp();

  const [activeTab, setActiveTab] = useState<'photos' | '3d'>('photos');
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0]?.name || '');
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || '');
  const [quantity, setQuantity] = useState(1);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });

  // Reviews state
  const [reviewsList, setReviewsList] = useState<Review[]>(() => {
    return REVIEWS.filter(r => r.productId === product.id).concat(
      REVIEWS.map(r => ({ ...r, id: `r-${r.id}-${product.id}`, productId: product.id }))
    ).slice(0, 3);
  });

  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewTitle, setNewReviewTitle] = useState('');
  const [newReviewComment, setNewReviewComment] = useState('');

  const isFavorite = isInWishlist(product.id);

  // Zoom mouse move calculation
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPos({ x, y });
  };

  const handleAddToCart = (buyNow = false) => {
    addToCart(product, quantity, selectedColor, selectedSize);
    if (buyNow) {
      onProceedToCheckout();
    }
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Link Copied!', 'Product link copied to your clipboard.', 'success');
    }
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewTitle || !newReviewComment) {
      showToast('Incomplete Review', 'Please provide a title and feedback comment.', 'warning');
      return;
    }
    const newRev: Review = {
      id: `rev-${Date.now()}`,
      productId: product.id,
      userName: 'Verified Creator',
      rating: newReviewRating,
      title: newReviewTitle,
      comment: newReviewComment,
      date: 'Just now',
      verifiedPurchase: true,
      likes: 1
    };
    setReviewsList(prev => [newRev, ...prev]);
    setShowReviewForm(false);
    setNewReviewTitle('');
    setNewReviewComment('');
    showToast('Review Submitted', 'Thank you for your valuable feedback!', 'success');
  };

  // Related products in same category
  const relatedProducts = products
    .filter(p => p.id !== product.id && p.category === product.category)
    .slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Breadcrumb & Back */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className="text-xs font-semibold text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center gap-1 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" /> Back to Catalog
        </button>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleShare}
            className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:text-indigo-600 transition-colors flex items-center gap-1.5 text-xs font-semibold"
          >
            <Share2 className="w-4 h-4" />
            <span className="hidden sm:inline">Share</span>
          </button>
          <button
            type="button"
            onClick={() => toggleWishlist(product.id)}
            className={`p-2 rounded-xl border transition-colors flex items-center gap-1.5 text-xs font-semibold ${
              isFavorite
                ? 'border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-600'
                : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:text-rose-500'
            }`}
          >
            <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
            <span className="hidden sm:inline">{isFavorite ? 'Saved' : 'Wishlist'}</span>
          </button>
        </div>
      </div>

      {/* MAIN PRODUCT SHOWCASE GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: Media Gallery (Images + 3D Model Canvas) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Mode Switcher */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 p-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <button
                type="button"
                onClick={() => setActiveTab('photos')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                  activeTab === 'photos'
                    ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
                    : 'text-slate-600 dark:text-slate-300'
                }`}
              >
                High-Res Photos ({(product.images || []).length})
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('3d')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                  activeTab === '3d'
                    ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
                    : 'text-slate-600 dark:text-slate-300'
                }`}
              >
                <Rotate3D className="w-4 h-4" />
                3D Interactive Model Canvas
              </button>
            </div>

            {activeTab === 'photos' && (
              <span className="text-xs text-slate-400 hidden sm:flex items-center gap-1">
                <ZoomIn className="w-3.5 h-3.5" /> Hover to Zoom
              </span>
            )}
          </div>

          {activeTab === 'photos' ? (
            <div className="space-y-4">
              {/* Main Image with Zoom on Hover */}
              <div
                onMouseEnter={() => setIsZoomed(true)}
                onMouseLeave={() => setIsZoomed(false)}
                onMouseMove={handleMouseMove}
                className="relative w-full h-[380px] sm:h-[460px] bg-slate-100 dark:bg-slate-800/70 rounded-3xl p-8 flex items-center justify-center overflow-hidden border border-slate-200/80 dark:border-slate-800 cursor-crosshair group"
              >
                <img
                  src={(product.images && product.images[selectedImageIndex]) || (product.images && product.images[0]) || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80'}
                  alt={product.name}
                  className={`w-full h-full object-contain filter drop-shadow-xl transition-transform duration-200 ${
                    isZoomed ? 'scale-150' : 'scale-100'
                  }`}
                  style={
                    isZoomed
                      ? {
                          transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`
                        }
                      : undefined
                  }
                />

                {/* Slider Nav buttons */}
                <button
                  type="button"
                  onClick={e => {
                    e.stopPropagation();
                    const totalImgs = (product.images || []).length || 1;
                    setSelectedImageIndex(prev =>
                      prev === 0 ? totalImgs - 1 : prev - 1
                    );
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 dark:bg-slate-800/90 text-slate-700 dark:text-slate-200 shadow-md flex items-center justify-center hover:scale-105 transition-all"
                  aria-label="Previous Image"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={e => {
                    e.stopPropagation();
                    const totalImgs = (product.images || []).length || 1;
                    setSelectedImageIndex(prev =>
                      (prev + 1) % totalImgs
                    );
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 dark:bg-slate-800/90 text-slate-700 dark:text-slate-200 shadow-md flex items-center justify-center hover:scale-105 transition-all"
                  aria-label="Next Image"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>

                {/* Badges */}
                {product.discount > 0 && (
                  <span className="absolute top-4 left-4 px-3 py-1 bg-rose-600 text-white font-bold text-xs rounded-full shadow-md">
                    {product.discount}% OFF
                  </span>
                )}
              </div>

              {/* Thumbnails */}
              <div className="flex items-center gap-3 overflow-x-auto pb-2">
                {(product.images || []).map((img, idx) => (
                  <button
                    key={img || idx}
                    type="button"
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`w-20 h-20 rounded-2xl border-2 overflow-hidden bg-slate-100 dark:bg-slate-800 p-1 shrink-0 transition-all ${
                      selectedImageIndex === idx
                        ? 'border-indigo-600 scale-105 shadow-md'
                        : 'border-slate-200 dark:border-slate-700 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="thumb" className="w-full h-full object-contain" />
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <Model3DViewer
                modelType={product.model3DType || 'headphone'}
                productName={product.name}
              />
              <p className="text-xs text-slate-500 dark:text-slate-400 text-center">
                Interact with the 3D model: Drag to orbit 360°, switch to Exploded Mode to view components.
              </p>
            </div>
          )}
        </div>

        {/* Right Column: Information, Pricing, Variants & Purchase */}
        <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                <span>{product.brand}</span>
                <span>•</span>
                <span>{product.category}</span>
              </div>

              <h1 className="font-display font-black text-2xl sm:text-3xl text-slate-900 dark:text-white mt-1">
                {product.name}
              </h1>

              {/* Ratings and Reviews count */}
              <div className="flex items-center gap-3 mt-2 text-xs">
                <div className="flex items-center text-amber-500">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="ml-1 font-bold">{product.rating}</span>
                </div>
                <span className="text-slate-400">({product.reviewCount} customer reviews)</span>
                <span className="text-slate-300 dark:text-slate-700">•</span>
                <span className={`font-semibold ${product.stock < 10 ? 'text-rose-500' : 'text-emerald-500'}`}>
                  {product.stock < 10 ? `Only ${product.stock} items remaining` : 'In Stock & Ready to Ship'}
                </span>
              </div>
            </div>

            {/* Pricing Section */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-baseline justify-between">
              <div>
                <span className="text-3xl font-display font-black text-slate-900 dark:text-white">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice > product.price && (
                  <span className="ml-2 text-sm text-slate-400 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
                <div className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold mt-0.5">
                  Save {formatPrice(product.originalPrice - product.price)} ({product.discount}%)
                </div>
              </div>
              <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400">
                Taxes calculated at checkout
              </span>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {product.description}
            </p>

            {/* Key Features Bullet List */}
            <div className="space-y-1.5 pt-1">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                Engineered Highlights
              </h4>
              <ul className="space-y-1 text-xs text-slate-600 dark:text-slate-300">
                {product.features.map(f => (
                  <li key={f} className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Colors */}
            {product.colors && product.colors.length > 0 && (
              <div>
                <label className="block text-xs font-bold text-slate-900 dark:text-white mb-2">
                  Finish: <span className="text-indigo-500">{selectedColor}</span>
                </label>
                <div className="flex items-center gap-2.5">
                  {product.colors.map(col => (
                    <button
                      key={col.name}
                      type="button"
                      onClick={() => {
                        setSelectedColor(col.name);
                        if (col.imageIndex !== undefined) setSelectedImageIndex(col.imageIndex);
                      }}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold border flex items-center gap-2 transition-all ${
                        selectedColor === col.name
                          ? 'border-indigo-600 ring-2 ring-indigo-500/20 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-300'
                          : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <span className="w-3.5 h-3.5 rounded-full border border-black/10" style={{ backgroundColor: col.hex }} />
                      {col.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Sizes */}
            {product.sizes && product.sizes.length > 0 && (
              <div>
                <label className="block text-xs font-bold text-slate-900 dark:text-white mb-2">
                  Size Specification:
                </label>
                <div className="flex items-center gap-2 flex-wrap">
                  {product.sizes.map(sz => (
                    <button
                      key={sz}
                      type="button"
                      onClick={() => setSelectedSize(sz)}
                      className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl border transition-all ${
                        selectedSize === sz
                          ? 'border-indigo-600 bg-indigo-600 text-white shadow-xs'
                          : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Controller */}
            <div className="flex items-center gap-4 pt-2">
              <span className="text-xs font-bold text-slate-900 dark:text-white">Quantity:</span>
              <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1.5 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-l-xl font-bold"
                >
                  -
                </button>
                <span className="px-4 py-1.5 text-xs font-bold text-slate-900 dark:text-white">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="px-3 py-1.5 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-r-xl font-bold"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="space-y-3 pt-6 border-t border-slate-200 dark:border-slate-800">
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => handleAddToCart(false)}
                className="flex-1 py-3.5 px-6 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-xl shadow-indigo-600/30 flex items-center justify-center gap-2 transition-transform active:scale-95"
              >
                <ShoppingBag className="w-4 h-4" />
                Add to Cart ({formatPrice(product.price * quantity)})
              </button>

              <button
                type="button"
                onClick={() => handleAddToCart(true)}
                className="flex-1 py-3.5 px-6 rounded-2xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 font-bold text-sm shadow-md transition-transform active:scale-95"
              >
                Buy Now
              </button>
            </div>

            {/* Assurance badges */}
            <div className="grid grid-cols-3 gap-2 pt-3 text-[11px] text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-indigo-500" />
                <span>Free 2-Day Express</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-emerald-500" />
                <span>2-Year Warranty</span>
              </div>
              <div className="flex items-center gap-1.5">
                <RotateCcw className="w-3.5 h-3.5 text-amber-500" />
                <span>30-Day Returns</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SPECIFICATIONS & HARDWARE TABLE */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800">
        <h3 className="font-display font-black text-xl text-slate-900 dark:text-white mb-6">
          Technical Specifications
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-3">
          {Object.entries(product.specifications).map(([key, val]) => (
            <div key={key} className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800 text-xs">
              <span className="text-slate-500 dark:text-slate-400 font-medium">{key}</span>
              <span className="text-slate-900 dark:text-white font-semibold">{val}</span>
            </div>
          ))}
        </div>
      </section>

      {/* CUSTOMER REVIEWS & WRITE REVIEW SECTION */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h3 className="font-display font-black text-xl text-slate-900 dark:text-white">
              Customer Reviews ({reviewsList.length})
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <div className="flex text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <span className="text-xs font-bold text-slate-900 dark:text-white">4.9 out of 5</span>
              <span className="text-xs text-slate-400">• 98% would recommend</span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setShowReviewForm(!showReviewForm)}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-colors flex items-center gap-1.5 w-fit"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            Write a Review
          </button>
        </div>

        {/* Write Review Form */}
        {showReviewForm && (
          <form onSubmit={handleAddReview} className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-4">
            <h4 className="font-display font-bold text-sm text-slate-900 dark:text-white">
              Share Your Experience
            </h4>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Your Rating:
              </label>
              <div className="flex gap-1 text-amber-500 cursor-pointer">
                {[1, 2, 3, 4, 5].map(star => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setNewReviewRating(star)}
                    className="p-1"
                  >
                    <Star className={`w-5 h-5 ${star <= newReviewRating ? 'fill-current' : 'text-slate-300'}`} />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Review Headline:
              </label>
              <input
                type="text"
                value={newReviewTitle}
                onChange={e => setNewReviewTitle(e.target.value)}
                placeholder="e.g. Unbelievable acoustic isolation"
                className="w-full px-3 py-2 text-xs rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Detailed Feedback:
              </label>
              <textarea
                rows={3}
                value={newReviewComment}
                onChange={e => setNewReviewComment(e.target.value)}
                placeholder="Write your impressions regarding build quality, battery, or audio precision..."
                className="w-full px-3 py-2 text-xs rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
              />
            </div>

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowReviewForm(false)}
                className="px-3 py-1.5 text-xs text-slate-500 hover:text-slate-700"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 rounded-xl bg-indigo-600 text-white text-xs font-bold"
              >
                Post Review
              </button>
            </div>
          </form>
        )}

        {/* Reviews List */}
        <div className="space-y-4 divide-y divide-slate-100 dark:divide-slate-800">
          {reviewsList.map(r => (
            <div key={r.id} className="pt-4 first:pt-0 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-indigo-500/20 text-indigo-600 font-bold text-xs flex items-center justify-center">
                    {r.userName[0]}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900 dark:text-white">{r.userName}</p>
                    <div className="flex items-center gap-1 text-[10px] text-emerald-500">
                      <Check className="w-3 h-3" />
                      <span>Verified Purchaser</span>
                    </div>
                  </div>
                </div>
                <span className="text-[11px] text-slate-400">{r.date}</span>
              </div>

              <div className="flex items-center gap-1 text-amber-500">
                {[...Array(r.rating)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>

              <h5 className="font-display font-semibold text-xs text-slate-900 dark:text-white">
                {r.title}
              </h5>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {r.comment}
              </p>

              {r.images && r.images.length > 0 && (
                <div className="flex gap-2 pt-1">
                  {r.images.map((img, i) => (
                    <img key={i} src={img} alt="review visual" className="w-16 h-16 rounded-xl object-cover border" />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* RELATED PRODUCTS */}
      {relatedProducts.length > 0 && (
        <section className="space-y-6">
          <h3 className="font-display font-black text-xl text-slate-900 dark:text-white">
            Recommended Companions
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map(p => (
              <Product3DCard
                key={p.id}
                product={p}
                onNavigateToDetail={onSelectProduct}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
