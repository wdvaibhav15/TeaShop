import React, { useState } from 'react';
import { X, Trash2, Bookmark, ArrowRight, ShoppingBag, Sparkles, Tag, ShieldCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface CartDrawerProps {
  onNavigateToCheckout: () => void;
  onNavigateToCartPage: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  onNavigateToCheckout,
  onNavigateToCartPage
}) => {
  const {
    isCartDrawerOpen,
    setIsCartDrawerOpen,
    cart,
    savedForLater,
    removeFromCart,
    updateCartQuantity,
    saveItemForLater,
    moveItemToCart,
    formatPrice,
    cartSubtotal,
    cartDiscount,
    cartTax,
    cartShipping,
    cartTotal,
    appliedCoupon,
    applyCoupon,
    removeCoupon
  } = useApp();

  const [couponInput, setCouponInput] = useState('');

  if (!isCartDrawerOpen) return null;

  const freeShippingThreshold = 99;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - cartSubtotal);
  const freeShippingPercentage = Math.min(100, (cartSubtotal / freeShippingThreshold) * 100);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    applyCoupon(couponInput);
    setCouponInput('');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/60 backdrop-blur-xs flex justify-end animate-fade-in">
      <div
        className="w-full max-w-md bg-white dark:bg-slate-900 h-full shadow-2xl flex flex-col justify-between border-l border-slate-200 dark:border-slate-800 animate-slide-left select-none"
        onClick={e => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <h3 className="font-display font-bold text-base text-slate-900 dark:text-white">
              Shopping Cart ({cart.reduce((s, i) => s + i.quantity, 0)})
            </h3>
          </div>
          <button
            type="button"
            onClick={() => setIsCartDrawerOpen(false)}
            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Bar */}
        <div className="px-5 py-3 bg-indigo-50/70 dark:bg-indigo-950/40 border-b border-indigo-100 dark:border-indigo-900/40">
          <div className="flex items-center justify-between text-xs font-semibold text-indigo-900 dark:text-indigo-300 mb-1.5">
            <span>
              {remainingForFreeShipping === 0
                ? '🎉 You unlocked Free Express Shipping!'
                : `Add ${formatPrice(remainingForFreeShipping)} more for Free Shipping`}
            </span>
            <span className="font-mono font-bold">{Math.round(freeShippingPercentage)}%</span>
          </div>
          <div className="w-full h-1.5 bg-indigo-200 dark:bg-indigo-900 rounded-full overflow-hidden">
            <div
              className="h-full bg-indigo-600 dark:bg-indigo-400 rounded-full transition-all duration-500"
              style={{ width: `${freeShippingPercentage}%` }}
            />
          </div>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 divide-y divide-slate-100 dark:divide-slate-800">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6">
              <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 mb-3">
                <ShoppingBag className="w-8 h-8 stroke-[1.5]" />
              </div>
              <p className="font-display font-semibold text-base text-slate-800 dark:text-slate-200">
                Your cart is empty
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-[220px]">
                Explore our 3D spatial sound and kinetic gear collection.
              </p>
              <button
                type="button"
                onClick={() => setIsCartDrawerOpen(false)}
                className="mt-4 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-transform active:scale-95"
              >
                Browse Catalog
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map(item => (
                <div key={item.product.id} className="pt-3 first:pt-0 flex gap-3.5 items-start">
                  <div className="w-20 h-20 rounded-xl bg-slate-100 dark:bg-slate-800/80 p-2 shrink-0 border border-slate-200/60 dark:border-slate-800 flex items-center justify-center">
                    <img
                      src={item.product?.images?.[0] || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80'}
                      alt={item.product?.name || ''}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="font-display font-semibold text-xs text-slate-900 dark:text-white line-clamp-1">
                      {item.product?.name}
                    </h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                      {item.selectedColor || 'Default'} {item.selectedSize ? `• ${item.selectedSize}` : ''}
                    </p>

                    <div className="flex items-center justify-between mt-2">
                      {/* Quantity Controller */}
                      <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800">
                        <button
                          type="button"
                          onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                          className="px-2 py-0.5 text-xs text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                        >
                          -
                        </button>
                        <span className="px-2 py-0.5 text-xs font-bold text-slate-900 dark:text-white">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                          className="px-2 py-0.5 text-xs text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                        >
                          +
                        </button>
                      </div>

                      <span className="font-display font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                        {formatPrice(item.product.price * item.quantity)}
                      </span>
                    </div>

                    {/* Quick Item Actions */}
                    <div className="flex items-center gap-3 mt-2 text-[11px]">
                      <button
                        type="button"
                        onClick={() => saveItemForLater(item.product.id)}
                        className="text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center gap-1"
                      >
                        <Bookmark className="w-3 h-3" />
                        Save for Later
                      </button>
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-slate-400 hover:text-rose-500 flex items-center gap-1"
                      >
                        <Trash2 className="w-3 h-3" />
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Saved for Later Accordion */}
          {savedForLater.length > 0 && (
            <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800">
              <h5 className="font-display font-semibold text-xs text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">
                Saved for Later ({savedForLater.length})
              </h5>
              <div className="space-y-2">
                {savedForLater.map(item => (
                  <div key={item.product?.id || Math.random().toString()} className="flex items-center justify-between p-2 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                    <div className="flex items-center gap-2">
                      <img src={item.product?.images?.[0] || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80'} alt="" className="w-10 h-10 object-contain rounded" />
                      <div>
                        <p className="text-xs font-semibold text-slate-900 dark:text-white line-clamp-1 max-w-[140px]">
                          {item.product?.name}
                        </p>
                        <span className="text-[11px] font-bold text-indigo-500">
                          {formatPrice(item.product?.price || 0)}
                        </span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => moveItemToCart(item.product.id)}
                      className="px-2.5 py-1 text-xs bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg"
                    >
                      Move to Cart
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Drawer Footer: Coupons & Totals */}
        {cart.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 space-y-3">
            {/* Coupon Application */}
            <div className="space-y-1.5">
              {appliedCoupon ? (
                <div className="flex items-center justify-between px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs">
                  <div className="flex items-center gap-1.5 font-semibold">
                    <Tag className="w-3.5 h-3.5" />
                    <span>Coupon '{appliedCoupon.code}' Active (-{appliedCoupon.discountPercentage}%)</span>
                  </div>
                  <button
                    type="button"
                    onClick={removeCoupon}
                    className="text-xs text-rose-500 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    value={couponInput}
                    onChange={e => setCouponInput(e.target.value)}
                    placeholder="Coupon: VORTEX20"
                    className="flex-1 px-3 py-1.5 text-xs rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 uppercase placeholder:normal-case focus:outline-hidden focus:ring-1 focus:ring-indigo-500"
                  />
                  <button
                    type="submit"
                    className="px-3 py-1.5 rounded-xl bg-slate-900 dark:bg-slate-700 text-white text-xs font-semibold hover:bg-indigo-600 transition-colors"
                  >
                    Apply
                  </button>
                </form>
              )}
            </div>

            {/* Price Calculations */}
            <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-slate-900 dark:text-white">
                  {formatPrice(cartSubtotal)}
                </span>
              </div>
              {cartDiscount > 0 && (
                <div className="flex justify-between text-emerald-600 dark:text-emerald-400">
                  <span>Discount</span>
                  <span className="font-semibold">-{formatPrice(cartDiscount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Estimated Tax (8%)</span>
                <span>{formatPrice(cartTax)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>
                  {cartShipping === 0 ? (
                    <strong className="text-emerald-600 dark:text-emerald-400">FREE</strong>
                  ) : (
                    formatPrice(cartShipping)
                  )}
                </span>
              </div>
              <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex justify-between items-baseline font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                <span>Total</span>
                <span className="font-display text-indigo-600 dark:text-indigo-400 text-lg">
                  {formatPrice(cartTotal)}
                </span>
              </div>
            </div>

            {/* Checkout CTAs */}
            <div className="space-y-2 pt-1">
              <button
                type="button"
                onClick={() => {
                  setIsCartDrawerOpen(false);
                  onNavigateToCheckout();
                }}
                className="w-full py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 transition-transform active:scale-95"
              >
                Proceed to Checkout
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsCartDrawerOpen(false);
                  onNavigateToCartPage();
                }}
                className="w-full py-2 text-center text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-300"
              >
                View Full Detailed Cart Page
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
