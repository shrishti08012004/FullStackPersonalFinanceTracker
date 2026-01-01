const express = require("express");
const router = express.Router();
const { Transaction } = require("../models");
const auth = require("../middleware/auth");

// GET ANALYTICS DATA
router.get("/", auth, async (req, res) => {
  try {
    const transactions = await Transaction.findAll({
      where: { UserId: req.user.id }
    });

    let income = 0;
    let expense = 0;

    transactions.forEach((t) => {
      if (t.type === "income") {
        income += Number(t.amount);
      } else if (t.type === "expense") {
        expense += Number(t.amount);
      }
    });

    res.json({
      income,
      expense,
      balance: income - expense
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch analytics",
      error: error.message
    });
  }
});

module.exports = router;
