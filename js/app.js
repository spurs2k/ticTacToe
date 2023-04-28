const App = {
    // Selected HTML elements
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

                // Check if there is already a play, and if so, return early. square instead of event to avoid multiple plays per square
                if (square.hasChildNodes()) {
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
                    playerId: currentPlayer
                });

                App.state.currentPlayer = currentPlayer === 1 ? 2 : 1

                console.log(App.state);


                square.replaceChildren(icon);

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


            });
        });
    },
};

window.addEventListener("load", App.init);