import React, { createContext, useContext, useState, useEffect } from 'react';
import { getPlanetInfo, getSunInfo } from '../services/api';

const PlanetContext = createContext();

export const usePlanetContext = () => {
  const context = useContext(PlanetContext);
  if (!context) {
    throw new Error('usePlanetContext deve ser usado dentro de um PlanetProvider');
  }
  return context;
};

export const PlanetProvider = ({ children }) => {
  const [selectedPlanet, setSelectedPlanet] = useState(null);
  const [selectedPlanetData, setSelectedPlanetData] = useState(null);
  const [showInfo, setShowInfo] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlanetData = async () => {
      if (!selectedPlanet) return;

      setLoading(true);
      setError(null);
      try {
        let data;
        if (selectedPlanet === 'Sol') {
          data = await getSunInfo();
        } else {
          data = await getPlanetInfo(selectedPlanet.toLowerCase());
        }
        
        // Adiciona a cor do planeta aos dados
        data.color = getPlanetColor(selectedPlanet);
        setSelectedPlanetData(data);
        setShowInfo(true);
      } catch (err) {
        setError(err.message);
        console.error('Erro ao buscar dados do planeta:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPlanetData();
  }, [selectedPlanet]);

  const getPlanetColor = (planetName) => {
    const colors = {
      'Sol': '#FDB813',
      'Mercúrio': '#FF6B3D',
      'Vênus': '#FFD700',
      'Terra': '#4B9FE1',
      'Marte': '#FF4500',
      'Júpiter': '#FFA500',
      'Saturno': '#FFD700',
      'Urano': '#00CED1',
      'Netuno': '#4169E1'
    };
    return colors[planetName] || '#FFFFFF';
  };

  const value = {
    selectedPlanet,
    setSelectedPlanet,
    selectedPlanetData,
    showInfo,
    setShowInfo,
    loading,
    error
  };

  return (
    <PlanetContext.Provider value={value}>
      {children}
    </PlanetContext.Provider>
  );
};

export default PlanetContext; 