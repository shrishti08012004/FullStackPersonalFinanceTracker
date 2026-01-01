require("dotenv").config();
const app = require("./app");
const { sequelize } = require("./models");

// Verify DB connection and sync models
async function start() {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected");
    await sequelize.sync();
    console.log("✅ Database synced");

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("❌ DB Error:", err);
    process.exit(1);
  }
}

start();
