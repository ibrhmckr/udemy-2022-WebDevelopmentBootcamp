var randomNumber1 = Math.floor( (Math.random() * 6) ) + 1 ;//Random number 1- 6

var randomDiceImage = "dice"+randomNumber1+".png";

var randomImageSource = "images/"+randomDiceImage;

var image1 = document.querySelectorAll("img")[0];

image1.setAttribute("src", randomImageSource);
console.log(randomImageSource);

var randomNumber2 = Math.floor( (Math.random() * 6) ) + 1 ;//Random number 1- 6

var randomDiceImage2 = "dice"+randomNumber2+".png";

var randomImageSource2 = "images/"+randomDiceImage2;

var image2 = document.querySelectorAll("img")[1];

image2.setAttribute("src", randomImageSource2);

//if player 1 wins
if(randomNumber1 > randomNumber2){
  document.querySelector("h1.title").innerText = "🚩Player 1 Wins!";
}
else if(randomNumber2 > randomNumber1){
 document.querySelector("h1.title").innerText = "Player 2 Wins!🚩";
}
else{
  document.querySelector("h1.title").innerText = "Draw!";
}
