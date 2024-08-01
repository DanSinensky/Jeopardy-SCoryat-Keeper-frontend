import React, { useState, useEffect } from 'react';
import { createScore, updateScore, getScoresByUser } from '../../services/scores';
import Cell from '../Cell/Cell';
import './Round.css';

const parseCell = (cell) => {
  const parts = cell.split('_');
  return {
    round: parts[0],
    column: parseInt(parts[1], 10),
    row: parseInt(parts[2], 10),
    cellType: parts.length > 3 ? parts[3] : 'regular'
  };
};

const Round = ({ roundData, userId, gameId, roundType, selectedCell, setSelectedCell }) => {
  const [wager, setWager] = useState('');
  const [userScore, setUserScore] = useState(null);

  useEffect(() => {
    console.log('roundData:', roundData);
  }, [roundData]);

  const handleCellClick = (cell) => {
    if (selectedCell !== cell) {
      setSelectedCell(cell);
    }
  };

  const handleScoreUpdate = async (value) => {
    const points = roundType === 'Jeopardy' ? selectedCell.row * 200 : selectedCell.row * 400;

    let newScore;
    if (selectedCell.cellType === 'Final Jeopardy') {
      newScore = value === 'Correct' ? parseInt(wager, 10) : -parseInt(wager, 10);
    } else {
      newScore = value === 'Correct' ? points : value === 'Incorrect' ? -points : 0;
    }

    try {
      const existingScores = await getScoresByUser(userId);
      const score = existingScores.find((s) => s.gameId === gameId);
      if (score) {
        await updateScore(score._id, { dollars: score.dollars + newScore });
      } else {
        await createScore({ dollars: newScore, userId, gameId });
      }
    } catch (error) {
      console.error('Failed to update score:', error);
    }

    setSelectedCell(null);
  };

  const handleWagerChange = (event) => {
    setWager(event.target.value);
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
                  userScore={userScore}
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