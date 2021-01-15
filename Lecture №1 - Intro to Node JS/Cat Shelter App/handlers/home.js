const url = require('url');
const fs = require('fs');
const path = require('path');

const cats = require('../data/cats.json');

module.exports = (req, res) => {
    const pathname = url.parse(req.url).pathname;

    if (pathname === '/' && req.method === 'GET') {

        const filePath = './views/home/index.html';

        fs.readFile(filePath, (err, data) => {
            if (err) {
                console.log(err);
                
                res.writeHead(404, {
                    'Content-Type': 'text/html',
                });
                res.write('<h1 style="text-align: center">404 Page Not Found </h1>');
                res.end();
            } else {
                res.writeHead(200, {
                    'Content-Type': 'text/html',
                });
                res.write(data);
                res.end();
            }
        });
    } else {
        return true;
    }
}