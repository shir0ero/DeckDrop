const path = require('path');

const express = require('express');

const productsController = require('../controllers/products');


const router = express.Router();

router.get('/', productsController.getProducts);
//well __dirname will point to the routes folder(where are we using it)
//but views is a sibling folder
//therefore add '../'
module.exports = router;