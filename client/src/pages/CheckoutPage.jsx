import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  CreditCard,
  Truck,
  ShieldCheck,
  CheckCircle2,
  Lock,
  ChevronRight,
  Sparkles,
  AlertCircle,
  Banknote,
} from "lucide-react";

const CheckoutPage = () => {
  

  
  const navigate = useNavigate();

  // If cart is empty, redirect
  useEffect(() => {
    if (cart.length === 0) {
      navigate("/cart");
    }
  }, [cart, navigate]);

  // Form State
  const [shippingAddress, setShippingAddress] = useState({
    fullName: currentUser?.name || "Eleanor Vance",
    email: currentUser?.email || "eleanor.tea@example.com",
    street: "742 Evergreen Botanical Way",
    city: "Portland",
    state: "OR",
    zip: "97201",
    country: "United States",
    phone: currentUser?.phone || "+1 (503) 555-0194",
  });

  const [paymentMethod, setPaymentMethod] = useState("stripe"); // 'stripe' | 'cod'
  const [cardDetails, setCardDetails] = useState({
    number: "4242 •••• •••• 4242",
    expiry: "12/28",
    cvc: "888",
    nameOnCard: currentUser?.name || "Eleanor Vance",
  });

  const [simulateFailure, setSimulateFailure] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Address picker from saved user addresses
  const handleSelectSavedAddress = (addr) => {
    setShippingAddress({
      fullName: addr.fullName,
      email: currentUser?.email || "",
      street: addr.street,
      city: addr.city,
      state: addr.state,
      zip: addr.zip,
      country: addr.country,
      phone: addr.phone,
    });
    showToast(`Loaded saved address: "${addr.label}"`);
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      if (simulateFailure) {
        navigate("/payment-failure");
        return;
      }

      const paymentLabel =
        paymentMethod === "stripe"
          ? `Stripe Card (${cardDetails.number.slice(-4)})`
          : "Cash on Delivery";

      const createdOrder = placeOrder({
        userId: currentUser?.id || "guest",
        customerName: shippingAddress.fullName,
        email: shippingAddress.email,
        paymentMethod: paymentLabel,
        shippingAddress: shippingAddress,
      });

      navigate(`/payment-success?orderId=${createdOrder.id}`);
    }, 1200);
  };

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-stone-500">
        <Link to="/cart" className="hover:text-emerald-800">Cart</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="font-semibold text-stone-900 dark:text-stone-100">Checkout & Payment</span>
      </nav>

      <div>
        <span className="text-xs font-bold uppercase tracking-widest text-emerald-800 dark:text-emerald-400">
          Secure Processing
        </span>
        <h1 className="font-serif-tea text-3xl sm:text-4xl font-bold text-stone-900 dark:text-stone-100 tracking-tight mt-1">
          Finalize Your Harvest Order
        </h1>
      </div>

      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Columns: Shipping & Payment */}
        <div className="lg:col-span-7 space-y-8">
          {/* Saved Addresses for Logged-in User */}
          {currentUser?.addresses && currentUser.addresses.length > 0 && (
            <div className="bg-stone-50 dark:bg-stone-900/60 p-5 rounded-3xl border border-stone-200/80 dark:border-stone-800 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-stone-900 dark:text-stone-100 uppercase tracking-wider">
                  Saved Delivery Addresses
                </span>
                <span className="text-stone-400">Choose to auto-fill</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {currentUser.addresses.map((addr) => (
                  <button
                    key={addr.id}
                    type="button"
                    onClick={() => handleSelectSavedAddress(addr)}
                    className="text-left p-3 rounded-2xl bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 hover:border-emerald-700 transition-colors text-xs space-y-1"
                  >
                    <div className="font-bold text-stone-900 dark:text-stone-100 flex items-center justify-between">
                      <span>{addr.label}</span>
                      {addr.isDefault && (
                        <span className="text-[10px] text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-1.5 py-0.5 rounded">
                          Default
                        </span>
                      )}
                    </div>
                    <div className="text-stone-600 dark:text-stone-300 truncate">
                      {addr.street}, {addr.city}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Shipping Details */}
          <div className="bg-white dark:bg-stone-900 p-6 sm:p-8 rounded-3xl border border-stone-200/80 dark:border-stone-800 shadow-sm space-y-4">
            <h3 className="font-serif-tea text-xl font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
              <Truck className="w-5 h-5 text-emerald-800 dark:text-emerald-400" />
              1. Shipping & Contact Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-stone-700 dark:text-stone-300 block mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={shippingAddress.fullName}
                  onChange={(e) =>
                    setShippingAddress({ ...shippingAddress, fullName: e.target.value })
                  }
                  className="w-full text-xs p-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-stone-700 dark:text-stone-300 block mb-1">
                  Email for Tracking *
                </label>
                <input
                  type="email"
                  required
                  value={shippingAddress.email}
                  onChange={(e) =>
                    setShippingAddress({ ...shippingAddress, email: e.target.value })
                  }
                  className="w-full text-xs p-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-stone-700 dark:text-stone-300 block mb-1">
                Street Address *
              </label>
              <input
                type="text"
                required
                value={shippingAddress.street}
                onChange={(e) =>
                  setShippingAddress({ ...shippingAddress, street: e.target.value })
                }
                className="w-full text-xs p-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-emerald-700"
              />
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="text-xs font-bold text-stone-700 dark:text-stone-300 block mb-1">
                  City *
                </label>
                <input
                  type="text"
                  required
                  value={shippingAddress.city}
                  onChange={(e) =>
                    setShippingAddress({ ...shippingAddress, city: e.target.value })
                  }
                  className="w-full text-xs p-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-stone-700 dark:text-stone-300 block mb-1">
                  State / Region *
                </label>
                <input
                  type="text"
                  required
                  value={shippingAddress.state}
                  onChange={(e) =>
                    setShippingAddress({ ...shippingAddress, state: e.target.value })
                  }
                  className="w-full text-xs p-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-stone-700 dark:text-stone-300 block mb-1">
                  ZIP / Postal *
                </label>
                <input
                  type="text"
                  required
                  value={shippingAddress.zip}
                  onChange={(e) =>
                    setShippingAddress({ ...shippingAddress, zip: e.target.value })
                  }
                  className="w-full text-xs p-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-stone-700 dark:text-stone-300 block mb-1">
                Phone Number (for Courier SMS updates) *
              </label>
              <input
                type="tel"
                required
                value={shippingAddress.phone}
                onChange={(e) =>
                  setShippingAddress({ ...shippingAddress, phone: e.target.value })
                }
                className="w-full text-xs p-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-emerald-700"
              />
            </div>
          </div>

          {/* Payment Method Selector */}
          <div className="bg-white dark:bg-stone-900 p-6 sm:p-8 rounded-3xl border border-stone-200/80 dark:border-stone-800 shadow-sm space-y-6">
            <h3 className="font-serif-tea text-xl font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
              <Lock className="w-5 h-5 text-emerald-800 dark:text-emerald-400" />
              2. Payment Selection
            </h3>

            {/* Payment Radios */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setPaymentMethod("stripe")}
                className={`p-4 rounded-2xl border text-left flex items-start gap-3 transition-all ${
                  paymentMethod === "stripe"
                    ? "border-emerald-800 dark:border-emerald-600 bg-emerald-50/50 dark:bg-emerald-950/40 ring-1 ring-emerald-800"
                    : "border-stone-200 dark:border-stone-700 hover:border-stone-300"
                }`}
              >
                <CreditCard className="w-5 h-5 text-emerald-800 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-xs text-stone-900 dark:text-stone-100">
                    Stripe Payment Card
                  </div>
                  <div className="text-[11px] text-stone-500">
                    Visa, Mastercard, Amex, Apple Pay
                  </div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod("cod")}
                className={`p-4 rounded-2xl border text-left flex items-start gap-3 transition-all ${
                  paymentMethod === "cod"
                    ? "border-emerald-800 dark:border-emerald-600 bg-emerald-50/50 dark:bg-emerald-950/40 ring-1 ring-emerald-800"
                    : "border-stone-200 dark:border-stone-700 hover:border-stone-300"
                }`}
              >
                <Banknote className="w-5 h-5 text-emerald-800 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-xs text-stone-900 dark:text-stone-100">
                    Cash on Delivery
                  </div>
                  <div className="text-[11px] text-stone-500">
                    Pay driver in cash upon leaf arrival
                  </div>
                </div>
              </button>
            </div>

            {/* Stripe Card Fields */}
            {paymentMethod === "stripe" && (
              <div className="space-y-3 p-5 rounded-2xl bg-stone-50 dark:bg-stone-800/50 border border-stone-200 dark:border-stone-700">
                <div className="flex items-center justify-between text-xs text-stone-500 pb-1">
                  <span>Stripe Secure Elements</span>
                  <span className="text-[11px] font-mono text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950 px-2 py-0.5 rounded">
                    Test Mode: Pre-filled
                  </span>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-stone-700 dark:text-stone-300 block mb-1">
                    Card Number
                  </label>
                  <input
                    type="text"
                    required
                    value={cardDetails.number}
                    onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
                    className="w-full text-xs font-mono p-2.5 rounded-xl border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-900"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-bold text-stone-700 dark:text-stone-300 block mb-1">
                      Expiry (MM/YY)
                    </label>
                    <input
                      type="text"
                      required
                      value={cardDetails.expiry}
                      onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                      className="w-full text-xs font-mono p-2.5 rounded-xl border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-900"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-stone-700 dark:text-stone-300 block mb-1">
                      CVC / CVV
                    </label>
                    <input
                      type="text"
                      required
                      value={cardDetails.cvc}
                      onChange={(e) => setCardDetails({ ...cardDetails, cvc: e.target.value })}
                      className="w-full text-xs font-mono p-2.5 rounded-xl border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-900"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Simulate failure toggle for testing requirements */}
            <div className="pt-2 flex items-center justify-between text-xs border-t border-stone-100 dark:border-stone-800">
              <label className="flex items-center gap-2 cursor-pointer text-stone-500 hover:text-stone-700">
                <input
                  type="checkbox"
                  checked={simulateFailure}
                  onChange={(e) => setSimulateFailure(e.target.checked)}
                  className="rounded text-emerald-800"
                />
                <span>Simulate payment error (for testing failure screen)</span>
              </label>
            </div>
          </div>
        </div>

        {/* Right Column: Order Summary */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white dark:bg-stone-900 p-6 rounded-3xl border border-stone-200/80 dark:border-stone-800 shadow-sm space-y-6 sticky top-24">
            <h3 className="font-serif-tea text-xl font-bold text-stone-900 dark:text-stone-100">
              Items in Order ({cart.length})
            </h3>

            {/* Cart Preview List */}
            <div className="max-h-60 overflow-y-auto divide-y divide-stone-100 dark:divide-stone-800 pr-1">
              {cart.map((item) => (
                <div key={item.id} className="py-3 flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-11 h-11 rounded-xl object-cover"
                    />
                    <div>
                      <div className="font-bold text-stone-900 dark:text-stone-100 line-clamp-1">
                        {item.name}
                      </div>
                      <div className="text-stone-400">Qty: {item.quantity} &bull; 50g tin</div>
                    </div>
                  </div>
                  <div className="font-semibold text-stone-900 dark:text-stone-100">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            {/* Cost Breakdown */}
            <div className="space-y-2.5 text-xs border-t border-stone-100 dark:border-stone-800 pt-4">
              <div className="flex justify-between text-stone-600 dark:text-stone-400">
                <span>Subtotal</span>
                <span>${cartSubtotal.toFixed(2)}</span>
              </div>

              {couponDiscount > 0 && (
                <div className="flex justify-between text-emerald-700 dark:text-emerald-400 font-medium">
                  <span>Coupon Discount ({appliedCoupon?.code})</span>
                  <span>-${couponDiscount.toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between text-stone-600 dark:text-stone-400">
                <span>Shipping</span>
                <span>{shippingFee === 0 ? "FREE" : `$${shippingFee.toFixed(2)}`}</span>
              </div>

              <div className="flex justify-between text-stone-600 dark:text-stone-400">
                <span>Estimated Tax (8%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>

              <div className="flex justify-between text-lg font-bold text-stone-900 dark:text-stone-100 border-t border-stone-200 dark:border-stone-800 pt-3">
                <span>Total Due</span>
                <span className="text-emerald-800 dark:text-emerald-400">
                  ${cartTotal.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isProcessing}
              className="w-full py-4 rounded-2xl bg-emerald-800 hover:bg-emerald-900 active:scale-98 disabled:opacity-50 text-white font-semibold text-sm shadow-xl shadow-emerald-900/20 flex items-center justify-center gap-2 transition-all"
            >
              {isProcessing ? (
                <>
                  <span className="animate-spin inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                  <span>Authorizing Payment...</span>
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>
                    Pay ${cartTotal.toFixed(2)} & Complete Order
                  </span>
                </>
              )}
            </button>

            <p className="text-center text-[11px] text-stone-400">
              Orders are packaged in sealed nitrogen tins and dispatched via cold carbon-neutral logistics.
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CheckoutPage;
