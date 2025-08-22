import React from 'react';
import { Box, Heading, Text } from '@chakra-ui/react';

export default function Estadisticas() {
  return (
    <Box w="100%">
      <Box borderWidth="1px" borderRadius="lg" p={{ base: 4, md: 6 }} bg="white" boxShadow="sm">
        <Heading as="h1" size="lg" mb={4}>Estadísticas</Heading>
        <Text>Próximamente: aquí se mostrarán las métricas y visualizaciones de los datos recopilados.</Text>
      </Box>
    </Box>
  );
}