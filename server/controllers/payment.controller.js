import crypto from "crypto";
import razorpay from "../config/razorpay.js";
import Order from "../models/order.model.js";
import PaymentHistory from "../models/paymentHistory.model.js";

export const createOrder = async (req, res) => {
  try {
    const {
      amount,
      coffeeId,
      quantity,
      userId,
    } = req.body;

    if (!amount || !coffeeId || !userId) {
      return res.status(400).json({
        success: false,
        message:
          "Amount, Coffee ID and User ID are required",
      });
    }

    const options = {
      amount: Math.round(amount * 100),
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const razorpayOrder =
      await razorpay.orders.create(options);

    const order = await Order.create({
      userId,
      coffeeId,
      quantity,
      amount,
      razorpayOrderId: razorpayOrder.id,
      paymentStatus: "PENDING",
    });

    await PaymentHistory.create({
      orderId: order._id,
      userId,
      coffeeId,
      quantity,
      amount,
      razorpayOrderId: razorpayOrder.id,
      paymentStatus: "PENDING",
    });

    return res.status(201).json({
      success: true,
      order: razorpayOrder,
      dbOrderId: order._id,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Failed to create order",
      error: error.message,
    });
  }
};
export const verifyPayment = async (
  req,
  res
) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;

    const body =
      razorpay_order_id +
      "|" +
      razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac(
        "sha256",
        process.env.RAZORPAY_KEY_SECRET
      )
      .update(body)
      .digest("hex");

    if (
      expectedSignature !==
      razorpay_signature
    ) {
      await Order.findOneAndUpdate(
        {
          razorpayOrderId:
            razorpay_order_id,
        },
        {
          paymentStatus: "FAILED",
        }
      );

      await PaymentHistory.findOneAndUpdate(
        {
          razorpayOrderId:
            razorpay_order_id,
        },
        {
          paymentStatus: "FAILED",
        }
      );

      return res.status(400).json({
        success: false,
        message:
          "Invalid payment signature",
      });
    }

    const updatedOrder =
      await Order.findOneAndUpdate(
        {
          razorpayOrderId:
            razorpay_order_id,
        },
        {
          paymentStatus: "PAID",
          razorpayPaymentId:
            razorpay_payment_id,
          razorpaySignature:
            razorpay_signature,
          paidAt: new Date(),
        },
        {
          new: true,
        }
      );

    if (!updatedOrder) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    await PaymentHistory.findOneAndUpdate(
      {
        razorpayOrderId:
          razorpay_order_id,
      },
      {
        paymentStatus: "PAID",
        razorpayPaymentId:
          razorpay_payment_id,
        razorpaySignature:
          razorpay_signature,
        paidAt: new Date(),
      },
      {
        new: true,
      }
    );

    return res.status(200).json({
      success: true,
      message:
        "Payment verified successfully",
      order: updatedOrder,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Verification failed",
      error: error.message,
    });
  }
};

export const getPaymentHistory = async (
  req,
  res
) => {
  try {
    const payments =
      await PaymentHistory.find()
        .populate("userId")
        .populate("coffeeId")
        .populate("orderId")
        .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      payments,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getMyOrders = async (req, res) => {
  try {
    const userId = req.user._id;

    const orders = await Order.find({
      userId,
    })
      .populate("coffeeId")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};