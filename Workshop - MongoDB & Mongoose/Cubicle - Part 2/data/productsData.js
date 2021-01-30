const fs = require('fs').promises;
const path = require('path');
const products = require('../config/products.json');

module.exports = {
    getOne(id) {
        return products.find(product => product.id === id);
    },

    getAll() {
        return products.slice();
    },

    // create(cube) {
    //     products.push(cube);

    //     return fs.writeFile(path.join(__dirname, '../config/products.json'), JSON.stringify(products))
    // }
}