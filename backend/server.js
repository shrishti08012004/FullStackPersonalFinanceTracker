require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { Sequelize } = require("sequelize");

const app = express();
app.use(cors());
app.use(express.json());

// ------------------ DATABASE ------------------
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: 5432,
    dialect: "postgres",
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  }
);

// Test DB
sequelize.authenticate()
  .then(() => console.log(" Database Connected"))
  .catch(err => console.error(" DB Error:", err));

// ------------------ ROUTE ------------------
app.get("/", (req, res) => {
  res.json({ message: "Finance Tracker Backend Running " });
});

// ------------------ SERVER ------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
