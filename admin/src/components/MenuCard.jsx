
import React, { useEffect, useRef } from "react";
import VanillaTilt from "vanilla-tilt";
import useMenuItems from "../hooks/useMenuItems";

// Sub-component for the 3D tilt effect
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

    // Cleanup when component unmounts
    return () => {
      tiltNode?.vanillaTilt?.destroy();
    };
  }, []);

  return (
    <div ref={tiltRef} className={className}>
      {children}
    </div>
  );
};

const MenuCard = () => {
  // API data comes from the custom hook
  const { items, loading, error } = useMenuItems();

  const DEFAULT_IMAGE =
    "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=800&auto=format&fit=crop";

  // Loading state
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto p-6 text-center text-gray-500">
        <div className="animate-pulse flex justify-center items-center gap-2">
          <div className="w-4 h-4 bg-emerald-500 rounded-full animate-bounce" />
          <span>Loading menu items...</span>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="max-w-7xl mx-auto p-6 text-center text-red-500 bg-red-50 rounded-xl border border-red-200">
        <p className="font-semibold">Error: {error}</p>

        <button
          onClick={() => window.location.reload()}
          className="mt-3 px-4 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items && items.length > 0 ? (
          items.map((item) => {
            const stock =
              item.stockCount ?? item.stock ?? 0;

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

            return (
              <TiltCard
                key={item._id || item.id}
                className="w-full mb-3 rounded-2xl bg-white shadow-md hover:shadow-2xl transition-shadow duration-300 overflow-hidden border border-gray-100 flex flex-col justify-between transform-gpu"
              >
                {/* Image Section */}
                <div className="relative w-full h-70 bg-gray-100 overflow-hidden">
                  <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover object-center"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = DEFAULT_IMAGE;
                    }}
                  />

                  <span
                    className={`absolute top-3 right-3 text-xs font-semibold px-2.5 py-1 rounded-full backdrop-blur-md ${
                      inStock
                        ? "bg-emerald-500/90 text-white"
                        : "bg-rose-500/90 text-white"
                    }`}
                  >
                    {inStock
                      ? `${stock} in stock`
                      : "Out of Stock"}
                  </span>
                </div>

                {/* Content Section */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Title and Rating */}
                    <div className="flex justify-between items-start mb-2 gap-2">
                      <h3 className="text-xl font-bold text-gray-800 line-clamp-1">
                        {title}
                      </h3>

                      <div className="flex items-center bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-lg shrink-0">
                        <span className="text-amber-500 mr-1">
                          ★
                        </span>

                        <span className="text-xs font-bold text-amber-700">
                          {item.rating != null &&
                          item.rating !== ""
                            ? Number(item.rating).toFixed(1)
                            : "N/A"}
                        </span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {item.description ||
                        "No description available."}
                    </p>
                  </div>

                  {/* Price Section */}
                  <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                    <span className="text-sm text-gray-500 font-medium">
                      Price
                    </span>

                    <span className="text-2xl font-black text-gray-900">
                      ₹
                      {item.price != null
                        ? Number(item.price).toFixed(2)
                        : "0.00"}
                    </span>
                  </div>
                </div>
              </TiltCard>
            );
          })
        ) : (
          <p className="col-span-full text-center text-gray-500 py-12">
            No menu items found in database.
          </p>
        )}
      </div>
    </div>
  );
};

export default MenuCard;
