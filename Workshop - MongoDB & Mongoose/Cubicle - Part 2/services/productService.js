const uniqid = require('uniqid');
// const fs = require('fs');
const products = require('../config/products.json');
const productData = require('../data/productsData');
const Cube = require('../models/Cube');

function getAll(query) {
    let results = productData.getAll();
    
    if (query.search) {
        results = results.filter(product => product.name.toLowerCase().includes(query.search.toLowerCase()));

        if (query.from) {
            results = results.filter(product => Number(product.difficultyLevel) >= Number(query.from));
        }

        if (query.to) {
            results = results.filter(product => Number(product.difficultyLevel) <= Number(query.to));
        }
    }

    return results;
}

function getOne(id) {
    return productData.getOne(id);
}

function create(data) {
    let cube = new Cube(
        uniqid(), 
        data.name, 
        data.description, 
        data.imageUrl, 
        data.difficultyLevel
    );
    
    // fs.writeFile(
    //     path.join(__dirname, '../config/products.json'),
    //     JSON.stringify(products),
    //     callback
    // );

    return productData.create(cube);
}

module.exports = {
    getAll,
    getOne,
    create,
};