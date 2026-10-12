// import React, { useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { removeFromWishlist } from "../redux/wishlistSlice";
// import { addToCart } from "../redux/cartSlice";
// import { Link } from "react-router-dom";
// import { Heart,ShoppingBag, Trash2, ArrowRight, Check,} from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import { setItems } from "../redux/productSlice";

// const WishlistPage = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

// const wishlistItems = useSelector((state) => state.wishlist.wishlistItems );
// console.log("Wishlist Items:", wishlistItems); // Debugging line

//   const [toastMessage, setToastMessage] = useState("");


//   const handleRemove = (id) => {

//   dispatch(removeFromWishlist(id));
//   setToastMessage("Item removed from wishlist");

//   setTimeout(() => {
//     setToastMessage("");
//   }, 3000);
// };

//   const handleOrderNow = (product) => {
//   dispatch(addToCart(product));
//   navigate(`/order/${product._id}`)
//   setToastMessage(
//     `${product.coffeeTitle || product.name} added to cart`
//   );

//   setTimeout(() => {
//     setToastMessage("");
//   }, 3000);
// };

//   return (
//     <div className="min-h-screen bg-black py-5">
//       <div className="max-w-6xl mx-auto px-4">

//         {/* Toast */}
//         {toastMessage && (
//           <div className="fixed top-5 right-5 z-50 bg-emerald-700 text-white px-5 py-3 rounded-xl shadow-lg flex items-center gap-2">
//             <Check size={18} />
//             {toastMessage}
//           </div>
//         )}

//         {/* Header */}
//         <div className="text-center ">
          

//           <h1 className="text-2xl md:text-3xl font-bold text-white mt-5 mb-10">
//             YOUR WISHLIST COLLECTION ({wishlistItems.length})
//           </h1>

          
//         </div>

//         {/* Empty State */}
//         {wishlistItems.length === 0 ? (
//           <div className="text-center py-20 border border-stone-800 rounded-3xl">
//             <Heart
//               size={60}
//               className="mx-auto text-stone-600 mb-5"
//             />

//             <h2 className="text-3xl font-bold text-white mb-4">
//               Wishlist Empty
//             </h2>

//             <p className="text-stone-400 mb-8">
//               Add your favorite teas to the wishlist.
//             </p>

//             <Link
//               to="/menu"
//               className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-800 hover:bg-emerald-900 rounded-xl text-white"
//             >
//               Explore Collection
//               <ArrowRight size={18} />
//             </Link>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
//             {wishlistItems.map((product) => (
//               <div
//                 key={product._id}
//                 className="
//                   bg-black
//                   border
//                   border-stone-700
//                   rounded-3xl
//                   overflow-hidden
//                   hover:border-emerald-600
//                   hover:-translate-y-1
//                   transition-all
//                   duration-300
//                 "
//               >
//                 <img
//                   src={product.imageUrl || product.image}
//                   alt={product.name}
//                   className="w-full h-60 object-cover"
//                 />

//                 <div className="p-4">
//                   <p className="text-emerald-500 uppercase text-xs tracking-widest mb-2">
//                     {product.category || "Coffee"}
//                   </p>

//                   <h3 className="text-xl font-bold text-white mb-2">
//                     {product.coffeeTitle || product.name}
//                   </h3>

//                   <p className="text-stone-400 text-sm mb-4 min-h-[40px]">
//                     {product.description}
//                   </p>

//                   <div className="flex items-center justify-between mb-4">
//                     <span className="text-2xl font-bold text-emerald-500">
//                       ₹{product.price}
//                     </span>

//                     <span className="text-stone-500 text-sm">
//                       50g Pack
//                     </span>
//                   </div>

//                   <div className="flex gap-2">
//                     <button
//                       onClick={() => handleOrderNow(product)}
//                       className="
//                         flex-1
//                         py-2.5
//                         rounded-xl
//                         bg-emerald-800
//                         hover:bg-emerald-900
//                         text-white
//                         text-sm
//                         font-semibold
//                         flex
//                         items-center
//                         justify-center
//                         gap-2
//                         transition-all
//                       "
//                     >
//                       <ShoppingBag size={16} />
//                       Order Now
//                     </button>

//                     <button
//                       onClick={() => handleRemove(product._id)}
//                       className="
//                         w-11
//                         h-11
//                         rounded-xl
//                         border
//                         border-stone-700
//                         text-red-500
//                         hover:bg-red-950
//                         flex
//                         items-center
//                         justify-center
//                         transition-all
//                       "
//                     >
//                       <Trash2 size={16} />
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default WishlistPage;

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromWishlist } from "../redux/wishlistSlice";
import { addToCart } from "../redux/cartSlice";
import { Link, useNavigate } from "react-router-dom";
import {
  Heart,
  ShoppingBag,
  Trash2,
  ArrowRight,
  Check,
} from "lucide-react";
import toast from "react-hot-toast";

const WishlistPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const wishlistItems = useSelector(
    (state) => state.wishlist?.wishlistItems || []
  );

  const [toastMessage, setToastMessage] = useState("");

  // Automatically clear the custom notification
  useEffect(() => {
    if (!toastMessage) return;

    const timer = setTimeout(() => {
      setToastMessage("");
    }, 2500);

    return () => clearTimeout(timer);
  }, [toastMessage]);

  // Remove from wishlist
  const handleRemove = (id) => {
    dispatch(removeFromWishlist(id));
    setToastMessage("Item removed from wishlist");
    toast.success("Item removed from wishlist");
  };

  // Add item to cart and navigate to order page
  const handleOrderNow = (product) => {
    dispatch(addToCart(product));
    setToastMessage(
      `${product.coffeeTitle || product.title || product.name || "Item"} added to cart`
    );
    navigate(`/order/${product._id}`);
  };

  const DEFAULT_IMAGE =
    "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=800&auto=format&fit=crop";

  return (
    <main className="min-h-screen overflow-x-hidden bg-black py-6 text-white sm:py-8">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">

        {/* Toast Notification */}
        {toastMessage && (
          <div
            role="status"
            className="fixed left-4 right-4 top-4 z-50 mx-auto flex max-w-sm items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-800 px-4 py-3 text-sm text-white shadow-xl sm:left-auto sm:right-5"
          >
            <Check size={18} className="shrink-0" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Page Heading */}
        <header className="mb-7 mt-3 text-center sm:mb-10">
          <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-full bg-emerald-900/40 text-emerald-400">
            <Heart size={25} />
          </div>

          <h1 className="font-serif text-2xl font-bold uppercase tracking-wide sm:text-3xl lg:text-4xl">
            Your Wishlist Collection
          </h1>

          <p className="mt-2 text-sm text-stone-400 sm:text-base">
            {wishlistItems.length}{" "}
            {wishlistItems.length === 1 ? "favorite item" : "favorite items"}
          </p>
        </header>

        {/* Empty Wishlist */}
        {wishlistItems.length === 0 ? (
          <section className="rounded-2xl border border-stone-800 px-4 py-14 text-center sm:rounded-3xl sm:py-20">
            <Heart
              size={52}
              className="mx-auto mb-5 text-stone-600"
            />

            <h2 className="font-serif text-2xl font-bold sm:text-3xl">
              Wishlist Empty
            </h2>

            <p className="mx-auto mb-7 mt-3 max-w-md text-sm leading-6 text-stone-400 sm:text-base">
              Keep track of your favorite coffees and teas by adding
              them to your wishlist.
            </p>

            <Link
              to="/menu"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-600 sm:text-base"
            >
              Explore Collection
              <ArrowRight size={18} />
            </Link>
          </section>
        ) : (
          <>
            {/* Mobile: Horizontal rows. Desktop: Responsive grid */}
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-6 xl:grid-cols-3">

              {wishlistItems.map((product) => {
                const title =
                  product.coffeeTitle ||
                  product.title ||
                  product.name ||
                  "Specialty Coffee";

                const image =
                  product.imageUrl ||
                  product.image ||
                  DEFAULT_IMAGE;

                return (
                  <article
                    key={product._id}
                    className="group flex min-w-0 flex-row overflow-hidden rounded-2xl border border-stone-700 bg-stone-950 transition-colors duration-300 hover:border-emerald-600 sm:rounded-3xl"
                  >
                    {/* Product Image - Left Side */}
                    <div className="relative w-28 shrink-0 self-stretch overflow-hidden sm:w-36 lg:w-40">
                      <img
                        src={image}
                        alt={title}
                        loading="lazy"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = DEFAULT_IMAGE;
                        }}
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>

                    {/* Product Details - Right Side */}
                    <div className="flex min-w-0 flex-1 flex-col p-3 sm:p-4">

                      <p className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-emerald-500 sm:text-xs">
                        {product.category || "Coffee"}
                      </p>

                      <h2 className="break-words font-serif text-base font-bold leading-snug text-white sm:text-lg">
                        {title}
                      </h2>

                      <p className="mt-1 line-clamp-2 text-xs leading-5 text-stone-400 sm:text-sm">
                        {product.description ||
                          "Discover this handcrafted blend."}
                      </p>

                      {/* Price and Pack Size */}
                      <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
                        <span className="text-xl font-bold text-emerald-500 sm:text-2xl">
                          ₹{Number(product.price || 0).toFixed(0)}
                        </span>

                        <span className="text-[11px] text-stone-500 sm:text-xs">
                          50g Pack
                        </span>
                      </div>

                      {/* Action Buttons */}
                      <div className="mt-3 flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleOrderNow(product)}
                          className="flex min-w-0 flex-1 items-center justify-center gap-1.5 rounded-lg bg-emerald-800 px-2 py-2.5 text-xs font-semibold text-white transition hover:bg-emerald-700 sm:gap-2 sm:rounded-xl sm:text-sm"
                        >
                          <ShoppingBag size={15} className="shrink-0" />
                          <span className="truncate">Order Now</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleRemove(product._id)}
                          aria-label={`Remove ${title} from wishlist`}
                          title="Remove from wishlist"
                          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-stone-700 text-red-500 transition hover:border-red-500 hover:bg-red-950/40 sm:rounded-xl"
                        >
                          <Trash2 size={17} />
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            {/* Continue Shopping */}
            <div className="mt-8 text-center sm:mt-10">
              <button
                type="button"
                onClick={() => navigate("/menu")}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-stone-700 px-5 py-3 text-sm font-semibold text-stone-200 transition hover:border-emerald-600 hover:bg-stone-900 sm:text-base"
              >
                Continue Shopping
                <ArrowRight size={18} />
              </button>
            </div>
          </>
        )}
      </div>
    </main>
  );
};

export default WishlistPage;
