import express from 'express';
import { registerUser, loginUser, logout,sendResetOTP,verifyOTP,resetPassword, sendSubscriptionEmail, getAllSubscribers} from '../controllers/authController.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/logout', logout);
router.post("/forgot-password",sendResetOTP);
router.post("/verify-otp",verifyOTP);
router.post("/reset-password",resetPassword);
router.post("/subscribed", sendSubscriptionEmail);
router.get("/subscribers", getAllSubscribers);



export default router;

