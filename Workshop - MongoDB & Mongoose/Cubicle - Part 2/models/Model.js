const fs = require('fs').promises;
const path = require('path');
const products = require('../config/products.json');

class Model {
    save() {
        products.push(this);

        return fs.writeFile(
            path.join(__dirname, '../config/products.json'),
            JSON.stringify(products)
        )
    }

    static getAll() {
        return products;
    }

    static getOne(id) {
        return products.find(product => product.id === id);
    }
}

module.exports = Model;