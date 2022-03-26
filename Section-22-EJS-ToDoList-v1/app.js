const express = require('express');
const bodyParser = require('body-parser');
const date = require(__dirname+"/date.js");
const app = express();

app.use(bodyParser.urlencoded({extended:true}));

//We have to write this code to able APPLY CSS
app.use(express.static("public")); //We have to tell express to serve up this public foldar as a static resource

app.set('view engine', 'ejs');

const items = ["Buy Food", "Cook Food", "Eat Food"];
const workItems = [];


app.get('/', function(req, res){
   //res.write("Hello || Welcome to our root directory. <br> <p>This is a respond from server to the known Client :-)</p> <br><br><br>");
    const day = date.getDate();
    res.render("list", {listTitle: day , newListitems:items});
     }); // END OF GET "/"
app.get("/work", function(req, res){

  res.render("list", {listTitle: "Work", newListitems: workItems});
});

app.post("/", function(req, res){

if(req.body.list === "Work"){
  let item = req.body.newItem;
  workItems.push(item);
  res.redirect("/work");
} else{//end of IF
  console.log(req.body);
  items.push(req.body.newItem);
  res.redirect("/");
} //end of else


}); // END OF GET "/work"

app.get("/about", function(req, res){
  res.render("about");
});//  END OF GET "/about"

app.listen(3000, function(){
  console.log("Server is runnig on port : 3000");
});
