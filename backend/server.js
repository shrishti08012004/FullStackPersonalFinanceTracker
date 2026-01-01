const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { sequelize } = require("./models");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/auth"));
app.use("/api/transactions", require("./routes/transaction"));

sequelize.sync({ alter: true }).then(() => {
  console.log("Database synced");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
