#!/bin/bash

echo "########### Loading data to Mongo DB ###########"
mongoimport --jsonArray --db mock-database --collection users --file /tmp/data/users.json