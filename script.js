let music = new Audio("game.mp3");
music.loop = true; // Enable looping

// Game logic
let audioTurn = new Audio("Place.mp3.mp3");
let gameover = new Audio("gameover.mp3.mp3");
let turn = "X";
let isgameover = false;

// Function to change the turn
const changeTurn = () => {
    return turn === "X" ? "0" : "X";
};

// Function to check for a win
const checkWin = () => {
    let boxtext = document.getElementsByClassName('boxtext');
    let wins = [
        [0, 1, 2, 5, 5, 0],
        [3, 4, 5, 5, 15, 0],
        [6, 7, 8, 5, 25, 0],
        [0, 3, 6, -5, 15, 90],
        [1, 4, 7, 5, 15, 90],
        [2, 5, 8, 15, 15, 90],
        [0, 4, 8, 5, 15, 45],
        [2, 4, 6, 5, 15, 135],
    ];
    wins.forEach(e => {
        if ((boxtext[e[0]].innerText === boxtext[e[1]].innerText) &&
            (boxtext[e[2]].innerText === boxtext[e[1]].innerText) &&
            (boxtext[e[0]].innerText !== "")) {
            document.querySelector('.info').innerText = boxtext[e[0]].innerText + " Won";
            gameover.play();
            isgameover = true;

            // Display winner image
            if (boxtext[e[0]].innerText === "X") {
                document.querySelector(".imgbox").getElementsByTagName("img")[0].src = "victory.gif"; // X wins
            } else {
                document.querySelector(".imgbox").getElementsByTagName("img")[0].src = "victory1.gif"; // O wins
            }
            document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width = "200px";
            document.querySelector(".line").style.transform = `translate(${e[3]}vw, ${e[4]}vw) rotate(${e[5]}deg)`;
            document.querySelector(".line").style.width = "20vw";
        }
    });
};

// Game Logic
let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach(element => {
    let boxtext = element.querySelector('.boxtext');
    element.addEventListener('click', () => {
        // Ignore clicks if the game is over
        if (isgameover) return;

        if (boxtext.innerText === '') {
            boxtext.innerText = turn; // Mark the box            
            audioTurn.play();         // Play the audio for the turn
            turn = changeTurn();      // Switch the turn
            checkWin();               // Check for a winner

            // Update the turn information if the game is not over
            if (!isgameover) {
                document.getElementsByClassName("info")[0].innerText = "Turn for " + turn;
            }
        }
    });
});


// Add onclick listener to reset button
reset.addEventListener('click', () => {
    let boxtexts = document.querySelectorAll('.boxtext');
    Array.from(boxtexts).forEach(element => {
        element.innerText = "";
    });
    turn = "X";
    isgameover = false;
    document.querySelector(".line").style.width = "0vw";
    document.getElementsByClassName("info")[0].innerText = "Turn for " + turn;
    document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width = "0px";
});

// Start Music 
document.getElementById('startMusic').addEventListener('click', () => {
    music.play(); // Start playing the music
});

// Stop Music 
document.getElementById('stopMusic').addEventListener('click', () => {
    music.pause(); // Pause the music
    music.currentTime = 0; // Reset the music to start
});
