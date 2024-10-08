import React, { useState, useEffect } from 'react';
import { createOrUpdateScore, getScoresByUser } from '../../services/scores';
import Cell from '../Cell/Cell';
import './Round.css';
import { jwtDecode } from 'jwt-decode';

const parseCell = (cell) => {
  const parts = cell.split('_');
  return {
    round: parts[0],
    column: parseInt(parts[1], 10),
    row: parseInt(parts[2], 10),
    cellType: (parts[0] === 'J')
    ? 'Jeopardy'
    : (parts[0] === 'DJ')
      ? 'Double Jeopardy'
      : 'Final Jeopardy'
  };
};

const Round = ({ roundData, userId, gameId, roundType, selectedCell, setSelectedCell, userScore }) => {
  const [wager, setWager] = useState('');
  const [error, setError] = useState('');

  const handleCellClick = (cell) => {
    if (selectedCell !== cell) {
      setSelectedCell({ ...cell, roundType });
      setWager('');
    }
  };

  const handleScoreUpdate = async (value) => {
    if (!selectedCell) return;

    const points = roundType === 'Jeopardy' ? selectedCell.row * 200 : selectedCell.row * 400;

    let newScore;
    if (selectedCell.cellType === 'Final Jeopardy') {
      newScore = value === 'Correct' ? parseInt(wager, 10) : value === 'Incorrect' ? -parseInt(wager, 10) : 0;
    } else {
      newScore = value === 'Correct' ? points : value === 'Incorrect' ? -points : 0;
    }

    try {
      const token = localStorage.getItem('token');
      const { id: userId } = jwtDecode(token);
      await createOrUpdateScore(userId, gameId, dollar);
    } catch (error) {
      console.error('Failed to update score:', error);
    }

    setTimeout(() => setSelectedCell(null), 0);
  };

  const handleWagerChange = (event) => {
    const value = parseInt(event.target.value, 10);
    
    if (value > userScore) {
      setError('Wager cannot exceed your current score.');
    } else if (value < 0) {
      setError('Wager cannot be negative.');
    } else {
      setError('');
      setWager(value);
    }
  };
  
  let maxRow = 0;
  let maxColumn = 0;
  if (roundData?.cells) {
    roundData.cells.forEach((cell) => {
      const parsedCell = parseCell(cell);
      if (parsedCell.row > maxRow) maxRow = parsedCell.row;
      if (parsedCell.column > maxColumn) maxColumn = parsedCell.column;
    });
  }

  const grid = Array.from({ length: maxRow }, () => Array(maxColumn).fill(null));

  if (roundData?.cells) {
    roundData.cells.forEach((cell, index) => {
      const parsedCell = parseCell(cell);
      const { column, row } = parsedCell;
      grid[row - 1][column - 1] = {
        clue: roundData.clues[index],
        response: roundData.responses[index],
        cellType: parsedCell.cellType,
      };
    });
  }

  return (
    <div className="round-container">
      <h3>{roundType}</h3>
      <table className="round-table">
        <thead>
          <tr>
            {roundData?.categories?.map((category, index) => (
              <th key={index}>
                {category}
                <div>{roundData.categoryComments[index]}</div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {grid.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, columnIndex) => (
                <Cell
                  key={columnIndex}
                  cell={cell}
                  selectedCell={selectedCell}
                  handleCellClick={handleCellClick}
                  handleScoreUpdate={handleScoreUpdate}
                  rowIndex={rowIndex}
                  columnIndex={columnIndex}
                  wager={wager}
                  handleWagerChange={handleWagerChange}
                  roundType={roundType}
                  userScore={userScore}
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {roundType !== 'Final Jeopardy' && (
        <button onClick={() => onComplete(roundType)}>Complete {roundType}</button>
      )}
    </div>
  );  
};

export default Round;
