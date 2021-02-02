const mongoose = require('mongoose');

const cubeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
        maxlength: 150,
    },
    imageUrl: {
        type: String,
        required: true,
        validate: {
            validator(v) {
                const regExp = /^([http|https]+)([:\/\/]{3}).+/;
                return regExp.test(v);
            }
        }

    },
    difficultyLevel: {
        type: Number,
        required: true,
        min: 1,
        max: 6,
    },
    accessories: [{
            type: mongoose.Types.ObjectId,
            ref: 'Accessory'
    }]
});

module.exports = mongoose.model('Cube', cubeSchema);