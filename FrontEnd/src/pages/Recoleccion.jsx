import React, { useState } from 'react';
import {
  Box,
  Heading,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  NumberInput,
  NumberInputField,
} from '@chakra-ui/react';
import { formsSchema } from '../config/formsSchema';
import { Grid, GridItem } from '@chakra-ui/react';

export default function Recoleccion() {
  // Derivar pestañas a partir del esquema (sin horario aquí)
  const tabs = formsSchema.map((f) => f.label);

  // Estado de formularios por hoja (tabs del esquema)
  const [formState, setFormState] = useState({});
  const handleFormChange = (formKey, field, value) => {
    setFormState((prev) => ({
      ...prev,
      [formKey]: { ...(prev[formKey] || {}), [field]: value },
    }));
  };

  const renderField = (formKey, field, current) => {
    const value = current[field.name] ?? '';
    switch (field.type) {
      case 'text':
        return (
          <Input
            placeholder={field.placeholder || `Ingrese ${field.name}`}
            value={value}
            onChange={(e) => handleFormChange(formKey, field.name, e.target.value)}
          />
        );
      case 'textarea':
        return (
          <Textarea
            placeholder={field.placeholder || `Ingrese ${field.name}`}
            value={value}
            onChange={(e) => handleFormChange(formKey, field.name, e.target.value)}
          />
        );
      case 'select':
        return (
          <Select
            placeholder={field.placeholder || 'Seleccione...'}
            value={value}
            onChange={(e) => handleFormChange(formKey, field.name, e.target.value)}
          >
            {(field.options || []).map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </Select>
        );
      case 'number':
        // Si el rango es 1-10, usar un Select para hacerlo seleccionable
        if (field.min === 1 && field.max === 10) {
          return (
            <Select
              placeholder={field.placeholder || 'Seleccione un valor (1-10)'}
              value={value}
              onChange={(e) => handleFormChange(formKey, field.name, e.target.value)}
            >
              {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                <option key={n} value={n}>{n}</option>
              ))}
            </Select>
          );
        }
        return (
          <NumberInput
            min={field.min}
            max={field.max}
            value={value}
            onChange={(valStr) => handleFormChange(formKey, field.name, valStr)}
          >
            <NumberInputField placeholder={field.placeholder || `Ingrese ${field.name}`} />
          </NumberInput>
        );
      case 'date':
        return (
          <Input
            type="date"
            value={value}
            onChange={(e) => handleFormChange(formKey, field.name, e.target.value)}
          />
        );
      default:
        return (
          <Input
            placeholder={field.placeholder || `Ingrese ${field.name}`}
            value={value}
            onChange={(e) => handleFormChange(formKey, field.name, e.target.value)}
          />
        );
    }
  };

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
            {formsSchema.map((form, idx) => {
              const current = formState[form.key] || {};
              return (
                <TabPanel key={form.key + idx}>
                  <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={4}>
                    {form.fields.map((field) => (
                      <GridItem key={field.name} colSpan={{ base: 1, md: field.type === 'textarea' ? 2 : 1 }}>
                        <FormControl>
                          <FormLabel>{field.name}</FormLabel>
                          {renderField(form.key, field, current)}
                        </FormControl>
                      </GridItem>
                    ))}
                  </Grid>
                </TabPanel>
              );
            })}
          </TabPanels>
        </Tabs>
      </Box>
    </Box>
  );
}