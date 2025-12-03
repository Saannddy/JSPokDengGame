const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function createDeck() {
    const suits = ["Hearts", "Diamonds", "Clubs", "Spades"];
    const ranks = ["Ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King"], deck = [];
    for (let s of suits) {
        for (let r of ranks) {
            deck.push({ suit: s, rank: r });
        }
    }
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
}

function getScore(hand) {
    const getVal = card => {
        if (card.rank === "Ace") return 1;
        else if (["Jack", "Queen", "King", "10"].includes(card.rank)) return 0;
        else return parseInt(card.rank, 10);
    };
    return (getVal(hand[0]) + getVal(hand[1])) % 10;
}

function getHand(hand) {
    return `${hand[0].suit}-${hand[0].rank}, ${hand[1].suit}-${hand[1].rank}`;
}

let total = 0;

async function playRound() {
    const ask = await new Promise(inp => rl.question(`> Please put your bet:\n> `, inp));
    const bet = parseInt(ask, 10);

    if (isNaN(bet) || bet <= 0) {
        console.log(`> Invalid bet. Try again.`);
        return;
    }

    const deck = createDeck();
    const player = [deck[0], deck[1]], dealer = [deck[50], deck[51]];

    console.log(`> You got ${getHand(player)}`);
    console.log(`> The dealer got ${getHand(dealer)}`);

    const pscore = getScore(player), dscore = getScore(dealer);

    if (pscore > dscore) {
        console.log(`> You won!!!, received ${bet} chips`);
        total += bet;
    } else if (pscore < dscore) {
        console.log(`> You lost!!!, lost ${bet} chips`);
        total -= bet;
    } else console.log(`> Tie!!! No chips gained or lost`);
}

async function main() {
    let ans;
    do {
        await playRound();
        do {
            ans = await new Promise(inp => rl.question(`> Wanna play more (Yes/No)?\n> `, inp));
            if (!["yes", "no"].includes(ans.toLowerCase())) console.log(`> Invalid answer. Please type 'yes' or 'no'.`);
        } while (!["yes", "no"].includes(ans.toLowerCase()));
    } while (ans.toLowerCase() === "yes");

    console.log(`> You got total ${total} chips`);
    rl.close();
}

main();
