const Sequelize = require("sequelize");
const db = require("../db");

// o: I am not sure what this is exactly?
const CartItems = db.define("cartitems", {
  quantity: {
    type: Sequelize.INTEGER,
  },
});

module.exports = CartItems;
