import React, { useState } from 'react';
import { X } from 'lucide-react';
import axios from 'axios';

const AddCoffee = ({ onClose }) => {
  const [coffeeTitle, setCoffeeTitle] = useState('');
  const [price, setPrice] = useState('');
  const [stockCount, setStockCount] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(`${import.meta.env.VITE_CLIENT_API_URL}/api/coffee/add-coffee`,
        {
          title: coffeeTitle, 
          price: Number(price),
          stockCount: stockCount ? Number(stockCount) : 0,
          description,
          imageUrl,
        }
      );

      
      if (response.status === 200 || response.status === 201 || response.data?.success) {
        if (typeof onClose === 'function') {
          onClose(); 
        }
      }
    } catch (error) {
      console.error('Error adding coffee:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="w-full max-w-2xl bg-[#F6F4EF] rounded-xl shadow-2xl overflow-hidden text-[#2C3531] border border-[#E2DDD5]">
        
        {/* Header */}
        <div className="bg-[#172D23] text-white px-6 py-5 flex items-center justify-between">
          <div>
            <p className="text-[11px] font-mono tracking-widest text-[#A2C4B7] uppercase font-bold">
              Menu Management
            </p>
            <h2 className="text-2xl font-serif font-bold tracking-tight text-[#F7F5F0]">
              Add New Coffee to Menu
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/80 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Coffee Title */}
          <div>
            <label className="block text-sm font-semibold text-[#2C3531] mb-1.5">
              Coffee / Beverage Title *
            </label>
            <input
              type="text"
              name="title"
              value={coffeeTitle}
              onChange={(e) => setCoffeeTitle(e.target.value)}
              placeholder="e.g. Ethiopian Guji Highlands Reserve"
              required
              className="w-full px-3.5 py-2.5 bg-white border border-[#DDD8CE] rounded-lg text-sm text-[#2C3531] placeholder-[#A5A095] focus:outline-none focus:ring-2 focus:ring-[#122B22]/20 focus:border-[#122B22] transition-all"
            />
          </div>

          {/* Price & Initial Stock */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-[#2C3531] mb-1.5">
                Price (USD $) *
              </label>
              <input
                type="number"
                step="0.01"
                name="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="5.50"
                required
                className="w-full px-3.5 py-2.5 bg-white border border-[#DDD8CE] rounded-lg text-sm text-[#2C3531] placeholder-[#A5A095] focus:outline-none focus:ring-2 focus:ring-[#122B22]/20 focus:border-[#122B22] transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#2C3531] mb-1.5">
                Initial Stock Count
              </label>
              <input
                type="number"
                name="stockCount"
                value={stockCount}
                onChange={(e) => setStockCount(e.target.value)}
                placeholder="40"
                className="w-full px-3.5 py-2.5 bg-white border border-[#DDD8CE] rounded-lg text-sm text-[#2C3531] placeholder-[#A5A095] focus:outline-none focus:ring-2 focus:ring-[#122B22]/20 focus:border-[#122B22] transition-all"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-[#2C3531] mb-1.5">
              Description & Barista Brewing Notes
            </label>
            <textarea
              name="description"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Detailed flavor profile, extraction notes, or serving recommendations..."
              className="w-full px-3.5 py-2.5 bg-white border border-[#DDD8CE] rounded-lg text-sm text-[#2C3531] placeholder-[#A5A095] focus:outline-none focus:ring-2 focus:ring-[#122B22]/20 focus:border-[#122B22] transition-all resize-y"
            />
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-sm font-semibold text-[#2C3531] mb-2">
              Coffee Image Preset or Custom URL
            </label>
            <input
              type="text"
              name="imageUrl"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://..."
              className="w-full px-3.5 py-2 bg-white border border-[#DDD8CE] rounded-lg text-xs font-mono text-[#2C3531] placeholder-[#A5A095] focus:outline-none focus:ring-2 focus:ring-[#122B22]/20 focus:border-[#122B22] transition-all"
            />
          </div>

          {/* Footer Action Buttons */}
          <div className="pt-4 flex items-center justify-end gap-3 border-t border-[#E5E0D6]">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-5 py-2.5 bg-white border border-[#D5D0C5] rounded-lg text-sm font-semibold text-[#4A5568] hover:bg-[#EAE6DE] transition-colors cursor-pointer disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 bg-[#122B22] text-[#F7F5F0] rounded-lg text-sm font-semibold hover:bg-[#1C3E32] transition-colors shadow-md active:scale-[0.99] cursor-pointer disabled:opacity-50"
            >
              {loading ? 'Publishing...' : 'Publish to Menu'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCoffee;