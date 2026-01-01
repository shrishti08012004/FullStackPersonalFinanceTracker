require("dotenv").config();
const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");

const sequelize = require("./config/db");

// Routes
const authRoutes = require("./routes/auth");
const transactionRoutes = require("./routes/transaction");
const analyticsRoutes = require("./routes/analytics");

const app = express();

/* ======================
   MIDDLEWARES
====================== */
app.use(cors());
app.use(express.json());

/* ======================
   RATE LIMITING
====================== */
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
});

const apiLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 100,
});

app.use("/api/auth", authLimiter);
app.use("/api", apiLimiter);

/* ======================
   ROUTES
====================== */
app.use("/api/auth", authRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/analytics", analyticsRoutes);

/* ======================
   HEALTH CHECK
====================== */
app.get("/", (req, res) => {
  res.send("Finance Tracker Backend Running ✅");
});

/* ======================
   ERROR HANDLER
====================== */
app.use((err, req, res, next) => {
  console.error("ERROR:", err);
  res.status(500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

/* ======================
   SERVER START
====================== */
const PORT = process.env.PORT || 5000;

sequelize
  .sync()
  .then(() => {
    console.log("✅ Database connected & synced");
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ DB Connection Failed:", err);
  });
