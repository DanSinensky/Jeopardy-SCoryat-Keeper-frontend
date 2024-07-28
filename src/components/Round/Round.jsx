import React from 'react';
import Cell from '../Cell/Cell';
import './Round.css';

const Round = ({ categories, clues, userId, gameId, roundType }) => {
  return (
    <div className="round">
      {categories.map((category, colIndex) => (
        <div key={colIndex} className="category">
          <h3 className="category-title">{category}</h3>
          {clues[colIndex].map((clue, rowIndex) => (
            <Cell
              key={rowIndex}
              clue={clue.clue}
              response={clue.response}
              userId={userId}
              gameId={gameId}
              roundType={roundType}
              row={rowIndex}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Round;
