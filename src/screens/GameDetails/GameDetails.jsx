import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getGameById } from '../../services/games';
import Round from '../../components/Round/Round';
import './GameDetails.css';
import { getScoresByGame, getScoresByUser } from '../../services/scores';

const GameDetails = ({ user }) => {
  const [game, setGame] = useState(null);
  const [scores, setScores] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchGame = async () => {
      try {
        if (id) {
          const gameData = await getGameById(id);

          const jeopardyCategories = gameData.categories.slice(0, 6);
          const doubleJeopardyCategories = gameData.categories.slice(6, 12);
          const finalJeopardyCategory = gameData.categories.slice(12, 13);

          

          setGame(game);
        }
      } catch (error) {
        console.error("Failed to fetch game data:", error);
      }
    };

    const fetchScores = async () => {
      try {
        if (id) {
          const scores = await getScoresByGame(id);
          setScores(scores);
        }
      } catch (error) {
        console.error("Failed to fetch scores:", error);
      }
    };

    fetchGame();
    fetchScores();
  }, [id]);

  const currentUserScore = scores.find(score => score.user._id === user._id)?.dollars || 0;

  return (
    <div className="game-details">
      {game ? (
        <>
          <h1>{game.title}</h1>
          <Round
            categories={game.jeopardyRound.categories}
            clues={game.jeopardyRound.clues}
            userId={user._id}
            gameId={game._id}
            roundType="Jeopardy"
          />
          <Round
            categories={game.doubleJeopardyRound.categories}
            clues={game.doubleJeopardyRound.clues}
            userId={user._id}
            gameId={game._id}
            roundType="Double Jeopardy"
          />
          <Round
            categories={[game.finalJeopardy.category]}
            clues={[game.finalJeopardy.clue]}
            userId={user._id}
            gameId={game._id}
            roundType="Final Jeopardy"
          />
          <h3>Scores</h3>
          <ul>
            {scores.map((score) => (
              <li key={score._id}>{score.user.username}: ${score.dollars}</li>
            ))}
          </ul>
        </>
      ) : (
        <p className="loading">Loading...</p>
      )}
    </div>
  );
};

export default GameDetails;