import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import OnboardingScreen from "../screens/Onboarding";
import HomeScreen from "../screens/Home";
import ProfileScreen from "../screens/Profile";
import Header from "../components/Header";

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  const loading = false;
  const onboarded = false;
  // if (loading) {
  //   return <SplashScreen />;
  // }

  if (!onboarded) {
    return (
      <Stack.Navigator
        screenOptions={{
          headerTitle: (props) => <Header {...props} />,
        }}
      >
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      </Stack.Navigator>
    );
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerTitle: (props) => <Header {...props} />,
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
  );
};

export default RootNavigator;
