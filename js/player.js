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
var xPos = 200;
var yPos = 200;
document.addEventListener('keydown', function(event){
  if (event.keyCode === 39){ //Right arrow
    xPos += 2;
    player.style.left = xPos + 'px';
    console.log(player.style.left);
  }

  if (event.keyCode === 37){ //Left Arrow
    xPos -= 2;
    player.style.left = xPos + 'px';
  }

  if (event.keyCode === 32){ //Spacebar
    yPos -= 5;
    player.style.top = yPos + 'px';
  }

  if (keyMap['32'] && keyMap['37']){
    xPos -=5;
    yPos -=5;
    player.style.top = yPos + 'px';
    player.style.left = xPos + 'px';
    console.log('l n space');
  }
  if (keyMap['32'] && keyMap['39']){
    xPos +=5;
    yPos -=5;
    player.style.top = yPos + 'px';
    player.style.left = xPos + 'px';
    console.log('r n space');
  }
});
