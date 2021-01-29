const uniqid = require('uniqid');
const fs = require('fs');
const products = require('../config/products.json');
const path = require('path');
const Cube = require('../models/Cube');

function getAll() {
    return products.slice();
}

function getOne(id) {
    return products.find(product => product.id === id);
}

function create(data, callback) {
    let cube = new Cube(
        uniqid(), 
        data.name, 
        data.description, 
        data.imageUrl, 
        data.difficultyLevel
    );

    products.push(cube);
    
    fs.writeFile(
        path.join(__dirname, '../config/products.json'),
        JSON.stringify(products),
        callback
        );
}

module.exports = {
    getAll,
    getOne,
    create,
};