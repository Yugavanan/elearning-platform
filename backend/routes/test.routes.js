// backend/routes/test.routes.js
import express from "express";

const router = express.Router();

router.get("/test", (req, res) => {
  res.json({ message: "Backend API working fine ✅" });
});

export default router;
