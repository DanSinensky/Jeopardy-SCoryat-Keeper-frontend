import React, { useState } from 'react';
import './Cell.css';

const Cell = ({
  cell,
  selectedCell,
  handleCellClick,
  handleScoreUpdate,
  rowIndex,
  columnIndex,
  wager,
  handleWagerChange,
  roundType,
  userScore
}) => {
  const [showClue, setShowClue] = useState(true);
  const [scoreRegistered, setScoreRegistered] = useState(false);
  const [wagerPlaced, setWagerPlaced] = useState(false);
  const [error, setError] = useState('');

  if (!cell) return <td />;

  const isSelected = selectedCell && selectedCell.roundType === roundType && selectedCell.row === rowIndex + 1 && selectedCell.column === columnIndex + 1;

  return (
    <td className={isSelected ? 'selected' : ''} onClick={() => handleCellClick({ row: rowIndex + 1, column: columnIndex + 1, cellType: cell.cellType })}>
      {!isSelected ? (
        cell.clue
      ) : (
        <>
          <div>{cell.response}</div>

          {roundType === 'Final Jeopardy' ? (
            !wagerPlaced ? (
              <div>
                <label>Enter your wager:</label>
                <input 
                  type="number" 
                  value={wager} 
                  onChange={handleWagerChange} 
                  max={userScore || 0} 
                />
                <button onClick={() => setWagerPlaced(true)}>Place Wager</button>
              </div>
            ) : (
              <>
                <button onClick={() => handleScoreUpdate('Correct')}>Correct</button>
                <button onClick={() => handleScoreUpdate('Incorrect')}>Incorrect</button>
                <button onClick={() => handleScoreUpdate('No Guess')}>No Guess</button>
              </>
            )
          ) : (
            <>
              <button onClick={() => handleScoreUpdate('Correct')}>Correct</button>
              <button onClick={() => handleScoreUpdate('Incorrect')}>Incorrect</button>
              <button onClick={() => handleScoreUpdate('No Guess')}>No Guess</button>
            </>
          )}
        </>
      )}
    </td>
  );
};

export default Cell;
