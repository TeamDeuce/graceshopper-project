//this is the access point for all things database related!

const db = require('./db');

const User = require('./models/User');
const Product = require('./models/Product');
const Cart = require('./models/Cart');
const CartItems = require('./models/CartItems');

//associations could go here!
User.hasMany(Cart);
Cart.belongsTo(User);

// o: I don't think you need this... however, based on my interpretation of your logic in your api routes
//  you may want to set CartItems as your join table
Cart.hasMany(CartItems);
CartItems.belongsTo(Product);

// o: you should also do Cart.belongsToMany(Product, { through: CartItems });
//  so you can use the magic methods in the opposite direction as well
//  Product.belongsToMany(Cart, { through: CartItems });
Product.belongsToMany(Cart, { through: 'joinProductToCart' });

// o: remove these if not being used
// CartItems.belongsTo(Cart);
// Cart.belongsTo(User, { foreignkey: "userid" });

module.exports = {
  db,
  models: {
    User,
    Product,
    Cart,
    CartItems,
  },
};
