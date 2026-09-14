import React, { useState } from 'react';
import {
  Database,
  Server,
  Layers,
  Shield,
  CreditCard,
  FolderTree,
  FileCode,
  Key,
  Network,
  Copy,
  CheckCircle2
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const BackendArchitecturePage: React.FC = () => {
  const { showToast } = useApp();
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copySnippet = (name: string, content: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(content);
      setCopiedKey(name);
      showToast('Copied to Clipboard', `${name} layout snippet copied.`, 'success');
      setTimeout(() => setCopiedKey(null), 2000);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Header */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
          <Database className="w-3.5 h-3.5" />
          Backend Architecture Blueprint & Schemas
        </div>
        <h1 className="font-display font-black text-2xl sm:text-4xl text-slate-900 dark:text-white">
          Node.js + Express + MongoDB Architecture
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2 max-w-3xl leading-relaxed">
          Comprehensive production blueprint detailing the modular folder hierarchy, Express REST endpoints, MongoDB Mongoose schema models, indexing strategies, JWT authorization, and Stripe payment gateway webhooks.
        </p>
      </div>

      {/* SECTION 1: FULL STACK ARCHITECTURE TOPOLOGY */}
      <section className="space-y-4">
        <h2 className="font-display font-black text-xl text-slate-900 dark:text-white flex items-center gap-2">
          <Network className="w-5 h-5 text-indigo-500" />
          1. High-Level Architectural Flow
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-wider">Tier 1: Client</span>
            <h3 className="font-display font-bold text-sm text-slate-900 dark:text-white">React 18 + Vite SPA</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Tailwind CSS, Canvas 3D models, Context API state, Axios interceptors, Stripe Elements SDK.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <span className="text-[10px] font-bold text-cyan-500 uppercase tracking-wider">Tier 2: API Gateway</span>
            <h3 className="font-display font-bold text-sm text-slate-900 dark:text-white">Nginx Reverse Proxy</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              SSL/TLS Termination, CORS headers, Helmet security, rate limiter (express-rate-limit 100 req/min).
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-wider">Tier 3: Backend API</span>
            <h3 className="font-display font-bold text-sm text-slate-900 dark:text-white">Node.js + Express 5</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              MVC Controllers, Service layers, JWT token auth, RBAC middleware, Stripe Webhook listener.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <span className="text-[10px] font-bold text-amber-500 uppercase tracking-wider">Tier 4: Persistence</span>
            <h3 className="font-display font-bold text-sm text-slate-900 dark:text-white">MongoDB + Redis</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Mongoose Schemas with compound indexes, transactions for checkout consistency, Redis session store.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 2: PRODUCTION DIRECTORY STRUCTURE */}
      <section className="space-y-4">
        <h2 className="font-display font-black text-xl text-slate-900 dark:text-white flex items-center gap-2">
          <FolderTree className="w-5 h-5 text-indigo-500" />
          2. Backend Directory Layout
        </h2>
        <div className="p-6 rounded-3xl bg-slate-900 text-slate-200 font-mono text-xs overflow-x-auto border border-slate-800 leading-relaxed">
          <pre>{`backend/
├── src/
│   ├── config/
│   │   ├── db.ts               # MongoDB Mongoose connection pool & event listeners
│   │   ├── redis.ts            # Redis client for caching & rate limiting
│   │   └── stripe.ts           # Stripe secret initialization & webhook signing key
│   ├── controllers/
│   │   ├── authController.ts   # register, login, refreshToken, forgotPassword
│   │   ├── productController.ts# getProducts, getProductById, createProduct, updateProduct
│   │   ├── orderController.ts  # createOrder, getMyOrders, getOrderById, updateStatus
│   │   ├── paymentController.ts# createStripeIntent, handleStripeWebhook
│   │   ├── reviewController.ts # addReview, getProductReviews
│   │   └── adminController.ts  # getAnalytics, manageInventory, getAllUsers
│   ├── middleware/
│   │   ├── authMiddleware.ts   # verifyJWTToken, extractBearerToken
│   │   ├── rbacMiddleware.ts   # checkRole(['admin', 'superadmin'])
│   │   ├── rateLimiter.ts      # DDoS and brute-force protection
│   │   ├── errorHandler.ts     # Global AppError handler & stack trace mask
│   │   └── uploadMiddleware.ts # Multer S3 client for product image uploads
│   ├── models/
│   │   ├── User.ts             # User schema with bcrypt hashing & role enum
│   │   ├── Product.ts          # Product schema with compound search indexes & 3D attributes
│   │   ├── Order.ts            # Order schema with shipping snapshot, Stripe ID & status
│   │   ├── Review.ts           # Review schema with verified purchase reference
│   │   ├── Cart.ts             # Persistent cart session schema
│   │   └── Coupon.ts           # Promotional coupons with expiry date and usage limit
│   ├── routes/
│   │   ├── authRoutes.ts       # /api/v1/auth
│   │   ├── productRoutes.ts    # /api/v1/products
│   │   ├── orderRoutes.ts      # /api/v1/orders
│   │   ├── paymentRoutes.ts    # /api/v1/payments
│   │   ├── reviewRoutes.ts     # /api/v1/reviews
│   │   └── adminRoutes.ts      # /api/v1/admin
│   ├── services/
│   │   ├── emailService.ts     # SendGrid/Resend transactional order receipts
│   │   ├── stripeService.ts    # PaymentIntent generation, refunds, webhooks
│   │   └── inventoryService.ts # Atomic stock decrement using MongoDB transactions
│   ├── utils/
│   │   ├── AppError.ts         # Operational error class with HTTP status codes
│   │   └── validators.ts       # Joi/Zod request payload schemas
│   ├── app.ts                  # Express server middlewares & route mounts
│   └── server.ts               # HTTP cluster boot & graceful shutdown handlers
├── .env.example
├── package.json
└── tsconfig.json`}</pre>
        </div>
      </section>

      {/* SECTION 3: MONGOOSE SCHEMAS */}
      <section className="space-y-6">
        <h2 className="font-display font-black text-xl text-slate-900 dark:text-white flex items-center gap-2">
          <Database className="w-5 h-5 text-emerald-500" />
          3. MongoDB Database Schemas
        </h2>

        <div className="space-y-4">
          {/* User Schema */}
          <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-display font-bold text-sm text-slate-900 dark:text-white">
                A. User Schema (`users` collection)
              </h3>
              <span className="text-[11px] font-mono text-indigo-500">Mongoose Model: User</span>
            </div>
            <div className="bg-slate-950 text-slate-300 p-4 rounded-xl font-mono text-xs overflow-x-auto">
              <pre>{`const UserSchema = new Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, index: true },
  passwordHash: { type: String, required: true, select: false },
  role: { type: String, enum: ['customer', 'admin', 'editor'], default: 'customer' },
  avatarUrl: { type: String, default: 'default-avatar.png' },
  phone: { type: String },
  addresses: [{
    fullName: String,
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String,
    isDefault: { type: Boolean, default: false }
  }],
  wishlist: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
  isVerified: { type: Boolean, default: false },
  stripeCustomerId: { type: String, index: true },
  createdAt: { type: Date, default: Date.now }
});`}</pre>
            </div>
          </div>

          {/* Product Schema */}
          <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-display font-bold text-sm text-slate-900 dark:text-white">
                B. Product Schema (`products` collection)
              </h3>
              <span className="text-[11px] font-mono text-emerald-500">Mongoose Model: Product</span>
            </div>
            <div className="bg-slate-950 text-slate-300 p-4 rounded-xl font-mono text-xs overflow-x-auto">
              <pre>{`const ProductSchema = new Schema({
  name: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true, index: true },
  brand: { type: String, required: true, index: true },
  category: { type: String, required: true, index: true },
  price: { type: Number, required: true, min: 0 },
  originalPrice: { type: Number, min: 0 },
  discountPercentage: { type: Number, default: 0 },
  stock: { type: Number, required: true, default: 0 },
  images: [{ type: String, required: true }],
  model3DType: { type: String, enum: ['headphone', 'watch', 'sneaker', 'gadget'], default: 'gadget' },
  colors: [{
    name: String,
    hex: String,
    imageIndex: Number
  }],
  sizes: [String],
  features: [String],
  specifications: { type: Map, of: String },
  rating: { type: Number, default: 5.0, min: 0, max: 5 },
  reviewCount: { type: Number, default: 0 },
  isFeatured: { type: Boolean, default: false },
  isFlashSale: { type: Boolean, default: false },
  isBestSeller: { type: Boolean, default: false }
}, { timestamps: true });

// Compound text index for lightning fast multi-field search
ProductSchema.index({ name: 'text', brand: 'text', category: 'text', description: 'text' });
ProductSchema.index({ category: 1, price: 1 });`}</pre>
            </div>
          </div>

          {/* Order Schema */}
          <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-display font-bold text-sm text-slate-900 dark:text-white">
                C. Order Schema (`orders` collection)
              </h3>
              <span className="text-[11px] font-mono text-cyan-500">Mongoose Model: Order</span>
            </div>
            <div className="bg-slate-950 text-slate-300 p-4 rounded-xl font-mono text-xs overflow-x-auto">
              <pre>{`const OrderSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  items: [{
    productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    name: String,
    image: String,
    price: Number,
    quantity: { type: Number, required: true, min: 1 },
    selectedColor: String,
    selectedSize: String
  }],
  shippingAddress: {
    fullName: String,
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String,
    phone: String
  },
  paymentMethod: { type: String, enum: ['stripe_card', 'upi', 'netbanking', 'cod'], required: true },
  paymentStatus: { type: String, enum: ['pending', 'succeeded', 'failed', 'refunded'], default: 'pending' },
  stripePaymentIntentId: { type: String, index: true },
  subtotal: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  tax: { type: Number, default: 0 },
  shippingFee: { type: Number, default: 0 },
  totalAmount: { type: Number, required: true },
  status: { type: String, enum: ['placed', 'processing', 'shipped', 'delivered', 'cancelled'], default: 'placed', index: true },
  trackingNumber: { type: String },
  carrier: { type: String, default: 'FedEx Express' }
}, { timestamps: true });`}</pre>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: REST API ENDPOINTS TABLE */}
      <section className="space-y-4">
        <h2 className="font-display font-black text-xl text-slate-900 dark:text-white flex items-center gap-2">
          <FileCode className="w-5 h-5 text-indigo-500" />
          4. Express REST API Endpoints Specification
        </h2>

        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="p-4">Method</th>
                  <th className="p-4">Route Path</th>
                  <th className="p-4">Access Level</th>
                  <th className="p-4">Functionality</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-mono text-slate-700 dark:text-slate-300">
                <tr>
                  <td className="p-4 font-bold text-emerald-600">POST</td>
                  <td className="p-4">/api/v1/auth/register</td>
                  <td className="p-4 font-sans text-slate-400">Public</td>
                  <td className="p-4 font-sans">Creates user document with salted bcrypt hash</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-emerald-600">POST</td>
                  <td className="p-4">/api/v1/auth/login</td>
                  <td className="p-4 font-sans text-slate-400">Public</td>
                  <td className="p-4 font-sans">Returns Signed JWT Access (15m) & Refresh Token (7d)</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-blue-600">GET</td>
                  <td className="p-4">/api/v1/products</td>
                  <td className="p-4 font-sans text-slate-400">Public</td>
                  <td className="p-4 font-sans">Paginated list with category, brand, price & 3D filters</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-blue-600">GET</td>
                  <td className="p-4">/api/v1/products/:id</td>
                  <td className="p-4 font-sans text-slate-400">Public</td>
                  <td className="p-4 font-sans">Full specs, 3D model metadata, and customer reviews</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-emerald-600">POST</td>
                  <td className="p-4">/api/v1/payments/create-intent</td>
                  <td className="p-4 font-sans text-indigo-500 font-bold">User JWT</td>
                  <td className="p-4 font-sans">Calculates total server-side & returns Stripe clientSecret</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-emerald-600">POST</td>
                  <td className="p-4">/api/v1/payments/webhook</td>
                  <td className="p-4 font-sans text-amber-500 font-bold">Stripe Signature</td>
                  <td className="p-4 font-sans">Listens for payment_intent.succeeded & updates Order</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-blue-600">GET</td>
                  <td className="p-4">/api/v1/orders/my-orders</td>
                  <td className="p-4 font-sans text-indigo-500 font-bold">User JWT</td>
                  <td className="p-4 font-sans">Fetches verified customer shipment history and tracking</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-amber-600">PATCH</td>
                  <td className="p-4">/api/v1/admin/orders/:id/status</td>
                  <td className="p-4 font-sans text-rose-500 font-bold">Admin Only</td>
                  <td className="p-4 font-sans">Updates order status (Processing, Shipped, Delivered)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
};
