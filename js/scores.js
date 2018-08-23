'use-strict';

console.log('the js is linked');

function triggerModal() {
  let modal = document.querySelector('.hide-modal');

  if (localStorage.getItem('gameOver') === 'true') {
    // set modal display to visible
    modal.classList.remove('hide-modal');
    modal.classList.add('show-modal');
  } else {
    modal.classList.remove('show-modal');
    modal.classList.add('hide-modal');
  }
}

// on submit save username and score to userScores in localStorage and toggle modal
const handleSubmit = (e) => {
  // prevent the default action
  e.preventDefault();
  // grab the user's input from event object form input
  const user = e.target.getElementsByTagName('input')[0].value;
  // grab last saved score from recentScores in localStorage
  const lastScore = JSON.parse(localStorage.getItem('recentScore'));
  // reset game over in local storage to prevent showing modal on page by default
  localStorage.setItem('gameOver', JSON.stringify(false));
  if (localStorage.getItem('gameOver') === 'false') {
    let modal = document.querySelector('.show-modal');
    modal.classList.remove('show-modal');
    modal.classList.add('hide-modal');
  }
  // trigger function to assess if new score is a high score in top 5 userScores
  console.log (user, lastScore);
  isHighScore(user, lastScore);
  displayHighScores();
};

// detect if high score is within top N scores
function isHighScore(user, newScore) {
  let userScores;
  let stringifiedAndSorted;

  // only trigger this logic if the user chose to input their name
  // don't save the score if the user chooses to ESC and not input their name
  if (user) {
    // set the userScores variable to an empty array if there is no userScores data in localStorage
    if (localStorage.getItem('userScores')) {
      userScores = JSON.parse(localStorage.getItem('userScores'));
    } else {
      userScores = [];
    }

    userScores.push({ user: user, score: newScore });
    stringifiedAndSorted = JSON.stringify(sortScores(userScores));
  }

  localStorage.setItem('userScores', stringifiedAndSorted);
}

// accepts JSON parsed user scores as a paramater
function sortScores(userScores) {
  return userScores.sort((a, b) => b.score - a.score);
}


function attachEventListeners() {
  const shownForm = document.querySelector('form');

  if (shownForm) {
    shownForm.addEventListener('submit', (e) => handleSubmit(e));
  }

  document.body.addEventListener('keyup', (e) => {
    let pressed = e.keyCode;
    if (pressed === 27) {
      localStorage.setItem('gameOver', 'false');
      window.location.href = '/scoreboard.html';
    }
  });
}


function displayHighScores(topN = null) {
  var userArray = JSON.parse(localStorage.getItem('userScores'));
  var scoreBoardTable = document.getElementById ('high-scores-board');
  while (scoreBoardTable.firstChild) {
    scoreBoardTable.removeChild(scoreBoardTable.firstChild);
  }
  var thead = document.createElement ('thead');
  var tr = document.createElement ('tr');
  var blankth = document.createElement ('th');
  tr.appendChild(blankth);
  var nameth = document.createElement ('th');
  nameth.textContent = 'Name';
  tr.appendChild(nameth);
  var scoreth = document.createElement ('th');
  scoreth.textContent = 'Score';
  tr.appendChild(scoreth);
  thead.appendChild(tr);

  var tbody = document.createElement('tbody');

  if (userArray) {
    var length;
    topN ? length = userArray.splice(0, topN + 1) : length = userArray.length;

    for (var i=0; i < length; i++) {
      tr = document.createElement ('tr');
      var numbertd = document.createElement ('td');
      numbertd.textContent= ' ';
      tr.appendChild(numbertd);
      var nametd = document.createElement ('td');
      nametd.textContent = userArray[i].user;
      tr.appendChild(nametd);
      var scoretd = document.createElement ('td');
      scoretd.textContent = userArray[i].score;
      tr.appendChild(scoretd);
      tbody.appendChild(tr);
    }

    scoreBoardTable.appendChild(thead);
    scoreBoardTable.appendChild(tbody);
  }
}

// runner code
triggerModal();
attachEventListeners();
displayHighScores();