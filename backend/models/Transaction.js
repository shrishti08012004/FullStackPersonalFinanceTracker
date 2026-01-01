const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Transaction = sequelize.define("Transaction", {
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING
  }
});

module.exports = Transaction;
