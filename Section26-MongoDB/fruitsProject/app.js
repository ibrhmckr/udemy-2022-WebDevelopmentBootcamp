/*
  const { MongoClient } = require("mongodb");
  // Replace the uri string with your MongoDB deployment's connection string.
  const uri = "mongodb://localhost:27017";
  const client = new MongoClient(uri);
  async function run() {
    try {
      await client.connect();
      const database = client.db('FruitShopDB');
      const fruits = database.collection('fruits');
      // Query for a movie that has the title 'Back to the Future'
      const query = {
          _id: 1,
          name: "Apple",
          rating: 6,
          color: "red"
      };
      const fruits2 = await fruits.insertOne(query);
      console.log(fruits2);
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }
  run().catch(console.dir);
*/

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

//Connection URL
const url = 'mongodb://localhost:27017';
//Database Name
const dbName = 'FruitShopDB';

//Create a new MongoClient
const client = new MongoClient(url,{useNewUrlParser: true});

//Use connect method to connect to the Server
client.connect(function(err){

  assert.equal(null, err);
  console.log("Connected successfully to server");

  const db = client.db(dbName);
  findDocuments(db, function() {
       client.close();
     });
})

//InsertDocuments function
const insertDocuments = function(db, callback) {
  // Get the documents collection
  const collection = db.collection('fruits');
  // Insert some documents
  collection.insertMany([
    {
      name : "Apple",
      score: 8,
      review: "Great fruits"
     },
    {
      name : "Orange",
      score: 6,
      review: "Kinda soul"
    },
    {
      name: "Banana",
      score: 9,
      review: "Great fruit"
    }
  ], function(err, result) {
    assert.equal(err, null);
    assert.equal(3, result.result.n);
    assert.equal(3, result.ops.length);
    console.log("Inserted 3 documents into the collection");
    callback(result);
  });
}

//Reads from collection

const findDocuments = function(db, callback) {
  // Get the documents collection
  const collection = db.collection('fruits');
  // Find some documents
  collection.find({}).toArray(function(err, fruits) {
    assert.equal(err, null);
    console.log("Found the following records");
    console.log(fruits)
    callback(fruits);
  });
}
