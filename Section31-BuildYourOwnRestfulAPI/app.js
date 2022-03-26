const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require("ejs");


const app = express();

//View Engine Setup
app.set("view", __dirname+"views");
app.set("view engine", "ejs");

//Body-Parser middleware
app.use(bodyParser.urlencoded({extended:true}));
//express.static to able to process static files
app.use(express.static("public"));


//Database processing
//1-Connection
mongoose.connect("mongodb://localhost:27017/wikiDB");
//2-Schema
const articleSchema = {
  title: String,
  content: String
};

//3-Model
const Article = new mongoose.model("article", articleSchema);



app.route("/articles")

.get(function(req, res){

   Article.find({},function(err, foundArticles){
     if (!err) {
      res.send(foundArticles);
     }else{
      res.send(err);
     }

   });
})

.post(function(req, res){

 //console.log(req.body.title);
 //console.log( req.body.content);

   const newArticle = new Article({
      title: req.body.title,
      content: req.body.content
   });

   newArticle.save(function(err){
      if (!err) {
        res.send("Successfully added a new article.");
      }else {
        res.send(err);
      }
   });



})

.delete(function(req, res){
    Article.deleteMany({}, function(err){
      if (!err) {
        res.send("Successfully all articles deleted!!!!");
      }else {
        res.send(err);
      }
    });
});

app.route("/articles/:articleTitle")
.get(function(req, res){
  console.log(req.params.articleTitle);
    Article.findOne({title:req.params.articleTitle}, function(err,foundArticle){

      if (foundArticle) {
         res.send(foundArticle);
      }else {
        res.send("No article found.");
      }
    });

})

.put(function(req,res){

    Article.updateOne({title: req.params.articleTitle}, {title: req.body.title,content: req.body.content}, function(err){
      if (!err) {
        res.send("The article Successfully updated!");
      }else {
        res.send(err);
      }
    });

})

.patch(function(req, res){
/*
  req.boy = { //This is a javaScript object so Below req.body usage is accepted!
}
*/
  Article.updateOne({title:req.params.articleTitle},
    {$set: req.body},
     function(err){
       if (!err) {
         res.send("Successfully article updated.");
       }else {
         res.send(err);
       }
     });
})

.delete(function(req, res){
   Article.deleteOne(
     {title: req.params.articleTitle}, function(err){
       if (!err) {
         res.send("Article successfully deleted.");
       }else {
         res.send(err);
       }
     }
   );
});



app.listen(3000, function(err){
  if (!err) {
    console.log("Server started running on port 3000.");
  }
});
