export const formsSchema = [
  {
    key: 'escaneoEnergia',
    label: 'Escaneo de Energía',
    fields: [
      { name: 'Fecha', type: 'date' },
      { name: 'Actividad', type: 'text' },
      { name: 'Tipo', type: 'select', options: ['Carga', 'Drena'] },
      { name: 'Nivel de Energía Antes (1-10)', type: 'number', min: 1, max: 10 },
      { name: 'Nivel de Energía Después (1-10)', type: 'number', min: 1, max: 10 },
      { name: 'Emoción Principal', type: 'text' },
      { name: 'Intensidad Emoción (1-10)', type: 'number', min: 1, max: 10 },
      // Nuevos campos para mayor contexto
      { name: 'Duración (min)', type: 'number', min: 0 },
      { name: 'Emociones secundarias (separadas por coma)', type: 'text', placeholder: 'Ej.: alegría, nostalgia' },
      { name: 'Factores externos (separados por coma)', type: 'text', placeholder: 'Clima, sueño, alimentación, interrupciones' },
      { name: 'Pensamientos asociados', type: 'textarea' },
      { name: 'Conducta o reacción', type: 'select', options: ['Evitar', 'Dialogar', 'Distraerse', 'Enfrentar', 'Otro'] },
      { name: 'Impacto en áreas de vida (separadas por coma)', type: 'text', placeholder: 'Productividad, relaciones, salud, motivación' },
      { name: 'Contexto (solo, trabajo, amigos, etc.)', type: 'text', placeholder: 'Solo, trabajo, amigos, etc.' },
      { name: 'Notas', type: 'textarea' },
    ],
  },
  {
    key: 'valoresCoherencia',
    label: 'Valores y coherencia',
    fields: [
      { name: 'Valor', type: 'text' },
      { name: '¿Por qué es importante para mí?', type: 'textarea' },
      { name: 'Acciones relacionadas', type: 'textarea' },
      { name: 'Frecuencia (Diaria/Semanal/Mensual)', type: 'select', options: ['Diaria', 'Semanal', 'Mensual'] },
      { name: 'Nivel de coherencia percibido (1-10)', type: 'number', min: 1, max: 10 },
      // Nuevos campos de robustecimiento
      { name: 'Meta vinculada', type: 'text', placeholder: 'Ej.: completar curso en 6 meses' },
      { name: 'Plazo', type: 'select', options: ['Corto', 'Mediano', 'Largo'] },
      { name: 'Nivel de importancia percibido (1-10)', type: 'number', min: 1, max: 10 },
      { name: 'Satisfacción con este valor (1-10)', type: 'number', min: 1, max: 10 },
      { name: 'Periodo de evaluación', type: 'select', options: ['Semanal', 'Mensual'] },
      { name: 'Ideas de mejora / microacciones', type: 'textarea' },
    ],
  },
  {
    key: 'microAcciones',
    label: 'Microacciones',
    fields: [
      { name: 'Fecha', type: 'date' },
      { name: 'Microacción', type: 'text' },
      { name: 'Valor relacionado', type: 'text' },
      { name: 'Duración (min)', type: 'number', min: 0 },
      { name: 'Estado (Pendiente/Hecha/Cancelada)', type: 'select', options: ['Pendiente', 'Hecha', 'Cancelada'] },
      { name: 'Impacto percibido (1-10)', type: 'number', min: 1, max: 10 },
      // Nuevos campos
      { name: 'Prioridad (Alta/Media/Baja)', type: 'select', options: ['Alta', 'Media', 'Baja'] },
      { name: 'Grado de sentido (1-10)', type: 'number', min: 1, max: 10 },
      { name: 'Resultado o logro', type: 'textarea' },
      { name: 'Distracciones/Interrupciones (separadas por coma)', type: 'text' },
      { name: '¿Mantener como hábito? (Sí/No)', type: 'select', options: ['Sí', 'No'] },
      { name: 'Notas', type: 'textarea' },
    ],
  },
  // Nueva hoja: Resumen Diario / Evaluación Global
  {
    key: 'resumenDiario',
    label: 'Resumen Diario',
    fields: [
      { name: 'Fecha', type: 'date' },
      { name: 'Satisfacción general con el día (1-10)', type: 'number', min: 1, max: 10 },
      { name: 'Nivel de sentido percibido (1-10)', type: 'number', min: 1, max: 10 },
      { name: 'Estado físico general', type: 'select', options: ['Bueno', 'Regular', 'Malo'] },
      { name: 'Horas de sueño', type: 'number', min: 0, max: 24 },
      { name: 'Calidad del sueño (1-10)', type: 'number', min: 1, max: 10 },
      { name: 'Alimentación percibida', type: 'select', options: ['Balanceada', 'Pesada', 'Irregular'] },
      { name: 'Evento positivo destacado del día', type: 'textarea' },
      { name: 'Evento negativo o reto del día', type: 'textarea' },
      { name: 'Evaluación de foco (1-10)', type: 'number', min: 1, max: 10 },
      { name: 'Reflexión libre', type: 'textarea' },
    ],
  },
];

export const scheduleTab = {
  key: 'horarioSemanal',
  label: 'Horario',
};