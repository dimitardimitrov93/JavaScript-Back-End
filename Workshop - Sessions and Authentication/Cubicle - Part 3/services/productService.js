const Cube = require('../models/Cube');
const Accessory = require('../models/Accessory');

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

function getOneWithAccessories(id) {
    return Cube.findById(id)
        .populate('accessories')
        .lean();
}

function create(data) {
    let cube = new Cube(data);

    return cube.save();
}

async function attachAccessory(productId, accessoryId) {
    let product = await Cube.findById(productId);
    let accessory = await Accessory.findById(accessoryId);

    product.accessories.push(accessory);
    return product.save();
}

module.exports = {
    getAll,
    getOne,
    create,
    attachAccessory,
    getOneWithAccessories,
};