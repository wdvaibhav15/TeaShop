
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

  if (role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Admin access required",
      receivedRole: role || null,
    });
  }

  next();
};
