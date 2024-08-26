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
  userScore,
  revealed
}) => {
  const [showClue, setShowClue] = useState(true);
  const [scoreRegistered, setScoreRegistered] = useState(false);
  const [wagerPlaced, setWagerPlaced] = useState(false);
  const [error, setError] = useState('');

  if (!cell) return <td />;

  const isSelected = selectedCell && selectedCell.roundType === roundType && selectedCell.row === rowIndex + 1 && selectedCell.column === columnIndex + 1;

  const toggleClueResponse = () => setShowClue(!showClue);

  const handleScore = (score) => {
    setScoreRegistered(true);
    handleScoreUpdate(score);
  };

  const handleWager = (wager) => {
    if (wager <= userScore) {
      setWagerPlaced(true);
      setError('');
      handleWagerChange({ target: { value: wager } });
    } else {
      setError('Wager exceeds your current score. Please enter a valid wager.');
    }
  };

  const handleCellInteraction = () => {
    if (isSelected) {
      if (cell.cellType === 'Final Jeopardy' && !wagerPlaced) {
        return;
      }
      handleCellClick(rowIndex, columnIndex, cell.cellType);
      setShowClue(!showClue);
    } else {
      handleCellClick(rowIndex, columnIndex, cell.cellType);
    }
  };

  return (
    <td className={isSelected ? 'selected' : ''} onClick={handleCellInteraction}>
      {!isSelected ? (
        cell.clue
      ) : (
        <>
          {cell.cellType === 'Final Jeopardy' && !wagerPlaced ? (
            <div>
              <label>Enter your wager:</label>
              <input
                type="number"
                value={wager}
                onBlur={(e) => handleWager(Number(e.target.value))}
                max={userScore}
              />
              {error && <p className="error">{error}</p>}
            </div>
          ) : (
            <>
              <div onClick={toggleClueResponse}>
                {showClue ? (
                  <p>{cell.clue}</p>
                ) : (
                  <div>
                    <p>{cell.response}</p>
                    {cell.cellType !== 'Final Jeopardy' && (
                      <>
                        <button disabled={scoreRegistered} onClick={() => handleScore('Correct')}>Correct</button>
                        <button disabled={scoreRegistered} onClick={() => handleScore('Incorrect')}>Incorrect</button>
                        <button disabled={scoreRegistered} onClick={() => handleScore('No Guess')}>No Guess</button>
                      </>
                    )}
                  </div>
                )}
              </div>
            </>
          )}
        </>
      )}
    </td>
  );
};

export default Cell;