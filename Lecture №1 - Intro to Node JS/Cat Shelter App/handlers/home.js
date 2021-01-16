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

                let catsFromDbHtml = cats.map(cat => `
                    <li>
                        <img src="${cat.image}" alt="${cat.breed}">
                        <h3>${cat.name}</h3>
                        <p><span>Breed: </span>${cat.breed}</p>
                        <p><span>Description: </span>${cat.description}</p>
                        <ul class="buttons">
                            <li class="btn edit"><a href="/cats-edit/?id=${cat.id}">Change Info</a></li>
                            <li class="btn delete"><a href="/cats-find-new-home/?id=${cat.id}">New Home</a></li>
                        </ul>
                    </li>
                `);
                
                let modifiedCatsHtml = data.toString().replace('{{cats}}', catsFromDbHtml);

                res.write(modifiedCatsHtml);
                res.end();
            }
        });
    } else {
        return true;
    }
}