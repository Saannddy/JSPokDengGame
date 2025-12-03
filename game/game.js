
function getScore(hand) {
    // Helper function to get the value of a card
    const getVal = card => {
        if (card.rank === "Ace") return 1;
        else if (["Jack", "Queen", "King", "10"].includes(card.rank)) return 0;
        else return parseInt(card.rank, 10);
    };
    // Return the score 
    // I try to read rule from online source
    // I still don't get I think it will consider only last digit not the total value
    return (getVal(hand[0]) + getVal(hand[1])) % 10;
}

function getHand(hand) {
    return `${hand[0].suit}-${hand[0].rank}, ${hand[1].suit}-${hand[1].rank}`;
}

module.exports = { getScore, getHand };