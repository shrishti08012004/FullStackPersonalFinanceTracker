const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./User");

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

User.hasMany(Transaction);
Transaction.belongsTo(User);

module.exports = Transaction;
