let messages = {
    "kei1245": ["(pet your puppi first)","...arf!","Keiiiiiiiii!!!!","Hello there~~!", "Ok. So here's my reply...", "first of all, *drumroll plz*", "HAPPY 6 MONTHS!! YAYYY!!!!!!!", "Thank you for all the efforts you put in","Thank you for accepting me","Thank you for being there for me","Thank you for being patient with me", "And thank you for being the best boyfriend ever!", "You're mine!!","I loooove youuuuu","p.s. yes, this is the very first time i've coded something for someone...", "you have taken my first!!!!!! Scandalous!!!"]
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
    let cloudCount = 9; // Number of clouds
    let body = document.body;
    let placedClouds = []; // Store placed cloud positions

    for (let i = 0; i < cloudCount; i++) {
        let cloud = document.createElement("img");
        cloud.src = "cloud.png";
        cloud.classList.add("floating-cloud");

        let startX, startY;
        let isOverlapping;

        // Keep trying until a non-overlapping position is found
        do {
            isOverlapping = false;
            startX = Math.random() * window.innerWidth; // Random X position
            startY = Math.random() * (window.innerHeight * 0.8); // Random Y position

            // Check for overlap with previously placed clouds
            for (let j = 0; j < placedClouds.length; j++) {
                let other = placedClouds[j];
                let distance = Math.sqrt(Math.pow(startX - other.x, 2) + Math.pow(startY - other.y, 2));

                if (distance < 150) { // Minimum distance between clouds (adjust as needed)
                    isOverlapping = true;
                    break;
                }
            }
        } while (isOverlapping); // Repeat until a valid position is found

        // Store the cloud's position
        placedClouds.push({ x: startX, y: startY });

        // Set position before adding to DOM to prevent flickering
        cloud.style.position = "absolute";
        cloud.style.left = `${startX}px`;
        cloud.style.top = `${startY}px`;

        // Append to body *after* setting position to avoid movement flickers
        body.appendChild(cloud);

        // Randomize up/down float speed for variety
        let verticalSpeed = Math.random() * 5 + 3; // Slow up/down (5-13s)

        cloud.style.animation = `floatUpDown ${verticalSpeed}s ease-in-out infinite alternate`;
    }
}

// Run this function when page loads
document.addEventListener("DOMContentLoaded", createFloatingClouds);

function enablePetting() {
    let character = document.getElementById("character");

    // Prevents touch gestures from affecting the page
    document.addEventListener("touchmove", function (e) {
        e.preventDefault(); // Stops scrolling
    }, { passive: false });

    // Detect if it's a mobile device
    let isMobile = "ontouchstart" in window || navigator.maxTouchPoints > 0;

    if (isMobile) {
        character.addEventListener("touchstart", function (e) {
            e.preventDefault(); // Prevents accidental scrolling
            isPetting = true;
            startPettingTimer();
            spawnPettingHearts();
        });

        character.addEventListener("touchend", function () {
            isPetting = false;
            clearTimeout(pettingTimer);
        });
    } else {
        // Desktop version (hover-based)
        character.addEventListener("mouseenter", function () {
            isPetting = true;
            startPettingTimer();
            spawnPettingHearts();
        });

        character.addEventListener("mouseleave", function () {
            isPetting = false;
            clearTimeout(pettingTimer);
        });
    }
}

// Run this when the page loads
document.addEventListener("DOMContentLoaded", enablePetting);

function adjustForMobile() {
    let characterContainer = document.querySelector(".character-container");

    if (window.innerWidth < 600) { // Mobile screens
        characterContainer.style.top = "45vh"; // Moves up slightly for better fit
    } else {
        characterContainer.style.top = "50%"; // Standard centering on desktop
    }
}

// Run function on page load and when screen resizes
window.addEventListener("resize", adjustForMobile);
document.addEventListener("DOMContentLoaded", adjustForMobile);
