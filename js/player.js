'use strict';

console.log('player link');

//Push keyCode into map. Keydown will make it truthy. Keyup will make it falsey.
var keyMap = {};


document.onkeydown = document.onkeyup = function(e){
  e = e || event;
  keyMap[e.keyCode] = e.type === 'keydown';
  console.log(keyMap);
};

//Grab player element.
var player = document.getElementsByClassName('player')[0];
// var play = new GameObject()
console.log(player);
var xPos = 200; //starting x-axis postion
var yPos = 200; //starting y-axis postion
var absY = 200; //current floor for the character
var xPosMvmt = 2;
var yPosMvmt = 5;

document.addEventListener('keydown', function(event){
  if (event.keyCode === 39){ //Right arrow
    xPos += xPosMvmt;
    player.style.left = xPos + 'px';
    console.log(player.style.left);
  }

  if (event.keyCode === 37){ //Left Arrow
    xPos -= xPosMvmt;
    player.style.left = xPos + 'px';
  }

  if ((event.keyCode === 32) && (absY===200)){ //Spacebar
    yPos -= yPosMvmt;
    absY -= yPosMvmt;
    player.style.top = yPos + 'px';
  }

  if (keyMap['32'] && keyMap['37'] && (absY===200)){
    xPos -= xPosMvmt;
    yPos -= yPosMvmt;
    absY -= yPosMvmt;
    player.style.top = yPos + 'px';
    player.style.left = xPos + 'px';
    console.log('l n space');
  }
  if (keyMap['32'] && keyMap['39'] && (absY===200)){
    xPos += xPosMvmt;
    yPos -= yPosMvmt;
    absY -= yPosMvmt;
    player.style.top = yPos + 'px';
    player.style.left = xPos + 'px';
    console.log('r n space');
  }
});

for( var i = 0; absY > 200; i++){
  absY += absY + i;
}