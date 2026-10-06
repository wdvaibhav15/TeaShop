import { useDispatch } from "react-redux";
import { setFeedBackUser } from "../redux/userSlice.js";
import React, { useState, useEffect } from "react";

import { useSelector } from "react-redux";

import axios from "axios";
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2 } from "lucide-react";
import useCafeSettings from "../hooks/useCafeSettings";

const ContactPage = () => {
  const dispatch = useDispatch();
  const cafeData = useCafeSettings();

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await axios.post(
        `${import.meta.env.VITE_CLIENT_API_URL}/api/admin/userfeedback`,
        {
          name,
          email,
          subject,
          message,
        },
      );

      if (response.data.success) {
        setSubmitted(true);
        console.log("Contact Form Response:", response.data);
        const data = response.data.message;
        dispatch(setFeedBackUser(data));
      }
    } catch (error) {
      console.error("Contact Form Error:", error);

      alert(
        error.response?.data?.message ||
          "Failed to send message. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleResetForm = () => {
    setSubmitted(false);
    setName("");
    setEmail("");
    setSubject("");
    setMessage("");
  };

  return (
    <div className="py-12 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-bold uppercase tracking-widest text-emerald-800 dark:text-emerald-400">
          Visit or Inquire
        </span>

        <h1 className="font-serif-tea text-4xl sm:text-5xl font-bold text-stone-900 dark:text-stone-100 tracking-tight">
          Connect with Our Sanctuary
        </h1>

        <p className="text-stone-600 dark:text-stone-400 text-sm">
          Have inquiries about rare cultivars, customized corporate gifts, or
          wholesale inquiries? We welcome you warmly.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Contact Info */}
        <div className="lg:col-span-5 space-y-8">
          <div className="bg-stone-50 dark:bg-stone-900/60 p-8 rounded-3xl border border-stone-200/80 dark:border-stone-800 space-y-6">
            <h3 className="font-serif-tea text-2xl font-bold text-stone-900 dark:text-stone-100">
  {cafeData?.cafeName || "Teahouse Headquarters"}
</h3>

            <div className="space-y-4 text-sm text-stone-600 dark:text-stone-300">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-emerald-700 dark:text-emerald-400 mt-0.5" />
                <div>
                  <span>{cafeData?.cafeAddress}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-emerald-700 dark:text-emerald-400" />
                <div>
                  <span className="font-bold text-stone-900 dark:text-stone-100 block">
                    Direct Email:
                  </span>
                  <a
  href={`mailto:${cafeData?.cafeEmail}`}
  className="hover:text-emerald-700 underline"
>
  {cafeData?.cafeEmail}
</a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-emerald-700 dark:text-emerald-400" />
                <div>
                  <span className="font-bold text-stone-900 dark:text-stone-100 block">
                    Phone Assistance:
                  </span>
                  <span>{cafeData?.cafeContact}</span>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-3 border-t border-stone-200 dark:border-stone-800">
                <Clock className="w-5 h-5 text-emerald-700 dark:text-emerald-400 mt-0.5" />
                <div>
                  <span className="font-bold text-stone-900 dark:text-stone-100 block">
                    Tasting Bar Hours:
                  </span>

                  <div className="text-xs space-y-1 mt-1 text-stone-500 dark:text-stone-400">
  {cafeData?.cafeTiming}
</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-7">
          <div className="bg-white dark:bg-stone-900 p-8 sm:p-10 rounded-3xl border border-stone-200/80 dark:border-stone-800 shadow-sm">
            <h3 className="font-serif-tea text-2xl font-bold text-stone-900 dark:text-stone-100 mb-2">
              Send an Inquiry
            </h3>

            <p className="text-xs text-stone-500 mb-8">
              We answer questions regarding steeping techniques, custom blends,
              or international deliveries.
            </p>

            {submitted ? (
              <div className="p-8 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-700 dark:text-emerald-400 mx-auto" />

                <h4 className="font-serif-tea text-xl font-bold text-stone-900 dark:text-stone-100">
                  Message Sent Successfully
                </h4>

                <p className="text-xs text-stone-600 dark:text-stone-300">
                  Thank you for contacting us. We'll get back to you soon.
                </p>

                <button
                  type="button"
                  onClick={handleResetForm}
                  className="text-emerald-700 font-semibold underline"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    required
                    placeholder="Your Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full text-sm p-3 rounded-xl border border-stone-200"
                  />

                  <input
                    type="email"
                    required
                    placeholder="Your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full text-sm p-3 rounded-xl border border-stone-200"
                  />
                </div>

                <input
                  type="text"
                  placeholder="Subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full text-sm p-3 rounded-xl border border-stone-200"
                />

                <textarea
                  required
                  rows={5}
                  placeholder="Your Message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full text-sm p-3 rounded-xl border border-stone-200"
                />

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto px-8 py-3 rounded-xl bg-emerald-800 text-white flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  <Send size={16} />
                  {loading ? "Sending..." : "Send Message"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
