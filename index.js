const readline = require("readline");
const { createDeck } = require("./game/deck");
const { getScore, getHand } = require("./game/game");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let total = 0;

async function playRound() {
    // Ask for bet
    const ask = await new Promise(inp => rl.question(`> Please put your bet:\n> `, inp));
    const bet = parseInt(ask, 10);

    // Validate bet
    if (isNaN(bet) || bet <= 0) {
        console.log(`> Invalid bet. Try again.`);
        return;
    }

    // Create and shuffle deck
    const deck = createDeck();

    // Card for player and dealer
    const player = [deck[0], deck[1]]
    const dealer = [deck[50], deck[51]];

    console.log(`> You got ${getHand(player)}`);
    console.log(`> The dealer got ${getHand(dealer)}`);

    const pscore = getScore(player);
    const dscore = getScore(dealer);

    // Determine outcome
    if (pscore > dscore) {
        console.log(`> You won!!!, received ${bet} chips`);
        total += bet;
    } else if (pscore < dscore) {
        console.log(`> You lost!!!, lost ${bet} chips`);
        total -= bet;
    } else {
        console.log(`> Tie!!! No chips gained or lost`);
    }
}

async function main() {
    let ans;
    // Game loop
    do {
        await playRound();
        // Ask to play again and validate input
        do {
            ans = await new Promise(inp => rl.question(`> Wanna play more (Yes/No)?\n> `, inp));
            if (!["yes", "no"].includes(ans.toLowerCase())) console.log(`> Invalid answer. Please type 'yes' or 'no'.`);
        } while (!["yes", "no"].includes(ans.toLowerCase()));
    } while (ans.toLowerCase() === "yes");

    console.log(`> You got total ${total} chips`);
    rl.close();
}

main();

module.exports = {playRound, main};
