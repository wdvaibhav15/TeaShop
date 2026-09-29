import React from "react";
import useProductsData from "../hooks/useProductsData";

const MostLiked = () => {
  const { items, loading } = useProductsData();

  const mostLikedItems = items.slice(0, 4);

  if (loading) {
    return (
      <div className="text-center py-10 text-white">
        Loading...
      </div>
    );
  }

  return (
    <section className="bg-black py-16">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-12">
          <span className="inline-block px-4 py-2 rounded-full bg-emerald-900/30 text-emerald-400 text-sm">
            Most Liked
          </span>

          <h2 className="text-4xl font-bold text-white mt-5">
            CUSTOMER FAVORITES
          </h2>

          <p className="text-stone-400 mt-3">
            Most loved coffees by our customers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {mostLikedItems.map((item) => (
            <div
              key={item._id}
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
                src={item.imageUrl || item.image}
                alt={item.coffeeTitle || item.name}
                className="w-full h-56 object-cover"
              />

              <div className="p-4">
                <p className="text-emerald-500 uppercase text-xs tracking-widest mb-2">
                  {item.category || "Coffee"}
                </p>

                <h3 className="text-xl font-bold text-white mb-2">
                  {item.coffeeTitle || item.name}
                </h3>

                <p className="text-stone-400 text-sm line-clamp-3">
                  {item.description}
                </p>

                <p className="text-emerald-500 font-bold text-lg mt-3">
                  ${item.price}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default MostLiked;