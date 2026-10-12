import React, { useEffect, useRef } from "react";
import VanillaTilt from "vanilla-tilt";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { Search, ShoppingBag } from "lucide-react";
import { FaHeart } from "react-icons/fa";

import { addToCart } from "../redux/cartSlice";
import {
  addToWishlist,
  removeFromWishlist,
} from "../redux/wishlistSlice";
import { setSearchTerm } from "../redux/searchSlice";
import useProductsData from "../hooks/useProductsData";

const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=800&auto=format&fit=crop";

// Tilt effect for desktop and hover-capable devices.
const TiltCard = ({ children, className }) => {
  const tiltRef = useRef(null);

  useEffect(() => {
    const node = tiltRef.current;

    if (
      !node ||
      !window.matchMedia("(hover: hover) and (pointer: fine)").matches
    ) {
      return undefined;
    }

    VanillaTilt.init(node, {
      max: 6,
      speed: 400,
      glare: true,
      "max-glare": 0.12,
      scale: 1.01,
    });

    return () => {
      node.vanillaTilt?.destroy();
    };
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

  const {
    items = [],
    loading,
    error,
  } = useProductsData();

  const wishlistItems = useSelector(
    (state) => state.wishlist?.wishlistItems || []
  );

  const searchTerm = useSelector(
    (state) => state.search?.searchTerm || ""
  );

  // Toggle wishlist item.
  const handleWishlist = (item) => {
    const exists = wishlistItems.some(
      (product) => product._id === item._id
    );

    if (exists) {
      dispatch(removeFromWishlist(item._id));
      toast.success("Removed from wishlist");
    } else {
      dispatch(addToWishlist(item));
      toast.success("Added to wishlist");
    }
  };

  // Add product to cart.
  const handleAddToCart = (item) => {
    const stock = Number(
      item.stockCount ?? item.stock ?? 0
    );

    if (stock <= 0 || item.isAvailable === false) {
      toast.error("This item is currently unavailable");
      return;
    }

    dispatch(addToCart(item));
    toast.success("Item added to cart");
  };

  // Filter by name, description, category, or price.
  const normalizedSearch = searchTerm.trim().toLowerCase();

  const filteredItems = items.filter((item) => {
    const searchableText = [
      item.coffeeTitle,
      item.title,
      item.name,
      item.description,
      item.category,
      item.price,
    ]
      .filter((value) => value !== null && value !== undefined)
      .join(" ")
      .toLowerCase();

    return searchableText.includes(normalizedSearch);
  });

  if (loading) {
    return (
      <main className="min-h-screen bg-black px-4 py-16 text-center text-sm text-stone-300">
        Loading menu items...
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-black px-4 py-16 text-center text-sm text-red-400">
        {error}
      </main>
    );
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-black pb-10 pt-5 text-white sm:pt-8">
      <div className="mx-auto w-full max-w-[1600px] px-3 sm:px-5 lg:px-8">

        {/* Search bar: mobile only */}
        <div className="mx-auto mb-6 w-full max-w-md sm:mb-8 sm:max-w-lg md:hidden">
          <label
            htmlFor="menu-search"
            className="sr-only"
          >
            Search menu items
          </label>

          <div className="relative">
            <Search
              size={18}
              aria-hidden="true"
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400"
            />

            <input
              id="menu-search"
              type="search"
              value={searchTerm}
              onChange={(event) =>
                dispatch(setSearchTerm(event.target.value))
              }
              placeholder="Search teas, coffee, origins..."
              className="w-full rounded-full border border-stone-800 bg-stone-950 py-2.5 pl-10 pr-4 text-sm text-white outline-none transition placeholder:text-stone-500 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-800/30 sm:py-3"
            />
          </div>
        </div>

        {/* Page heading */}
        <header className="mb-7 text-center sm:mb-9">
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-emerald-500 sm:text-xs">
            Crafted with care
          </p>

          <h1 className="font-serif text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
            Coffee &amp; Menu
          </h1>

          <p className="mx-auto mt-2 max-w-2xl px-2 text-xs leading-5 text-stone-400 sm:text-sm sm:leading-6 lg:text-base">
            Explore our carefully curated selection of handcrafted
            brews, artisanal roasts, and signature blends.
          </p>
        </header>

        {/* Responsive product grid */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 min-[420px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 lg:gap-5">
            {filteredItems.map((item) => {
              const stock = Number(
                item.stockCount ?? item.stock ?? 0
              );

              const inStock =
                stock > 0 && item.isAvailable !== false;

              const title =
                item.coffeeTitle ||
                item.title ||
                item.name ||
                "Specialty Brew";

              const image =
                item.imageUrl ||
                item.image ||
                DEFAULT_IMAGE;

              const isWishlisted = wishlistItems.some(
                (product) => product._id === item._id
              );

              return (
                <TiltCard
                  key={item._id}
                  className="group flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-stone-800 bg-stone-950 shadow-lg transition-colors duration-300 hover:border-emerald-700"
                >
                  {/* Product image */}
                  <div className="relative h-44 overflow-hidden min-[420px]:h-36 sm:h-44 xl:h-40 2xl:h-48">
                    <img
                      src={image}
                      alt={title}
                      loading="lazy"
                      onError={(event) => {
                        event.currentTarget.onerror = null;
                        event.currentTarget.src = DEFAULT_IMAGE;
                      }}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                    {/* Category */}
                    <span className="absolute bottom-2 left-2 rounded-full border border-white/10 bg-black/75 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-wider text-emerald-400 sm:text-[10px]">
                      {item.category || "Coffee"}
                    </span>

                    {/* Wishlist button */}
                    <button
                      type="button"
                      onClick={() => handleWishlist(item)}
                      aria-label={
                        isWishlisted
                          ? `Remove ${title} from wishlist`
                          : `Add ${title} to wishlist`
                      }
                      aria-pressed={isWishlisted}
                      className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-black/75 transition hover:scale-105"
                    >
                      <FaHeart
                        size={15}
                        className={
                          isWishlisted
                            ? "text-red-500"
                            : "text-white"
                        }
                      />
                    </button>
                  </div>

                  {/* Product details */}
                  <div className="flex flex-1 flex-col p-3 sm:p-3.5">
                    <h2 className="line-clamp-1 break-words font-serif text-base font-bold text-white sm:text-lg">
                      {title}
                    </h2>

                    <p className="mt-1.5 line-clamp-3 min-h-[3.75rem] text-xs leading-5 text-stone-400 sm:text-sm">
                      {item.description ||
                        "Discover our carefully selected specialty blend."}
                    </p>

                    {/* Price and pack size */}
                    <div className="mt-3 flex items-center justify-between gap-2">
                      <div className="min-w-0">
                        <p className="mb-0.5 text-[10px] text-stone-500 sm:text-xs">
                          Price
                        </p>

                        <span className="text-xl font-extrabold text-emerald-500 sm:text-2xl">
                          ₹{Number(item.price || 0).toFixed(0)}
                        </span>
                      </div>

                      <span className="shrink-0 text-[10px] text-stone-500 sm:text-xs">
                        50g Pack
                      </span>
                    </div>

                    {/* Action buttons */}
                    <div className="mt-4 flex items-stretch gap-2">
                      <button
                        type="button"
                        onClick={() => handleAddToCart(item)}
                        disabled={!inStock}
                        className={`flex min-h-9 min-w-0 flex-1 items-center justify-center gap-1.5 rounded-lg px-2 py-2 text-xs font-semibold transition sm:text-sm ${
                          inStock
                            ? "bg-emerald-800 text-white hover:bg-emerald-700"
                            : "cursor-not-allowed bg-stone-800 text-stone-500"
                        }`}
                      >
                        <ShoppingBag
                          size={14}
                          className="shrink-0"
                        />

                        <span className="truncate">
                          {inStock ? "Add To Cart" : "Out of Stock"}
                        </span>
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          navigate(`/order/${item._id}`)
                        }
                        className="min-h-9 shrink-0 rounded-lg border border-emerald-800 px-2.5 py-2 text-xs font-semibold text-emerald-400 transition hover:bg-emerald-900/40 sm:px-3 sm:text-sm"
                      >
                        Order Now
                      </button>
                    </div>
                  </div>
                </TiltCard>
              );
            })}
          </div>
        ) : (
          /* Empty search results */
          <div className="rounded-2xl border border-stone-800 px-4 py-12 text-center sm:py-16">
            <Search
              size={32}
              className="mx-auto mb-3 text-stone-600"
            />

            <h2 className="font-serif text-lg font-bold text-stone-300 sm:text-xl">
              No coffee found
            </h2>

            <p className="mt-2 text-xs text-stone-500 sm:text-sm">
              Try another name, category, price, or description.
            </p>

            {searchTerm && (
              <button
                type="button"
                onClick={() => dispatch(setSearchTerm(""))}
                className="mt-4 rounded-lg bg-emerald-800 px-4 py-2 text-xs font-semibold text-white transition hover:bg-emerald-700 sm:text-sm"
              >
                Clear Search
              </button>
            )}
          </div>
        )}
      </div>
    </main>
  );
};

export default MenuCard;
