import { useCallback } from "react";
import { LogBox } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import RootNavigator from "./navigators/RootNavigator";

SplashScreen.preventAutoHideAsync();
// LogBox.ignoreAllLogs();

export default function App() {
  const [fontsLoaded] = useFonts({
    Karla: require("./assets/fonts/Karla-Regular.ttf"),
    MarkaziText: require("./assets/fonts/MarkaziText-Regular.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer onReady={onLayoutRootView}>
      <RootNavigator />
    </NavigationContainer>
  );
}
