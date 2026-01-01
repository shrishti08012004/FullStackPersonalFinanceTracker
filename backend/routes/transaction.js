const express = require("express");
const router = express.Router();
const { Transaction } = require("../models");
const jwt = require("jsonwebtoken");

router.post("/", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Token missing" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const transaction = await Transaction.create({
      amount: req.body.amount,
      type: req.body.type,
      category: req.body.category,
      description: req.body.description,
      UserId: decoded.userId
    });

    res.json({ message: "Transaction added", transaction });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to add transaction",
      error: error.message
    });
  }
});

module.exports = router;
