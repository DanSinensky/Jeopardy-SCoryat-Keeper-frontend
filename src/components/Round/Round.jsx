import React, { useState, useEffect } from 'react';
import Cell from '../Cell/Cell';
import './Round.css';
import { updateScore } from '../../services/scores';

const Round = ({ roundData, userId, gameId, roundType, selectedCell, setSelectedCell, userScore, onComplete }) => {
  const [wager, setWager] = useState('');

  useEffect(() => {
    const allCellsRevealed = roundData.cells.every(row => Array.isArray(row) && row.every(cell => cell.revealed));
    if (allCellsRevealed && onComplete) {
      onComplete(roundType);
    }
  }, [roundData, roundType, onComplete]);

  const handleCellClick = (cell) => {
    setSelectedCell(cell);
  };

  const handleScoreUpdate = async (result) => {
    let scoreChange = 0;
    const cellValue = roundData.clues[selectedCell.row - 1][selectedCell.column - 1].value;

    if (roundType === 'Final Jeopardy') {
      scoreChange = result === 'Correct' ? wager : -wager;
    } else {
      scoreChange = result === 'Correct' ? cellValue : result === 'Incorrect' ? -cellValue : 0;
    }

    const newScore = userScore + scoreChange;
    
    try {
      await updateScore(gameId, userId, newScore);
    } catch (error) {
      console.error("Failed to update score:", error);
    }

    const updatedCells = roundData.cells.map((row, rowIndex) => 
      row.map((cell, colIndex) => 
        (rowIndex === selectedCell.row - 1 && colIndex === selectedCell.column - 1)
          ? { ...cell, revealed: true }
          : cell
      )
    );

    roundData.cells = updatedCells;
    setSelectedCell(null);
  };

  const handleWagerChange = (event) => {
    setWager(Number(event.target.value));
  };

  const parseCell = (cell) => {
    const parts = cell.split('_');
    return {
      round: parts[0],
      column: parseInt(parts[1], 10),
      row: parseInt(parts[2], 10),
      cellType: parts.length > 3 ? parts[3] : 'regular'
    };
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
    <div className="round">
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
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {selectedCell && selectedCell.cellType === 'Final Jeopardy' && (
        <div>
          <label>Enter your wager:</label>
          <input type="number" value={wager} onChange={handleWagerChange} max={userScore?.dollars || 0} />
        </div>
      )}
    </div>
  );
};

export default Round;