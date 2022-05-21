const http = require('https');
const ip_host = '127.0.0.1';
const port = 8080;
var cowsay = require('cowsay');
const fs = require('fs');
var path = require('path');
const yaml = require('js-yaml');
const os = require("os");

var scriptName = path.basename(__filename);
var message = "Hello World! with Cowsay";


/* Get hostname of os in Node.js */
const hostName = os.hostname();

/* Get DateTime, timezone and offset */
const date = new Date()
const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
var offset_minutes = date.getTimezoneOffset();
if (offset_minutes <= 0) {
  var offset = "UTC+" + (offset_minutes/-60).toString();
}
else {
  var offset = "UTC" + (offset_minutes/-60).toString();
}

/* Create server that does nothing */
const server = http.createServer((req, res) => {

                                });

server.listen(() => {
                        /* Create a document in mongodb and insert it into the database */
                        var MongoClient = require('mongodb').MongoClient;
                        var url = `mongodb://localhost:27017/`;
                        MongoClient.connect(url, function(err, db) {
                          if (err) throw err;
                          var dbo = db.db("my-test-db");
                          var myobj = { message: message, scope: scriptName, host: hostName, date: date , location: timezone, offset: offset};
                          dbo.collection("calls").insertOne(myobj, function(err, res) {
                            if (err) throw err;
                            console.log(myobj);
                            console.log(`Document inserted in database.`);
                            db.close();
                          });
                        });
                      });
