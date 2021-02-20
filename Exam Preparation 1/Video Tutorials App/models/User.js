const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { SALT_ROUNDS } = require('../config/config');
const ENGLISH_ALPHANUMERIC_PATTERN = /[^a-zA-Z0-9]+$/;

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: [5, 'Username should be at least 5 characters long!'],
        validate: {
            validator: (value) => {
                return !ENGLISH_ALPHANUMERIC_PATTERN.test(value);
            },
            message: (props) => {
                return `<${props.value}> is invalid username. The username should consist only english letters and digits.`;
            }
        },
    },
    password: {
        type: String,
        required: true,
        minlength: [5, 'should be at least 5 characters long!'],
        validate: {
            validator: (value) => {
                return !ENGLISH_ALPHANUMERIC_PATTERN.test(value);
            },
            message: (props) => {
                return `is invalid. The password should consist only english letters and digits.`;
            }
        },
    },
    enrolledCourses: [{
        type: mongoose.Types.ObjectId,
        ref: 'Course',
    }],
});

userSchema.pre('save', function (next) {
    bcrypt.genSalt(SALT_ROUNDS)
        .then(salt => bcrypt.hash(this.password, salt))
        .then(hash => {
            this.password = hash;
            next();
        });
});

module.exports = mongoose.model('User', userSchema);