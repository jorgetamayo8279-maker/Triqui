Triqui
Juego de triqui (tres en raya) desarrollado con React Native y Expo. La aplicación permite jugar en el mismo dispositivo contra otra persona o contra la computadora y consultar el historial de movimientos de cada partida.

Características
Modo para dos jugadores.
Modo contra la computadora.
Detección automática de victoria y empate.
Resaltado de la combinación ganadora.
Historial para regresar a cualquier movimiento de la partida.
Tablero adaptable a teléfonos, tablets y orientación horizontal.
Soporte para Android, iOS y web mediante Expo.
Tecnologías
Expo SDK 57
React 19
React Native 0.86
Expo Linear Gradient
React Native Safe Area Context
Requisitos
Node.js en una versión LTS vigente.
npm.
Expo Go en un dispositivo móvil o un emulador configurado.
Instalación
git clone https://github.com/jorgetamayo8279-maker/Triqui.git
cd Triqui
npm install
Ejecución
Inicia el servidor de desarrollo:

npx expo start
Después, escanea el código QR con Expo Go o selecciona una de las opciones que muestra la terminal. También puedes iniciar una plataforma directamente:

npm run android
npm run ios
npm run web
Para ejecutar iOS localmente se necesita macOS. Como alternativa, se puede abrir el proyecto en Expo Go desde un iPhone.

Scripts disponibles
Comando	Descripción
npm start	Inicia el servidor de desarrollo de Expo.
npm run android	Abre la aplicación en Android.
npm run ios	Abre la aplicación en iOS.
npm run web	Abre la aplicación en el navegador.
npm run lint	Analiza el código con ESLint.
npx tsc --noEmit	Comprueba los tipos sin generar archivos.
Estructura del proyecto
Triqui/
├── assets/                    # Iconos, splash screen y favicon
├── src/
│   ├── components/
│   │   ├── Board.jsx         # Tablero de 3 × 3
│   │   ├── Square.jsx        # Celda interactiva del tablero
│   │   ├── Footer.jsx        # Información de autoría
│   │   └── *.css             # Estilos de la antigua versión web
│   ├── Game.jsx              # Interfaz y lógica principal del juego
│   ├── layout.js             # Constantes compartidas de diseño adaptable
│   ├── main.jsx              # Entrada de la antigua versión web
│   ├── *.css                 # Estilos web conservados como referencia
│   └── README.md             # Notas sobre el código activo y legacy
├── App.js                    # Componente raíz y configuración visual global
├── index.js                  # Punto de entrada de Expo
├── app.json                  # Configuración de la aplicación
├── eas.json                  # Perfil de compilación APK con EAS
├── APK.md                    # Guía para generar un APK de Android
├── eslint.config.js          # Configuración de ESLint
├── tsconfig.json             # Configuración del comprobador de tipos
└── package.json              # Dependencias y scripts del proyecto
Los archivos src/main.jsx y *.css pertenecen a una versión web anterior y no forman parte del bundle actual. El flujo activo comienza en index.js, pasa por App.js y renderiza los componentes de React Native ubicados en src/.

Cómo jugar
Selecciona 2 Jugadores o Computadora.
Toca una celda vacía para colocar la ficha X.
En el modo de dos jugadores, los turnos alternan entre X y O; en el modo contra la computadora, esta realiza automáticamente el turno de O.
Usa el historial para volver a una jugada anterior o pulsa Reiniciar Juego para comenzar otra partida.
Generar un APK
El proyecto incluye un perfil de EAS para crear un APK instalable:

npx eas-cli@latest login
npx eas-cli@latest build --platform android --profile apk
Consulta APK.md para ver las instrucciones completas.

Autor
Jorge Tamayo L.

Licencia
Este proyecto incluye una licencia MIT.
