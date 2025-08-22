import React, { useMemo, useState } from 'react';
import { Box, Heading, Tabs, TabList, TabPanels, Tab, TabPanel, Text, VStack, FormControl, FormLabel, Input, Table, Thead, Tr, Th, Tbody, Td } from '@chakra-ui/react';

export default function Recoleccion() {
  const tabs = ['Pestaña 1', 'Pestaña 2', 'Pestaña 3', 'Pestaña 4'];

  // Estado de formularios por hoja (tabs genéricos)
  const [formState, setFormState] = useState({});
  const handleFormChange = (sheet, field, value) => {
    setFormState((prev) => ({
      ...prev,
      [sheet]: { ...(prev[sheet] || {}), [field]: value },
    }));
  };

  // Estado del horario semanal (para la 4ta pestaña)
  const [scheduleState, setScheduleState] = useState({});
  const setScheduleValue = (day, hour, value) => {
    setScheduleState((prev) => ({
      ...prev,
      [day]: { ...(prev[day] || {}), [hour]: value },
    }));
  };

  const SCHEDULE_INDEX = 3; // 4ta pestaña (índice base 0)

  const defaultDays = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
  const hours = useMemo(() => Array.from({ length: 24 }, (_, i) => `${String(i).padStart(2, '0')}:00`), []);

  return (
    <Box w="100%">
      <Box borderWidth="1px" borderRadius="lg" p={{ base: 4, md: 6 }} bg="white" boxShadow="sm">
        <Heading as="h1" size="lg" mb={4}>Recolección</Heading>

        <Tabs colorScheme="blue" variant="enclosed">
          <TabList>
            {tabs.map((name, idx) => (
              <Tab key={name + idx}>{name}</Tab>
            ))}
          </TabList>
          <TabPanels>
            {tabs.map((name, idx) => {
              const isSchedule = idx === SCHEDULE_INDEX;

              if (isSchedule) {
                const days = defaultDays;
                return (
                  <TabPanel key={name + idx}>
                    <Heading as="h2" size="md" mb={3}>Horario semanal</Heading>
                    <Box overflowX="auto">
                      <Table size="sm" variant="simple" minW="700px">
                        <Thead>
                          <Tr>
                            <Th>Hora</Th>
                            {days.map((d) => (<Th key={d}>{d}</Th>))}
                          </Tr>
                        </Thead>
                        <Tbody>
                          {hours.map((h) => (
                            <Tr key={h}>
                              <Td fontWeight="bold">{h}</Td>
                              {days.map((d) => (
                                <Td key={`${d}-${h}`}>
                                  <Input
                                    size="sm"
                                    placeholder="Actividad"
                                    value={(scheduleState[d]?.[h]) || ''}
                                    onChange={(e) => setScheduleValue(d, h, e.target.value)}
                                  />
                                </Td>
                              ))}
                            </Tr>
                          ))}
                        </Tbody>
                      </Table>
                    </Box>
                    <Text mt={3} fontSize="sm" color="gray.600">Asigna una actividad por hora y por día.</Text>
                  </TabPanel>
                );
              }

              // Formulario genérico para las demás pestañas
              const visibleHeaders = ['Campo 1', 'Campo 2', 'Campo 3'];
              const current = formState[name] || {};
              return (
                <TabPanel key={name + idx}>
                  <VStack align="stretch" spacing={3}>
                    {visibleHeaders.map((col) => (
                      <FormControl key={col}>
                        <FormLabel>{col}</FormLabel>
                        <Input
                          placeholder={`Ingrese ${col}`}
                          value={current[col] || ''}
                          onChange={(e) => handleFormChange(name, col, e.target.value)}
                        />
                      </FormControl>
                    ))}
                  </VStack>
                </TabPanel>
              );
            })}
          </TabPanels>
        </Tabs>
      </Box>
    </Box>
  );
}