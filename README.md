# Bienestar

Aplicación Bienestar

## Descripción
Aplicación web (FrontEnd) en React para gestionar información de bienestar. Actualmente NO se carga ni procesa ningún archivo Excel; la estructura de pestañas y formularios es estática y podrá ajustarse manualmente según los requerimientos.

## Tecnologías principales
- React + Vite
- Chakra UI (componentes y diseño)
- React Router (navegación)
- Recharts para visualizar datos (gráficos)

## Estructura del proyecto FrontEnd
- FrontEnd/src/pages/Home.jsx: Página de inicio con navegación
- FrontEnd/src/pages/Recoleccion.jsx: Página con 4 pestañas de recolección (incluye un horario semanal editable en la 4ta pestaña)
- FrontEnd/src/pages/Estadisticas.jsx: Pantalla placeholder (sin carga de datos)
- FrontEnd/src/components/NavBar.jsx: Barra de navegación

## Cómo ejecutar
1. Requisitos: Node.js 18+ y npm
2. Instalar dependencias:
   - `cd FrontEnd`
   - `npm install`
3. Ejecutar entorno de desarrollo:
   - `npm run dev`
4. Abrir el navegador en la URL que muestre la terminal (por ejemplo, http://localhost:5173/)

## Flujo de la aplicación
- Al iniciar, el FrontEnd lee `public/dataset.xlsx`, procesa sus hojas y expone los datos mediante un DataContext.
- En Estadísticas se puede seleccionar la hoja, ver el resumen de columnas (conteo, min/max/media para numéricas; top de frecuencias para categóricas) y un gráfico de barras con las categorías más frecuentes de la columna seleccionada.
- La pantalla de recolección (Home) contiene 4 pestañas como placeholders para que, más adelante, se implementen los formularios específicos.

## Patrones y arquitectura aplicados (de forma pragmática)
- Service Layer (services/xlsxService.js): aísla el acceso a datos (carga/parsing del Excel) del resto de la UI.
- Context (context/DataContext.jsx): expone datos y estado global de carga/errores a toda la aplicación sin prop drilling.
- Hooks (hooks/useStats.js): encapsula la lógica de análisis para reutilizar y testear con facilidad.
- Routing (React Router): separa las rutas Home (recolección) y Estadísticas.
- Presentational/Container: páginas (Home, Estadísticas) componen la UI con componentes de Chakra y consumen datos del contexto.

## Cómo modificar
- Reemplaza el archivo `FrontEnd/public/dataset.xlsx` por la nueva versión del Excel (manteniendo el mismo nombre) si deseas mostrar otras estadísticas.
- Ajusta `useStats.js` si quieres reglas distintas para detectar numéricos o estadísticas adicionales (mediana, desviación, histogramas, etc.).
- Implementa los formularios reales en cada pestaña dentro de `pages/Home.jsx` o separándolos en componentes.

## Próximos pasos sugeridos
- Persistencia real en BBDD (API/Backend) y envío desde los formularios de las 4 pestañas.
- Validación y normalización de datos en formularios.
- Gráficos adicionales (tendencias, histogramas) y filtros.
- Internacionalización y temas de accesibilidad.
