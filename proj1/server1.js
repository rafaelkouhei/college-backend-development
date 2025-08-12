const http = require('http');
const server = http.createServer(function (req, resp){
    resp.end(
        `
        <html>
            <head></head>
            <body>
                <h1>Hello, World!</h1>
            </body>
        </html>
        `
    );
    console.log("Responding");
});

console.log("Executing server");
server.listen(3000);