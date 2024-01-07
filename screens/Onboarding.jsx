import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

import Hero from "../components/Hero";

export default function Onboarding() {
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <View>
      <Hero
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        showSearch={false}
      />
      <View style={styles.formContainer}>
        <Text style={styles.formTitle}>Register</Text>
        <View style={styles.formInputContainer}>
          <Text style={styles.formInputLabel}>Name *</Text>
          <TextInput autoCorrect={false} style={styles.formInput} />
        </View>
        <View style={styles.formInputContainer}>
          <Text style={styles.formInputLabel}>Email *</Text>
          <TextInput
            keyboardType="email-address"
            autoCorrect={false}
            style={styles.formInput}
          />
        </View>
        <Pressable style={styles.submitButton}>
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
  submitButton: {
    backgroundColor: "#F4CE14",
    borderRadius: 8,
    marginTop: 24,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
});
