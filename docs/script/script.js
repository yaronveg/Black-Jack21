const animateDelay = 500;
// players objects
const dealer = {
  name: "dealer",
  isStand: false,
  cards: [],
  cardScore: 0,
  score: 0,
  secretCard: "",
};
const player = {
  name: "player",
  isStand: false,
  cards: [],
  cardScore: 0,
  score: 0,
};
// get players score elements
const dealerScore = document.querySelector(".score-dealer");
const playerScore = document.querySelector(".score-player");

// create sound objects
const sfxCard = new Audio(`./sfx/card1.mp3`);

// get hand score element
const handUi = document.querySelector(".hand-player");

// get the top card (last)
const cardFly = document.querySelector(".seats-dealer>.deck>img:last-child");
// reset animation and pass new target to css
cardFly.addEventListener("animationend", function () {
  this.style.animation = "";
});

// get winner elements
const winnerWin = document.querySelector(".game-winner");
const winner = document.querySelector("span.winner");

// get buttons
const btnHit = document.querySelector(".button-hit");
const btnStand = document.querySelector(".button-stand");
const btnAgain = document.querySelector(".button-again");
btnStand.onclick = () => {
  player.isStand = true;
  setTimeout(() => {
    dealerTurn();
  }, animateDelay);
};
btnHit.onclick = () => {
  dealCard(player);
  if (player.cardScore >= 21 || player.cards.length === 5) {
    setTimeout(() => {
      dealerTurn();
    }, animateDelay);
  }
};
btnAgain.onclick = () => {
  winnerWin.classList.remove("fadein");
  winnerWin.classList.add("fadeout");
  newGame();
};

// DEAL A CARD
function dealCard(who) {
  // generate random card
  const newNum = Math.floor(Math.random() * 13) + 1;
  const newSuit = Math.floor(Math.random() * 4) + 1;
  const newCard = `img/${newNum}_${newSuit}.png`;

  // Update hand score
  if (newNum >= 10) {
    who.cards.push(10);
  } else if (newNum === 1) {
    who.cards.push(11);
  } else {
    who.cards.push(newNum);
  }

  // update user hand score
  const sumUp = (a, b) => a + b;
  who.cardScore = who.cards.reduce(sumUp);

  // ace check and replace
  if (who.cardScore > 21 && who.cards.indexOf(11) > -1) {
    who.cards.splice(who.cards.indexOf(11), 1, 1);
    who.cardScore = who.cards.reduce(sumUp);
  }

  // get target card
  const targetCard = document.querySelector(
    `.seats-${who.name} .${who.name}-card${who.cards.length} img`
  );

  if (who.name === "dealer" && who.cards.length === 2) {
    // store secret card in dealer's object
    who.secretCard = newCard;
  } else {
    // change img source to new card
    targetCard.src = newCard;
  }

  setTimeout(() => {
    // fade in the card
    targetCard.classList.remove("fadeout");
    targetCard.classList.add("fadein");
    // update player hand score in UI
    handUi.innerHTML = player.cardScore;
  }, animateDelay + 500);

  // activate sound and reset
  sfxCard.currentTime = 0;
  sfxCard.canplaythrough = sfxCard.play();

  ////// MOVING CARD TO NEW POSITION //////
  // get the target location
  const targetPos = document
    .querySelector(
      `.seats-${who.name} .${who.name}-card${who.cards.length} img`
    )
    .getBoundingClientRect();
  // pass target card to CSS
  cardFly.style.setProperty("--top-target", targetPos.y + "px");
  cardFly.style.setProperty("--left-target", targetPos.left + "px");
  cardFly.style.setProperty("--target-x", "translateX(0%)");

  // call animation

  cardFly.style.animation = `dealCard ${animateDelay / 500}s ease`;
}

////// CHECK WIN //////
function checkWin() {
  // winner text options
  const winnerText = {
    player: "Player is the winner!",
    playerFried: "Player got fried!",
    dealer: "Dealer is the winner!",
    dealerFried: "Dealer got fried!",
    draw: "It's a draw!",
    fried: "Both got fried!",
  };
  // reveal dealer's secret card
  document.querySelector(".seats-dealer .dealer-card2 img").src =
    dealer.secretCard;

  // enable play again and fade winner window in
  setTimeout(() => {
    // insert winner's name into the winner window
    if (dealer.cardScore > 21 && player.cardScore > 21) {
      winner.innerHTML = winnerText.fried;
    } else {
      if (dealer.cardScore > 21) {
        winner.innerHTML = winnerText.dealerFried;
        player.score = player.score + 2;
        playerScore.innerHTML = player.score;
      } else if (player.cardScore > 21) {
        winner.innerHTML = winnerText.playerFried;
        dealer.score = dealer.score + 2;
        dealerScore.innerHTML = dealer.score;
      } else if (dealer.cardScore === player.cardScore) {
        winner.innerHTML = winnerText.draw;
      } else if (dealer.cardScore > player.cardScore) {
        winner.innerHTML = winnerText.dealer;
        dealer.score = dealer.score + 1;
        dealerScore.innerHTML = dealer.score;
      } else {
        winner.innerHTML = winnerText.player;
        player.score = player.score + 1;
        playerScore.innerHTML = player.score;
      }
    }
    btnAgain.removeAttribute("disabled", true);
    winnerWin.classList.remove("fadeout");
    winnerWin.classList.add("fadein");
  }, 1000);
}

////// START GAME //////
// get the start button
const startBtn = document.querySelector(".button-greeting");
// get greeting view
const greeting = document.querySelector(".greeting");
// get game view
const gameTable = document.querySelector(".game-table");
// add event listener to start button
startBtn.addEventListener("click", () => {
  greeting.classList.remove("fadein");
  greeting.classList.add("fadeout");
  gameTable.classList.remove("fadeout");
  gameTable.classList.add("fadein");
  startBtn.setAttribute("disabled", true);
  newGame();
});

////// DEALER'S TURN //////
function dealerCards() {
  if (dealer.cardScore >= 17 || dealer.cards.length === 5) {
    dealer.isStand = true;
  } else {
    dealCard(dealer);
    setTimeout(() => {
      dealerCards();
    }, animateDelay + 1000);
  }
}

function dealerTurn() {
  // disable player buttons
  btnHit.setAttribute("disabled", true);
  btnStand.setAttribute("disabled", true);

  setTimeout(() => {
    // deal cards
    dealerCards();
    setTimeout(() => {
      checkWin();
    }, animateDelay + 1500);
  }, animateDelay);
}

function newGame() {
  // fade out winner window
  btnAgain.setAttribute("disabled", true);

  // reset hands
  handUi.innerHTML = "-";

  // reset cards imgs
  const cardsNodes = document.querySelectorAll(".seats-card>img");
  // convert nodelist to Array
  const allCards = Array.prototype.slice.call(cardsNodes);
  // loop array and set card-back src
  for (img in allCards) {
    allCards[img].src = "img/0.png";
    const currentCard = allCards[img];
    currentCard.classList.remove("fadein");
    currentCard.classList.add("fadeout");
  }
  // reset "isStand", "cardNum" and "cardScore"
  player.isStand = false;
  dealer.isStand = false;
  player.cardScore = 0;
  dealer.cardScore = 0;
  dealer.secretCard = "";
  player.cards = [];
  dealer.cards = [];

  // deal starting cards
  setTimeout(() => {
    dealCard(dealer);
    setTimeout(() => {
      dealCard(dealer);
      setTimeout(() => {
        dealCard(player);
        setTimeout(() => {
          dealCard(player);
          // player buttons
          btnHit.removeAttribute("disabled", true);
          btnStand.removeAttribute("disabled", true);
        }, animateDelay + 1000);
      }, animateDelay + 1000);
    }, animateDelay + 1000);
  }, 700);
}
