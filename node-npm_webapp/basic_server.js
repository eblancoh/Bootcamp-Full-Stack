const express = require("express");
var cowsay = require('cowsay')

const hostname = '0.0.0.0';
const port = 8080;
 
// New app using express module
const app = express();

app.use(express.urlencoded( {extended: false} )); 
app.use(express.json()); 
 
app.post('/cowsay', function(request, response){
  response.send(cowsay.say({
                          text: request.query.quote,
                          e: "oO",
                          T: "U "
                      })
          )
});

app.get('/get-cowsay', function(request, response){
  response.send(cowsay.say({
                          text: "Estás haciendo un GET y no un POST. Cuidado!",
                          e: "oO",
                          T: "U "
                      })
          )
});


app.listen(port, hostname);
console.log(`Running on http://${hostname}:${port}`);