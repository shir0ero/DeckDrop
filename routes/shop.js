const path = require('path');

const express = require('express');

const rootDir = require('../util/path');
//introducing admin route
const adminData = require('./admin');

const router = express.Router();

router.get('/', (req, res, next) => {
    // res.send("<h1>I love pokemons</h1>")
    const products = adminData.products;
    res.render('shop', {
        prods: products,
        pageTitle: 'shop',
        path: '/',
        'hasProducts': products.length > 0,
        activeShop: true,
        productCSS: true,
    });
});
//well __dirname will point to the routes folder(where are we using it)
//but views is a sibling folder
//therefore add '../'
module.exports = router;