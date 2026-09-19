import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  BarChart3,
  Package,
  FolderTree,
  ShoppingBag,
  Users,
  Tag,
  Star,
  Settings,
  Plus,
  Trash2,
  Edit2,
  CheckCircle2,
  XCircle,
  Clock,
  Printer,
  Search,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  ArrowUpRight,
} from "lucide-react";

import InvoiceModal from "../components/InvoiceModal";

const AdminDashboardPage = () => {
  
  

  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("overview"); // overview, products, orders, categories, coupons, users, settings
  const [selectedInvoiceOrder, setSelectedInvoiceOrder] = useState(null);

  // Search in tables
  const [productSearch, setProductSearch] = useState("");
  const [orderSearch, setOrderSearch] = useState("");

  // Product Add / Edit Modal state
  const [editingProduct, setEditingProduct] = useState(null);
  const [showProductModal, setShowProductModal] = useState(false);
  const [productForm, setProductForm] = useState({
    name: "",
    category: "green-tea",
    price: 24,
    stock: 25,
    tag: "Artisanal Harvest",
    origin: "Kyoto, Japan",
    description: "",
    image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80",
  });

  // Category Add state
  const [newCatName, setNewCatName] = useState("");
  const [newCatSlug, setNewCatSlug] = useState("");

  // Coupon Add state
  const [newCoupon, setNewCoupon] = useState({
    code: "",
    discountPercent: 15,
    minOrderAmount: 30,
    freeShipping: false,
    expiry: "2025-12-31",
  });

  // Store Settings state
  const [storeSettingsForm, setStoreSettingsForm] = useState({ ...settings });

  // Calculate high-level stats
  const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);
  const totalOrdersCount = orders.length;
  const activeProductsCount = products.length;
  const totalUsersCount = users.length;

  const handleOpenNewProduct = () => {
    setEditingProduct(null);
    setProductForm({
      name: "",
      category: categories[0]?.id || "green-tea",
      price: 24,
      stock: 30,
      tag: "Seasonal Flush",
      origin: "Uji, Kyoto, Japan",
      description: "Harvested during early dawn, shade-grown for 21 days to preserve rich umami.",
      image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80",
    });
    setShowProductModal(true);
  };

  const handleOpenEditProduct = (p) => {
    setEditingProduct(p);
    setProductForm({
      name: p.name,
      category: p.category,
      price: p.price,
      stock: p.stock,
      tag: p.tag || "",
      origin: p.origin || "",
      description: p.description || "",
      image: p.image || p.images?.[0] || "",
    });
    setShowProductModal(true);
  };

  const handleSaveProduct = (e) => {
    e.preventDefault();
    if (!productForm.name) {
      showToast("Product name is required", "error");
      return;
    }

    if (editingProduct) {
      updateProduct(editingProduct.id, {
        ...productForm,
        price: Number(productForm.price),
        stock: Number(productForm.stock),
      });
      showToast(`Updated "${productForm.name}" successfully!`);
    } else {
      addProduct({
        ...productForm,
        price: Number(productForm.price),
        stock: Number(productForm.stock),
        rating: 4.9,
        reviewsCount: 1,
        images: [productForm.image],
      });
      showToast(`Added new tea "${productForm.name}"!`);
    }
    setShowProductModal(false);
  };

  const handleAddCategory = (e) => {
    e.preventDefault();
    if (!newCatName.trim()) return;
    const slug = newCatSlug.trim() || newCatName.toLowerCase().replace(/\s+/g, "-");
    addCategory({
      name: newCatName.trim(),
      slug: slug,
      description: `Finest selections of ${newCatName.trim()} harvests.`,
      image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=800&q=80",
    });
    setNewCatName("");
    setNewCatSlug("");
    showToast(`Added category "${newCatName}"`);
  };

  const handleAddCoupon = (e) => {
    e.preventDefault();
    if (!newCoupon.code.trim()) return;
    addCoupon({
      ...newCoupon,
      code: newCoupon.code.toUpperCase().trim(),
      discountPercent: Number(newCoupon.discountPercent),
      minOrderAmount: Number(newCoupon.minOrderAmount),
    });
    setNewCoupon({
      code: "",
      discountPercent: 15,
      minOrderAmount: 30,
      freeShipping: false,
      expiry: "2025-12-31",
    });
    showToast(`Coupon created successfully!`);
  };

  const handleSaveSettings = (e) => {
    e.preventDefault();
    updateSettings(storeSettingsForm);
    showToast("Store configuration updated!");
  };

  return (
    <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Top Banner Header */}
      <div className="bg-stone-900 text-stone-100 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-xl border border-stone-800">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span>Curator Control Hub &bull; Store Admin</span>
          </div>
          <h1 className="font-serif-tea text-3xl font-bold tracking-tight text-white">
            Camellia Leaf Operations
          </h1>
          <p className="text-xs text-stone-400">
            Real-time management of inventories, multi-carrier orders, vouchers, and store policies.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/shop"
            className="px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold border border-stone-700 transition-colors"
          >
            Preview Live Shop
          </Link>
          <Link
            to="/dashboard"
            className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-semibold transition-colors"
          >
            My Customer Account
          </Link>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 border-b border-stone-200 dark:border-stone-800 text-xs font-semibold">
        {[
          { id: "overview", label: "Overview & Analytics", icon: BarChart3 },
          { id: "products", label: `Teas & Products (${products.length})`, icon: Package },
          { id: "orders", label: `Harvest Orders (${orders.length})`, icon: ShoppingBag },
          { id: "categories", label: `Categories (${categories.length})`, icon: FolderTree },
          { id: "coupons", label: `Vouchers & Promos (${coupons.length})`, icon: Tag },
          { id: "users", label: `Registered Patrons (${users.length})`, icon: Users },
          { id: "settings", label: "Store Settings", icon: Settings },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? "bg-emerald-800 text-white shadow-sm"
                  : "bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: OVERVIEW & ANALYTICS */}
      {activeTab === "overview" && (
        <div className="space-y-8">
          {/* Key Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="bg-white dark:bg-stone-900 p-6 rounded-3xl border border-stone-200/80 dark:border-stone-800 shadow-sm space-y-2">
              <div className="flex items-center justify-between text-xs text-stone-500">
                <span>Gross Revenue</span>
                <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 flex items-center justify-center">
                  <DollarSign className="w-4 h-4" />
                </div>
              </div>
              <div className="font-serif-tea text-3xl font-bold text-stone-900 dark:text-stone-100">
                ${totalRevenue.toFixed(2)}
              </div>
              <div className="text-[11px] text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>+18.4% compared to previous month</span>
              </div>
            </div>

            <div className="bg-white dark:bg-stone-900 p-6 rounded-3xl border border-stone-200/80 dark:border-stone-800 shadow-sm space-y-2">
              <div className="flex items-center justify-between text-xs text-stone-500">
                <span>Orders Dispatched</span>
                <div className="w-8 h-8 rounded-xl bg-blue-100 dark:bg-blue-950/80 text-blue-800 dark:text-blue-300 flex items-center justify-center">
                  <ShoppingBag className="w-4 h-4" />
                </div>
              </div>
              <div className="font-serif-tea text-3xl font-bold text-stone-900 dark:text-stone-100">
                {totalOrdersCount}
              </div>
              <div className="text-[11px] text-stone-400">100% fulfillment SLA met</div>
            </div>

            <div className="bg-white dark:bg-stone-900 p-6 rounded-3xl border border-stone-200/80 dark:border-stone-800 shadow-sm space-y-2">
              <div className="flex items-center justify-between text-xs text-stone-500">
                <span>Active Cultivars</span>
                <div className="w-8 h-8 rounded-xl bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 flex items-center justify-center">
                  <Package className="w-4 h-4" />
                </div>
              </div>
              <div className="font-serif-tea text-3xl font-bold text-stone-900 dark:text-stone-100">
                {activeProductsCount}
              </div>
              <div className="text-[11px] text-stone-400">Across 6 specialty origins</div>
            </div>

            <div className="bg-white dark:bg-stone-900 p-6 rounded-3xl border border-stone-200/80 dark:border-stone-800 shadow-sm space-y-2">
              <div className="flex items-center justify-between text-xs text-stone-500">
                <span>Society Patrons</span>
                <div className="w-8 h-8 rounded-xl bg-purple-100 dark:bg-purple-950/80 text-purple-800 dark:text-purple-300 flex items-center justify-center">
                  <Users className="w-4 h-4" />
                </div>
              </div>
              <div className="font-serif-tea text-3xl font-bold text-stone-900 dark:text-stone-100">
                {totalUsersCount}
              </div>
              <div className="text-[11px] text-stone-400">92% repeat ordering rate</div>
            </div>
          </div>

          {/* Quick Recent Orders Preview */}
          <div className="bg-white dark:bg-stone-900 rounded-3xl p-6 border border-stone-200/80 dark:border-stone-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-serif-tea text-lg font-bold text-stone-900 dark:text-stone-100">
                  Live Incoming Orders
                </h3>
                <p className="text-xs text-stone-500">Latest customer orders requiring dispatch processing</p>
              </div>
              <button
                onClick={() => setActiveTab("orders")}
                className="text-xs font-semibold text-emerald-800 dark:text-emerald-400 hover:underline"
              >
                View all orders &rarr;
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="text-stone-400 uppercase tracking-wider border-b border-stone-100 dark:border-stone-800">
                  <tr>
                    <th className="py-2.5">Order</th>
                    <th className="py-2.5">Customer</th>
                    <th className="py-2.5">Status</th>
                    <th className="py-2.5">Teas</th>
                    <th className="py-2.5 text-right">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 dark:divide-stone-800">
                  {orders.slice(0, 4).map((order) => (
                    <tr key={order.id} className="hover:bg-stone-50 dark:hover:bg-stone-800/50">
                      <td className="py-3 font-bold text-stone-900 dark:text-stone-100">
                        {order.id}
                      </td>
                      <td className="py-3">
                        <div className="font-medium text-stone-800 dark:text-stone-200">
                          {order.customerName}
                        </div>
                        <div className="text-stone-400 text-[10px]">{order.email}</div>
                      </td>
                      <td className="py-3">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300">
                          {order.status}
                        </span>
                      </td>
                      <td className="py-3 text-stone-500">
                        {order.items.length} tins
                      </td>
                      <td className="py-3 text-right font-bold text-stone-900 dark:text-stone-100">
                        ${order.total?.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: PRODUCTS MANAGEMENT */}
      {activeTab === "products" && (
        <div className="bg-white dark:bg-stone-900 rounded-3xl p-6 border border-stone-200/80 dark:border-stone-800 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-serif-tea text-xl font-bold text-stone-900 dark:text-stone-100">
                Tea Inventory Management
              </h3>
              <p className="text-xs text-stone-500">
                Update stock volumes, origin notes, pricing, and create new harvest listings.
              </p>
            </div>

            <button
              onClick={handleOpenNewProduct}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-semibold shadow-sm transition-colors self-start"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Tea Product</span>
            </button>
          </div>

          {/* Search bar */}
          <div className="max-w-xs relative">
            <input
              type="text"
              placeholder="Search products..."
              value={productSearch}
              onChange={(e) => setProductSearch(e.target.value)}
              className="w-full text-xs pl-8 pr-3 py-2 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800"
            />
            <Search className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-2.5" />
          </div>

          {/* Products Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="text-stone-400 uppercase tracking-wider border-b border-stone-100 dark:border-stone-800">
                <tr>
                  <th className="py-2.5">Tea / Cultivar</th>
                  <th className="py-2.5">Category</th>
                  <th className="py-2.5">Price</th>
                  <th className="py-2.5">Stock Level</th>
                  <th className="py-2.5">Origin</th>
                  <th className="py-2.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 dark:divide-stone-800">
                {products
                  .filter((p) =>
                    p.name.toLowerCase().includes(productSearch.toLowerCase())
                  )
                  .map((product) => (
                    <tr key={product.id} className="hover:bg-stone-50 dark:hover:bg-stone-800/40">
                      <td className="py-3">
                        <div className="flex items-center gap-3">
                          <img
                            src={product.images?.[0] || product.image}
                            alt={product.name}
                            className="w-10 h-10 rounded-xl object-cover"
                          />
                          <div>
                            <span className="font-bold text-stone-900 dark:text-stone-100 block">
                              {product.name}
                            </span>
                            <span className="text-[10px] text-stone-400">
                              {product.tag || "Standard Batch"}
                            </span>
                          </div>
                        </div>
                      </td>

                      <td className="py-3 capitalize text-stone-600 dark:text-stone-300">
                        {product.category?.replace("-", " ")}
                      </td>

                      <td className="py-3 font-semibold text-stone-900 dark:text-stone-100">
                        ${product.price?.toFixed(2)}
                      </td>

                      <td className="py-3">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            product.stock > 10
                              ? "bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300"
                              : product.stock > 0
                              ? "bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300"
                              : "bg-red-100 dark:bg-red-950 text-red-800 dark:text-red-300"
                          }`}
                        >
                          {product.stock} in stock
                        </span>
                      </td>

                      <td className="py-3 text-stone-500 truncate max-w-[140px]">
                        {product.origin}
                      </td>

                      <td className="py-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleOpenEditProduct(product)}
                            className="p-1.5 rounded-lg border border-stone-200 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-600 dark:text-stone-300"
                            title="Edit"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              if (window.confirm(`Delete "${product.name}"?`)) {
                                deleteProduct(product.id);
                                showToast(`Deleted product "${product.name}"`);
                              }
                            }}
                            className="p-1.5 rounded-lg border border-stone-200 dark:border-stone-700 hover:bg-red-50 dark:hover:bg-red-950/50 text-stone-400 hover:text-red-600"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: ORDERS MANAGEMENT */}
      {activeTab === "orders" && (
        <div className="bg-white dark:bg-stone-900 rounded-3xl p-6 border border-stone-200/80 dark:border-stone-800 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-serif-tea text-xl font-bold text-stone-900 dark:text-stone-100">
                Customer Order Fulfillments
              </h3>
              <p className="text-xs text-stone-500">
                Update statuses (Processing, Shipped, Delivered), assign tracking, or generate invoices.
              </p>
            </div>

            <div className="max-w-xs relative">
              <input
                type="text"
                placeholder="Search orders..."
                value={orderSearch}
                onChange={(e) => setOrderSearch(e.target.value)}
                className="w-full text-xs pl-8 pr-3 py-2 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800"
              />
              <Search className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-2.5" />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="text-stone-400 uppercase tracking-wider border-b border-stone-100 dark:border-stone-800">
                <tr>
                  <th className="py-2.5">Order ID</th>
                  <th className="py-2.5">Date</th>
                  <th className="py-2.5">Customer</th>
                  <th className="py-2.5">Status</th>
                  <th className="py-2.5">Payment</th>
                  <th className="py-2.5">Total</th>
                  <th className="py-2.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 dark:divide-stone-800">
                {orders
                  .filter(
                    (o) =>
                      o.id.toLowerCase().includes(orderSearch.toLowerCase()) ||
                      o.customerName.toLowerCase().includes(orderSearch.toLowerCase())
                  )
                  .map((order) => (
                    <tr key={order.id} className="hover:bg-stone-50 dark:hover:bg-stone-800/40">
                      <td className="py-3 font-bold text-stone-900 dark:text-stone-100">
                        {order.id}
                      </td>
                      <td className="py-3 text-stone-500">{order.date}</td>
                      <td className="py-3">
                        <div className="font-semibold text-stone-900 dark:text-stone-100">
                          {order.customerName}
                        </div>
                        <div className="text-[10px] text-stone-400">{order.email}</div>
                      </td>
                      <td className="py-3">
                        <select
                          value={order.status}
                          onChange={(e) => {
                            updateOrderStatus(order.id, e.target.value);
                            showToast(`Order ${order.id} marked as ${e.target.value}`);
                          }}
                          className="text-[11px] font-bold py-1 px-2 rounded-lg border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-800 dark:text-stone-200 focus:ring-1 focus:ring-emerald-700"
                        >
                          <option value="Processing">Processing</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td className="py-3 text-stone-600 dark:text-stone-300">
                        {order.paymentMethod}
                      </td>
                      <td className="py-3 font-bold text-stone-900 dark:text-stone-100">
                        ${order.total?.toFixed(2)}
                      </td>
                      <td className="py-3 text-right">
                        <button
                          onClick={() => setSelectedInvoiceOrder(order)}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 font-semibold hover:bg-stone-200"
                        >
                          <Printer className="w-3 h-3 text-emerald-700" />
                          <span>Invoice</span>
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: CATEGORIES MANAGEMENT */}
      {activeTab === "categories" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4 bg-white dark:bg-stone-900 rounded-3xl p-6 border border-stone-200/80 dark:border-stone-800 shadow-sm space-y-4">
            <h3 className="font-serif-tea text-lg font-bold text-stone-900 dark:text-stone-100">
              Create New Category
            </h3>
            <form onSubmit={handleAddCategory} className="space-y-3">
              <div>
                <label className="text-xs font-bold block mb-1">Category Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Pu-erh Fermented"
                  value={newCatName}
                  onChange={(e) => setNewCatName(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800"
                />
              </div>
              <div>
                <label className="text-xs font-bold block mb-1">Slug (URL)</label>
                <input
                  type="text"
                  placeholder="e.g. puerh-tea"
                  value={newCatSlug}
                  onChange={(e) => setNewCatSlug(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-emerald-800 text-white text-xs font-semibold hover:bg-emerald-700 transition-colors"
              >
                Add Category
              </button>
            </form>
          </div>

          <div className="lg:col-span-8 bg-white dark:bg-stone-900 rounded-3xl p-6 border border-stone-200/80 dark:border-stone-800 shadow-sm space-y-4">
            <h3 className="font-serif-tea text-lg font-bold text-stone-900 dark:text-stone-100">
              Current Categories ({categories.length})
            </h3>
            <div className="divide-y divide-stone-100 dark:divide-stone-800">
              {categories.map((cat) => (
                <div
                  key={cat.id}
                  className="py-3 flex items-center justify-between gap-4 text-xs"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-10 h-10 rounded-xl object-cover"
                    />
                    <div>
                      <div className="font-bold text-stone-900 dark:text-stone-100">
                        {cat.name}
                      </div>
                      <div className="text-stone-400 font-mono text-[10px]">{cat.slug || cat.id}</div>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      if (window.confirm(`Delete category "${cat.name}"?`)) {
                        deleteCategory(cat.id);
                        showToast(`Deleted category "${cat.name}"`);
                      }
                    }}
                    className="p-1.5 text-stone-400 hover:text-red-500 rounded"
                    title="Delete Category"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: COUPONS & DISCOUNTS */}
      {activeTab === "coupons" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4 bg-white dark:bg-stone-900 rounded-3xl p-6 border border-stone-200/80 dark:border-stone-800 shadow-sm space-y-4">
            <h3 className="font-serif-tea text-lg font-bold text-stone-900 dark:text-stone-100">
              Create Promotional Code
            </h3>
            <form onSubmit={handleAddCoupon} className="space-y-3">
              <div>
                <label className="text-xs font-bold block mb-1">Coupon Code *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. AUTUMN25"
                  value={newCoupon.code}
                  onChange={(e) => setNewCoupon({ ...newCoupon, code: e.target.value })}
                  className="w-full text-xs font-mono uppercase p-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800"
                />
              </div>

              <div>
                <label className="text-xs font-bold block mb-1">Discount Percent (%)</label>
                <input
                  type="number"
                  min="5"
                  max="70"
                  value={newCoupon.discountPercent}
                  onChange={(e) =>
                    setNewCoupon({ ...newCoupon, discountPercent: e.target.value })
                  }
                  className="w-full text-xs p-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800"
                />
              </div>

              <div>
                <label className="text-xs font-bold block mb-1">Min Order Amount ($)</label>
                <input
                  type="number"
                  min="0"
                  value={newCoupon.minOrderAmount}
                  onChange={(e) =>
                    setNewCoupon({ ...newCoupon, minOrderAmount: e.target.value })
                  }
                  className="w-full text-xs p-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="freeShip"
                  checked={newCoupon.freeShipping}
                  onChange={(e) =>
                    setNewCoupon({ ...newCoupon, freeShipping: e.target.checked })
                  }
                  className="rounded text-emerald-800"
                />
                <label htmlFor="freeShip" className="text-xs font-semibold">
                  Also grant Free Shipping
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-emerald-800 text-white text-xs font-semibold hover:bg-emerald-700 transition-colors mt-2"
              >
                Publish Coupon
              </button>
            </form>
          </div>

          <div className="lg:col-span-8 bg-white dark:bg-stone-900 rounded-3xl p-6 border border-stone-200/80 dark:border-stone-800 shadow-sm space-y-4">
            <h3 className="font-serif-tea text-lg font-bold text-stone-900 dark:text-stone-100">
              Active Vouchers & Rules ({coupons.length})
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="text-stone-400 uppercase tracking-wider border-b border-stone-100 dark:border-stone-800">
                  <tr>
                    <th className="py-2.5">Code</th>
                    <th className="py-2.5">Benefit</th>
                    <th className="py-2.5">Threshold</th>
                    <th className="py-2.5">Status</th>
                    <th className="py-2.5 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 dark:divide-stone-800">
                  {coupons.map((c) => (
                    <tr key={c.id}>
                      <td className="py-3 font-mono font-bold text-emerald-800 dark:text-emerald-400">
                        {c.code}
                      </td>
                      <td className="py-3">
                        {c.freeShipping ? "Free Shipping" : `${c.discountPercent}% Off`}
                      </td>
                      <td className="py-3 text-stone-500">${c.minOrderAmount} min</td>
                      <td className="py-3">
                        <button
                          onClick={() => toggleCouponStatus(c.id)}
                          className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                            c.isActive
                              ? "bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300"
                              : "bg-stone-200 dark:bg-stone-800 text-stone-500"
                          }`}
                        >
                          {c.isActive ? "Active" : "Disabled"}
                        </button>
                      </td>
                      <td className="py-3 text-right">
                        <button
                          onClick={() => deleteCoupon(c.id)}
                          className="text-stone-400 hover:text-red-500 p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: USERS MANAGEMENT */}
      {activeTab === "users" && (
        <div className="bg-white dark:bg-stone-900 rounded-3xl p-6 border border-stone-200/80 dark:border-stone-800 shadow-sm space-y-6">
          <div>
            <h3 className="font-serif-tea text-xl font-bold text-stone-900 dark:text-stone-100">
              Registered Tea Society Patrons ({users.length})
            </h3>
            <p className="text-xs text-stone-500">
              Audit patron credentials, member tiers, roles, and toggle access status.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="text-stone-400 uppercase tracking-wider border-b border-stone-100 dark:border-stone-800">
                <tr>
                  <th className="py-2.5">Member</th>
                  <th className="py-2.5">Email</th>
                  <th className="py-2.5">Role</th>
                  <th className="py-2.5">Account Status</th>
                  <th className="py-2.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 dark:divide-stone-800">
                {users.map((u) => (
                  <tr key={u.id}>
                    <td className="py-3 font-semibold text-stone-900 dark:text-stone-100">
                      {u.name}
                    </td>
                    <td className="py-3 text-stone-500">{u.email}</td>
                    <td className="py-3">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                          u.role === "admin"
                            ? "bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300"
                            : "bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300"
                        }`}
                      >
                        {u.role}
                      </span>
                    </td>
                    <td className="py-3">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          u.status === "active"
                            ? "bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300"
                            : "bg-red-100 dark:bg-red-950 text-red-800 dark:text-red-300"
                        }`}
                      >
                        {u.status}
                      </span>
                    </td>
                    <td className="py-3 text-right">
                      <button
                        onClick={() => {
                          toggleUserStatus(u.id);
                          showToast(`Toggled status for ${u.name}`);
                        }}
                        className="px-2.5 py-1 rounded-lg border border-stone-200 dark:border-stone-700 hover:bg-stone-100 text-stone-700 dark:text-stone-300 text-[11px] font-medium"
                      >
                        {u.status === "active" ? "Block Access" : "Activate"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 7: SETTINGS */}
      {activeTab === "settings" && (
        <div className="bg-white dark:bg-stone-900 rounded-3xl p-6 sm:p-8 border border-stone-200/80 dark:border-stone-800 shadow-sm space-y-6 max-w-2xl">
          <div>
            <h3 className="font-serif-tea text-xl font-bold text-stone-900 dark:text-stone-100">
              General Tea Shop Policies
            </h3>
            <p className="text-xs text-stone-500">
              Configure store identity, free delivery thresholds, tax rates, and support emails.
            </p>
          </div>

          <form onSubmit={handleSaveSettings} className="space-y-4">
            <div>
              <label className="text-xs font-bold block mb-1">Store Name</label>
              <input
                type="text"
                value={storeSettingsForm.storeName}
                onChange={(e) =>
                  setStoreSettingsForm({ ...storeSettingsForm, storeName: e.target.value })
                }
                className="w-full text-xs p-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold block mb-1">Free Shipping Threshold ($)</label>
                <input
                  type="number"
                  value={storeSettingsForm.freeShippingThreshold}
                  onChange={(e) =>
                    setStoreSettingsForm({
                      ...storeSettingsForm,
                      freeShippingThreshold: Number(e.target.value),
                    })
                  }
                  className="w-full text-xs p-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800"
                />
              </div>

              <div>
                <label className="text-xs font-bold block mb-1">Base Shipping Fee ($)</label>
                <input
                  type="number"
                  value={storeSettingsForm.standardShippingFee}
                  onChange={(e) =>
                    setStoreSettingsForm({
                      ...storeSettingsForm,
                      standardShippingFee: Number(e.target.value),
                    })
                  }
                  className="w-full text-xs p-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold block mb-1">Support Email</label>
                <input
                  type="email"
                  value={storeSettingsForm.contactEmail}
                  onChange={(e) =>
                    setStoreSettingsForm({
                      ...storeSettingsForm,
                      contactEmail: e.target.value,
                    })
                  }
                  className="w-full text-xs p-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800"
                />
              </div>

              <div>
                <label className="text-xs font-bold block mb-1">Phone Number</label>
                <input
                  type="text"
                  value={storeSettingsForm.contactPhone}
                  onChange={(e) =>
                    setStoreSettingsForm({
                      ...storeSettingsForm,
                      contactPhone: e.target.value,
                    })
                  }
                  className="w-full text-xs p-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold block mb-1">Store Address</label>
              <input
                type="text"
                value={storeSettingsForm.storeAddress}
                onChange={(e) =>
                  setStoreSettingsForm({
                    ...storeSettingsForm,
                    storeAddress: e.target.value,
                  })
                }
                className="w-full text-xs p-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800"
              />
            </div>

            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-emerald-800 text-white text-xs font-semibold hover:bg-emerald-700 shadow-md transition-colors"
            >
              Save Configuration
            </button>
          </form>
        </div>
      )}

      {/* Product Edit / Add Modal */}
      {showProductModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-stone-900 rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-stone-200 dark:border-stone-800 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <h3 className="font-serif-tea text-xl font-bold text-stone-900 dark:text-stone-100">
              {editingProduct ? "Edit Tea Product" : "Add New Tea Cultivar"}
            </h3>

            <form onSubmit={handleSaveProduct} className="space-y-3">
              <div>
                <label className="text-xs font-bold block mb-1">Tea Name *</label>
                <input
                  type="text"
                  required
                  value={productForm.name}
                  onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                  placeholder="e.g. Imperial Ceremonial Matcha"
                  className="w-full text-xs p-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold block mb-1">Category</label>
                  <select
                    value={productForm.category}
                    onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                    className="w-full text-xs p-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold block mb-1">Tag / Flush</label>
                  <input
                    type="text"
                    value={productForm.tag}
                    onChange={(e) => setProductForm({ ...productForm, tag: e.target.value })}
                    placeholder="e.g. First Flush 2025"
                    className="w-full text-xs p-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold block mb-1">Price ($)</label>
                  <input
                    type="number"
                    step="0.5"
                    required
                    value={productForm.price}
                    onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                    className="w-full text-xs p-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold block mb-1">Stock Count</label>
                  <input
                    type="number"
                    required
                    value={productForm.stock}
                    onChange={(e) => setProductForm({ ...productForm, stock: e.target.value })}
                    className="w-full text-xs p-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold block mb-1">Origin / Terroir</label>
                <input
                  type="text"
                  value={productForm.origin}
                  onChange={(e) => setProductForm({ ...productForm, origin: e.target.value })}
                  placeholder="e.g. Darjeeling, West Bengal, India"
                  className="w-full text-xs p-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800"
                />
              </div>

              <div>
                <label className="text-xs font-bold block mb-1">Image URL</label>
                <input
                  type="url"
                  value={productForm.image}
                  onChange={(e) => setProductForm({ ...productForm, image: e.target.value })}
                  className="w-full text-xs p-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800"
                />
              </div>

              <div>
                <label className="text-xs font-bold block mb-1">Description</label>
                <textarea
                  rows={3}
                  value={productForm.description}
                  onChange={(e) =>
                    setProductForm({ ...productForm, description: e.target.value })
                  }
                  className="w-full text-xs p-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowProductModal(false)}
                  className="px-4 py-2 rounded-xl border border-stone-200 dark:border-stone-700 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-800 text-white text-xs font-semibold hover:bg-emerald-700"
                >
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Invoice Modal Trigger */}
      {selectedInvoiceOrder && (
        <InvoiceModal
          order={selectedInvoiceOrder}
          onClose={() => setSelectedInvoiceOrder(null)}
        />
      )}
    </div>
  );
}
export default AdminDashboardPage;
