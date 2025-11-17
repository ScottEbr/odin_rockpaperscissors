const totalGames = 20
let gamesPlayed = 1

let humanScore = 0
let computerScore = 0

function getComputerChoice() {
    let rand = Math.floor(Math.random() * 3) + 1
    const compHand = ["Rock", "Paper", "Scissors"][rand - 1].toUpperCase()

    return compHand
}

// function getHumanChoice() {
//     let humanHand = prompt("Choose your hand!").toUpperCase()

//     return humanHand
// }

function playRound(humanHand, compHand){
    let gameMessage = ""
    let playerScore = 0
    let computerScore = 0
    roundScore = [0, 0]
    
    if (humanHand == 'ROCK' && compHand == 'SCISSORS' || 
        humanHand == 'PAPER' && compHand == 'ROCK' || 
        humanHand == 'SCISSORS' && compHand == 'PAPER')  
        {
        console.log("You win! " + humanHand + " beats " + compHand)
        document.getElementById("resultsComment").innerText = "You win! " + humanHand + " beats " + compHand; 
        roundScore = [1, 0]
    } else {
        console.log("You lose! " + humanHand + " lost against " + compHand)
        document.getElementById("resultsComment").innerText = "You lose! " + humanHand + " lost against " + compHand; 
        roundScore = [0, 1]
    }
    
    return roundScore
}

let playerScore = [0 , 0] // [HUMAN SCORE, COMPUTER SCORE]
let revertTimeout;

function game(humanChoice){   
    
        
    console.log("=== ROUND " + gamesPlayed + " ===")
    document.getElementById("roundCount").innerText = "Round: " + gamesPlayed
    
    // Handle loading dots, change to computer choice on button press
    let computerChoice = getComputerChoice()
    
    const loaderDiv = document.querySelector(".computer .loader");
    
    if (revertTimeout) clearTimeout(revertTimeout);

    if (loaderDiv) {
        loaderDiv.classList.remove("loader");
        loaderDiv.innerText = computerChoice;
        loaderDiv.classList.add("resultText");
    } else {
        const resultDiv = document.querySelector(".computer .resultText");
        resultDiv.innerText = computerChoice;
    }

    revertTimeout = setTimeout(() => {
    const divToRestore = document.querySelector(".computer .resultText");
    if (divToRestore) {
        divToRestore.classList.remove("resultText");
        divToRestore.classList.add("loader");
        divToRestore.innerText = "";
    }
    }, 3000);
  
    
    if (humanChoice === computerChoice) {
        console.log("Game tie.")
        document.getElementById("resultsComment").innerText = "Game tie.";
    } else {
        playerScore = playerScore.map((val, i) => val + playRound(humanChoice, computerChoice)[i])
    }

    updateScoreUI();
    console.log("RUNNING TALLY: HUMAN: " + playerScore[0] + " | COMPUTER: " +playerScore[1])

    if (playerScore[0] === 5) {
        console.log("Human is overall Winner. Refresh to play again")
        disableButtons()
        showModal("You WON!")
    } else if ( playerScore[1] === 5) {
        console.log("Computer is overall Winner. Refresh to play again")
        disableButtons()
        showModal("You lost...")
    }

    gamesPlayed++
}

function resetGame() {
    playerScore = [0, 0];
    gamesPlayed = 1;

    // Reset scores in UI
    document.getElementById("playerScoreText").innerText = "PLAYER: 0";
    document.getElementById("computerScoreText").innerText = "COMPUTER: 0";
    document.getElementById("roundCount").innerText = "Round: 0";
    document.getElementById("resultsComment").innerText = "Waiting for first game...";

    // Re-enable buttons
    document.querySelectorAll(".choice-btn").forEach(btn => btn.disabled = false);

    // Reset loader div
    const divToRestore = document.querySelector(".computer .resultText");
    if (divToRestore) {
        divToRestore.classList.remove("resultText");
        divToRestore.classList.add("loader");
        divToRestore.innerText = "";
    }
}

// End game handling + pop up box setup
const modal = document.querySelector(".modal")
const playAgainBtn = modal.querySelector(".playBtn");

function showModal(message) {
    modal.querySelector("h1").innerText = message;
    modal.classList.add("active"); // trigger CSS transition
}

function hideModal() {
    modal.classList.remove("active"); // fade out
}

// Play Again button
playAgainBtn.addEventListener("click", () => {
    hideModal();
    resetGame();
});





// UI score update

function updateScoreUI() {
    document.getElementById("playerScoreText").innerText = "PLAYER: " + playerScore[0];
    document.getElementById("computerScoreText").innerText = "COMPUTER: " + playerScore[1];
}


function disableButtons() {
    document.querySelectorAll(".choice-btn").forEach(btn => {
        btn.disabled = true;
    });
}

document.querySelector("#rockBtn").addEventListener("click", () => {game("ROCK");});
document.querySelector("#paperBtn").addEventListener("click", () => {game("PAPER");});
document.querySelector("#scissorsBtn").addEventListener("click", () => {game("SCISSORS");});
