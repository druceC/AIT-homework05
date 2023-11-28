// main.js

// Global variables
let deck = [];
let topCards = [];
let hitPossible = true; // Set as true while sum < or = 21
let playerScore = 0;
let computerScore = 0;
let playerHand = [];
let playerHandS = [];
let computerHand = [];
let computerHandS = [];

// Form
document.addEventListener('DOMContentLoaded', () => {
    // Add an event listener to the form when the DOM is fully loaded
    const form = document.querySelector('.start form');
  
    form.addEventListener('submit', (event) => {
        // Prevent the default form submission behavior
        event.preventDefault();

        // Hide the form by adding the 'hidden' class
        const startDiv = document.querySelector('.start');
        startDiv.classList.add('hidden');

        // Handle user input 
        const startValuesInput = document.getElementById('startValues');
        const userInput = startValuesInput.value;

        // Generate Deck
        deck = generateDeck();

        console.log("deckGenerated:");
        console.log(deck);
        
        console.log("true");

        if (userInput) {
            console.log("true");
            topCards = userInput.split(',').map(card => ({ rank: card.trim(), suit: 'D' }));
            const temp = deck.filter(card => !topCards.some(topCard => topCard.rank === card.rank && topCard.suit === card.suit));
            deck = topCards.concat(temp);
        }
        // Print deck
        console.log("deck");
        console.log(deck);
        startGame(deck);
    });
});

// ----------------------------------------------------------------------------------------------------
  
// Function to deal cards
const dealCards = (deck, n) => {
    const computerHand = [];
    const playerHand = [];
  
    // Deal two cards to each player
    for (let i = 0; i < n; i++) {
      computerHand.push(deck.shift());
      computerScore += calculateHandTotal(computerHand);
      playerHand.push(deck.shift());
      playerScore += calculateHandTotal(playerHand);
    }
    return { computerHand, playerHand };
};

// Function to shuffle the deck
const shuffleDeck = (deck) => {
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
};
  
// Function to generate a standard deck of 52 cards
const generateDeck = () => {
    const suits = ['H', 'D', 'C', 'S'];
    const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    const deck = [];
  
    suits.forEach((suit) => {
      ranks.forEach((rank) => {
        deck.push({ rank, suit });
      });
    });
  
    return shuffleDeck(deck);
};

const startGame = (deck) => {
    console.log("Game is starting!");

    // PRINT DECKS
    console.log("topCards:");
    console.log(topCards);
    console.log("deck");
    console.log(deck);

    let cardImg;
    let playerTurn = 1;
  
    // DEAL CARDS - INITIAL
    ({ computerHand, playerHand } = dealCards(deck, 2));
    let first = 0;
    computerHand.forEach(element => {
        if(first===0){
            computerHandS.push(buildCardString(element));
            computerScore = calculateHandTotal(computerHand);
            first = 1;
        }else{
            cardImg = document.createElement("img");
            cardImg.src = "/cards/"+buildCardString(element)+".png";
            computerHandS.push(buildCardString(element));
            computerScore = calculateHandTotal(computerHand);
            document.getElementById("computer-cards").append(cardImg);
        }
    });

    playerHand.forEach(element => {
        cardImg = document.createElement("img");
        cardImg.src = "/cards/"+buildCardString(element)+".png";
        playerHandS.push(buildCardString(element));
        playerScore = calculateHandTotal(playerHand);
        document.getElementById("your-cards").append(cardImg);
    }); 

    console.log("computerHand");
    computerHand.forEach(element => computerHandS.push(buildCardString(element)));
    computerHandS.forEach(element => console.log(element));
    
    console.log("playerHand");
    playerHand.forEach(element => playerHandS.push(buildCardString(element)));    
    playerHandS.forEach(element => console.log(element));

    // ... (your existing code for dealing cards)

    console.log("playerScore:");
    console.log(playerScore);
    console.log("computerScore:");
    console.log(computerScore);

    let winner = 0; // Set as 1 if player wins, and 2 if computer wins
    let doubleStand = 0;

    // Function to handle player's turn
    const handlePlayerTurn = () => {
        document.getElementById("hit").addEventListener("click", () => {
            hit();
            playerTurn = false;
            playGame(); // Continue the game
        });

        document.getElementById("stand").addEventListener("click", () => {
            doubleStand += 1;
            stand();
            playerTurn = false;
            playGame(); // Continue the game
        });
        document.getElementById("player-sum").innerText = playerScore;
    };

    // Function to handle computer's turn
    const handleComputerTurn = () => {
        if (computerScore < 17) {
            let card = deck.pop();
            cardImg = document.createElement("img");
            cardImg.src = "/cards/" + buildCardString(card) + ".png";
            computerHand.push(card);
            computerHandS.push(buildCardString(card));
            computerScore = calculateHandTotal(computerHand);
            document.getElementById("computer-cards").append(cardImg);
            playerTurn = true;
            playGame(); // Continue the game
        } else if (computerScore > 16) {
            doubleStand += 1;
            playerTurn = true;
            playGame(); // Continue the game
        }
    };

    // Function to continue the game
    const playGame = () => {
        // CHECK FOR 21 
        console.log("playerScore:");
        console.log(playerScore);
        if (playerScore === 21) {
            winner = 1;
        } else if (playerScore > 21) {
            winner = 2;
        }

        // CHECK FOR 21 
        console.log("computerScore:");
        console.log(computerScore);
        if (computerScore === 21) {
            winner = 2;
        } else if (computerScore > 21) {
            winner = 1;
        }

        // Game ended (Case 1: someone reaches 21 | Case 2: doubleStand | Case 3: Someone goes over 21)
        if (winner === 0 && doubleStand !== 2) {
            if (playerTurn) {
                handlePlayerTurn();
            } else {
                handleComputerTurn();
            }
        } else {
            // Handle game results and display messages
            let message = "";
            if (winner === 0) { // Case where doubleStand
                if (computerScore > playerScore) {
                    message = "You lost 🤕";
                } else if (computerScore > 21) {
                    message = "You won! ⭐️";
                } else if (playerScore === computerScore) {
                    message = "Tie 🟰";
                }
            } else if (winner === 1) {
                message = "You won! ⭐️";
            } else if (winner === 2) {
                message = "You lost 🤕";
            }
            document.getElementById("computer-sum").innerText = computerScore;
            document.getElementById("player-sum").innerText = playerScore;
            document.getElementById("results").innerText = message;
            console.log("Game ended!");
        }
    };

    // Start the game with the player's turn
    handlePlayerTurn();
};

const buildCardString = (card) => {
    if(card.rank==='A'){
        return "1-"+card.suit;
    }
    return card.rank+"-"+card.suit;
};

// Function to calculate hand total
const calculateHandTotal = (hand) => {
    let total = 0;
    let numberOfAces = 0;
  
        // Calculate total and count aces
        hand.forEach((card) => {
        if (card.rank === 'A') {
            numberOfAces++;
            total += 11; // Assume Aces as 11 initially
        } else if (['K', 'Q', 'J'].includes(card.rank)) {
            total += 10;
        } else {
            total += parseInt(card.rank, 10);
        }
    });
  
    // Adjust for Aces if necessary
    while (total > 21 && numberOfAces > 0) {
        total -= 10;
        numberOfAces--;
    }
    return total;
};
  
// Function to display hand total
const displayHandTotal = (totalContainerId, total) => {
    const totalContainer = document.getElementById(totalContainerId);
    totalContainer.textContent = `Total: ${total}`;
};
  
// Function to create buttons
const createButton = (text, clickHandler) => {
    const button = document.createElement('button');
    button.textContent = text;
    button.addEventListener('click', clickHandler);
    document.body.appendChild(button);
};
  
// Event handler for the Hit button
const hit = () => {
    console.log('Hit button clicked!');
    if(!hitPossible){
        return;
    }
    else{
        let cardImg = document.createElement("img");
        // Get new card
        let card = deck.pop();
        playerHand.push(card);
        cardImg.src = "/cards/"+buildCardString(card)+".png";
        playerScore = calculateHandTotal(playerHand);
        document.getElementById("your-cards").append(cardImg);
        if(playerScore > 21){
            hitPossible = false;
        }
    }
};
  
// Event handler for the Stand button
const stand = () => {
    console.log('Stand button clicked!');
    computerScore = calculateHandTotal(playerHand);
    playerScore = calculateHandTotal(playerHand);
    document.getElementById("hidden").src = "/cards/" + hidden + ".png";
    document.getElementById("computer-sum").innerText = computerScore;
    document.getElementById("player-sum").innerText = playerScore;
};
  
const initializeGame = () => {
    startGame();

};
  
const main = () => {
    // Your game code goes here
    console.log('Game started!');
    initializeGame();
};
  
document.addEventListener('DOMContentLoaded', main);
  
