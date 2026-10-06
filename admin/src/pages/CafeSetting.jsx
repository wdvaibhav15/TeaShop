import React, { useState } from "react";
import { MapPin, Mail, Phone, Clock, Save } from "lucide-react";
import axios from "axios";

const CafeSetting = () => {
  const [cafeName, setCafeName] = useState("Camellia Leaf");
  const [cafeAddress, setCafeAddress] = useState(
    "Rajkiye Nagar, Karnataka 238456"
  );
  const [cafeEmail, setCafeEmail] = useState("camellia@shop.com");
  const [cafePhone, setCafePhone] = useState("+91 9747254287");
  const [cafeTiming, setCafeTiming] = useState(
    "Tuesday - Friday: 8:00 AM - 6:00 PM | Saturday & Sunday: 9:00 AM - 7:00 PM"
  );

  console.log(import.meta.env.VITE_CLIENT_API_URL);
  const handleSave = async (e) => {
  e.preventDefault();

  try {
    const response = await axios.post(
      `${import.meta.env.VITE_CLIENT_API_URL}/api/admin/cafe-settings`,
      {
        cafeName,
        cafeAddress,
        cafeContact: cafePhone,
        cafeEmail,
        cafeTiming,
      }
    );

    console.log(response.data);

    alert("Cafe settings saved successfully!");
  } catch (error) {
    console.log(error);

    alert(
      error.response?.data?.message ||
      "Failed to save cafe settings"
    );
  }
};

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-stone-950 border border-stone-800 rounded-3xl p-8 shadow-xl">
        <h2 className="text-3xl font-serif font-bold text-stone-100 mb-8">
          Cafe Settings
        </h2>

        <div className="space-y-6">
          {/* Cafe Name */}
          <div>
            <label className="block text-sm font-semibold text-stone-300 mb-2">
              Cafe Name
            </label>

            <input
              type="text"
              value={cafeName}
              onChange={(e) => setCafeName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-stone-900 border border-stone-700 text-white focus:outline-none focus:ring-2 focus:ring-emerald-600"
            />
          </div>

          {/* Cafe Address */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-stone-300 mb-2">
              <MapPin className="w-4 h-4 text-emerald-400" />
              Cafe Address
            </label>

            <textarea
              rows={3}
              value={cafeAddress}
              onChange={(e) => setCafeAddress(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-stone-900 border border-stone-700 text-white focus:outline-none focus:ring-2 focus:ring-emerald-600"
            />
          </div>

          {/* Cafe Email */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-stone-300 mb-2">
              <Mail className="w-4 h-4 text-emerald-400" />
              Cafe Email
            </label>

            <input
              type="email"
              value={cafeEmail}
              onChange={(e) => setCafeEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-stone-900 border border-stone-700 text-white focus:outline-none focus:ring-2 focus:ring-emerald-600"
            />
          </div>

          {/* Cafe Phone */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-stone-300 mb-2">
              <Phone className="w-4 h-4 text-emerald-400" />
              Cafe Phone
            </label>

            <input
              type="text"
              value={cafePhone}
              onChange={(e) => setCafePhone(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-stone-900 border border-stone-700 text-white focus:outline-none focus:ring-2 focus:ring-emerald-600"
            />
          </div>

          {/* Cafe Timing */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-stone-300 mb-2">
              <Clock className="w-4 h-4 text-emerald-400" />
              Cafe Timing
            </label>

            <textarea
              rows={4}
              value={cafeTiming}
              onChange={(e) => setCafeTiming(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-stone-900 border border-stone-700 text-white focus:outline-none focus:ring-2 focus:ring-emerald-600"
            />
          </div>

          {/* Save Button */}
          <button
            onClick={handleSave}
            className="w-full flex items-center justify-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white py-3 rounded-xl font-semibold transition-all"
          >
            <Save className="w-4 h-4" />
            Save Cafe Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default CafeSetting;