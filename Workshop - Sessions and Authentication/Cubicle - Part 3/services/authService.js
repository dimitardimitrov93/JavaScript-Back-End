const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { SALT_ROUNDS, SECRET } = require('../config/config');

const register = async ({ username, password }) => {
    // TODO Check if username exists
    let salt = await bcrypt.genSalt(SALT_ROUNDS);
    let hash = await bcrypt.hash(password, salt);

    const user = new User({ username, password: hash });
    return await user.save();
}

const login = async ({ username, password }) => {
    const user = await User.findOne({ username });
    if (!user) throw { message: 'User not found!' };
    let isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw { message: 'Incorrect password!' };

    return jwt.sign({ _id: user._id, roles: ['admin'] }, SECRET);
}
module.exports = {
    register,
    login,
}