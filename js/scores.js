'use-strict';

console.log('the js is linked');

// trigger when player finishes game
// calculate high score by a multiplier
function calculateScore(t) {
  return t * 10;
}

// on submit save username and score to userScores in localStorage and toggle modal
const handleSubmit = (e) => {
  e.preventDefault();

  console.log('we get here');
};

// always display form asking user for name in order to persist to localStorage
function toggleModal() {
  let user;
  let modal = document.querySelector('.show-modal');

  // save to local storage on submit then hide modal

  modal.classList.toggle('hide-modal');

  // return saveScore(user);
}

// detect if high score is within top N scores
function isHighScore(topN, user, newScore) {
  const userScores = JSON.parse(localStorage.getItem('userScores'));

  for (let i = 0; i < topN; i++) {
    if (userScores[i].score < newScore) {
      // insert user and newScore into specific index i in native array, while deleting 0 items
      userScores.splice(i, 0, { user: user, score: newScore });
    }
  }

  // reset descending userScores in local storage to include new high score
  localStorage.setItem('userScores', sortScores(userScores));
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
toggleModal();
attachEventListeners();

function attachEventListeners() {
  const shownForm = document.querySelector('form');

  if (shownForm) {
    shownForm.addEventListener('submit', (e) => handleSubmit(e));
  }
}