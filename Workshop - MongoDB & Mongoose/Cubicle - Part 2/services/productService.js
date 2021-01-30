const Cube = require('../models/Cube');

async function getAll(query) {
    let products = await Cube.find({}).lean();

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
    return Cube.findById(id).lean();
}

function create(data) {
    let cube = new Cube(data);
    
    return cube.save();
}

module.exports = {
    getAll,
    getOne,
    create,
};