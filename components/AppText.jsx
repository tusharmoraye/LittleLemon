import { StyleSheet, Text } from "react-native";

export default function AppText({ children, style, ...props }) {
  return (
    <Text {...props} style={[styles.text, style]}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    fontFamily: "Karla",
    fontSize: 16,
  },
});
