import crypto from "crypto";
import Order from "../models/order.model.js";
import razorpay from "../config/razorpay.js";

export const createOrder = async (req, res) => {
  try {
    const {
      amount,
      coffeeId,
      quantity,
      userId,
    } = req.body;

    if (!amount || !coffeeId) {
      return res.status(400).json({
        success: false,
        message: "Amount and Coffee ID are required",
      });
    }

    const options = {
      amount: Math.round(amount * 100),
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const razorpayOrder =
      await razorpay.orders.create(options);

    const newOrder = await Order.create({
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
      dbOrderId: newOrder._id,
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