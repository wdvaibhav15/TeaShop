import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  User,
  Package,
  Heart,
  MapPin,
  Settings,
  LogOut,
  ChevronRight,
  Printer,
  FileText,
  Clock,
  CheckCircle,
  Truck,
  Plus,
  Trash2,
  Edit2,
  Sparkles,
} from "lucide-react";
import InvoiceModal from "../components/InvoiceModal";

const UserDashboardPage = () => {
  
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("overview"); // 'overview' | 'orders' | 'profile' | 'addresses' | 'wishlist'
  const [selectedInvoiceOrder, setSelectedInvoiceOrder] = useState(null);

  // Profile edit form
  const [profileForm, setProfileForm] = useState({
    name: currentUser?.name || "",
    email: currentUser?.email || "",
    phone: currentUser?.phone || "",
  });

  // New Address form
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [newAddress, setNewAddress] = useState({
    label: "Home",
    fullName: currentUser?.name || "",
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "United States",
    phone: currentUser?.phone || "",
    isDefault: false,
  });

  if (!currentUser) {
    return (
      <div className="py-20 text-center max-w-md mx-auto px-4 space-y-4">
        <h2 className="font-serif-tea text-2xl font-bold">Please Sign In</h2>
        <p className="text-xs text-stone-500">
          You must be authenticated to access customer orders and personal cellar settings.
        </p>
        <Link
          to="/login"
          className="inline-block px-6 py-2.5 rounded-xl bg-emerald-800 text-white text-xs font-semibold"
        >
          Sign In Now
        </Link>
      </div>
    );
  }

  // Filter orders for this user (or all mock orders if matching user or default customer)
  const userOrders = orders.filter(
    (o) => o.userId === currentUser.id || currentUser.role === "admin" || o.email === currentUser.email
  );

  const wishlistedProducts = products.filter((p) => wishlist.includes(p.id));

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    updateProfile(profileForm);
    showToast("Profile details updated successfully!");
  };

  const handleCreateAddress = (e) => {
    e.preventDefault();
    if (!newAddress.street || !newAddress.city) {
      showToast("Please enter valid street and city.", "error");
      return;
    }
    addAddress(newAddress);
    setShowAddAddress(false);
    setNewAddress({
      label: "Home",
      fullName: currentUser?.name || "",
      street: "",
      city: "",
      state: "",
      zip: "",
      country: "United States",
      phone: currentUser?.phone || "",
      isDefault: false,
    });
    showToast("New delivery address saved!");
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "delivered":
        return "bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300";
      case "shipped":
        return "bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300";
      case "processing":
        return "bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300";
      default:
        return "bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300";
    }
  };

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Header Profile Bar */}
      <div className="bg-white dark:bg-stone-900 rounded-3xl p-6 sm:p-8 border border-stone-200/80 dark:border-stone-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-emerald-800 text-amber-100 flex items-center justify-center font-serif text-2xl font-bold shadow-md flex-shrink-0">
            {currentUser.name?.charAt(0) || "U"}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-serif-tea text-2xl font-bold text-stone-900 dark:text-stone-100">
                {currentUser.name}
              </h1>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                {currentUser.role === "admin" ? "Master Curator" : "Society Member"}
              </span>
            </div>
            <p className="text-xs text-stone-500 mt-0.5">{currentUser.email}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {currentUser.role === "admin" && (
            <Link
              to="/admin"
              className="px-4 py-2 rounded-xl bg-amber-700 hover:bg-amber-800 text-white text-xs font-semibold shadow-sm"
            >
              Switch to Admin Dashboard
            </Link>
          )}
          <button
            onClick={() => {
              logout();
              navigate("/");
            }}
            className="px-4 py-2 rounded-xl border border-stone-200 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300 text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Navigation Tabs (Sidebar) */}
        <aside className="lg:col-span-3 space-y-2">
          <div className="bg-white dark:bg-stone-900 p-3 rounded-3xl border border-stone-200/80 dark:border-stone-800 shadow-sm space-y-1">
            <button
              onClick={() => setActiveTab("overview")}
              className={`w-full text-left px-4 py-3 rounded-2xl text-xs font-semibold flex items-center justify-between transition-colors ${
                activeTab === "overview"
                  ? "bg-emerald-800 text-white shadow-sm"
                  : "text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800"
              }`}
            >
              <span className="flex items-center gap-2.5">
                <Sparkles className="w-4 h-4" />
                <span>Dashboard Overview</span>
              </span>
              <ChevronRight className="w-3.5 h-3.5 opacity-60" />
            </button>

            <button
              onClick={() => setActiveTab("orders")}
              className={`w-full text-left px-4 py-3 rounded-2xl text-xs font-semibold flex items-center justify-between transition-colors ${
                activeTab === "orders"
                  ? "bg-emerald-800 text-white shadow-sm"
                  : "text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800"
              }`}
            >
              <span className="flex items-center gap-2.5">
                <Package className="w-4 h-4" />
                <span>Order History</span>
              </span>
              <span className="text-[11px] font-bold opacity-80">{userOrders.length}</span>
            </button>

            <button
              onClick={() => setActiveTab("wishlist")}
              className={`w-full text-left px-4 py-3 rounded-2xl text-xs font-semibold flex items-center justify-between transition-colors ${
                activeTab === "wishlist"
                  ? "bg-emerald-800 text-white shadow-sm"
                  : "text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800"
              }`}
            >
              <span className="flex items-center gap-2.5">
                <Heart className="w-4 h-4" />
                <span>Saved Wishlist</span>
              </span>
              <span className="text-[11px] font-bold opacity-80">{wishlist.length}</span>
            </button>

            <button
              onClick={() => setActiveTab("addresses")}
              className={`w-full text-left px-4 py-3 rounded-2xl text-xs font-semibold flex items-center justify-between transition-colors ${
                activeTab === "addresses"
                  ? "bg-emerald-800 text-white shadow-sm"
                  : "text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800"
              }`}
            >
              <span className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4" />
                <span>Shipping Addresses</span>
              </span>
              <ChevronRight className="w-3.5 h-3.5 opacity-60" />
            </button>

            <button
              onClick={() => setActiveTab("profile")}
              className={`w-full text-left px-4 py-3 rounded-2xl text-xs font-semibold flex items-center justify-between transition-colors ${
                activeTab === "profile"
                  ? "bg-emerald-800 text-white shadow-sm"
                  : "text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800"
              }`}
            >
              <span className="flex items-center gap-2.5">
                <User className="w-4 h-4" />
                <span>Profile Settings</span>
              </span>
              <ChevronRight className="w-3.5 h-3.5 opacity-60" />
            </button>
          </div>
        </aside>

        {/* Content Body */}
        <main className="lg:col-span-9">
          {/* TAB 1: OVERVIEW */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* Metric Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white dark:bg-stone-900 p-5 rounded-3xl border border-stone-200/80 dark:border-stone-800 shadow-sm space-y-1">
                  <span className="text-xs text-stone-500 font-medium">Total Orders Placed</span>
                  <div className="text-2xl font-bold font-serif-tea text-emerald-800 dark:text-emerald-400">
                    {userOrders.length}
                  </div>
                  <span className="text-[11px] text-stone-400">Across 2024–2025</span>
                </div>

                <div className="bg-white dark:bg-stone-900 p-5 rounded-3xl border border-stone-200/80 dark:border-stone-800 shadow-sm space-y-1">
                  <span className="text-xs text-stone-500 font-medium">Cellar Wishlist</span>
                  <div className="text-2xl font-bold font-serif-tea text-emerald-800 dark:text-emerald-400">
                    {wishlist.length}
                  </div>
                  <span className="text-[11px] text-stone-400">Tins bookmarked</span>
                </div>

                <div className="bg-white dark:bg-stone-900 p-5 rounded-3xl border border-stone-200/80 dark:border-stone-800 shadow-sm space-y-1">
                  <span className="text-xs text-stone-500 font-medium">Tea Connoisseur Tier</span>
                  <div className="text-2xl font-bold font-serif-tea text-amber-700 dark:text-amber-400">
                    Silver Leaf
                  </div>
                  <span className="text-[11px] text-stone-400">450 Reward Points</span>
                </div>
              </div>

              {/* Recent Orders Preview */}
              <div className="bg-white dark:bg-stone-900 p-6 rounded-3xl border border-stone-200/80 dark:border-stone-800 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif-tea text-lg font-bold text-stone-900 dark:text-stone-100">
                    Recent Harvest Shipments
                  </h3>
                  <button
                    onClick={() => setActiveTab("orders")}
                    className="text-xs font-semibold text-emerald-800 dark:text-emerald-400 hover:underline"
                  >
                    View all ({userOrders.length})
                  </button>
                </div>

                <div className="divide-y divide-stone-100 dark:divide-stone-800">
                  {userOrders.slice(0, 3).map((order) => (
                    <div
                      key={order.id}
                      className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                    >
                      <div>
                        <div className="font-bold text-stone-900 dark:text-stone-100">
                          Order {order.id}
                        </div>
                        <div className="text-stone-400">{order.date} &bull; {order.items.length} teas</div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${getStatusColor(
                            order.status
                          )}`}
                        >
                          {order.status}
                        </span>
                        <span className="font-bold text-stone-900 dark:text-stone-100">
                          ${order.total?.toFixed(2)}
                        </span>
                        <button
                          onClick={() => setSelectedInvoiceOrder(order)}
                          className="p-1.5 rounded-lg border border-stone-200 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-600 dark:text-stone-300"
                          title="View Invoice"
                        >
                          <FileText className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: ORDER HISTORY */}
          {activeTab === "orders" && (
            <div className="bg-white dark:bg-stone-900 p-6 rounded-3xl border border-stone-200/80 dark:border-stone-800 shadow-sm space-y-6">
              <div>
                <h3 className="font-serif-tea text-xl font-bold text-stone-900 dark:text-stone-100">
                  Complete Order History
                </h3>
                <p className="text-xs text-stone-500">
                  Review invoice breakdowns, carrier live tracking numbers, and delivery statuses.
                </p>
              </div>

              {userOrders.length === 0 ? (
                <div className="p-8 text-center text-xs text-stone-500">
                  You have not placed any tea orders yet.
                </div>
              ) : (
                <div className="space-y-4">
                  {userOrders.map((order) => (
                    <div
                      key={order.id}
                      className="p-5 rounded-2xl border border-stone-200/80 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-800/30 space-y-4"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-stone-200/60 dark:border-stone-700 text-xs">
                        <div>
                          <span className="font-bold text-stone-900 dark:text-stone-100">
                            {order.id}
                          </span>
                          <span className="text-stone-400 ml-2">&bull; {order.date}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span
                            className={`px-3 py-1 rounded-full text-[11px] font-bold ${getStatusColor(
                              order.status
                            )}`}
                          >
                            {order.status}
                          </span>
                          <button
                            onClick={() => setSelectedInvoiceOrder(order)}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 text-xs font-semibold hover:bg-stone-100"
                          >
                            <Printer className="w-3 h-3 text-emerald-700" />
                            <span>Invoice</span>
                          </button>
                        </div>
                      </div>

                      {/* Items row */}
                      <div className="space-y-2">
                        {order.items.map((item, idx) => (
                          <div
                            key={idx}
                            className="flex items-center justify-between text-xs text-stone-700 dark:text-stone-300"
                          >
                            <div className="flex items-center gap-2.5">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-9 h-9 rounded-lg object-cover"
                              />
                              <div>
                                <span className="font-medium text-stone-900 dark:text-stone-100 block">
                                  {item.name}
                                </span>
                                <span className="text-stone-400">Qty: {item.quantity}</span>
                              </div>
                            </div>
                            <span className="font-semibold">
                              ${(item.price * item.quantity).toFixed(2)}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Carrier Tracking Bar */}
                      <div className="pt-3 border-t border-stone-200/60 dark:border-stone-700 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-stone-500 gap-2">
                        <div className="flex items-center gap-1.5">
                          <Truck className="w-3.5 h-3.5 text-emerald-700" />
                          <span>
                            Carrier: {order.carrier} &bull; Tracking:{" "}
                            <span className="font-mono text-stone-700 dark:text-stone-300">
                              {order.trackingNumber}
                            </span>
                          </span>
                        </div>
                        <div className="font-bold text-stone-900 dark:text-stone-100">
                          Total: ${order.total?.toFixed(2)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: SAVED WISHLIST */}
          {activeTab === "wishlist" && (
            <div className="bg-white dark:bg-stone-900 p-6 rounded-3xl border border-stone-200/80 dark:border-stone-800 shadow-sm space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-serif-tea text-xl font-bold text-stone-900 dark:text-stone-100">
                    Saved In Cellar Wishlist
                  </h3>
                  <p className="text-xs text-stone-500">
                    Quickly steep or add to your shopping bag.
                  </p>
                </div>
                <Link
                  to="/wishlist"
                  className="text-xs font-semibold text-emerald-800 dark:text-emerald-400 hover:underline"
                >
                  Manage full wishlist
                </Link>
              </div>

              {wishlistedProducts.length === 0 ? (
                <div className="p-8 text-center text-xs text-stone-500">
                  No teas saved yet. Browse our catalog to bookmark your favorites!
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {wishlistedProducts.map((p) => (
                    <div
                      key={p.id}
                      className="p-4 rounded-2xl border border-stone-200 dark:border-stone-700 flex items-center justify-between gap-3 text-xs"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={p.images?.[0] || p.image}
                          alt={p.name}
                          className="w-12 h-12 rounded-xl object-cover"
                        />
                        <div>
                          <Link
                            to={`/product/${p.id}`}
                            className="font-bold text-stone-900 dark:text-stone-100 hover:underline block line-clamp-1"
                          >
                            {p.name}
                          </Link>
                          <span className="text-stone-400">${p.price.toFixed(2)}</span>
                        </div>
                      </div>
                      <Link
                        to={`/product/${p.id}`}
                        className="px-3 py-1.5 rounded-lg bg-emerald-800 text-white text-[11px] font-semibold"
                      >
                        View
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 4: ADDRESSES */}
          {activeTab === "addresses" && (
            <div className="bg-white dark:bg-stone-900 p-6 rounded-3xl border border-stone-200/80 dark:border-stone-800 shadow-sm space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-serif-tea text-xl font-bold text-stone-900 dark:text-stone-100">
                    Delivery Addresses
                  </h3>
                  <p className="text-xs text-stone-500">
                    Manage where your tea harvests and equipment are dispatched.
                  </p>
                </div>
                <button
                  onClick={() => setShowAddAddress(!showAddAddress)}
                  className="px-3.5 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>{showAddAddress ? "Cancel" : "Add Address"}</span>
                </button>
              </div>

              {/* Add address subform */}
              {showAddAddress && (
                <form
                  onSubmit={handleCreateAddress}
                  className="p-5 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 space-y-3"
                >
                  <h4 className="text-xs font-bold text-stone-900 dark:text-stone-100">
                    Add New Address
                  </h4>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-bold block mb-1">Label</label>
                      <input
                        type="text"
                        required
                        value={newAddress.label}
                        onChange={(e) => setNewAddress({ ...newAddress, label: e.target.value })}
                        placeholder="e.g. Home, Teahouse, Office"
                        className="w-full text-xs p-2 rounded-lg border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-900"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold block mb-1">Recipient Name</label>
                      <input
                        type="text"
                        required
                        value={newAddress.fullName}
                        onChange={(e) => setNewAddress({ ...newAddress, fullName: e.target.value })}
                        className="w-full text-xs p-2 rounded-lg border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-900"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold block mb-1">Street Address</label>
                    <input
                      type="text"
                      required
                      value={newAddress.street}
                      onChange={(e) => setNewAddress({ ...newAddress, street: e.target.value })}
                      placeholder="e.g. 742 Evergreen Botanical Way"
                      className="w-full text-xs p-2 rounded-lg border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-900"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="text-[11px] font-bold block mb-1">City</label>
                      <input
                        type="text"
                        required
                        value={newAddress.city}
                        onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                        className="w-full text-xs p-2 rounded-lg border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-900"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold block mb-1">State</label>
                      <input
                        type="text"
                        required
                        value={newAddress.state}
                        onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
                        className="w-full text-xs p-2 rounded-lg border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-900"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold block mb-1">Postal Code</label>
                      <input
                        type="text"
                        required
                        value={newAddress.zip}
                        onChange={(e) => setNewAddress({ ...newAddress, zip: e.target.value })}
                        className="w-full text-xs p-2 rounded-lg border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-900"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-emerald-800 text-white text-xs font-semibold"
                  >
                    Save Address
                  </button>
                </form>
              )}

              {/* Address list */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {currentUser.addresses?.map((addr) => (
                  <div
                    key={addr.id}
                    className="p-4 rounded-2xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-850 text-xs space-y-2 relative"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-stone-900 dark:text-stone-100 flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-emerald-700" />
                        {addr.label}
                      </span>
                      {addr.isDefault && (
                        <span className="text-[10px] bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-bold px-1.5 py-0.5 rounded">
                          Default
                        </span>
                      )}
                    </div>

                    <div className="text-stone-600 dark:text-stone-300 leading-relaxed">
                      <div className="font-semibold text-stone-900 dark:text-stone-100">
                        {addr.fullName}
                      </div>
                      <div>{addr.street}</div>
                      <div>
                        {addr.city}, {addr.state} {addr.zip}
                      </div>
                      <div className="text-stone-400 mt-1">{addr.phone}</div>
                    </div>

                    <div className="pt-2 border-t border-stone-200 dark:border-stone-700 flex justify-end">
                      <button
                        onClick={() => deleteAddress(addr.id)}
                        className="text-stone-400 hover:text-red-500 text-[11px] flex items-center gap-1"
                      >
                        <Trash2 className="w-3 h-3" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: PROFILE EDIT */}
          {activeTab === "profile" && (
            <div className="bg-white dark:bg-stone-900 p-6 sm:p-8 rounded-3xl border border-stone-200/80 dark:border-stone-800 shadow-sm space-y-6">
              <div>
                <h3 className="font-serif-tea text-xl font-bold text-stone-900 dark:text-stone-100">
                  Profile & Contact Preferences
                </h3>
                <p className="text-xs text-stone-500">
                  Update your display name, primary email address, and notification phone number.
                </p>
              </div>

              <form onSubmit={handleUpdateProfile} className="space-y-4 max-w-lg">
                <div>
                  <label className="text-xs font-bold text-stone-700 dark:text-stone-300 block mb-1">
                    Display Name
                  </label>
                  <input
                    type="text"
                    required
                    value={profileForm.name}
                    onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                    className="w-full text-xs p-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-stone-700 dark:text-stone-300 block mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={profileForm.email}
                    onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                    className="w-full text-xs p-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-stone-700 dark:text-stone-300 block mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={profileForm.phone}
                    onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                    placeholder="+1 (503) 555-0194"
                    className="w-full text-xs p-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                  />
                </div>

                <button
                  type="submit"
                  className="px-6 py-3 rounded-2xl bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-xs transition-colors shadow-sm"
                >
                  Save Profile Updates
                </button>
              </form>
            </div>
          )}
        </main>
      </div>

      {/* Invoice Modal */}
      {selectedInvoiceOrder && (
        <InvoiceModal
          order={selectedInvoiceOrder}
          onClose={() => setSelectedInvoiceOrder(null)}
        />
      )}
    </div>
  );
}

export default UserDashboardPage;