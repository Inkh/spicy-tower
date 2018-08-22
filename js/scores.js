'use-strict';

console.log('the js is linked');

// trigger when player finishes game
// calculate high score by a multiplier
function calculateScore(t) {
  return t * 10;
}

// on submit save username and score to userScores in localStorage and toggle modal
const handleSubmit = () => {

};

// display form asking user for name
// save to local storage on submit
function toggleModal() {
  let user;
  // debugger;
  let modal = document.querySelector('.show-modal');
  modal.classList.toggle('hide-modal');
  // debugger;
  // return saveScore(user);
}

// if high score, toggle class modal to show

// detect score

// toggle modal class to show


function saveScore(user) {
  // grab and parse last stored score in recent scores
  const lastScore = JSON.parse(localStorage.getItem('recentScores'))[-1];

  // add user score object to userScores array and save to local storage
  const userScores = [];
  userScores.push({ user: user, score: lastScore });
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
toggleModal();
// attachEventListeners();

function attachEventListeners() {
  if (shownForm) {
    shownForm.addEventListener('click', () => handleSubmit());
  }
}