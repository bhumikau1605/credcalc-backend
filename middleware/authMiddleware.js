import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log("AUTH HEADER:", authHeader);   // log 1

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("DECODED TOKEN:", decoded);  // log 2
    req.user = { id: decoded.id };
    next();
  } catch (err) {
    console.error("JWT error:", err);        // log 3
    return res.status(401).json({ error: "Invalid token" });
  }
};

export default authMiddleware;
