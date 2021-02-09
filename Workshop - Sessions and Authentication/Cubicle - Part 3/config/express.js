const express = require('express');
const expHandlebars = require('express-handlebars');
const auth = require('../middlewares/auth');
const cookieParser = require('cookie-parser');

module.exports = (app) => {
    app.engine('hbs', expHandlebars({
        extname: 'hbs',
    }));

    app.set('view engine', 'hbs');

    app.use(express.static('public'));

    app.use(express.urlencoded({ extended: true }));

    app.use(cookieParser());
    
    app.use(auth());
}