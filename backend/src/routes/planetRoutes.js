const express = require('express');
const router = express.Router();
const planetController = require('../controllers/planetController');

// Rota para obter informações de um planeta específico
router.get('/planet/:planetName', planetController.getPlanet);

// Rota para obter informações de todos os planetas
router.get('/planets', planetController.getAllPlanets);

// Rota para obter informações do Sol
router.get('/sun', planetController.getSun);

module.exports = router; 