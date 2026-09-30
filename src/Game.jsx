import { useEffect, useState } from 'react'
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native'
import Board from './components/Board'
import Footer from './components/Footer'
import {
  BOARD_GAP,
  BOARD_PADDING,
  CELL_COUNT,
  MAX_BOARD_WIDTH,
  MAX_CELL,
  SCREEN_PADDING,
  SECTION_GAP,
  SECTION_GAP_LARGE,
} from './layout'

/**
 * Función auxiliar que verifica si hay un ganador en el tablero
 * @param {(string | null)[]} squares - Valores de las 9 celdas
 * @returns {{ winner: string | null, line: number[] | null }}
 */
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2], // Fila superior
    [3, 4, 5], // Fila media
    [6, 7, 8], // Fila inferior
    [0, 3, 6], // Columna izquierda
    [1, 4, 7], // Columna central
    [2, 5, 8], // Columna derecha
    [0, 4, 8], // Diagonal principal
    [2, 4, 6], // Diagonal inversa
  ]

  for (const [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: [a, b, c] }
    }
  }

  return { winner: null, line: null }
}

/**
 * Componente Game: componente principal que maneja la lógica del juego
 * Incluye historial de jugadas y modo contra computadora.
 *
 * El juego llena el área segura y el tablero se ajusta al espacio disponible.
 * En pantallas bajas la página se desplaza para no recortar controles.
 */
function Game() {
  // El estado real es el historial; el tablero actual se deriva de él
  const [history, setHistory] = useState([Array(9).fill(null)])
  const [stepNumber, setStepNumber] = useState(0)
  const [gameMode, setGameMode] = useState('pvp') // 'pvp' o 'computer'
  const [boardAreaWidth, setBoardAreaWidth] = useState(0)

  const { width, height } = useWindowDimensions()

  const squares = history[stepNumber]
  const xIsNext = stepNumber % 2 === 0
  const { winner, line } = calculateWinner(squares)
  const isDraw = !winner && squares.every((square) => square !== null)
  const historyVisible = history.length > 1

  const boardChrome = BOARD_PADDING * 2 + BOARD_GAP * 2
  const horizontalPadding = width >= 600 ? 24 : SCREEN_PADDING
  // En horizontal y en tablets, el tablero no debe superar la altura útil.
  const maxBoardWidth = Math.min(MAX_BOARD_WIDTH, Math.max(280, height * 0.6))
  // onLayout corrige esta estimación al ancho real dentro del área segura.
  const estimatedWidth = Math.min(width - horizontalPadding * 2, maxBoardWidth)
  const availableWidth = boardAreaWidth || estimatedWidth
  const cell = Math.max(
    1,
    Math.min(MAX_CELL, Math.floor((availableWidth - boardChrome) / CELL_COUNT))
  )
  const sectionGap = availableWidth >= 440 ? SECTION_GAP_LARGE : SECTION_GAP

  /**
   * Maneja el toque en una celda
   * @param {number} i - Índice de la celda
   */
  function handleClick(i) {
    if (squares[i] || winner || isDraw) return
    // En modo computadora, solo el humano (X) juega con el toque
    if (gameMode === 'computer' && !xIsNext) return

    const newSquares = squares.slice()
    newSquares[i] = xIsNext ? 'X' : 'O'

    setHistory((prev) => [...prev.slice(0, stepNumber + 1), newSquares])
    setStepNumber(stepNumber + 1)
  }

  /**
   * Turno de la computadora (O). Se dispara automáticamente en modo 'computer'
   * y se cancela si el estado cambia antes de que transcurra la espera.
   */
  useEffect(() => {
    if (gameMode !== 'computer' || winner || isDraw || xIsNext) return

    const timer = setTimeout(() => {
      const emptySquares = squares
        .map((square, index) => (square === null ? index : null))
        .filter((index) => index !== null)

      if (emptySquares.length === 0) return

      const pick = emptySquares[Math.floor(Math.random() * emptySquares.length)]
      const newSquares = squares.slice()
      newSquares[pick] = 'O'

      setHistory((prev) => [...prev.slice(0, stepNumber + 1), newSquares])
      setStepNumber(stepNumber + 1)
    }, 500)

    return () => clearTimeout(timer)
  }, [gameMode, squares, stepNumber, winner, isDraw, xIsNext])

  /**
   * Reinicia el juego
   */
  function resetGame() {
    setHistory([Array(9).fill(null)])
    setStepNumber(0)
  }

  /**
   * Navega a una jugada específica del historial
   * @param {number} step - Número de movimiento
   */
  function jumpTo(step) {
    setStepNumber(step)
  }

  function getStatus() {
    if (winner) return `¡Ganador: ${winner}!`
    if (isDraw) return '¡Empate!'
    return `Turno de: ${xIsNext ? 'X' : 'O'}`
  }

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.screenContent}
      nestedScrollEnabled
    >
      <View style={[styles.game, { gap: sectionGap, paddingHorizontal: horizontalPadding }]}>
        <Text style={styles.gameTitle}>Triki</Text>

        <View style={styles.gameMode}>
          <Pressable
            onPress={() => {
              setGameMode('pvp')
              resetGame()
            }}
            style={({ pressed }) => [
              styles.modeBtn,
              gameMode === 'pvp' && styles.modeBtnActive,
              pressed && styles.pressed,
            ]}
          >
            <Text
              style={[
                styles.modeBtnText,
                gameMode === 'pvp' && styles.modeBtnTextActive,
              ]}
            >
              2 Jugadores
            </Text>
          </Pressable>

          {/* Texto fijo "Vs" entre los dos modos */}
          <Text style={styles.vsText}>Vs</Text>

          <Pressable
            onPress={() => {
              setGameMode('computer')
              resetGame()
            }}
            style={({ pressed }) => [
              styles.modeBtn,
              gameMode === 'computer' && styles.modeBtnActive,
              pressed && styles.pressed,
            ]}
          >
            <Text
              style={[
                styles.modeBtnText,
                gameMode === 'computer' && styles.modeBtnTextActive,
              ]}
            >
              Computadora
            </Text>
          </Pressable>
        </View>

        <View
          style={[
            styles.status,
            winner && styles.statusWinning,
            isDraw && styles.statusDraw,
          ]}
        >
          <Text style={styles.statusText}>{getStatus()}</Text>
        </View>

        {/* El tablero conserva su tamaño durante la partida. */}
        <View
          style={[styles.boardArea, { maxWidth: maxBoardWidth }]}
          onLayout={({ nativeEvent }) => {
            const nextWidth = nativeEvent.layout.width
            if (nextWidth !== boardAreaWidth) setBoardAreaWidth(nextWidth)
          }}
        >
          <Board
            squares={squares}
            winningLine={line}
            onSquareClick={handleClick}
            size={cell}
          />
        </View>

        <Pressable
          onPress={resetGame}
          style={({ pressed }) => [styles.resetBtn, pressed && styles.pressed]}
        >
          <Text style={styles.resetBtnText}>Reiniciar Juego</Text>
        </Pressable>

        {/* El historial tiene un límite propio; la página puede desplazarse
            cuando la pantalla sea demasiado baja para mostrar la tarjeta. */}
        <View style={styles.history}>
          {historyVisible && (
            <ScrollView
              style={styles.historyScroll}
              contentContainerStyle={styles.historyList}
              showsVerticalScrollIndicator={false}
              nestedScrollEnabled
            >
              {history.map((_, step) => (
                <Pressable
                  key={step}
                  onPress={() => jumpTo(step)}
                  accessibilityRole="button"
                  style={({ pressed }) => [
                    styles.historyBtn,
                    step === stepNumber && styles.historyBtnCurrent,
                    pressed && styles.pressed,
                  ]}
                >
                  <Text
                    style={[
                      styles.historyBtnText,
                      step === stepNumber && styles.historyBtnTextCurrent,
                    ]}
                  >
                    {step === 0 ? 'Inicio' : `Movimiento ${step}`}
                  </Text>
                </Pressable>
              ))}
            </ScrollView>
          )}
        </View>

        <Footer />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  screenContent: {
    flexGrow: 1,
  },
  game: {
    flexGrow: 1,
    width: '100%',
    paddingVertical: 16,
    justifyContent: 'space-between',
  },
  gameTitle: {
    fontSize: 34,
    fontWeight: '800',
    color: '#fff',
    letterSpacing: 3,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  gameMode: {
    flexDirection: 'row',
    alignSelf: 'center',
    width: '100%',
    maxWidth: MAX_BOARD_WIDTH,
    gap: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  vsText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#fff',
    letterSpacing: 1,
    paddingHorizontal: 2,
  },
  modeBtn: {
    flex: 1,
    minWidth: 0,
    maxWidth: 190,
    paddingVertical: 8,
    paddingHorizontal: 9,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
  },
  modeBtnActive: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  modeBtnText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center',
  },
  modeBtnTextActive: {
    color: '#667eea',
  },
  status: {
    alignSelf: 'center',
    paddingVertical: 11,
    paddingHorizontal: 28,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  statusWinning: {
    backgroundColor: '#10b981',
  },
  statusDraw: {
    backgroundColor: '#f59e0b',
  },
  statusText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
    textAlign: 'center',
  },
  boardArea: {
    alignSelf: 'center',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  resetBtn: {
    alignSelf: 'center',
    paddingVertical: 14,
    paddingHorizontal: 36,
    borderRadius: 14,
    backgroundColor: '#f43f5e',
    shadowColor: '#f43f5e',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
  },
  resetBtnText: {
    fontSize: 17,
    fontWeight: '700',
    color: '#fff',
  },
  history: {
    minHeight: 48,
    width: '100%',
    maxWidth: MAX_BOARD_WIDTH,
    alignSelf: 'center',
    alignItems: 'center',
  },
  historyScroll: {
    maxHeight: 136,
    width: '100%',
  },
  historyList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    justifyContent: 'center',
    paddingBottom: 6,
  },
  historyBtn: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },
  historyBtnCurrent: {
    backgroundColor: '#fff',
  },
  historyBtnText: {
    fontSize: 14,
    color: '#fff',
  },
  historyBtnTextCurrent: {
    color: '#667eea',
    fontWeight: '600',
  },
  pressed: {
    opacity: 0.7,
  },
})

export default Game
