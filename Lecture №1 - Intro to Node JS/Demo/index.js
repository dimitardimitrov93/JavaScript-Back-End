const http = require('http');
const url = require('url');
const querystring = require('querystring');
const fs = require('fs');

const port = 5000;

function requestHandler(req, res) {
    // console.log(`Request method: ${req.method}`);
    // console.log(`Request url: ${req.url}`);

    let reqUrl = url.parse(req.url);
    // console.log(reqUrl.pathname);

    res.writeHead(200, {
        'Content-Type': 'text/plain',
    });

    switch (reqUrl.pathname) {
        case '/login':
            fs.readFile('./views/login-page.html', (err, data) => {
                if (err) {
                    console.log(err);
                    return;
                }

                res.writeHead(200, {
                    'Content-Type': 'text/html',
                });
                res.write(data);
                res.end();
            });
            break;
        case '/register':
            res.write('Register page');
            res.end();
            break;
        case '/':
            res.write('Home page');
            res.end();
            break;
        default:
            res.writeHead(404, {
                'Content-Type': 'text/html',
            });
            res.write(`<h1 style="text-align: center">404 Page Not Found</h1>`);
            res.end();
            break;
    }

}

const app = http.createServer(requestHandler)

app.listen(5000, () => {
    console.log(`Listening at http://localhost:5000/`);
});
