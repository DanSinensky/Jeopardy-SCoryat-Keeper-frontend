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

export const updateScore = async (id, score) => {
  try {
    const response = await api.put(`/scores/${id}`, score);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteScore = async (id) => {
  try {
    const response = await api.delete(`/scores/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}