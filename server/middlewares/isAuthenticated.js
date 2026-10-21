
import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";
import User from "../models/User.js";

export const isAuthenticated = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    const token =
      req.cookies?.token ||
      (authHeader?.startsWith("Bearer ")
        ? authHeader.slice(7).trim()
        : null);

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Authentication token missing.",
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    const userId =
      decoded.id || decoded._id || decoded.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User ID missing from token.",
      });
    }

    const tokenRole = String(decoded.role || "")
      .trim()
      .toLowerCase();

    // Admin accounts are stored in the separate Admin collection.
    if (
      tokenRole === "admin" ||
      tokenRole === "administrator"
    ) {
      const admin = await Admin.findById(userId).select(
        "-password"
      );

      if (!admin) {
        return res.status(401).json({
          success: false,
          message: "Admin account not found.",
        });
      }

      req.user = {
        _id: admin._id,
        email: admin.email,
        role: "admin",
      };

      return next();
    }

    // Regular customer accounts are stored in User.
    const user = await User.findById(userId).select(
      "-password"
    );

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User account not found.",
      });
    }

    req.user = {
      _id: user._id,
      email: user.email,
      role: user.role || "customer",
    };

    return next();
  } catch (error) {
    console.error("Authentication error:", error.message);

    return res.status(401).json({
      success: false,
      message: "Invalid or expired authentication token.",
    });
  }
};
