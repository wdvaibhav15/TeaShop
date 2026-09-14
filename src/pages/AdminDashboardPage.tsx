import React, { useState } from 'react';
import {
  BarChart3,
  TrendingUp,
  Package,
  Users,
  DollarSign,
  Plus,
  Edit2,
  Trash2,
  CheckCircle,
  AlertTriangle,
  RotateCcw,
  Search,
  SlidersHorizontal,
  X
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Product, Order } from '../types';

export const AdminDashboardPage: React.FC = () => {
  const {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    orders,
    updateOrderStatus,
    formatPrice,
    showToast
  } = useApp();

  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'orders'>('overview');

  // Product Add / Edit modal state
  const [showProductModal, setShowProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Product form fields
  const [formName, setFormName] = useState('');
  const [formBrand, setFormBrand] = useState('Aura Labs');
  const [formCategory, setFormCategory] = useState('Spatial Audio');
  const [formPrice, setFormPrice] = useState(299);
  const [formOriginalPrice, setFormOriginalPrice] = useState(399);
  const [formStock, setFormStock] = useState(25);
  const [formDescription, setFormDescription] = useState('');
  const [formImage, setFormImage] = useState('');

  // Search in admin lists
  const [productSearch, setProductSearch] = useState('');

  // Analytics Metrics
  const totalRevenue = orders.reduce((sum, o) => sum + (o.total ?? o.totalAmount ?? 0), 0) + 128450;
  const totalOrdersCount = orders.length + 384;
  const totalUsersCount = 1420;
  const lowStockCount = products.filter(p => p.stock < 10).length;

  const openCreateModal = () => {
    setEditingProduct(null);
    setFormName('');
    setFormBrand('Aura Labs');
    setFormCategory('Spatial Audio');
    setFormPrice(299);
    setFormOriginalPrice(399);
    setFormStock(25);
    setFormDescription('Engineered spatial acoustic equipment with aerospace magnesium housing.');
    setFormImage('https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80');
    setShowProductModal(true);
  };

  const openEditModal = (p: Product) => {
    setEditingProduct(p);
    setFormName(p.name);
    setFormBrand(p.brand);
    setFormCategory(p.category);
    setFormPrice(p.price);
    setFormOriginalPrice(p.originalPrice);
    setFormStock(p.stock);
    setFormDescription(p.description);
    setFormImage(p.images[0] || '');
    setShowProductModal(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName) {
      showToast('Missing Name', 'Product title is required.', 'warning');
      return;
    }

    if (editingProduct) {
      updateProduct({
        ...editingProduct,
        name: formName,
        brand: formBrand,
        category: formCategory,
        price: formPrice,
        originalPrice: formOriginalPrice,
        stock: formStock,
        description: formDescription,
        images: formImage ? [formImage, ...editingProduct.images.slice(1)] : editingProduct.images
      });
      showToast('Product Updated', `Changes to "${formName}" saved.`, 'success');
    } else {
      const newProd: Product = {
        id: `prod-${Date.now()}`,
        name: formName,
        slug: formName.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        brand: formBrand,
        category: formCategory,
        price: formPrice,
        originalPrice: formOriginalPrice,
        discount: Math.round(((formOriginalPrice - formPrice) / formOriginalPrice) * 100),
        rating: 5.0,
        reviewCount: 1,
        stock: formStock,
        images: [
          formImage || 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80'
        ],
        description: formDescription,
        features: ['Precision 3D Spatial Audio', 'Aerospace Beryllium Housing', 'Active Isolation Engine'],
        specifications: {
          'Driver Architecture': '40mm Graphene Dual-Motor',
          'Frequency Range': '4Hz - 48,000Hz',
          'Battery Life': '40 Hours Continuous'
        },
        model3DType: 'headphone',
        tags: ['Featured', 'Spatial Audio', 'New Arrival'],
        isFeatured: true
      };
      addProduct(newProd);
      showToast('Product Created', `Added "${formName}" to active catalog.`, 'success');
    }

    setShowProductModal(false);
  };

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
    p.brand.toLowerCase().includes(productSearch.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-md bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase">
              Admin Ops Center
            </span>
          </div>
          <h1 className="font-display font-black text-2xl sm:text-3xl text-slate-900 dark:text-white mt-1">
            Store Management Portal
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Monitor telemetry, manage 3D inventory, and dispatch customer fulfillment.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-2 p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
          <button
            type="button"
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
              activeTab === 'overview'
                ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            Analytics
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('products')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
              activeTab === 'products'
                ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            Products ({products.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
              activeTab === 'orders'
                ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            Orders ({orders.length})
          </button>
        </div>
      </div>

      {/* TAB 1: ANALYTICS OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          {/* Key KPI Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold uppercase">
                  Total Gross Revenue
                </span>
                <p className="font-display font-black text-2xl text-slate-900 dark:text-white mt-1">
                  {formatPrice(totalRevenue)}
                </p>
                <div className="flex items-center gap-1 text-[11px] text-emerald-500 font-bold mt-1">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>+18.4% vs last month</span>
                </div>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center">
                <DollarSign className="w-6 h-6" />
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold uppercase">
                  Total Orders
                </span>
                <p className="font-display font-black text-2xl text-slate-900 dark:text-white mt-1">
                  {totalOrdersCount}
                </p>
                <span className="text-[11px] text-indigo-500 font-bold mt-1 block">
                  99.2% Fulfillment Rate
                </span>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 text-cyan-500 flex items-center justify-center">
                <Package className="w-6 h-6" />
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold uppercase">
                  Active Customers
                </span>
                <p className="font-display font-black text-2xl text-slate-900 dark:text-white mt-1">
                  {totalUsersCount.toLocaleString()}
                </p>
                <span className="text-[11px] text-emerald-500 font-bold mt-1 block">
                  +142 this week
                </span>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                <Users className="w-6 h-6" />
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold uppercase">
                  Low Stock Inventory
                </span>
                <p className="font-display font-black text-2xl text-slate-900 dark:text-white mt-1">
                  {lowStockCount} Products
                </p>
                <span className="text-[11px] text-rose-500 font-bold mt-1 block">
                  Reorder recommended
                </span>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-rose-500/10 text-rose-500 flex items-center justify-center">
                <AlertTriangle className="w-6 h-6" />
              </div>
            </div>
          </div>

          {/* Graphical Sales Visualizer (Tailwind styled bar chart) */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-display font-black text-lg text-slate-900 dark:text-white">
                  Revenue Trajectory & Daily Orders
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Performance across recent 7 sales intervals
                </p>
              </div>
              <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
                Live Stripe Webhook Stream Active
              </span>
            </div>

            {/* Custom Interactive SVG / Bar Chart */}
            <div className="h-48 flex items-end gap-3 sm:gap-6 pt-8 pb-2 border-b border-slate-100 dark:border-slate-800">
              {[
                { day: 'Mon', height: '65%', val: '$14,200' },
                { day: 'Tue', height: '80%', val: '$18,900' },
                { day: 'Wed', height: '45%', val: '$11,400' },
                { day: 'Thu', height: '90%', val: '$21,500' },
                { day: 'Fri', height: '70%', val: '$16,800' },
                { day: 'Sat', height: '95%', val: '$24,600' },
                { day: 'Sun', height: '85%', val: '$20,100' }
              ].map(bar => (
                <div key={bar.day} className="flex-1 flex flex-col items-center gap-2 group">
                  <span className="text-[10px] font-mono text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    {bar.val}
                  </span>
                  <div
                    className="w-full bg-indigo-600 dark:bg-indigo-500 rounded-t-xl group-hover:bg-cyan-400 transition-all duration-300 relative"
                    style={{ height: bar.height }}
                  />
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                    {bar.day}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: PRODUCT CATALOG MANAGEMENT */}
      {activeTab === 'products' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={productSearch}
                onChange={e => setProductSearch(e.target.value)}
                placeholder="Search products by title or brand..."
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
              />
            </div>

            <button
              type="button"
              onClick={openCreateModal}
              className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md shadow-indigo-600/30"
            >
              <Plus className="w-4 h-4" />
              Add New 3D Product
            </button>
          </div>

          {/* Product Table */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider border-b border-slate-200 dark:border-slate-800">
                  <tr>
                    <th className="p-4">Product</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Price</th>
                    <th className="p-4">Stock</th>
                    <th className="p-4">3D Canvas</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                  {filteredProducts.map(p => (
                    <tr key={p.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                      <td className="p-4 flex items-center gap-3">
                        <img src={p.images[0]} alt="" className="w-10 h-10 object-contain rounded-lg bg-slate-100 dark:bg-slate-800 p-1" />
                        <div>
                          <p className="font-display font-bold text-slate-900 dark:text-white">
                            {p.name}
                          </p>
                          <span className="text-[11px] text-indigo-500">{p.brand}</span>
                        </div>
                      </td>
                      <td className="p-4">{p.category}</td>
                      <td className="p-4 font-bold text-slate-900 dark:text-white">
                        {formatPrice(p.price)}
                      </td>
                      <td className="p-4">
                        <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                          p.stock < 10 ? 'bg-rose-500/10 text-rose-500' : 'bg-emerald-500/10 text-emerald-500'
                        }`}>
                          {p.stock} units
                        </span>
                      </td>
                      <td className="p-4">
                        <span className="font-mono text-[11px] uppercase bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">
                          {p.model3DType}
                        </span>
                      </td>
                      <td className="p-4 text-right space-x-2">
                        <button
                          type="button"
                          onClick={() => openEditModal(p)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-indigo-600 hover:bg-slate-100 dark:hover:bg-slate-800"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => deleteProduct(p.id)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-rose-500 hover:bg-slate-100 dark:hover:bg-slate-800"
                        >
                          <Trash2 className="w-4 h-4" />
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

      {/* TAB 3: ORDER FULFILLMENT MANAGEMENT */}
      {activeTab === 'orders' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider border-b border-slate-200 dark:border-slate-800">
                  <tr>
                    <th className="p-4">Order ID</th>
                    <th className="p-4">Customer</th>
                    <th className="p-4">Total Amount</th>
                    <th className="p-4">Status & Action</th>
                    <th className="p-4">Tracking Code</th>
                    <th className="p-4">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                  {orders.map(order => (
                    <tr key={order.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                      <td className="p-4 font-mono font-bold text-slate-900 dark:text-white">
                        #{order.id}
                      </td>
                      <td className="p-4">
                        <p className="font-semibold text-slate-900 dark:text-white">
                          {order.shippingAddress.fullName}
                        </p>
                        <span className="text-[10px] text-slate-400">
                          {order.shippingAddress.city}, {order.shippingAddress.state}
                        </span>
                      </td>
                      <td className="p-4 font-bold text-slate-900 dark:text-white">
                        {formatPrice(order.total ?? order.totalAmount ?? 0)}
                      </td>
                      <td className="p-4">
                        <select
                          value={order.status}
                          onChange={e => updateOrderStatus(order.id, e.target.value as any)}
                          className="px-2.5 py-1 text-xs font-bold rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 uppercase"
                        >
                          <option value="placed">Placed</option>
                          <option value="processing">Processing</option>
                          <option value="shipped">Shipped</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td className="p-4 font-mono text-[11px] text-slate-500">
                        {order.trackingNumber || 'Pending Courier'}
                      </td>
                      <td className="p-4 text-slate-400">{order.createdAt}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* CREATE / EDIT PRODUCT MODAL */}
      {showProductModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
          <div
            className="w-full max-w-xl bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl p-6 sm:p-8 space-y-5 max-h-[90vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">
                {editingProduct ? 'Edit 3D Product' : 'Create 3D Product'}
              </h3>
              <button
                type="button"
                onClick={() => setShowProductModal(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Product Name
                </label>
                <input
                  type="text"
                  required
                  value={formName}
                  onChange={e => setFormName(e.target.value)}
                  placeholder="e.g. Apex Chronograph Obsidian"
                  className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Brand
                  </label>
                  <input
                    type="text"
                    required
                    value={formBrand}
                    onChange={e => setFormBrand(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Category
                  </label>
                  <select
                    value={formCategory}
                    onChange={e => setFormCategory(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                  >
                    <option>Spatial Audio</option>
                    <option>Chronographs</option>
                    <option>Footwear</option>
                    <option>Workstations</option>
                    <option>Optics</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Price ($)
                  </label>
                  <input
                    type="number"
                    required
                    value={formPrice}
                    onChange={e => setFormPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Original Price ($)
                  </label>
                  <input
                    type="number"
                    required
                    value={formOriginalPrice}
                    onChange={e => setFormOriginalPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Stock Units
                  </label>
                  <input
                    type="number"
                    required
                    value={formStock}
                    onChange={e => setFormStock(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Product Image URL
                </label>
                <input
                  type="url"
                  value={formImage}
                  onChange={e => setFormImage(e.target.value)}
                  placeholder="https://..."
                  className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={formDescription}
                  onChange={e => setFormDescription(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowProductModal(false)}
                  className="px-3 py-2 text-xs text-slate-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold"
                >
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
