require('dotenv').config();

module.exports = {
  port: process.env.PORT || 3000,
  apiBaseUrl: process.env.API_BASE_URL || 'https://api.le-systeme-solaire.net/rest'
}; 