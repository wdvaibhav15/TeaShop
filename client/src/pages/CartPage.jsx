import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShoppingBag,
  Tag,
  Check,
  X,
  Truck,
  ShieldCheck,
} from "lucide-react";

const CartPage = () => {
  

  const [couponInput, setCouponInput] = useState("");
  const navigate = useNavigate();

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (couponInput.trim()) {
      applyCouponCode(couponInput);
      setCouponInput("");
    }
  };

  const freeShippingThreshold = settings.freeShippingThreshold || 50;
  const amountToFreeShipping = Math.max(0, freeShippingThreshold - cartSubtotal);
  const freeShippingPercent = Math.min(
    100,
    (cartSubtotal / freeShippingThreshold) * 100
  );

  if (cart.length === 0) {
    return (
      <div className="py-20 max-w-xl mx-auto px-4 text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-400 flex items-center justify-center mx-auto">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h2 className="font-serif-tea text-3xl font-bold text-stone-900 dark:text-stone-100">
          Your Tea Cart is Empty
        </h2>
        <p className="text-stone-600 dark:text-stone-400 text-sm max-w-md mx-auto">
          Explore our seasonal first-flush harvests and single-estate matcha to start brewing your daily mindfulness.
        </p>
        <div>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-sm rounded-2xl shadow-md transition-colors"
          >
            <span>Explore the Tea Catalog</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <div>
        <span className="text-xs font-bold uppercase tracking-widest text-emerald-800 dark:text-emerald-400">
          Cart Review
        </span>
        <h1 className="font-serif-tea text-3xl sm:text-4xl font-bold text-stone-900 dark:text-stone-100 tracking-tight mt-1">
          Your Selected Teas ({cart.reduce((a, b) => a + b.quantity, 0)} items)
        </h1>
      </div>

      {/* Free Shipping Progress Bar */}
      <div className="bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 rounded-2xl p-4">
        <div className="flex items-center justify-between text-xs font-semibold text-emerald-900 dark:text-emerald-200 mb-2">
          <span className="flex items-center gap-1.5">
            <Truck className="w-4 h-4" />
            {amountToFreeShipping === 0 || appliedCoupon?.freeShipping ? (
              <span>You have unlocked complimentary carbon-neutral shipping!</span>
            ) : (
              <span>
                Add <span className="font-bold">${amountToFreeShipping.toFixed(2)}</span> more to unlock free shipping!
              </span>
            )}
          </span>
          <span>{freeShippingPercent.toFixed(0)}%</span>
        </div>
        <div className="w-full h-2 bg-emerald-200 dark:bg-emerald-900 rounded-full overflow-hidden">
          <div
            className="h-full bg-emerald-600 dark:bg-emerald-400 rounded-full transition-all duration-500"
            style={{ width: `${appliedCoupon?.freeShipping ? 100 : freeShippingPercent}%` }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Cart Items Table */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200/80 dark:border-stone-800 overflow-hidden shadow-sm">
            <div className="divide-y divide-stone-100 dark:divide-stone-800">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 rounded-2xl object-cover bg-stone-100 dark:bg-stone-800 flex-shrink-0"
                    />
                    <div className="space-y-1">
                      <Link
                        to={`/product/${item.id}`}
                        className="font-serif-tea text-base font-bold text-stone-900 dark:text-stone-100 hover:text-emerald-800 dark:hover:text-emerald-400 transition-colors"
                      >
                        {item.name}
                      </Link>
                      <div className="text-xs text-stone-500 capitalize">
                        {item.category?.replace("-", " ")} &bull; 50g Tin
                      </div>
                      <div className="text-sm font-semibold text-stone-900 dark:text-stone-100">
                        ${item.price.toFixed(2)}
                      </div>
                    </div>
                  </div>

                  {/* Quantity and Line Total */}
                  <div className="flex items-center justify-between sm:justify-end gap-6 pt-2 sm:pt-0 border-t sm:border-0 border-stone-100 dark:border-stone-800">
                    <div className="flex items-center border border-stone-200 dark:border-stone-700 rounded-xl bg-stone-50 dark:bg-stone-800 p-1">
                      <button
                        onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                        className="w-7 h-7 flex items-center justify-center text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700 rounded-lg text-xs"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-8 text-center text-xs font-bold text-stone-900 dark:text-stone-100">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                        className="w-7 h-7 flex items-center justify-center text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700 rounded-lg text-xs"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="text-right min-w-[70px]">
                      <div className="text-sm font-bold text-stone-900 dark:text-stone-100">
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-2 text-stone-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-xl transition-colors"
                      title="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 bg-stone-50 dark:bg-stone-800/40 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs">
              <Link
                to="/shop"
                className="font-semibold text-emerald-800 dark:text-emerald-400 hover:underline"
              >
                &larr; Continue shopping teas
              </Link>
              <button
                onClick={clearCart}
                className="text-stone-400 hover:text-red-500 transition-colors"
              >
                Clear Cart
              </button>
            </div>
          </div>
        </div>

        {/* Order Summary & Coupon */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white dark:bg-stone-900 p-6 rounded-3xl border border-stone-200/80 dark:border-stone-800 shadow-sm space-y-6">
            <h3 className="font-serif-tea text-xl font-bold text-stone-900 dark:text-stone-100">
              Order Summary
            </h3>

            {/* Coupon input */}
            <div>
              <label className="text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider block mb-1.5">
                Voucher / Coupon Code
              </label>
              {appliedCoupon ? (
                <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-xs">
                  <div className="flex items-center gap-2">
                    <Tag className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
                    <div>
                      <span className="font-mono font-bold text-emerald-900 dark:text-emerald-200">
                        {appliedCoupon.code}
                      </span>
                      <span className="text-emerald-700 dark:text-emerald-400 block text-[10px]">
                        {appliedCoupon.freeShipping
                          ? "Free Shipping Unlocked"
                          : `${appliedCoupon.discountPercent}% Discount Applied`}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="p-1 text-stone-400 hover:text-red-500 rounded"
                    title="Remove coupon"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Try TEA10 or MATCHA20"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    className="flex-1 text-xs uppercase font-mono p-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 dark:bg-stone-700 dark:hover:bg-stone-600 text-white text-xs font-semibold transition-colors"
                  >
                    Apply
                  </button>
                </form>
              )}
            </div>

            {/* Calculations Breakdown */}
            <div className="space-y-3 text-xs border-t border-stone-100 dark:border-stone-800 pt-4">
              <div className="flex justify-between text-stone-600 dark:text-stone-400">
                <span>Subtotal</span>
                <span className="font-semibold text-stone-900 dark:text-stone-100">
                  ${cartSubtotal.toFixed(2)}
                </span>
              </div>

              {couponDiscount > 0 && (
                <div className="flex justify-between text-emerald-700 dark:text-emerald-400">
                  <span>Coupon Discount</span>
                  <span>-${couponDiscount.toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between text-stone-600 dark:text-stone-400">
                <span>Shipping</span>
                <span>
                  {shippingFee === 0 ? (
                    <span className="text-emerald-700 dark:text-emerald-400 font-semibold">
                      FREE
                    </span>
                  ) : (
                    `$${shippingFee.toFixed(2)}`
                  )}
                </span>
              </div>

              <div className="flex justify-between text-stone-600 dark:text-stone-400">
                <span>Estimated Tax (8%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>

              <div className="flex justify-between text-base font-bold text-stone-900 dark:text-stone-100 border-t border-stone-200 dark:border-stone-800 pt-3">
                <span>Estimated Total</span>
                <span className="text-emerald-800 dark:text-emerald-400">
                  ${cartTotal.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              onClick={() => navigate("/checkout")}
              className="w-full py-4 rounded-2xl bg-emerald-800 hover:bg-emerald-900 active:scale-98 text-white font-semibold text-sm shadow-lg shadow-emerald-900/20 flex items-center justify-center gap-2 transition-all"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-2 text-[11px] text-stone-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Stripe 256-bit encrypted checkout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
