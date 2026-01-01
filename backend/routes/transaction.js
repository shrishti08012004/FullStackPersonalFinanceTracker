const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const controller = require("../controllers/transaction.controller");

router.post("/", auth, controller.addTransaction);
router.get("/", auth, controller.getTransactions);
router.delete("/:id", auth, controller.deleteTransaction);

module.exports = router;
