const url = require('url');
const fs = require('fs');
const path = require('path');

function getContentType(url) {
    if (url.endsWith('css')) {
        return 'text/css';
    } else if (url.endsWith('html')) {
        return 'text/html';
    } else if (url.endsWith('js')) {
        return 'text/javascript';
    } else if (url.endsWith('json')) {
        return 'application/json';
    }
}

module.exports = (req, res) => {
    const pathname = url.parse(req.url).pathname;
    
    const contentType = getContentType(pathname);

    if (pathname.startsWith('/content') && req.method === 'GET') {
        

        fs.readFile(path.normalize(`.${pathname}`), (err, data) => {
            if (err) {
                console.log(err);
                
                res.writeHead(404, {
                    'Content-Type': 'text/html',
                });
                res.write('<h1 style="text-align: center">404 Page Not Found </h1>');
                res.end();
            } else {
                res.writeHead(200, {
                    'Content-Type': contentType,
                });
                res.write(data);
                res.end();
            }
        });
    }
}