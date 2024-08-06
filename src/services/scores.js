import api from "./apiConfig";

export const getScores = async () => {
  try {
    const response = await api.get("/scores");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createScore = async (score) => {
  try {
    const response = await api.post("/scores", score);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateScore = async (gameId, userId, newScore) => {
  try {
    const response = await api.put(`/scores/${gameId}/${userId}`, { newScore });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteScore = async (scoreId) => {
  try {
    const response = await api.delete(`/scores/${scoreId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getScoresByUser = async (userId) => {
  try {
    const response = await api.get(`/scores/user/${userId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getScoresByGame = async (gameId) => {
  try {
    const response = await api.get(`/scores/game/${gameId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};