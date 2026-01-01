const { Transaction } = require("../models");

// ✅ Add Transaction
exports.addTransaction = async (req, res) => {
  try {
    const { amount, type, category, description } = req.body;

    if (!amount || !type || !category) {
      return res.status(400).json({
        message: "Amount, type and category are required"
      });
    }

    const transaction = await Transaction.create({
      amount,
      type,
      category,
      description,
      UserId: req.user.id // 🔥 VERY IMPORTANT
    });

    res.status(201).json({
      message: "Transaction added successfully",
      transaction
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to add transaction",
      error: error.message
    });
  }
};

// ✅ Get Transactions
exports.getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.findAll({
      where: { UserId: req.user.id },
      order: [["createdAt", "DESC"]]
    });

    res.json(transactions);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch transactions"
    });
  }
};

// ✅ Delete Transaction
exports.deleteTransaction = async (req, res) => {
  try {
    const id = req.params.id;

    await Transaction.destroy({
      where: { id, UserId: req.user.id }
    });

    res.json({ message: "Transaction deleted" });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete transaction"
    });
  }
};
