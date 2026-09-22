import express from 'express';
import { registerUser, loginUser, logout,sendResetOTP,verifyOTP,resetPassword} from '../controllers/authController.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/logout', logout);
router.post("/forgot-password",sendResetOTP);
router.post("/verify-otp",verifyOTP);
router.post("/reset-password",resetPassword);


export default router;

