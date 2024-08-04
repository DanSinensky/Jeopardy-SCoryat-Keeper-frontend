import React from 'react';
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
  if (!cell) return <td />;

  const isSelected = selectedCell && selectedCell.roundType === roundType && selectedCell.row === rowIndex + 1 && selectedCell.column === columnIndex + 1;

  const handleCellInteraction = () => {
    if (isSelected) {
      if (cell.cellType === 'Final Jeopardy' && !wager) {
        return;
      }
      handleCellClick({ row: rowIndex + 1, column: columnIndex + 1, cellType: cell.cellType });
    } else {
      handleCellClick({ row: rowIndex + 1, column: columnIndex + 1, cellType: cell.cellType });
    }
  };

  return (
    <td className={isSelected ? 'selected' : ''} onClick={handleCellInteraction}>
      {!isSelected ? (
        cell.clue
      ) : (
        <>
          {cell.cellType === 'Final Jeopardy' && !wager ? (
            <div>
              <label>Enter your wager:</label>
              <input
                type="number"
                value={wager}
                onChange={handleWagerChange}
                max={userScore}
              />
            </div>
          ) : (
            <>
              <div>{cell.response}</div>
              {cell.cellType === 'Final Jeopardy' ? null : (
                <>
                  <button onClick={() => handleScoreUpdate('Correct')}>Correct</button>
                  <button onClick={() => handleScoreUpdate('Incorrect')}>Incorrect</button>
                  <button onClick={() => handleScoreUpdate('No Guess')}>No Guess</button>
                </>
              )}
            </>
          )}
        </>
      )}
    </td>
  );
};

export default Cell;