import React, { useState, useEffect } from 'react';

const TicTacToe = () => {
  // State for blue player's score, defaulting to zero or value from localStorage
  const [blueScore, setBlueScore] = useState(() => {
    const storedBlueScore = localStorage.getItem('blueScore');
    return storedBlueScore ? parseInt(storedBlueScore, 10) : 0;
  });

  // State for red player's score, defaulting to zero or value from localStorage
  const [redScore, setRedScore] = useState(() => {
    const storedRedScore = localStorage.getItem('redScore');
    return storedRedScore ? parseInt(storedRedScore, 10) : 0;
  });

  // State for the game board
  const [board, setBoard] = useState(Array(9).fill(null));

  // State to track whose turn it is (true for blue, false for red)
  const [isBlueTurn, setIsBlueTurn] = useState(true);

  // State to track the winner (null for no winner, 'X' or 'O' for respective winner, 'draw' for a draw)
  const [winner, setWinner] = useState(null);

  // Effect to update localStorage when blueScore or redScore changes
  useEffect(() => {
    localStorage.setItem('blueScore', blueScore.toString());
  }, [blueScore]);

  useEffect(() => {
    localStorage.setItem('redScore', redScore.toString());
  }, [redScore]);

  // Function to calculate the winner based on the current board state
  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a]; // Return the winner if there is one
      }
    }

    return null; // Return null if there is no winner
  };

  // Function to check if the board is full (indicating a draw)
  const isBoardFull = () => {
    return board.every((cell) => cell !== null);
  };

  // Function to handle square clicks
  const handleClick = (index) => {
    if (winner || board[index]) return; // If there's already a winner or the square is already filled, do nothing

    const newBoard = [...board];
    newBoard[index] = isBlueTurn ? 'X' : 'O'; // Fill the square with 'X' for blue and 'O' for red
    setBoard(newBoard);
    setIsBlueTurn(!isBlueTurn); // Toggle the turn to the next player
  };

  // Function to reset the game
  const resetGame = () => {
    setBoard(Array(9).fill(null)); // Reset the board to empty squares
    setIsBlueTurn(true); // Set the turn back to blue
    setWinner(null); // Reset the winner to null
  };

  // Effect to determine the winner or if it's a draw when the board changes
  useEffect(() => {
    const winner = calculateWinner(board);
    if (winner) {
      setWinner(winner); // Set the winner if there is one
      if (winner === 'X') {
        setBlueScore((prevScore) => prevScore + 1);
      } else {
        setRedScore((prevScore) => prevScore + 1);
      }
    } else if (isBoardFull()) {
      setWinner('draw'); // Set the winner to 'draw' if the board is full (indicating a draw)
    }
  }, [board]); // Re-run the effect when the board changes

  // JSX for rendering the Tic Tac Toe game
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-200">
      {/* Display scores for blue and red players */}
      <div className="text-center mb-8">
        <p className="text-3xl font-bold text-blue-600">Blue Score: {blueScore}</p>
        <p className="text-3xl font-bold text-red-600">Red Score: {redScore}</p>
      </div>

      {/* Display winner or next player */}
      <div className="text-center mb-8">
        <p className="text-3xl font-bold">
          {winner ? (winner === 'draw' ? 'Draw' : `Winner: ${winner === 'X' ? 'Blue' : 'Red'}`) : `Next player: ${isBlueTurn ? 'Blue' : 'Red'}`}
        </p>
      </div>

      {/* Render the game board */}
      <div className="grid grid-cols-3 gap-4">
        {board.map((cell, index) => (
          <button
            key={index}
            className="w-20 h-20 bg-white hover:bg-gray-300 text-4xl font-bold focus:outline-none rounded"
            onClick={() => handleClick(index)}
          >
            {cell}
          </button>
        ))}
      </div>

      {/* Reset button to start a new game */}
      <button
        className="mt-8 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none"
        onClick={resetGame}
      >
        Reset Game
      </button>
    </div>
  );
};

export default TicTacToe;
