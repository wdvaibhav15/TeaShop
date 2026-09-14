import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User, Sparkles, PhoneCall } from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  time: string;
}

export const LiveChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm-1',
      sender: 'bot',
      text: 'Hello! Welcome to Vortex3D Concierge. How can I assist you with your order, 3D specs, or shipping today?',
      time: 'Just now'
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isTyping]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userText = input.trim();
    const newMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: userText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, newMsg]);
    setInput('');
    setIsTyping(true);

    // Simulate smart bot response
    setTimeout(() => {
      let reply = "Our support team is on standby. Standard shipping takes 2-4 business days, and you have a 30-day trial period on all items!";
      const lower = userText.toLowerCase();

      if (lower.includes('order') || lower.includes('track')) {
        reply = "You can track your active orders with live carrier updates in the 'Track Orders' tab in the navbar. Your order VX-8921 is currently in priority transit via FedEx.";
      } else if (lower.includes('return') || lower.includes('refund')) {
        reply = "We offer a 30-day risk-free return guarantee. You can start a return directly from your Orders page to generate a prepaid shipping label immediately.";
      } else if (lower.includes('coupon') || lower.includes('discount')) {
        reply = "You can use code 'VORTEX20' at checkout for 20% off orders above $100!";
      } else if (lower.includes('3d') || lower.includes('model')) {
        reply = "All our product cards support interactive 3D rotation! Click the 3D button or Quick View to orbit, zoom, or view wireframe components.";
      }

      setMessages(prev => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text: reply,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {/* Trigger Button */}
      {!isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 rounded-full bg-gradient-to-tr from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white shadow-xl shadow-indigo-600/40 flex items-center justify-center transition-transform hover:scale-105 active:scale-95 group"
          aria-label="Open Live Chat Support"
        >
          <MessageSquare className="w-6 h-6" />
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-white dark:border-slate-900 rounded-full" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="w-[360px] h-[480px] bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col justify-between overflow-hidden animate-fade-in">
          {/* Header */}
          <div className="p-4 bg-indigo-600 text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <p className="font-display font-semibold text-xs leading-none">Vortex3D Support</p>
                <span className="text-[10px] text-indigo-200 flex items-center gap-1 mt-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Live Concierge Online
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg text-white/80 hover:text-white hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick suggestions pills */}
          <div className="px-3 py-2 bg-slate-50 dark:bg-slate-800/60 border-b border-slate-100 dark:border-slate-800 flex gap-1.5 overflow-x-auto text-[11px] whitespace-nowrap">
            <button
              type="button"
              onClick={() => setInput('How do I track my order?')}
              className="px-2.5 py-1 rounded-full bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 hover:border-indigo-500"
            >
              Track Order
            </button>
            <button
              type="button"
              onClick={() => setInput('What is your return policy?')}
              className="px-2.5 py-1 rounded-full bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 hover:border-indigo-500"
            >
              Returns
            </button>
            <button
              type="button"
              onClick={() => setInput('Are there any active discount coupons?')}
              className="px-2.5 py-1 rounded-full bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 hover:border-indigo-500"
            >
              Discounts
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map(m => (
              <div
                key={m.id}
                className={`flex gap-2.5 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.sender === 'bot' && (
                  <div className="w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-500 flex items-center justify-center shrink-0 mt-0.5">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] rounded-2xl px-3.5 py-2 text-xs leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-indigo-600 text-white rounded-br-xs'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-bl-xs'
                  }`}
                >
                  <p>{m.text}</p>
                  <span
                    className={`block text-[9px] mt-1 ${
                      m.sender === 'user' ? 'text-indigo-200' : 'text-slate-400'
                    }`}
                  >
                    {m.time}
                  </span>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2 text-xs text-slate-400 italic">
                <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce" />
                <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce [animation-delay:0.4s]" />
                Concierge is typing...
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Footer */}
          <form onSubmit={handleSend} className="p-3 border-t border-slate-200 dark:border-slate-800 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Ask a question..."
              className="flex-1 px-3 py-2 text-xs rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-hidden focus:ring-1 focus:ring-indigo-500"
            />
            <button
              type="submit"
              className="p-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
