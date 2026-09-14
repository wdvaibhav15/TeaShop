import React, { useState } from 'react';
import {
  User,
  Mail,
  Phone,
  Shield,
  MapPin,
  Plus,
  Trash2,
  Check,
  KeyRound,
  Lock,
  Edit2,
  CheckCircle2,
  Package
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Address } from '../types';

interface ProfilePageProps {
  setActivePage: (page: string) => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({ setActivePage }) => {
  const { user, addresses, addAddress, removeAddress, setDefaultAddress, showToast } = useApp();

  const [activeTab, setActiveTab] = useState<'profile' | 'addresses' | 'security'>('profile');

  // Edit profile state
  const [name, setName] = useState(user?.name || 'Alex Rivera');
  const [phone, setPhone] = useState('+1 (555) 234-5678');
  const [email] = useState(user?.email || 'alex.rivera@vortex3d.io');

  // New Address form modal
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [newFullName, setNewFullName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newStreet, setNewStreet] = useState('');
  const [newCity, setNewCity] = useState('');
  const [newState, setNewState] = useState('');
  const [newZip, setNewZip] = useState('');

  // Password state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Profile Updated', 'Your contact details have been refreshed.', 'success');
  };

  const handleCreateAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFullName || !newStreet || !newCity || !newZip) {
      showToast('Missing Details', 'Please complete the address form.', 'warning');
      return;
    }
    const newAddr: Address = {
      id: `addr-${Date.now()}`,
      fullName: newFullName,
      phone: newPhone || '+1 (555) 234-5678',
      street: newStreet,
      city: newCity,
      state: newState || 'CA',
      zipCode: newZip,
      country: 'United States',
      isDefault: addresses.length === 0
    };
    addAddress(newAddr);
    setShowAddressForm(false);
    setNewFullName('');
    setNewStreet('');
    setNewCity('');
    setNewZip('');
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword || newPassword !== confirmPassword) {
      showToast('Mismatch', 'New passwords do not match.', 'error');
      return;
    }
    showToast('Password Updated', 'Your security credentials have been updated.', 'success');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Profile Header Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs">
        <div className="flex items-center gap-5">
          <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-indigo-600 to-cyan-400 p-0.5 shadow-lg shadow-indigo-500/20 shrink-0">
            <img
              src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'}
              alt="Avatar"
              className="w-full h-full rounded-full object-cover"
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-display font-black text-xl sm:text-2xl text-slate-900 dark:text-white">
                {user?.name || 'Alex Rivera'}
              </h1>
              <span className="px-2.5 py-0.5 rounded-md bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase">
                {user?.role || 'Customer'}
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Member since 2024 • Tier: Obsidian Spatial VIP
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setActivePage('orders')}
          className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold flex items-center gap-2"
        >
          <Package className="w-4 h-4 text-indigo-500" />
          View My Orders
        </button>
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
        <button
          type="button"
          onClick={() => setActiveTab('profile')}
          className={`px-4 py-2 text-xs font-bold rounded-xl transition-colors ${
            activeTab === 'profile'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          Personal Info
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('addresses')}
          className={`px-4 py-2 text-xs font-bold rounded-xl transition-colors ${
            activeTab === 'addresses'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          Saved Addresses ({addresses.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('security')}
          className={`px-4 py-2 text-xs font-bold rounded-xl transition-colors ${
            activeTab === 'security'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          Security & Password
        </button>
      </div>

      {/* TAB CONTENT 1: PERSONAL INFO */}
      {activeTab === 'profile' && (
        <form onSubmit={handleUpdateProfile} className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-6">
          <h3 className="font-display font-bold text-base text-slate-900 dark:text-white">
            Personal Information
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full px-3 py-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Email Address
              </label>
              <input
                type="email"
                disabled
                value={email}
                className="w-full px-3 py-2.5 text-xs rounded-xl bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-slate-500 cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                className="w-full px-3 py-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Preferred Currency
              </label>
              <select className="w-full px-3 py-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white">
                <option>USD ($) - United States Dollar</option>
                <option>EUR (€) - Eurozone</option>
                <option>GBP (£) - British Pound</option>
                <option>INR (₹) - Indian Rupee</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-slate-100 dark:border-slate-800">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-transform active:scale-95 shadow-md shadow-indigo-600/30"
            >
              Save Changes
            </button>
          </div>
        </form>
      )}

      {/* TAB CONTENT 2: ADDRESS MANAGEMENT */}
      {activeTab === 'addresses' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-bold text-base text-slate-900 dark:text-white">
              Shipping & Billing Addresses
            </h3>
            <button
              type="button"
              onClick={() => setShowAddressForm(true)}
              className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center gap-1.5 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Address
            </button>
          </div>

          {/* New address popup form */}
          {showAddressForm && (
            <form onSubmit={handleCreateAddress} className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 space-y-4">
              <h4 className="font-display font-bold text-sm text-slate-900 dark:text-white">
                New Address Details
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={newFullName}
                    onChange={e => setNewFullName(e.target.value)}
                    placeholder="Alex Rivera"
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-1">Phone</label>
                  <input
                    type="tel"
                    value={newPhone}
                    onChange={e => setNewPhone(e.target.value)}
                    placeholder="+1 (555) 019-2834"
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-1">Street Address</label>
                  <input
                    type="text"
                    required
                    value={newStreet}
                    onChange={e => setNewStreet(e.target.value)}
                    placeholder="742 Evergreen Terrace"
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-1">City</label>
                  <input
                    type="text"
                    required
                    value={newCity}
                    onChange={e => setNewCity(e.target.value)}
                    placeholder="San Francisco"
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-1">ZIP / Postal</label>
                  <input
                    type="text"
                    required
                    value={newZip}
                    onChange={e => setNewZip(e.target.value)}
                    placeholder="94103"
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddressForm(false)}
                  className="px-3 py-1.5 text-xs text-slate-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold"
                >
                  Save Address
                </button>
              </div>
            </form>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {addresses.map(addr => (
              <div
                key={addr.id}
                className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col justify-between space-y-4 shadow-xs"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-display font-bold text-sm text-slate-900 dark:text-white">
                      {addr.fullName}
                    </span>
                    {addr.isDefault && (
                      <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-500 font-bold text-[10px]">
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

                <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800 text-xs">
                  {!addr.isDefault ? (
                    <button
                      type="button"
                      onClick={() => setDefaultAddress(addr.id)}
                      className="text-indigo-600 dark:text-indigo-400 hover:underline font-semibold"
                    >
                      Make Default
                    </button>
                  ) : (
                    <span className="text-slate-400 font-medium">Active Default</span>
                  )}
                  <button
                    type="button"
                    onClick={() => removeAddress(addr.id)}
                    className="text-rose-500 hover:underline flex items-center gap-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB CONTENT 3: SECURITY */}
      {activeTab === 'security' && (
        <form onSubmit={handleChangePassword} className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-6 max-w-xl">
          <h3 className="font-display font-bold text-base text-slate-900 dark:text-white">
            Security & Authentication
          </h3>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Current Password
              </label>
              <input
                type="password"
                required
                value={currentPassword}
                onChange={e => setCurrentPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full px-3 py-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                New Password
              </label>
              <input
                type="password"
                required
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
                placeholder="Minimum 8 characters"
                className="w-full px-3 py-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Confirm New Password
              </label>
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                placeholder="Repeat new password"
                className="w-full px-3 py-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
              />
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-slate-100 dark:border-slate-800">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-transform active:scale-95 shadow-md shadow-indigo-600/30"
            >
              Update Password
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
