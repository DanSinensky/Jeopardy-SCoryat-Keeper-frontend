import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getGameById } from '../../services/games';
import Round from '../../components/Round/Round';
import './GameDetails.css';
import { getScoresByGame } from '../../services/scores';

const GameDetails = ({ user }) => {
  const [game, setGame] = useState(null);
  const [scores, setScores] = useState([]);
  const [selectedCell, setSelectedCell] = useState(null);
  const [jeopardyCompleted, setJeopardyCompleted] = useState(false);
  const [doubleJeopardyCompleted, setDoubleJeopardyCompleted] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const fetchGame = async () => {
      try {
        if (id) {
          const gameData = await getGameById(id);

          const jeopardyCategories = gameData.categories.slice(0, 6);
          const doubleJeopardyCategories = gameData.categories.slice(6, 12);
          const finalJeopardyCategory = gameData.categories.slice(12, 13);

          const jeopardyCategoryComments = gameData.category_comments.slice(0, 6);
          const doubleJeopardyCategoryComments = gameData.category_comments.slice(6, 12);
          const finalJeopardyCategoryComment = gameData.category_comments.slice(12, 13);

          const transformedGame = {
            ...gameData,
            jeopardy_round: {
              categories: jeopardyCategories,
              categoryComments: jeopardyCategoryComments,
              cells: gameData.jeopardy_round.cells,
              clues: gameData.jeopardy_round.clues,
              responses: gameData.jeopardy_round.responses,
            },
            double_jeopardy_round: {
              categories: doubleJeopardyCategories,
              categoryComments: doubleJeopardyCategoryComments,
              cells: gameData.double_jeopardy_round.cells,
              clues: gameData.double_jeopardy_round.clues,
              responses: gameData.double_jeopardy_round.responses,
            },
            final_jeopardy_round: {
              categories: finalJeopardyCategory,
              categoryComments: finalJeopardyCategoryComment,
              clues: [gameData.final_jeopardy.clue],
              responses: [gameData.final_jeopardy.response],
              cells: ['FJ_1_1']
            }
          };

          setGame(transformedGame);
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

  const handleRoundCompletion = (roundType) => {
    if (roundType === 'Jeopardy') {
      setJeopardyCompleted(true);
    } else if (roundType === 'Double Jeopardy') {
      setDoubleJeopardyCompleted(true);
    }
  };

  const currentUserScore = scores.find(score => score.user._id === user._id)?.dollars || 0;

  return (
    <div className="game-details">
      {game ? (
        <>
          <h1>{game.title}</h1>
          <div className="user-scores">
            <h2>All Users' Scores</h2>
            <ul>
              {scores.map(score => (
                <li key={score.user._id}>{score.user.username}: ${score.dollars}</li>
              ))}
            </ul>
            <h3>Your Score: ${currentUserScore}</h3>
          </div>
          <Round
            roundData={game.jeopardy_round}
            userId={user._id}
            gameId={game._id}
            roundType="Jeopardy"
            selectedCell={selectedCell}
            setSelectedCell={setSelectedCell}
            userScore={currentUserScore}
            onComplete={() => handleRoundCompletion('Jeopardy')}
          />
          {jeopardyCompleted && (
            <Round
              roundData={game.double_jeopardy_round}
              userId={user._id}
              gameId={game._id}
              roundType="Double Jeopardy"
              selectedCell={selectedCell}
              setSelectedCell={setSelectedCell}
              userScore={currentUserScore}
              onComplete={() => handleRoundCompletion('Double Jeopardy')}
            />
          )}
          {doubleJeopardyCompleted && (
            <Round
              roundData={game.final_jeopardy_round}
              userId={user._id}
              gameId={game._id}
              roundType="Final Jeopardy"
              selectedCell={selectedCell}
              setSelectedCell={setSelectedCell}
              userScore={currentUserScore}
            />
          )}
        </>
      ) : (
        <p>Loading game details...</p>
      )}
    </div>
  );
};

export default GameDetails;