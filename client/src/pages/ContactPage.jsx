import React, { useState } from "react";
import { Mail, Phone, MapPin, Clock, Send, MessageSquare, CheckCircle2 } from "lucide-react";


const ContactPage = () => {
  

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      showToast("Please fill in all required fields.", "error");
      return;
    }
    setSubmitted(true);
    showToast("Message received! A tea sommelier will respond within 24 hours.");
  };

  return (
    <div className="py-12 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-bold uppercase tracking-widest text-emerald-800 dark:text-emerald-400">
          Visit or Inquire
        </span>
        <h1 className="font-serif-tea text-4xl sm:text-5xl font-bold text-stone-900 dark:text-stone-100 tracking-tight">
          Connect with Our Sanctuary
        </h1>
        <p className="text-stone-600 dark:text-stone-400 text-sm">
          Have inquiries about rare cultivars, customized corporate gifts, or wholesale inquiries? We welcome you warmly.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Contact Information & Hours */}
        <div className="lg:col-span-5 space-y-8">
          <div className="bg-stone-50 dark:bg-stone-900/60 p-8 rounded-3xl border border-stone-200/80 dark:border-stone-800 space-y-6">
            <h3 className="font-serif-tea text-2xl font-bold text-stone-900 dark:text-stone-100">
              Teahouse Headquarters
            </h3>

            <div className="space-y-4 text-sm text-stone-600 dark:text-stone-300">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-emerald-700 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-stone-900 dark:text-stone-100 block">Address:</span>
                  <span>{settings.storeAddress}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-emerald-700 dark:text-emerald-400 flex-shrink-0" />
                <div>
                  <span className="font-bold text-stone-900 dark:text-stone-100 block">Direct Email:</span>
                  <a href={`mailto:${settings.contactEmail}`} className="hover:text-emerald-700 underline">
                    {settings.contactEmail}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-emerald-700 dark:text-emerald-400 flex-shrink-0" />
                <div>
                  <span className="font-bold text-stone-900 dark:text-stone-100 block">Phone Assistance:</span>
                  <span>{settings.contactPhone}</span>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-3 border-t border-stone-200 dark:border-stone-800">
                <Clock className="w-5 h-5 text-emerald-700 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-stone-900 dark:text-stone-100 block">Tasting Bar Hours:</span>
                  <div className="text-xs space-y-1 mt-1 text-stone-500 dark:text-stone-400">
                    <div>Tuesday – Friday: 8:00 AM – 6:00 PM</div>
                    <div>Saturday & Sunday: 9:00 AM – 7:00 PM</div>
                    <div>Monday: Closed for garden cupping & inventory</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Google Map Preview */}
          <div className="rounded-3xl overflow-hidden border border-stone-200 dark:border-stone-800 shadow-md relative aspect-[16/10] bg-stone-200">
            {/* Embedded Google Maps frame */}
            <iframe
              title="Camellia Leaf Location Map"
              width="100%"
              height="100%"
              frameBorder="0"
              scrolling="no"
              marginHeight="0"
              marginWidth="0"
              src="https://maps.google.com/maps?q=Portland%20Japanese%20Garden%20OR&t=&z=13&ie=UTF8&iwloc=&output=embed"
              className="w-full h-full filter contrast-105 opacity-90 hover:opacity-100 transition-opacity"
            />
            <div className="absolute bottom-3 left-3 bg-white/90 dark:bg-stone-900/90 backdrop-blur-md px-3 py-1.5 rounded-xl text-xs font-semibold shadow-sm flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-emerald-700" />
              <span>Heritage Quarter Tasting Bar</span>
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
              We answer questions regarding steeping techniques, custom blends, or international deliveries.
            </p>

            {submitted ? (
              <div className="p-8 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-700 dark:text-emerald-400 mx-auto" />
                <h4 className="font-serif-tea text-xl font-bold text-stone-900 dark:text-stone-100">
                  Message Dispatched
                </h4>
                <p className="text-xs text-stone-600 dark:text-stone-300 max-w-sm mx-auto">
                  Thank you, {formData.name}. Your inquiry has been forwarded to our sensory director.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: "", email: "", subject: "", message: "" });
                  }}
                  className="mt-2 text-xs font-semibold text-emerald-800 dark:text-emerald-400 underline"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider block mb-1.5">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Marcus Thorne"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full text-xs p-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider block mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. marcus@tea.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full text-xs p-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider block mb-1.5">
                    Subject / Nature of Inquiry
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Wholesale inquiry or Matcha steeping question"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full text-xs p-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider block mb-1.5">
                    Your Message *
                  </label>
                  <textarea
                    required
                    rows={5}
                    placeholder="How may our tea specialists assist you today?"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full text-xs p-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-emerald-800 hover:bg-emerald-900 active:scale-98 text-white text-xs font-semibold shadow-md flex items-center justify-center gap-2 transition-all"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;