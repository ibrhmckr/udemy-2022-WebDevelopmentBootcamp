//Include mongoose modul
const mongoose = require('mongoose');
//Connect to database named fruitsDB in localhost:27017
mongoose.connect("mongodb://localhost:27017/fruitsDB", {useNewUrlParser: true});

//Schema of a collection that i will use in future
const fruitSchema = new mongoose.Schema({

  name: {
      type: String,
      required: [true, "Validation eror.No name specified!"]
  },
  score: {
  type: Number,
  min: 1,
  max: 10
  },
  review: String
});

const Fruit = new mongoose.model('Fruit', fruitSchema);

//Insert some data into fruits collection

const personSchema = new mongoose.Schema({

  name: String,
  age: Number,
  favoriteFruit: fruitSchema
});

const Person = new mongoose.model('person', personSchema);

const person = new Person({

  name: "John",
  age: 37,
  favoriteFruit: null
});

//person.save(); Add the above person into people collection

const pineapple = new Fruit({
  name:"pineapple",
  score:5,
  review: "its texture is weird for me."
});

const strawberry = new Fruit({
  name:"strawberry",
  score:9,
  review:"Its smell and taste is ultra tasty."
});
//strawberry.save();
const apple = new Fruit({
  name: "Apple",
  score: 7,
  review: "Pretty solid as a fruit"
});

const kiwi = new Fruit({

  name: "kiwi",
  score: 10,
  review: "The best fruit!"
});

const orange = new Fruit({

  name:"Orange",
  score: 4,
  review: "Too sour for me"

});

const banana = new Fruit({

    name : "Banana",
    score: 3,
    review: "Weird texture"
});

const peach = new Fruit({

  name:"Peach",
  score: 10,
  review: "Peachs are awesome."
});


const Amy = new Person({
  name: 'Amy',
  age:12,
  favoriteFruit: pineapple
});



// INSERT DATA into fruits

/*
Fruit.insertMany([kiwi, orange, banana,apple, peach,pineapple,strawberry], function(err){

    if(err){
      console.log(err);
    }else{
      console.log("Successfully saved all the fruits to fruitsDB");
    }

});

*/



//UPDATE METHOD

Person.updateOne({_id: "61cb55eeb17019d75ace5a7d"},{favoriteFruit: kiwi}, function(err){
  if(err){
    console.log(err);
  }else{
    console.log("Successfully updated the document.");
  }
});

//DELETE function
/*
Fruit.deleteOne({name: "strawberry"}, function(err){
  if(err){
    console.log(err);
  }else {
    console.log("Successfully deleted!");
  }
});
*/

// Model.deleteMany() function
/*
Person.deleteMany({name:"John"}, function(err){
  if(err){
    console.log(err);
  }else {
    console.log("All the related documents successfully deleted.");
  }
});

*/


//READ WITH   mongoose
Fruit.find(function(err, fruits){

    if(err){console.log(err);}
    else{
      //Close the mongoose database connection
      //mongoose.connection.close();
       /*In my code, it doesn`t wait for the insertManyO
      to complete its execution and goes on to the mongoose.connection.close()
      statement. So by the time it tries to read data from the db, the connection
      has already ended. */

      fruits.forEach(counter)
      function counter(fruit){
      console.log(fruit.name);
    }// end od counter);

    }

});





/*
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


*/
