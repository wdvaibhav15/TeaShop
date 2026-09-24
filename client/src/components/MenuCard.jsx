import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import VanillaTilt from 'vanilla-tilt';
import { useNavigate } from 'react-router-dom';

// Sub-component to handle the 3D tilt ref
const TiltCard = ({ children, className }) => {
  const tiltRef = useRef(null);

  useEffect(() => {
    const tiltNode = tiltRef.current;
    if (tiltNode) {
      VanillaTilt.init(tiltNode, {
        max: 15,          // Max tilt angle (degrees)
        speed: 400,       // Speed of tilt transition
        glare: true,      // Adds a light reflection glare effect
        'max-glare': 0.2, // Maximum glare opacity
        scale: 1.02,      // Slightly zooms in on hover
      });
    }

    // Clean up vanilla-tilt instance when unmounted
    return () => tiltNode?.vanillaTilt?.destroy();
  }, []);

  return (
    <div ref={tiltRef} className={className}>
      {children}
    </div>
  );
};

const MenuCard = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const naviagte = useNavigate();

  const DEFAULT_IMAGE =
    'https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=800&auto=format&fit=crop';

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${import.meta.env.VITE_CLIENT_API_URL}/api/coffee/get-coffees`,
          {
            withCredentials: true,
          }
        );
        console.log(response.data.coffees);
        setItems(response.data.coffees || response.data || []);
      } catch (err) {
        setError(
          err.response?.data?.message || err.message || 'Something went wrong'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchMenuItems();
  }, []);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto p-6 text-center text-gray-500">
        <div className="animate-pulse flex justify-center items-center gap-2">
          <div className="w-4 h-4 bg-emerald-500 rounded-full animate-bounce"></div>
          <span>Loading menu items...</span>
        </div>
      </div>
    );
  }

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
      {/* Header Section */}
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold text-white mb-2">Coffee & Menu</h1>
        <p className="text-gray-400 text-base max-w-4xl mx-auto leading-relaxed">
          Explore our carefully curated selection of handcrafted brews,
          artisanal roasts, and signature blends. Every cup is freshly prepared
          with premium beans to bring you rich flavors and the perfect start to
          your day.
        </p>
      </div>

      {/* Grid Section */}
      <div 
      
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items && items.length > 0 ? (
          items.map((item) => {
            const stock = item.stockCount ?? item.stock ?? 0;
            const inStock = stock > 0 && item.isAvailable !== false;
            const title = item.coffeeTitle || item.title || item.name;

            return (
              <TiltCard
                key={item._id || item.id}
                className="bg-white w-95 h-120 mb-6 rounded-2xl shadow-md hover:shadow-2xl transition-shadow duration-300 overflow-hidden border border-gray-100 flex flex-col justify-between transform-gpu"
              >
                {/* Image Section */}
                <div className="relative w-full h-64 bg-gray-100 overflow-hidden">
                  <img
                    src={item.imageUrl || item.image || DEFAULT_IMAGE}
                    alt={title}
                    className="w-full h-full object-cover object-center"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = DEFAULT_IMAGE;
                    }}
                  />
                  <span
                    className={`absolute top-3 right-3 text-xs font-semibold px-2.5 py-1 rounded-full backdrop-blur-md ${
                      inStock
                        ? 'bg-emerald-500/90 text-white'
                        : 'bg-rose-500/90 text-white'
                    }`}
                  >
                    {inStock ? `${stock} in stock` : 'Out of Stock'}
                  </span>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Title & Rating */}
                    <div className="flex justify-between items-start mb-2 gap-2">
                      <h3 className="text-xl font-bold text-gray-800 line-clamp-1">
                        {title}
                      </h3>

                      <div className="flex items-center bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-lg shrink-0">
                        <span className="text-amber-500 mr-1">★</span>
                        <span className="text-xs font-bold text-amber-700">
                          {item.rating ? Number(item.rating).toFixed(1) : 'N/A'}
                        </span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {item.description || 'No description available.'}
                    </p>
                  </div>

                  {/* Price & Add to Bag */}
                  <div className="pt-3 border-t border-gray-100 flex items-center justify-between gap-4">
                    <div>
                      <span className="text-xs text-gray-400 block font-medium">
                        Price
                      </span>
                      <span className="text-2xl font-black text-gray-900">
                        ${item.price}
                      </span>
                    </div>

                    <button
                      disabled={!inStock}
                      className={`mt-5 flex items-center justify-center gap-2 font-semibold px-5 py-2.5 rounded-xl transition-all duration-200 cursor-pointer ${
                        inStock
                          ? 'bg-slate-900 hover:bg-emerald-600 text-white shadow-md hover:shadow-lg active:scale-95'
                          : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                        />
                      </svg>
                      {inStock ? 'Add to Bag' : 'Sold Out'}
                    </button>
                  </div>
                </div>
                <button 
                onClick={()=>naviagte(`/order/${item._id}`)}
                className="text-gray-200 font-semibold py-2.5 px-5 rounded-xl bg-slate-950 hover:bg-emerald-600 transition-all duration-200 ml-2 mr-2 mb-1 cursor-pointer">
                    Order Now
                </button>
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