export type Currency = 'USD' | 'EUR' | 'GBP' | 'INR' | 'CAD';
export type Language = 'EN' | 'ES' | 'FR' | 'DE' | 'HI';

export interface Product {
  id: string;
  name: string;
  slug: string;
  brand: string;
  category: string;
  price: number;
  originalPrice: number;
  discount: number; // percentage
  rating: number;
  reviewCount: number;
  stock: number;
  isNewArrival?: boolean;
  isFeatured?: boolean;
  isBestSeller?: boolean;
  isTrending?: boolean;
  isFlashSale?: boolean;
  flashSaleEndsAt?: string;
  images: string[];
  description: string;
  features: string[];
  specifications: Record<string, string>;
  colors?: { name: string; hex: string; imageIndex?: number }[];
  sizes?: string[];
  tags: string[];
  model3DType?: 'sphere' | 'cube' | 'gadget' | 'headphone' | 'watch' | 'sneaker' | 'laptop';
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

export interface Address {
  id: string;
  fullName: string;
  mobileNumber?: string;
  phone?: string;
  email?: string;
  country: string;
  state: string;
  city: string;
  zipCode: string;
  streetAddress?: string;
  street?: string;
  landmark?: string;
  isDefault: boolean;
  type?: 'home' | 'work' | 'other';
}

export interface Review {
  id: string;
  productId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  title: string;
  comment: string;
  date: string;
  verifiedPurchase: boolean;
  images?: string[];
  likes: number;
}

export interface OrderItem {
  productId: string;
  productName: string;
  productImage: string;
  price: number;
  quantity: number;
  color?: string;
  size?: string;
}

export type OrderStatus = 'placed' | 'confirmed' | 'processing' | 'packed' | 'shipped' | 'out_for_delivery' | 'delivered' | 'cancelled' | 'returned';

export interface OrderTimelineEvent {
  status: OrderStatus;
  title: string;
  description: string;
  timestamp: string;
  completed: boolean;
}

export interface Order {
  id: string;
  orderNumber?: string;
  createdAt: string;
  items: any[];
  shippingAddress: Address;
  paymentMethod: any;
  paymentStatus?: any;
  subtotal?: number;
  tax?: number;
  shipping?: number;
  discount?: number;
  couponCode?: string;
  total?: number;
  totalAmount?: number;
  status: OrderStatus;
  timeline?: OrderTimelineEvent[];
  trackingNumber?: string;
  estimatedDelivery?: string;
  canCancel?: boolean;
  canReturn?: boolean;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  role: 'customer' | 'admin';
  createdAt: string;
}

export interface Coupon {
  code: string;
  discountPercentage: number;
  maxDiscount?: number;
  minOrderValue: number;
  description: string;
  validUntil: string;
}

export interface AppNotification {
  id: string;
  type: 'order' | 'payment' | 'promo' | 'stock';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  link?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  itemCount: number;
  iconName: string;
  description: string;
}
