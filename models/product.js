//bringing file system
const fs = require('fs');
const path = require('path');
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
    constructor(title, imageUrl, price, description) {
        this.title = title;
        this.imageUrl = imageUrl;
        this.price = price;
        this.description = description;

    }


    save() {
        //assigning id for my attributes
        this.id = Math.random().toString();
        // products.push(this);
        //we have to save thsi to a file rather than an array
        getProductsFromFile(products => {
            products.push(this);
            fs.writeFile(p, JSON.stringify(products), err => {
                console.log(err);
            });
        });
    }
    //static ensures we can only call this function only called ,not everytime Product is called

    static fetchAll(cb) {
        getProductsFromFile(cb);
    }
    //

    static findById(id, cb) {
        getProductsFromFile(products => {
            //products.find() will pass a functionto find on every element in the array and return the found element
            //cb is a callback to return the prodcut found
            const product = products.find(p => p.id === id);
            cb(product);
        });
    }
}