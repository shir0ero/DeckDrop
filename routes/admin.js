const path = require('path');

const express = require('express');

const router = express.Router();
//this router is like mini-express app 
const productsController = require('../controllers/products');
//.. <- this is used to go up by one level in the directory



// /admin/add-product =>GET
router.get('/add-product', productsController.getAddProduct);

// /admin/add-product => POST
router.post('/add-product', productsController.postAddProduct);
//this is to export my products 
//since we have changed the routes we have to go the app.js to modify the code
module.exports = router;



