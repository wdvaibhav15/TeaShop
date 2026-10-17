
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env locally. Configure environment variables in Vercel separately.
dotenv.config({ path: path.join(__dirname, ".env") });

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoute.js";
import adminRoutes from "./routes/adminRoutes.js";
import addCups from "./routes/addCups.js";
import paymentRoutes from "./routes/payment.routes.js";
import allOrdersRoutes from "./routes/allOrdersRoutes.js";
import notificationRoutes from "./routes/notification.routes.js";

const app = express();

app.use(
  cors({
    origin: [
      process.env.CLIENT_URL,
      process.env.ADMIN_URL,
    ].filter(Boolean),
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Health check
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Hello Camellia! Server is running.",
  });
});

// Database connection
connectDB();

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/coffee", addCups);
app.use("/api/payment", paymentRoutes);
app.use("/api/orders", allOrdersRoutes);
app.use("/api/notifications", notificationRoutes);

// Unknown route
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error("API error:", err);

  if (res.headersSent) {
    return next(err);
  }

  res.status(err.status || 500).json({
    success: false,
    message:
      process.env.NODE_ENV === "production"
        ? "Internal server error"
        : err.message,
  });
});

// Vercel uses the exported app.
// Local development starts its own HTTP server.
if (!process.env.VERCEL) {
  const PORT = process.env.PORT || 3000;

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

export default app;
