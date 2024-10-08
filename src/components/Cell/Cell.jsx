import React, { useState, useEffect } from 'react';
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
  const [scoreSubmitted, setScoreSubmitted] = useState(false);
  const [wagerPlaced, setWagerPlaced] = useState(false);

  useEffect(() => {
    if (!selectedCell || selectedCell.row !== rowIndex + 1 || selectedCell.column !== columnIndex + 1) {
      setShowClue(true);
      setScoreSubmitted(false);
    }
  }, [selectedCell, rowIndex, columnIndex]);

  const onResponseSelected = (value) => {
    if (!scoreSubmitted) {
      handleScoreUpdate(value);
      setScoreSubmitted(true);
    }
  };

  if (!cell) return <td />;

  const isSelected = selectedCell && selectedCell.roundType === roundType && selectedCell.row === rowIndex + 1 && selectedCell.column === columnIndex + 1;

  return (
    <td
      className={isSelected ? 'selected' : ''}
      onClick={() => handleCellClick({ row: rowIndex + 1, column: columnIndex + 1, cellType: cell.cellType })}
    >
      {
        roundType === 'Final Jeopardy' ? (
          !wagerPlaced ? (
            <div>
              <label>Enter your wager:</label>
              <input 
                type="number" 
                value={wager} 
                onChange={handleWagerChange} 
                max={userScore || 0}
                disabled={scoreSubmitted} 
              />
              <button onClick={() => setWagerPlaced(true)} disabled={!wager}>Place Wager</button>
            </div>
          ) : (
            <>
              {showClue ? (
                <div onClick={() => setShowClue(false)}>{cell.clue}</div>
              ) : (
                <>
                  <div>{cell.response}</div>
                  <button onClick={() => onResponseSelected('Correct')} disabled={scoreSubmitted}>Correct</button>
                  <button onClick={() => onResponseSelected('Incorrect')} disabled={scoreSubmitted}>Incorrect</button>
                  <button onClick={() => onResponseSelected('No Guess')} disabled={scoreSubmitted}>No Guess</button>
                </>
              )}
            </>
          )
        ) : (
          <>
            {showClue ? (
              <div onClick={() => setShowClue(false)}>{cell.clue}</div>
            ) : (
              <>
                <div>{cell.response}</div>
                <button onClick={() => onResponseSelected('Correct')} disabled={scoreSubmitted}>Correct</button>
                <button onClick={() => onResponseSelected('Incorrect')} disabled={scoreSubmitted}>Incorrect</button>
                <button onClick={() => onResponseSelected('No Guess')} disabled={scoreSubmitted}>No Guess</button>
              </>
            )}
          </>
        )
      }
    </td>
  );
};

export default Cell;