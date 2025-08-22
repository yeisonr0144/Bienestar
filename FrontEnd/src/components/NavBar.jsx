import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Flex, Heading, HStack, Link } from '@chakra-ui/react';

export default function NavBar() {
  return (
    <Box as="header" borderBottomWidth="1px" mb={4} w="100%">
      <Flex w={{ base: '100%', md: '90%', lg: '80%' }} mx="auto" px={{ base: 4, md: 6, lg: 8 }} py={4} align="center" justify="space-between">
        <Heading size="md">Bienestar</Heading>
        <HStack spacing={4} wrap="wrap">
          <Link as={RouterLink} to="/">Inicio</Link>
          <Link as={RouterLink} to="/recoleccion">Recolección</Link>
          <Link as={RouterLink} to="/estadisticas">Estadísticas</Link>
        </HStack>
      </Flex>
    </Box>
  );
}