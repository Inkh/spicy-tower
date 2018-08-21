'use-strict';

console.log('the js is linked');

// trigger when player finishes game
// calculate high score by a multiplier
function calculateScore(timeInSec) {
  return timeInSec * 10;
}

function saveScore(user, timeInSec) {
  // add score to local storage scores
  const userScores = [];
  userScores.push({ user: user, score: calculateScore(timeInSec) });
  localStorage.setItem('userScores', userScores);
}

function sortScores(userScores) {
  userScores.sort((a, b) => b.score > a.score);
}

function displayScores() {
  // sort and display all scores in local storage
  // can change to Top X later
}