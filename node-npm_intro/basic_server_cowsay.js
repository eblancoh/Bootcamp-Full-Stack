const http = require('http');
const hostname = '127.0.0.1';
const port = 8080;
// const _ = require('lodash')
var cowsay = require('cowsay')
const server = http.createServer((req, res) => {
                                 res.statusCode = 200;
                                 res.setHeader('Content-Type', 'text/txt');
                                 res.end(
                                   cowsay.say({
                                     text: "Hello World!",
                                     e: "oO",
                                     T: "U "
                                   })
                                 );
                                 });
server.listen(port, hostname, () => {
                        console.log(`Server running at http://${hostname}:${port}/`);
                      });