import { StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Game from './src/Game';

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      {/* El degradado va POR DETRÁS de SafeAreaView para que ocupe toda la
          pantalla (incluidas notch/isla/barra de navegación) sin bandas de color */}
      <LinearGradient colors={['#667eea', '#764ba2']} style={styles.container}>
        <SafeAreaView style={styles.safeArea}>
          <Game />
        </SafeAreaView>
      </LinearGradient>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
});
