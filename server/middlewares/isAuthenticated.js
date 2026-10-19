// import jwt from "jsonwebtoken";

// export const isAuthenticated = async (req, res, next) => {
//   try {
//     console.log("Cookies:", req.cookies);

//     const token = req.cookies.token;

//     console.log("Token:", token);

//     if (!token) {
//       return res.status(401).json({
//         success: false,
//         message: "Unauthorized",
//       });
//     }

//     const decoded = jwt.verify(
//       token,
//       process.env.JWT_SECRET
//     );

//     req.user = decoded;

//     next();
//   } catch (error) {
//     console.log(error);

//     return res.status(401).json({
//       success: false,
//       message: "Unauthorized",
//     });
//   }
// };

import jwt from "jsonwebtoken";

export const isAuthenticated = async (req, res, next) => {
  try {
    // Support both cookie and Authorization header
    const authHeader = req.headers.authorization;

    const token =
      req.cookies?.token ||
      (authHeader?.startsWith("Bearer ")
        ? authHeader.split(" ")[1]
        : null);

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: Token missing",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach decoded JWT payload to the request
    req.user = decoded;

    if (!req.user._id && !req.user.id && !req.user.userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: Invalid token payload",
      });
    }

    next();
  } catch (error) {
    console.error("Authentication error:", error.message);

    return res.status(401).json({
      success: false,
      message: "Unauthorized: Invalid or expired token",
    });
  }
};
