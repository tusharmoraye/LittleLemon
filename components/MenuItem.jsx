import { Image, StyleSheet, View } from "react-native";

import AppText from "./AppText";

const imageMap = {
  "Greek Salad": require("../assets/greek-salad.png"),
  Bruschetta: require("../assets/bruschetta.png"),
  "Grilled Fish": require("../assets/grilled-fish.png"),
  Pasta: require("../assets/pasta.png"),
  "Lemon Dessert": require("../assets/lemon-dessert.png"),
};

export default function MenuItem({ item }) {
  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <AppText numberOfLines={1} style={styles.itemTitle}>
          {item.name}
        </AppText>
        <AppText numberOfLines={2} style={styles.itemDescription}>
          {item.description}
        </AppText>
        <AppText style={styles.itemPrice}>${item.price}</AppText>
      </View>
      <Image style={styles.itemImage} source={imageMap[item.name]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 8,
  },
  infoContainer: {
    flex: 1,
    gap: 8,
  },
  itemTitle: {
    fontFamily: "Karla",
    fontSize: 18,
  },
  itemDescription: {
    fontFamily: "Karla",
    fontSize: 16,
  },
  itemPrice: {
    fontFamily: "Karla",
    fontSize: 18,
    fontWeight: "medium",
  },
  itemImage: {
    width: 80,
    height: 80,
  },
});
