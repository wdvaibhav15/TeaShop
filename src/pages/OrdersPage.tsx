import React, { useState } from 'react';
import {
  Package,
  Truck,
  CheckCircle,
  Clock,
  Download,
  RotateCcw,
  Eye,
  ExternalLink,
  MapPin,
  ChevronRight,
  ShieldCheck,
  X
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Order } from '../types';

interface OrdersPageProps {
  setActivePage: (page: string) => void;
  onSelectProductById?: (id: string) => void;
}

export const OrdersPage: React.FC<OrdersPageProps> = ({ setActivePage, onSelectProductById }) => {
  const { orders, formatPrice, showToast, cancelOrder } = useApp();
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'delivered':
        return 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30';
      case 'shipped':
        return 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/30';
      case 'processing':
        return 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/30';
      case 'placed':
        return 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30';
      case 'cancelled':
        return 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30';
      default:
        return 'bg-slate-500/10 text-slate-500 border-slate-500/30';
    }
  };

  const handleDownloadInvoice = (order: Order) => {
    showToast('Invoice Generated', `PDF receipt for #${order.id} downloaded successfully.`, 'success');
  };

  const handleCancelOrder = (orderId: string) => {
    cancelOrder(orderId);
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder(prev => prev ? { ...prev, status: 'cancelled' } : null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-5">
        <div>
          <h1 className="font-display font-black text-2xl sm:text-3xl text-slate-900 dark:text-white">
            Orders & Shipments
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Track real-time courier statuses, invoices, and returns
          </p>
        </div>
        <button
          type="button"
          onClick={() => setActivePage('shop')}
          className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
        >
          Shop More Products →
        </button>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800">
          <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 mx-auto mb-4">
            <Package className="w-8 h-8" />
          </div>
          <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">
            No Orders Placed Yet
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto">
            Once you order your spatial gear, live carrier tracking and invoices will appear here.
          </p>
          <button
            type="button"
            onClick={() => setActivePage('shop')}
            className="mt-5 px-6 py-2.5 bg-indigo-600 text-white rounded-xl text-xs font-bold shadow-md"
          >
            Start Shopping
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map(order => (
            <div
              key={order.id}
              className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 space-y-6 shadow-xs"
            >
              {/* Order Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="font-mono font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                    Order #{order.id}
                  </span>
                  <span className="text-xs text-slate-400">• Placed on {order.createdAt}</span>
                  <span
                    className={`px-3 py-1 text-xs font-bold rounded-full border uppercase tracking-wider ${getStatusColor(
                      order.status
                    )}`}
                  >
                    {order.status}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleDownloadInvoice(order)}
                    className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-indigo-600 flex items-center gap-1.5 transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Invoice PDF
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedOrder(order)}
                    className="px-3 py-1.5 rounded-xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-700 transition-colors flex items-center gap-1"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    Tracking & Details
                  </button>
                </div>
              </div>

              {/* Items in this order */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {order.items.map((item, idx) => {
                  const name = item.productName || item.name || item.product?.name || 'Spatial Product';
                  const image = item.productImage || item.image || item.product?.images?.[0] || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80';
                  const price = Number(item.price || item.product?.price || 0);
                  const quantity = Number(item.quantity || 1);
                  const color = item.color || item.selectedColor || 'Default';
                  const id = item.productId || item.product?.id || `item-${idx}`;

                  return (
                    <div
                      key={id}
                      className="flex gap-3 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800"
                    >
                      <div className="w-16 h-16 rounded-xl bg-white dark:bg-slate-900 p-2 shrink-0 flex items-center justify-center">
                        <img src={image} alt={name} className="w-full h-full object-contain" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="font-display font-bold text-xs text-slate-900 dark:text-white truncate">
                          {name}
                        </h4>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                          Qty: {quantity} • {color}
                        </p>
                        <span className="text-xs font-bold text-slate-900 dark:text-white mt-1 block">
                          {formatPrice(price * quantity)}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Tracking timeline strip preview */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                  <Truck className="w-4 h-4 text-indigo-500" />
                  <span>
                    Tracking Number:{' '}
                    <strong className="font-mono text-slate-900 dark:text-white">
                      {order.trackingNumber || 'Pending Allocation'}
                    </strong>
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  {order.status !== 'delivered' && order.status !== 'cancelled' && (
                    <button
                      type="button"
                      onClick={() => handleCancelOrder(order.id)}
                      className="text-rose-500 hover:underline text-xs"
                    >
                      Cancel Order
                    </button>
                  )}
                  <span className="font-display font-black text-sm text-slate-900 dark:text-white">
                    Total Paid: {formatPrice(order.total ?? order.totalAmount ?? 0)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TRACKING TIMELINE MODAL */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
          <div
            className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
              <div>
                <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">
                  Tracking Order #{selectedOrder.id}
                </h3>
                <p className="text-xs text-slate-500">
                  Carrier: FedEx Express Priority • Air Waybill: {selectedOrder.trackingNumber}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedOrder(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-900 dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Visual Stepper Timeline */}
            <div className="space-y-6 pl-4 border-l-2 border-indigo-500/30 my-4 ml-2">
              <div className="relative">
                <div className="absolute -left-[25px] top-0 w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px]">
                  ✓
                </div>
                <h5 className="font-display font-bold text-xs text-slate-900 dark:text-white">
                  Order Verified & Authorized
                </h5>
                <p className="text-[11px] text-slate-500">Stripe payment received & tokenized.</p>
                <span className="text-[10px] text-slate-400">{selectedOrder.createdAt}</span>
              </div>

              <div className="relative">
                <div className={`absolute -left-[25px] top-0 w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                  ['processing', 'shipped', 'delivered'].includes(selectedOrder.status)
                    ? 'bg-emerald-500 text-white'
                    : 'bg-slate-300 dark:bg-slate-700 text-slate-500'
                }`}>
                  ✓
                </div>
                <h5 className="font-display font-bold text-xs text-slate-900 dark:text-white">
                  Kinetic Calibration & Quality Inspection
                </h5>
                <p className="text-[11px] text-slate-500">Passed robotic acoustic alignment in Vortex Lab.</p>
              </div>

              <div className="relative">
                <div className={`absolute -left-[25px] top-0 w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                  ['shipped', 'delivered'].includes(selectedOrder.status)
                    ? 'bg-emerald-500 text-white'
                    : 'bg-slate-300 dark:bg-slate-700 text-slate-500'
                }`}>
                  ✓
                </div>
                <h5 className="font-display font-bold text-xs text-slate-900 dark:text-white">
                  In Transit with Air Courier
                </h5>
                <p className="text-[11px] text-slate-500">Departed San Francisco Sort Facility via Flight FX-481.</p>
              </div>

              <div className="relative">
                <div className={`absolute -left-[25px] top-0 w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                  selectedOrder.status === 'delivered'
                    ? 'bg-emerald-500 text-white'
                    : 'bg-slate-300 dark:bg-slate-700 text-slate-500'
                }`}>
                  ✓
                </div>
                <h5 className="font-display font-bold text-xs text-slate-900 dark:text-white">
                  Delivery Destination Complete
                </h5>
                <p className="text-[11px] text-slate-500">Delivered directly into customer hands.</p>
              </div>
            </div>

            {/* Shipping Address & Payment snapshot */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs space-y-2">
              <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
                <MapPin className="w-4 h-4 text-indigo-500" />
                <span>Shipping Address:</span>
              </div>
              <p className="text-slate-600 dark:text-slate-300 pl-6 leading-relaxed">
                {selectedOrder.shippingAddress?.fullName} <br />
                {selectedOrder.shippingAddress?.street || selectedOrder.shippingAddress?.streetAddress} <br />
                {selectedOrder.shippingAddress?.city}, {selectedOrder.shippingAddress?.state} {selectedOrder.shippingAddress?.zipCode}
              </p>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setSelectedOrder(null)}
                className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-bold rounded-xl"
              >
                Close Tracking
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
