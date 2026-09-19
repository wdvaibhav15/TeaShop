import React from "react";
import { Link } from "react-router-dom";
import { Star, Heart, ShoppingBag, Eye } from "lucide-react";


const  ProductCard = () => {
 

  return (
    <div className="group relative flex flex-col bg-white dark:bg-stone-900 rounded-2xl border border-stone-200/80 dark:border-stone-800 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
      {/* Image & Badges */}
      <div className="relative aspect-square w-full overflow-hidden bg-stone-100 dark:bg-stone-800">
        <Link to={`/product/${product.id}`} className="block w-full h-full">
          <img
            src={displayImage}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          />
        </Link>

        {/* Badge */}
        {product.tag && (
          <div className="absolute top-3 left-3 px-2.5 py-1 text-xs font-semibold uppercase tracking-wider rounded-full bg-emerald-800/90 text-amber-50 backdrop-blur-sm shadow-sm">
            {product.tag}
          </div>
        )}

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(product.id);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all duration-200 ${
            wishlisted
              ? "bg-rose-500 text-white shadow-md scale-110"
              : "bg-white/80 dark:bg-stone-900/80 text-stone-600 dark:text-stone-300 hover:text-rose-500 hover:bg-white dark:hover:bg-stone-900"
          }`}
          aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart className={`w-4 h-4 ${wishlisted ? "fill-current" : ""}`} />
        </button>

        {/* Quick details link on hover */}
        <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-2">
          <Link
            to={`/product/${product.id}`}
            className="flex-1 py-2 px-3 bg-white/95 dark:bg-stone-800/95 hover:bg-emerald-800 hover:text-white dark:hover:bg-emerald-700 text-stone-800 dark:text-stone-100 text-xs font-medium rounded-xl text-center shadow-md backdrop-blur-sm transition-colors flex items-center justify-center gap-1.5"
          >
            <Eye className="w-3.5 h-3.5" />
            Quick View
          </Link>
        </div>
      </div>

      {/* Product Details */}
      <div className="flex flex-col flex-1 p-4 sm:p-5">
        <div className="flex items-center justify-between text-xs text-stone-500 dark:text-stone-400 mb-1.5">
          <span className="uppercase tracking-wider font-semibold text-emerald-700 dark:text-emerald-400">
            {product.category?.replace("-", " ")}
          </span>
          {product.origin && (
            <span className="truncate max-w-[130px]" title={product.origin}>
              {product.origin.split(",")[0]}
            </span>
          )}
        </div>

        <Link
          to={`/product/${product.id}`}
          className="font-serif-tea text-base sm:text-lg font-medium text-stone-900 dark:text-stone-100 group-hover:text-emerald-800 dark:group-hover:text-emerald-400 transition-colors line-clamp-1 mb-1"
        >
          {product.name}
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mb-3 text-xs">
          <div className="flex items-center text-amber-500">
            <Star className="w-3.5 h-3.5 fill-current" />
            <span className="ml-1 font-semibold text-stone-800 dark:text-stone-200">
              {product.rating}
            </span>
          </div>
          <span className="text-stone-400">({product.reviewsCount})</span>
          {product.stock <= 20 && (
            <span className="ml-auto text-[11px] text-amber-600 dark:text-amber-400 font-medium">
              Only {product.stock} left
            </span>
          )}
        </div>

        {/* Price and Cart */}
        <div className="mt-auto pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-bold text-stone-900 dark:text-stone-50">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-xs line-through text-stone-400">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
            <span className="text-[11px] text-stone-400 dark:text-stone-500 block">50g artisan tin</span>
          </div>

          <button
            onClick={() => addToCart(product, 1)}
            disabled={product.stock <= 0}
            className="flex items-center gap-1.5 px-3 py-2 bg-emerald-800 hover:bg-emerald-900 active:scale-95 disabled:bg-stone-300 dark:disabled:bg-stone-700 disabled:cursor-not-allowed text-white text-xs font-semibold rounded-xl shadow-sm hover:shadow transition-all"
            aria-label={`Add ${product.name} to cart`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  );
}


export default ProductCard;