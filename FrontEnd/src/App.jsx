import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Box } from '@chakra-ui/react';
import Home from './pages/Home';
import Recoleccion from './pages/Recoleccion';
import Estadisticas from './pages/Estadisticas';
import NavBar from './components/NavBar';

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Box as="main" w="100%" px={{ base: 4, md: 6, lg: 8 }} py={{ base: 4, md: 6 }}>
        <Box w={{ base: '100%', md: '90%', lg: '80%' }} mx="auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/recoleccion" element={<Recoleccion />} />
            <Route path="/estadisticas" element={<Estadisticas />} />
          </Routes>
        </Box>
      </Box>
    </BrowserRouter>
  );
}

export default App;
