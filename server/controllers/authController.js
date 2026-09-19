import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import genToken from '../utils/token.js';
import transporter from "../config/nodemailer.js";

// REGISTER LOGIC
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      
      return res.status(400).json({success: false, message: 'Passwords do not match.' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword
    });

    await user.save();

    const token = await genToken(user._id); 

    res.cookie('token', token, {
      secure: process.env.NODE_ENV === 'production', 
      sameSite: 'strict', 
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    }); 

    
    res.status(201).json({ user, success: true, message: 'User registered successfully!' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error during registration.', error: error.message });
  }
};

// LOGIN LOGIC
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid email or password.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Invalid email or password.' });
    }

    const token = genToken(user._id);
    res.cookie('token', token, {
      secure: process.env.NODE_ENV === "production",
      sameSite: 'strict', 
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
     });

    res.status(200).json({
      
      success: true,
      message: 'Logged in successfully',
      token,
      user: { id: user._id, name: user.name, email: user.email }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error during login.', error: error.message });
  }
};

// LOGOUT LOGIC
export const logout = async(req, res) => {
  try {
    await res.clearCookie('token');
    res.status(200).json({ success: true, message: 'Logged out successfully.' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error during logout.', error: error.message });
  }
};

//send OTP
export const sendResetOTP = async(req,res)=>{

    try{

        const {email} = req.body;

        const user = await User.findOne({email});

        if(!user){
            return res.status(404).json({
                success:false,
                message:"User not found"
            });
        }

        const otp = Math.floor(
            100000 + Math.random()*900000
        ).toString();

        user.resetOTP = otp;
        user.otpExpire = Date.now() + 10*60*1000;

        await user.save();

        await transporter.sendMail({
            from:process.env.EMAIL_USER,
            to:email,
            subject:"Tea Shop Password Reset OTP",
            html:`
                <h2>Password Reset OTP</h2>
                <h1>${otp}</h1>
                <p>This OTP is valid for 10 minutes.</p>
            `
        });

        res.status(200).json({
            success:true,
            message:"OTP sent successfully"
        });

    }catch(error){

        res.status(500).json({
            success:false,
            message:error.message
        });
    }
};
// verify OTP
export const verifyOTP = async(req,res)=>{

    try{

        const {email,otp} = req.body;

        const user = await User.findOne({email});

        if(!user){

            return res.status(404).json({
                success:false,
                message:"User not found"
            });
        }

        if(user.resetOTP !== otp){

            return res.status(400).json({
                success:false,
                message:"Invalid OTP"
            });
        }

        if(user.otpExpire < Date.now()){

            return res.status(400).json({
                success:false,
                message:"OTP Expired"
            });
        }

        return res.status(200).json({
            success:true,
            message:"OTP Verified"
        });

    }catch(error){

        res.status(500).json({
            success:false,
            message:error.message
        });
    }
};
// reset password
export const resetPassword = async(req,res)=>{

    try{

        const {
            email,
            password,
            confirmPassword
        } = req.body;

        if(password !== confirmPassword){

            return res.status(400).json({
                success:false,
                message:"Passwords do not match"
            });
        }

        const user = await User.findOne({email});

        if(!user){

            return res.status(404).json({
                success:false,
                message:"User not found"
            });
        }

        const hashedPassword =
            await bcrypt.hash(password,10);

        user.password = hashedPassword;

        user.resetOTP = null;
        user.otpExpire = null;

        await user.save();

        res.status(200).json({
            success:true,
            message:"Password updated successfully"
        });

    }catch(error){

        res.status(500).json({
            success:false,
            message:error.message
        });
    }
};


