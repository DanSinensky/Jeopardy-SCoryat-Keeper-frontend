import React, { useState, useEffect } from 'react';
import { Calendar } from 'react-calendar';
import { Link } from 'react-router-dom';
import { getGames } from '../../services/games';
import Layout from '../../components/Layout/Layout';

const CalendarScreen = ({ user }) => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    const fetchGames = async () => {
      const allGames = await getGames();
      setGames(allGames);
    }
    fetchGames();
  }, []);

  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      const gameLinks = games
        .filter(game => new Date(game.game_date).toDateString() === date.toDateString())
        .map(game => (
          <div key={game.game_id}>
            <Link to={`/game/${game.game_id}`}>{game.game_title}</Link>
          </div>
        ));
      return <div className="game-links">{gameLinks}</div>;
    }
  };
  
  return (
    <Layout user={user}>
      <Calendar tileContent={tileContent} />
    </Layout>
  );
};

export default CalendarScreen;
