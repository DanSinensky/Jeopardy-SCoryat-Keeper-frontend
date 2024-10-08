import api from "./apiConfig";

export const getScores = async () => {
  try {
    const response = await api.get("/scores");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createOrUpdateScore = async (userId, gameId, dollars) => {
  try {
    const response = await api.post('/api/scores', { userId, gameId, dollars });
    return response.data;
  } catch (error) {
    console.error('Error creating or updating score:', error);
    throw error;
  }
};

// export const createScore = async ({ dollars, userId, gameId }) => {
//   try {
//     const response = await api.post('/scores', {
//       dollars,
//       userId,
//       gameId
//     });
//     return response.data;
//   } catch (error) {
//     console.error('Failed to create score:', error);
//     throw error;
//   }
// };

// export const updateScore = async ({ dollars, userId, gameId }) => {
//   try {
//     const response = await api.put('/scores', {
//       dollars,
//       userId,
//       gameId
//     });
//     return response.data;
//   } catch (error) {
//     console.error('Failed to update score:', error);
//     throw error;
//   }
// };


export const deleteScore = async (id) => {
  try {
    const response = await api.delete(`/scores/${id}`);
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
    console.error('Failed to fetch scores:', error);
    throw error;
  }
};