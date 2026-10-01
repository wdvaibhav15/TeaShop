import jwt from "jsonwebtoken";

export const isAuthenticated = async (req, res, next) => {
  try {
    console.log("Cookies:", req.cookies);

    const token = req.cookies.token;

    console.log("Token:", token);

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    req.user = decoded;

    next();
  } catch (error) {
    console.log(error);

    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }
};