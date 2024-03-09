const path = require('path');

const express = require('express');

const rootDir = require('../util/path');

const router = express.Router();
//this router is like mini-express app 

//array to store parsed data
const products = [];

// /admin/add-product =>GET
router.get('/add-product', (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
});

// /admin/add-product => POST
router.post('/add-product', (req, res, next) => {
    products.push({ title: req.body.title });
    res.redirect('/');
});
//this is to export my products 
//since we have changed the routes we have to go the app.js to modify the code
exports.routes = router;
exports.products = products;



