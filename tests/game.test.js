const { createDeck } = require("../game/deck");
const { getScore, getHand } = require("../game/game");

describe("Deck tests", () => {
    test("createDeck returns 52 unique cards", () => {
        const deck = createDeck();
        expect(deck.length).toBe(52);

        // Check for unique cards
        const cardStrings = deck.map(c => `${c.suit}-${c.rank}`);
        const uniqueCards = new Set(cardStrings);
        expect(uniqueCards.size).toBe(52);
    });

    test("Deck contains predefine suits and ranks", () => {
        const suits = ["Hearts", "Diamonds", "Clubs", "Spades"];
        const ranks = ["Ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King"];
        const deck = createDeck();

        deck.forEach(card => {
            expect(suits).toContain(card.suit);
            expect(ranks).toContain(card.rank);
        });
    });
});

describe("Game tests", () => {
    test("getScore computes correct score", () => {
        // Test cases: [card1, card2, expectedScore]
        const cases = [
            [{ rank: "Ace" }, { rank: "9" }, 0],    // 1 + 9 = 10 = 0
            [{ rank: "2" }, { rank: "3" }, 5],      // 2 + 3 = 5  = 5
            [{ rank: "King" }, { rank: "10" }, 0],  // 0 + 0 = 0
            [{ rank: "7" }, { rank: "8" }, 5],      // 7 + 8 = 15 = 5
        ];

        cases.forEach(([c1, c2, expected]) => {
            expect(getScore([c1, c2])).toBe(expected);
        });
    });

    test("getHand returns string representation", () => {
        // Test case for hand
        const hand = [
            { suit: "Hearts", rank: "Ace" },
            { suit: "Spades", rank: "10" }
        ];
        expect(getHand(hand)).toBe("Hearts-Ace, Spades-10");
    });
});
