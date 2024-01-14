import { useCallback } from "react";
import { LogBox } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { RootSiblingParent } from "react-native-root-siblings";

import RootNavigator from "./navigators/RootNavigator";

export default function App() {
  const [fontsLoaded] = useFonts({
    Karla: require("./assets/fonts/Karla-Regular.ttf"),
    MarkaziText: require("./assets/fonts/MarkaziText-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <RootSiblingParent>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </RootSiblingParent>
  );
}
