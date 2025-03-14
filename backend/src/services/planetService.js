const axios = require('axios');
const config = require('../config/config');
const { getFrenchName } = require('../utils/planetNames');
const { transformPlanetData } = require('../utils/dataTransformer');

class PlanetService {
  constructor() {
    this.apiClient = axios.create({
      baseURL: config.apiBaseUrl
    });
  }

  async getPlanetInfo(planetName) {
    try {
      const frenchName = getFrenchName(planetName);
      const response = await this.apiClient.get(`/bodies/${frenchName}`);
      return transformPlanetData(response.data);
    } catch (error) {
      throw new Error(`Erro ao buscar informações do planeta ${planetName}: ${error.message}`);
    }
  }

  async getAllPlanets() {
    try {
      const planets = [
        'mercury', 'venus', 'earth', 'mars', 
        'jupiter', 'saturn', 'uranus', 'neptune'
      ];
      
      const planetsData = await Promise.all(
        planets.map(planet => this.getPlanetInfo(planet))
      );

      return planetsData;
    } catch (error) {
      throw new Error(`Erro ao buscar informações dos planetas: ${error.message}`);
    }
  }

  async getSunInfo() {
    try {
      const response = await this.apiClient.get('/bodies/soleil');
      return transformPlanetData(response.data);
    } catch (error) {
      throw new Error(`Erro ao buscar informações do Sol: ${error.message}`);
    }
  }
}

module.exports = new PlanetService(); 