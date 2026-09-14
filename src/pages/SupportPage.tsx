import React, { useState } from 'react';
import {
  HelpCircle,
  MessageSquare,
  ChevronDown,
  RotateCcw,
  ShieldCheck,
  Mail,
  Send,
  FileText,
  PhoneCall,
  CheckCircle2
} from 'lucide-react';
import { FAQS } from '../constants/data';
import { useApp } from '../context/AppContext';

export const SupportPage: React.FC = () => {
  const { showToast } = useApp();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Contact form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [orderNumber, setOrderNumber] = useState('');
  const [subject, setSubject] = useState('Product Specification');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      showToast('Missing Fields', 'Please complete the message details.', 'warning');
      return;
    }
    setSubmitted(true);
    showToast('Inquiry Dispatched', 'Concierge ticket #TK-8421 created. We will reply within 4 hours.', 'success');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Support Hero Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
          Vortex3D Concierge & Help Center
        </span>
        <h1 className="font-display font-black text-3xl sm:text-4xl text-slate-900 dark:text-white">
          How Can We Help You Today?
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
          Access comprehensive documentation on spatial 3D calibration, expedited shipping schedules, 30-day return policies, or speak with an audio engineer.
        </p>
      </div>

      {/* 3 Quick Help Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center">
            <RotateCcw className="w-5 h-5" />
          </div>
          <h3 className="font-display font-bold text-base text-slate-900 dark:text-white">
            30-Day Risk-Free Returns
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Not satisfied with the sound profile or fit? Generate an automated prepaid return shipping label directly from your Orders tab.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="font-display font-bold text-base text-slate-900 dark:text-white">
            2-Year Kinetic Warranty
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Every product includes comprehensive repair or replacement coverage for acoustic drivers, titanium crowns, and carbon plates.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
            <MessageSquare className="w-5 h-5" />
          </div>
          <h3 className="font-display font-bold text-base text-slate-900 dark:text-white">
            Live Support Concierge
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Our engineering team is available 24/7 on live chat (click the chat bubble at the bottom right) or via concierge email ticketing.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: FAQs Accordion */}
        <div className="lg:col-span-7 space-y-4">
          <h2 className="font-display font-black text-xl text-slate-900 dark:text-white">
            Frequently Asked Questions
          </h2>

          <div className="space-y-3">
            {FAQS.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full p-4 text-left flex items-center justify-between text-xs sm:text-sm font-display font-bold text-slate-900 dark:text-white"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 transition-transform ${
                        isOpen ? 'rotate-180 text-indigo-500' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="p-4 pt-0 text-xs text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800/60 mt-1">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Contact Inquiry Form */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-6 shadow-xs">
          <div>
            <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">
              Send Support Ticket
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Average response time: &lt; 2 hours
            </p>
          </div>

          {submitted ? (
            <div className="text-center py-8 space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="font-display font-bold text-sm text-slate-900 dark:text-white">
                Ticket #TK-8421 Received
              </h4>
              <p className="text-xs text-slate-500">
                A specialist has been assigned to your request and will contact you at <strong>{email}</strong>.
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                Send Another Ticket
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Alex Rivera"
                  className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="alex@example.com"
                  className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Related Order ID (Optional)
                </label>
                <input
                  type="text"
                  value={orderNumber}
                  onChange={e => setOrderNumber(e.target.value)}
                  placeholder="e.g. VX-8921"
                  className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white uppercase"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Topic Subject
                </label>
                <select
                  value={subject}
                  onChange={e => setSubject(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                >
                  <option>Product Specification & 3D Help</option>
                  <option>Order Shipping & Delivery Delay</option>
                  <option>Warranty Claim & Repair RMA</option>
                  <option>Return & Refund Request</option>
                  <option>Payment & Invoice Issue</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Message
                </label>
                <textarea
                  rows={3}
                  required
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  placeholder="Describe your inquiry..."
                  className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-600/30 flex items-center justify-center gap-2 transition-transform active:scale-95"
              >
                <Send className="w-4 h-4" />
                Submit Support Inquiry
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
