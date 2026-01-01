const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const transactionRoutes = require("./routes/transaction");
const analyticsRoutes = require("./routes/analytics");

const app = express();

// Configure CORS: allow `FRONTEND_URL` if set, otherwise allow all origins
const FRONTEND_URL = process.env.FRONTEND_URL || process.env.REACT_APP_API_URL || null;
if (FRONTEND_URL) {
	app.use(cors({ origin: FRONTEND_URL }));
} else {
	app.use(cors());
}
app.use(express.json());

// Root health endpoint
app.get("/", (req, res) => {
	res.json({ message: "Finance Tracker Backend Running 🚀" });
});

// ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/analytics", analyticsRoutes);

module.exports = app;
