'use strict';

console.log('link');

// const gameMap = [
//   [0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 1, 1, 1],
//   [0, 0, 0, 0, 0, 0, 0, 0],
//   [1, 1, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 1, 1, 1, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 1, 1],
//   [0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 1, 1, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0],
//   [1, 1, 1, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 1, 1, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 1, 1, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 1, 1, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0],
//   [1, 1, 1, 1, 1, 1, 1, 1],
// ];

function generateArray(row, column) {
  var gameMap = [];
  var sub = new Array(row).fill(0);

  for (var i = 0; i <= column; i++) {
    gameMap.push(sub);
  }

  return gameMap;
}

console.log(generateArray(8, 20));

