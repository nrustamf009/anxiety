import { Manrope_400Regular, Manrope_500Medium, Manrope_600SemiBold, Manrope_700Bold } from "@expo-google-fonts/manrope";
import { PTSerif_400Regular, PTSerif_400Regular_Italic, PTSerif_700Bold } from "@expo-google-fonts/pt-serif";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { SettingsProvider, useSettings } from "../lib/settings";
import { useTheme } from "../theme";

SplashScreen.preventAutoHideAsync().catch(() => {});

function Shell() {
  const { c, dark } = useTheme();
  const { ready } = useSettings();
  const [fontsLoaded] = useFonts({ PTSerif_400Regular, PTSerif_400Regular_Italic, PTSerif_700Bold, Manrope_400Regular, Manrope_500Medium, Manrope_600SemiBold, Manrope_700Bold });

  useEffect(() => {
    if (fontsLoaded && ready) SplashScreen.hideAsync().catch(() => {});
  }, [fontsLoaded, ready]);

  if (!fontsLoaded || !ready) return null;
  return (
    <>
      <StatusBar style={dark ? "light" : "dark"} />
      <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: c.bg }, animation: "fade" }}>
        <Stack.Screen name="crisis" options={{ presentation: "modal", animation: "slide_from_bottom" }} />
      </Stack>
    </>
  );
}

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <SettingsProvider>
        <Shell />
      </SettingsProvider>
    </SafeAreaProvider>
  );
}
