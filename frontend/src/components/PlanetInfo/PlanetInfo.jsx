import React from 'react';
import { Card, Typography, IconButton, Box, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import StraightenIcon from '@mui/icons-material/Straighten';
import ScaleIcon from '@mui/icons-material/Scale';
import PublicIcon from '@mui/icons-material/Public';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import NightsStayIcon from '@mui/icons-material/NightsStay';
import SpeedIcon from '@mui/icons-material/Speed';
import WaterIcon from '@mui/icons-material/Water';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

const StyledCard = styled(Card)(({ planetcolor }) => ({
  position: 'fixed',
  right: 32,
  bottom: 32,
  width: '70%',
  maxWidth: 1000,
  padding: 32,
  background: 'rgba(10, 10, 46, 0.85)',
  backdropFilter: 'blur(12px)',
  color: '#fff',
  borderRadius: 24,
  border: '1px solid rgba(255, 255, 255, 0.15)',
  boxShadow: `0 8px 32px rgba(0, 0, 0, 0.4), 0 0 20px ${planetcolor}33`,
  animation: 'slideIn 0.3s ease-out',
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
  '@keyframes slideIn': {
    from: {
      transform: 'translateY(100%)',
      opacity: 0,
    },
    to: {
      transform: 'translateY(0)',
      opacity: 1,
    },
  },
  zIndex: 1000,
}));

const Title = styled(Typography)(({ planetcolor }) => ({
  fontSize: '3rem',
  fontWeight: 700,
  color: planetcolor,
  textShadow: `0 0 20px ${planetcolor}66`,
  letterSpacing: '1px',
  textAlign: 'center',
  marginBottom: 8,
}));

const MainContent = styled(Box)({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: '24px',
  alignContent: 'start',
  padding: '0 8px',
});

const InfoSection = styled(Box)(({ planetcolor }) => ({
  padding: 24,
  borderRadius: 16,
  background: 'rgba(255, 255, 255, 0.03)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  transition: 'all 0.3s ease',
  height: 'fit-content',
  position: 'relative',
  overflow: 'hidden',
  minHeight: '180px',
  display: 'flex',
  flexDirection: 'column',
  '&:before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '4px',
    background: `linear-gradient(90deg, ${planetcolor}66, transparent)`,
  },
  '&:after': {
    content: '""',
    position: 'absolute',
    top: 4,
    left: 0,
    width: '100%',
    height: '100%',
    background: `radial-gradient(circle at top left, ${planetcolor}11, transparent 70%)`,
    pointerEvents: 'none',
  },
  '&:hover': {
    background: 'rgba(255, 255, 255, 0.05)',
    transform: 'translateY(-2px)',
    boxShadow: `0 4px 25px ${planetcolor}22`,
    '&:before': {
      background: `linear-gradient(90deg, ${planetcolor}, ${planetcolor}44)`,
    },
  },
}));

const InfoLabel = styled(Typography)({
  fontSize: '1.1rem',
  color: 'rgba(255, 255, 255, 0.9)',
  marginBottom: 16,
  textTransform: 'uppercase',
  letterSpacing: '1.5px',
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  position: 'relative',
  paddingBottom: '12px',
  borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
  '& .MuiSvgIcon-root': {
    fontSize: '1.4rem',
    color: 'inherit',
  },
});

const DataItem = styled(Box)(({ planetcolor }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  marginBottom: '16px',
  position: 'relative',
  paddingLeft: '12px',
  '&:before': {
    content: '""',
    position: 'absolute',
    left: 0,
    width: '3px',
    height: 'calc(100% - 4px)',
    background: planetcolor,
    borderRadius: '4px',
    opacity: 0.7,
    top: '2px',
  },
  '&:after': {
    content: '""',
    position: 'absolute',
    left: '12px',
    right: '-12px',
    bottom: '-8px',
    height: '1px',
    background: 'rgba(255, 255, 255, 0.06)',
  },
  '&:last-child': {
    marginBottom: 0,
    '&:after': {
      display: 'none',
    },
  },
}));

const DataLabel = styled(Typography)({
  color: 'rgba(255, 255, 255, 0.75)',
  fontSize: '0.95rem',
  minWidth: '140px',
  fontWeight: '500',
  letterSpacing: '0.5px',
});

const InfoValue = styled(Typography)({
  color: 'rgba(255, 255, 255, 0.95)',
  fontSize: '1rem',
  fontWeight: '500',
  letterSpacing: '0.5px',
  flex: 1,
  textAlign: 'right',
  paddingLeft: '8px',
});

const InfoGrid = styled(Grid)({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '24px',
  marginBottom: 24,
});

const CloseButton = styled(IconButton)({
  position: 'absolute',
  top: 20,
  right: 20,
  color: 'rgba(255, 255, 255, 0.8)',
  padding: '10px',
  zIndex: 1,
  transition: 'all 0.2s ease',
  '&:hover': {
    color: '#fff',
    background: 'rgba(255, 255, 255, 0.15)',
    transform: 'scale(1.1)',
  },
});

const PlanetInfo = ({ planet, onClose }) => {
  const handleClose = (event) => {
    event.stopPropagation();
    onClose();
  };

  const renderDataItem = (label, value) => (
    <DataItem planetcolor={planet.color}>
      <DataLabel>{label}:</DataLabel>
      <InfoValue>{value}</InfoValue>
    </DataItem>
  );

  return (
    <StyledCard planetcolor={planet.color}>
      <CloseButton onClick={handleClose}>
        <CloseIcon fontSize="small" />
      </CloseButton>
      
      <Title variant="h4" planetcolor={planet.color}>
        {planet.nome}
      </Title>

      <MainContent>
        <InfoSection planetcolor={planet.color}>
          <InfoLabel>
            <StraightenIcon />
            Dimensões
          </InfoLabel>
          {renderDataItem('Raio Médio', planet.caracteristicasFisicas.raioMedio)}
          {renderDataItem('Raio Equatorial', planet.caracteristicasFisicas.raioEquatorial)}
          {renderDataItem('Raio Polar', planet.caracteristicasFisicas.raioPolar)}
        </InfoSection>

        <InfoSection planetcolor={planet.color}>
          <InfoLabel>
            <ScaleIcon />
            Massa e Densidade
          </InfoLabel>
          {renderDataItem('Massa', planet.caracteristicasFisicas.massa)}
          {renderDataItem('Densidade', planet.caracteristicasFisicas.densidade)}
          {renderDataItem('Volume', planet.caracteristicasFisicas.volume)}
        </InfoSection>

        <InfoSection planetcolor={planet.color}>
          <InfoLabel>
            <PublicIcon />
            Órbita e Rotação
          </InfoLabel>
          {renderDataItem('Período Orbital', planet.orbita.periodoOrbital)}
          {renderDataItem('Período de Rotação', planet.orbita.periodoRotacao)}
          {renderDataItem('Inclinação Axial', planet.orbita.inclinacaoAxial)}
        </InfoSection>

        <InfoSection planetcolor={planet.color}>
          <InfoLabel>
            <SpeedIcon />
            Gravidade
          </InfoLabel>
          {renderDataItem('Superficial', planet.gravidade.superficial)}
          {renderDataItem('Vel. de Escape', planet.gravidade.velocidadeEscape)}
        </InfoSection>

        <InfoSection planetcolor={planet.color}>
          <InfoLabel>
            <NightsStayIcon />
            Satélites
          </InfoLabel>
          {renderDataItem('Quantidade', `${planet.luas.quantidade} ${planet.luas.quantidade === 1 ? 'lua' : 'luas'}`)}
        </InfoSection>

        <InfoSection planetcolor={planet.color}>
          <InfoLabel>
            <AcUnitIcon />
            Temperatura
          </InfoLabel>
          {renderDataItem('Média', planet.temperatura.media)}
        </InfoSection>
      </MainContent>
    </StyledCard>
  );
};

export default PlanetInfo; 