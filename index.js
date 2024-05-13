const http = require('http');
const fs = require('fs');
const path = require('path');

http.createServer((req, res) => {
    let url = req.url;

    if (url === '/') 
        {
            url = '/index.html';
        }
    else if (url === '/about')
        {
            url = '/about.html';
        }
    else if (url === '/contact-me')
        {
            url = '/contact-me.html';
        }

    const filePath = path.join(__dirname, url);

    fs.readFile(filePath, (err, data) => {
        if (err) {
            if(err.code === 'ENDENT') {
                fs.readFile(__dirname + '/404.html', (err, data) => {
                    res.end(data);
                });
            }
            else {
                res.statusCode = 500;
            res.end('Error loading file');
            }
        }
        else {
            res.end(data);
        }
    });
}) .listen(3100, () => {
    console.log(`server listening on port http://localhost:3100`)
});