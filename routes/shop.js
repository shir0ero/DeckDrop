const path = require('path');

const express = require('express');

const rootDir = require('../util/path');
const router = express.Router();

router.get('/', (req, res, next) => {
    // res.send("<h1>I love pokemons</h1>")
    res.sendFile(path.join(rootDir, 'views', 'shop.html'));
});
//well __dirname will point to the routes folder(where are we using it)
//but views is a sibling folder
//therefore add '../'
module.exports = router;