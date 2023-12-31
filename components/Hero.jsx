import { useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { IconButton, Searchbar } from "react-native-paper";

export default function Hero({ searchQuery, setSearchQuery }) {
  const [isSearchActive, setIsSearchActive] = useState(false);

  const onChangeSearch = (query) => setSearchQuery(query);

  const activateSearch = () => {
    setIsSearchActive(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heroTitle}>Little Lemon</Text>
      <Text style={styles.heroSubTitle}>Chicago</Text>
      <View style={styles.detailsContainer}>
        <Text style={styles.details}>
          We are a family owned Mediterranean restaurant, focused on traditional
          recipes served with a modern twist.
        </Text>
        <Image source={require("../assets/Hero.png")} style={styles.hero} />
      </View>
      <View style={styles.searchContainer}>
        {isSearchActive ? (
          <Searchbar
            placeholder=""
            onChangeText={onChangeSearch}
            value={searchQuery}
            onIconPress={() => setIsSearchActive(false)}
            iconColor="gray"
            style={styles.searchbar}
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#495E57",
    paddingHorizontal: 16,
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
    fontFamily: "Karla",
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
    paddingVertical: 16,
  },
});
