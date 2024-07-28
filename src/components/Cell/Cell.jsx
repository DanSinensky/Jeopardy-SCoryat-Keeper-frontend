import React, { useState, useEffect } from 'react';
import { createScore, updateScore, getScoresByUser } from '../../services/scores';
import './Cell.css';

const Cell = ({ clue, response, userId, gameId, roundType, row }) => {
  const [isAnswered, setIsAnswered] = useState(false);
  const [userScore, setUserScore] = useState(null);
  
  const handleResponse = async (responseType) => {
    let scoreChange;
    if (responseType === 'Correct') {
      scoreChange = roundType === 'Final Jeopardy' ? parseInt(userScore.wager) : 200 * (row + 1);
    } else if (responseType === 'Incorrect') {
      scoreChange = roundType === 'Final Jeopardy' ? -parseInt(userScore.wager) : -200 * (row + 1);
    } else {
      scoreChange = 0;
    }

    let scoreData = {
      userId,
      gameId,
      score: userScore ? userScore.score + scoreChange : scoreChange,
    };

    if (userScore) {
      await updateScore(userScore._id, scoreData);
    } else {
      await createScore(scoreData);
    }

    setIsAnswered(true);
  };

  const fetchUserScore = async () => {
    const scores = await getScoresByUser(userId);
    const userGameScore = scores.find(score => score.gameId === gameId);
    setUserScore(userGameScore);
  };

  useEffect(() => {
    fetchUserScore();
  }, []);

  return (
    <div className="cell">
      <div className="clue">{clue}</div>
      {isAnswered ? (
        <div className="response">{response}</div>
      ) : (
        <div className="response-buttons">
          <button onClick={() => handleResponse('Correct')}>Correct</button>
          <button onClick={() => handleResponse('Incorrect')}>Incorrect</button>
          <button onClick={() => handleResponse('No Guess')}>No Guess</button>
        </div>
      )}
    </div>
  );
};

export default Cell;
