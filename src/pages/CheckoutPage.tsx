import React, { useState } from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  Truck,
  CreditCard,
  MapPin,
  Lock,
  ArrowRight,
  ChevronLeft,
  DollarSign,
  Smartphone,
  Building,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useApp } from '../context/AppContext';
import { Interactive3DBankCard } from '../components/3d/Interactive3DBankCard';
import { Address } from '../types';

interface CheckoutPageProps {
  setActivePage: (page: string) => void;
  onOrderCompleted: (orderId: string) => void;
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({
  setActivePage,
  onOrderCompleted
}) => {
  const {
    cart,
    cartSubtotal,
    cartDiscount,
    cartTax,
    cartTotal,
    addresses,
    addAddress,
    formatPrice,
    placeOrder,
    showToast
  } = useApp();

  const [step, setStep] = useState<1 | 2 | 3>(1); // 1: Shipping Address, 2: Shipping Method & Review, 3: Payment
  const [selectedAddressId, setSelectedAddressId] = useState<string>(
    addresses.find(a => a.isDefault)?.id || addresses[0]?.id || ''
  );
  const [showNewAddressForm, setShowNewAddressForm] = useState(false);

  // New address form fields
  const [newFullName, setNewFullName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newStreet, setNewStreet] = useState('');
  const [newCity, setNewCity] = useState('');
  const [newState, setNewState] = useState('');
  const [newZipCode, setNewZipCode] = useState('');

  // Shipping method selection
  const [shippingMethod, setShippingMethod] = useState<{ id: string; name: string; price: number; eta: string }>({
    id: 'free',
    name: 'Free Standard Ground',
    price: 0,
    eta: '3-5 Business Days'
  });

  // Payment State
  const [paymentType, setPaymentType] = useState<'card' | 'upi' | 'netbanking' | 'cod'>('card');
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('ALEX RIVERA');
  const [expiry, setExpiry] = useState('12/28');
  const [cvv, setCvv] = useState('');
  const [isFlipped, setIsFlipped] = useState(false);
  const [upiId, setUpiId] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const finalTotal = cartTotal + shippingMethod.price;
  const currentAddress = addresses.find(a => a.id === selectedAddressId) || addresses[0];

  const handleCreateAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFullName || !newStreet || !newCity || !newZipCode) {
      showToast('Missing Fields', 'Please complete the address form.', 'warning');
      return;
    }
    const newAddr: Address = {
      id: `addr-${Date.now()}`,
      fullName: newFullName,
      phone: newPhone || '+1 (555) 234-5678',
      street: newStreet,
      city: newCity,
      state: newState || 'CA',
      zipCode: newZipCode,
      country: 'United States',
      isDefault: false
    };
    addAddress(newAddr);
    setSelectedAddressId(newAddr.id);
    setShowNewAddressForm(false);
  };

  const handlePlaceOrder = () => {
    if (!currentAddress) {
      showToast('Missing Address', 'Please choose or enter a delivery address.', 'warning');
      setStep(1);
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      const newOrder = placeOrder(
        currentAddress,
        paymentType === 'card'
          ? `Stripe Card ending in ${cardNumber.slice(-4) || '4242'}`
          : paymentType.toUpperCase()
      );

      // Trigger Confetti Celebration!
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 }
      });

      onOrderCompleted(newOrder.id);
    }, 1500);
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-2xl mx-auto py-20 px-4 text-center">
        <h2 className="font-display font-bold text-xl text-slate-900 dark:text-white">
          Your cart is currently empty
        </h2>
        <p className="text-xs text-slate-500 mt-2">
          Add items to your cart before proceeding to checkout.
        </p>
        <button
          type="button"
          onClick={() => setActivePage('shop')}
          className="mt-4 px-6 py-2.5 bg-indigo-600 text-white text-xs font-bold rounded-xl"
        >
          Browse Products
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Checkout Progress Stepper */}
      <div className="flex items-center justify-center gap-4 sm:gap-8 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div className={`flex items-center gap-2 text-xs font-bold ${step >= 1 ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400'}`}>
          <div className={`w-7 h-7 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-indigo-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'}`}>
            1
          </div>
          <span className="hidden sm:inline">Delivery Address</span>
        </div>

        <div className={`w-8 sm:w-16 h-0.5 ${step >= 2 ? 'bg-indigo-600' : 'bg-slate-200 dark:bg-slate-800'}`} />

        <div className={`flex items-center gap-2 text-xs font-bold ${step >= 2 ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400'}`}>
          <div className={`w-7 h-7 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-indigo-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'}`}>
            2
          </div>
          <span className="hidden sm:inline">Shipping & Review</span>
        </div>

        <div className={`w-8 sm:w-16 h-0.5 ${step >= 3 ? 'bg-indigo-600' : 'bg-slate-200 dark:bg-slate-800'}`} />

        <div className={`flex items-center gap-2 text-xs font-bold ${step >= 3 ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400'}`}>
          <div className={`w-7 h-7 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-indigo-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'}`}>
            3
          </div>
          <span className="hidden sm:inline">Payment Gateway</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Main Step Interaction Column */}
        <div className="lg:col-span-8 space-y-6">
          {/* STEP 1: SHIPPING ADDRESS */}
          {step === 1 && (
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-display font-bold text-lg text-slate-900 dark:text-white">
                    Step 1: Select Shipping Destination
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Where should we deliver your order?
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowNewAddressForm(!showNewAddressForm)}
                  className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
                >
                  {showNewAddressForm ? 'Choose Saved' : '+ Add New Address'}
                </button>
              </div>

              {!showNewAddressForm ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {addresses.map(addr => (
                    <div
                      key={addr.id}
                      onClick={() => setSelectedAddressId(addr.id)}
                      className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                        selectedAddressId === addr.id
                          ? 'border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/30 shadow-sm'
                          : 'border-slate-200 dark:border-slate-800 hover:border-slate-300'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="font-display font-bold text-xs text-slate-900 dark:text-white">
                            {addr.fullName}
                          </span>
                          {addr.isDefault && (
                            <span className="px-2 py-0.5 bg-indigo-500/10 text-indigo-500 text-[10px] font-bold rounded-md">
                              DEFAULT
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                          {addr.street} <br />
                          {addr.city}, {addr.state} {addr.zipCode} <br />
                          {addr.country}
                        </p>
                        <p className="text-[11px] text-slate-400 mt-2">{addr.phone}</p>
                      </div>

                      <div className="mt-4 pt-2 border-t border-slate-200/60 dark:border-slate-800 flex items-center justify-between">
                        <span className={`text-xs font-semibold ${selectedAddressId === addr.id ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400'}`}>
                          {selectedAddressId === addr.id ? 'Selected' : 'Use this address'}
                        </span>
                        {selectedAddressId === addr.id && (
                          <CheckCircle2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <form onSubmit={handleCreateAddress} className="space-y-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                  <h4 className="font-display font-bold text-xs uppercase tracking-wider text-slate-900 dark:text-white">
                    Enter New Shipping Address
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Full Name</label>
                      <input
                        type="text"
                        required
                        value={newFullName}
                        onChange={e => setNewFullName(e.target.value)}
                        placeholder="Alex Rivera"
                        className="w-full px-3 py-2 text-xs rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Phone Number</label>
                      <input
                        type="tel"
                        value={newPhone}
                        onChange={e => setNewPhone(e.target.value)}
                        placeholder="+1 (555) 019-2834"
                        className="w-full px-3 py-2 text-xs rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Street Address</label>
                      <input
                        type="text"
                        required
                        value={newStreet}
                        onChange={e => setNewStreet(e.target.value)}
                        placeholder="742 Evergreen Terrace, Apt 4B"
                        className="w-full px-3 py-2 text-xs rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">City</label>
                      <input
                        type="text"
                        required
                        value={newCity}
                        onChange={e => setNewCity(e.target.value)}
                        placeholder="San Francisco"
                        className="w-full px-3 py-2 text-xs rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Postal / ZIP Code</label>
                      <input
                        type="text"
                        required
                        value={newZipCode}
                        onChange={e => setNewZipCode(e.target.value)}
                        placeholder="94103"
                        className="w-full px-3 py-2 text-xs rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowNewAddressForm(false)}
                      className="px-3 py-1.5 text-xs text-slate-500"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold"
                    >
                      Save & Select
                    </button>
                  </div>
                </form>
              )}

              <div className="flex justify-end pt-4 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center gap-2 transition-transform active:scale-95 shadow-md shadow-indigo-600/30"
                >
                  Continue to Shipping Method
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: SHIPPING SPEED & ORDER REVIEW */}
          {step === 2 && (
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-6">
              <div>
                <h2 className="font-display font-bold text-lg text-slate-900 dark:text-white">
                  Step 2: Choose Shipping Speed
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Select your preferred courier transit tier
                </p>
              </div>

              {/* Shipping Options */}
              <div className="space-y-3">
                {[
                  { id: 'free', name: 'Standard Ground Delivery', price: 0, eta: '3-5 Business Days' },
                  { id: 'express', name: 'Express Air Priority', price: 15, eta: '1-2 Business Days' },
                  { id: 'overnight', name: 'Vortex Overnight VIP Courier', price: 28, eta: 'Next Morning by 10 AM' }
                ].map(opt => (
                  <label
                    key={opt.id}
                    onClick={() => setShippingMethod(opt)}
                    className={`p-4 rounded-2xl border-2 flex items-center justify-between cursor-pointer transition-all ${
                      shippingMethod.id === opt.id
                        ? 'border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/30'
                        : 'border-slate-200 dark:border-slate-800 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Truck className={`w-5 h-5 ${shippingMethod.id === opt.id ? 'text-indigo-600' : 'text-slate-400'}`} />
                      <div>
                        <p className="font-display font-bold text-xs text-slate-900 dark:text-white">
                          {opt.name}
                        </p>
                        <p className="text-[11px] text-slate-400">Est. Transit: {opt.eta}</p>
                      </div>
                    </div>
                    <span className="font-display font-bold text-xs text-slate-900 dark:text-white">
                      {opt.price === 0 ? 'FREE' : formatPrice(opt.price)}
                    </span>
                  </label>
                ))}
              </div>

              {/* Items in order review preview */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                <h4 className="font-display font-bold text-xs uppercase tracking-wider text-slate-900 dark:text-white mb-3">
                  Shipment Items ({cart.length})
                </h4>
                <div className="space-y-2">
                  {cart.map((item, idx) => (
                    <div key={item.product?.id || `cart-item-${idx}`} className="flex items-center justify-between text-xs py-1.5 border-b border-slate-100 dark:border-slate-800/50">
                      <div className="flex items-center gap-2">
                        <img src={item.product?.images?.[0] || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80'} alt="" className="w-8 h-8 object-contain rounded" />
                        <span className="font-medium text-slate-800 dark:text-slate-200 truncate max-w-[200px]">
                          {item.product?.name || 'Product'} × {item.quantity}
                        </span>
                      </div>
                      <span className="font-bold text-slate-900 dark:text-white">
                        {formatPrice((item.product?.price || 0) * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-xs font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-white flex items-center gap-1"
                >
                  <ChevronLeft className="w-4 h-4" /> Back to Address
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center gap-2 transition-transform active:scale-95 shadow-md shadow-indigo-600/30"
                >
                  Proceed to Payment
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: PAYMENT GATEWAY (3D Interactive Credit Card & Methods) */}
          {step === 3 && (
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-display font-bold text-lg text-slate-900 dark:text-white">
                    Step 3: Secure Payment Portal
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Select payment method & enter authorization details
                  </p>
                </div>
                <div className="flex items-center gap-1 text-[11px] text-emerald-500 font-bold">
                  <Lock className="w-3.5 h-3.5" />
                  <span>256-Bit SSL Encrypted</span>
                </div>
              </div>

              {/* Payment Type Switcher */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {[
                  { id: 'card', label: 'Credit Card', icon: CreditCard },
                  { id: 'upi', label: 'UPI / QR', icon: Smartphone },
                  { id: 'netbanking', label: 'Net Banking', icon: Building },
                  { id: 'cod', label: 'Cash on Delivery', icon: DollarSign }
                ].map(m => {
                  const Icon = m.icon;
                  return (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setPaymentType(m.id as any)}
                      className={`p-3 rounded-2xl border text-center flex flex-col items-center gap-1.5 transition-all ${
                        paymentType === m.id
                          ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-300 font-bold shadow-xs'
                          : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="text-xs">{m.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* CREDIT CARD DETAILS WITH 3D FLIPPING CARD */}
              {paymentType === 'card' && (
                <div className="space-y-6 pt-2">
                  {/* The 3D Bank Card Preview */}
                  <Interactive3DBankCard
                    cardNumber={cardNumber}
                    cardHolder={cardHolder}
                    expiryDate={expiry}
                    cvv={cvv}
                    isFlipped={isFlipped}
                  />

                  {/* Form fields */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Card Number
                      </label>
                      <input
                        type="text"
                        maxLength={19}
                        value={cardNumber}
                        onChange={e => {
                          let val = e.target.value.replace(/\D/g, '');
                          val = val.replace(/(.{4})/g, '$1 ').trim();
                          setCardNumber(val);
                        }}
                        placeholder="4242 •••• •••• 4242"
                        className="w-full px-3.5 py-2.5 text-xs font-mono rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-hidden focus:ring-1 focus:ring-indigo-500 tracking-wider"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Cardholder Name
                      </label>
                      <input
                        type="text"
                        value={cardHolder}
                        onChange={e => setCardHolder(e.target.value.toUpperCase())}
                        placeholder="ALEX RIVERA"
                        className="w-full px-3.5 py-2.5 text-xs font-mono rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white uppercase focus:outline-hidden focus:ring-1 focus:ring-indigo-500"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                          Expiration (MM/YY)
                        </label>
                        <input
                          type="text"
                          maxLength={5}
                          value={expiry}
                          onChange={e => setExpiry(e.target.value)}
                          placeholder="12/28"
                          className="w-full px-3.5 py-2.5 text-xs font-mono rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-hidden focus:ring-1 focus:ring-indigo-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                          Security CVV
                        </label>
                        <input
                          type="password"
                          maxLength={4}
                          value={cvv}
                          onFocus={() => setIsFlipped(true)}
                          onBlur={() => setIsFlipped(false)}
                          onChange={e => setCvv(e.target.value.replace(/\D/g, ''))}
                          placeholder="•••"
                          className="w-full px-3.5 py-2.5 text-xs font-mono rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-hidden focus:ring-1 focus:ring-indigo-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* UPI Form */}
              {paymentType === 'upi' && (
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
                  <p className="text-xs text-slate-600 dark:text-slate-300">
                    Enter your UPI ID (Google Pay, PhonePe, Paytm, BHIM):
                  </p>
                  <input
                    type="text"
                    value={upiId}
                    onChange={e => setUpiId(e.target.value)}
                    placeholder="alex@okaxis or 9876543210@paytm"
                    className="w-full px-3 py-2 text-xs rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
                  />
                  <div className="flex items-center gap-2 text-[11px] text-slate-400">
                    <span>A collect request will be sent to your UPI app upon placing order.</span>
                  </div>
                </div>
              )}

              {/* Net Banking */}
              {paymentType === 'netbanking' && (
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
                  <p className="text-xs text-slate-600 dark:text-slate-300">
                    Select Your Bank:
                  </p>
                  <select className="w-full px-3 py-2 text-xs rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
                    <option>Chase Bank</option>
                    <option>Bank of America</option>
                    <option>Wells Fargo</option>
                    <option>Citigroup</option>
                    <option>Barclays Global</option>
                  </select>
                </div>
              )}

              {/* COD */}
              {paymentType === 'cod' && (
                <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-300 text-xs leading-relaxed">
                  Cash on delivery requires an OTP verification at the time of courier handoff. Please keep exact cash of <strong>{formatPrice(finalTotal)}</strong> ready.
                </div>
              )}

              {/* Submit / Place Order CTA */}
              <div className="flex items-center justify-between pt-6 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="text-xs font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-white flex items-center gap-1"
                >
                  <ChevronLeft className="w-4 h-4" /> Back to Shipping
                </button>

                <button
                  type="button"
                  disabled={isProcessing}
                  onClick={handlePlaceOrder}
                  className="px-8 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold text-sm shadow-xl shadow-indigo-600/30 flex items-center gap-2 transition-transform active:scale-95"
                >
                  {isProcessing ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Authorizing Payment...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      Pay {formatPrice(finalTotal)} & Complete Order
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Order Summary Card */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 space-y-4 shadow-sm sticky top-24">
            <h3 className="font-display font-bold text-base text-slate-900 dark:text-white">
              Checkout Summary
            </h3>

            {/* Destination Preview */}
            {currentAddress && (
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 text-xs">
                <div className="flex items-center gap-1.5 font-bold text-slate-900 dark:text-white mb-1">
                  <MapPin className="w-3.5 h-3.5 text-indigo-500" />
                  <span>Ship To: {currentAddress.fullName}</span>
                </div>
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-[11px]">
                  {currentAddress.street}, {currentAddress.city} {currentAddress.zipCode}
                </p>
              </div>
            )}

            {/* Price Calculations */}
            <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300 pt-2 border-t border-slate-100 dark:border-slate-800">
              <div className="flex justify-between">
                <span>Items Subtotal</span>
                <span className="font-semibold text-slate-900 dark:text-white">
                  {formatPrice(cartSubtotal)}
                </span>
              </div>
              {cartDiscount > 0 && (
                <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-semibold">
                  <span>Coupon Savings</span>
                  <span>-{formatPrice(cartDiscount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Estimated Sales Tax (8%)</span>
                <span>{formatPrice(cartTax)}</span>
              </div>
              <div className="flex justify-between">
                <span>Selected Transit</span>
                <span>
                  {shippingMethod.price === 0 ? (
                    <strong className="text-emerald-500">FREE</strong>
                  ) : (
                    formatPrice(shippingMethod.price)
                  )}
                </span>
              </div>
              <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex justify-between items-baseline font-black text-slate-900 dark:text-white">
                <span className="text-sm">Total Due</span>
                <span className="text-xl font-display text-indigo-600 dark:text-indigo-400">
                  {formatPrice(finalTotal)}
                </span>
              </div>
            </div>

            <div className="pt-2 text-center text-[10px] text-slate-400 flex items-center justify-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>Direct Bank Settlement via Stripe 2026</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
