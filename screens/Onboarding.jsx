import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Hero from "../components/Hero";

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
    <View>
      <Hero showSearch={false} />
      <View style={styles.formContainer}>
        <Text style={styles.formTitle}>Register</Text>
        <View style={styles.formInputContainer}>
          <Text style={styles.formInputLabel}>First Name *</Text>
          <TextInput
            autoCorrect={false}
            style={styles.formInput}
            value={user.firstName}
            onChangeText={(value) => handleInputChange("firstName", value)}
          />
        </View>
        <View style={styles.formInputContainer}>
          <Text style={styles.formInputLabel}>Last Name *</Text>
          <TextInput
            autoCorrect={false}
            style={styles.formInput}
            value={user.lastName}
            onChangeText={(value) => handleInputChange("lastName", value)}
          />
        </View>
        <View style={styles.formInputContainer}>
          <Text style={styles.formInputLabel}>Email *</Text>
          <TextInput
            keyboardType="email-address"
            autoCorrect={false}
            style={styles.formInput}
            value={user.email}
            onChangeText={(value) => handleInputChange("email", value)}
          />
        </View>
        <Pressable
          style={styles.submitButton(disabled)}
          onPress={handleRegister}
          disabled={disabled}
        >
          <Text>Submit</Text>
        </Pressable>
      </View>
    </View>
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
