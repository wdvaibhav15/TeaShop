import express from 'express';
import { adminLogin, adminLogout, adminRegister, adminSendResetOTP, adminVerifyOTP, adminVesetPassword, cafeSettings, deleteFeedback, getAllFeedbacks, getCafeSettings, userFeedback } from '../controllers/adminController.js';


const router = express.Router();

router.post('/register', adminRegister);
router.post('/login', adminLogin);
router.get('/logout', adminLogout);
router.post("/forgot-password",adminSendResetOTP);
router.post("/verify-otp",adminVerifyOTP);
router.post("/reset-password",adminVesetPassword);

router.post("/userfeedback", userFeedback);
router.get("/userfeedback", getAllFeedbacks);
router.delete("/userfeedback/:id", deleteFeedback);



router.post("/cafe-settings", cafeSettings);
router.get("/cafe-settings", getCafeSettings);





export default router;

