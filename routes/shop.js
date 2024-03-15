const path = require('path');

const express = require('express');

const shopController = require('../controllers/shop');


const router = express.Router();

router.get('/', shopController.getIndex);
//well __dirname will point to the routes folder(where are we using it)
//but views is a sibling folder
//therefore add '../'

//Add all the shop routes here and all the admin routes in admin.js router
router.get('/products', shopController.getProducts);
//keep the dynamic routes below the static routes 

router.get('/products/:productId', shopController.getProduct);

router.get('/cart', shopController.getCart);

router.get('/orders', shopController.getOrders);

router.get('/checkout', shopController.getCheckout);

module.exports = router;