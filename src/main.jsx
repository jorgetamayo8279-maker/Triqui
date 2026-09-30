/**
 * ⚠️ ARCHIVO LEGACY — NO SE USA.
 * Entrypoint de la versión web (React DOM). El proyecto es Expo/React Native
 * y su entry real es `index.js` → `App.js`. Ver `src/README.md`.
 * Mantenido sólo como referencia histórica.
 */
import React from 'react'
import ReactDOM from 'react-dom/client'
import Game from './Game.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Game />
  </React.StrictMode>,
)
