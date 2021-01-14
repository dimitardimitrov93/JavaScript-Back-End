const http = require('http');
const port = 3000;

const handlers = require('./handlers/index');

http.createServer((req, res) => {
    for (const handler of handlers) {
        if(!handler(req, res)) {
            break;
        }
    }
}).listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

