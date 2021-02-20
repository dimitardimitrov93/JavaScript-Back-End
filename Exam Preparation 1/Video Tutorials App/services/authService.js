const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { SECRET } = require('../config/config');

const register = (username, password) => {
    let user = new User({ username, password });
    return user.save();
}

const login = async (username, password) => {
    let user = await User.findOne({ username });
    if (!user) {
        throw { message: `Username is invalid or such user doesn't exist`, status: 404 };
    }
    
    let areIdentical = await bcrypt.compare(password, user.password);

    if (!areIdentical) {
        throw { message: 'Incorrect password!', status: 404 };
    }

    let token = jwt.sign({_id: user._id, username: user.username}, SECRET);

    return token;

    // if (!user) {
    //     throw { message: 'Username is invalid or such user doesn\'t exist', status: 404 };
    // }
}

module.exports = {
    register,
    login,
}