import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../../components/Layout/Layout';
import Round from '../../components/Round/Round';
import { getGameById } from '../../services/games';

const GameDetails = ({ user }) => {
  const [game, setGame] = useState(null);
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
    fetchGame();
  }, [id]);

  if (!game) {
    return <div>Loading...</div>;
  }

  return (
    <Layout user={user}>
      <h2>{game.game_title}</h2>
      <p>{game.game_comments}</p>
      <h3>Categories</h3>
      <ul>
        {game.categories.map((category, index) => (
          <li key={index}>{category} - {game.category_comments[index]}</li>
        ))}
      </ul>
      <Round roundData={game.jeopardy_round} roundType="Jeopardy" />
      <Round roundData={game.double_jeopardy_round} roundType="Double Jeopardy" />
      <h3>Final Jeopardy</h3>
      <p>{game.final_jeopardy.clue}</p>
      <p>{game.final_jeopardy.response}</p>
    </Layout>
  );
};

export default GameDetails;