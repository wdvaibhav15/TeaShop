import React, { useState } from 'react';
import {
  ShoppingBag,
  Trash2,
  Bookmark,
  ArrowRight,
  ShieldCheck,
  Tag,
  Truck,
  ArrowLeft
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Product } from '../types';

interface CartPageProps {
  setActivePage: (page: string) => void;
  onSelectProduct: (product: Product) => void;
}

export const CartPage: React.FC<CartPageProps> = ({ setActivePage, onSelectProduct }) => {
  const {
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

  const [couponCode, setCouponCode] = useState('');

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode.trim()) return;
    applyCoupon(couponCode);
    setCouponCode('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Title */}
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-5">
        <div>
          <h1 className="font-display font-black text-2xl sm:text-3xl text-slate-900 dark:text-white">
            Your Shopping Bag
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {cart.reduce((s, i) => s + i.quantity, 0)} items in your cart
          </p>
        </div>
        <button
          type="button"
          onClick={() => setActivePage('shop')}
          className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Continue Shopping
        </button>
      </div>

      {cart.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800">
          <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 mx-auto mb-4">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">
            Your bag is empty
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto">
            Discover our flagship acoustic headsets, chronographs, and kinetic sneakers with real-time 3D rotation.
          </p>
          <button
            type="button"
            onClick={() => setActivePage('shop')}
            className="mt-5 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-transform active:scale-95 shadow-md shadow-indigo-600/30"
          >
            Explore Catalog
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Items List */}
          <div className="lg:col-span-8 space-y-4">
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 divide-y divide-slate-100 dark:divide-slate-800">
              {cart.map(item => (
                <div key={item.product.id} className="pt-5 first:pt-0 flex flex-col sm:flex-row gap-4 sm:items-center justify-between">
                  <div
                    onClick={() => onSelectProduct(item.product)}
                    className="flex gap-4 items-center cursor-pointer group"
                  >
                    <div className="w-24 h-24 rounded-2xl bg-slate-100 dark:bg-slate-800 p-2 shrink-0 flex items-center justify-center">
                      <img
                        src={item.product?.images?.[0] || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80'}
                        alt={item.product?.name || ''}
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <div>
                      <span className="text-[11px] font-bold text-indigo-500 uppercase">
                        {item.product?.brand}
                      </span>
                      <h4 className="font-display font-bold text-sm text-slate-900 dark:text-white group-hover:text-indigo-600 transition-colors">
                        {item.product?.name}
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        Finish: {item.selectedColor || 'Default'} {item.selectedSize ? `• Size: ${item.selectedSize}` : ''}
                      </p>
                      <span className="text-xs font-bold text-slate-900 dark:text-white mt-1 block sm:hidden">
                        {formatPrice(item.product.price)}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-6">
                    {/* Quantity Selector */}
                    <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800">
                      <button
                        type="button"
                        onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                        className="px-3 py-1 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-l-xl font-bold"
                      >
                        -
                      </button>
                      <span className="px-3 py-1 text-xs font-bold text-slate-900 dark:text-white">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                        className="px-3 py-1 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-r-xl font-bold"
                      >
                        +
                      </button>
                    </div>

                    <div className="text-right hidden sm:block">
                      <span className="font-display font-bold text-base text-slate-900 dark:text-white">
                        {formatPrice(item.product.price * item.quantity)}
                      </span>
                      {item.quantity > 1 && (
                        <p className="text-[10px] text-slate-400">
                          {formatPrice(item.product.price)} each
                        </p>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => saveItemForLater(item.product.id)}
                        className="p-2 rounded-xl text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        title="Save for Later"
                      >
                        <Bookmark className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.product.id)}
                        className="p-2 rounded-xl text-slate-400 hover:text-rose-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        title="Remove Item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Saved for later section */}
            {savedForLater.length > 0 && (
              <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6">
                <h3 className="font-display font-bold text-sm text-slate-900 dark:text-white mb-4">
                  Saved For Later ({savedForLater.length})
                </h3>
                <div className="space-y-3">
                  {savedForLater.map(item => (
                    <div key={item.product?.id || Math.random().toString()} className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50">
                      <div className="flex items-center gap-3">
                        <img src={item.product?.images?.[0] || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80'} alt="" className="w-12 h-12 object-contain rounded-lg" />
                        <div>
                          <p className="text-xs font-bold text-slate-900 dark:text-white">{item.product?.name}</p>
                          <span className="text-xs text-indigo-500 font-bold">{formatPrice(item.product?.price || 0)}</span>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => item.product?.id && moveItemToCart(item.product.id)}
                        className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl"
                      >
                        Move to Bag
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Summary & Coupon */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 space-y-5 shadow-sm">
              <h3 className="font-display font-bold text-base text-slate-900 dark:text-white">
                Order Summary
              </h3>

              {/* Coupon Form */}
              <div>
                {appliedCoupon ? (
                  <div className="flex items-center justify-between p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-semibold">
                    <span className="flex items-center gap-1.5">
                      <Tag className="w-3.5 h-3.5" />
                      Code '{appliedCoupon.code}' (-{appliedCoupon.discountPercentage}%)
                    </span>
                    <button type="button" onClick={removeCoupon} className="text-rose-500 hover:underline">
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={e => setCouponCode(e.target.value)}
                      placeholder="Promo code (e.g. VORTEX20)"
                      className="flex-1 px-3 py-2 text-xs rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 uppercase placeholder:normal-case focus:outline-hidden focus:ring-1 focus:ring-indigo-500"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-slate-900 dark:bg-slate-800 text-white rounded-xl text-xs font-bold hover:bg-indigo-600 transition-colors"
                    >
                      Apply
                    </button>
                  </form>
                )}
              </div>

              {/* Calculations breakdown */}
              <div className="space-y-2.5 text-xs text-slate-600 dark:text-slate-300 border-t border-slate-100 dark:border-slate-800 pt-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-slate-900 dark:text-white">{formatPrice(cartSubtotal)}</span>
                </div>
                {cartDiscount > 0 && (
                  <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-semibold">
                    <span>Coupon Discount</span>
                    <span>-{formatPrice(cartDiscount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Estimated Tax (8%)</span>
                  <span>{formatPrice(cartTax)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Standard Shipping</span>
                  <span>{cartShipping === 0 ? <strong className="text-emerald-500 font-bold">FREE</strong> : formatPrice(cartShipping)}</span>
                </div>
                <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex justify-between items-baseline font-black text-base text-slate-900 dark:text-white">
                  <span>Grand Total</span>
                  <span className="text-xl font-display text-indigo-600 dark:text-indigo-400">
                    {formatPrice(cartTotal)}
                  </span>
                </div>
              </div>

              {/* Checkout CTA */}
              <button
                type="button"
                onClick={() => setActivePage('checkout')}
                className="w-full py-3.5 px-6 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-xl shadow-indigo-600/30 flex items-center justify-center gap-2 transition-transform active:scale-95"
              >
                Proceed to Checkout
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="pt-2 text-center flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>Encrypted 256-Bit Stripe Checkout</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
