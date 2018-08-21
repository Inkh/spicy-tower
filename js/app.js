console.log('link');

// create a new scene named "Game"
// do we need this?
let gameScene = new Phaser.Scene('Game');

// our game's configuration
let config = {
  type: Phaser.AUTO, //Phaser will decide how to render our game (WebGL or Canvas)
  width: 800, // game width
  height: 600, // game height
  backgroundColor: '#D3D3D3', // game background
  scene: {
    key: 'game',
    // preload: preload,
    create: create,
    // update: update
  }, // our newly created scene
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 500}, // include gravity
      debug: false
    }
  },
};

// create the game, and pass it the configuration
let game = new Phaser.Game(config);

// Blank canvas to populate with sub arrays
var gameMap = [];

// dynamically generate 2D array with subarrays of 0's
function populateGameMap(row, column) {
  var sub = new Array(row).fill(0);

  for (var i = 0; i < column; i++) {
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
    // debugger;
    if (idx >= this.x && idx < this.x + this.width) {
      return this.val;
    }
    return el;
  });

  return mappedObject;
};

// Generate platform objects to repopulate game array with data
var ground = new Platform(0, 0, 8, 1);
var sprite = new Platform(2, 2, 1, 2);
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
  sprite,
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

function refillGameMap(gamePlatforms, row, col) {
  // start at gamePlatforms.indexOf(sprite) because loop increments every other row
  let j = 1;
  // initialize gameMap and assign with a 2D array filled with 0's
  let gameMap = populateGameMap(row, col);
  // hard code ground in game map array
  gameMap[gameMap.length-1] = gamePlatforms[gamePlatforms.indexOf(ground)].generatePlatform(8);

  for (var i = gameMap.length - 2; i >= 2; i -= 2) {
    gameMap[i] = gamePlatforms[j].generatePlatform(row);
    j++;
  }

  return gameMap;
}

function preload() {
  this.load.spritesheet('sprite', 'dead.png');
  this.load.image('dead-platform', 'dead.png');
}


function create() {
  const gameMap = refillGameMap(gamePlatforms, 8, 20);
  var platforms;
  var background = this.add.image(400, 300, 'sky');
  var sprite;
  let image;
  platforms = this.physics.add.staticGroup();
  platforms.create(400, 568, 'ground').setScale(2).refreshBody();

  for (var i = 0; i < gameMap.length; i++) {
    for (var j = 0; j < gameMap[i].length; j++) {

      if (gameMap[i][j] === 1) {
        platforms.create(j * 100, i * 30, 'dead-platform');
      } else if (gameMap[i][j] === 2) {
        sprite = this.physics.add.sprite(200, 100, 'sprite');
      }
    }
  }
}