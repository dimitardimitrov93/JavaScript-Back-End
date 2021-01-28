const uniqid = require('uniqid');
const fs = require('fs');
const Cube = require('../models/Cube');
const products = require('../config/products.json');

// function getAll() {

// }

function create(data) {
    let updatedProducts = products.slice();
    let cube = new Cube(
        uniqid(), 
        data.name, 
        data.description, 
        data.imageUrl, 
        data.difficultyLevel
    );

    updatedProducts.push(cube);

    fs.writeFile('./config/products.json', JSON.stringify(updatedProducts), (err) => {
        if (err) {
           console.log(err);
           return;
        }

        console.log('Cube saved.');
    });
}

module.exports = {
    create,
};