import React from "react";
import { Link } from "react-router-dom";
import { Heart, ShoppingBag, Trash2, ArrowRight, Sparkles } from "lucide-react";


const WishlistPage = () => {

  const wishlistedProducts = products.filter((p) => wishlist.includes(p.id));

  const handleMoveAllToCart = () => {
    wishlistedProducts.forEach((p) => {
      moveWishlistToCart(p.id);
    });
    showToast("Moved all wishlist teas to your cart!");
  };

  if (wishlist.length === 0) {
    return (
      <div className="py-20 max-w-md mx-auto px-4 text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-rose-50 dark:bg-rose-950/40 text-rose-500 flex items-center justify-center mx-auto">
          <Heart className="w-10 h-10" />
        </div>
        <h2 className="font-serif-tea text-3xl font-bold text-stone-900 dark:text-stone-100">
          Your Wishlist is Empty
        </h2>
        <p className="text-stone-600 dark:text-stone-400 text-sm">
          Bookmark rare cultivars, seasonal flushes, and ceremonial matcha to revisit during your next brew.
        </p>
        <div>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-sm rounded-2xl shadow-md transition-colors"
          >
            <span>Explore Curated Harvests</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-stone-200 dark:border-stone-800">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-800 dark:text-emerald-400">
            Personal Tea Cellar
          </span>
          <h1 className="font-serif-tea text-3xl sm:text-4xl font-bold text-stone-900 dark:text-stone-100 tracking-tight mt-1">
            Saved Wishlist ({wishlistedProducts.length})
          </h1>
        </div>

        {wishlistedProducts.length > 0 && (
          <button
            onClick={handleMoveAllToCart}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-semibold shadow-sm transition-colors self-start"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Move All to Cart</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {wishlistedProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200/80 dark:border-stone-800 overflow-hidden shadow-sm flex flex-col justify-between group hover:shadow-md transition-shadow"
          >
            <div className="relative aspect-square overflow-hidden bg-stone-100 dark:bg-stone-800">
              <Link to={`/product/${product.id}`}>
                <img
                  src={product.images?.[0] || product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </Link>
              <button
                onClick={() => toggleWishlist(product.id)}
                className="absolute top-3 right-3 p-2 rounded-full bg-white/90 dark:bg-stone-900/90 text-rose-500 shadow-sm hover:scale-110 transition-transform"
                title="Remove from wishlist"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
              <div>
                <span className="text-[10px] uppercase font-bold text-emerald-700 dark:text-emerald-400 tracking-wider">
                  {product.category?.replace("-", " ")}
                </span>
                <Link
                  to={`/product/${product.id}`}
                  className="font-serif-tea text-base font-bold text-stone-900 dark:text-stone-100 hover:text-emerald-800 block line-clamp-1"
                >
                  {product.name}
                </Link>
                <div className="text-xs text-stone-400 truncate">{product.origin}</div>
              </div>

              <div className="pt-2 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between">
                <div>
                  <span className="text-lg font-bold text-stone-900 dark:text-stone-100">
                    ${product.price.toFixed(2)}
                  </span>
                  <span className="text-[10px] text-stone-400 block">50g Tin</span>
                </div>

                <button
                  onClick={() => moveWishlistToCart(product.id)}
                  className="px-3.5 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-900 active:scale-95 text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-all"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>To Cart</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WishlistPage;
