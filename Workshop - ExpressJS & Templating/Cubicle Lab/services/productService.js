const uniqid = require('uniqid');
const fs = require('fs');
const Cube = require('../models/Cube');
const products = require('../config/products.json');

function getAll() {
    return products;
}

function create(data) {
    let cube = new Cube(
        uniqid(), 
        data.name, 
        data.description, 
        data.imageUrl, 
        data.difficultyLevel
    );

    products.push(cube);

    fs.writeFile('./config/products.json', JSON.stringify(products), (err) => {
        if (err) {
           console.log(err);
           return;
        }

        console.log('Cube saved.');
    });
}

module.exports = {
    create,
    getAll,
};