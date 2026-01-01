const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: "Token missing" });
    }

    const token = authHeader.split(" ")[1]; // Bearer TOKEN

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded; // <-- THIS IS IMPORTANT

    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
