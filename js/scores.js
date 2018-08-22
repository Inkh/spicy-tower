'use-strict';

console.log('the js is linked');

// trigger when player finishes game
// calculate high score by a multiplier
function calculateScore(t) {
  return t * 10;
}

function saveScore(user, t) {
  // add score to local storage scores
  const userScores = [];
  userScores.push({ user: user, score: calculateScore(t) });
  localStorage.setItem('userScores', userScores);
}

// accepts JSON parsed user scores as a paramater
function sortScores(userScores) {
  return userScores.sort((a, b) => b.score - a.score);
}

// can change to Top X later
function displayScores() {
  // grab and parse JSON user scores string back to JS
  let parsed = JSON.parse(localStorage.getItem('userScores'));
  // sort and display all scores in local storage
  const sorted = sortScores(parsed);

  // create HTML element
  const newEl = document.createElement('div');
}

function createEl(type, content = null, klass = null) {
  let el = document.createElement(type);
  if (content) { el.textContent = content; }
  if (klass) { el.class = klass; }

  return el;
}

// runner code
// saveScore(t);