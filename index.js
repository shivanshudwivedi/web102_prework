/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {
    for (let i = 0; i < games.length; i++) {
        const gameCard = document.createElement('div');
        gameCard.classList.add('game-card');

        gameCard.innerHTML = `
            <img class="game-img" src="${games[i].img}" alt="${games[i].name}">
            <h3>${games[i].name}</h3>
            <p>Backers: ${games[i].backers}</p>
            <p>Pledged: $${games[i].pledged.toLocaleString()}</p>
        `;

        // Append the gameCard to the gamesContainer
        gamesContainer.appendChild(gameCard);
    }
}

addGamesToPage(GAMES_JSON);

// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games


/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers


// set the inner HTML using a template literal and toLocaleString to get a number with commas


// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");

// Calculate total contributions using reduce
const totalContributions = GAMES_JSON.reduce((acc, game) => {
    return acc + game.backers;
}, 0);

// Set the inner HTML of the contributionsCard to display the total number of contributions
contributionsCard.innerHTML = `${totalContributions.toLocaleString()}`;


// Calculate total amount raised using reduce
const totalRaised = GAMES_JSON.reduce((acc, game) => {
    return acc + game.pledged;
}, 0);

// Set the inner HTML of the raisedCard to display the total amount of money raised
raisedCard.innerHTML = `$${totalRaised.toLocaleString()}`;

// set inner HTML using template literal


// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");

gamesCard.innerHTML = `${GAMES_JSON.length}`;


/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);
    
    const unfundedGames = GAMES_JSON.filter(game => {
        return game.pledged < game.goal;
    });

    addGamesToPage(unfundedGames);
    
    // Log the result to find the number of unfunded games
    console.log(unfundedGames.length); // For debugging purposes
}
// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);
    
    const fundedGames = GAMES_JSON.filter(game => {
        return game.pledged >= game.goal;
    });

    addGamesToPage(fundedGames);
    
    // Log the result to find the number of funded games
    console.log(fundedGames.length); // For debugging purposes
}


// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);
    addGamesToPage(GAMES_JSON);
}


// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button

unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);

/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games

const unfundedGamesCount = GAMES_JSON.filter(game => game.pledged < game.goal).length;


// create a string that explains the number of unfunded games using the ternary operator
const companySummary = `
    A total of $${totalRaised.toLocaleString()} has been raised for ${GAMES_JSON.length} games. 
    Currently, ${unfundedGamesCount} ${unfundedGamesCount === 1 ? "game remains" : "games remain"} unfunded. 
    We need your help to fund these amazing games!
`;


// create a new DOM element containing the template string and append it to the description container

const summaryParagraph = document.createElement("p");
summaryParagraph.innerHTML = companySummary;

descriptionContainer.appendChild(summaryParagraph);
/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");

const secondGameContainer = document.getElementById("second-game");



const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

const [topGame, secondGame] = sortedGames;


// use destructuring and the spread operator to grab the first and second games

// create a new element to hold the name of the top pledge game, then append it to the correct element
const topGameElement = document.createElement("h3");
topGameElement.innerHTML = `${topGame.name}`;
firstGameContainer.appendChild(topGameElement);

const secondGameElement = document.createElement("h3");
secondGameElement.innerHTML = `${secondGame.name}`;
secondGameContainer.appendChild(secondGameElement);

// do the same for the runner up item