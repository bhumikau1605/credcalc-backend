// routes/userRoutes.js
import express from "express";
import User from "../models/User.js";

const router = express.Router();

router.post("/save", async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.json(user);
  } catch (err) {
    console.error("SAVE USER ERROR:", err);
    res.status(400).json({ error: err.message });
  }
});

router.get("/:email", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });
    res.json(user);
  } catch (err) {
    console.error("GET USER ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
