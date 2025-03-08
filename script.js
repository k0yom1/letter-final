let messages = {
    "kei1245": ["(pet your puppi first)","...arf!","Keiiiiiiiii!!!!","Hello there~~!", "Ok. So here's my reply...", "first of all, *drumroll plz*", "HAPPY 6 MONTHS!! YAYYY!!!!!!!", "Thank you for all the efforts you put in","Thank you for accepting me","Thank you for being there for me","Thank you for being patient with me", "And thank you for being the best boyfriend ever!", "I loooove youuuuu","p.s. yes, this is the very first time ive coded something for someone...", "you have taken my first!!!!!! Scandalous!!!"]
};

let currentMessages = [];
let currentIndex = 0;

// Attach event listener to the dialogue box
document.addEventListener("DOMContentLoaded", function () {
    let dialogueBox = document.getElementById("dialogue-box");

    if (dialogueBox) {
        dialogueBox.addEventListener("click", nextDialogue);
    } else {
        console.error("Error: 'dialogue-box' not found in the DOM.");
    }
});

function openLetter() {
    let password = prompt("Please enter the password:");

    if (messages[password]) {
        currentMessages = messages[password];
        document.querySelector(".letter-container").classList.add("hidden");
        document.getElementById("game-screen").classList.remove("hidden");
        currentIndex = 0;
        displayDialogue();
    } else {
        alert("Wrong password! Try again.");
        openLetter();
    }
}

let pettingTimer; // Declare globally
let isPetting = false;

function displayDialogue() {
    let dialogueText = document.getElementById("dialogue-text");
    let nextIndicator = document.getElementById("next-indicator");
    let character = document.getElementById("character");

    if (dialogueText) {
        let message = currentMessages[currentIndex];
        dialogueText.innerText = message;
        nextIndicator.style.visibility = "visible"; // Show ▼ when message is displayed

        // Petting interaction for "(pet your puppi first)"
        if (message === "(pet your puppi first)") {
            nextIndicator.style.visibility = "hidden"; // Hide next indicator

            character.onmouseenter = function () {
                isPetting = true;
                startPettingTimer();
                spawnPettingHearts(); // Start spawning hearts
            };

            character.onmouseleave = function () {
                isPetting = false;
                clearTimeout(pettingTimer);
            };
        } else {
            character.onmouseenter = null;
            character.onmouseleave = null;
        }

        // Jump animation for "HAPPY 6 MONTHS!! YAYYY!!!!!!!"
        if (message === "HAPPY 6 MONTHS!! YAYYY!!!!!!!") {
            character.classList.add("jump-animation");
        } else {
            character.classList.remove("jump-animation");
        }

        // Create multiple hearts for "I loooove youuuuu"
        if (message === "I loooove youuuuu") {
            spawnHearts();
        }
    } else {
        console.error("Error: 'dialogue-text' not found in the DOM.");
    }
}

// Start timer to allow next dialogue after 3s
function startPettingTimer() {
    clearTimeout(pettingTimer); // Ensure no duplicate timers
    pettingTimer = setTimeout(() => {
        isPetting = false; // Stop petting effect
        nextDialogue(); // Automatically move to the next dialogue
    }, 3000);
}

// Spawn floating hearts around character while petting
function spawnPettingHearts() {
    if (!isPetting) return; // Stop if user is no longer hovering

    let character = document.getElementById("character");
    let gameScreen = document.getElementById("game-screen");

    let heart = document.createElement("img");
    heart.src = "heart.gif";
    heart.classList.add("heart");

    // Position near character
    let rect = character.getBoundingClientRect();
    let randomX = rect.left + Math.random() * rect.width - rect.width / 2;
    let randomY = rect.top + Math.random() * rect.height - rect.height / 2;

    heart.style.left = `${randomX}px`;
    heart.style.top = `${randomY}px`;

    gameScreen.appendChild(heart);

    // Remove heart after animation
    setTimeout(() => {
        heart.remove();
    }, 1500);

    // Keep spawning hearts every 300ms if still petting
    if (isPetting) {
        setTimeout(spawnPettingHearts, 300);
    }
}



function spawnHearts() {
    let gameScreen = document.getElementById("game-screen");

    for (let i = 0; i < 5; i++) {  // Create 5 hearts
        let heart = document.createElement("img");
        heart.src = "heart.gif";
        heart.classList.add("heart");

        // Randomize position
        let randomX = Math.random() * window.innerWidth * 0.6 + window.innerWidth * 0.2; // Keeps within bounds
        let randomY = Math.random() * window.innerHeight * 0.3 + window.innerHeight * 0.3;

        heart.style.left = `${randomX}px`;
        heart.style.top = `${randomY}px`;

        gameScreen.appendChild(heart);

        // Remove heart after animation ends
        setTimeout(() => {
            heart.remove();
        }, 1500);
    }
}




function nextDialogue() {
    let nextIndicator = document.getElementById("next-indicator");
    nextIndicator.style.visibility = "hidden"; // Hide ▼ when clicking

    currentIndex++;
    if (currentIndex < currentMessages.length) {
        displayDialogue();
    } else {
        alert("Thank you for reading this message :)");
        document.querySelector(".letter-container").classList.remove("hidden");
        document.getElementById("game-screen").classList.add("hidden");
        currentIndex = 0; // Reset everything
    }
}

function createFloatingClouds() {
    let cloudCount = 8; // Number of clouds
    let body = document.body;

    for (let i = 0; i < cloudCount; i++) {
        let cloud = document.createElement("img");
        cloud.src = "cloud.png";
        cloud.classList.add("floating-cloud");

        // Randomize starting position
        let startX = Math.random() * window.innerWidth;
        let startY = Math.random() * (window.innerHeight * 0.6); // Keeps them in the upper part

        cloud.style.left = `${startX}px`;
        cloud.style.top = `${startY}px`;

        body.appendChild(cloud);

        // Animate clouds to move sideways
        let speed = Math.random() * 60 + 60; // Random speed between 20-50s
        cloud.style.animation = `floatCloud ${speed}s linear infinite`;
    }
}

// Run this function when page loads
document.addEventListener("DOMContentLoaded", createFloatingClouds);
