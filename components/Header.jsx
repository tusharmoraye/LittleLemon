import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

import { clearData } from "../database";

export default function Header() {
  const navigation = useNavigation();
  const route = useRoute();

  const isOnboarding = route.name === "Onboarding";
  const isProfile = route.name === "Profile";
  const isHome = route.name === "Home";

  return (
    <View style={styles.container}>
      {!isHome && (
        <Pressable onPress={clearData} style={styles.headerItem}>
          <Text></Text>
        </Pressable>
      )}

      <View style={styles.headerItem}>
        <Image source={require("../assets/Logo.png")} />
      </View>

      <Pressable
        onPress={(_) => navigation.navigate("Profile")}
        style={styles.headerItem}
      >
        {!isOnboarding && (
          <Image
            source={require("../assets/Profile.png")}
            style={styles.profile}
          />
        )}
      </Pressable>
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
  headerItem: {
    // flex: 1,
  },
});
