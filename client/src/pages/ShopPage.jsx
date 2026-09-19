import React, { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, Filter, SlidersHorizontal, ArrowUpDown, RefreshCw } from "lucide-react";

import ProductCard from "../components/ProductCard";

const ShopPage = () => {
  
  const [searchParams, setSearchParams] = useSearchParams();

  // URL Query Sync
  const categoryParam = searchParams.get("category") || "all";
  const queryParam = searchParams.get("q") || "";

  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [searchQuery, setSearchQuery] = useState(queryParam);
  const [priceRange, setPriceRange] = useState([0, 70]);
  const [sortBy, setSortBy] = useState("popularity");
  const [currentPage, setCurrentPage] = useState(1);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const ITEMS_PER_PAGE = 8;

  // Sync category param if URL changes
  useEffect(() => {
    setSelectedCategory(categoryParam);
  }, [categoryParam]);

  // Sync search param if URL changes
  useEffect(() => {
    setSearchQuery(queryParam);
  }, [queryParam]);

  // Reset pagination on filter change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchQuery, priceRange, sortBy]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        // Category filter
        if (selectedCategory !== "all" && product.category !== selectedCategory) {
          return false;
        }
        // Search filter
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchesName = product.name.toLowerCase().includes(q);
          const matchesDesc = product.description?.toLowerCase().includes(q);
          const matchesOrigin = product.origin?.toLowerCase().includes(q);
          const matchesCat = product.category?.toLowerCase().includes(q);
          if (!matchesName && !matchesDesc && !matchesOrigin && !matchesCat) {
            return false;
          }
        }
        // Price filter
        if (product.price < priceRange[0] || product.price > priceRange[1]) {
          return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === "price-asc") return a.price - b.price;
        if (sortBy === "price-desc") return b.price - a.price;
        if (sortBy === "rating") return b.rating - a.rating;
        if (sortBy === "latest") return (b.id > a.id ? 1 : -1);
        // Default: popularity (reviewsCount * rating)
        return (b.reviewsCount || 0) - (a.reviewsCount || 0);
      });
  }, [products, selectedCategory, searchQuery, priceRange, sortBy]);

  // Pagination slice
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE) || 1;
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  const handleCategorySelect = (catId) => {
    setSelectedCategory(catId);
    if (catId === "all") {
      searchParams.delete("category");
    } else {
      searchParams.set("category", catId);
    }
    setSearchParams(searchParams);
  };

  const handleResetFilters = () => {
    setSelectedCategory("all");
    setSearchQuery("");
    setPriceRange([0, 70]);
    setSortBy("popularity");
    setSearchParams({});
  };

  return (
    <div className="py-8 md:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header Banner */}
      <div className="mb-8 pb-6 border-b border-stone-200 dark:border-stone-800 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-800 dark:text-emerald-400">
            Artisanal Tea Catalog
          </span>
          <h1 className="font-serif-tea text-3xl sm:text-4xl font-bold text-stone-900 dark:text-stone-100 tracking-tight mt-1">
            Browse All Teas ({filteredProducts.length})
          </h1>
          <p className="text-stone-600 dark:text-stone-400 text-xs sm:text-sm mt-1">
            Authentic orthodox loose-leaf, stone-ground matcha, and botanical blends.
          </p>
        </div>

        {/* Mobile filter button */}
        <button
          onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
          className="md:hidden flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-stone-100 dark:bg-stone-800 text-xs font-semibold text-stone-800 dark:text-stone-200"
        >
          <SlidersHorizontal className="w-4 h-4" />
          <span>Filters & Sort</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Sidebar Filters */}
        <aside
          className={`md:col-span-3 space-y-6 ${
            mobileFilterOpen ? "block" : "hidden md:block"
          }`}
        >
          <div className="bg-white dark:bg-stone-900 p-5 rounded-3xl border border-stone-200/80 dark:border-stone-800 space-y-6 shadow-sm">
            {/* Search Input */}
            <div>
              <label className="text-xs font-bold text-stone-900 dark:text-stone-100 uppercase tracking-wider block mb-2">
                Search
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by leaf, notes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl pl-9 pr-3 py-2 text-xs text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                />
                <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-stone-900 dark:text-stone-100 uppercase tracking-wider">
                  Category
                </label>
                {selectedCategory !== "all" && (
                  <button
                    onClick={() => handleCategorySelect("all")}
                    className="text-[11px] text-emerald-700 dark:text-emerald-400 hover:underline"
                  >
                    Reset
                  </button>
                )}
              </div>
              <div className="space-y-1">
                <button
                  onClick={() => handleCategorySelect("all")}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-colors flex items-center justify-between ${
                    selectedCategory === "all"
                      ? "bg-emerald-800 text-white font-semibold"
                      : "text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800"
                  }`}
                >
                  <span>All Categories</span>
                  <span>{products.length}</span>
                </button>
                {categories.map((cat) => {
                  const count = products.filter((p) => p.category === cat.id).length;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => handleCategorySelect(cat.id)}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-colors flex items-center justify-between ${
                        selectedCategory === cat.id
                          ? "bg-emerald-800 text-white font-semibold"
                          : "text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800"
                      }`}
                    >
                      <span className="truncate">{cat.name}</span>
                      <span className="text-[11px] opacity-75">{count}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Price Range Filter */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-stone-900 dark:text-stone-100 uppercase tracking-wider">
                  Price Limit
                </label>
                <span className="text-xs font-semibold text-emerald-800 dark:text-emerald-400">
                  Up to ${priceRange[1]}
                </span>
              </div>
              <input
                type="range"
                min="10"
                max="70"
                step="2"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([0, Number(e.target.value)])}
                className="w-full accent-emerald-800 cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-stone-400 mt-1">
                <span>$10</span>
                <span>$70+</span>
              </div>
            </div>

            {/* Clear all filters */}
            <button
              onClick={handleResetFilters}
              className="w-full py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 hover:bg-stone-50 dark:hover:bg-stone-800 text-xs font-semibold text-stone-700 dark:text-stone-300 flex items-center justify-center gap-2 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Reset All Filters
            </button>
          </div>
        </aside>

        {/* Main Products Grid Section */}
        <main className="md:col-span-9 space-y-6">
          {/* Top Sort Bar */}
          <div className="bg-white dark:bg-stone-900 p-4 rounded-2xl border border-stone-200/80 dark:border-stone-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="text-stone-500">
              Showing{" "}
              <span className="font-semibold text-stone-900 dark:text-stone-100">
                {paginatedProducts.length}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-stone-900 dark:text-stone-100">
                {filteredProducts.length}
              </span>{" "}
              teas
            </div>

            <div className="flex items-center gap-2">
              <span className="text-stone-400 flex items-center gap-1 font-medium">
                <ArrowUpDown className="w-3.5 h-3.5" />
                Sort By:
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl px-3 py-1.5 font-medium text-stone-800 dark:text-stone-200 focus:outline-none focus:ring-2 focus:ring-emerald-700 text-xs"
              >
                <option value="popularity">Popularity & Rating</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="latest">Latest Arrivals</option>
              </select>
            </div>
          </div>

          {/* Products Grid */}
          {paginatedProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="bg-white dark:bg-stone-900 rounded-3xl p-12 text-center border border-stone-200/80 dark:border-stone-800 space-y-4">
              <div className="w-12 h-12 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-400 flex items-center justify-center mx-auto">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="font-serif-tea text-xl font-bold text-stone-900 dark:text-stone-100">
                No Teas Matched Your Criteria
              </h3>
              <p className="text-xs text-stone-500 max-w-sm mx-auto">
                Try widening your price limit or clearing specific search keywords.
              </p>
              <button
                onClick={handleResetFilters}
                className="px-5 py-2.5 rounded-xl bg-emerald-800 text-white text-xs font-semibold hover:bg-emerald-700 transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="pt-6 flex items-center justify-center gap-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1.5 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 text-xs font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-stone-50 dark:hover:bg-stone-800 text-stone-800 dark:text-stone-200"
              >
                Previous
              </button>

              {[...Array(totalPages)].map((_, i) => {
                const pageNum = i + 1;
                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`w-8 h-8 rounded-xl text-xs font-semibold transition-colors ${
                      currentPage === pageNum
                        ? "bg-emerald-800 text-white"
                        : "bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800"
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}

              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-1.5 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 text-xs font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-stone-50 dark:hover:bg-stone-800 text-stone-800 dark:text-stone-200"
              >
                Next
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default ShopPage;
