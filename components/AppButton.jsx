import { Pressable, StyleSheet } from "react-native";

import AppText from "./AppText";

export default function AppButton({
  children,
  style,
  textStyle,
  variant = "primary",
  type = "solid",
  ...props
}) {
  return (
    <Pressable style={[styles(type, variant).button, style]} {...props}>
      <AppText style={[styles(type, variant).text, textStyle]}>
        {children}
      </AppText>
    </Pressable>
  );
}

const styles = (type, variant) =>
  StyleSheet.create({
    button: {
      backgroundColor:
        type === "outline"
          ? "#fff"
          : variant === "primary"
          ? "#F4CE14"
          : "#495E57",
      borderRadius: 8,
      borderWidth: type === "outline" ? 1 : 0,
      borderColor: variant === "primary" ? "#F4CE14" : "#495E57",
      height: 40,
      alignItems: "center",
      justifyContent: "center",
      alignSelf: "center",
      paddingHorizontal: 16,
    },
    text: {
      color:
        type === "outline"
          ? variant === "primary"
            ? "#F4CE14"
            : "#495E57"
          : variant === "primary"
          ? "#000"
          : "#fff",
    },
  });
