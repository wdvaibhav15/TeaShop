import React, { createContext, useContext, useState, useEffect, useMemo, ReactNode } from 'react';
import {
  Product,
  CartItem,
  Address,
  Order,
  UserProfile,
  Coupon,
  AppNotification,
  Currency,
  Language,
  OrderStatus
} from '../types';
import { PRODUCTS, COUPONS } from '../constants/data';

interface Toast {
  id: string;
  title: string;
  message?: string;
  type?: 'success' | 'error' | 'info' | 'warning';
}

interface AppContextType {
  // Theme
  theme: 'light' | 'dark';
  toggleTheme: () => void;

  // Currency & Language
  currency: Currency;
  setCurrency: (c: Currency) => void;
  language: Language;
  setLanguage: (l: Language) => void;
  formatPrice: (amount: number) => string;

  // Auth & Profile
  user: UserProfile | null;
  isAuthenticated: boolean;
  login: (email: string, role?: 'customer' | 'admin') => Promise<void>;
  register: (name: string, email: string) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<UserProfile>) => void;

  // Addresses
  addresses: Address[];
  addAddress: (addr: Omit<Address, 'id'>) => void;
  editAddress: (id: string, addr: Partial<Address>) => void;
  deleteAddress: (id: string) => void;
  setDefaultAddress: (id: string) => void;

  // Cart
  cart: CartItem[];
  savedForLater: CartItem[];
  addToCart: (product: Product, quantity?: number, color?: string, size?: string) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  saveItemForLater: (productId: string) => void;
  moveItemToCart: (productId: string) => void;
  clearCart: () => void;
  appliedCoupon: Coupon | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;

  // Totals
  cartSubtotal: number;
  cartDiscount: number;
  cartTax: number;
  cartShipping: number;
  cartTotal: number;

  // Wishlist
  wishlist: string[]; // product IDs
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  // Recently Viewed
  recentlyViewed: Product[];
  addRecentlyViewed: (product: Product) => void;

  // Orders
  orders: Order[];
  createOrder: (orderData: {
    shippingAddress: Address;
    paymentMethod: Order['paymentMethod'];
    shippingMethod: 'standard' | 'express';
  }) => Order;
  cancelOrder: (orderId: string, reason?: string) => void;
  requestReturn: (orderId: string, reason: string) => void;

  // Products (Store catalog + Admin edits)
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;

  // Quick View Modal
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;

  // Notifications
  notifications: AppNotification[];
  markNotificationRead: (id: string) => void;
  clearAllNotifications: () => void;

  // Toasts
  toasts: Toast[];
  showToast: (title: string, message?: string, type?: Toast['type']) => void;
  removeToast: (id: string) => void;

  // Cart Drawer
  isCartDrawerOpen: boolean;
  setIsCartDrawerOpen: (open: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const INITIAL_ADDRESSES: Address[] = [
  {
    id: 'addr-1',
    fullName: 'Alex Vance',
    mobileNumber: '+1 (555) 382-9012',
    email: 'alex.vance@aurastore.io',
    country: 'United States',
    state: 'California',
    city: 'San Francisco',
    zipCode: '94107',
    streetAddress: '420 Townsend St, Suite 300',
    landmark: 'Near Caltrain Depot',
    isDefault: true,
    type: 'home'
  },
  {
    id: 'addr-2',
    fullName: 'Alex Vance',
    mobileNumber: '+1 (555) 918-2041',
    email: 'alex.work@aurastore.io',
    country: 'United States',
    state: 'California',
    city: 'Palo Alto',
    zipCode: '94301',
    streetAddress: '550 University Ave',
    landmark: 'Tech Campus Building B',
    isDefault: false,
    type: 'work'
  }
];

const INITIAL_USER: UserProfile = {
  id: 'usr-901',
  name: 'Alex Vance',
  email: 'alex.vance@aurastore.io',
  phone: '+1 (555) 382-9012',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&q=80',
  role: 'customer',
  createdAt: '2025-01-15'
};

const INITIAL_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'notif-1',
    type: 'order',
    title: 'Order Dispatched #VX-8921',
    message: 'Your Aura Horizon Spatial Pro X has been shipped via Fedex Express.',
    timestamp: '2 hours ago',
    read: false,
    link: 'orders'
  },
  {
    id: 'notif-2',
    type: 'promo',
    title: 'Flash Sale Alert! ⚡',
    message: '20% off all Spatial Audio & Footwear for the next 24 hours with code VORTEX20.',
    timestamp: '5 hours ago',
    read: false,
    link: 'shop'
  },
  {
    id: 'notif-3',
    type: 'payment',
    title: 'Payment Confirmed',
    message: 'Stripe transaction of $349.00 processed securely.',
    timestamp: '1 day ago',
    read: true,
    link: 'orders'
  }
];

const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-101',
    orderNumber: 'VX-8921',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 28).toISOString(),
    items: [
      {
        productId: 'prod-1',
        productName: 'Aura Horizon Spatial Pro X Headphones',
        productImage: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80',
        price: 349,
        quantity: 1,
        color: 'Obsidian Matte'
      }
    ],
    shippingAddress: INITIAL_ADDRESSES[0],
    paymentMethod: 'card',
    paymentStatus: 'paid',
    subtotal: 349,
    tax: 27.92,
    shipping: 0,
    discount: 0,
    total: 376.92,
    status: 'shipped',
    trackingNumber: 'FDX-994820194US',
    estimatedDelivery: 'Tomorrow by 4:00 PM',
    canCancel: false,
    canReturn: true,
    timeline: [
      {
        status: 'placed',
        title: 'Order Placed',
        description: 'Payment authorized via Stripe 3D-Secure',
        timestamp: 'Yesterday, 10:15 AM',
        completed: true
      },
      {
        status: 'confirmed',
        title: 'Order Confirmed',
        description: 'Verified with inventory fulfillment center',
        timestamp: 'Yesterday, 10:30 AM',
        completed: true
      },
      {
        status: 'packed',
        title: 'Packed & Quality Inspected',
        description: 'Sealed in tamper-proof anti-static packaging',
        timestamp: 'Yesterday, 2:40 PM',
        completed: true
      },
      {
        status: 'shipped',
        title: 'Shipped via FedEx Express',
        description: 'Departed logistics hub in Oakland, CA',
        timestamp: 'Today, 8:15 AM',
        completed: true
      },
      {
        status: 'out_for_delivery',
        title: 'Out for Delivery',
        description: 'Courier en route to your shipping address',
        timestamp: 'Pending',
        completed: false
      },
      {
        status: 'delivered',
        title: 'Delivered',
        description: 'Signature upon arrival',
        timestamp: 'Pending',
        completed: false
      }
    ]
  }
];

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Theme
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('vortex_theme');
    return saved === 'dark' ? 'dark' : 'light';
  });

  useEffect(() => {
    localStorage.setItem('vortex_theme', theme);
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  // Currency & Language
  const [currency, setCurrency] = useState<Currency>('USD');
  const [language, setLanguage] = useState<Language>('EN');

  const currencyRates: Record<Currency, { rate: number; symbol: string }> = {
    USD: { rate: 1, symbol: '$' },
    EUR: { rate: 0.92, symbol: '€' },
    GBP: { rate: 0.78, symbol: '£' },
    INR: { rate: 86.5, symbol: '₹' },
    CAD: { rate: 1.38, symbol: 'CA$' }
  };

  const formatPrice = (amount: number): string => {
    const { rate, symbol } = currencyRates[currency];
    const converted = amount * rate;
    if (currency === 'INR') {
      return `${symbol}${Math.round(converted).toLocaleString('en-IN')}`;
    }
    return `${symbol}${converted.toFixed(2)}`;
  };

  // User & Auth
  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('vortex_user');
    return saved ? JSON.parse(saved) : INITIAL_USER;
  });

  const isAuthenticated = Boolean(user);

  const login = async (email: string, role: 'customer' | 'admin' = 'customer') => {
    const newUser: UserProfile = {
      id: `usr-${Date.now().toString().slice(-4)}`,
      name: email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      email,
      phone: '+1 (555) 720-4491',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&q=80',
      role,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setUser(newUser);
    localStorage.setItem('vortex_user', JSON.stringify(newUser));
    showToast('Signed In Successfully', `Welcome back, ${newUser.name}!`, 'success');
  };

  const register = async (name: string, email: string) => {
    const newUser: UserProfile = {
      id: `usr-${Date.now().toString().slice(-4)}`,
      name,
      email,
      phone: '+1 (555) 000-0000',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80',
      role: 'customer',
      createdAt: new Date().toISOString().split('T')[0]
    };
    setUser(newUser);
    localStorage.setItem('vortex_user', JSON.stringify(newUser));
    showToast('Account Created!', 'Welcome to Vortex3D Studio Store.', 'success');
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('vortex_user');
    showToast('Signed Out', 'You have been logged out securely.', 'info');
  };

  const updateProfile = (data: Partial<UserProfile>) => {
    if (!user) return;
    const updated = { ...user, ...data };
    setUser(updated);
    localStorage.setItem('vortex_user', JSON.stringify(updated));
    showToast('Profile Updated', 'Your changes have been saved.', 'success');
  };

  // Addresses
  const [addresses, setAddresses] = useState<Address[]>(() => {
    const saved = localStorage.getItem('vortex_addresses');
    return saved ? JSON.parse(saved) : INITIAL_ADDRESSES;
  });

  useEffect(() => {
    localStorage.setItem('vortex_addresses', JSON.stringify(addresses));
  }, [addresses]);

  const addAddress = (addr: Omit<Address, 'id'>) => {
    const newAddr: Address = {
      ...addr,
      id: `addr-${Date.now()}`
    };
    if (newAddr.isDefault) {
      setAddresses(prev => prev.map(a => ({ ...a, isDefault: false })).concat(newAddr));
    } else {
      setAddresses(prev => [...prev, newAddr]);
    }
    showToast('Address Added', `${newAddr.streetAddress} saved.`, 'success');
  };

  const editAddress = (id: string, addr: Partial<Address>) => {
    setAddresses(prev =>
      prev.map(a => {
        if (a.id === id) {
          return { ...a, ...addr };
        }
        if (addr.isDefault) {
          return { ...a, isDefault: false };
        }
        return a;
      })
    );
    showToast('Address Updated', 'Your delivery address was updated.', 'success');
  };

  const deleteAddress = (id: string) => {
    setAddresses(prev => prev.filter(a => a.id !== id));
    showToast('Address Removed', 'The address was removed.', 'info');
  };

  const setDefaultAddress = (id: string) => {
    setAddresses(prev =>
      prev.map(a => ({
        ...a,
        isDefault: a.id === id
      }))
    );
    showToast('Default Address Set', 'Preferred shipping location updated.', 'success');
  };

  // Products
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('vortex_products');
    return saved ? JSON.parse(saved) : PRODUCTS;
  });

  const addProduct = (p: Omit<Product, 'id'>) => {
    const newProd: Product = {
      ...p,
      id: `prod-${Date.now()}`
    };
    const updated = [newProd, ...products];
    setProducts(updated);
    localStorage.setItem('vortex_products', JSON.stringify(updated));
    showToast('Product Created', `${newProd.name} added to catalog.`, 'success');
  };

  const updateProduct = (id: string, changes: Partial<Product>) => {
    const updated = products.map(p => (p.id === id ? { ...p, ...changes } : p));
    setProducts(updated);
    localStorage.setItem('vortex_products', JSON.stringify(updated));
    showToast('Product Updated', 'Changes saved successfully.', 'success');
  };

  const deleteProduct = (id: string) => {
    const updated = products.filter(p => p.id !== id);
    setProducts(updated);
    localStorage.setItem('vortex_products', JSON.stringify(updated));
    showToast('Product Deleted', 'Product removed from store catalog.', 'info');
  };

  // Cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('vortex_cart');
    return saved ? JSON.parse(saved) : [
      { product: PRODUCTS[0], quantity: 1, selectedColor: 'Obsidian Matte' }
    ];
  });

  const [savedForLater, setSavedForLater] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('vortex_saved_later');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('vortex_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('vortex_saved_later', JSON.stringify(savedForLater));
  }, [savedForLater]);

  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);

  const addToCart = (product: Product, quantity = 1, color?: string, size?: string) => {
    setCart(prev => {
      const existingIdx = prev.findIndex(item => item.product.id === product.id && item.selectedColor === color && item.selectedSize === size);
      if (existingIdx > -1) {
        const next = [...prev];
        next[existingIdx] = {
          ...next[existingIdx],
          quantity: next[existingIdx].quantity + quantity
        };
        return next;
      }
      return [...prev, { product, quantity, selectedColor: color, selectedSize: size }];
    });
    showToast('Added to Cart', `${product.name} (Qty: ${quantity})`, 'success');
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
    showToast('Item Removed', 'Product removed from your cart.', 'info');
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev =>
      prev.map(item => (item.product.id === productId ? { ...item, quantity } : item))
    );
  };

  const saveItemForLater = (productId: string) => {
    const item = cart.find(i => i.product.id === productId);
    if (!item) return;
    setCart(prev => prev.filter(i => i.product.id !== productId));
    setSavedForLater(prev => [...prev.filter(i => i.product.id !== productId), item]);
    showToast('Saved for Later', `${item.product.name} moved to saved items.`, 'info');
  };

  const moveItemToCart = (productId: string) => {
    const item = savedForLater.find(i => i.product.id === productId);
    if (!item) return;
    setSavedForLater(prev => prev.filter(i => i.product.id !== productId));
    addToCart(item.product, item.quantity, item.selectedColor, item.selectedSize);
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  const applyCoupon = (code: string) => {
    const found = COUPONS.find(c => c.code.toUpperCase() === code.trim().toUpperCase());
    if (!found) {
      return { success: false, message: 'Invalid coupon code. Try VORTEX20 or CYBERSAVE.' };
    }
    setAppliedCoupon(found);
    showToast('Coupon Applied! 🎉', `${found.code} saved ${found.discountPercentage}%`, 'success');
    return { success: true, message: `Applied ${found.code} successfully!` };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast('Coupon Removed', 'Standard pricing restored.', 'info');
  };

  // Cart Calculations
  const cartSubtotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  }, [cart]);

  const cartDiscount = useMemo(() => {
    if (!appliedCoupon) return 0;
    let disc = (cartSubtotal * appliedCoupon.discountPercentage) / 100;
    if (appliedCoupon.maxDiscount && disc > appliedCoupon.maxDiscount) {
      disc = appliedCoupon.maxDiscount;
    }
    return disc;
  }, [cartSubtotal, appliedCoupon]);

  const cartShipping = useMemo(() => {
    if (cartSubtotal === 0) return 0;
    return cartSubtotal >= 99 ? 0 : 15;
  }, [cartSubtotal]);

  const cartTax = useMemo(() => {
    return (cartSubtotal - cartDiscount) * 0.08; // 8% sales tax
  }, [cartSubtotal, cartDiscount]);

  const cartTotal = useMemo(() => {
    return Math.max(0, cartSubtotal - cartDiscount + cartTax + cartShipping);
  }, [cartSubtotal, cartDiscount, cartTax, cartShipping]);

  // Wishlist
  const [wishlist, setWishlist] = useState<string[]>(() => {
    const saved = localStorage.getItem('vortex_wishlist');
    return saved ? JSON.parse(saved) : ['prod-2', 'prod-3'];
  });

  useEffect(() => {
    localStorage.setItem('vortex_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const toggleWishlist = (productId: string) => {
    setWishlist(prev => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Removed from Wishlist', 'Item removed from favorites.', 'info');
        return prev.filter(id => id !== productId);
      } else {
        showToast('Saved to Wishlist ❤️', 'Item added to your favorites.', 'success');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  // Recently Viewed
  const [recentlyViewed, setRecentlyViewed] = useState<Product[]>([]);

  const addRecentlyViewed = (product: Product) => {
    setRecentlyViewed(prev => {
      const filtered = prev.filter(p => p.id !== product.id);
      return [product, ...filtered].slice(0, 8);
    });
  };

  // Orders
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('vortex_orders');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  useEffect(() => {
    localStorage.setItem('vortex_orders', JSON.stringify(orders));
  }, [orders]);

  const createOrder = (orderData: {
    shippingAddress: Address;
    paymentMethod: Order['paymentMethod'];
    shippingMethod: 'standard' | 'express';
  }): Order => {
    const orderNum = `VX-${Math.floor(1000 + Math.random() * 9000)}`;
    const shippingCost = orderData.shippingMethod === 'express' ? 25 : cartShipping;

    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber: orderNum,
      createdAt: new Date().toISOString(),
      items: cart.map(item => ({
        productId: item.product?.id || `prod-${Date.now()}`,
        productName: item.product?.name || 'Product',
        productImage: item.product?.images?.[0] || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80',
        price: item.product?.price || 0,
        quantity: item.quantity,
        color: item.selectedColor,
        size: item.selectedSize
      })),
      shippingAddress: orderData.shippingAddress,
      paymentMethod: orderData.paymentMethod,
      paymentStatus: 'paid',
      subtotal: cartSubtotal,
      tax: cartTax,
      shipping: shippingCost,
      discount: cartDiscount,
      couponCode: appliedCoupon?.code,
      total: cartSubtotal - cartDiscount + cartTax + shippingCost,
      status: 'confirmed',
      trackingNumber: `TRK-${Math.floor(10000000 + Math.random() * 90000000)}`,
      estimatedDelivery: 'In 2-4 business days',
      canCancel: true,
      canReturn: false,
      timeline: [
        {
          status: 'placed',
          title: 'Order Placed & Authorized',
          description: `Payment completed via ${orderData.paymentMethod.toUpperCase()}`,
          timestamp: 'Just now',
          completed: true
        },
        {
          status: 'confirmed',
          title: 'Order Confirmed',
          description: 'Ready for automated warehouse staging',
          timestamp: 'Just now',
          completed: true
        },
        {
          status: 'packed',
          title: 'Packaging & Quality Checks',
          description: '3D protective shock-proof boxing',
          timestamp: 'Pending',
          completed: false
        },
        {
          status: 'shipped',
          title: 'Courier Carrier Handover',
          description: 'Priority transit',
          timestamp: 'Pending',
          completed: false
        },
        {
          status: 'delivered',
          title: 'Doorstep Delivery',
          description: 'Contactless signature delivery',
          timestamp: 'Pending',
          completed: false
        }
      ]
    };

    setOrders(prev => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  const cancelOrder = (orderId: string, reason = 'Customer requested cancellation') => {
    setOrders(prev =>
      prev.map(ord => {
        if (ord.id === orderId) {
          return {
            ...ord,
            status: 'cancelled',
            canCancel: false,
            timeline: [
              ...ord.timeline,
              {
                status: 'cancelled',
                title: 'Order Cancelled',
                description: reason,
                timestamp: 'Just now',
                completed: true
              }
            ]
          };
        }
        return ord;
      })
    );
    showToast('Order Cancelled', 'Refund will reflect in your account in 3-5 days.', 'info');
  };

  const requestReturn = (orderId: string, reason: string) => {
    setOrders(prev =>
      prev.map(ord => {
        if (ord.id === orderId) {
          return {
            ...ord,
            status: 'returned',
            canReturn: false,
            timeline: [
              ...ord.timeline,
              {
                status: 'returned',
                title: 'Return & Refund Requested',
                description: `Reason: ${reason}. Return pickup scheduled within 48h.`,
                timestamp: 'Just now',
                completed: true
              }
            ]
          };
        }
        return ord;
      })
    );
    showToast('Return Initiated', 'Prepaid shipping label dispatched to your email.', 'success');
  };

  // Quick View Modal
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Cart Drawer
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);

  // Notifications
  const [notifications, setNotifications] = useState<AppNotification[]>(() => {
    const saved = localStorage.getItem('vortex_notifs');
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  const markNotificationRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const clearAllNotifications = () => {
    setNotifications([]);
    showToast('Notifications Cleared', undefined, 'info');
  };

  // Toasts
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (title: string, message?: string, type: Toast['type'] = 'info') => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    setToasts(prev => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  return (
    <AppContext.Provider
      value={{
        theme,
        toggleTheme,
        currency,
        setCurrency,
        language,
        setLanguage,
        formatPrice,
        user,
        isAuthenticated,
        login,
        register,
        logout,
        updateProfile,
        addresses,
        addAddress,
        editAddress,
        deleteAddress,
        setDefaultAddress,
        cart,
        savedForLater,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        saveItemForLater,
        moveItemToCart,
        clearCart,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        cartSubtotal,
        cartDiscount,
        cartTax,
        cartShipping,
        cartTotal,
        wishlist,
        toggleWishlist,
        isInWishlist,
        recentlyViewed,
        addRecentlyViewed,
        orders,
        createOrder,
        cancelOrder,
        requestReturn,
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        quickViewProduct,
        setQuickViewProduct,
        notifications,
        markNotificationRead,
        clearAllNotifications,
        toasts,
        showToast,
        removeToast,
        isCartDrawerOpen,
        setIsCartDrawerOpen
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
