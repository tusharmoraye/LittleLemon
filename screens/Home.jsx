import { useEffect, useState } from "react";
import { FlatList, SafeAreaView, StyleSheet, View } from "react-native";

import {
  createTable,
  filterByQueryAndCategories,
  getMenuItems,
  saveMenuItems,
} from "../database";
import { fetchMenuData, useUpdateEffect } from "../utils";
import AppText from "../components/AppText";
import Hero from "../components/Hero";
import Filters from "../components/Filters";
import MenuItem from "../components/MenuItem";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [menuData, setMenuData] = useState([]);
  const [filterSelections, setFilterSelections] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        await createTable();
        let menuItems = await getMenuItems();
        if (!menuItems.length) {
          menuItems = await fetchMenuData();
          await saveMenuItems(menuItems);
          menuItems = await getMenuItems();
        }

        setMenuData(menuItems);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  useUpdateEffect(() => {
    (async () => {
      try {
        const menuItems = await filterByQueryAndCategories(
          searchQuery,
          filterSelections
        );
        setMenuData(menuItems);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [filterSelections, searchQuery]);

  return (
    <SafeAreaView style={styles.container}>
      <Hero searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <AppText style={styles.subTitle}>Order FOR DELIVERY!</AppText>
      <View>
        <Filters
          filterSelections={filterSelections}
          setFilterSelections={setFilterSelections}
          style={styles.filters}
        />
      </View>
      <FlatList
        data={menuData}
        renderItem={({ item }) => <MenuItem item={item} />}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={({ item, index }) => {
          return (
            <View
              style={[
                {
                  backgroundColor: "#EDEFEE",
                  flex: 1,
                  marginHorizontal: 16,
                  height: 2,
                },
              ]}
            >
              <AppText></AppText>
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  subTitle: {
    fontFamily: "Karla",
    fontSize: 20,
    fontWeight: "bold",
    marginHorizontal: 16,
    marginTop: 24,
  },
});
