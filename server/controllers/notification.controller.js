import Order from "../models/order.model.js";
import Subscriber from "../models/subscriber.model.js";
import Feedback from "../models/UserFeedback.js";

export const getNotifications = async (req, res) => {
  try {
    const notifications = [];

    // Orders
    const orders = await Order.find()
      .sort({ createdAt: -1 })
      .limit(10);

    orders.forEach((order) => {
      notifications.push({
        id: order._id,
        type: "order",
        title: "New Order Received",
        message: `Order placed for ₹${order.amount || 0}`,
        createdAt: order.createdAt,
      });
    });

    // Subscribers
    const subscribers = await Subscriber.find()
      .sort({ createdAt: -1 })
      .limit(10);

    subscribers.forEach((subscriber) => {
      notifications.push({
        id: subscriber._id,
        type: "subscriber",
        title: "New Subscriber",
        message: `${subscriber.email} joined the newsletter`,
        createdAt: subscriber.createdAt,
      });
    });

    // Feedback
    const feedbacks = await Feedback.find()
      .sort({ createdAt: -1 })
      .limit(10);

    feedbacks.forEach((feedback) => {
      notifications.push({
        id: feedback._id,
        type: "feedback",
        title: "New Feedback",
        message: feedback.message,
        createdAt: feedback.createdAt,
      });
    });

    // Sort all notifications by latest
    notifications.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    return res.status(200).json({
      success: true,
      count: notifications.length,
      notifications,
    });
  } catch (error) {
    console.error("Notification Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};