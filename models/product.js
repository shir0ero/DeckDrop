//bringing file system
const fs = require('fs');
const path = require('path');

const cart = require('./cart');

const p = path.join(path.dirname(require.main.filename),
    'data',
    'products.json'
);
//introducing helper function
const getProductsFromFile = (cb) => {

    fs.readFile(p, (err, fileContent) => {
        if (err) {
            return cb([]);
            //return statement to avoid the excution of the next code after wwe excecuted the err code
        } else {
            cb(JSON.parse(fileContent));
        }
    });
};

const { stringify } = require('querystring');

module.exports = class Product {
    constructor(id, title, imageUrl, price, description) {
        this.id = id;
        this.title = title;
        this.imageUrl = imageUrl;
        this.price = price;
        this.description = description;

    }

    save() {
        getProductsFromFile(products => {
            if (this.id) {
                //this will find my existing product
                const existingProductIndex = products.findIndex(prod => prod.id === this.id);
                const updatedProducts = [...products];//this pull out all the elements and store it into this
                updatedProducts[existingProductIndex] = this;
                fs.writeFile(p, JSON.stringify(updatedProducts), err => {
                    console.log(err);
                });
            } else {
                //assigning id for my attributes
                this.id = Math.random().toString();
                // products.push(this);
                //we have to save thsi to a file rather than an array
                products.push(this);
                fs.writeFile(p, JSON.stringify(products), err => {
                    console.log(err);
                });
            }
        });
    }
    //static ensures we can only call this function only called ,not everytime Product is called

    static deleteById(id) {
        getProductsFromFile(products => {
            const product = products.find(prod => prod.id === id);
            const updatedProducts = products.filter(prod => prod.id !== id);
            fs.writeFile(p, JSON.stringify(updatedProducts), err => {
                if (!err) {
                    Cart.deleteProduct(id, product.price);
                }
            });
        });
    }

    static fetchAll(cb) {
        getProductsFromFile(cb);
    }
    //

    static findById(id, cb) {
        getProductsFromFile(products => {
            //products.find() will pass a functionto find on every element in the array and return the found element
            //cb is a callback to return the product found
            const product = products.find(p => p.id === id);
            cb(product);
        });
    }
}