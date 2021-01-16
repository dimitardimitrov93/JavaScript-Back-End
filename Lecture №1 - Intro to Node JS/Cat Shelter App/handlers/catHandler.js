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

                    let catBreedsPlaceholder = breeds.map(breed => `<option value="${breed}">${breed}</option>`);
                    let modifiedData = data
                        .toString()
                        .replace('{{catBreeds}}', catBreedsPlaceholder);

                    res.write(modifiedData);
                    res.end();
                }
            });
        } else if (req.method === 'POST') {
            const catsFilePath = './data/cats.json';
            const imagesFilePath = './content/images/';
            const form = new formidable.IncomingForm();

            form.parse(req, function (err, fields, files) {
                if (err) {
                    console.log(err);

                }

                let catInfo = fields;
                let catImageData = files;

                fs.rename(catImageData.upload.path, `${imagesFilePath}${catImageData.upload.name}`, (err) => {
                    if (err) {
                        console.log(err);
                    }
                });

                fs.readFile(catsFilePath, 'utf8', (err, data) => {
                    if (err) {
                        console.log(err);
                    }

                    let catsInfo = JSON.parse(data);
                    let modifiedCats = [...catsInfo, { id: catsInfo.length + 1, ...catInfo, image: `${imagesFilePath}${catImageData.upload.name}` }];

                    fs.writeFile(catsFilePath, JSON.stringify(modifiedCats), (err) => {
                        if (err) {
                            console.log(err);
                        }
                    });
                });
                res.writeHead(301, {
                    location: '/',
                });
                res.end();
            });
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
                res.writeHead(301, {
                    location: '/',
                });
                res.end();
            });

        }
    } else if (pathname === '/cats-edit/') {
        const filePath = './views/editCat.html';
        const catId = qs.parse(parsedUrl.query).id;

        let catToEdit;
        let catToEditIndex;

        cats.forEach((cat, index) => {
            if (cat.id == catId) {
                catToEdit = cat;
                catToEditIndex = index;
            }
        })

        if (req.method === 'GET') {
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

                    let catBreedsPlaceholder = breeds.map(breed => {
                        if (catToEdit.breed === breed) {
                            return `<option value="${breed}" selected>${breed}</option>`;
                        } else {
                            return `<option value="${breed}">${breed}</option>`;
                        }
                    });

                    let modifiedData = data
                        .toString()
                        .replace('{{name}}', catToEdit.name)
                        .replace('{{description}}', catToEdit.description)
                        .replace('{{breeds}}', catBreedsPlaceholder)
                        .replace('{{id}}', catToEdit.id);

                    res.write(modifiedData);
                    res.end();
                }
            });
        } else if (req.method === 'POST') {
            const catsFilePath = './data/cats.json';
            const imagesFilePath = './content/images/';
            const form = new formidable.IncomingForm();

            form.parse(req, function (err, fields, files) {

                if (err) {
                    console.log(err);
                }

                let catInfo = fields;
                let catImageData = files;

                fs.rename(catImageData.upload.path, `${imagesFilePath}${catImageData.upload.name}`, (err) => {
                    if (err) {
                        console.log(err);
                    }
                });

                fs.readFile(catsFilePath, 'utf8', (err, data) => {
                    if (err) {
                        console.log(err);
                    }

                    let catsInfo = JSON.parse(data);
                    catsInfo.splice(catToEditIndex, 1, { id: catsInfo.length + 1, ...catInfo, image: `${imagesFilePath}${catImageData.upload.name}` })

                    fs.writeFile(catsFilePath, JSON.stringify(catsInfo), (err) => {
                        if (err) {
                            console.log(err);
                        }
                    });
                });
                res.writeHead(301, {
                    location: '/',
                });
                res.end();
            });
        }
    } else if (pathname === '/cats-find-new-home/') {
        const filePath = './views/catShelter.html';
        const catId = qs.parse(parsedUrl.query).id;

        let catToEdit;
        let catToEditIndex;

        cats.forEach((cat, index) => {
            if (cat.id == catId) {
                catToEdit = cat;
                catToEditIndex = index;
            }
        })

        if (req.method === 'GET') {
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

                    let catBreedsPlaceholder;

                    breeds.map(breed => {
                        if (catToEdit.breed === breed) {
                            catBreedsPlaceholder = `<option value="${breed}" selected>${breed}</option>`;
                        }
                    });
                    
                    let modifiedData = data
                        .toString()
                        .replace(new RegExp('{{name}}', 'g'), catToEdit.name)
                        .replace('{{image}}', catToEdit.image.slice(1))
                        .replace('{{description}}', catToEdit.description)
                        .replace('{{breed}}', catBreedsPlaceholder)
                        .replace('{{id}}', catToEdit.id);

                    res.write(modifiedData);
                    res.end();
                }
            });
        } else if (req.method === 'POST') {
            const catsFilePath = './data/cats.json';
            const imagesFilePath = './content/images/';

            fs.readFile(catsFilePath, 'utf8', (err, data) => {
                if (err) {
                    console.log(err);
                }

                let catsInfo = JSON.parse(data);
                catsInfo.splice(catToEditIndex, 1)

                fs.writeFile(catsFilePath, JSON.stringify(catsInfo), (err) => {
                    if (err) {
                        console.log(err);
                    }
                });
            });

            res.writeHead(301, {
                location: '/',
            });
            res.end();
        }
    }
};