import React, { useState, useEffect } from 'react';
import { createScore, updateScore, getScoresByUser } from '../../services/scores';

const parseCell = (cell) => {
  const parts = cell.split('_');
  return {
    round: parts[0],
    column: parseInt(parts[1], 10),
    row: parseInt(parts[2], 10)
  };
};

const Round = ({ roundData, roundType, userId, gameId, currentUserScore }) => {
  const [selectedCell, setSelectedCell] = useState(null);
  const [wager, setWager] = useState('');

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

  const grid = Array.from({ length: 6 }, () => Array(6).fill(null));

  roundData.cells.forEach((cell, index) => {
    const { column, row } = parseCell(cell);
    grid[row - 1][column - 1] = {
      clue: roundData.clues[index],
      response: roundData.responses[index],
      cellType: cell.cellType
    };
  });

  return (
    <div>
      <h3>{roundType}</h3>
      <table className="round-table">
        <tbody>
          {grid.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, columnIndex) => (
                <td key={columnIndex} onClick={() => handleCellClick({ ...cell, row: rowIndex + 1, column: columnIndex + 1 })}>
                  {cell ? (
                    <div>
                      <p>{selectedCell && selectedCell.row === rowIndex + 1 && selectedCell.column === columnIndex + 1 ? cell.response : cell.clue}</p>
                      {selectedCell && selectedCell.row === rowIndex + 1 && selectedCell.column === columnIndex + 1 && (
                        <div>
                          <button onClick={() => handleScoreUpdate('Correct')}>Correct</button>
                          <button onClick={() => handleScoreUpdate('Incorrect')}>Incorrect</button>
                          <button onClick={() => handleScoreUpdate('No Guess')}>No Guess</button>
                        </div>
                      )}
                    </div>
                  ) : null}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {selectedCell && selectedCell.cellType === 'Final Jeopardy' && (
        <div>
          <label>Enter your wager:</label>
          <input type="number" value={wager} onChange={handleWagerChange} max={currentUserScore} />
        </div>
      )}
    </div>
  );
};

export default Round;