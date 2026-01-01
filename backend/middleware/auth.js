const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const jwtSecret = process.env.JWT_SECRET || "secret123";
    const decoded = jwt.verify(token, jwtSecret);
    req.user = decoded; // contains id

    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};
