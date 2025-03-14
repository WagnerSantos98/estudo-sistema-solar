import React from 'react';
import { Drawer, List, ListItem, ListItemText, ListItemIcon, Typography, Box, CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';
import { usePlanetContext } from '../../context/PlanetContext';
import PlanetInfo from '../PlanetInfo/PlanetInfo';
import { planetsData } from '../../data/planetsData';

const StyledDrawer = styled(Drawer)({
  width: 240,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: 240,
    background: 'rgba(10, 10, 46, 0.8)',
    backdropFilter: 'blur(12px)',
    border: 'none',
    boxShadow: '4px 0 15px rgba(0, 0, 0, 0.3)',
  },
});

const Title = styled(Typography)({
  padding: '24px 16px',
  color: '#fff',
  fontSize: '1.5rem',
  fontWeight: 600,
  letterSpacing: '1px',
  textAlign: 'center',
  borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
});

const StyledListItem = styled(ListItem)(({ planetcolor, selected, isSun }) => ({
  color: '#fff',
  margin: '4px 8px',
  borderRadius: 8,
  transition: 'all 0.3s ease',
  background: selected ? `${planetcolor}22` : 'transparent',
  marginBottom: isSun ? '16px' : '4px',
  '&:after': isSun ? {
    content: '""',
    position: 'absolute',
    bottom: '-8px',
    left: '10%',
    width: '80%',
    height: '1px',
    background: 'linear-gradient(90deg, transparent, rgba(255, 215, 0, 0.3), transparent)',
  } : {},
  '&:hover': {
    background: `${planetcolor}33`,
    transform: 'translateX(4px)',
  },
}));

const PlanetIcon = styled('div')(({ color, selected, isSun, icon }) => ({
  width: isSun ? 32 : 24,
  height: isSun ? 32 : 24,
  borderRadius: '50%',
  transition: 'all 0.3s ease',
  transform: selected ? 'scale(1.2)' : 'scale(1)',
  boxShadow: selected 
    ? `0 0 20px ${color}, inset 0 0 10px rgba(255,255,255,0.5)`
    : isSun ? `0 0 15px ${color}` : 'none',
  '&:hover': {
    transform: 'scale(1.2)',
    boxShadow: `0 0 15px ${color}`,
  },
  animation: isSun ? 'pulse 2s infinite' : 'none',
  '@keyframes pulse': {
    '0%': {
      boxShadow: `0 0 15px ${color}`,
    },
    '50%': {
      boxShadow: `0 0 30px ${color}`,
    },
    '100%': {
      boxShadow: `0 0 15px ${color}`,
    },
  },
  background: `url(${icon}) center/cover`,
}));

const LoadingContainer = styled(Box)({
  position: 'fixed',
  top: '50%',
  right: '50%',
  transform: 'translate(50%, -50%)',
  zIndex: 1100,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '16px',
  color: '#fff',
});

const ErrorMessage = styled(Typography)({
  color: '#ff6b6b',
  padding: '16px',
  margin: '16px',
  background: 'rgba(255, 107, 107, 0.1)',
  borderRadius: '8px',
  border: '1px solid rgba(255, 107, 107, 0.3)',
});

const Sidebar = () => {
  const { 
    selectedPlanet, 
    setSelectedPlanet, 
    selectedPlanetData,
    showInfo,
    setShowInfo,
    loading,
    error
  } = usePlanetContext();

  const handlePlanetClick = (planetName) => {
    setSelectedPlanet(planetName);
  };

  return (
    <>
      <StyledDrawer variant="permanent" anchor="left">
        <Title>Sistema Solar</Title>
        <List>
          {planetsData.map((planet) => (
            <StyledListItem
              button
              key={planet.name}
              selected={selectedPlanet === planet.name}
              planetcolor={planet.color}
              isSun={planet.name === 'Sol'}
              onClick={() => handlePlanetClick(planet.name)}
            >
              <ListItemIcon>
                <PlanetIcon 
                  color={planet.color}
                  selected={selectedPlanet === planet.name}
                  isSun={planet.name === 'Sol'}
                  icon={planet.icon}
                />
              </ListItemIcon>
              <ListItemText 
                primary={planet.name}
                primaryTypographyProps={{
                  sx: {
                    fontWeight: selectedPlanet === planet.name ? 600 : 400,
                    letterSpacing: '0.5px',
                    transition: 'all 0.3s ease',
                    color: planet.name === 'Sol' ? '#FDB813' : 'inherit',
                  }
                }}
              />
            </StyledListItem>
          ))}
        </List>
      </StyledDrawer>

      {loading && (
        <LoadingContainer>
          <CircularProgress size={40} />
          <Typography>Carregando informações...</Typography>
        </LoadingContainer>
      )}

      {error && (
        <ErrorMessage>
          Erro ao carregar informações: {error}
        </ErrorMessage>
      )}

      {showInfo && selectedPlanetData && (
        <PlanetInfo
          planet={selectedPlanetData}
          onClose={() => setShowInfo(false)}
        />
      )}
    </>
  );
};

export default Sidebar; 