const express = require('express');
const https = require('https'); //Native node module(bundled - paketlenmis)
const bodyParser = require('body-parser');

var app = express(); //Started express app

app.use(bodyParser.urlencoded({extended: true})); //Necessary code to be able to start parsing through the body of the POST REQUEST


app.get('/', function(req, res){ //when client heaed on to root("/") do down

res.sendFile( __dirname+"/index.html");

});

app.post("/", function(req, res){

      console.log(req.body.cityName);
      var city = req.body.cityName;
      var unit = "metric";
      var appid = "774a16a954bf7021a39204ede1c26ae5";


      var url = "https://api.openweathermap.org/data/2.5/weather?q="+ city +"&units="+ unit +"&appid="+ appid;
      https.get(url, function(response){ //Makes an get request to an external server

      console.log('statusCode : ',response.statusCode);
      console.log('headers : ', response.headers);

      response.on('data', function(data){
        const weatherData = JSON.parse(data);
        const temp = weatherData.main.temp;
        const weatherDescription = weatherData.weather[0].description;
        const icon = weatherData.weather[0].icon;
        const imageURL = "http://openweathermap.org/img/wn/"+icon+"@2x.png";

      res.write("<h1>Weather description is : " +weatherDescription+ "</h1>");
      res.write("<h2><br> Temp in "+city+" is "+temp+"</h2>");
      res.write("<img src="+ imageURL +">");
      res.end();

      //res.write("Weather is "+ weatherData.weather[0].description +"in "+city);

      });

      });





});

/*

*/
















app.listen(3001, function(req, res){ //Listen server on 3001 port

     console.log("Hello I am running on : 3001");
});
