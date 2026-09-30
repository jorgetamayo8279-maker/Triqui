# src/ — código legacy (versión web)

Esta carpeta contiene **dos cosas**:

## 1. Código activo (React Native / Expo)

Estos archivos son los que usa la app y se importan desde `App.js`:

| Archivo | Rol |
|---|---|
| `src/Game.jsx` | Pantalla principal (lógica, historial, modo CPU) |
| `src/components/Board.jsx` | Tablero 3×3 |
| `src/components/Square.jsx` | Celda |
| `src/components/Footer.jsx` | Pie con autoría |

## 2. Código legacy (versión web con React + CSS) — NO FUNCIONAL

Estos archivos **no se ejecutan**. Son la versión original para navegador
(React DOM + CSS) y se conservan sólo como referencia histórica:

- `src/main.jsx` — entrypoint de ReactDOM (nada lo importa; el entry real es `index.js` → `App.js`)
- `src/index.css`
- `src/Game.css`
- `src/components/Board.css`
- `src/components/Square.css`
- `src/components/Footer.css`

**Por qué no rompen el proyecto:** Metro (el bundler de Expo) sólo incluye los
archivos alcanzables desde el punto de entrada `index.js`. Ningún archivo activo
importa estos CSS ni `main.jsx`, así que nunca se resuelven ni se compilan.

**Para reactivarlos** (si algún día se quiere la versión web) haría falta:
instalar `react-dom` + `react-native-web` y crear un `index.html` con
`<div id="root">`, o bien crear un proyecto Vite aparte. No hacerlo sin revisar
que los JSX legacy no estén desfasados respecto a la versión RN actual.

> Nota: `src/components/Footer.jsx` (RN) ya no usa `/img/1.png` (no existía);
> usa `assets/icon.png`.
