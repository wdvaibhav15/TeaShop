import React, { useState, useMemo } from 'react';
import {
  Search,
  SlidersHorizontal,
  LayoutGrid,
  List,
  Star,
  X,
  RotateCcw,
  Check,
  ChevronLeft,
  ChevronRight,
  Heart,
  ShoppingBag,
  Eye,
  Filter
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Product3DCard } from '../components/3d/Product3DCard';
import { CATEGORIES, BRANDS } from '../constants/data';
import { Product } from '../types';

interface ProductListingPageProps {
  initialCategory?: string;
  initialSearchQuery?: string;
  onSelectProduct: (product: Product) => void;
}

export const ProductListingPage: React.FC<ProductListingPageProps> = ({
  initialCategory,
  initialSearchQuery = '',
  onSelectProduct
}) => {
  const { products, formatPrice, addToCart, toggleWishlist, isInWishlist, setQuickViewProduct } = useApp();

  // Filters state
  const [search, setSearch] = useState(initialSearchQuery);
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory || 'All');
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<number>(2500); // max price
  const [minRating, setMinRating] = useState<number>(0);
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<'popular' | 'price-asc' | 'price-desc' | 'newest' | 'rating'>('popular');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Toggle brand in filter
  const toggleBrand = (brand: string) => {
    setSelectedBrands(prev =>
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
    setCurrentPage(1);
  };

  // Reset filters
  const resetFilters = () => {
    setSearch('');
    setSelectedCategory('All');
    setSelectedBrands([]);
    setPriceRange(2500);
    setMinRating(0);
    setInStockOnly(false);
    setSortBy('popular');
    setCurrentPage(1);
  };

  // Filtered & Sorted products
  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      // Search
      if (search.trim()) {
        const query = search.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(query);
        const matchesBrand = p.brand.toLowerCase().includes(query);
        const matchesCategory = p.category.toLowerCase().includes(query);
        const matchesTags = p.tags.some(t => t.toLowerCase().includes(query));
        if (!matchesName && !matchesBrand && !matchesCategory && !matchesTags) return false;
      }

      // Category
      if (selectedCategory !== 'All' && p.category !== selectedCategory) {
        return false;
      }

      // Brands
      if (selectedBrands.length > 0 && !selectedBrands.includes(p.brand)) {
        return false;
      }

      // Price
      if (p.price > priceRange) {
        return false;
      }

      // Rating
      if (minRating > 0 && p.rating < minRating) {
        return false;
      }

      // In stock
      if (inStockOnly && p.stock <= 0) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'newest') return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
      if (sortBy === 'rating') return b.rating - a.rating;
      // Default: popular
      return b.reviewCount - a.reviewCount;
    });
  }, [products, search, selectedCategory, selectedBrands, priceRange, minRating, inStockOnly, sortBy]);

  // Paginated products
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage) || 1;
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header & Breadcrumb */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-1">
            <span>Home</span>
            <span>/</span>
            <span className="text-indigo-600 dark:text-indigo-400 font-medium">Catalog</span>
            {selectedCategory !== 'All' && (
              <>
                <span>/</span>
                <span className="text-slate-800 dark:text-slate-200">{selectedCategory}</span>
              </>
            )}
          </div>
          <h1 className="font-display font-black text-2xl sm:text-3xl text-slate-900 dark:text-white">
            Explore 3D Spatial Products
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Showing <strong className="text-slate-900 dark:text-white">{filteredProducts.length}</strong> verified spatial audio, chronos, and sneaker designs
          </p>
        </div>

        {/* View & Sort Bar */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Mobile Filter Toggle Button */}
          <button
            type="button"
            onClick={() => setIsMobileFilterOpen(true)}
            className="lg:hidden px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-semibold flex items-center gap-2"
          >
            <Filter className="w-4 h-4 text-indigo-500" />
            Filters
          </button>

          {/* Grid / List view toggle */}
          <div className="flex items-center p-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === 'grid'
                  ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
              title="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === 'list'
                  ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
              title="List View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400 hidden sm:inline">Sort:</span>
            <select
              value={sortBy}
              onChange={e => {
                setSortBy(e.target.value as any);
                setCurrentPage(1);
              }}
              className="px-3 py-2 text-xs font-semibold rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 focus:outline-hidden focus:ring-1 focus:ring-indigo-500"
            >
              <option value="popular">Most Popular</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="newest">Newest Arrivals</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        {/* DESKTOP SIDEBAR FILTERS */}
        <aside className="hidden lg:block space-y-6 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm sticky top-24">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-indigo-500" />
              <h3 className="font-display font-bold text-sm text-slate-900 dark:text-white">Filters</h3>
            </div>
            <button
              type="button"
              onClick={resetFilters}
              className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              Reset
            </button>
          </div>

          {/* Search in Catalog */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
              Search Products
            </label>
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={search}
                onChange={e => {
                  setSearch(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Name, keyword..."
                className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-hidden focus:ring-1 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Categories */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
              Category
            </label>
            <div className="space-y-1">
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory('All');
                  setCurrentPage(1);
                }}
                className={`w-full text-left px-2.5 py-1.5 text-xs rounded-lg transition-colors flex items-center justify-between ${
                  selectedCategory === 'All'
                    ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-bold'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                <span>All Categories</span>
                <span className="text-[10px] text-slate-400">{products.length}</span>
              </button>
              {CATEGORIES.map(cat => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => {
                    setSelectedCategory(cat.name);
                    setCurrentPage(1);
                  }}
                  className={`w-full text-left px-2.5 py-1.5 text-xs rounded-lg transition-colors flex items-center justify-between ${
                    selectedCategory === cat.name
                      ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-bold'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  <span className="truncate max-w-[150px]">{cat.name}</span>
                  <span className="text-[10px] text-slate-400">{cat.itemCount}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Brands Filter */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
              Brand
            </label>
            <div className="space-y-1.5">
              {BRANDS.map(brand => {
                const checked = selectedBrands.includes(brand);
                return (
                  <label
                    key={brand}
                    className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400 cursor-pointer hover:text-slate-900 dark:hover:text-white"
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleBrand(brand)}
                      className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span>{brand}</span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Price Range */}
          <div>
            <div className="flex justify-between items-center text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
              <span>Max Price</span>
              <span className="font-mono text-indigo-600 dark:text-indigo-400">{formatPrice(priceRange)}</span>
            </div>
            <input
              type="range"
              min={100}
              max={2500}
              step={50}
              value={priceRange}
              onChange={e => {
                setPriceRange(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="w-full accent-indigo-600"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <span>{formatPrice(100)}</span>
              <span>{formatPrice(2500)}</span>
            </div>
          </div>

          {/* Rating Filter */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
              Customer Rating
            </label>
            <div className="space-y-1">
              {[4, 3, 2].map(star => (
                <button
                  key={star}
                  type="button"
                  onClick={() => {
                    setMinRating(minRating === star ? 0 : star);
                    setCurrentPage(1);
                  }}
                  className={`w-full text-left px-2 py-1 text-xs rounded-lg flex items-center justify-between ${
                    minRating === star
                      ? 'bg-amber-500/10 text-amber-500 font-bold'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(star)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                    <span className="text-slate-700 dark:text-slate-300 text-[11px] ml-1">& up</span>
                  </div>
                  {minRating === star && <Check className="w-3.5 h-3.5 text-amber-500" />}
                </button>
              ))}
            </div>
          </div>

          {/* In Stock Toggle */}
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                In Stock Only
              </span>
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={e => {
                  setInStockOnly(e.target.checked);
                  setCurrentPage(1);
                }}
                className="w-4 h-4 text-indigo-600 rounded"
              />
            </label>
          </div>
        </aside>

        {/* PRODUCTS CONTENT GRID / LIST */}
        <div className="lg:col-span-3 space-y-6">
          {paginatedProducts.length === 0 ? (
            <div className="p-12 text-center rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <p className="font-display font-bold text-lg text-slate-800 dark:text-slate-200">
                No Products Match Your Filter
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto">
                Try widening your price range, clearing brand filters, or resetting search keywords.
              </p>
              <button
                type="button"
                onClick={resetFilters}
                className="mt-4 px-4 py-2 bg-indigo-600 text-white text-xs font-bold rounded-xl"
              >
                Reset All Filters
              </button>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {paginatedProducts.map(product => (
                <Product3DCard
                  key={product.id}
                  product={product}
                  onNavigateToDetail={onSelectProduct}
                />
              ))}
            </div>
          ) : (
            /* LIST VIEW MODE */
            <div className="space-y-4">
              {paginatedProducts.map(product => {
                const isFavorite = isInWishlist(product.id);
                return (
                  <div
                    key={product.id}
                    onClick={() => onSelectProduct(product)}
                    className="group p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row gap-5 items-center cursor-pointer"
                  >
                    <div className="w-full sm:w-44 h-40 bg-slate-100 dark:bg-slate-800 rounded-xl p-3 shrink-0 flex items-center justify-center">
                      <img
                        src={product.images?.[0] || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80'}
                        alt={product.name}
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                      />
                    </div>

                    <div className="flex-1 space-y-2 text-left w-full">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                          {product.brand} • {product.category}
                        </span>
                        <button
                          type="button"
                          onClick={e => {
                            e.stopPropagation();
                            toggleWishlist(product.id);
                          }}
                          className="p-1.5 text-slate-400 hover:text-rose-500"
                        >
                          <Heart className={`w-4 h-4 ${isFavorite ? 'fill-rose-500 text-rose-500' : ''}`} />
                        </button>
                      </div>

                      <h3 className="font-display font-bold text-base text-slate-900 dark:text-white">
                        {product.name}
                      </h3>

                      <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                        {product.description}
                      </p>

                      <div className="flex items-center gap-2 text-xs">
                        <div className="flex items-center text-amber-500">
                          <Star className="w-3.5 h-3.5 fill-current" />
                          <span className="ml-1 font-bold">{product.rating}</span>
                        </div>
                        <span className="text-slate-400">({product.reviewCount} reviews)</span>
                        <span className="text-slate-300 dark:text-slate-700">•</span>
                        <span className="text-emerald-500 font-semibold">
                          {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                        </span>
                      </div>
                    </div>

                    <div className="sm:border-l sm:border-slate-100 dark:sm:border-slate-800 sm:pl-5 flex flex-col justify-between sm:items-end w-full sm:w-auto gap-3">
                      <div>
                        <div className="text-xl font-bold font-display text-slate-900 dark:text-white">
                          {formatPrice(product.price)}
                        </div>
                        {product.originalPrice > product.price && (
                          <div className="text-xs text-slate-400 line-through">
                            {formatPrice(product.originalPrice)}
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-2 w-full sm:w-auto">
                        <button
                          type="button"
                          onClick={e => {
                            e.stopPropagation();
                            setQuickViewProduct(product);
                          }}
                          className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200"
                          title="Quick View"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={e => {
                            e.stopPropagation();
                            addToCart(product, 1);
                          }}
                          className="flex-1 sm:flex-initial px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* PAGINATION */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between pt-6 border-t border-slate-200 dark:border-slate-800">
              <button
                type="button"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-semibold disabled:opacity-40 flex items-center gap-1"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </button>

              <div className="flex items-center gap-1.5">
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setCurrentPage(i + 1)}
                    className={`w-8 h-8 rounded-xl text-xs font-bold transition-colors ${
                      currentPage === i + 1
                        ? 'bg-indigo-600 text-white shadow-xs'
                        : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>

              <button
                type="button"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-semibold disabled:opacity-40 flex items-center gap-1"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
