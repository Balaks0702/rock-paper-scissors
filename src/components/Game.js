import React, {Component} from "react";
import './Game.css';

class Game extends Component{
    constructor(props) {
        super(props)

        this.state = {
            playerVal: null, playerScore: 0, 
            pcVal: null, pcScore:0, 
            winner: "",
        };
    }

    //logic to determine the winner
    logic = (playerVal, pcVal) => {
        if (playerVal === pcVal) {
            return 0; // Tie
        }

        if (
            (playerVal === "ROCK" && pcVal === "SCISSORS") ||
            (playerVal === "SCISSORS" && pcVal === "PAPER") ||
            (playerVal === "PAPER" && pcVal === "ROCK")
        ) {
            return 1; // Player wins
        }
        return -1; // Computer wins
    };

    //handle user decision and return results
    decision = (playerChoice) => {
        const choices = ["ROCK", "PAPER", "SCISSORS"];
        //randomizing computer choice
        const pcChoice = choices[Math.floor(Math.random() * choices.length)];
        //calling logic func
        const result = this.logic(playerChoice, pcChoice);
        
        this.setState((prevState) => {
            //current choices
            const updatedState = {
                playerVal: playerChoice,
                pcVal: pcChoice,
            };

            if (result === 1) { 
                //if player wins
                updatedState.playerScore = prevState.playerScore + 1;
                updatedState.winner = "You win!";
            } else if (result === -1) { 
                //if pc wins
                updatedState.pcScore = prevState.pcScore + 1;
                updatedState.winner = "You lost...";
            } else { 
                //if its a tie
                updatedState.winner = "It's a tie!";
            }

            return updatedState;
        });
    };

    render() {
        const {playerVal, playerScore, pcVal, pcScore, winner} = this.state;

        return (
            <div className="game">
                <div>
                    <h1>Rock - Paper - Scissors</h1>
                    <div>
                        <button onClick={ () => this.decision("ROCK")}>Rock</button>
                        <button onClick={ () => this.decision("PAPER")}>Paper</button>
                        <button onClick={ () => this.decision("SCISSORS")}>Scissors</button>
                    </div>
                </div>

                <div className="winner">
                    <div className="choices">
                        <p>Your choice: {playerVal}</p>
                        <p>PC's choice: {pcVal}</p>
                    </div>

                    <div className="result">
                        <h2>{winner}</h2>
                        <h4>Your Score: {playerScore}</h4>
                        <h4>PC Score: {pcScore}</h4>
                    </div>

                </div>
            </div>
        );
    }
}

export default Game;