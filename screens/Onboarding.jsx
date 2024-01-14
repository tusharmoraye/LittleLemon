import { useEffect, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Hero from "../components/Hero";
import AppText from "../components/AppText";

export default function Onboarding({ navigation }) {
  const [user, setUser] = useState({ firstName: "", lastName: "", email: "" });
  const [disabled, setDisabled] = useState(true);

  const handleRegister = async () => {
    try {
      if (user.firstName && user.lastName && user.email) {
        await AsyncStorage.setItem("@LittleLemon:user", JSON.stringify(user));
        navigation.replace("Home");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (key, value) => {
    setUser({
      ...user,
      [key]: value,
    });
  };

  useEffect(() => {
    setDisabled(!user.firstName || !user.lastName || !user.email);
  }, [user]);

  return (
    <ScrollView automaticallyAdjustKeyboardInsets={true}>
      <Hero showSearch={false} />
      <View style={styles.formContainer}>
        <AppText style={styles.formTitle}>Register</AppText>
        <View style={styles.formInputContainer}>
          <AppText style={styles.formInputLabel}>First Name *</AppText>
          <TextInput
            autoCorrect={false}
            style={styles.formInput}
            value={user.firstName}
            onChangeText={(value) => handleInputChange("firstName", value)}
            autoCapitalize="none"
          />
        </View>
        <View style={styles.formInputContainer}>
          <AppText style={styles.formInputLabel}>Last Name *</AppText>
          <TextInput
            autoCorrect={false}
            style={styles.formInput}
            value={user.lastName}
            onChangeText={(value) => handleInputChange("lastName", value)}
            autoCapitalize="none"
          />
        </View>
        <View style={styles.formInputContainer}>
          <AppText style={styles.formInputLabel}>Email *</AppText>
          <TextInput
            keyboardType="email-address"
            autoCorrect={false}
            style={styles.formInput}
            value={user.email}
            onChangeText={(value) => handleInputChange("email", value)}
            autoCapitalize="none"
          />
        </View>
        <Pressable
          style={styles.submitButton(disabled)}
          onPress={handleRegister}
          disabled={disabled}
        >
          <AppText>Submit</AppText>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  formTitle: {
    fontFamily: "MarkaziText",
    fontSize: 28,
  },
  formInputContainer: {
    marginTop: 16,
  },
  formInputLabel: {
    fontSize: 16,
    color: "#797979",
  },
  formInput: {
    borderWidth: 1,
    borderColor: "#797979",
    fontSize: 16,
    marginTop: 8,
    height: 40,
    borderRadius: 8,
    paddingHorizontal: 8,
    fontFamily: "Karla",
  },
  submitButton: (disabled) => ({
    backgroundColor: "#F4CE14",
    borderRadius: 8,
    marginTop: 24,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    opacity: disabled ? 0.5 : 1,
  }),
});
