import React from 'react';

const parseCell = (cell) => {
  const parts = cell.split('_');
  return {
    round: parts[0],
    column: parseInt(parts[1], 10),
    row: parseInt(parts[2], 10)
  };
};

const Round = ({ roundData, roundType }) => {
  const grid = Array.from({ length: 6 }, () => Array(6).fill(null));

  roundData.cells.forEach((cell, index) => {
    const { column, row } = parseCell(cell);
    grid[row - 1][column - 1] = {
      clue: roundData.clues[index],
      response: roundData.responses[index]
    };
  });

  return (
    <div>
      <h3>{roundType}</h3>
      <div className="round-grid">
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} className="round-row">
            {row.map((cell, columnIndex) => (
              <div key={columnIndex} className="round-cell">
                {cell ? (
                  <div>
                    <p>{cell.clue}</p>
                    <p>{cell.response}</p>
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Round;