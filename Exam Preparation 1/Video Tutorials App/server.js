const express = require('express');
const routes = require('./routes');
const errorHandler = require('./middlewares/errorHandler');
const app = express();
const { PORT } = require('./config/config');
require('./config/mongoose');
require('./config/express')(app);

app.use(routes);
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server is running at http://localhost:4000/`));