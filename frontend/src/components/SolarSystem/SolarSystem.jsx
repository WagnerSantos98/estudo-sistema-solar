import React, { useRef } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { styled } from '@mui/material/styles';
import { TextureLoader } from 'three';
import { usePlanetContext } from '../../context/PlanetContext';

// Importando texturas
import sunTexture from '../../assets/textures/sun.jpg';
import mercuryTexture from '../../assets/textures/mercury.jpg';
import venusTexture from '../../assets/textures/venus.jpg';
import earthTexture from '../../assets/textures/earth.jpg';
import marsTexture from '../../assets/textures/mars.jpg';
import jupiterTexture from '../../assets/textures/jupiter.jpg';
import saturnTexture from '../../assets/textures/saturn.jpg';
import uranusTexture from '../../assets/textures/uranus.jpg';
import neptuneTexture from '../../assets/textures/neptune.jpg';
import moonTexture from '../../assets/textures/moon.jpg';

const CanvasContainer = styled('div')({
  width: 'calc(100% - 240px)',
  height: '100vh',
  marginLeft: '240px',
  backgroundColor: '#000',
});

const Sun = () => {
  const sunRef = useRef();
  const texture = useLoader(TextureLoader, sunTexture);

  useFrame(() => {
    if (sunRef.current) {
      sunRef.current.rotation.y += 0.001;
    }
  });

  return (
    <mesh ref={sunRef}>
      <sphereGeometry args={[2, 64, 64]} />
      <meshBasicMaterial map={texture} />
      <pointLight intensity={2} distance={100} decay={1.5} />
      <pointLight intensity={1} distance={50} decay={1} color="#FDB813" />
    </mesh>
  );
};

const Moon = ({ parentPosition }) => {
  const moonRef = useRef();
  const moonOrbitRef = useRef({ angle: Math.random() * Math.PI * 2 });
  const moonOrbitRadius = 1.5;
  const texture = useLoader(TextureLoader, moonTexture);

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();
    moonOrbitRef.current.angle = elapsedTime * 0.5;
    moonRef.current.rotation.y += 0.01;
  });

  return (
    <group position={[parentPosition.x, parentPosition.y, parentPosition.z]}>
      {/* Órbita lunar */}
      <mesh rotation-x={Math.PI * 0.5}>
        <ringGeometry args={[moonOrbitRadius - 0.05, moonOrbitRadius + 0.05, 64]} />
        <meshBasicMaterial color="#ffffff" opacity={0.1} transparent={true} />
      </mesh>
      
      {/* Lua */}
      <mesh 
        ref={moonRef} 
        position={[
          Math.cos(moonOrbitRef.current.angle) * moonOrbitRadius,
          Math.sin(moonOrbitRef.current.angle * 0.5) * 0.2,
          Math.sin(moonOrbitRef.current.angle) * moonOrbitRadius
        ]}
      >
        <sphereGeometry args={[0.2, 32, 32]} />
        <meshStandardMaterial
          map={texture}
          metalness={0.1}
          roughness={0.6}
        />
      </mesh>
    </group>
  );
};

const PlanetRings = ({ radius, rotation = [Math.PI * 0.5, 0, 0], planet }) => {
  const getRingProps = () => {
    switch (planet) {
      case 'Saturno':
        return [
          { inner: 1.4, outer: 1.7, opacity: 0.6, color: "#B8860B" },  // Anel B (mais denso)
          { inner: 1.7, outer: 2.0, opacity: 0.3, color: "#DAA520" },  // Anel A
          { inner: 1.2, outer: 1.4, opacity: 0.2, color: "#CD853F" }   // Anel C (mais tênue)
        ];
      case 'Urano':
        return [
          { inner: 1.4, outer: 1.8, opacity: 0.3, color: "#40E0D0" },
          { inner: 1.8, outer: 2.0, opacity: 0.2, color: "#48D1CC" }
        ];
      case 'Netuno':
        return [
          { inner: 1.4, outer: 1.7, opacity: 0.25, color: "#4169E1" },
          { inner: 1.7, outer: 1.9, opacity: 0.15, color: "#1E90FF" }
        ];
      default:
        return [];
    }
  };

  return (
    <group rotation={rotation}>
      {getRingProps().map((ring, index) => (
        <mesh key={index}>
          <ringGeometry args={[radius * ring.inner, radius * ring.outer, 256]} />
          <meshStandardMaterial 
            color={ring.color} 
            opacity={ring.opacity} 
            transparent={true} 
            side={2}
            metalness={0.3}
            roughness={0.7}
            emissive={ring.color}
            emissiveIntensity={0.1}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  );
};

const Planet = ({ position, color, size, orbitSpeed, rotationSpeed, name, initialAngle }) => {
  const meshRef = useRef();
  const orbitRef = useRef({ angle: initialAngle });
  const orbitRadius = position[0];
  const { selectedPlanet } = usePlanetContext();
  const isSelected = selectedPlanet === name;
  const currentPosition = useRef({ x: 0, y: 0, z: 0 });
  const initialRotation = useRef(Math.random() * Math.PI * 2);

  // Carregando todas as texturas no nível do componente
  const mercuryMap = useLoader(TextureLoader, mercuryTexture);
  const venusMap = useLoader(TextureLoader, venusTexture);
  const earthMap = useLoader(TextureLoader, earthTexture);
  const marsMap = useLoader(TextureLoader, marsTexture);
  const jupiterMap = useLoader(TextureLoader, jupiterTexture);
  const saturnMap = useLoader(TextureLoader, saturnTexture);
  const uranusMap = useLoader(TextureLoader, uranusTexture);
  const neptuneMap = useLoader(TextureLoader, neptuneTexture);

  // Selecionando a textura correta para o planeta
  const getTexture = () => {
    switch (name) {
      case 'Mercúrio': return mercuryMap;
      case 'Vênus': return venusMap;
      case 'Terra': return earthMap;
      case 'Marte': return marsMap;
      case 'Júpiter': return jupiterMap;
      case 'Saturno': return saturnMap;
      case 'Urano': return uranusMap;
      case 'Netuno': return neptuneMap;
      default: return null;
    }
  };

  const texture = getTexture();

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();
    orbitRef.current.angle = initialAngle + (elapsedTime * orbitSpeed);
    
    const x = Math.cos(orbitRef.current.angle) * orbitRadius;
    const z = Math.sin(orbitRef.current.angle) * orbitRadius;
    const y = name !== 'Terra' ? Math.sin(orbitRef.current.angle * 0.5) * (orbitRadius * 0.05) : 0;
    
    meshRef.current.position.set(x, y, z);
    meshRef.current.rotation.y = initialRotation.current + (elapsedTime * rotationSpeed);

    currentPosition.current = { x, y, z };
  });

  return (
    <group>
      <mesh rotation-x={Math.PI * 0.5}>
        <ringGeometry args={[orbitRadius - 0.1, orbitRadius + 0.1, 64]} />
        <meshBasicMaterial color="#ffffff" opacity={0.15} transparent={true} />
      </mesh>
      
      <group ref={meshRef}>
        <mesh>
          <sphereGeometry args={[size, 64, 64]} />
          <meshStandardMaterial
            map={texture}
            metalness={0.1}
            roughness={0.6}
            emissive={color}
            emissiveIntensity={isSelected ? 0.4 : 0}
          />
        </mesh>
        
        {/* Anéis para planetas específicos */}
        {name === 'Saturno' && (
          <PlanetRings radius={size} planet="Saturno" />
        )}
        {name === 'Urano' && (
          <PlanetRings radius={size} planet="Urano" rotation={[0, 0, Math.PI * 0.545]} />
        )}
        {name === 'Netuno' && (
          <PlanetRings radius={size} planet="Netuno" />
        )}

        {/* Lua para a Terra */}
        {name === 'Terra' && (
          <Moon parentPosition={{x: 0, y: 0, z: 0}} />
        )}
      </group>
    </group>
  );
};

const planets = [
  { 
    position: [5, 0, 0], 
    color: '#FF6B3D', 
    size: 0.4, 
    orbitSpeed: 0.08,
    rotationSpeed: 0.0007,
    name: 'Mercúrio',
    initialAngle: 0 // 0 graus
  },
  { 
    position: [7, 0, 0], 
    color: '#FFD700', 
    size: 0.6, 
    orbitSpeed: 0.06,
    rotationSpeed: -0.0004,
    name: 'Vênus',
    initialAngle: Math.PI * 0.25 // 45 graus
  },
  { 
    position: [9, 0, 0], 
    color: '#4169E1', 
    size: 0.7, 
    orbitSpeed: 0.05,
    rotationSpeed: 0.02,
    name: 'Terra',
    initialAngle: Math.PI * 0.5 // 90 graus
  },
  { 
    position: [11, 0, 0], 
    color: '#FF4500', 
    size: 0.5, 
    orbitSpeed: 0.04,
    rotationSpeed: 0.018,
    name: 'Marte',
    initialAngle: Math.PI * 0.75 // 135 graus
  },
  { 
    position: [14, 0, 0], 
    color: '#FFA500', 
    size: 1.2, 
    orbitSpeed: 0.022,
    rotationSpeed: 0.045,
    name: 'Júpiter',
    initialAngle: Math.PI // 180 graus
  },
  { 
    position: [17, 0, 0], 
    color: '#FFD700', 
    size: 1.0, 
    orbitSpeed: 0.016,
    rotationSpeed: 0.038,
    name: 'Saturno',
    initialAngle: Math.PI * 1.25 // 225 graus
  },
  { 
    position: [20, 0, 0], 
    color: '#00CED1', 
    size: 0.8, 
    orbitSpeed: 0.011,
    rotationSpeed: 0.025,
    name: 'Urano',
    initialAngle: Math.PI * 1.5 // 270 graus
  },
  { 
    position: [23, 0, 0], 
    color: '#1E90FF', 
    size: 0.8, 
    orbitSpeed: 0.009,
    rotationSpeed: 0.028,
    name: 'Netuno',
    initialAngle: Math.PI * 1.75 // 315 graus
  },
];

const SolarSystem = () => {
  return (
    <CanvasContainer>
      <Canvas camera={{ position: [-5, 25, 35], fov: 45 }}>
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={0.5} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        <Stars 
          radius={100} 
          depth={50} 
          count={7000} 
          factor={4} 
          saturation={0.5} 
          fade 
          speed={1} 
        />
        <OrbitControls 
          enableDamping={true}
          dampingFactor={0.05}
          minDistance={10}
          maxDistance={100}
          rotateSpeed={0.5}
        />
        
        <Sun />
        {planets.map((planet) => (
          <Planet key={planet.name} {...planet} />
        ))}
      </Canvas>
    </CanvasContainer>
  );
};

export default SolarSystem; 