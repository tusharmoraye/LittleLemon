import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { clearData } from "../database";

export default function Header() {
  return (
    <View style={styles.container}>
      <Pressable onPress={clearData}>
        <Text>clear</Text>
      </Pressable>
      <Image source={require("../assets/Logo.png")} />
      <Image source={require("../assets/Profile.png")} style={styles.profile} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 28,
  },
  profile: {
    width: 40,
    height: 40,
  },
});
