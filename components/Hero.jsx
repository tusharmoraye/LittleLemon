import { useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import { IconButton, Searchbar } from "react-native-paper";

import AppText from "./AppText";

export default function Hero({
  searchQuery,
  setSearchQuery,
  showSearch = true,
}) {
  const [isSearchActive, setIsSearchActive] = useState(false);

  const onChangeSearch = (query) => setSearchQuery(query);

  const activateSearch = () => {
    setIsSearchActive(true);
  };

  return (
    <View style={styles.container}>
      <AppText style={styles.heroTitle}>Little Lemon</AppText>
      <AppText style={styles.heroSubTitle}>Chicago</AppText>
      <View style={styles.detailsContainer}>
        <AppText style={styles.details}>
          We are a family owned Mediterranean restaurant, focused on traditional
          recipes served with a modern twist.
        </AppText>
        <Image source={require("../assets/Hero.png")} style={styles.hero} />
      </View>
      {showSearch && (
        <View style={styles.searchContainer}>
          {isSearchActive ? (
            <Searchbar
              placeholder=""
              onChangeText={onChangeSearch}
              value={searchQuery}
              onIconPress={() => setIsSearchActive(false)}
              iconColor="gray"
              style={styles.searchbar}
              autoCorrect={false}
              autoComplete="off"
            />
          ) : (
            <IconButton
              icon="magnify"
              color="gray"
              rippleColor="white"
              mode="outlined"
              size={24}
              onPress={activateSearch}
              style={styles.searchIcon}
            />
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#495E57",
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  heroTitle: {
    color: "#F4CE14",
    fontFamily: "MarkaziText",
    fontSize: 64,
  },
  heroSubTitle: {
    color: "#EDEFEE",
    fontFamily: "MarkaziText",
    fontSize: 40,
    marginTop: -21,
  },
  details: {
    flex: 1,
    color: "#FFFFFF",
    fontSize: 18,
  },
  detailsContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    marginTop: 16,
    gap: 16,
  },
  hero: {
    width: 140,
    height: 140,
    borderRadius: 16,
  },
  searchIcon: {
    backgroundColor: "white",
  },
  searchbar: {
    height: 48,
  },
  searchContainer: {
    paddingTop: 16,
  },
});
