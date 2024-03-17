const path = require('path');

const express = require('express');

const router = express.Router();
//this router is like mini-express app 
const adminController = require('../controllers/admin');
//.. <- this is used to go up by one level in the directory


// /admin/add-product =>GET
router.get('/add-product', adminController.getAddProduct);
// /admin/product => GET
router.get('/products', adminController.getProducts);
// /admin/add-product => POST
router.post('/add-product', adminController.postAddProduct);
//this is to export my products 
router.get('/edit-product/:productId', adminController.getEditProduct);
//since we have changed the routes we have to go the app.js to modify the code
module.exports = router;



