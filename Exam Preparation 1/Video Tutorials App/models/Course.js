const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        minlength: [4, 'should be at least 5 characters long!'],
    },
    description: {
        type: String,
        required: true,
        maxlength: 50,
        minlength: [20, 'must be at least 20 characters long.'],
    },
    imageUrl: {
        type: String,
        required: true,
        validate: {
            validator(v) {
                const regExp = /^([http|https]+)([:\/\/]{3}).+/;
                return regExp.test(v);
            },
            message: (props) => {
                return `<${props.value}> is invalid image URL. The image URL should start with http:// or https://.`;
            }
        }
    },
    isPublic: {
        type: Boolean,
        default: false,
    },
    creator: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
    createdAt: {
        type: Date,
        required: true,
        default: new Date(),
    },
    usersEnrolled: [{
        type: mongoose.Types.ObjectId,
        ref: 'User',
    }],
});

module.exports = mongoose.model('Course', courseSchema);