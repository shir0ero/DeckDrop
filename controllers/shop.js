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
//responsible for getting a singl product by id
exports.getProduct = (req, res, next) => {
    //params extract the data which was accessed by the colon given in the route
    const prodId = req.params.productId;
    Product.findById(prodId, product => {
        console.log(product);
    })
    res.redirect('/');
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

exports.getOrders = (req, res, next) => {
    res.render('shop/orders', {
        path: '/orders',
        pageTitle: 'Your Orders'
    });
};

exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', {
        path: '/checkout',
        pageTitle: 'Checkout'
    });
};