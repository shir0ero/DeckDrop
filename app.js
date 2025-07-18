// Core Node.js Modules
const path = require('path');

// 3rd-Party Packages
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
require('dotenv').config(); // Loads environment variables from a .env file

// Local/Custom Imports
const errorController = require('./controllers/error.js');
const sequelize = require('./util/database');

// Sequelize Models
const Product = require('./models/product');
const User = require('./models/user');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');
const Order = require('./models/order');
const OrderItem = require('./models/order-item');

// Route Imports
const adminRoutes = require('./routes/admin.js');
const shopRoutes = require('./routes/shop.js');
const authRoutes = require('./routes/auth.js');

// Initialize Express App
const app = express();

// Initialize Sequelize Session Store
const sessionStore = new SequelizeStore({
    db: sequelize,
});

// Set up EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', 'views');

// --- Middleware Pipeline ---

// 1. Body Parser for parsing form data
app.use(bodyParser.urlencoded({ extended: false }));

// 2. Serve static files (e.g., CSS) from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// 3. Session configuration
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'fallback-secret',
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
  })
);

// 4. Custom middleware to attach the user object to the request
app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findByPk(req.session.user.id)
    .then(user => {
      if (user) {
        req.user = user;
      }
      next();
    })
    .catch(err => {
      console.log(err);
      next(new Error(err));
    });
});

// --- Route Handlers ---
app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

// --- Error Handling ---
app.use(errorController.get404);

// --- Sequelize Model Associations ---
Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });
Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product, { through: OrderItem });

// --- Database Sync and Server Start ---
sequelize
    .sync()
    .then(result => {
        app.listen(3000, () => {
            console.log('Server is running on port 3000');
        });
    })
    .catch(err => {
        console.log('Error during database sync:', err);
    });
