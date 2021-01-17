const fs = require('fs');

fs.readdir('.', (err, data) => {
    if (err) {
        console.log(err);
        return;
    }

    fs.writeFile('./file-list.txt', data.join('\n'), err => {
        if (err) {
            console.log(err);
            return;
        }
    });
});

// fs.mkdir('./fsmkdir', err => {
//     if (err) {
//         console.log(err);
//     }
// });

// fs.rename('./renamed', './fsmkdir', err => {
//     if (err) {
//         console.log(err);
//         return;
//     }
// });