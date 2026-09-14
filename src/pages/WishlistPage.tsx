import React from 'react';
import { Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Product3DCard } from '../components/3d/Product3DCard';
import { Product } from '../types';

interface WishlistPageProps {
  setActivePage: (page: string) => void;
  onSelectProduct: (product: Product) => void;
}

export const WishlistPage: React.FC<WishlistPageProps> = ({
  setActivePage,
  onSelectProduct
}) => {
  const { wishlist, products, addToCart, removeFromWishlist, clearWishlist, showToast } = useApp();

  const wishlistProducts = products.filter(p => wishlist.includes(p.id));

  const handleMoveAllToCart = () => {
    if (wishlistProducts.length === 0) return;
    wishlistProducts.forEach(p => {
      addToCart(p, 1);
    });
    clearWishlist();
    showToast('Items Transferred', 'All saved items moved to your shopping cart.', 'success');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
        <div>
          <h1 className="font-display font-black text-2xl sm:text-3xl text-slate-900 dark:text-white">
            Saved Wishlist ({wishlistProducts.length})
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Keep track of items you plan to buy or inspect in 3D later
          </p>
        </div>

        {wishlistProducts.length > 0 && (
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleMoveAllToCart}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center gap-1.5 transition-colors"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              Move All to Cart
            </button>
            <button
              type="button"
              onClick={clearWishlist}
              className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-rose-500 text-xs font-semibold transition-colors"
            >
              Clear List
            </button>
          </div>
        )}
      </div>

      {wishlistProducts.length === 0 ? (
        <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800">
          <div className="w-16 h-16 rounded-2xl bg-rose-500/10 text-rose-500 flex items-center justify-center mx-auto mb-4">
            <Heart className="w-8 h-8 stroke-[1.5]" />
          </div>
          <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">
            Your wishlist is currently empty
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto">
            Click the heart icon on any product to save it here for convenient access and price drop alerts.
          </p>
          <button
            type="button"
            onClick={() => setActivePage('shop')}
            className="mt-6 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-transform active:scale-95 shadow-md"
          >
            Explore Catalog
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {wishlistProducts.map(product => (
            <div key={product.id} className="relative group">
              <Product3DCard
                product={product}
                onNavigateToDetail={onSelectProduct}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
