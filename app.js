//path is a inbuilt NodeJS module
//This module provides utilities for working with file and directory paths
const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
// const expressHbs = require('express-handlebars');

const errorController = require('./controllers/error.js');
const sequelize = require('./util/database');
const Product = require('./models/product');
const User = require('./models/user');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');
const app = express();
// //handlebars templating engine 
// app.engine('hbs', expressHbs({
//     layoutsDir: 'views/layouts/',
//     defaultLayout: 'main-layout',
//     extname: 'hbs'
// }));
//set a global configuration value
app.set('view engine', 'ejs');
//this tells where to find these templates
app.set('views', 'views');

const adminRoutes = require('./routes/admin.js');
const shopRoutes = require('./routes/shop.js');

app.use(bodyParser.urlencoded({ extended: false }));
//this is used to make the public folder accessable
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    User.findByPk(1)
        .then(user => {
            req.user = user;
            next();
        })
        .catch(err => console.log(err));
})

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
//Cool part
User.hasMany(Product);
User.hasOne(Cart);
//cart belongs to a user
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });

//Calling sequilize
//.sync({force : true}) ,here force is used to overwrite the table
sequelize
    .sync({ force: true })
    .then(result => {
        return User.findByPk(1);
        // console.log(result);

    })
    .then(user => {
        if (!user) {
            //if you dont have user create one
            return User.create({ name: 'RITURAJ', email: 'rituraj@test.com' });
        }
        return user;
    })
    .then(user => {
        // console.log(user)
        return user.createCart();
    })
    .then(cart => {
        app.listen(3000);
    })
    .catch(err => {
        console.log(err);
    });



