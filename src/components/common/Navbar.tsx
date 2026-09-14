import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  ShoppingBag,
  Heart,
  User,
  Moon,
  Sun,
  Menu,
  X,
  ChevronDown,
  Bell,
  Box,
  Layers,
  Sparkles,
  ShieldCheck,
  Headphones,
  Watch,
  Footprints,
  Laptop,
  Eye,
  LogOut,
  Settings,
  Package,
  MapPin,
  HelpCircle,
  Database
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CATEGORIES } from '../../constants/data';
import { Currency, Language } from '../../types';

interface NavbarProps {
  activePage: string;
  setActivePage: (page: string) => void;
  onSearch?: (query: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activePage, setActivePage, onSearch }) => {
  const {
    theme,
    toggleTheme,
    currency,
    setCurrency,
    language,
    setLanguage,
    cart,
    wishlist,
    user,
    logout,
    notifications,
    setIsCartDrawerOpen
  } = useApp();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);

  const searchInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const unreadNotifs = notifications.filter(n => !n.read).length;

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchQuery);
    }
    setActivePage('shop');
  };

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Headphones': return <Headphones className="w-4 h-4 text-indigo-500" />;
      case 'Watch': return <Watch className="w-4 h-4 text-emerald-500" />;
      case 'Footprints': return <Footprints className="w-4 h-4 text-rose-500" />;
      case 'Laptop': return <Laptop className="w-4 h-4 text-cyan-500" />;
      case 'Eye': return <Eye className="w-4 h-4 text-amber-500" />;
      default: return <Box className="w-4 h-4 text-indigo-500" />;
    }
  };

  return (
    <>
      {/* Top Notification Bar */}
      <div className="bg-slate-900 text-slate-200 text-xs py-1.5 px-4 hidden md:flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-indigo-400 font-medium">
            <Sparkles className="w-3.5 h-3.5" />
            3D Spatial Audio & Footwear Week - Use code <strong className="text-white bg-indigo-600/60 px-1.5 py-0.5 rounded text-[11px]">VORTEX20</strong>
          </span>
          <span className="text-slate-500">•</span>
          <span className="text-slate-400">Free Worldwide Express Delivery on orders over $99</span>
        </div>

        <div className="flex items-center gap-4">
          {/* Currency Switcher */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
              className="flex items-center gap-1 text-slate-300 hover:text-white transition-colors"
            >
              <span>{currency}</span>
              <ChevronDown className="w-3 h-3" />
            </button>

            {currencyDropdownOpen && (
              <div className="absolute right-0 top-full mt-1 w-24 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-xl py-1 z-50 text-slate-800 dark:text-slate-200">
                {(['USD', 'EUR', 'GBP', 'INR', 'CAD'] as Currency[]).map(curr => (
                  <button
                    key={curr}
                    type="button"
                    onClick={() => {
                      setCurrency(curr);
                      setCurrencyDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 text-xs hover:bg-slate-100 dark:hover:bg-slate-800 ${
                      currency === curr ? 'font-bold text-indigo-600 dark:text-indigo-400' : ''
                    }`}
                  >
                    {curr}
                  </button>
                ))}
              </div>
            )}
          </div>

          <span className="text-slate-700">|</span>

          {/* Backend Layout Link (Requested by user) */}
          <button
            type="button"
            onClick={() => setActivePage('backend-architecture')}
            className="flex items-center gap-1 text-xs text-amber-400 hover:text-amber-300 font-medium"
          >
            <Database className="w-3 h-3" />
            Backend Architecture
          </button>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-md border-b border-slate-200/80 dark:border-slate-800 py-3'
            : 'bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          {/* Logo & Brand */}
          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={() => setActivePage('home')}
              className="flex items-center gap-2.5 group focus:outline-hidden"
            >
              {/* 3D Animated Prism Cube Logo */}
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 flex items-center justify-center text-white shadow-md shadow-indigo-500/25 group-hover:rotate-12 transition-transform duration-300">
                <Box className="w-5 h-5 animate-pulse" />
              </div>
              <div className="text-left">
                <span className="font-display font-black text-xl tracking-tight text-slate-900 dark:text-white flex items-center">
                  VORTEX<span className="text-indigo-600 dark:text-indigo-400">3D</span>
                </span>
                <span className="text-[10px] tracking-widest text-slate-400 uppercase block font-semibold -mt-1">
                  Spatial Store
                </span>
              </div>
            </button>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1">
              <button
                type="button"
                onClick={() => setActivePage('home')}
                className={`px-3 py-2 text-sm font-semibold rounded-lg transition-colors ${
                  activePage === 'home'
                    ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50'
                    : 'text-slate-700 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400'
                }`}
              >
                Home
              </button>

              {/* Mega Menu Toggle */}
              <div
                className="relative"
                onMouseEnter={() => setMegaMenuOpen(true)}
                onMouseLeave={() => setMegaMenuOpen(false)}
              >
                <button
                  type="button"
                  onClick={() => setActivePage('shop')}
                  className={`px-3 py-2 text-sm font-semibold rounded-lg flex items-center gap-1 transition-colors ${
                    activePage === 'shop'
                      ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50'
                      : 'text-slate-700 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400'
                  }`}
                >
                  Explore Catalog
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>

                {/* MEGA MENU FLYOUT */}
                {megaMenuOpen && (
                  <div className="absolute left-0 top-full pt-2 w-[540px] z-50">
                    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-5 grid grid-cols-2 gap-4 backdrop-blur-xl">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                          Shop by Category
                        </p>
                        <div className="space-y-1">
                          {CATEGORIES.map(cat => (
                            <button
                              key={cat.id}
                              type="button"
                              onClick={() => {
                                setActivePage('shop');
                                setMegaMenuOpen(false);
                              }}
                              className="w-full flex items-center gap-2.5 p-2 rounded-xl text-left hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors group"
                            >
                              <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center group-hover:scale-110 transition-transform">
                                {getCategoryIcon(cat.iconName)}
                              </div>
                              <div>
                                <p className="text-xs font-semibold text-slate-900 dark:text-white">
                                  {cat.name}
                                </p>
                                <p className="text-[10px] text-slate-500 dark:text-slate-400">
                                  {cat.itemCount} items
                                </p>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="bg-gradient-to-br from-indigo-900 to-slate-950 text-white p-4 rounded-xl flex flex-col justify-between relative overflow-hidden">
                        <div className="relative z-10">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-300 bg-indigo-500/20 px-2 py-0.5 rounded-full">
                            Featured 3D Drop
                          </span>
                          <h4 className="font-display font-bold text-sm mt-2 text-white">
                            Aura Horizon Spatial Pro X
                          </h4>
                          <p className="text-[11px] text-indigo-200 mt-1 line-clamp-3">
                            Experience 360° lossless spatial audio with real-time head-tracking and titanium drivers.
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={() => {
                            setActivePage('shop');
                            setMegaMenuOpen(false);
                          }}
                          className="relative z-10 mt-4 w-full py-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg text-xs font-semibold text-white transition-colors"
                        >
                          Explore in 3D
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={() => setActivePage('orders')}
                className={`px-3 py-2 text-sm font-semibold rounded-lg transition-colors ${
                  activePage === 'orders'
                    ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50'
                    : 'text-slate-700 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400'
                }`}
              >
                Track Orders
              </button>

              <button
                type="button"
                onClick={() => setActivePage('support')}
                className={`px-3 py-2 text-sm font-semibold rounded-lg transition-colors ${
                  activePage === 'support'
                    ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50'
                    : 'text-slate-700 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400'
                }`}
              >
                Support
              </button>

              {user?.role === 'admin' && (
                <button
                  type="button"
                  onClick={() => setActivePage('admin')}
                  className="px-3 py-2 text-sm font-semibold rounded-lg text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 hover:bg-amber-100 transition-colors"
                >
                  Admin Portal
                </button>
              )}
            </nav>
          </div>

          {/* Search Bar */}
          <form
            onSubmit={handleSearchSubmit}
            className="hidden md:flex flex-1 max-w-md mx-4 relative items-center"
          >
            <div className="relative w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search titanium headphones, runners, smartwatches..."
                className="w-full pl-10 pr-12 py-2 text-xs rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:bg-white dark:focus:bg-slate-900 transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </form>

          {/* Right Action Icons (Theme, Wishlist, Cart, Profile) */}
          <div className="flex items-center gap-2">
            {/* Theme Toggle */}
            <button
              type="button"
              onClick={toggleTheme}
              aria-label="Toggle Dark Mode"
              className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Wishlist */}
            <button
              type="button"
              onClick={() => setActivePage('wishlist')}
              aria-label="Wishlist"
              className="relative p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Shopping Cart Trigger */}
            <button
              type="button"
              onClick={() => setIsCartDrawerOpen(true)}
              aria-label="Shopping Cart"
              className="relative p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-1.5"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalCartCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-indigo-600 text-white text-[10px] font-bold flex items-center justify-center animate-bounce">
                  {totalCartCount}
                </span>
              )}
            </button>

            {/* Notifications Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setNotifDropdownOpen(!notifDropdownOpen)}
                aria-label="Notifications"
                className="relative p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <Bell className="w-5 h-5" />
                {unreadNotifs > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-amber-500" />
                )}
              </button>

              {notifDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-80 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl p-4 z-50">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                    <span className="font-display font-semibold text-xs text-slate-900 dark:text-white">Notifications</span>
                    <span className="text-[10px] text-indigo-500 font-medium">{notifications.length} alerts</span>
                  </div>
                  <div className="divide-y divide-slate-100 dark:divide-slate-800 max-h-60 overflow-y-auto mt-2">
                    {notifications.map(notif => (
                      <div
                        key={notif.id}
                        onClick={() => {
                          if (notif.link) setActivePage(notif.link);
                          setNotifDropdownOpen(false);
                        }}
                        className={`py-2.5 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 px-2 rounded-lg transition-colors ${
                          !notif.read ? 'bg-indigo-50/50 dark:bg-indigo-950/20' : ''
                        }`}
                      >
                        <p className="text-xs font-semibold text-slate-900 dark:text-white">{notif.title}</p>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2">{notif.message}</p>
                        <span className="text-[9px] text-slate-400 mt-1 block">{notif.timestamp}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* User Profile / Auth Dropdown */}
            <div className="relative">
              {user ? (
                <button
                  type="button"
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-7 h-7 rounded-full object-cover ring-2 ring-indigo-500/40"
                  />
                  <ChevronDown className="w-3.5 h-3.5 text-slate-500 hidden sm:inline" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setActivePage('auth-login')}
                  className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-xs transition-colors flex items-center gap-1.5"
                >
                  <User className="w-3.5 h-3.5" />
                  <span>Sign In</span>
                </button>
              )}

              {userDropdownOpen && user && (
                <div className="absolute right-0 top-full mt-2 w-56 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl p-2 z-50">
                  <div className="p-2 border-b border-slate-100 dark:border-slate-800">
                    <p className="font-semibold text-xs text-slate-900 dark:text-white truncate">{user.name}</p>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate">{user.email}</p>
                    <span className="inline-block mt-1 px-1.5 py-0.5 rounded text-[9px] font-bold bg-indigo-500/10 text-indigo-500 uppercase">
                      {user.role}
                    </span>
                  </div>

                  <div className="py-1">
                    <button
                      type="button"
                      onClick={() => {
                        setActivePage('profile');
                        setUserDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 text-xs text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
                    >
                      <User className="w-3.5 h-3.5 text-indigo-500" />
                      My Profile
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setActivePage('orders');
                        setUserDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 text-xs text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
                    >
                      <Package className="w-3.5 h-3.5 text-emerald-500" />
                      Orders & History
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setActivePage('addresses');
                        setUserDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 text-xs text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
                    >
                      <MapPin className="w-3.5 h-3.5 text-amber-500" />
                      Saved Addresses
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setActivePage('admin');
                        setUserDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 text-xs text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
                    >
                      <Settings className="w-3.5 h-3.5 text-cyan-500" />
                      Admin Dashboard UI
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setActivePage('backend-architecture');
                        setUserDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 text-xs text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/40 rounded-lg font-medium"
                    >
                      <Database className="w-3.5 h-3.5" />
                      Backend & Schema Docs
                    </button>
                  </div>

                  <div className="pt-1 border-t border-slate-100 dark:border-slate-800">
                    <button
                      type="button"
                      onClick={() => {
                        logout();
                        setUserDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 text-xs text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-lg"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Hamburger Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-4 space-y-3">
            {/* Search */}
            <form onSubmit={handleSearchSubmit} className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
              />
            </form>

            <div className="flex flex-col space-y-1 text-sm font-medium">
              <button
                type="button"
                onClick={() => {
                  setActivePage('home');
                  setMobileMenuOpen(false);
                }}
                className="text-left px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                Home
              </button>
              <button
                type="button"
                onClick={() => {
                  setActivePage('shop');
                  setMobileMenuOpen(false);
                }}
                className="text-left px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                Product Catalog
              </button>
              <button
                type="button"
                onClick={() => {
                  setActivePage('cart');
                  setMobileMenuOpen(false);
                }}
                className="text-left px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 flex justify-between items-center"
              >
                <span>Shopping Cart</span>
                <span className="text-xs font-bold text-indigo-500">({totalCartCount})</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setActivePage('orders');
                  setMobileMenuOpen(false);
                }}
                className="text-left px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                Orders & Tracking
              </button>
              <button
                type="button"
                onClick={() => {
                  setActivePage('support');
                  setMobileMenuOpen(false);
                }}
                className="text-left px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                Customer Support & FAQ
              </button>
              <button
                type="button"
                onClick={() => {
                  setActivePage('admin');
                  setMobileMenuOpen(false);
                }}
                className="text-left px-3 py-2 rounded-lg text-amber-500 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                Admin Dashboard UI
              </button>
              <button
                type="button"
                onClick={() => {
                  setActivePage('backend-architecture');
                  setMobileMenuOpen(false);
                }}
                className="text-left px-3 py-2 rounded-lg text-indigo-500 font-semibold hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                Backend Architecture & Schemas
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
