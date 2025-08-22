import React from 'react';
import { Box, Heading, Text, Stack, Button } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

export default function Home() {
  return (
    <Box w="100%">
      <Box borderWidth="1px" borderRadius="lg" p={{ base: 4, md: 6 }} bg="white" boxShadow="sm">
        <Heading as="h1" size="lg" mb={4}>Bienestar - Inicio</Heading>
        <Text mb={6}>
          Bienvenido a la aplicación de Bienestar. Usa las secciones para capturar información (Recolección) y, más adelante, visualizar métricas (Estadísticas).
        </Text>
        <Stack direction={{ base: 'column', sm: 'row' }} spacing={4}>
          <Button as={RouterLink} to="/recoleccion" colorScheme="blue">Ir a Recolección</Button>
          <Button as={RouterLink} to="/estadisticas" variant="outline" colorScheme="blue">Ir a Estadísticas</Button>
        </Stack>
      </Box>
    </Box>
  );
}