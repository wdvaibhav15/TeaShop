import React, { useState } from 'react';
import { X } from 'lucide-react';



const AddCoffee = () => {
  


  return (
    <div className=" flex items-center  justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
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
            type="button"
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/80 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form  className="p-6 space-y-5">
          
          {/* Coffee Title */}
          <div>
            <label className="block text-sm font-semibold text-[#2C3531] mb-1.5">
              Coffee / Beverage Title *
            </label>
            <input
              type="text"
              name="title"
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
              <img
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-end p-1">
                      <span className="text-[9px] font-semibold text-white leading-tight drop-shadow">
                      </span>
                    </div>
            </div>

            <input
              type="text"
              name="imageUrl"
              
              
              className="w-full px-3.5 py-2 bg-white border border-[#DDD8CE] rounded-lg text-xs font-mono text-[#2C3531] placeholder-[#A5A095] focus:outline-none focus:ring-2 focus:ring-[#122B22]/20 focus:border-[#122B22] transition-all"
            />
          </div>

          

          {/* Footer Action Buttons */}
          <div className="pt-4 flex items-center justify-end gap-3 border-t border-[#E5E0D6]">
            <button
              type="button"
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