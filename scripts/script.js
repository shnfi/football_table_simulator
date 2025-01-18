const body = document.querySelector("body");

/*
 * showig the 'simulate' button at the startup
 */

const starting_screen = document.createElement("div");
starting_screen.className = "starting_screen";

body.appendChild(starting_screen);

// button creation 

const simulate_button = document.createElement("button");
simulate_button.innerHTML = "Simulate!";
simulate_button.className = "simulate_button";
simulate_button.addEventListener("click", () => {
    starting_screen.style.opacity = "0";
    simulate_button.style.opacity = "0";
    
    setTimeout(() => {
        body.removeChild(starting_screen);
        body.removeChild(simulate_button);
    }, 400);
})

body.appendChild(simulate_button);