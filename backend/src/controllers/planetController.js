const planetService = require('../services/planetService');

class PlanetController {
  async getPlanet(req, res) {
    try {
      const { planetName } = req.params;
      const planetInfo = await planetService.getPlanetInfo(planetName);
      res.json(planetInfo);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getAllPlanets(req, res) {
    try {
      const planets = await planetService.getAllPlanets();
      res.json(planets);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getSun(req, res) {
    try {
      const sunInfo = await planetService.getSunInfo();
      res.json(sunInfo);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new PlanetController(); 