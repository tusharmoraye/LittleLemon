import { View, StyleSheet } from "react-native";
import Checkbox from "expo-checkbox";

import AppText from "./AppText";

export default function AppCheckbox({
  checked = false,
  setChecked = () => {},
  children,
  style,
  ...props
}) {
  return (
    <View style={[styles.checkboxContainer, style]} {...props}>
      <Checkbox
        value={checked}
        onValueChange={setChecked}
        style={styles.checkbox}
        color="#495E57"
      />

      <AppText style={styles.label}>{children}</AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  checkboxContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  checkbox: {
    marginRight: 8,
  },
  label: {
    fontSize: 12,
  },
});
