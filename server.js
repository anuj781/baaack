import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import messageRoutes from "./routes/messageRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

dotenv.config();

const app = express();

/* ================= CORS ================= */
app.use(
  cors({
    origin: "https://froontend-v1dp.vercel.app/", // 🔒 replace with frontend URL in production
    methods: ["GET", "POST", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);

/* ================= BODY PARSER ================= */
app.use(express.json());

/* ================= DEBUG (DEV ONLY) ================= */
if (process.env.NODE_ENV !== "production") {
  app.use((req, res, next) => {
    console.log("➡️ METHOD:", req.method);
    console.log("➡️ URL:", req.originalUrl);
    console.log("➡️ BODY:", req.body);
    next();
  });
}

/* ================= ROUTES ================= */
app.use("/api/messages", messageRoutes);
app.use("/api/admin", adminRoutes);

/* ================= HEALTH CHECK ================= */
app.get("/", (req, res) => {
  res.send("🚀 Server is running");
});

/* ================= DATABASE ================= */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ Mongo Error:", err));

/* ================= SERVER ================= */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on port ${PORT}`)
);
