// import React, { useState } from 'react';
// import { X, Upload, Trash2 } from 'lucide-react';
// import axios from 'axios';

// const AddCoffee = ({ onClose }) => {
//   const [coffeeTitle, setCoffeeTitle] = useState('');
//   const [price, setPrice] = useState('');
//   const [stockCount, setStockCount] = useState('');
//   const [description, setDescription] = useState('');
  
//   // Device Image States
//   const [imageFile, setImageFile] = useState(null);
//   const [imagePreview, setImagePreview] = useState('');
//   const [loading, setLoading] = useState(false);

//   // Handle File Selection from Device
//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setImageFile(file);
//       const previewUrl = URL.createObjectURL(file);
//       setImagePreview(previewUrl);
//     }
//   };

//   // Clear Selected File
//   const handleRemoveImage = () => {
//     setImageFile(null);
//     setImagePreview('');
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const response = await axios.post(
//         `${import.meta.env.VITE_CLIENT_API_URL}/api/coffee/add-coffee`,
//         {
//           coffeeTitle,
//           price: Number(price),
//           stockCount: stockCount ? Number(stockCount) : 0,
//           description,
//           imageFile,
//         },
//         {
//           headers: {
//             'Content-Type': 'multipart/form-data',
//           },
//         }
//       );

//       if (response.status === 200 || response.status === 201 || response.data?.success) {
//         if (typeof onClose === 'function') {
//           onClose();
//         }
//       }
//     } catch (error) {
//       console.error('Error adding coffee:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
//       <div className="w-full max-w-2xl bg-[#F6F4EF] rounded-xl shadow-2xl overflow-hidden text-[#2C3531] border border-[#E2DDD5]">
        
//         {/* Header */}
//         <div className="bg-[#172D23] text-white px-6 py-5 flex items-center justify-between">
//           <div>
//             <p className="text-[11px] font-mono tracking-widest text-[#A2C4B7] uppercase font-bold">
//               Menu Management
//             </p>
//             <h2 className="text-2xl font-serif font-bold tracking-tight text-[#F7F5F0]">
//               Add New Coffee to Menu
//             </h2>
//           </div>
//           <button
//             type="button"
//             onClick={onClose}
//             aria-label="Close modal"
//             className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/80 hover:text-white transition-colors cursor-pointer"
//           >
//             <X className="w-5 h-5" />
//           </button>
//         </div>

//         {/* Form */}
//         <form onSubmit={handleSubmit} className="p-6 space-y-5">
//           {/* Coffee Title */}
//           <div>
//             <label className="block text-sm font-semibold text-[#2C3531] mb-1.5">
//               Coffee / Beverage Title *
//             </label>
//             <input
//               type="text"
//               name="title"
//               value={coffeeTitle}
//               onChange={(e) => setCoffeeTitle(e.target.value)}
//               placeholder="e.g. Ethiopian Guji Highlands Reserve"
//               required
//               className="w-full px-3.5 py-2.5 bg-white border border-[#DDD8CE] rounded-lg text-sm text-[#2C3531] placeholder-[#A5A095] focus:outline-none focus:ring-2 focus:ring-[#122B22]/20 focus:border-[#122B22] transition-all"
//             />
//           </div>

//           {/* Price & Initial Stock */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-semibold text-[#2C3531] mb-1.5">
//                 Price (USD $) *
//               </label>
//               <input
//                 type="number"
//                 step="0.01"
//                 name="price"
//                 value={price}
//                 onChange={(e) => setPrice(e.target.value)}
//                 placeholder="5.50"
//                 required
//                 className="w-full px-3.5 py-2.5 bg-white border border-[#DDD8CE] rounded-lg text-sm text-[#2C3531] placeholder-[#A5A095] focus:outline-none focus:ring-2 focus:ring-[#122B22]/20 focus:border-[#122B22] transition-all"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-semibold text-[#2C3531] mb-1.5">
//                 Initial Stock Count
//               </label>
//               <input
//                 type="number"
//                 name="stockCount"
//                 value={stockCount}
//                 onChange={(e) => setStockCount(e.target.value)}
//                 placeholder="40"
//                 className="w-full px-3.5 py-2.5 bg-white border border-[#DDD8CE] rounded-lg text-sm text-[#2C3531] placeholder-[#A5A095] focus:outline-none focus:ring-2 focus:ring-[#122B22]/20 focus:border-[#122B22] transition-all"
//               />
//             </div>
//           </div>

//           {/* Description */}
//           <div>
//             <label className="block text-sm font-semibold text-[#2C3531] mb-1.5">
//               Description & Barista Brewing Notes
//             </label>
//             <textarea
//               name="description"
//               rows={3}
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//               placeholder="Detailed flavor profile, extraction notes, or serving recommendations..."
//               className="w-full px-3.5 py-2.5 bg-white border border-[#DDD8CE] rounded-lg text-sm text-[#2C3531] placeholder-[#A5A095] focus:outline-none focus:ring-2 focus:ring-[#122B22]/20 focus:border-[#122B22] transition-all resize-y"
//             />
//           </div>

//           {/* Device Image Upload Only */}
//           <div>
//             <label className="block text-sm font-semibold text-[#2C3531] mb-2">
//               Coffee Image
//             </label>

//             <div className="flex items-center justify-center w-full">
//               <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-[#DDD8CE] rounded-lg cursor-pointer bg-white hover:bg-[#FAF9F5] transition-colors">
//                 <div className="flex flex-col items-center justify-center pt-5 pb-6">
//                   <Upload className="w-7 h-7 mb-2 text-[#A5A095]" />
//                   <p className="text-xs font-semibold text-[#2C3531]">
//                     Click to upload <span className="font-normal text-[#A5A095]">or drag file here</span>
//                   </p>
//                   <p className="text-[10px] text-[#A5A095] mt-0.5">PNG, JPG, WEBP up to 5MB</p>
//                 </div>
//                 <input
//                   type="file"
//                   accept="image/*"
//                   className="hidden"
//                   onChange={handleFileChange}
//                 />
//               </label>
//             </div>

//             {/* Selected Image Preview */}
//             {imagePreview && (
//               <div className="mt-3 flex items-center gap-3 p-2 bg-white border border-[#E2DDD5] rounded-lg">
//                 <img
//                   src={imagePreview}
//                   alt="Coffee Preview"
//                   className="w-14 h-14 object-cover rounded-md border border-[#E2DDD5]"
//                 />
//                 <div className="flex-1 overflow-hidden">
//                   <p className="text-xs font-semibold text-[#2C3531] truncate">
//                     {imageFile?.name}
//                   </p>
//                   <p className="text-[10px] text-[#A5A095]">
//                     {imageFile ? `${(imageFile.size / 1024).toFixed(1)} KB` : ''}
//                   </p>
//                 </div>
//                 <button
//                   type="button"
//                   onClick={handleRemoveImage}
//                   className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
//                   title="Remove image"
//                 >
//                   <Trash2 className="w-4 h-4" />
//                 </button>
//               </div>
//             )}
//           </div>

//           {/* Footer Action Buttons */}
//           <div className="pt-4 flex items-center justify-end gap-3 border-t border-[#E5E0D6]">
//             <button
//               type="button"
//               onClick={onClose}
//               disabled={loading}
//               className="px-5 py-2.5 bg-white border border-[#D5D0C5] rounded-lg text-sm font-semibold text-[#4A5568] hover:bg-[#EAE6DE] transition-colors cursor-pointer disabled:opacity-50"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               disabled={loading}
//               className="px-6 py-2.5 bg-[#122B22] text-[#F7F5F0] rounded-lg text-sm font-semibold hover:bg-[#1C3E32] transition-colors shadow-md active:scale-[0.99] cursor-pointer disabled:opacity-50"
//             >
//               {loading ? 'Publishing...' : 'Publish to Menu'}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddCoffee;

import React, { useState } from 'react';
import { X, Upload, Trash2 } from 'lucide-react';
import axios from 'axios';

const AddCoffee = ({ onClose }) => {
  const [coffeeTitle, setCoffeeTitle] = useState('');
  const [price, setPrice] = useState('');
  const [stockCount, setStockCount] = useState('');
  const [description, setDescription] = useState('');
  
  // Device Image States
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [loading, setLoading] = useState(false);

  // Handle File Selection from Device
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  // Clear Selected File
  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('coffeeTitle', coffeeTitle);
      formData.append('price', Number(price));
      formData.append('stockCount', stockCount ? Number(stockCount) : 0);
      formData.append('description', description);

      if (imageFile) {
        // 'imageFile' field name must match upload.single('imageFile') in route
        formData.append('imageFile', imageFile);
      }

      const response = await axios.post(
        `${import.meta.env.VITE_CLIENT_API_URL}/api/coffee/add-coffee`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      console.log('Response:', response);

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
                Price (Rs/-) *
              </label>
              <input
                type="number"
                step="0.01"
                name="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="149,199,..."
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

          {/* Device Image Upload Only */}
          <div>
            <label className="block text-sm font-semibold text-[#2C3531] mb-2">
              Coffee Image
            </label>

            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-[#DDD8CE] rounded-lg cursor-pointer bg-white hover:bg-[#FAF9F5] transition-colors">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-7 h-7 mb-2 text-[#A5A095]" />
                  <p className="text-xs font-semibold text-[#2C3531]">
                    Click to upload <span className="font-normal text-[#A5A095]">or drag file here</span>
                  </p>
                  <p className="text-[10px] text-[#A5A095] mt-0.5">PNG, JPG, WEBP up to 5MB</p>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
            </div>

            {/* Selected Image Preview */}
            {imagePreview && (
              <div className="mt-3 flex items-center gap-3 p-2 bg-white border border-[#E2DDD5] rounded-lg">
                <img
                  src={imagePreview}
                  alt="Coffee Preview"
                  className="w-14 h-14 object-cover rounded-md border border-[#E2DDD5]"
                />
                <div className="flex-1 overflow-hidden">
                  <p className="text-xs font-semibold text-[#2C3531] truncate">
                    {imageFile?.name}
                  </p>
                  <p className="text-[10px] text-[#A5A095]">
                    {imageFile ? `${(imageFile.size / 1024).toFixed(1)} KB` : ''}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                  title="Remove image"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            )}
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