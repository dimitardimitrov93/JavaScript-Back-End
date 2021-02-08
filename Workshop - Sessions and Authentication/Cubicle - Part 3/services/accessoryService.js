const Accessory = require('../models/Accessory');

function create(data) {
    let accessory = new Accessory(data);

    return accessory.save();
}

function getAll() {
    return Accessory.find().lean();
}

function getAllWithout(accessoriesIds) {
    return Accessory.find({_id: {$nin: accessoriesIds}}).lean();
}

function getOne(id) {
    return Accessory.findById(id).lean();
}

module.exports = {
    create,
    getAll,
    getOne,
    getAllWithout,
};