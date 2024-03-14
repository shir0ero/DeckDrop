const Product = require('../models/product');


exports.getProducts = (req, res, next) => {
    // res.send("<h1>I love pokemons</h1>"
    const products = Product.fetchAll(products => {
        res.render(
            //here we assign the rendering template
            'shop/product-list', {
            prods: products,
            pageTitle: 'All products',
            path: '/products',
            'hasProducts': products.length > 0,
            activeShop: true,
            productCSS: true,
        });
    });
};

exports.getIndex = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('shop/index', {
            prods: products,
            pageTitle: 'Shop',
            path: '/',
            'hasProducts': products.length > 0,
            activeShop: true,
            productCSS: true,
        });
    });
}

exports.getCart = (req, res, next) => {
    res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart'
    });
};

exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', {
        path: '/checkout',
        pageTitle: 'Checkout'
    });
};