console.log('link');

// create a new scene named "Game"
var gameScene = new Phaser.Scene('Game');

// our game's configuration
let config = {
  type: Phaser.AUTO, //Phaser will decide how to render our game (WebGL or Canvas)
  width: 800, // game width
  height: 600, // game height

  backgroundColor: '#D3D3D3', // game background
  scene: gameScene,
  // scene: {
  //   // key: 'game',
  //   preload: preload,
  //   create: create,
  //   update: update,
  //   // gameOver: this.scene.restart()
  // }, // our newly created scene
  physics: {
    default: 'arcade',
    arcade: {
      // gravity: { y: 500}, // include gravity
      debug: true
    }
  },
  parent: 'game'
};

// create the game, and pass it the configuration
var game = new Phaser.Game(config);

// Blank canvas to populate with sub arrays
var gameMap = [];

// dynamically generate 2D array with subarrays of 0's
function populateGameMap(col, row) {
  var sub = new Array(col).fill(0);

  for (var i = 0; i < row; i++) {
    gameMap.push(sub);
  }

  return gameMap;
}

// Platform object constructor function
function Platform(x, y, width = 2, val = 1) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.val = val;
}

// Prototype method to turn platform object into an array of usable data
// n is number of indeces, which is equal to columns
Platform.prototype.generatePlatform = function(n) {
  var platform = new Array(n).fill(0);
  var mappedObject = platform.map((el, idx) => {
    if (idx >= this.x && idx < this.x + this.width) {
      return this.val;
    }
    return el;
  });

  return mappedObject;
};

// Generate platform objects to repopulate game array with data
var ground = new Platform(0, 0, 8, 1);
var spriteIndex = new Platform(2, 2, 1, 2);
var one = new Platform(4, 3);
var two = new Platform(1, 5);
var three = new Platform(4, 7);
var four = new Platform(2, 9);
var five = new Platform(5, 11);
var six = new Platform(3, 13);
var seven = new Platform(0, 15);
var eight = new Platform(4, 17);

// Make array of game platform objects to iterate over and call prototype method
var gamePlatforms = [
  ground,
  spriteIndex,
  one,
  two,
  three,
  four,
  five,
  six,
  seven,
  eight
];

// sprite starts at row 2, which is .length-2 in the 2D array
// for every even row >= .length-4, create new Platform object
// invoke prototype method to turn Platform object into an array of 0's and 1's
// iterate over pre-populated 2D array, and replace existing subarray of 0's with newly generated platform array

function refillGameMap(gamePlatforms, col, row) {
  // start at gamePlatforms.indexOf(sprite) because loop increments every other row
  let j = 1;
  // initialize gameMap and assign with a 2D array filled with 0's
  let gameMap = populateGameMap(col, row);
  // hard code ground in game map array
  gameMap[gameMap.length-1] = gamePlatforms[gamePlatforms.indexOf(ground)].generatePlatform(8);

  for (var i = gameMap.length - 2; i >= 2; i -= 2) {
    if (gamePlatforms[j]) {
      gameMap[i] = gamePlatforms[j].generatePlatform(col);
      j++;
    }
  }
  return gameMap;
}

gameScene.replay = function(){
  this.scene.restart();
};

gameScene.preload = function() {
  this.load.image('sprite', 'assets/dead.png', { frameWidth: 32, frameHeight: 48 });
  this.load.image('tile', 'assets/15-01.png');
};

//Global variable for key input
var cursors;
var sprite;
var tile;
var gameOver = false;
var endGame;

gameScene.create = function() {
  const gameMap = refillGameMap(gamePlatforms, 8, 20);
  tile = this.physics.add.staticGroup();
  cursors = this.input.keyboard.createCursorKeys();

  //Endgame object creation. Place on page is temporary.
  endGame = this.physics.add.staticGroup();
  endGame.create(50, 70, 'tile');

  for (var i = 0; i < gameMap.length; i++) {
    for (var j = 0; j < gameMap[i].length; j++) {

      if (gameMap[i][j] === 1) {
        tile.create(j * 120, i * 30, 'tile');
        tile.displayOriginX = 0;
        tile.displayOriginY = 0;
        tile.displayWidth = 120;
        tile.displayHeight = 20;
      } else if (gameMap[i][j] === 2) {
        sprite = this.physics.add.sprite(200, 100, 'sprite');
        //Set gravity to player sprite only
        sprite.body.gravity.y = 500;
        sprite.body.setSize(0, 500);
        sprite.displayWidth = 40;
        sprite.displayHeight = 40;
        sprite.setCollideWorldBounds(true);
      }
    }
  }

  //Once player overlaps with object, invoke ender function to end user input and game.
  this.physics.add.overlap(sprite, endGame, ender, null, this);

  sprite.setCollideWorldBounds(true);
  sprite.body.checkCollision.up = false;
  sprite.body.checkCollision.down = true;
  sprite.body.checkCollision.left = false;
  sprite.body.checkCollision.right = false;
  this.physics.add.collider(sprite, tile);
};

gameScene.update = function(){
  if (gameOver){
    sprite.setVelocityX(0);
    return;
  }

  if (cursors.left.isDown){
    sprite.setVelocityX(-160);

  } else if (cursors.right.isDown) {
    sprite.setVelocityX(160);

  } else {
    sprite.setVelocityX(0);

  }

  if (cursors.up.isDown && sprite.body.touching.down) {
    sprite.setVelocityY(-350);
  }
};

//Function that gets called when player sprite collides with  endGame object.
function ender(){
  gameOver = true;

  //Double check that we're hitting this function.
  sprite.setVelocityY(-500);
  sprite.body.gravity.y = 0;
  sprite.setCollideWorldBounds(false);
  clearTimeout(t);
  saveScoreToLocalStorage(t);
  setTimeout(function(){
    window.location.href = '/scoreboard.html';
  }, 1000);
}

var re = document.getElementById('restart');
re.addEventListener('click', gameScene.replay);

var h1 = document.getElementsByTagName('h1')[0];
var start = document.getElementById('play');
var tryagain = document.getElementById('tryagain');
var seconds = 0;
var t;

function addTime(){
  seconds++;
  h1.textContent = 'Time: ' + seconds + ' seconds';
  timer();
}

function timer(){
  t = setTimeout(addTime, 1000);
}

document.addEventListener('keydown', startGame);

function startGame(){
  if(event.which){
    console.log(event.which);
    timer();
    document.removeEventListener('keydown', startGame);
  }
}

// trigger when player finishes game
// calculate high score by a multiplier
function calculateScore(timeInSec) {
  return timeInSec * 10;
}

function saveScoreToLocalStorage(t) {
  const recentScores = [];
  let newScore = calculateScore(t);
  recentScores.push(newScore);

  localStorage.setItem('recentScores', recentScores);
}