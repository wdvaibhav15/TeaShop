
import React, { useState, useEffect } from 'react';
import { X, Upload, Trash2 } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

const AddCoffee = ({ onClose }) => {
  const [coffeeTitle, setCoffeeTitle] = useState('');
  const [price, setPrice] = useState('');
  const [stockCount, setStockCount] = useState('');
  const [description, setDescription] = useState('');

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [loading, setLoading] = useState(false);

  // Clean up temporary image preview URLs.
  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please select a valid image file');
      e.target.value = '';
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size must be 5 MB or less');
      e.target.value = '';
      return;
    }

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    setLoading(true);

    try {
      const formData = new FormData();

      formData.append('coffeeTitle', coffeeTitle.trim());
      formData.append('price', Number(price));
      formData.append(
        'stockCount',
        stockCount === '' ? 0 : Number(stockCount)
      );
      formData.append('description', description.trim());

      if (imageFile) {
        formData.append('imageFile', imageFile);
      }

      const baseUrl =
        import.meta.env.VITE_CLIENT_API_URL || 'http://localhost:3000';

      const response = await axios.post(
        `${baseUrl}/api/coffee/add-coffee`,
        formData
      );

      if (
        (response.status === 200 || response.status === 201) &&
        response.data?.success !== false
      ) {
        toast.success('Coffee added successfully');
        onClose?.();
      } else {
        toast.error(
          response.data?.message || 'Failed to add coffee'
        );
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || 'Failed to add coffee'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
        fixed inset-0 z-[100]
        flex items-start sm:items-center justify-center
        overflow-y-auto overscroll-contain
        bg-black/60 backdrop-blur-sm
        p-2 sm:p-4
      "
      onMouseDown={(e) => {
        if (e.target === e.currentTarget && !loading) {
          onClose?.();
        }
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="add-coffee-title"
        className="
          relative my-auto w-full
          max-w-2xl min-w-0
          max-h-[calc(100dvh-1rem)] sm:max-h-[90dvh]
          flex flex-col
          overflow-hidden rounded-xl sm:rounded-2xl
          border border-[#E2DDD5]
          bg-[#F6F4EF] text-[#2C3531]
          shadow-2xl
        "
      >
        {/* Header */}
        <div className="
          flex shrink-0 items-center justify-between gap-3
          bg-[#172D23]
          px-4 py-4 sm:px-6 sm:py-5
          text-white
        ">
          <div className="min-w-0">
            <p className="
              text-[10px] sm:text-[11px]
              font-mono font-bold uppercase tracking-widest
              text-[#A2C4B7]
            ">
              Menu Management
            </p>

            <h2
              id="add-coffee-title"
              className="
                mt-1 text-lg sm:text-2xl
                font-serif font-bold leading-tight
                tracking-tight text-[#F7F5F0]
              "
            >
              Add New Coffee to Menu
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            aria-label="Close modal"
            className="
              flex h-9 w-9 shrink-0 items-center justify-center
              rounded-full bg-white/10
              text-white/80 transition-colors
              hover:bg-white/20 hover:text-white
              disabled:cursor-not-allowed disabled:opacity-50
            "
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Scrollable Form */}
        <form
          onSubmit={handleSubmit}
          className="
            min-h-0 flex-1 overflow-y-auto
            p-4 sm:p-6
          "
        >
          <div className="space-y-4 sm:space-y-5">
            {/* Coffee Title */}
            <div>
              <label
                htmlFor="coffeeTitle"
                className="mb-1.5 block text-sm font-semibold"
              >
                Coffee / Beverage Title *
              </label>

              <input
                id="coffeeTitle"
                type="text"
                name="coffeeTitle"
                value={coffeeTitle}
                onChange={(e) => setCoffeeTitle(e.target.value)}
                placeholder="e.g. Ethiopian Guji Highlands Reserve"
                autoComplete="off"
                required
                className="
                  w-full min-w-0 rounded-lg
                  border border-[#DDD8CE] bg-white
                  px-3 py-2.5 sm:px-3.5
                  text-sm text-[#2C3531]
                  placeholder:text-[#A5A095]
                  outline-none transition
                  focus:border-[#122B22]
                  focus:ring-2 focus:ring-[#122B22]/20
                "
              />
            </div>

            {/* Price & Stock */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="min-w-0">
                <label
                  htmlFor="price"
                  className="mb-1.5 block text-sm font-semibold"
                >
                  Price (₹) *
                </label>

                <input
                  id="price"
                  type="number"
                  name="price"
                  min="0.01"
                  step="0.01"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="149.00"
                  required
                  className="
                    w-full min-w-0 rounded-lg
                    border border-[#DDD8CE] bg-white
                    px-3 py-2.5 sm:px-3.5
                    text-sm outline-none transition
                    focus:border-[#122B22]
                    focus:ring-2 focus:ring-[#122B22]/20
                  "
                />
              </div>

              <div className="min-w-0">
                <label
                  htmlFor="stockCount"
                  className="mb-1.5 block text-sm font-semibold"
                >
                  Initial Stock Count
                </label>

                <input
                  id="stockCount"
                  type="number"
                  name="stockCount"
                  min="0"
                  step="1"
                  value={stockCount}
                  onChange={(e) => setStockCount(e.target.value)}
                  placeholder="40"
                  className="
                    w-full min-w-0 rounded-lg
                    border border-[#DDD8CE] bg-white
                    px-3 py-2.5 sm:px-3.5
                    text-sm outline-none transition
                    focus:border-[#122B22]
                    focus:ring-2 focus:ring-[#122B22]/20
                  "
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label
                htmlFor="description"
                className="mb-1.5 block text-sm font-semibold"
              >
                Description & Barista Brewing Notes
              </label>

              <textarea
                id="description"
                name="description"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Flavor profile, brewing notes, or serving recommendations..."
                className="
                  w-full min-w-0 resize-y rounded-lg
                  border border-[#DDD8CE] bg-white
                  px-3 py-2.5 sm:px-3.5
                  text-sm leading-relaxed
                  placeholder:text-[#A5A095]
                  outline-none transition
                  focus:border-[#122B22]
                  focus:ring-2 focus:ring-[#122B22]/20
                "
              />
            </div>

            {/* Image Upload */}
            <div>
              <label className="mb-2 block text-sm font-semibold">
                Coffee Image
              </label>

              <label className="
                flex min-h-28 sm:min-h-32 w-full
                cursor-pointer flex-col items-center justify-center
                rounded-lg border-2 border-dashed
                border-[#DDD8CE] bg-white
                px-3 py-5 text-center
                transition-colors hover:bg-[#FAF9F5]
              ">
                <Upload className="mb-2 h-6 w-6 sm:h-7 sm:w-7 text-[#A5A095]" />

                <p className="text-xs font-semibold">
                  Click to upload
                  <span className="font-normal text-[#A5A095]">
                    {' '}or choose a file
                  </span>
                </p>

                <p className="mt-1 text-[10px] text-[#A5A095]">
                  PNG, JPG, WEBP · Maximum 5 MB
                </p>

                <input
                  type="file"
                  name="imageFile"
                  accept="image/png,image/jpeg,image/webp"
                  className="sr-only"
                  onChange={handleFileChange}
                />
              </label>

              {/* Image Preview */}
              {imagePreview && (
                <div className="
                  mt-3 flex min-w-0 items-center gap-3
                  rounded-lg border border-[#E2DDD5]
                  bg-white p-2 sm:p-3
                ">
                  <img
                    src={imagePreview}
                    alt="Coffee preview"
                    className="
                      h-12 w-12 sm:h-16 sm:w-16
                      shrink-0 rounded-md
                      border border-[#E2DDD5] object-cover
                    "
                  />

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-semibold">
                      {imageFile?.name}
                    </p>

                    <p className="mt-1 text-[10px] text-[#A5A095]">
                      {imageFile
                        ? `${(imageFile.size / 1024).toFixed(1)} KB`
                        : ''}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    aria-label="Remove selected image"
                    className="
                      shrink-0 rounded-lg p-2
                      text-red-500 transition-colors
                      hover:bg-red-50
                    "
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Footer Actions */}
          <div className="
            mt-5 flex flex-col-reverse gap-2
            border-t border-[#E5E0D6] pt-4
            sm:flex-row sm:justify-end sm:gap-3
          ">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="
                w-full rounded-lg border border-[#D5D0C5]
                bg-white px-5 py-2.5
                text-sm font-semibold text-[#4A5568]
                transition-colors hover:bg-[#EAE6DE]
                disabled:opacity-50
                sm:w-auto
              "
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="
                w-full rounded-lg bg-[#122B22]
                px-6 py-2.5 text-sm font-semibold
                text-[#F7F5F0] shadow-md
                transition-colors hover:bg-[#1C3E32]
                active:scale-[0.99]
                disabled:cursor-not-allowed disabled:opacity-50
                sm:w-auto
              "
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
