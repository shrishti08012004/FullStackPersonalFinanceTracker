require("dotenv").config();
const express = require("express");
const cors = require("cors");
const sequelize = require("./config/db");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Finance Tracker Backend Running 🚀" });
});

sequelize.authenticate()
  .then(() => console.log("✅ Database connected"))
  .catch(err => console.error("❌ DB Error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
