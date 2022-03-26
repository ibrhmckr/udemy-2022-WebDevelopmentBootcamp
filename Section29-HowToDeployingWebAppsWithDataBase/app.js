//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const _ = require("lodash");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

// const items = ["Buy Food", "Cook Food", "Eat Food"];
// const workItems = [];
////////////////////////////////////////////////
/////////////////////////////////////////////
//////////////////DATA BASE CONNECTION/////////
//////////////////////////////////////////////

 mongoose.connect("mongodb+srv://ibrhmckr-mango:iCakir6827-mango@cluster0.wizdb.mongodb.net/toDoListDB", {useNewUrlParser: true});

const itemsSchema = new mongoose.Schema({

  name :{
    type: String,
    require: [true, 'You have to enter a name!']
  }
});

const Item = new mongoose.model('Item', itemsSchema);

const eat = new Item({

  name:"EAT"
});

const readBook = new Item({
  name:"Read Book"
});

const doSport = new Item({
  name:"doSport"
});

const defaultItems = [eat, readBook, doSport];

//New Schema and model for new List Titles and Names
const listSchema = new mongoose.Schema({
  name: String,
  items: [itemsSchema]
});

const List = new mongoose.model('List', listSchema);

//DELETE ITEMS FROM DATABASE
//  Item.deleteMany({name:"Read Book"}, function(err){
//
//   if (err) {
//     console.log(err);
//   }else {
//     console.log("Successfully all items deleted.");
//   }
// });
//


//FIND itemsSchema

app.get("/", function(req, res) {


    Item.find({}, function(err, foundItems){

      if (foundItems.length == 0) {

        //INSERT ITEM INTO DATABASE
         Item.insertMany(defaultItems, function(err){
          if (err) {
            console.log(err);
          }else {
            console.log("Default items successfully added to Items collection.");
          }
        });
        res.redirect("/");
      }else {
        res.render("list", {listTitle: "Today", newListItems: foundItems});
      }
});

});// end of get "/"

//////////////////////////////////////////////////
app.get("/:customListName", function(req, res){

const customListName = _.capitalize(req.params.customListName);

List.findOne({name: customListName}, function(err, foundList){
    if (!err) {
       if (!foundList) {
         //Create a new list
          const list = new List({
           name: customListName,
           items: defaultItems
         });
        list.save();
        res.redirect("/" + customListName);
      }// end of if
      else {
        //Show an existing list
        res.render('list', {listTitle:foundList.name, newListItems: foundList.items});
      }
    }// end of err
    else {
      console.log(err);
    }
  });


});// end of GET '/:customListName'

app.post("/", function(req, res){

  const itemName = req.body.newItem;
  const listName = req.body.list;

  const newItem = new Item({
    name:itemName
  });

  if (listName === "Today") {
    //INSERT ITEM INTO DATABASE
    newItem.save();
    res.redirect("/");
  }else {
    List.findOne({name:listName}, function(err, foundList){

      if (!err) {
        foundList.items.push(newItem);
        foundList.save();
        res.redirect("/" + listName);
      }else {
        console.log(err);
      }

    });
  }


});// END OF POST '/'

app.post("/delete", function(req, res){
const  checkedItemId = req.body.checkbox;
const listName = req.body.listName;

  //DELETE ITEM FROM DATABASE
if (listName === "Today") {
  Item.findByIdAndDelete(checkedItemId, function(err){
    if (!err) {
        console.log("Item successfully deleted from database.");
        res.redirect("/");
    }
  });
}else {
  List.findOneAndUpdate({name: listName}, {$pull: {items: {_id: checkedItemId}}}, function(err, foundList){
    if (!err) {
      res.redirect("/" + listName);
    }
  });
}// end of else



});



app.get("/about", function(req, res){
  res.render("about");
});


let port = process.env.PORT;
if(port == null || port == ""){
  port = 3000;
}

app.listen(port, function() {
  console.log("Server has started successfully.");
});
