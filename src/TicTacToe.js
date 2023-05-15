import './index.css';
import { useState, useEffect } from 'react';
import CirclePawn from './components/CirclePawn';
import XPawn from './components/XPawn';
import WinnerPaths from './data-rules/WinnerPaths';
import MinimumPawns from './data-rules/MinimumPawns';
import InitialBlocks from './data-rules/InitialBlocks';
import Pawns from './data-rules/Pawns';

const TicTacToe = () => {
    const [circle, x] = Pawns;
    const [currentPlayer, setCurrentPlayer] = useState(circle);
    const [blocks, setBlocks] = useState(InitialBlocks);
    const [winner, setWinner] = useState("");

    const refreshGame = () => {
        setCurrentPlayer(circle);
        setBlocks(InitialBlocks);
        setWinner("");
    }

    useEffect(() => {
        if(winner === "") {
            let currentTotalPawn = 0;
            blocks.map((block) => {
                if(block !== false) currentTotalPawn += 1;
            })
    
            if(currentTotalPawn >= MinimumPawns) {
                WinnerPaths.forEach((wp) => {
                    let i = 0;
                    while (i < wp.length - 1) {
                        if (blocks[wp[i]] !== blocks[wp[i + 1]]) {
                            break;
                        }
                        i++;
                        if (i === wp.length - 1) {
                            if(blocks[wp[i]] !== false) {
                                setTimeout(() => {
                                    setWinner(blocks[wp[i]]);
                                }, 5);
                            }
                        }
                    }
                });
            };
        }
    }, [blocks])

    const handleClick = (index) => {
        if(winner === "") {

            if(blocks[index] === false) {
                const newBlocks = [...blocks];
                newBlocks[index] = currentPlayer;
                setBlocks(newBlocks);
                setCurrentPlayer(currentPlayer == circle ? x : circle);
            }
        }
    }

    const element = (
        <>
            <div id="game-container">
                <div id="tic-tac-toe-grid">
                    {blocks.map((block, index) => {
                        return (
                            <div key={index} id="tic-tac-toe-block" onClick={() => handleClick(index)}>
                                {block !== false ? (block === circle ? <CirclePawn /> : <XPawn />) : ""}
                            </div>
                        )
                    })}
                </div>
                <button id="restart-game-btn" onClick={refreshGame}>Restart</button>
                <h1 id="winner-text">{winner !== "" ? `Player ${winner} win!` : ""}</h1>
                <div id="footer">
                    <p>Created by MalvinVal</p>
                    <p>View the source code <a href='https://github.com/malvinval/tic-tac-toe'>here</a>.</p>
                </div>
            </div>
        </>
    );

    return element;
}

export default TicTacToe;
