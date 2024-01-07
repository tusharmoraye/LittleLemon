import { Image, StyleSheet, Text, View } from "react-native";

import { getImageUri } from "../utils";

export default function MenuItem({ item }) {
  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Text numberOfLines={1} style={styles.itemTitle}>
          {item.name}
        </Text>
        <Text numberOfLines={2} style={styles.itemDescription}>
          {item.description}
        </Text>
        <Text style={styles.itemPrice}>${item.price}</Text>
      </View>
      <Image
        style={styles.itemImage}
        source={{ uri: getImageUri(item.image) }}
      />
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
