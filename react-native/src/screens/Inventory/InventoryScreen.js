import PropTypes from 'prop-types';
import { Box, Text, View, Pressable, HStack } from 'native-base';
import React, { useEffect, useState } from 'react';
import SimpleProductCarouselComponent from '../../components/Caroussels/SimpleProductCaroussel';
import { Colors } from '../../styles/CommonStyle';
import { createInventorySelector } from '../../store/selectors/InventorySelector';
import { TextInput } from 'react-native';
import { connectToRedux } from '../../utils/ReduxConnect';
import { Filters } from '../../utils/InventoryUtils';
import { inventoryStyle } from '../../styles/InventoryStyle';
import i18n from 'i18n-js';
import ProductSearch from '../../components/Search/SearchProduct';

function InventoryScreen({ inventory }) {
  const [productListUser, setProductListUser] = useState([]);
  const [foodSearch, setFoodSearch] = useState('');
  const [productListSearch, setProductListSearch] = useState([]);
  const [activeFilter, setActiveFilter] = useState(Filters.All);



  function toggleFilter(filter) {
    setActiveFilter(filter);
  }

  function getFilterColor(filterName) {
    return activeFilter === filterName ? Colors.Element : Colors.Text;
  }

  useEffect(() => {
    setProductListUser(inventory.products);
  }, []);

  return (
    <View flex={1} px={5} py={5} backgroundColor={Colors.BG}>
      <Text style={inventoryStyle.title}>
        {i18n.t('Aled::Inventory:MyProducts')}
      </Text>
      <ProductSearch products={inventory.products}></ProductSearch>
      <Box mt={2}>
        <HStack space={4}>
          <Pressable p={1}
            onPress={() => {
              toggleFilter(Filters.All);
            }}>
            <Text style={inventoryStyle.filterText} color={getFilterColor(Filters.All)}>{i18n.t(`Aled::Inventory:Filters:${Filters.All}`)}</Text>
          </Pressable>
          <Pressable p={1}
            onPress={() => {
              toggleFilter(Filters.Expired);
            }}>
            <Text style={inventoryStyle.filterText} color={getFilterColor(Filters.Expired)}>{i18n.t(`Aled::Inventory:Filters:${Filters.Expired}`)}</Text>
          </Pressable>
          <Pressable p={1}
            onPress={() => {
              toggleFilter(Filters.Latest);
            }}>
            <Text style={inventoryStyle.filterText} color={getFilterColor(Filters.Latest)}>{i18n.t(`Aled::Inventory:Filters:${Filters.Latest}`)}</Text>
          </Pressable>
        </HStack>
        <View>
          <SimpleProductCarouselComponent products={inventory.products} filter={activeFilter}/>
        </View>
      </Box>
    </View>
  );
}

InventoryScreen.propTypes = {
  inventory: PropTypes.object,
};

export default connectToRedux({
  component: InventoryScreen,
  stateProps: state => ({
    inventory: createInventorySelector()(state),
  }),
});
