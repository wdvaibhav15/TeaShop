
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import {
  ArrowLeft,
  Star,
  Coffee,
  Send,
  CheckCircle2,
  MessageSquareText,
} from "lucide-react";

const Review = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const userState = useSelector((state) => state.user);

  const user =
    userState?.user?.user ||
    userState?.user ||
    userState?.currentUser ||
    null;

  const order = location.state?.order;

  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("0");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Normalize the products in the selected order.
  const getProducts = () => {
    if (!order) return [];

    const orderItems = Array.isArray(order.items)
      ? order.items
      : Array.isArray(order._items)
        ? order._items
        : [];

    if (orderItems.length > 0) {
      return orderItems.map((item) => {
        const coffee =
          item.coffeeId && typeof item.coffeeId === "object"
            ? item.coffeeId
            : {};

        return {
          productId:
            coffee._id ||
            item.productId ||
            (typeof item.coffeeId === "string"
              ? item.coffeeId
              : null),
          productName:
            item.name ||
            item.title ||
            item.coffeeTitle ||
            coffee.coffeeTitle ||
            coffee.title ||
            coffee.name ||
            "Coffee Item",
        };
      });
    }

    const coffee =
      order.coffeeId && typeof order.coffeeId === "object"
        ? order.coffeeId
        : {};

    return [
      {
        productId:
          coffee._id ||
          order.productId ||
          (typeof order.coffeeId === "string"
            ? order.coffeeId
            : null),
        productName:
          coffee.coffeeTitle ||
          coffee.title ||
          coffee.name ||
          order.productName ||
          order.title ||
          order.coffeeTitle ||
          order.name ||
          "Coffee Item",
      },
    ];
  };

  const products = getProducts();
  const product = products[Number(selectedProduct)];

  const userName =
    user?.name ||
    user?.username ||
    user?.fullName ||
    user?.email ||
    "Coffee Lover";

  const orderId = order?._id || order?.id;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (!user) {
      setError("Please log in before submitting a review.");
      return;
    }

    if (!orderId) {
      setError("Order details are missing. Please open the review from My Orders.");
      return;
    }

    if (!product?.productId) {
      setError(
        "The product ID is missing. Please ensure the order API returns the coffee/product ID."
      );
      return;
    }

    if (rating < 1 || rating > 5) {
      setError("Please select a star rating.");
      return;
    }

    if (!reviewText.trim()) {
      setError("Please write a few words about your experience.");
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      setError("Your login session has expired. Please log in again.");
      return;
    }

    try {
      setLoading(true);

      const baseUrl =
        import.meta.env.VITE_CLIENT_API_URL ||
        "http://localhost:3000";

      const response = await axios.post(
        `${baseUrl}/api/review/create-review`,
        {
          orderId,
          productId: product.productId,
          productName: product.productName,
          rating,
          review: reviewText.trim(),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      if (response.data?.success === false) {
        throw new Error(
          response.data?.message || "Could not submit your review."
        );
      }

      setSuccess(true);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Something went wrong while submitting your review."
      );
    } finally {
      setLoading(false);
    }
  };

  if (!order) {
    return (
      <div className="min-h-screen bg-stone-950 text-white flex flex-col items-center justify-center px-6 text-center">
        <Coffee size={48} className="text-emerald-400 mb-5" />

        <h1 className="text-3xl font-bold mb-3">
          No Order Selected
        </h1>

        <p className="text-stone-400 mb-6">
          Please select an order from your order history to write a review.
        </p>

        <button
          type="button"
          onClick={() => navigate("/my-orders")}
          className="rounded-xl bg-emerald-600 px-6 py-3 font-semibold hover:bg-emerald-500 transition"
        >
          Back to My Orders
        </button>
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen bg-stone-950 text-white flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-lg rounded-3xl border border-emerald-500/20 bg-stone-900 p-8 sm:p-10 text-center shadow-2xl">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/10">
            <CheckCircle2
              size={42}
              className="text-emerald-400"
            />
          </div>

          <h1 className="text-3xl font-bold mb-3">
            Thank You!
          </h1>

          <p className="text-stone-400 leading-7 mb-8">
            Your review has been submitted. Thank you for sharing
            your experience with Camellia Leaf.
          </p>

          <button
            type="button"
            onClick={() => navigate("/my-orders")}
            className="w-full rounded-xl bg-emerald-600 py-3.5 font-semibold hover:bg-emerald-500 transition"
          >
            Return to My Orders
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-950 text-white px-4 sm:px-6 sm:py-2">
        <button
          type="button"
          onClick={() => navigate("/my-orders")}
          className=" inline-flex items-center gap-2 text-sm bg-emerald-800 text-white rounded-xl px-4 py-2 hover:text-emerald-400 transition"
        >
          <ArrowLeft size={18} />
          Back to My Orders
        </button>
      <div className="mx-auto max-w-3xl">
        

        <div className="top-0 overflow-hidden rounded-3xl border border-stone-800 bg-stone-900 shadow-2xl">
          <div className="relative overflow-hidden bg-gradient-to-br from-emerald-950 via-stone-900 to-stone-900 px-6 py-9 sm:px-10 sm:py-12">
            <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-emerald-500/10 blur-3xl" />

            <div className="relative flex flex-row items-center gap-10">
              <div className="mb-1 flex h-14 w-14 items-center justify-center rounded-2xl border border-emerald-400/20 bg-emerald-500/10">
                <MessageSquareText
                  size={28}
                  className="text-emerald-400"
                />
              </div>

              <div><p className="mb-2 text-xs font-bold uppercase tracking-[0.25em] text-emerald-400">
                Camellia Leaf Tea Co.
              </p>

              <h1 className="mb-3 text-3xl font-bold sm:text-4xl">
                Share Your Experience
              </h1>

              <p className="max-w-lg text-sm leading-6 text-stone-400 sm:text-base">
                Your feedback helps us make every cup more special.
                Tell us what you thought of your coffee.
              </p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-2  sm:p-6">
            <div className="rounded-2xl border border-stone-800 bg-stone-950/70 p-5">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-stone-500">
                Reviewing as
              </p>

              <p className="font-semibold text-stone-100">
                {userName}
              </p>

              {user?.email && (
                <p className="mt-1 break-all text-sm text-stone-400">
                  {user.email}
                </p>
              )}

              <div className="mt-4 border-t border-stone-800 pt-4">
                <p className="text-xs uppercase tracking-wider text-stone-500">
                  Order reference
                </p>

                <p className="mt-1 break-all text-sm text-emerald-400">
                  #{orderId || "N/A"}
                </p>
              </div>
            </div>

            {products.length > 1 && (
              <div>
                <label
                  htmlFor="review-product"
                  className="mb-3 block text-sm font-semibold text-stone-200"
                >
                  Choose a product to review
                </label>

                <select
                  id="review-product"
                  value={selectedProduct}
                  onChange={(event) => {
                    setSelectedProduct(event.target.value);
                    setRating(0);
                    setHoverRating(0);
                    setReviewText("");
                  }}
                  className="w-full rounded-xl border border-stone-700 bg-stone-950 px-4 py-3 text-white outline-none focus:border-emerald-500"
                >
                  {products.map((item, index) => (
                    <option key={`${item.productId}-${index}`} value={index}>
                      {item.productName}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div className="rounded-2xl border border-stone-800 bg-stone-950/50 p-5 sm:p-6">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10">
                  <Coffee size={27} className="text-emerald-400" />
                </div>

                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-wider text-stone-500">
                    Your purchase
                  </p>

                  <h2 className="mt-1 break-words text-lg font-bold">
                    {product?.productName || "Coffee Item"}
                  </h2>

                  <p className="mt-1 text-xs text-stone-500">
                    Order #{String(orderId).slice(-10)}
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="mb-2 text-lg font-bold">
                How was your experience?
              </h2>

              <p className="mb-5 text-sm text-stone-400">
                Select a rating from 1 to 5 stars.
              </p>

              <div className="flex flex-wrap items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    aria-label={`Rate ${star} out of 5 stars`}
                    aria-pressed={rating === star}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    onFocus={() => setHoverRating(star)}
                    onBlur={() => setHoverRating(0)}
                    onClick={() => setRating(star)}
                    className="rounded-lg p-1 transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <Star
                      size={34}
                      className={
                        star <= (hoverRating || rating)
                          ? "fill-amber-400 text-amber-400"
                          : "text-stone-600"
                      }
                    />
                  </button>
                ))}

                <span className="ml-2 text-sm font-medium text-amber-400">
                  {rating === 0
                    ? "Choose a rating"
                    : [
                        "",
                        "Poor",
                        "Fair",
                        "Good",
                        "Very good",
                        "Excellent!",
                      ][rating]}
                </span>
              </div>
            </div>

            <div>
              <label
                htmlFor="review-text"
                className="mb-3 block text-lg font-bold"
              >
                Write your review
              </label>

              <textarea
                id="review-text"
                value={reviewText}
                onChange={(event) =>
                  setReviewText(event.target.value.slice(0, 100))
                }
                placeholder="Tell us about the taste, aroma, quality, and your overall experience..."
                rows={2}
                maxLength={100}
                required
                className="w-full resize-y rounded-2xl border border-stone-700 bg-stone-950 px-4 py-4 text-sm leading-7 text-white placeholder:text-stone-600 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10"
              />

              <p className="mt-2 text-right text-xs text-stone-500">
                {reviewText.length}/1000 characters
              </p>
            </div>

            {error && (
              <div
                role="alert"
                className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400"
              >
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-4 font-bold text-white transition hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? (
                "Submitting Review..."
              ) : (
                <>
                  <Send size={18} />
                  Submit Review
                </>
              )}
            </button>

            <p className="text-center text-xs leading-5 text-stone-500">
              Thank you for being part of the Camellia Leaf community.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Review;
