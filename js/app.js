const App = {
    // All of the Selected HTML elements
    $: {
        menu: document.querySelector('[data-id="menu"]'),
        menuItems: document.querySelector('[data-id="menu-items"]'),
        resetBtn: document.querySelector('[data-id="reset-btn"]'),
        newRoundBtn: document.querySelector('[data-id="new-round-btn"]'),
        squares: document.querySelectorAll('[data-id="square"]'),
    },

    state: {
        moves: [],
    },

    getGameStatus(moves) {

        const p1Moves = moves.filter((move) => move.playerId === 1).map((move) => +move.squareId);
        const p2Moves = moves.filter((move) => move.playerId === 2).map((move) => +move.squareId);

        // Check for winner or tie game
        const winningPatterns = [
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9],
            [1, 5, 9],
            [3, 5, 7],
            [1, 4, 7],
            [2, 5, 8],
            [3, 6, 9],
        ];

        let winner = null;

        winningPatterns.forEach(pattern => {
            const p1Wins = pattern.every(v => p1Moves.includes(v));
            const p2Wins = pattern.every(v => p2Moves.includes(v));

            if (p1Wins) winner = 1;
            if (p2Wins) winner = 2;
        });

        return {
            status: moves.length === 9 || winner != null ? "complete" : "in-progress", // in-progress or complete?
            winner, // 1 | 2 | null
        };
    },

    // ES6 syntax shorthand way to define a function property on App object. Placing the event listiner here allows me to control when I initialize the app
    init() {
        App.registerEventListeners();
    },

    registerEventListeners() {
        App.$.menu.addEventListener("click", (event) => {
            App.$.menuItems.classList.toggle("hidden");
        });

        App.$.resetBtn.addEventListener("click", event => {
            console.log('Reset the game');
        });

        App.$.newRoundBtn.addEventListener("click", event => {
            console.log('Add a new round');
        });

        App.$.squares.forEach((square) => {
            square.addEventListener("click", (event) => {

                // Check if there is already a play, and if so, return early.
                const hasMove = (squareId) => {
                    const existingMove = App.state.moves.find((move) => move.squareId === squareId);
                    return existingMove !== undefined;
                };
                
                if (hasMove(+square.id)) {
                    return;
                };

                // Determines which player icon is added to the square
                const lastMove = App.state.moves.at(-1);
                const getOppositePLayer = (playerId) => (playerId === 1 ? 2 : 1);
                const currentPlayer = App.state.moves.length === 0 ? 1 : getOppositePLayer(lastMove.playerId);

                const icon = document.createElement("i");

                if (currentPlayer === 1) {
                    icon.classList.add('fa-solid', 'fa-x', 'yellow');
                } else {
                    icon.classList.add('fa-solid', 'fa-o', 'turquoise');
                }

                App.state.moves.push({
                    squareId: +square.id,
                    playerId: currentPlayer,
                });

                square.replaceChildren(icon);

                // Check if there is a winner or tie game
                const game = App.getGameStatus(App.state.moves);

                if (game.status === "complete") {
                    if (game.winner) {
                        alert(`Player ${game.winner} wins!`);
                    } else {
                        alert("Tie");
                    }
                }

            });
        });
    },
};

window.addEventListener("load", App.init);