/* Create an api that returns cowsay saying a custom message after post with express*/
const express = require("express");
const cowsay = require('cowsay');
const app = express();


app.use(express.urlencoded({extended: false}));
app.use(express.json());


app.post('/cowsay', function(request, response){
    response.send(cowsay.say({
                                text: request.query.quote,
                                e: "oO",
                                T: "U "
                            })
                )
    }
);


app.listen(8080);
console.log("Running on http://localhost:8080");

