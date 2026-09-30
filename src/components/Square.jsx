import { Pressable, StyleSheet, Text } from 'react-native'

/**
 * Componente Square: representa una celda individual del tablero
 * @param {{ size: number, value: string | null, isWinning: boolean, onPress: () => void }} props
 */
function Square({ size, value, isWinning, onPress }) {
  const disabled = !!value

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityLabel={value ? `Celda con ${value}` : 'Celda vacía'}
      style={({ pressed }) => [
        styles.square,
        { width: size, height: size },
        value === 'X' && styles.squareX,
        value === 'O' && styles.squareO,
        isWinning && styles.winning,
        !value && pressed && styles.squarePressed,
      ]}
    >
      <Text
        style={[
          styles.value,
          { fontSize: Math.round(size * 0.5) },
          value === 'X' && styles.valueX,
          value === 'O' && styles.valueO,
        ]}
      >
        {value}
      </Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  square: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  squareX: {
    backgroundColor: '#e0e7ff',
  },
  squareO: {
    backgroundColor: '#fce7f3',
  },
  winning: {
    backgroundColor: '#10b981',
  },
  squarePressed: {
    backgroundColor: '#f0f4ff',
    transform: [{ scale: 1.02 }],
  },
  value: {
    fontWeight: '700',
    color: '#111827',
  },
  valueX: {
    color: '#6366f1',
  },
  valueO: {
    color: '#ec4899',
  },
})

export default Square
