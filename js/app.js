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
        currentPlayer: 1,
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
                const currentPlayer = App.state.currentPlayer;

                const icon = document.createElement("i");

                if (currentPlayer === 1) {
                    icon.classList.add('fa-solid', 'fa-x', 'yellow');
                } else {
                    icon.classList.add('fa-solid', 'fa-o', 'turquoise');
                }

                App.state.currentPlayer = App.state.currentPlayer === 1 ? 2 : 1

                square.replaceChildren(icon);


            });
        });
    },
};

window.addEventListener("load", App.init);