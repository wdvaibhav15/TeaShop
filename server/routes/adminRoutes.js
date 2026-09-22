import express from 'express';
import { adminLogin, adminLogout, adminRegister, adminSendResetOTP, adminVerifyOTP, adminVesetPassword } from '../controllers/adminController.js';


const router = express.Router();

router.post('/register', adminRegister);
router.post('/login', adminLogin);
router.get('/logout', adminLogout);
router.post("/forgot-password",adminSendResetOTP);
router.post("/verify-otp",adminVerifyOTP);
router.post("/reset-password",adminVesetPassword);




export default router;

