const uniqid = require('uniqid');
// const fs = require('fs');
const fs = require('fs').promises;
const products = require('../config/products.json');
const path = require('path');
const Cube = require('../models/Cube');

function getAll(query) {
    let results = products.slice();
    
    if (query.search) {
        results = results.filter(product => product.name.toLowerCase().includes(query.search.toLowerCase()));
        if (query.from && query.to) {
            results = results.filter(product => (((Number(product.difficultyLevel) >= Number(query.from)) && (Number(product.difficultyLevel) <= Number(query.to)))));
        }
    }
    return results;
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
    
    // fs.writeFile(
    //     path.join(__dirname, '../config/products.json'),
    //     JSON.stringify(products),
    //     callback
    // );

    return fs.writeFile(path.join(__dirname, '../config/products.json'), JSON.stringify(products))
}

module.exports = {
    getAll,
    getOne,
    create,
};