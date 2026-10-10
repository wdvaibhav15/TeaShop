import express from 'express';
import { getAllOrders, getUserOrdersOnly } from '../controllers/adminController.js';
import { isAuthenticated } from '../middlewares/isAuthenticated.js';
const router = express.Router();

// admin
router.get('/orders', isAuthenticated, getAllOrders);

// Customer
router.get("/user-orders",isAuthenticated, getUserOrdersOnly);



export default router;

