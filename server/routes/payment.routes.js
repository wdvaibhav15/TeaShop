import express from "express";

import {
  createOrder,
  verifyPayment,
  getPaymentHistory,
  getMyOrders,
} from "../controllers/payment.controller.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.post(
  "/create-order",
  createOrder
);

router.post(
  "/verify-payment",
  verifyPayment
);

router.get(
  "/payment-history",
  getPaymentHistory
);





router.get(
  "/my-orders",
  isAuthenticated,
  getMyOrders
);

export default router;