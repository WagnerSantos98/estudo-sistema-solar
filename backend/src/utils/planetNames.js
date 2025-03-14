const planetNames = {
  // Português para Francês
  'sol': 'soleil',
  'mercurio': 'mercure',
  'venus': 'venus',
  'terra': 'terre',
  'marte': 'mars',
  'jupiter': 'jupiter',
  'saturno': 'saturne',
  'urano': 'uranus',
  'netuno': 'neptune',

  // Inglês para Francês
  'sun': 'soleil',
  'mercury': 'mercure',
  'earth': 'terre',
  'mars': 'mars',
  'saturn': 'saturne',
  'uranus': 'uranus',
  'neptune': 'neptune',

  // Nomes em francês (para manter compatibilidade)
  'soleil': 'soleil',
  'mercure': 'mercure',
  'terre': 'terre',
  'mars': 'mars',
  'jupiter': 'jupiter',
  'saturne': 'saturne',
  'uranus': 'uranus',
  'neptune': 'neptune'
};

// Mapeamento de nomes em português
const portugueseNames = {
  'soleil': 'Sol',
  'mercure': 'Mercúrio',
  'venus': 'Vênus',
  'terre': 'Terra',
  'mars': 'Marte',
  'jupiter': 'Júpiter',
  'saturne': 'Saturno',
  'uranus': 'Urano',
  'neptune': 'Netuno'
};

// Função para normalizar o nome (remover acentos e converter para minúsculas)
const normalizeString = (str) => {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
};

// Função para obter o nome em francês
const getFrenchName = (planetName) => {
  const normalizedName = normalizeString(planetName);
  return planetNames[normalizedName] || normalizedName;
};

// Função para obter o nome em português
const getPortugueseName = (frenchName) => {
  return portugueseNames[frenchName] || frenchName;
};

module.exports = {
  planetNames,
  getFrenchName,
  getPortugueseName
}; 