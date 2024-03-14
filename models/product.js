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
    constructor(title, imageUrl, description, price) {
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }

    
    save() {
        // products.push(this);
        //we have to save thsi to a file rather than an array
        getProductsFromFile(products => {
            products.push(this);
            fs.writeFile(p, JSON.stringify(products), err => {
                console.log(err);
            });
        });
        fs.readFile(p, (err, fileContent) => {

            //stringify converts javascript object or array and convert it into JSON string
        });
    }
    //static ensures we can only call this function only called ,not everytime Product is called

    static fetchAll(cb) {
        getProductsFromFile(cb);
    }

}