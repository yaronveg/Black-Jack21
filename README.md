# ♦♣♥♠ Blackjack ♠♥♣♦
Basic card game of Blackjack

![General Kenobi](https://media.giphy.com/media/NhrVA9pjd2gFv6N7pv/giphy.gif)

## How to play?

### ♦ Game UI ♦
The Players scores are displayed tward the center of the screen ("Player: 0" "Dealer: 0").
The sum of you hand score is displayed under your cards ("Current Hand: 0").
Your actions are displayed as buttons beneath your hand score.

### ♣ Game start ♣
The dealer will deal 2 cards each. One of the dealer's cards will be placed face down.
This "secret card" will be revealed once the dealer finishes his turn.

### ♥ Player's turn ♥
Once the dealer finishes dealing, you can decide to take another card ("hit"), or to end your turn with the cards you currently have("stand").
The buttons will turn gold once they are active.

### ♥ Dealer's turn ♥
The dealer takes his turn same as the player, but he must stand on 17 or higher.

### ♠ Scoring ♠
- Draw: no one gets points.
- Win under 21 and you will get 1 point.
- Lose by going over 21 and you will hand over the other player 2 points!

## 🖥 About the game

### 🔧 Tools
The games was built using a combination of HTML, SASS/CSS and JavaScript.
The code was written using VS code.

### 🏃‍♀️ Animation
The flying card animation was done with a combination of CSS keyframes and JS event-listeners.
Every time a card is being dealt, the code calculates trajcetory and passes it to the CSS as a style property.
The animation itself is beaing called in same manner. The CSS then adds a spin around the Z-Axis.

### 🃏 Card design
Card designs were taken from Wikipedia's page for the standard 52-card deck:
https://en.wikipedia.org/wiki/Standard_52-card_deck

The back of the cards were designed by me using Photoshop.
