import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Heart,
  ShoppingBag,
  Trash2,
  ArrowRight,
  Check,
} from "lucide-react";

const WishlistPage = () => {
  const [wishlistItems, setWishlistItems] = useState([
    {
      id: 1,
      name: "Darjeeling Tea",
      category: "Black Tea",
      description: "Premium tea from Darjeeling hills.",
      price: 34,
      image:
        "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 2,
      name: "Matcha Green Tea",
      category: "Matcha",
      description: "Rich and smooth ceremonial matcha.",
      price: 48,
      image:
        "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 3,
      name: "Oolong Reserve",
      category: "Oolong",
      description: "Floral aroma with a naturally sweet finish.",
      price: 42,
      image:
        "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 4,
      name: "Assam Gold",
      category: "Black Tea",
      description: "Strong and malty tea from Assam estates.",
      price: 29,
      image:
        "https://images.unsplash.com/photo-1515823064-d6e0c04616a7?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 5,
      name: "White Peony",
      category: "White Tea",
      description: "Light floral tea with delicate sweetness.",
      price: 39,
      image:
        "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 6,
      name: "Jasmine Green",
      category: "Green Tea",
      description: "Fresh green tea scented with jasmine blossoms.",
      price: 32,
      image:
        "https://images.unsplash.com/photo-1512568400610-62da28bc8a13?auto=format&fit=crop&w=800&q=80",
    },
  ]);

  const [toastMessage, setToastMessage] = useState("");

  const handleRemove = (id) => {
    setWishlistItems((prev) =>
      prev.filter((item) => item.id !== id)
    );

    setToastMessage("Item removed from wishlist");

    setTimeout(() => {
      setToastMessage("");
    }, 3000);
  };

  const handleOrderNow = (product) => {
    setToastMessage(`${product.name} added for checkout`);

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

          <h1 className="text-4xl md:text-5xl font-bold text-white mt-5">
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
                key={product.id}
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
                  src={product.image}
                  alt={product.name}
                  className="w-full h-40 object-cover"
                />

                <div className="p-4">
                  <p className="text-emerald-500 uppercase text-xs tracking-widest mb-2">
                    {product.category}
                  </p>

                  <h3 className="text-xl font-bold text-white mb-2">
                    {product.name}
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
                      onClick={() => handleRemove(product.id)}
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