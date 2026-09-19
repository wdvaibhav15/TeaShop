import bcrypt from "bcryptjs";
import User from "../models/User.js";
import genToken from "../utils/token.js";
import nodemailer from "nodemailer";

// REGISTER LOGIC
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ success: false, message: "Passwords do not match." });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();
    console.log(user);

    const token = await genToken(user._id);

    res.cookie("token", token, {
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    res.status(201).json({ user, success: true, message: "User registered successfully!" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error during registration.",
      error: error.message,
    });
  }
};

// LOGIN LOGIC
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email or password." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email or password." });
    }

    const token = genToken(user._id);
    res.cookie("token", token, {
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    res.status(200).json({
      success: true,
      message: "Logged in successfully",
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error during login.",
      error: error.message,
    });
  }
};

// LOGOUT LOGIC
export const logout = async (req, res) => {
  try {
    await res.clearCookie("token");
    res
      .status(200)
      .json({ success: true, message: "Logged out successfully." });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error during logout.",
      error: error.message,
    });
  }
};

//send OTP
export const sendResetOTP = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.resetOTP = Math.floor( 100000 + Math.random() * 900000).toString();

    user.otpExpire = new Date( Date.now() + 5 * 60 * 1000);

    await user.save();

    console.log("Saved OTP:", user.resetOTP);
  
    // transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SENDER_EMAIL,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Mail options
    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: "Password Reset OTP",
      html: `
    <div style="font-family: Arial, sans-serif; background-color:#f4f4f4; padding:20px;">
      <div style="max-width:600px; margin:auto; background:white; border-radius:10px; overflow:hidden; box-shadow:0 2px 10px rgba(0,0,0,0.1);">
        
        <div style="background:#0f766e; color:white; padding:20px; text-align:center;">
          <h1>🍵 Camellia Leaf Tea Co.</h1>
          <p>Password Reset Request</p>
        </div>

        <div style="padding:30px;">
          <h2>Hello,</h2>

          <p>
            We received a request to reset your account password.
            Use the OTP below to continue:
          </p>

          <div style="text-align:center; margin:30px 0;">
            <span style="
              display:inline-block;
              background:#f0fdf4;
              color:#166534;
              font-size:32px;
              font-weight:bold;
              letter-spacing:8px;
              padding:15px 30px;
              border-radius:8px;
              border:2px dashed #22c55e;
            ">
              ${user.resetOTP}
            </span>
          </div>

          <p>
            ⏳ This OTP is valid for <strong>5 minutes</strong>.
          </p>

          <p>
            If you did not request a password reset, please ignore this email.
          </p>

          <br>

          <p>
            Regards,<br>
            <strong>Camellia Leaf Tea Co.</strong>
          </p>
        </div>

        <div style="
          background:#f8fafc;
          text-align:center;
          padding:15px;
          color:#64748b;
          font-size:12px;
        ">
          © ${new Date().getFullYear()} Camellia Leaf Tea Co.
          <br>
          This is an automated email. Please do not reply.
        </div>

      </div>
    </div>
  `,
    };

    // Send email
    const mailResponse = await transporter.sendMail(mailOptions);

    return res.status(200).json({
      success: true,
      message: "OTP Sent Successfully",
    });
  } catch (error) {
    console.error("Forgot Password Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// verify OTP
export const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    console.log("Stored OTP:", user.resetOTP);
    console.log("Entered OTP:", otp);

    if (String(user.resetOTP) !== String(otp)) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    if (user.otpExpire < new Date()) {
      return res.status(400).json({
        success: false,
        message: "OTP Expired, Please generate a new OTP.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "OTP Verified",
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// reset password
export const resetPassword = async (req, res) => {
  try {
    const { email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user.password = hashedPassword;

    user.resetOTP = null;
    user.otpExpire = null;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
