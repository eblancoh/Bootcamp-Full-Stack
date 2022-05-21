/* Create a server that returns cowsay saying Hello World! */
const http = require('http');
const hostname = 'localhost';
const port = 8080;
const cowsay = require('cowsay');


const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end(cowsay.say({
    text: 'Hello World!',
    e: 'oO',
    T: 'U '
  }));
}
);


server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});