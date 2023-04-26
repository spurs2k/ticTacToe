const App = {
    // Selected HTML elements
    $: {
        menu: document.querySelector('[data-id="menu"]'),
        menuItems: document.querySelector('[data-id="menu-items"]'),
        resetBtn: document.querySelector('[data-id="reset-btn"]'),
        newRoundBtn: document.querySelector('[data-id="new-round-btn"]'),
    },

    // ES6 syntax shorthand way to define a function property on App object. Placing the event listiner here allows me to control when I initialize the app
    init() {
        App.$.menu.addEventListener("click", (event) => {
            App.$.menuItems.classList.toggle("hidden");
        });
    },
};

window.addEventListener("load", App.init);