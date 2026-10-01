import mongoose from "mongoose";

const paymentHistorySchema = new mongoose.Schema(
  {
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    coffeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Coffee",
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    razorpayOrderId: {
      type: String,
      required: true,
    },

    razorpayPaymentId: {
      type: String,
      default: null,
    },

    razorpaySignature: {
      type: String,
      default: null,
    },

    paymentMethod: {
      type: String,
      default: "RAZORPAY",
    },

    paymentStatus: {
      type: String,
      enum: ["PENDING", "PAID", "FAILED"],
      default: "PENDING",
    },

    paidAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const PaymentHistory = mongoose.model(
  "PaymentHistory",
  paymentHistorySchema
);

export default PaymentHistory;