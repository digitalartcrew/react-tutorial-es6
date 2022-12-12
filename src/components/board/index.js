import React, { useState } from "react";
import Square from "../square";

const Board = () => {
  // set default state to null
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXisNext] = useState(true);
  const [status, setStatus] = useState(`Next player: ${xIsNext ? "X" : "O"}`);

  const handleClick = (i) => {
    // make a copy of board
    const updatedSquares = squares.slice();

    if (squares[i]) {
      return;
    }

    // update a value on the board
    updatedSquares[i] = xIsNext ? "X" : "O";

    // set board with new values
    setSquares(updatedSquares);

    const isWinner = calculateWinner(updatedSquares);
    // calculate a winner before allowing another move or is square is already taken
    if (isWinner) {
      setStatus(`Winner: ${isWinner}`);
      return;
    }

    // change player
    setXisNext(!xIsNext);
    setStatus(`Next player: ${xIsNext ? "O" : "X"}`);
  };

  const calculateWinner = (squares) => {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < winningCombinations.length; i++) {
      // destructure values from each combination
      const [a, b, c] = winningCombinations[i];

      // true && expression always execute to an expression and false && expression always evaluates to false
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[b] === squares[c] &&
        squares[c]
      ) {
        // if all these are true, then return the winner as the first value in the sequence
        return squares[a];
      }
    }

    return null;
  };

  const renderSquare = (i) => (
    <Square value={squares[i]} onClick={() => handleClick(i)} />
  );

  return (
    <div>
      <div className="status">{status}</div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
};

export default Board;
