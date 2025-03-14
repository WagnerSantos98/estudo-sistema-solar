import React from 'react';
import { CssBaseline } from '@mui/material';
import Sidebar from './components/Sidebar/Sidebar';
import SolarSystem from './components/SolarSystem/SolarSystem';
import { PlanetProvider } from './context/PlanetContext';

function App() {
  return (
    <PlanetProvider>
      <CssBaseline />
      <Sidebar />
      <SolarSystem />
    </PlanetProvider>
  );
}

export default App;
