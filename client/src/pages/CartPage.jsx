
import React from "react";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import useRazorpay from "../hooks/useRazorpay";
import {
  removeFromCart,
  increaseQty,
  decreaseQty,
} from "../redux/cartSlice";
import toast from "react-hot-toast";

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get cart items directly from Redux
  const cartItems = useSelector(
    (state) => state.cart?.cartItems || []
  );

  const { user } = useSelector(
    (state) => state.user || {}
  );

  const { startPayment, loading: paymentLoading } =
    useRazorpay();

  const DEFAULT_IMAGE =
    "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=800&auto=format&fit=crop";

  // Total number of items, including quantities
  const totalQuantity = cartItems.reduce(
    (total, item) =>
      total + Number(item.quantity || 1),
    0
  );

  // Calculate subtotal
  const totalPrice = cartItems.reduce(
    (sum, item) =>
      sum +
      Number(item.price || 0) *
        Number(item.quantity || 1),
    0
  );

  // Checkout handler
  const handleCheckout = async () => {
    if (!user) {
      toast.error("Please log in to proceed to checkout");
      navigate("/login");
      return;
    }

    if (cartItems.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    try {
      await startPayment({
        coffeeId: cartItems[0]?._id,
        quantity: totalQuantity,
        amount: totalPrice,
        userId: user?._id || user?.id,
        title: `Cart Order (${cartItems.length} Items)`,
        image:
          cartItems[0]?.imageUrl ||
          cartItems[0]?.image ||
          DEFAULT_IMAGE,
        items: cartItems,
      });
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error(
        "Unable to start checkout. Please try again."
      );
    }
  };

  // Remove product from cart
  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
    toast.success("Item removed from cart");
  };

  return (
    <main className="min-h-screen overflow-x-hidden bg-stone-950 text-white">
      <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">

        {/* Page Heading and Cart Count Badge */}
        <div className="mb-7 sm:mb-9">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="font-serif text-3xl font-bold uppercase tracking-wide text-white sm:text-4xl">
              Shopping Cart
            </h1>

            {/* Dynamic badge */}
            <span className="inline-flex h-8 min-w-8 items-center justify-center rounded-full bg-emerald-600 px-2 text-sm font-bold text-white">
              {totalQuantity > 99 ? "99+" : totalQuantity}
            </span>
          </div>

          <p className="mt-2 text-sm text-stone-400">
            {totalQuantity}{" "}
            {totalQuantity === 1 ? "item" : "items"} in your cart
          </p>
        </div>

        {/* Empty Cart */}
        {cartItems.length === 0 ? (
          <section className="rounded-2xl border border-stone-800 bg-stone-900/60 px-5 py-12 text-center sm:py-16">
            <ShoppingBag className="mx-auto mb-5 h-14 w-14 text-emerald-500" />

            <h2 className="font-serif text-2xl font-bold text-white sm:text-3xl">
              Your Cart Is Empty
            </h2>

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-stone-400 sm:text-base">
              Discover our handcrafted coffee, artisanal
              teas, and signature blends.
            </p>

            <button
              type="button"
              onClick={() => navigate("/menu")}
              className="mt-7 rounded-xl bg-emerald-600 px-6 py-3 font-semibold text-white transition hover:bg-emerald-500"
            >
              Browse Menu
            </button>
          </section>
        ) : (
          <>
            {/* Cart Items */}
            <div className="space-y-4">
              {cartItems.map((item) => {
                const title =
                  item.coffeeTitle ||
                  item.title ||
                  item.name ||
                  "Coffee";

                const image =
                  item.imageUrl ||
                  item.image ||
                  DEFAULT_IMAGE;

                const quantity = Number(item.quantity || 1);
                const price = Number(item.price || 0);

                return (
                  <article
                    key={item._id}
                    className="rounded-2xl border border-stone-600 bg-stone-950 p-3 transition-colors hover:border-emerald-700 sm:p-5"
                  >
                    <div className="flex min-w-0 flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                      {/* Product Information */}
                      <div className="flex min-w-0 items-center gap-3 sm:gap-4">
                        <img
                          src={image}
                          alt={title}
                          onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = DEFAULT_IMAGE;
                          }}
                          className="h-20 w-20 shrink-0 rounded-xl object-cover sm:h-24 sm:w-24"
                        />

                        <div className="min-w-0 flex-1">
                          <h2 className="break-words font-serif text-base font-bold leading-snug text-white sm:text-lg">
                            {title}
                          </h2>

                          <p className="mt-1 text-sm text-stone-400">
                            {item.category || "Coffee"}
                          </p>

                          <p className="mt-1 font-semibold text-emerald-400 sm:hidden">
                            ₹{price.toFixed(2)} each
                          </p>

                          <p className="mt-1 hidden font-bold text-white sm:block">
                            ₹{price.toFixed(2)}
                          </p>
                        </div>
                      </div>

                      {/* Quantity and Price Controls */}
                      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-stone-800 pt-3 sm:justify-end sm:border-0 sm:pt-0">

                        <div className="flex items-center gap-3">
                          <button
                            type="button"
                            aria-label={`Decrease quantity of ${title}`}
                            disabled={quantity <= 1}
                            onClick={() =>
                              dispatch(decreaseQty(item._id))
                            }
                            className="flex h-9 w-9 items-center justify-center rounded-lg border border-stone-600 text-stone-200 transition hover:bg-stone-800 disabled:cursor-not-allowed disabled:opacity-40"
                          >
                            <Minus size={16} />
                          </button>

                          <span className="min-w-5 text-center text-sm font-semibold">
                            {quantity}
                          </span>

                          <button
                            type="button"
                            aria-label={`Increase quantity of ${title}`}
                            onClick={() =>
                              dispatch(increaseQty(item._id))
                            }
                            className="flex h-9 w-9 items-center justify-center rounded-lg border border-stone-600 text-stone-200 transition hover:bg-stone-800"
                          >
                            <Plus size={16} />
                          </button>
                        </div>

                        <p className="min-w-24 text-right text-base font-bold text-white sm:min-w-28 sm:text-lg">
                          ₹{(price * quantity).toFixed(2)}
                        </p>

                        <button
                          type="button"
                          aria-label={`Remove ${title} from cart`}
                          onClick={() =>
                            handleRemove(item._id)
                          }
                          className="flex h-9 w-9 items-center justify-center rounded-lg text-red-500 transition hover:bg-red-950/40 hover:text-red-400"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            {/* Subtotal */}
            <section className="mt-7 border-t border-stone-600 pt-5 sm:mt-8 sm:pt-6">
              <div className="flex items-center justify-between gap-4">
                <h2 className="font-serif text-lg font-bold uppercase text-white sm:text-xl">
                  Subtotal
                </h2>

                <p className="text-xl font-bold text-white sm:text-2xl">
                  ₹{totalPrice.toFixed(2)}
                </p>
              </div>

              <p className="mt-2 text-right text-xs text-stone-400 sm:text-sm">
                Shipping and any applicable taxes are
                calculated at checkout.
              </p>

              {/* Checkout Buttons */}
              <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={() => navigate("/menu")}
                  className="w-full rounded-xl border border-stone-600 px-5 py-3 font-semibold text-stone-200 transition hover:bg-stone-900 sm:w-auto"
                >
                  Continue Shopping
                </button>

                <button
                  type="button"
                  onClick={handleCheckout}
                  disabled={
                    paymentLoading || cartItems.length === 0
                  }
                  className="w-full rounded-xl bg-emerald-600 px-6 py-3 font-semibold text-white transition hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
                >
                  {paymentLoading
                    ? "Processing..."
                    : "Proceed To Checkout"}
                </button>
              </div>
            </section>
          </>
        )}
      </div>
    </main>
  );
};

export default CartPage;
