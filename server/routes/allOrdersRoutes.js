
import express from "express";

import {
  getAllOrders,
  getUserOrdersOnly,
} from "../controllers/adminController.js";

import { isAuthenticated } from "../middlewares/isAuthenticated.js";
import { isAdmin } from "../middlewares/isAdmin.js";

const router = express.Router();

// Admin: fetch every customer's orders
router.get(
  "/orders",
  isAuthenticated,
  isAdmin,
  getAllOrders
);

// Customer: fetch only the logged-in customer's orders
router.get(
  "/user-orders",
  isAuthenticated,
  getUserOrdersOnly
);

export default router;
