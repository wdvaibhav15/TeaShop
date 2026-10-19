import express from "express";

import {
  getAllOrders,
  getUserOrdersOnly,
} from "../controllers/adminController.js";

import { isAuthenticated } from "../middlewares/isAuthenticated.js";
import { isAdmin } from "../middlewares/isAdmin.js";

const router = express.Router();

// Admin: fetch all customer orders
router.get(
  "/orders",
  isAuthenticated,
  isAdmin,
  getAllOrders
);

// Customer: fetch only their own orders
router.get(
  "/user-orders",
  isAuthenticated,
  getUserOrdersOnly
);

export default router;