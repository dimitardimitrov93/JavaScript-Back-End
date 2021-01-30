// const fs = require('fs');
// const products = require('../config/products.json');
const productData = require('../data/productsData');
const Cube = require('../models/Cube');

function getAll(query) {
    let products = productData.getAll();
    
    if (query.search) {
        products = products.filter(product => product.name.toLowerCase().includes(query.search.toLowerCase()));

        if (query.from) {
            products = products.filter(product => Number(product.difficultyLevel) >= Number(query.from));
        }

        if (query.to) {
            products = products.filter(product => Number(product.difficultyLevel) <= Number(query.to));
        }
    }

    return products;
}

function getOne(id) {
    return Cube.getOne(id);
}

function create(data) {
    let cube = new Cube(data);
    
    // fs.writeFile(
    //     path.join(__dirname, '../config/products.json'),
    //     JSON.stringify(products),
    //     callback
    // );

    // return productData.create(cube);
    return cube.save();
}

module.exports = {
    getAll,
    getOne,
    create,
};