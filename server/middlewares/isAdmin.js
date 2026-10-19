export const isAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: "Authentication required",
    });
  }

  const role = String(req.user.role || "")
    .trim()
    .toLowerCase();

  if (!["admin", "administrator"].includes(role)) {
    console.error("Admin authorization failed:", {
      userId: req.user._id,
      role: req.user.role,
    });

    return res.status(403).json({
      success: false,
      message: "Admin access required",
    });
  }

  next();
};