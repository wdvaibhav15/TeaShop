
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bell, X, ShoppingCart, Mail, MessageSquare } from "lucide-react";

const Notification = ({ isLoggedIn }) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isLoggedIn) {
      setNotifications([]);
      return;
    }

    let isMounted = true;

    const fetchNotifications = async () => {
      try {
        if (isMounted) setLoading(true);

        const baseUrl =
          import.meta.env.VITE_CLIENT_API_URL || "http://localhost:3000";

        const response = await axios.get(
          `${baseUrl}/api/notifications`
        );

        if (isMounted && response.data.success) {
          const now = Date.now();
          const oneDay = 24 * 60 * 60 * 1000;

          const recent = (response.data.notifications || []).filter(
            (item) => {
              const createdAt = new Date(item.createdAt).getTime();

              return (
                Number.isFinite(createdAt) &&
                now - createdAt < oneDay &&
                now >= createdAt
              );
            }
          );

          setNotifications(recent);
        }
      } catch (error) {
        console.error("Failed to fetch notifications:", error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchNotifications();

    const interval = setInterval(fetchNotifications, 10000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [isLoggedIn]);

  const getNotificationStyle = (type) => {
    if (type === "order") {
      return {
        Icon: ShoppingCart,
        color: "bg-emerald-900/50 text-emerald-400",
        label: "Order",
      };
    }

    if (type === "subscriber") {
      return {
        Icon: Mail,
        color: "bg-blue-900/50 text-blue-400",
        label: "Subscriber",
      };
    }

    return {
      Icon: MessageSquare,
      color: "bg-amber-900/50 text-amber-400",
      label: "Feedback",
    };
  };

  if (!isLoggedIn) return null;

  return (
    <div className="relative">
      {/* Notification button */}
      <button
        type="button"
        aria-label="Toggle notifications"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((prev) => !prev)}
        className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-stone-800 bg-stone-950 text-stone-200 transition hover:border-emerald-700 hover:bg-stone-800"
      >
        <Bell className="h-5 w-5" />

        {notifications.length > 0 && (
          <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-emerald-500 px-1 text-[10px] font-bold text-white">
            {notifications.length > 99 ? "99+" : notifications.length}
          </span>
        )}
      </button>

      {/* Responsive notification panel */}
      {isOpen && (
        <>
          <button
            type="button"
            aria-label="Close notifications"
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-[90] cursor-default bg-black/40"
          />

          <section
            role="dialog"
            aria-label="Notifications"
            className="fixed left-3 right-3 top-[76px] z-[100] mx-auto flex max-h-[calc(100dvh-92px)] flex-col overflow-hidden rounded-2xl border border-stone-700 bg-[#1C1917] text-white shadow-2xl sm:left-auto sm:right-5 sm:top-[90px] sm:w-[380px] lg:w-[420px]"
          >
            {/* Header */}
            <div className="flex shrink-0 items-center justify-between gap-3 border-b border-stone-800 p-4">
              <div>
                <h2 className="text-lg font-semibold">Notifications</h2>
                <p className="text-xs text-stone-500">
                  Your latest updates
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="whitespace-nowrap rounded-full bg-emerald-100 px-2.5 py-1 text-xs text-emerald-800">
                  {notifications.length} New
                </span>

                <button
                  type="button"
                  aria-label="Close notifications"
                  onClick={() => setIsOpen(false)}
                  className="rounded-lg p-2 text-stone-400 hover:bg-stone-800 hover:text-white"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Notification list */}
            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
              {loading && notifications.length === 0 ? (
                <div className="p-10 text-center text-sm text-stone-400">
                  Loading notifications...
                </div>
              ) : notifications.length === 0 ? (
                <div className="px-5 py-10 text-center sm:py-12">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-stone-800">
                    <Bell className="h-8 w-8 text-amber-400" />
                  </div>

                  <h3 className="font-semibold">No Notifications</h3>

                  <p className="mx-auto mt-2 max-w-xs text-sm leading-6 text-stone-400">
                    Orders, subscribers, and feedback will appear here.
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-stone-800">
                  {notifications.map((item) => {
                    const { Icon, color, label } =
                      getNotificationStyle(item.type);

                    return (
                      <article
                        key={item._id}
                        className="flex gap-3 p-4 transition hover:bg-stone-800/60"
                      >
                        <div
                          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${color}`}
                        >
                          <Icon size={20} />
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-start justify-between gap-2">
                            <h3 className="break-words text-sm font-semibold">
                              {item.title || label}
                            </h3>

                            <span className="shrink-0 text-[11px] text-stone-500">
                              {item.createdAt &&
                                new Date(item.createdAt).toLocaleTimeString(
                                  [],
                                  {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  }
                                )}
                            </span>
                          </div>

                          <p className="mt-1 break-words text-sm leading-5 text-stone-400">
                            {item.message}
                          </p>

                          <span className="mt-2 inline-block rounded-md bg-stone-800 px-2 py-1 text-[10px] text-stone-400">
                            {label}
                          </span>
                        </div>
                      </article>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="shrink-0 border-t border-stone-800 p-3">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="w-full rounded-xl py-2.5 text-sm font-semibold text-emerald-400 transition hover:bg-emerald-950/50"
              >
                Close Notifications
              </button>
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default Notification;
