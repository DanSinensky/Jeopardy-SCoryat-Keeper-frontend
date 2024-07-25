import React, { useState, useEffect } from 'react';
import { Calendar } from 'react-calendar';
import { Link } from 'react-router-dom';
import { getGames } from '../../services/games';
import Layout from '../../components/Layout/Layout';
import './CalendarScreen.css';

const CalendarScreen = ({ user }) => {
  const [games, setGames] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [gamesOnDate, setGamesOnDate] = useState([]);

  useEffect(() => {
    const fetchGames = async () => {
      const allGames = await getGames();
      setGames(allGames);
    };
    fetchGames();
  }, []);

  const handleDateClick = (date) => {
    setSelectedDate(date);
    const gamesForDate = games.filter(game => new Date(game.game_date).toDateString() === date.toDateString());
    setGamesOnDate(gamesForDate);
  };

  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      const gamesForDate = games.filter(game => new Date(game.game_date).toDateString() === date.toDateString());
      if (gamesForDate.length > 0) {
        const shade = Math.min(gamesForDate.length * 20, 100);
        return (
          <div 
            className="game-links" 
            style={{ backgroundColor: `rgba(0, 0, 0, ${shade / 100})` }}
            onClick={() => handleDateClick(date)}
          >
            {gamesForDate.length} games
          </div>
        );
      }
    }
  };

  return (
    <>
      <Calendar tileContent={tileContent} />
      {selectedDate && (
        <div className="game-list">
          <h3>Games on {selectedDate.toDateString()}</h3>
          {gamesOnDate.map(game => (
            <div key={game.game_id}>
              <Link to={`/game/${game.game_id}`}>{game.game_title}</Link>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default CalendarScreen;
