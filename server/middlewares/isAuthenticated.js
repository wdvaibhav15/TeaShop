
import jwt from "jsonwebtoken";

export const isAuthenticated = (req, res, next) => {
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
        message: "Authentication token missing",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const userId = decoded._id || decoded.id || decoded.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User ID missing from token",
      });
    }

    req.user = {
      ...decoded,
      _id: userId,
    };

    next();
  } catch (error) {
    console.error("Authentication error:", error.message);

    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};
