'use-strict';

console.log('the js is linked');

// on submit save username and score to userScores in localStorage and toggle modal
const handleSubmit = (e) => {
  // prevent the default action
  e.preventDefault();
  let modal = document.querySelector('.show-modal');
  // debugger;
  // set modal display to hidden
  modal.classList.toggle('hide-modal');
  // console.log('we get here');

  // grab the user's input from event object form input
  const user = e.target.getElementsByTagName('input')[0].value;
  // grab last saved score from recentScores in localStorage
  const lastScore = JSON.parse(localStorage.getItem('recentScores'));
  // trigger function to assess if new score is a high score in top 5 userScores
  isHighScore(5, user, lastScore);
};

// always display form asking user for name in order to persist to localStorage
function toggleModal() {
  let user;

  // save to local storage on submit then hide modal

  // modal.classList.toggle('hide-modal');

  // return saveScore(user);
}

// detect if high score is within top N scores
function isHighScore(topN, user, newScore) {
  let userScores;
  let stringifiedAndSorted;

  if (localStorage.getItem('userScores')) {
    userScores = JSON.parse(localStorage.getItem('userScores'));
  } else {
    userScores = [];
  }

  if (userScores.length >= topN) {
    for (let i = 0; i < topN; i++) {
      if (userScores[i].score < newScore) {
        // insert user and newScore into specific index i in native array, while deleting 0 items
        userScores = userScores.splice(i, 0, { user: user, score: newScore });
      }
    }
  } else {
    userScores.push({ user: user, score: newScore });
  }

  stringifiedAndSorted = JSON.stringify(sortScores(userScores));
  localStorage.setItem('userScores', stringifiedAndSorted);
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