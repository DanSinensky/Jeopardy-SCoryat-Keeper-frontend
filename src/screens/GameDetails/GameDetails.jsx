import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../../components/Layout/Layout';
import Round from '../../components/Round/Round';
import { getGameById } from '../../services/games';
import { getScoresByGame, getScoresByUser } from '../../services/scores';

const GameDetails = ({ user }) => {
  const [game, setGame] = useState(null);
  const [scores, setScores] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchGame = async () => {
      try {
        if (id) {
          const game = await getGameById(id);
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

  if (!game) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <h2>{game.game_title}</h2>
      <p>{game.game_comments}</p>
      <h3>Categories</h3>
      <ul>
        {game.categories.map((category, index) => (
          <li key={index}>{category} - {game.category_comments[index]}</li>
        ))}
      </ul>
      <Round roundData={game.jeopardy_round} roundType="Jeopardy" userId={user._id} gameId={game._id} currentUserScore={currentUserScore} />
      <Round roundData={game.double_jeopardy_round} roundType="Double Jeopardy" userId={user._id} gameId={game._id} currentUserScore={currentUserScore} />
      <h3>Final Jeopardy</h3>
      <Round roundData={{ cells: ['Final_1_1'], clues: [game.final_jeopardy.clue], responses: [game.final_jeopardy.response] }} roundType="Final Jeopardy" userId={user._id} gameId={game._id} currentUserScore={currentUserScore} />
      <h3>Scores</h3>
      <ul>
        {scores.map((score) => (
          <li key={score._id}>{score.user.username}: ${score.dollars}</li>
        ))}
      </ul>
    </>
  );
};

export default GameDetails;