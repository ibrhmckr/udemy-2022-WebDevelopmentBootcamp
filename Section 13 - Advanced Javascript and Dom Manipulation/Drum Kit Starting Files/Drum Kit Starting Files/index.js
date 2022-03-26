numberOfDrumButtons = document.querySelectorAll(".drum");

// Sounds file path
soundsPath = "sounds/";

/*
function clickHandle(){
  this.
}// end of clickHandle
*/
//Assets EventListener to all button elements

for (var i = 0; i < numberOfDrumButtons.length; i++) {
  document.querySelectorAll("button")[i].addEventListener("click", function() {

      var buttonInnerHTML = this.innerHTML;
       makeSound(buttonInnerHTML);
       buttonAnimation(buttonInnerHTML);
    } // end of anonymous function end
  );
}

document.addEventListener("keypress",  function(event){
  var pressedKey = event.key;
  makeSound(pressedKey);
  buttonAnimation(pressedKey);
});

function makeSound(key){

  switch (key) {

    case "w":
      var tom1 = new Audio(soundsPath + "tom-1.mp3");
      tom1.play();
      break;

    case "a":
      var tom2 = new Audio(soundsPath + "tom-2.mp3");
      tom2.play();
      break;

    case "s":
      var tom3 = new Audio(soundsPath + "tom-3.mp3");
      tom3.play();
      break;

    case "d":
      var tom4 = new Audio(soundsPath + "tom-4.mp3");
      tom4.play();
      break;

    case "j":
      var snare = new Audio(soundsPath + "snare.mp3");
      snare.play();
      break;

    case "k":
      var crash = new Audio(soundsPath + "crash.mp3");
      crash.play();
      break;

    case "l":
      var kickBass = new Audio(soundsPath + "kick-bass.mp3");
      kickBass.play();
      break;

    default: console.log("Invalid Entry! "+ pressedKey);

  } // end of switch
} // end of makeSound


function buttonAnimation(currentKey){

  var activeButton =  document.querySelector("."+currentKey);

  activeButton.classList.add("pressed");
   setTimeout(function(){activeButton.classList.remove("pressed");}  , 100 );
}
