import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout/Layout'; // Corrected import
import Round from '../../components/Round/Round'; // Assuming Round is also a component you have
import { getGameById } from '../../services/games';

const GameDetails = ({ user }) => {
  const [game, setGame] = useState(null);

  useEffect(() => {
    const fetchGame = async () => {
      const game = await getGameById(); // Assuming you have a way to get the game ID
      setGame(game);
    }
    fetchGame();
  }, []);

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