import axios from 'axios';

const api = axios.create({
  baseURL: 'https://estudo-sistema-solar-backend.vercel.app/'
});

export const getPlanetInfo = async (planetName) => {
  try {
    const response = await api.get(`/planet/${planetName}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar informações do planeta:', error);
    throw error;
  }
};

export const getAllPlanets = async () => {
  try {
    const response = await api.get('/planets');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar todos os planetas:', error);
    throw error;
  }
};

export const getSunInfo = async () => {
  try {
    const response = await api.get('/sun');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar informações do Sol:', error);
    throw error;
  }
}; 