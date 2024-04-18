import { useState } from "react";
import Square from "./square";

export default function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsnext, setXIsNext] = useState(true);
  const winner = calculateWinner(squares);
  let status;
  if (winner) status = `Winner: ${winner}`;

  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) return;
    const nextSquares = squares.slice();
    xIsnext ? nextSquares[i] = 'X' : nextSquares[i] = 'O';
    setXIsNext(!xIsnext);
    setSquares(nextSquares);
  }

  function resetGame() {
    setSquares(Array(9).fill(null))
  }

  function showStatus() {
    const canPlay = squares.includes(null);
    if (winner || !canPlay) {
      return (
        <div className="status">
          <b>{status}</b>
          <button onClick={resetGame}>Reset</button>
        </div>
      )
    }
  }

  return (
    <>
      {showStatus()}
      <div className="board-container">
        {
          squares.map((square, index) => {
            return (
              <Square key={index} value={squares[index]} onSquareClick={() => handleClick(index)} />
            )
          })
        }
      </div>
    </>
  )
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
