import { useEffect, useState } from "react";
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import Hero from "../components/Hero";
import {
  createTable,
  filterByQueryAndCategories,
  getMenuItems,
  saveMenuItems,
} from "../database";
import { useUpdateEffect } from "../utils";
import Filters from "../components/Filters";
import MenuItem from "../components/MenuItem";

const API_URL =
  "https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [menuData, setMenuData] = useState([]);
  const [filterSelections, setFilterSelections] = useState([]);

  const fetchData = async () => {
    const response = await await (await fetch(API_URL)).json();
    return response.menu;
  };

  useEffect(() => {
    (async () => {
      try {
        await createTable();
        let menuItems = await getMenuItems();
        console.log("before: menuItems: ", menuItems);

        if (!menuItems.length) {
          const menuItems = await fetchData();
          console.log("menuItems: ", menuItems);
          saveMenuItems(menuItems);
        }

        setMenuData(menuItems);
      } catch (e) {
        console.log(e);
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
      } catch (e) {
        console.log(e);
      }
    })();
  }, [filterSelections, searchQuery]);

  return (
    <SafeAreaView style={styles.container}>
      <Hero searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <Text style={styles.subTitle}>Order FOR DELIVERY!</Text>
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
              <Text></Text>
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
