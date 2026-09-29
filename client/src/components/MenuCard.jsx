import React, { useEffect, useRef } from "react";
import VanillaTilt from "vanilla-tilt";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { addToCart } from "../redux/cartSlice";
import { addToWishlist, removeFromWishlist } from "../redux/wishlistSlice";

import { FaHeart } from "react-icons/fa";

import useProductsData from "../hooks/useProductsData";

const TiltCard = ({ children, className }) => {
  const tiltRef = useRef(null);

  useEffect(() => {
    const tiltNode = tiltRef.current;

    if (tiltNode) {
      VanillaTilt.init(tiltNode, {
        max: 15,
        speed: 400,
        glare: true,
        "max-glare": 0.2,
        scale: 1.02,
      });
    }

    return () => tiltNode?.vanillaTilt?.destroy();
  }, []);

  return (
    <div ref={tiltRef} className={className}>
      {children}
    </div>
  );
};

const MenuCard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Data comes from custom hook
  const { items, loading, error } = useProductsData();

  const wishlistItems = useSelector((state) => state.wishlist.wishlistItems);

  const DEFAULT_IMAGE =
    "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=800&auto=format&fit=crop";

  const handleWishlist = (item) => {
    const exists = wishlistItems.find((product) => product._id === item._id);

    if (exists) {
      dispatch(removeFromWishlist(item._id));
    } else {
      dispatch(addToWishlist(item));
    }
  };

  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto p-6 text-center">
        <p>Loading menu items...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto p-6 text-center text-red-500">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-14 text-center">
        <h1 className="text-3xl font-bold text-white mb-4">Coffee & Menu</h1>

        <p className="text-gray-400 text-base max-w-4xl mx-auto">
          Explore our carefully curated selection of handcrafted brews,
          artisanal roasts, and signature blends.
        </p>
      </div>

      <div className="grid mt-[-2rem] grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {items?.map((item) => {
          const stock = item.stockCount ?? item.stock ?? 0;

          const inStock = stock > 0 && item.isAvailable !== false;

          const title = item.coffeeTitle || item.title || item.name;

          return (
            <TiltCard
              key={item._id}
              className="w-90 h-130 bg-gradient-to-b from-stone-900 to-black rounded-3xl overflow-hidden border border-stone-700 hover:border-emerald-500 hover:-translate-y-2 transition-all duration-300 shadow-xl "
            >
              <div className="relative">
                <div className="relative overflow-hidden h-60">
                  <img
                    src={item.imageUrl || item.image || DEFAULT_IMAGE}
                    alt={title}
                    className=" w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                </div>
              </div>

              <div className="p-5">
                <h3 className="text-2xl font-bold text-white">{title}</h3>

                <p className="text-stone-400 text-sm mt-2 line-clamp-3">
                  {item.description}
                </p>

                <div className="flex justify-between items-start mt-4">
                  {/* Left Side */}
                  <div>
                    <p className="text-stone-400 text-xs mb-1">Price</p>

                    <span className="text-3xl font-black text-white">
                      ₹{item.price}
                    </span>
                  </div>

                  {/* Right Side */}
                  <div className="flex flex-col items-end gap-3">
                    <FaHeart
                      size={24}
                      onClick={() => handleWishlist(item)}
                      className={`cursor-pointer transition-all duration-300 ${
                        wishlistItems.some(
                          (product) => product._id === item._id,
                        )
                          ? "text-red-500"
                          : "text-gray-400"
                      }`}
                    />

                    <button
                      onClick={() => handleAddToCart(item)}
                      disabled={!inStock}
                      className={`px-5 py-2font-semibold transition-all duration-300 rounded-xl
                      ${
                        inStock
                          ? "bg-white text-black hover:bg-emerald-500 hover:text-white"
                          : "bg-gray-700 text-gray-400 cursor-not-allowed "
                      }`}
                    >
                      Add To Cart
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => navigate(`/order/${item._id}`)}
                  className=" w-full mt-3 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-3 rounded-xl transition-all duration-300 "
                >
                  Order Now
                </button>
              </div>
            </TiltCard>
          );
        })}
      </div>
    </div>
  );
};

export default MenuCard;
