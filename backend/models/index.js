const sequelize = require("../config/db");
const User = require("./User");
const Transaction = require("./Transaction");

User.hasMany(Transaction);
Transaction.belongsTo(User);

module.exports = {
  sequelize,
  User,
  Transaction
};
