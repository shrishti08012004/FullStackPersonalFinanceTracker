const express = require("express");
const cors = require("cors");
const sequelize = require("./config/db");

const authRoutes = require("./routes/auth");
const transactionRoutes = require("./routes/transaction");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/transactions", transactionRoutes);

sequelize.sync().then(() => {
  console.log("Database synced");
  app.listen(5000, () => console.log("Server running on port 5000"));
});
