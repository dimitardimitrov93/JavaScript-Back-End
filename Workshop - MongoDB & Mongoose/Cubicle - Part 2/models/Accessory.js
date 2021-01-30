const mongoose = require('mongoose');

const accessorySchema = new mongoose.Schema ({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
        maxlength: 50,
    },
    imageUrl: {
        type: String,
        required: true,
        validate: {
            validator(v) {
                const regExp = /^([http|https]+)([:\/\/]{3})\w+\.\w+\/?/;
                return regExp.test(v);
            }
        }

    },
});

module.exports = mongoose.model('Accessory', accessorySchema);