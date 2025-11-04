const totalGames = 20
let gamesPlayed = 1

let humanScore = 0
let computerScore = 0

function getComputerChoice() {
    let rand = Math.floor(Math.random() * 3) + 1
    const compHand = ["Rock", "Paper", "Scissors"][rand - 1].toUpperCase()

    return compHand
}

function getHumanChoice() {
    let humanHand = prompt("Choose your hand!").toUpperCase()

    return humanHand
}

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
        roundScore = [1, 0]
    } else {
        console.log("You lose! " + humanHand + " lost against " + compHand)
        roundScore = [0, 1]
    }
    
    return roundScore
}

function game(){

    playerScore = [0 , 0] // [HUMAN SCORE, COMPUTER SCORE]
    
    
    while (gamesPlayed < totalGames) {
        console.log("=== ROUND " + gamesPlayed + " ===")
        
        let humanChoice = getHumanChoice()
        let computerChoice = getComputerChoice()
       
        if (humanChoice === computerChoice) {
            console.log("Game tie.")
        } else {
            playerScore = playerScore.map((val, i) => val + playRound(humanChoice, computerChoice)[i])

            //console.log(playerScore)
        }

        console.log("RUNNING TALLY: HUMAN: " + playerScore[0] + " | COMPUTER: " +playerScore[1])

        if (playerScore[0] === 5) {
            console.log("Human is overall Winner. Refresh to play again")
            break
        } else if ( playerScore[1] === 5) {
            console.log("Computer is overall Winner. Refresh to play again")
            break
        }

        gamesPlayed++

    }
        

}

game()
