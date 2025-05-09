import { useState } from "react";

function Square({ value, onSquareClick }) {
  return <button className="square" onClick={onSquareClick}>{value}</button>;
}

function GameDescription() {
  return (
    <div className="description">
      <h1>What is this?</h1>
      <p>This is the game of x's and o's</p>
    </div>
  );
}

function Board({ xIsNext, squares, onPlay }) {

  function handleClick(i) {

    if(squares[i] || calculateWinner(squares)) {
      return;
    }

    const nextSquares = squares.slice();
    
    if(xIsNext) {
      nextSquares[i] = 'X';
      console.log("it's an X")
    } else {
      nextSquares[i] = 'O';
      console.log("it's an O")
    }
    
    onPlay(nextSquares);

    console.log(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
    // should also add a counter for "x wins" and "y wins"
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O")
  }

  return (
    <>
    <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)}/>
        <Square value={squares[2]} onSquareClick={() => handleClick(2)}/>
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)}/>
        <Square value={squares[4]} onSquareClick={() => handleClick(4)}/>
        <Square value={squares[5]} onSquareClick={() => handleClick(5)}/>
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)}/>
        <Square value={squares[7]} onSquareClick={() => handleClick(7)}/>
        <Square value={squares[8]} onSquareClick={() => handleClick(8)}/>
      </div>
    </>
  );
}

export default function Game() {
    
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0; /* <——— STATE VARIABLE */ 
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    console.log(currentMove);
  }

  function resetGame() {
    // if the reset button is clicked, remove all of the history list items
    setHistory([Array(9).fill(null)]);
    setCurrentMove(0);
  }

  function jumpTo(nextMove) {
    // ME: if description == 'Reset game' set current move to nextMove, but also clear the move history buttons
    // CHAT: if the history button you clicked on has the key of 0 then reset the game (see function above) -> that means clear board(setCurrentMove) and turn history array to all null(setHistory)
    if(nextMove === 0) {
      resetGame();
    } else {
      setCurrentMove(nextMove);
    }
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Reset game';
    }

    return (
      <>
        <li key={move}>
          <button onClick={() => jumpTo(move)}>{description}</button>
        </li>
      </>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
      <GameDescription />
    </div>
  );

  
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
