import { useState, useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SplashScreen from "expo-splash-screen";

import OnboardingScreen from "../screens/Onboarding";
import HomeScreen from "../screens/Home";
import ProfileScreen from "../screens/Profile";
import Header from "../components/Header";

const Stack = createNativeStackNavigator();

SplashScreen.preventAutoHideAsync();

const RootNavigator = () => {
  const [loading, setLoading] = useState(true);
  const [onboarded, setOnboarded] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const user = await AsyncStorage.getItem("@LittleLemon:user");
        if (user) {
          setOnboarded(true);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
        SplashScreen.hideAsync();
      }
    })();
  }, []);

  if (loading) {
    return null;
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerTitle: (props) => <Header {...props} />,
      }}
      initialRouteName={onboarded ? "Home" : "Onboarding"}
    >
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
  );
};

export default RootNavigator;
