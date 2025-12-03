const { spawn } = require("child_process");

test("playRound CLI test", done => {
    const game = spawn("node", ["index.js"]);

    let output = "";

    game.stdout.on("data", data => {
        output += data.toString();

        if (output.includes("Please put your bet:")) {
            game.stdin.write("10\n");
        }

        if (output.includes("Wanna play more")) {
            game.stdin.write("no\n");
        }
    });

    game.on("close", () => {
        expect(output).toMatch(/You got total [-+]?\d+ chips/);
        done();
    });
});

test("play 2 rounds CLI test", done => {
    const game = spawn("node", ["index.js"]);
    let output = "";
    let roundCount = 0;
    game.stdout.on("data", data => {
        output += data.toString();
        if (output.includes("Please put your bet:")) {
            roundCount++;
            game.stdin.write("5\n");
        }

        if (output.includes("Wanna play more")) {
            if (roundCount < 2) {
                game.stdin.write("yes\n");
            } else {
                game.stdin.write("no\n");
            }
        }
    });
    game.on("close", () => {
        const occurrences = (output.match(/You got/g) || []).length;
        const ttlchip = (output.match(/You got total [-+]?\d+ chips/) || []).length;
        expect(ttlchip).toBe(1);
        expect(occurrences).toBe(2);
        done();
    });
});