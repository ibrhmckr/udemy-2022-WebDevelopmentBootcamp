//jshint esversion:6
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const app = express();
const session = require('express-session');
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");



app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));

app.use(session({
  secret: "OurLittleSecret.",
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

//////////////DATABASE PROCESS\\\\\\\\\\\\\\\
mongoose.connect("mongodb://localhost:27017/userDB",{useNewUrlParser: true});

const userSchema = new mongoose.Schema({
  email:String,
  password:String
});

//Hash and salt our password and save users into MangoDB
userSchema.plugin(passportLocalMongoose);

const userModel = new mongoose.model('user', userSchema);

passport.use(userModel.createStrategy());
passport.serializeUser(userModel.serializeUser());
passport.deserializeUser(userModel.deserializeUser());


/////////////END DATABASE\\\\\\\\\\\\\

app.get("/",function(req, res){

  res.render("home");
});

app.get("/login",function(req, res){

  res.render("login");
});

app.get("/register",function(req, res){

  res.render("register");
});

app.get("/secrets", function(req, res){
  if (req.isAuthenticated()) {
    res.render("secrets");
  }else {
    res.redirect("/login");
  }
});

app.get("/logout", function(req, res){
  req.logout();
  res.redirect("/");
});


app.post("/register",function(req, res){

  userModel.register({username: req.body.username}, req.body.password, function(err, user){
    if (err) {
      console.log(err);
      res.redirect("/register");
    }else{
      passport.authenticate("local")(req, res, function(){
        res.redirect("/secrets");
      });
    }
  });

});

app.post("/login", function(req, res){

 const user = new userModel({
   username: req.body.username,
   password: req.body.password
 });
req.login(user, function(err){
  if (err) {
    console.log(err);
  }else {
    passport.authenticate("local")(req, res, function(){
      res.redirect("/secrets");
    } );
  }
});
});



app.listen(3000, function(){
  console.log("Server running on port: 3000");
});
