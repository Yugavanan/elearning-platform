import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

// Route imports
import authRoutes from "./routes/auth.js";
import courseRoutes from "./routes/courses.js";
import enrollmentRoutes from "./routes/enrollments.js";
import adminRoutes from "./routes/admin.js";
import testRoutes from "./routes/test.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

/* ======================
   MIDDLEWARE
====================== */
app.use(
  cors({
    origin: "*", // allow frontend (Vercel)
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ======================
   ROOT ROUTE (IMPORTANT)
====================== */
app.get("/", (req, res) => {
  res.send("🚀 E-Learning Backend is running");
});

/* ======================
   ROUTES
====================== */
app.use("/api", testRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/enrollments", enrollmentRoutes);
app.use("/api/admin", adminRoutes);

/* ======================
   HEALTH CHECK
====================== */
app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "E-Learning Platform API is healthy ✅",
  });
});

/* ======================
   DATABASE + SERVER
====================== */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("❌ MongoDB connection error:", error.message);
    process.exit(1);
  });

export default app;
