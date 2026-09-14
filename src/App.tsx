import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { ToastContainer } from './components/common/ToastContainer';
import { QuickViewModal } from './components/common/QuickViewModal';
import { LiveChatWidget } from './components/common/LiveChatWidget';
import { CartDrawer } from './components/cart/CartDrawer';

// Pages
import { HomePage } from './pages/HomePage';
import { ProductListingPage } from './pages/ProductListingPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CartPage } from './pages/CartPage';
import { WishlistPage } from './pages/WishlistPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrdersPage } from './pages/OrdersPage';
import { ProfilePage } from './pages/ProfilePage';
import { AuthPage } from './pages/AuthPage';
import { SupportPage } from './pages/SupportPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { BackendArchitecturePage } from './pages/BackendArchitecturePage';
import { Product } from './types';

const MainApp: React.FC = () => {
  const { products } = useApp();

  const [activePage, setActivePage] = useState<string>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setActivePage('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectProductById = (id: string) => {
    const found = products.find(p => p.id === id);
    if (found) {
      handleSelectProduct(found);
    }
  };

  const handleSelectCategory = (categoryName: string) => {
    setSelectedCategory(categoryName);
    setActivePage('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setActivePage('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePageChange = (page: string) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
      {/* Global Notifications */}
      <ToastContainer />

      {/* Sticky Responsive Navbar */}
      <Navbar
        activePage={activePage}
        setActivePage={handlePageChange}
        onSearch={handleSearch}
        onSelectCategory={handleSelectCategory}
      />

      {/* Main Routed Page Content */}
      <main className="flex-1">
        {activePage === 'home' && (
          <HomePage
            setActivePage={handlePageChange}
            onSelectProduct={handleSelectProduct}
            onSelectCategory={handleSelectCategory}
          />
        )}

        {activePage === 'shop' && (
          <ProductListingPage
            initialCategory={selectedCategory}
            initialSearchQuery={searchQuery}
            onSelectProduct={handleSelectProduct}
          />
        )}

        {activePage === 'product-detail' && selectedProduct && (
          <ProductDetailPage
            product={selectedProduct}
            onBack={() => handlePageChange('shop')}
            onSelectProduct={handleSelectProduct}
            onProceedToCheckout={() => handlePageChange('checkout')}
          />
        )}

        {activePage === 'cart' && (
          <CartPage
            setActivePage={handlePageChange}
            onSelectProduct={handleSelectProduct}
          />
        )}

        {activePage === 'wishlist' && (
          <WishlistPage
            setActivePage={handlePageChange}
            onSelectProduct={handleSelectProduct}
          />
        )}

        {activePage === 'checkout' && (
          <CheckoutPage
            setActivePage={handlePageChange}
            onOrderCompleted={() => handlePageChange('orders')}
          />
        )}

        {activePage === 'orders' && (
          <OrdersPage
            setActivePage={handlePageChange}
            onSelectProductById={handleSelectProductById}
          />
        )}

        {activePage === 'profile' && (
          <ProfilePage setActivePage={handlePageChange} />
        )}

        {activePage === 'addresses' && (
          <ProfilePage setActivePage={handlePageChange} />
        )}

        {activePage === 'auth' && (
          <AuthPage onSuccess={() => handlePageChange('home')} />
        )}

        {activePage === 'support' && (
          <SupportPage />
        )}

        {activePage === 'admin' && (
          <AdminDashboardPage />
        )}

        {activePage === 'backend-architecture' && (
          <BackendArchitecturePage />
        )}
      </main>

      {/* Global Quick View 3D Modal */}
      <QuickViewModal onNavigateToDetail={handleSelectProductById} />

      {/* Slide-over Cart Drawer */}
      <CartDrawer
        onNavigateToCheckout={() => handlePageChange('checkout')}
        onNavigateToCartPage={() => handlePageChange('cart')}
      />

      {/* 24/7 Live Concierge Chat Widget */}
      <LiveChatWidget />

      {/* Full Brand Footer */}
      <Footer setActivePage={handlePageChange} />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainApp />
    </AppProvider>
  );
}
