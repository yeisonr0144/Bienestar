import React, { useEffect, useRef, useState } from 'react';
import {
  Box,
  Heading,
  HStack,
  Button,
  Select as CSelect,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  useDisclosure,
} from '@chakra-ui/react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import esLocale from '@fullcalendar/core/locales/es';

const STORAGE_KEY = 'horario-events';

function loadEvents() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveEvents(events) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
  } catch {}
}

function toLocalDatetimeValue(dateLike) {
  const d = dateLike instanceof Date ? dateLike : new Date(dateLike);
  const pad = (n) => String(n).padStart(2, '0');
  const yyyy = d.getFullYear();
  const mm = pad(d.getMonth() + 1);
  const dd = pad(d.getDate());
  const hh = pad(d.getHours());
  const mi = pad(d.getMinutes());
  return `${yyyy}-${mm}-${dd}T${hh}:${mi}`;
}

export default function Horario() {
  const calendarRef = useRef(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [events, setEvents] = useState([]);
  const [view, setView] = useState('timeGridWeek'); // 'dayGridMonth' | 'timeGridWeek' | 'timeGridDay'
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({ id: null, title: '', notes: '', start: '', end: '' });

  useEffect(() => {
    setEvents(loadEvents());
  }, []);

  useEffect(() => {
    saveEvents(events);
  }, [events]);

  const openCreateModal = (startStr, endStr) => {
    setIsEditing(false);
    setForm({ id: null, title: '', notes: '', start: toLocalDatetimeValue(startStr), end: toLocalDatetimeValue(endStr) });
    onOpen();
  };

  const onSelect = (selectionInfo) => {
    openCreateModal(selectionInfo.startStr, selectionInfo.endStr);
  };

  const onEventClick = (clickInfo) => {
    const ev = clickInfo.event;
    setIsEditing(true);
    setForm({
      id: ev.id,
      title: ev.title || '',
      notes: ev.extendedProps?.notes || '',
      start: toLocalDatetimeValue(ev.start),
      end: toLocalDatetimeValue(ev.end || ev.start),
    });
    onOpen();
  };

  const onEventChange = (changeInfo) => {
    const ev = changeInfo.event;
    setEvents((prev) => prev.map((e) => (e.id === ev.id ? {
      ...e,
      start: ev.start?.toISOString() || e.start,
      end: ev.end?.toISOString() || e.end,
    } : e)));
  };

  const submitForm = () => {
    const startISO = new Date(form.start).toISOString();
    const endISO = new Date(form.end).toISOString();
    if (isEditing && form.id) {
      setEvents((prev) => prev.map((e) => (e.id === form.id ? { ...e, title: form.title, extendedProps: { ...(e.extendedProps||{}), notes: form.notes }, start: startISO, end: endISO } : e)));
    } else {
      const id = String(Date.now());
      setEvents((prev) => ([...prev, { id, title: form.title || 'Sin título', start: startISO, end: endISO, extendedProps: { notes: form.notes } }]));
    }
    onClose();
  };

  const deleteEvent = () => {
    if (!isEditing || !form.id) return;
    setEvents((prev) => prev.filter((e) => e.id !== form.id));
    onClose();
  };

  const changeView = (v) => {
    setView(v);
    const api = calendarRef.current?.getApi();
    if (api) api.changeView(v);
  };

  return (
    <Box w="100%">
      <Box borderWidth="1px" borderRadius="lg" p={{ base: 4, md: 6 }} bg="white" boxShadow="sm">
        <Heading as="h1" size="lg" mb={4}>Horario</Heading>

        <HStack mb={3} spacing={3} justify="space-between">
          <CSelect value={view} onChange={(e) => changeView(e.target.value)} maxW="220px">
            <option value="timeGridDay">Día</option>
            <option value="timeGridWeek">Semana</option>
            <option value="dayGridMonth">Mes</option>
          </CSelect>
          <Button colorScheme="blue" onClick={() => openCreateModal(new Date(), new Date(Date.now() + 60*60*1000))}>
            Añadir actividad
          </Button>
        </HStack>

        <Box borderWidth="1px" borderRadius="md" overflow="hidden">
          <FullCalendar
            ref={calendarRef}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            headerToolbar={{ left: 'prev,next today', center: 'title', right: 'dayGridMonth,timeGridWeek,timeGridDay' }}
            initialView={view}
            locale={esLocale}
            selectable={true}
            selectMirror={true}
            select={onSelect}
            editable={true}
            eventClick={onEventClick}
            eventChange={onEventChange}
            events={events}
            nowIndicator={true}
            slotMinTime={'06:00:00'}
            slotMaxTime={'22:00:00'}
            height={'80vh'}
          />
        </Box>

        <Modal isOpen={isOpen} onClose={onClose} isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{isEditing ? 'Editar actividad' : 'Nueva actividad'}</ModalHeader>
            <ModalBody>
              <FormControl mb={3}>
                <FormLabel>Título</FormLabel>
                <Input value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} />
              </FormControl>
              <FormControl mb={3}>
                <FormLabel>Inicio</FormLabel>
                <Input type="datetime-local" value={form.start} onChange={(e) => setForm((f) => ({ ...f, start: e.target.value }))} />
              </FormControl>
              <FormControl mb={3}>
                <FormLabel>Fin</FormLabel>
                <Input type="datetime-local" value={form.end} onChange={(e) => setForm((f) => ({ ...f, end: e.target.value }))} />
              </FormControl>
              <FormControl>
                <FormLabel>Notas</FormLabel>
                <Textarea rows={4} value={form.notes} onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))} />
              </FormControl>
            </ModalBody>
            <ModalFooter>
              {isEditing && (
                <Button colorScheme="red" mr={3} onClick={deleteEvent}>Eliminar</Button>
              )}
              <Button variant="ghost" mr={3} onClick={onClose}>Cancelar</Button>
              <Button colorScheme="blue" onClick={submitForm}>{isEditing ? 'Guardar' : 'Crear'}</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </Box>
  );
}