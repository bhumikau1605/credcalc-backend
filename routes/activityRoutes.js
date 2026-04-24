// routes/activityRoutes.js
import express from "express";
import Activity from "../models/Activity.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const activities = await Activity.find({}).sort({ createdAt: 1 });
    res.json(activities);
  } catch (err) {
    console.error("GET /api/activities error:", err);
    res.status(500).json({ message: "Failed to fetch activities" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { userId, name, points, date } = req.body; // ✅ bring back userId

    if (!userId || !name || !points || !date) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const activity = new Activity({ userId, name, points, date });
    const saved = await activity.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error("POST /api/activities error:", err);
    res.status(500).json({ message: "Failed to create activity" });
  }
});

export default router;
