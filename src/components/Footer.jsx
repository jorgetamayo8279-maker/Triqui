import { Image, StyleSheet, Text, View } from 'react-native'
import { MAX_BOARD_WIDTH } from '../layout'
import logo from '../../assets/ICON1.png'

// El proyecto no incluye la imagen del pie original (/img/1.png),
// así que se usa el icono de la app.

function Footer() {
  return (
    <View style={styles.footer}>
      <View style={styles.footerContent}>
        <Image source={logo} style={styles.footerLogo} />
        <View style={styles.footerText}>
          <Text style={styles.footerName}>
            Realizado por JORGE TAMAYO L
          </Text>
          <Text style={styles.footerCopy}>© {new Date().getFullYear()} Juego</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  footer: {
    alignSelf: 'center',
    marginTop: 8,
    padding: 10,
    borderRadius: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    width: '100%',
    maxWidth: MAX_BOARD_WIDTH,
  },
  footerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  footerLogo: {
    width: 46,
    height: 46,
    borderRadius: 8,
  },
  footerText: {
    flex: 1,
    gap: 2
  },
  footerName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  footerCopy: {
    color: 'rgba(242, 239, 239, 0.92)',
    fontSize: 14,
  },
})

export default Footer
