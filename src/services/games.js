import api from "./apiConfig";

export const getGames = async () => {
  try {
    const response = await api.get("/games");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getGameById = async (id) => {
  try {
    const response = await api.get(`/games/ids/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getGamesByDate = async (date) => {
  try {
    const response = await api.get(`/games/date/${date}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateGame = async (id, game) => {
  try {
    const response = await api.put(`games/ids/${id}`, game);
    return response.data;
  } catch (error) {
    throw error;
  }
};