import { Image, Pressable, StyleSheet, View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function Header() {
  const navigation = useNavigation();
  const route = useRoute();

  const isOnboarding = route.name === "Onboarding";

  return (
    <View style={styles.container}>
      <View style={styles.headerItem}>
        <Pressable>
          <Image source={require("../assets/Logo.png")} />
        </Pressable>
      </View>

      {!isOnboarding && (
        <Pressable onPress={(_) => navigation.navigate("Profile")}>
          <Image
            source={require("../assets/Profile.png")}
            style={styles.profile}
          />
        </Pressable>
      )}
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
    paddingRight: 24,
  },
  profile: {
    width: 40,
    height: 40,
  },
});
