import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromWishlist } from "../redux/wishlistSlice";
import { addToCart } from "../redux/cartSlice";
import { Link } from "react-router-dom";
import { Heart,ShoppingBag, Trash2, ArrowRight, Check,} from "lucide-react";

const WishlistPage = () => {
  const dispatch = useDispatch();

const wishlistItems = useSelector((state) => state.wishlist.wishlistItems );

  const [toastMessage, setToastMessage] = useState("");

  const handleRemove = (id) => {
  dispatch(removeFromWishlist(id));

  setToastMessage("Item removed from wishlist");

  setTimeout(() => {
    setToastMessage("");
  }, 3000);
};

  const handleOrderNow = (product) => {
  dispatch(addToCart(product));

  setToastMessage(
    `${product.coffeeTitle || product.name} added to cart`
  );

  setTimeout(() => {
    setToastMessage("");
  }, 3000);
};

  return (
    <div className="min-h-screen bg-black py-12">
      <div className="max-w-6xl mx-auto px-4">

        {/* Toast */}
        {toastMessage && (
          <div className="fixed top-5 right-5 z-50 bg-emerald-700 text-white px-5 py-3 rounded-xl shadow-lg flex items-center gap-2">
            <Check size={18} />
            {toastMessage}
          </div>
        )}

        {/* Header */}
        <div className="text-center mb-10">
          <span className="inline-block px-4 py-2 rounded-full bg-emerald-900/30 text-emerald-400 text-sm">
            Personal Tea Cellar
          </span>

          <h1 className="text-2xl md:text-3xl font-bold text-white mt-5">
            SAVED WISHLIST ({wishlistItems.length})
          </h1>

          <p className="text-stone-400 mt-3">
            Your favorite teas ready for purchase
          </p>
        </div>

        {/* Empty State */}
        {wishlistItems.length === 0 ? (
          <div className="text-center py-20 border border-stone-800 rounded-3xl">
            <Heart
              size={60}
              className="mx-auto text-stone-600 mb-5"
            />

            <h2 className="text-3xl font-bold text-white mb-4">
              Wishlist Empty
            </h2>

            <p className="text-stone-400 mb-8">
              Add your favorite teas to the wishlist.
            </p>

            <Link
              to="/products"
              className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-800 hover:bg-emerald-900 rounded-xl text-white"
            >
              Explore Collection
              <ArrowRight size={18} />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {wishlistItems.map((product) => (
              <div
                key={product._id}
                className="
                  bg-black
                  border
                  border-stone-700
                  rounded-3xl
                  overflow-hidden
                  hover:border-emerald-600
                  hover:-translate-y-1
                  transition-all
                  duration-300
                "
              >
                <img
                  src={product.imageUrl || product.image}
                  alt={product.name}
                  className="w-full h-40 object-cover"
                />

                <div className="p-4">
                  <p className="text-emerald-500 uppercase text-xs tracking-widest mb-2">
                    {product.category || "Coffee"}
                  </p>

                  <h3 className="text-xl font-bold text-white mb-2">
                    {product.coffeeTitle || product.name}
                  </h3>

                  <p className="text-stone-400 text-sm mb-4 min-h-[40px]">
                    {product.description}
                  </p>

                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold text-emerald-500">
                      ${product.price}
                    </span>

                    <span className="text-stone-500 text-sm">
                      50g Pack
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleOrderNow(product)}
                      className="
                        flex-1
                        py-2.5
                        rounded-xl
                        bg-emerald-800
                        hover:bg-emerald-900
                        text-white
                        text-sm
                        font-semibold
                        flex
                        items-center
                        justify-center
                        gap-2
                        transition-all
                      "
                    >
                      <ShoppingBag size={16} />
                      Order Now
                    </button>

                    <button
                      onClick={() => handleRemove(product._id)}
                      className="
                        w-11
                        h-11
                        rounded-xl
                        border
                        border-stone-700
                        text-red-500
                        hover:bg-red-950
                        flex
                        items-center
                        justify-center
                        transition-all
                      "
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;