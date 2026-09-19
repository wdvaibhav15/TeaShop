import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Star,
  Heart,
  ShoppingBag,
  ShieldCheck,
  Truck,
  RotateCcw,
  Thermometer,
  Clock,
  Coffee,
  CheckCircle2,
  Share2,
  ChevronRight,
  MessageSquare,
} from "lucide-react";

import ProductCard from "../components/ProductCard";

const ProductDetailsPage = () => {
  const { id } = useParams();
  

  const product = products.find((p) => p.id === id) || products[0];

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  // Review submission state
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewAuthor, setReviewAuthor] = useState("");
  const [reviewTitle, setReviewTitle] = useState("");
  const [reviewComment, setReviewComment] = useState("");
  const [showReviewForm, setShowReviewForm] = useState(false);

  // Reset image on id change
  useEffect(() => {
    setSelectedImageIndex(0);
    setQuantity(1);
    setShowReviewForm(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  if (!product) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-2xl font-bold">Tea Not Found</h2>
        <Link to="/shop" className="text-emerald-800 underline mt-4 inline-block">
          Return to Catalog
        </Link>
      </div>
    );
  }

  const wishlisted = isInWishlist(product.id);
  const images = product.images && product.images.length > 0 ? product.images : [product.image];

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!reviewTitle.trim() || !reviewComment.trim()) {
      showToast("Please complete the review title and comments.", "error");
      return;
    }
    addProductReview(product.id, {
      author: reviewAuthor.trim() || "Verified Connoisseur",
      rating: reviewRating,
      title: reviewTitle.trim(),
      comment: reviewComment.trim(),
    });
    setReviewTitle("");
    setReviewComment("");
    setReviewAuthor("");
    setShowReviewForm(false);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: `Experience ${product.name} from Camellia Leaf Tea Co.`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast("Tea page link copied to clipboard!");
    }
  };

  // Related products
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="py-8 md:py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-stone-500">
        <Link to="/" className="hover:text-emerald-800 dark:hover:text-emerald-400">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link to="/shop" className="hover:text-emerald-800 dark:hover:text-emerald-400">Shop</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link
          to={`/shop?category=${product.category}`}
          className="capitalize hover:text-emerald-800 dark:hover:text-emerald-400"
        >
          {product.category?.replace("-", " ")}
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-stone-900 dark:text-stone-100 font-semibold truncate max-w-[200px]">
          {product.name}
        </span>
      </nav>

      {/* Main Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left: Images Gallery */}
        <div className="lg:col-span-6 space-y-4">
          {/* Main Large Image */}
          <div className="relative aspect-square rounded-3xl overflow-hidden bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-800 shadow-md">
            <img
              src={images[selectedImageIndex]}
              alt={product.name}
              className="w-full h-full object-cover object-center"
            />
            {product.tag && (
              <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-900/90 text-amber-50 backdrop-blur-sm shadow-sm">
                {product.tag}
              </span>
            )}
          </div>

          {/* Thumbnails Row */}
          {images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {images.map((imgUrl, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`relative w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0 border-2 transition-all ${
                    selectedImageIndex === idx
                      ? "border-emerald-800 dark:border-emerald-500 scale-105 shadow-md"
                      : "border-transparent opacity-70 hover:opacity-100"
                  }`}
                >
                  <img
                    src={imgUrl}
                    alt={`${product.name} angle ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Product Meta & Purchase */}
        <div className="lg:col-span-6 space-y-6">
          <div>
            <div className="flex items-center justify-between text-xs text-stone-500 mb-1">
              <span className="uppercase tracking-widest font-bold text-emerald-800 dark:text-emerald-400">
                {product.category?.replace("-", " ")}
              </span>
              <span className="font-medium text-stone-600 dark:text-stone-400">
                {product.origin}
              </span>
            </div>

            <h1 className="font-serif-tea text-3xl sm:text-4xl font-bold text-stone-900 dark:text-stone-100 tracking-tight leading-tight">
              {product.name}
            </h1>

            {/* Rating and Reviews header */}
            <div className="flex items-center gap-3 mt-3 text-xs">
              <div className="flex items-center text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating)
                        ? "fill-current"
                        : "text-stone-300 dark:text-stone-600"
                    }`}
                  />
                ))}
                <span className="ml-2 font-bold text-stone-900 dark:text-stone-100">
                  {product.rating}
                </span>
              </div>
              <span className="text-stone-400">&bull;</span>
              <a href="#reviews" className="text-stone-500 hover:text-emerald-800 underline">
                {product.reviewsCount} verified connoisseur reviews
              </a>
            </div>
          </div>

          {/* Pricing & Stock */}
          <div className="flex items-baseline gap-3 p-4 rounded-2xl bg-stone-50 dark:bg-stone-850 border border-stone-200/80 dark:border-stone-800">
            <span className="text-3xl font-bold text-stone-900 dark:text-stone-100">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-sm line-through text-stone-400">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
            <span className="text-xs text-stone-500 ml-auto">
              {product.stock > 0 ? (
                <span className="text-emerald-700 dark:text-emerald-400 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> In Stock ({product.stock} tins left)
                </span>
              ) : (
                <span className="text-red-500 font-semibold">Out of Stock</span>
              )}
            </span>
          </div>

          {/* Description */}
          <p className="text-stone-600 dark:text-stone-300 text-sm leading-relaxed">
            {product.description}
          </p>

          {/* Tasting Notes Tags */}
          {product.tastingNotes && product.tastingNotes.length > 0 && (
            <div>
              <span className="text-xs uppercase font-bold text-stone-400 tracking-wider block mb-2">
                Aromatics & Tasting Notes:
              </span>
              <div className="flex flex-wrap gap-2">
                {product.tastingNotes.map((note, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-full text-xs font-medium bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200 border border-amber-200/80 dark:border-amber-800"
                  >
                    {note}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Actions: Quantity, Cart, Wishlist */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-3">
              {/* Quantity Selector */}
              <div className="flex items-center border border-stone-200 dark:border-stone-700 rounded-2xl bg-white dark:bg-stone-800 p-1">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-9 h-9 flex items-center justify-center text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-700 rounded-xl text-lg font-bold"
                >
                  -
                </button>
                <span className="w-10 text-center text-sm font-bold text-stone-900 dark:text-stone-100">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                  className="w-9 h-9 flex items-center justify-center text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-700 rounded-xl text-lg font-bold"
                >
                  +
                </button>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={() => addToCart(product, quantity)}
                disabled={product.stock <= 0}
                className="flex-1 py-3.5 px-6 rounded-2xl bg-emerald-800 hover:bg-emerald-900 active:scale-98 disabled:bg-stone-300 disabled:cursor-not-allowed text-white text-sm font-semibold shadow-lg shadow-emerald-900/20 flex items-center justify-center gap-2 transition-all"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add {quantity > 1 ? `${quantity} Tins` : "Tin"} to Cart</span>
              </button>

              {/* Wishlist Button */}
              <button
                onClick={() => toggleWishlist(product.id)}
                className={`p-3.5 rounded-2xl border transition-all ${
                  wishlisted
                    ? "bg-rose-50 dark:bg-rose-950/60 border-rose-300 text-rose-600"
                    : "border-stone-200 dark:border-stone-700 hover:border-stone-400 text-stone-700 dark:text-stone-300"
                }`}
                title={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
              >
                <Heart className={`w-5 h-5 ${wishlisted ? "fill-current" : ""}`} />
              </button>

              {/* Share button */}
              <button
                onClick={handleShare}
                className="p-3.5 rounded-2xl border border-stone-200 dark:border-stone-700 hover:border-stone-400 text-stone-700 dark:text-stone-300"
                title="Share this tea"
              >
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Delivery & Trust highlights */}
          <div className="grid grid-cols-2 gap-3 pt-4 border-t border-stone-100 dark:border-stone-800 text-xs text-stone-600 dark:text-stone-300">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
              <span>Complimentary shipping on $50+</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
              <span>100% Guaranteed Freshness</span>
            </div>
          </div>
        </div>
      </div>

      {/* Brewing Guide & Ingredients Specs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
        {/* Brewing Specs */}
        {product.brewingGuide && (
          <div className="bg-stone-50 dark:bg-stone-900/60 p-6 sm:p-8 rounded-3xl border border-stone-200/80 dark:border-stone-800 space-y-4">
            <h3 className="font-serif-tea text-xl font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
              <Coffee className="w-5 h-5 text-emerald-800 dark:text-emerald-400" />
              Master Sommelier Brewing Guide
            </h3>

            <div className="grid grid-cols-3 gap-3 text-center pt-2">
              <div className="bg-white dark:bg-stone-800 p-3 rounded-2xl border border-stone-200/60 dark:border-stone-700">
                <Thermometer className="w-4 h-4 text-amber-600 mx-auto mb-1" />
                <div className="text-[11px] text-stone-400">Water Temp</div>
                <div className="text-xs font-bold text-stone-900 dark:text-stone-100">
                  {product.brewingGuide.temperature}
                </div>
              </div>

              <div className="bg-white dark:bg-stone-800 p-3 rounded-2xl border border-stone-200/60 dark:border-stone-700">
                <Clock className="w-4 h-4 text-emerald-600 mx-auto mb-1" />
                <div className="text-[11px] text-stone-400">Steep Time</div>
                <div className="text-xs font-bold text-stone-900 dark:text-stone-100">
                  {product.brewingGuide.steepTime}
                </div>
              </div>

              <div className="bg-white dark:bg-stone-800 p-3 rounded-2xl border border-stone-200/60 dark:border-stone-700">
                <Coffee className="w-4 h-4 text-amber-600 mx-auto mb-1" />
                <div className="text-[11px] text-stone-400">Leaf Ratio</div>
                <div className="text-xs font-bold text-stone-900 dark:text-stone-100">
                  {product.brewingGuide.dosage}
                </div>
              </div>
            </div>

            <p className="text-xs text-stone-500 leading-relaxed pt-2">
              Tip: Use filtered mountain spring water or zero-TDS water. Avoid boiling water on delicate green or white tea leaves to prevent scalding precious amino acids.
            </p>
          </div>
        )}

        {/* Ingredients and Health Benefits */}
        <div className="bg-stone-50 dark:bg-stone-900/60 p-6 sm:p-8 rounded-3xl border border-stone-200/80 dark:border-stone-800 space-y-4">
          <h3 className="font-serif-tea text-xl font-bold text-stone-900 dark:text-stone-100">
            Ingredients & Wellness Benefits
          </h3>

          <div className="space-y-3 text-xs">
            <div>
              <span className="font-bold text-stone-400 uppercase tracking-wider block mb-1">
                Ingredients:
              </span>
              <p className="text-stone-700 dark:text-stone-300 font-medium">
                {product.ingredients || "100% Pure Organic Orthodox Tea Leaves."}
              </p>
            </div>

            {product.benefits && (
              <div>
                <span className="font-bold text-stone-400 uppercase tracking-wider block mb-2">
                  Health & Therapeutic Benefits:
                </span>
                <ul className="space-y-1.5">
                  {product.benefits.map((b, i) => (
                    <li key={i} className="flex items-center gap-2 text-stone-700 dark:text-stone-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Customer Reviews & Rating Section */}
      <section id="reviews" className="space-y-8 pt-8 border-t border-stone-200 dark:border-stone-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-serif-tea text-2xl font-bold text-stone-900 dark:text-stone-100">
              Customer Reviews ({product.reviewsCount})
            </h3>
            <p className="text-xs text-stone-500 mt-1">
              Read sensory impressions from fellow tea lovers.
            </p>
          </div>

          <button
            onClick={() => setShowReviewForm(!showReviewForm)}
            className="px-4 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-semibold self-start"
          >
            {showReviewForm ? "Close Form" : "Write a Tea Review"}
          </button>
        </div>

        {/* Review Form */}
        {showReviewForm && (
          <form
            onSubmit={handleReviewSubmit}
            className="p-6 rounded-3xl bg-stone-100/80 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700 space-y-4 max-w-xl"
          >
            <h4 className="text-sm font-bold text-stone-900 dark:text-stone-100">
              Share Your Steeping Experience
            </h4>

            <div>
              <label className="text-xs font-semibold block mb-1">Your Rating:</label>
              <div className="flex items-center gap-1 text-amber-500">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    type="button"
                    key={star}
                    onClick={() => setReviewRating(star)}
                    className="p-1"
                  >
                    <Star
                      className={`w-5 h-5 ${
                        star <= reviewRating ? "fill-current" : "text-stone-300"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold block mb-1">Your Name / Handle:</label>
              <input
                type="text"
                value={reviewAuthor}
                onChange={(e) => setReviewAuthor(e.target.value)}
                placeholder="e.g. Master Emi"
                className="w-full text-xs p-2.5 rounded-xl border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-900"
              />
            </div>

            <div>
              <label className="text-xs font-semibold block mb-1">Review Headline:</label>
              <input
                type="text"
                required
                value={reviewTitle}
                onChange={(e) => setReviewTitle(e.target.value)}
                placeholder="e.g. Beautiful floral notes with deep sweet finish"
                className="w-full text-xs p-2.5 rounded-xl border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-900"
              />
            </div>

            <div>
              <label className="text-xs font-semibold block mb-1">Detailed Tasting Notes:</label>
              <textarea
                required
                rows={3}
                value={reviewComment}
                onChange={(e) => setReviewComment(e.target.value)}
                placeholder="Describe the aroma, liquor appearance, mouthfeel, and how many steeps it held up to..."
                className="w-full text-xs p-2.5 rounded-xl border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-900"
              />
            </div>

            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-emerald-800 text-white text-xs font-semibold hover:bg-emerald-700 transition-colors"
            >
              Post Review
            </button>
          </form>
        )}

        {/* Reviews List */}
        <div className="space-y-4">
          {product.reviews && product.reviews.length > 0 ? (
            product.reviews.map((rev) => (
              <div
                key={rev.id}
                className="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 space-y-2"
              >
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-stone-900 dark:text-stone-100">
                      {rev.author}
                    </span>
                    <span className="text-[10px] bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-200 px-1.5 py-0.5 rounded font-medium">
                      Verified Buyer
                    </span>
                  </div>
                  <span className="text-stone-400">{rev.date}</span>
                </div>

                <div className="flex items-center text-amber-500">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>

                <h5 className="font-semibold text-xs text-stone-900 dark:text-stone-100">
                  {rev.title}
                </h5>
                <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                  "{rev.comment}"
                </p>
              </div>
            ))
          ) : (
            <div className="p-8 text-center bg-stone-50 dark:bg-stone-850 rounded-2xl border border-dashed border-stone-300 dark:border-stone-700 text-stone-500 text-xs">
              No written reviews yet for this harvest. Be the first to share your notes!
            </div>
          )}
        </div>
      </section>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <section className="space-y-6 pt-8 border-t border-stone-200 dark:border-stone-800">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-800 dark:text-emerald-400">
              Pairing Suggestions
            </span>
            <h3 className="font-serif-tea text-2xl font-bold text-stone-900 dark:text-stone-100 tracking-tight mt-1">
              You May Also Enjoy
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

export default ProductDetailsPage;