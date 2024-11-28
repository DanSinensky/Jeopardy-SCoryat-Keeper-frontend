import api from './apiConfig';

export const createGameSession = async (gameId, userId) => {
  try {
    const response = await api.post('/game-sessions', { gameId, userId });
    return response.data;
  } catch (error) {
    console.error('Failed to create game session:', error);
    throw error;
  }
};

export const getGameSession = async (sessionId) => {
  try {
    const response = await api.get(`/game-sessions/session/${sessionId}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch game session:', error);
    throw error;
  }
};

export const updateGameSession = async (sessionId, score) => {
  try {
    const response = await api.post(`/game-sessions/${sessionId}`, { score });
    return response.data;
  } catch (error) {
    console.error('Failed to update game session:', error);
    throw error;
  }
};

export const deleteGameSession = async (sessionId) => {
  try {
    const response = await api.delete(`/game-sessions/${sessionId}`);
    return response.data;
  } catch (error) {
    console.error('Failed to delete game session:', error);
    throw error;
  }
};

export const getUserGameSessions = async (userId) => {
  try {
    const response = await api.get(`/game-sessions/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch user game sessions:', error);
    throw error;
  }
};