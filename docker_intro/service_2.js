const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const { promisify } = require('util');

const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://mongomock:27017';
const dbName = 'mock_database';
const collectionName = 'users';

const hostName = '0.0.0.0';
const port = 8080;

app.use(bodyParser.json()); // for parsing application/json

// GET method route
app.get('/', function (req, res) {
    res.send('GET request to the homepage.');
});
  
// POST method route
app.post('/', function (req, res) {
    res.send('POST request to the homepage');
});

// GET method route
app.get('/secret', function (req, res, next) {
    res.send('Never be cruel, never be cowardly. And never eat pears!');
    console.log('This is a console.log message.');
});


// GET method route
// Query all documents in the database
app.get('/api/get/all', async function(req, res){    
    try {
        const client = await MongoClient.connect(url);
        const dbo = client.db(dbName);
        const query = {};
        const result = await dbo.collection(collectionName).find(query).toArray();
        if (result.length > 0){ 
            // console.log(result);
            /* 200 OK */
            res.status(200).send(result);
        } else {
            /* 200 OK */
            res.status(200).send("The collection is empty.");
        }
        client.close();
    } catch (err) {
        console.error(err);
        res.status(500).send("An error occurred.");
    }
});





// GET method route
// Query by a certain field(s)
// Let's query by "gender". This field must be a string, 
// it is mandatory and the only allowed values are "Male" or "Female"

app.get('/api/get', async function(req, res) {

    /*
    In this example, we first check if the "gender" parameter is defined and has a value. 
    If it's not, we return a 400 Bad Request status code with a message indicating that the parameter is missing.

    Next, we check if the "gender" parameter has a valid value. If it's not "Male" or "Female", 
    we return a 400 Bad Request status code with a message indicating that the parameter has an invalid value.

    Finally, if the "gender" parameter is valid, we connect to the MongoDB database, 
    query the collection by the "gender" field using the find method, and return the results to the client with a 200 OK status code. 
    If no documents are found, we return a 404 Not Found status code with a message indicating that no documents were found for the specified "gender" parameter.
    */
   
    try {
        const client = await MongoClient.connect(url);
        const dbo = client.db(dbName);
        const gender = req.query.gender;
        if (!gender) {
            res.status(400).send('Please provide a "gender" parameter.');
            return;
        }
        if (gender !== 'Male' && gender !== 'Female') {
            res.status(400).send('Invalid "gender" parameter. Allowed values are "Male" or "Female".');
            return;
        }
        const query = { gender: gender };
        const result = await dbo.collection(collectionName).find(query).toArray();
        if (result.length > 0){ 
            console.log(result);
            /* 200 OK */
            res.status(200).send(result);
        } else {
            /* 404 Not Found */
            res.status(404).send('No documents found for the specified "gender" parameter.');
        }
        client.close();
    } catch (err) {
        console.error(err);
        res.status(500).send('An error occurred.');
    }
  });

/*
we are using the async/await syntax to write asynchronous code that looks synchronous. 
We are also using promisify to convert the callback-based MongoClient.connect method to a Promise-based method.

Note that we have added error handling and input validation to make the code more robust. 
We check if the "gender" parameter is defined and has a value, and if it's valid. 
If any errors occur during the asynchronous operations, 
we catch them and send an error response to the client with a 500 Internal Server Error status code.
*/

    

/* PUT method. Modifying the message based on field(s). 
If not found, create a new document in the database (201 Created)
If found, message, modified specified fields (200 OK) 
I am choosing email as the field to check. */

// PUT method route
// Modify a document based on email
app.put('/api/put', async function(req, res) {
    /*
    In this code, we define an array of expected field names expectedFields, 
    and we use the every method to check if all the keys in req.body are included in expectedFields. 
    If any expected field is missing in req.body, we send a 400 Bad Request response to the client with a message indicating which fields are missing.

    If all expected fields are present in req.body, we proceed with the document update operation as before.
    */

    // Array of expected field names
    const expectedFields = ['first_name', 'last_name', 'email', 'gender', 'address', 'card', 'married_status'];

    try {
        console.log(req.body);
        // Check if all expected fields are present in req.body
        if (expectedFields.every(field => Object.keys(req.body).includes(field))) {
            const client = await MongoClient.connect(url);
            const dbo = client.db(dbName);
            const query = { email: req.body.email };
            const updateFields = req.body;
            const options = { upsert: true, returnOriginal: false };
            const result = await dbo.collection(collectionName).findOneAndUpdate(query, { $set: updateFields }, options);
            client.close();
            if (result.lastErrorObject.upserted) {
                /* 201 Created */
                res.status(201).send('New document created.');
            } else {
                /* 200 OK */
                res.status(200).send('Document updated.');
            }
        } else {
            /* 400 Bad Request */
            res.status(400).send('Missing fields in request body.');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('An error occurred.');
    }
});


/* DELETE method. Modifying the message based on field(s). 
If not found, do nothing. (204 No Content)
If found, document deleted (200 OK) */
// I'm using the email
app.delete('/api/delete', function(req, res) {
    const email = req.body.email;
  
    MongoClient.connect(url)
      .then(async (client) => {
        const dbo = client.db(dbName);
        const query = { email: email };
  
        const result = await dbo.collection(collectionName).deleteOne(query);
          if (result.deletedCount === 1) {
              // Document deleted
              res.status(200).send('Document deleted');
          } else {
              // Document not found
              res.status(204).send();
          }
          client.close();
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('An error occurred while deleting the document');
      });
  });


app.listen(port, hostName);
console.log(`Running on http://${hostName}:${port}`);
