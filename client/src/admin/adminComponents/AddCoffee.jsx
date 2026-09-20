import React, { useState } from 'react';
import { X } from 'lucide-react';

const presetImages = [
  {
    id: 'signature-espresso',
    label: 'Signature Espresso',
    url: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=900&auto=format&fit=crop'
  },
  {
    id: 'pour-over',
    label: 'Pour Over V60',
    url: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=900&auto=format&fit=crop'
  },
  {
    id: 'cold-brew',
    label: 'Cold Brew / Iced',
    url: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?q=80&w=900&auto=format&fit=crop'
  },
  {
    id: 'flat-white',
    label: 'Flat White / Latte',
    url: 'https://images.unsplash.com/photo-1534778101976-62847782c213?q=80&w=900&auto=format&fit=crop'
  },
  {
    id: 'matcha',
    label: 'Ceremonial Matcha',
    url: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?q=80&w=900&auto=format&fit=crop'
  },
  {
    id: 'rare-geisha',
    label: 'Rare Geisha / Batch',
    url: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?q=80&w=900&auto=format&fit=crop'
  }
];

const AddCoffee = ({ isOpen = true, onClose = () => {} }) => {
  const [formData, setFormData] = useState({
    title: '',
    category: 'Espresso',
    roastProfile: 'Medium Roast',
    price: '5.5',
    stockCount: '40',
    originElevation: '',
    tastingNotes: '',
    description: '',
    imageUrl: presetImages[0].url,
    availableInStock: true,
    highlightFeatured: false
  });

  const [selectedPreset, setSelectedPreset] = useState(presetImages[0].id);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSelectPreset = (preset) => {
    setSelectedPreset(preset.id);
    setFormData((prev) => ({ ...prev, imageUrl: preset.url }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('New Coffee Item:', formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="w-full max-w-2xl bg-[#F6F4EF] rounded-xl shadow-2xl overflow-hidden text-[#2C3531] border border-[#E2DDD5] my-8">
        
        {/* Header */}
        <div className="bg-[#122B22] text-white px-6 py-5 flex items-center justify-between">
          <div>
            <p className="text-[11px] font-mono tracking-widest text-[#A2C4B7] uppercase font-bold">
              Menu Management
            </p>
            <h2 className="text-2xl font-serif font-bold tracking-tight text-[#F7F5F0]">
              Add New Coffee to Menu
            </h2>
          </div>
          <button
            onClick={onClose}
            type="button"
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/80 hover:text-white transition-colors"
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
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Ethiopian Guji Highlands Reserve"
              required
              className="w-full px-3.5 py-2.5 bg-white border border-[#DDD8CE] rounded-lg text-sm text-[#2C3531] placeholder-[#A5A095] focus:outline-none focus:ring-2 focus:ring-[#122B22]/20 focus:border-[#122B22] transition-all"
            />
          </div>

          {/* Category & Roast Profile */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-[#2C3531] mb-1.5">
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 bg-white border border-[#DDD8CE] rounded-lg text-sm text-[#2C3531] focus:outline-none focus:ring-2 focus:ring-[#122B22]/20 focus:border-[#122B22] transition-all cursor-pointer"
              >
                <option value="Espresso">Espresso</option>
                <option value="Pour Over">Pour Over</option>
                <option value="Cold Brew">Cold Brew</option>
                <option value="Matcha & Tea">Matcha & Tea</option>
                <option value="Specialty Drinks">Specialty Drinks</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#2C3531] mb-1.5">
                Roast Profile
              </label>
              <select
                name="roastProfile"
                value={formData.roastProfile}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 bg-white border border-[#DDD8CE] rounded-lg text-sm text-[#2C3531] focus:outline-none focus:ring-2 focus:ring-[#122B22]/20 focus:border-[#122B22] transition-all cursor-pointer"
              >
                <option value="Light Roast">Light Roast</option>
                <option value="Medium Roast">Medium Roast</option>
                <option value="Dark Roast">Dark Roast</option>
                <option value="Omni Roast">Omni Roast</option>
              </select>
            </div>
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
                value={formData.price}
                onChange={handleChange}
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
                value={formData.stockCount}
                onChange={handleChange}
                placeholder="40"
                className="w-full px-3.5 py-2.5 bg-white border border-[#DDD8CE] rounded-lg text-sm text-[#2C3531] placeholder-[#A5A095] focus:outline-none focus:ring-2 focus:ring-[#122B22]/20 focus:border-[#122B22] transition-all"
              />
            </div>
          </div>

          {/* Origin & Elevation */}
          <div>
            <label className="block text-sm font-semibold text-[#2C3531] mb-1.5">
              Origin & Elevation
            </label>
            <input
              type="text"
              name="originElevation"
              value={formData.originElevation}
              onChange={handleChange}
              placeholder="e.g. Sidama, Ethiopia (2,100m) • Natural Process"
              className="w-full px-3.5 py-2.5 bg-white border border-[#DDD8CE] rounded-lg text-sm text-[#2C3531] placeholder-[#A5A095] focus:outline-none focus:ring-2 focus:ring-[#122B22]/20 focus:border-[#122B22] transition-all"
            />
          </div>

          {/* Tasting Notes */}
          <div>
            <label className="block text-sm font-semibold text-[#2C3531] mb-1.5">
              Tasting Notes (comma separated)
            </label>
            <input
              type="text"
              name="tastingNotes"
              value={formData.tastingNotes}
              onChange={handleChange}
              placeholder="e.g. Wild Berry, Honeysuckle, Dark Chocolate"
              className="w-full px-3.5 py-2.5 bg-white border border-[#DDD8CE] rounded-lg text-sm text-[#2C3531] placeholder-[#A5A095] focus:outline-none focus:ring-2 focus:ring-[#122B22]/20 focus:border-[#122B22] transition-all"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-[#2C3531] mb-1.5">
              Description & Barista Brewing Notes
            </label>
            <textarea
              name="description"
              rows={3}
              value={formData.description}
              onChange={handleChange}
              placeholder="Detailed flavor profile, extraction notes, or serving recommendations..."
              className="w-full px-3.5 py-2.5 bg-white border border-[#DDD8CE] rounded-lg text-sm text-[#2C3531] placeholder-[#A5A095] focus:outline-none focus:ring-2 focus:ring-[#122B22]/20 focus:border-[#122B22] transition-all resize-y"
            />
          </div>

          {/* Coffee Image Presets */}
          <div>
            <label className="block text-sm font-semibold text-[#2C3531] mb-2">
              Coffee Image Preset or Custom URL
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-3">
              {presetImages.map((preset) => {
                const isSelected = selectedPreset === preset.id;
                return (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => handleSelectPreset(preset)}
                    className={`relative group h-16 rounded-lg overflow-hidden border-2 transition-all ${
                      isSelected
                        ? 'border-[#122B22] ring-2 ring-[#122B22]/40 scale-[1.02]'
                        : 'border-transparent opacity-80 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={preset.url}
                      alt={preset.label}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-end p-1">
                      <span className="text-[9px] font-semibold text-white leading-tight drop-shadow">
                        {preset.label}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            <input
              type="text"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={(e) => {
                setSelectedPreset(null);
                handleChange(e);
              }}
              className="w-full px-3.5 py-2 bg-white border border-[#DDD8CE] rounded-lg text-xs font-mono text-[#2C3531] placeholder-[#A5A095] focus:outline-none focus:ring-2 focus:ring-[#122B22]/20 focus:border-[#122B22] transition-all"
            />
          </div>

          {/* Checkboxes */}
          <div className="pt-2 border-t border-[#E5E0D6] flex flex-wrap gap-6 items-center">
            <label className="flex items-center gap-2 text-sm text-[#2C3531] cursor-pointer">
              <input
                type="checkbox"
                name="availableInStock"
                checked={formData.availableInStock}
                onChange={handleChange}
                className="w-4 h-4 rounded border-[#CBD5E1] text-[#122B22] focus:ring-[#122B22] accent-[#122B22]"
              />
              Available In Stock Immediately
            </label>

            <label className="flex items-center gap-2 text-sm text-[#2C3531] cursor-pointer">
              <input
                type="checkbox"
                name="highlightFeatured"
                checked={formData.highlightFeatured}
                onChange={handleChange}
                className="w-4 h-4 rounded border-[#CBD5E1] text-[#122B22] focus:ring-[#122B22] accent-[#122B22]"
              />
              Highlight as Featured Blend
            </label>
          </div>

          {/* Footer Action Buttons */}
          <div className="pt-4 flex items-center justify-end gap-3 border-t border-[#E5E0D6]">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 bg-white border border-[#D5D0C5] rounded-lg text-sm font-semibold text-[#4A5568] hover:bg-[#EAE6DE] transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-[#122B22] text-[#F7F5F0] rounded-lg text-sm font-semibold hover:bg-[#1C3E32] transition-colors shadow-md active:scale-[0.99]"
            >
              Publish to Menu
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default AddCoffee;