const { getPortugueseName } = require('./planetNames');

function formatScientificNotation(value, exponent) {
  if (value === null || exponent === null) return null;
  return `${value} × 10^${exponent}`;
}

function transformPlanetData(data) {
  const portugueseName = getPortugueseName(data.id);
  
  return {
    nome: portugueseName,
    tipo: data.isPlanet ? 'Planeta' : 'Outro corpo celeste',
    caracteristicasFisicas: {
      massa: data.mass ? formatScientificNotation(data.mass.massValue, data.mass.massExponent) + ' kg' : null,
      volume: data.vol ? formatScientificNotation(data.vol.volValue, data.vol.volExponent) + ' km³' : null,
      densidade: data.density ? `${data.density} g/cm³` : null,
      raioMedio: data.meanRadius ? `${data.meanRadius} km` : null,
      raioEquatorial: data.equaRadius ? `${data.equaRadius} km` : null,
      raioPolar: data.polarRadius ? `${data.polarRadius} km` : null
    },
    gravidade: {
      superficial: data.gravity ? `${data.gravity} m/s²` : null,
      velocidadeEscape: data.escape ? `${data.escape} m/s` : null
    },
    temperatura: {
      media: data.avgTemp ? `${data.avgTemp}K (${(data.avgTemp - 273.15).toFixed(2)}°C)` : null
    },
    orbita: {
      periodoOrbital: data.sideralOrbit ? `${data.sideralOrbit} dias` : null,
      periodoRotacao: data.sideralRotation ? `${data.sideralRotation} horas` : null,
      inclinacaoAxial: data.axialTilt ? `${data.axialTilt}°` : null,
      excentricidade: data.eccentricity || null
    },
    luas: {
      quantidade: data.moons ? data.moons.length : 0
    }
  };
}

module.exports = {
  transformPlanetData
}; 