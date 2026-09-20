import express from 'express';
import { registerUser, loginUser, logout,sendResetOTP,verifyOTP,resetPassword} from '../controllers/authController.js';
import { loginadmin } from '../controllers/adminController.js';
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/logout', logout);
router.post("/forgot-password",sendResetOTP);
router.post("/verify-otp",verifyOTP);
router.post("/reset-password",resetPassword);

// ADMIN
router.post('/adminlogin', loginadmin);
export default router;

