//jshint esvertion:6

const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express();
const https = require('https');

app.use(bodyParser.urlencoded({extended:true}));// Use body parser urlencoded function

app.use(express.static("public")); //Provides the static files inside of public file.



app.get('/', function(req,res){

  res.sendFile(__dirname+"/signup.html");

});

app.post('/', function(req, res){

const firstName = req.body.firstName;
const lastName = req.body.lastName;
const email = req.body.email;

const data = {// Begining of OBJ

  members: [
    {
    email_address: email,
    status: "subscribed",
    merge_fields: {

      FNAME : firstName,
      LNAME : lastName
    }
  }
  ] // end of array
}// end of OBJ



const jsonData = JSON.stringify(data);

const url = "https://us20.api.mailchimp.com/3.0/lists/562bc12e35" ;
const options = {
   method: "POST",
   auth: "ibrahim1:a8c085a93ccc7d7218f6b099f9856fa6-us20"
}// javascript object



const request = https.request(url, options, function(response){ // Begin of https.request
  response.on("data", function(data){

     if(response.statusCode === 200){

        res.sendFile(__dirname+"/success.html");

     }else{res.sendFile(__dirname+"/failure.html"); }

     console.log(JSON.parse(data));
     console.log("StatusCode", response.statusCode);
  });
}); // End of https.request

request.write(jsonData);
request.end();


});


app.post("/failure", function(req, res){
   res.redirect("/");
})// end of app.listen

app.post("/success", function(req, res){
   res.redirect("/");
})//

app.listen(process.env.PORT || 3000, function(req, res){
 console.log("Server running on port : 3000");
});

//API KEY : a8c085a93ccc7d7218f6b099f9856fa6-us20
//id : 562bc12e35
