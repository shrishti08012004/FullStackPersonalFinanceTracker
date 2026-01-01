const express = require("express");
const Transaction = require("../models/Transaction");
const jwt = require("jsonwebtoken");

const router = express.Router();

/* AUTH MIDDLEWARE */
const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token" });

  const decoded = jwt.verify(token, "secret123");
  req.userId = decoded.id;
  next();
};

/* ADD TRANSACTION */
router.post("/", auth, async (req, res) => {
  try {
    const { amount, type, category, description } = req.body;

    const txn = await Transaction.create({
      amount,
      type,
      category,
      description,
      UserId: req.userId
    });

    res.json({ message: "Transaction added", txn });
  } catch (err) {
    res.status(500).json({ message: "Failed to add transaction", error: err.message });
  }
});

module.exports = router;
