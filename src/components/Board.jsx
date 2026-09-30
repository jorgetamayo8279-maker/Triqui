import { StyleSheet, View } from 'react-native'
import Square from './Square'
import { BOARD_GAP, BOARD_PADDING } from '../layout'

/**
 * Componente Board: representa el tablero de 3x3
 * @param {{ squares: (string | null)[], winningLine: number[] | null, onSquareClick: (index: number) => void, size: number }} props
 */
function Board({ squares, winningLine, onSquareClick, size }) {
  return (
    <View style={styles.board}>
      {[0, 1, 2].map((row) => (
        <View key={row} style={styles.boardRow}>
          {[0, 1, 2].map((col) => {
            const index = row * 3 + col
            return (
              <Square
                key={index}
                size={size}
                value={squares[index]}
                isWinning={!!winningLine && winningLine.includes(index)}
                onPress={() => onSquareClick(index)}
              />
            )
          })}
        </View>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  board: {
    alignSelf: 'center',
    padding: BOARD_PADDING,
    gap: BOARD_GAP,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  boardRow: {
    flexDirection: 'row',
    gap: BOARD_GAP,
  },
})

export default Board
