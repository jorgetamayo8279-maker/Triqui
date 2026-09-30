/**
 * Constantes de layout compartidas entre Game, Board y Footer.
 *
 * El juego ocupa la pantalla; el tablero se limita para que sea cómodo
 * en tablets y en ventanas anchas.
 */

// Relleno interior de la pantalla
export const SCREEN_PADDING = 16

// Solo el tablero tiene un ancho máximo; el fondo y la pantalla no.
export const MAX_BOARD_WIDTH = 640

// Separación vertical entre los bloques de la tarjeta.
export const SECTION_GAP = 8
export const SECTION_GAP_LARGE = 14 // en tablets/tarjetas anchas (>= 480 dp)

// Tablero cuadrado
export const BOARD_PADDING = 16
export const BOARD_GAP = 10
export const MAX_CELL = 196
export const CELL_COUNT = 3
