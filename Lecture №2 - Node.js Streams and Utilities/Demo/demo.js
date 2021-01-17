const fs = require('fs');
const zlib = require('zlib');

const readStream = fs.createReadStream('./views/login-page.html', 'utf8');
const writeStream = fs.createWriteStream('./write.html.gz');
const gzip = zlib.createGzip();

// readStream.on('data', (chunk) => {
//     console.log(`New chunk with size ${chunk.length} bytes was read.`);
//     writeStream.write(chunk);
// });

// readStream.on('end', () => {
//     console.log('Reading ended');
//     writeStream.end();
// });

// writeStream.on('finish', () => {
//     console.log('Writing ended.');
// });

readStream.pipe(gzip).pipe(writeStream);