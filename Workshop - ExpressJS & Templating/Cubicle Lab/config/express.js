const express = require('express');
const expHandlebars = require('express-handlebars');

module.exports = (app) => {
    app.engine('hbs', expHandlebars({
        extname: 'hbs',
    }));
    
    app.set('view engine', 'hbs');
    
    app.use(express.static('public'));
}