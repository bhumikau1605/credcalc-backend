// backend/routes/certificates.js
import express from "express";
import Certificate from "../models/Certificate.js";

const router = express.Router();

// GET certificates by user
router.get("/:userId", async (req, res) => {
  try {
    const certs = await Certificate.find({ userId: req.params.userId });
    res.json(certs);
  } catch (err) {
    console.error("GET CERTIFICATES ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

// CREATE certificate using Cloudinary URL
router.post("/upload", async (req, res) => {
  try {
    console.log("REQ BODY /certificates/upload:", req.body);

    const { userId, title, category, fileData } = req.body;

    if (!userId || !title || !fileData) {
      return res
        .status(400)
        .json({ error: "Missing userId, title or fileData (url)" });
    }

    const cert = new Certificate({
      userId,
      title,
      category,
      fileUrl: fileData,
    });

    await cert.save();
    res.status(201).json(cert);
  } catch (err) {
    console.error("UPLOAD ERROR (backend):", err);
    res.status(400).json({ error: err.message });
  }
});

// DELETE certificate
router.delete("/:id", async (req, res) => {
  try {
    const result = await Certificate.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({ message: "Certificate not found" });
    }
    res.json({ message: "Certificate deleted successfully" });
  } catch (err) {
    console.error("DELETE CERTIFICATE ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
