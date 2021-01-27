const express = require('express');
const app = express();
const config = require('./config/config');
require('./config/express')(app);

app.get('/', (req, res) => {
    res.render('home', { layout: false });
});

app.listen(config.PORT, () => console.log(`Server is running on port ${config.PORT}...`));