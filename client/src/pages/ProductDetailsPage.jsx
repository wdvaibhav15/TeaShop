import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { Star, ShoppingBag, CheckCircle2, AlertCircle, ChevronRight } from "lucide-react";

const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=800&auto=format&fit=crop";

const ProductDetailsPage = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fallback to localhost:3000 if env variable is undefined
        const baseUrl = import.meta.env.VITE_CLIENT_API_URL || "http://localhost:3000";

        const response = await axios.get(
          `${baseUrl}/api/coffee/get-coffees/${id}`,
          { withCredentials: true }
        );

        // Safely extract the coffee item from backend response wrapper
        const data = response.data.coffee || response.data.data || response.data;
        setProduct(data);
      } catch (err) {
        console.error("Error fetching product details:", err);
        setError(
          err.response?.data?.message || err.message || "Failed to load coffee details."
        );
      } finally {
        // FIXED: Runs on BOTH success and error to prevent infinite loading
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    } else {
      setLoading(false);
      setError("No product ID provided in URL.");
    }

    setQuantity(1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  // Loading State
  if (loading) {
    return (
      <div className="py-24 text-center text-stone-500">
        <div className="animate-pulse flex justify-center items-center gap-2">
          <div className="w-4 h-4 bg-emerald-600 rounded-full animate-bounce"></div>
          <span>Loading coffee...</span>
        </div>
      </div>
    );
  }

  // Error State
  if (error || !product) {
    return (
      <div className="py-20 max-w-md mx-auto text-center px-4">
        <div className="p-6 bg-red-50 dark:bg-stone-850 rounded-2xl border border-red-200 dark:border-stone-700">
          <AlertCircle className="w-8 h-8 text-red-500 mx-auto mb-2" />
          <h2 className="text-lg font-bold text-red-600 mb-1">Coffee Not Found</h2>
          <p className="text-xs text-stone-600 dark:text-stone-400 mb-4">
            {error || "Item does not exist."}
          </p>
          <Link
            to="/shop"
            className="px-4 py-2 bg-emerald-800 text-white text-xs font-semibold rounded-xl hover:bg-emerald-900 transition-colors inline-block"
          >
            Back to Menu
          </Link>
        </div>
      </div>
    );
  }

  // Safe normalized variables for display
  const title = product.title || product.coffeeTitle || product.name || "Specialty Brew";
  const image = product.image || product.imageUrl || DEFAULT_IMAGE;
  const stock = Number(product.stock ?? product.stockCount ?? 0);
  const inStock = stock > 0;

  // Safe numerical formatting to prevent runtime crashed
  const price =
    product.price != null && !isNaN(product.price)
      ? Number(product.price).toFixed(2)
      : "0.00";

  const rating =
    product.rating != null && !isNaN(product.rating)
      ? Number(product.rating).toFixed(1)
      : "N/A";

  const handleAddToBag = () => {
    const itemToAdd = {
      id: product._id || product.id,
      title,
      price: Number(price),
      image,
      quantity,
    };

    console.log("Added to bag:", itemToAdd);
    alert(`Added ${quantity} x ${title} to your bag!`);
  };

  return (
    <div className="py-8 md:py-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Navigation Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-stone-500">
        <Link to="/" className="hover:text-emerald-800">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link to="/shop" className="hover:text-emerald-800">
          Menu
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-stone-900 dark:text-stone-100 font-semibold truncate max-w-[200px]">
          {title}
        </span>
      </nav>

      {/* Two-Column Product Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
        {/* LEFT SIDE: Product Image */}
        <div className="aspect-square rounded-3xl overflow-hidden bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-800 shadow-md">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover object-center"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = DEFAULT_IMAGE;
            }}
          />
        </div>

        {/* RIGHT SIDE: Details & Cart Controls */}
        <div className="space-y-6">
          {/* Rating */}
          <div className="flex items-center gap-1.5 text-amber-500 text-sm">
            <Star className="w-4 h-4 fill-current" />
            <span className="font-bold text-stone-900 dark:text-stone-100">{rating}</span>
            <span className="text-stone-400 text-xs ml-1">(Rating)</span>
          </div>

          {/* Title */}
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 dark:text-stone-100 tracking-tight leading-tight">
            {title}
          </h1>

          {/* description */}
          <h1 className="font-serif text-xl font-medium text-stone-900 dark:text-stone-100 tracking-tight leading-tight">
            {product.description}
          </h1>


          {/* Price & Stock Status */}
          <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-900 dark:bg-stone-850 border border-stone-200/80 dark:border-stone-800">
            <span className="text-3xl font-bold text-stone-900 dark:text-stone-100">
              ${price}
            </span>

            <div>
              {inStock ? (
                <span className="text-emerald-700 dark:text-emerald-400 font-semibold text-xs flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" /> In Stock ({stock} left)
                </span>
              ) : (
                <span className="text-red-500 font-semibold text-xs flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" /> Out of Stock
                </span>
              )}
            </div>
          </div>

          {/* Quantity Controls & Add to Bag */}
          <div className="space-y-3 pt-2">
            <label className="text-xs font-semibold text-stone-500 uppercase tracking-wider block">
              Quantity
            </label>
            <div className="flex items-center gap-4">
              {/* Quantity Selector */}
              <div className="flex items-center border border-stone-200 dark:border-stone-700 rounded-2xl bg-white dark:bg-stone-800 p-1">
                <button
                  type="button"
                  disabled={!inStock || quantity <= 1}
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-10 h-10 flex items-center justify-center text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-700 rounded-xl text-lg font-bold disabled:opacity-40"
                >
                  -
                </button>
                <span className="w-10 text-center text-sm font-bold text-stone-900 dark:text-stone-100">
                  {quantity}
                </span>
                <button
                  type="button"
                  disabled={!inStock || quantity >= stock}
                  onClick={() => setQuantity((q) => Math.min(stock, q + 1))}
                  className="w-10 h-10 flex items-center justify-center text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-700 rounded-xl text-lg font-bold disabled:opacity-40"
                >
                  +
                </button>
              </div>

              {/* Add to Bag Button */}
              <button
                type="button"
                onClick={handleAddToBag}
                disabled={!inStock}
                className="flex-1 py-3.5 px-6 rounded-2xl bg-emerald-800 hover:bg-emerald-900 active:scale-95 disabled:bg-stone-300 disabled:cursor-not-allowed text-white text-sm font-semibold shadow-lg shadow-emerald-900/20 flex items-center justify-center gap-2 transition-all"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>{inStock ? "Add to Bag" : "Out of Stock"}</span>
              </button>

            </div>

            <button 
                onClick={()=>naviagte(`/order/${item._id}`)}
                className="flex-1 w-full mt-8 py-3.5 px-6 rounded-2xl bg-emerald-800 hover:bg-emerald-900 active:scale-95 disabled:bg-stone-300 disabled:cursor-not-allowed text-white text-sm font-semibold shadow-lg shadow-emerald-900/20 flex items-center justify-center gap-2 transition-all">
                Order Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;