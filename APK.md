# Generar el APK de Triqui

Este proyecto usa Expo SDK 57 y EAS Build. El perfil `apk` de `eas.json`
genera un APK de prueba instalable directamente, sin servidor de desarrollo.

1. Revisa `expo.android.package` en `app.json` antes de distribuir la app. El
   identificador actual es `com.jorgetamayol.triqui`; cambiarlo después de
   instalar la app hará que Android la trate como otra aplicación.
2. Inicia sesión con tu cuenta de Expo: `npx eas-cli@latest login`.
3. Ejecuta `npx eas-cli@latest build --platform android --profile apk`.
4. En el primer build, acepta crear las credenciales de firma de Android en
   EAS y guárdalas para futuras actualizaciones.
5. Cuando termine, descarga el `.apk` desde el enlace de EAS e instálalo en
   el dispositivo Android.

Antes de generar el APK puedes verificar el proyecto con `npx expo lint`,
`npx tsc --noEmit` y `npx expo-doctor`.

Este APK es para instalación directa; si más adelante quieres publicarlo en
Google Play, configura un perfil de producción que genere un archivo `.aab`.
