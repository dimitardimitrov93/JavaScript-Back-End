const url = require('url');
const fs = require('fs');
const path = require('path');
const qs = require('querystring');
const formidable = require('formidable');
const breeds = require('../data/breeds.json');
const cats = require('../data/cats.json');

module.exports = (req, res) => {

    const parsedUrl = url.parse(req.url);
    const pathname = parsedUrl.pathname;

    if (pathname === '/cats/add-cat') {
        if (req.method === 'GET') {
            const filePath = './views/addCat.html';

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
        } else if (req.method === 'POST') {

        }
    } else if (pathname === '/cats/add-breed') {
        if (req.method === 'GET') {
            const filePath = './views/addBreed.html';

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
        } else if (req.method === 'POST') {
            const form = new formidable.IncomingForm();
            const filePath = './data/breeds.json';
            let inputBreed;
            let catBreeds;

            form.parse(req, function (err, fields, files) {
                if (err) {
                    console.log(err);

                }

                inputBreed = fields.breed;

                fs.readFile(filePath, 'utf8', (err, data) => {
                    if (err) {
                        console.log(err);
                    }

                    catBreeds = JSON.parse(data);

                    catBreeds.push(inputBreed);

                    fs.writeFile(filePath, JSON.stringify(catBreeds), (err) => {
                        if (err) {
                            console.log(err);
                        }
                    });
                });

                res.end();
            });

        }
    }
};