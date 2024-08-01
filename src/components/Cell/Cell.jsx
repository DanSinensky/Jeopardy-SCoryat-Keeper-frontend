import React from 'react';
import './Cell.css';

const Cell = ({ cell, selectedCell, handleCellClick, handleScoreUpdate, rowIndex, columnIndex, wager, handleWagerChange, userScore }) => {
  return (
    <td onClick={() => handleCellClick({ ...cell, row: rowIndex + 1, column: columnIndex + 1 })}>
      {cell ? (
        <div className="cell">
          <p className="clue">{selectedCell && selectedCell.row === rowIndex + 1 && selectedCell.column === columnIndex + 1 ? cell.response : cell.clue}</p>
          {selectedCell && selectedCell.row === rowIndex + 1 && selectedCell.column === columnIndex + 1 && (
            <div className="response-buttons">
              <button onClick={() => handleScoreUpdate('Correct')}>Correct</button>
              <button onClick={() => handleScoreUpdate('Incorrect')}>Incorrect</button>
              <button onClick={() => handleScoreUpdate('No Guess')}>No Guess</button>
            </div>
          )}
        </div>
      ) : null}
    </td>
  );
};

export default Cell;