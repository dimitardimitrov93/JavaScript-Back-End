const homeHandler = require('./home');
const staticFilesHandler = require('./static-files');
const catHandler = require('./catHandler');

module.exports = [homeHandler, staticFilesHandler, catHandler];