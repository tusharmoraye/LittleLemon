import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View, Text } from "react-native";
import { Chip } from "react-native-paper";

const FILTERS = [
  {
    name: "Starters",
    selected: false,
  },
  {
    name: "Mains",
    selected: false,
  },
  {
    name: "Desserts",
    selected: false,
  },
  {
    name: "Drinks",
    selected: false,
  },
  {
    name: "Salads",
    selected: false,
  },
  {
    name: "Sides",
    selected: false,
  },
  {
    name: "Specials",
    selected: false,
  },
];

export default function Filters({ filterSelections, setFilterSelections }) {
  const [filters, setFilters] = useState(FILTERS);
  const handleOnPress = (index) => {
    const newFilters = [...filters];
    newFilters[index].selected = !newFilters[index].selected;
    setFilters(newFilters);
  };

  useEffect(() => {
    let selectedFilters = filters
      .filter((filter) => filter.selected)
      .map((filter) => filter.name.toLowerCase());
    if (selectedFilters.length === 0) {
      selectedFilters = filters.map((filter) => filter.name.toLowerCase());
    }
    setFilterSelections(selectedFilters);
  }, [filters]);

  return (
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      style={styles.container}
    >
      {filters.map((filter, index) => (
        <Chip
          key={filter.name + index}
          style={styles.chip}
          textStyle={styles.chipText}
          onPress={(_) => handleOnPress(index)}
          selected={filter.selected}
          mode="flat"
          icon={() => null}
        >
          {filter.name}
        </Chip>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 12,
    paddingRight: 12,
    paddingVertical: 12,
  },
  chip: {
    marginRight: 12,
  },
  chipText: {
    fontWeight: "bold",
    fontFamily: "Karla",
  },
});
