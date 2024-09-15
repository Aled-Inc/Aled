import { HStack, Pressable, Text } from "native-base";
import { Filters } from "../utils/InventoryUtils";
import i18n from "i18n-js";
import { StyleSheet } from "react-native";
import { Colors } from "../styles/CommonStyle";
import { useState } from "react";

function FiltersComponent({getActiveFilter}) {
  const [activeFilter, setActiveFilter] = useState(Filters.All);
  const filtersValues = Object.values(Filters);

  const renderFilter = (filter) => {
    return (
      <Pressable
        p={1}
        onPress={() => {
          toggleFilter(filter);
        }}>
        <Text
          style={styles.filterText}
          color={getFilterColor(filter)}>
          {i18n.t(`Aled::Inventory:Filters:${filter}`)}
        </Text>
      </Pressable>
    );
  };

  function toggleFilter(filter) {
    setActiveFilter(filter);
    getActiveFilter(filter);
  }

  function getFilterColor(filterName) {
    return activeFilter === filterName ? Colors.Element : Colors.Text;
  }

  return (
    <HStack space={2}>
      {filtersValues.map((filter) => {
        return (renderFilter(filter))
      })}
    </HStack>
  );
}

const styles = StyleSheet.create({
  filterText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12
  }
})

export default FiltersComponent;