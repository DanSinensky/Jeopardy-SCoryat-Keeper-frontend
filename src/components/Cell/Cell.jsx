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
  roundType
}) => {
  if (!cell) return <td />;

  const isSelected = selectedCell && selectedCell.roundType === roundType && selectedCell.row === rowIndex + 1 && selectedCell.column === columnIndex + 1;

  return (
    <td className={isSelected ? 'selected' : ''} onClick={() => handleCellClick({ row: rowIndex + 1, column: columnIndex + 1, cellType: cell.cellType })}>
      {!isSelected ? cell.clue : (
        <>
          <div>{cell.response}</div>
          {cell.cellType === 'Final Jeopardy' ? (
            <div>
              <label>Enter your wager:</label>
              <input type="number" value={wager} onChange={handleWagerChange} max={userScore?.dollars || 0} />
            </div>
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
