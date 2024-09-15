import PropTypes from 'prop-types';
import { Box, Text, View, Pressable, HStack, ScrollView } from 'native-base';
import React from 'react';
import SimpleProductCarouselComponent from '../../components/Caroussels/SimpleProductCaroussel';
import { Colors } from '../../styles/CommonStyle';
import { createInventorySelector } from '../../store/selectors/InventorySelector';
import { connectToRedux } from '../../utils/ReduxConnect';
import { inventoryStyle } from '../../styles/InventoryStyle';
import i18n from 'i18n-js';
import ProductSearch from '../../components/Search/SearchProduct';
import { ProductCategoryTagInfo } from '../../utils/ProductCategoryTagUtils';
import { StyleSheet } from 'react-native';
import ProductCardComponent from '../../components/Cards/ProductCards/ProductCardComponent';

function InventoryScreen({ inventory }) {
  return (
    <ScrollView flex={1} px={5} py={5} backgroundColor={Colors.BG}>
      <Text style={inventoryStyle.title}>
        {i18n.t('Aled::Inventory:MyProducts')}
      </Text>
      <ProductSearch products={inventory.products}></ProductSearch>
      <Box mt={2}>
        <View>
          <SimpleProductCarouselComponent
            products={inventory.products}
          />
        </View>
      </Box>
      <Box mt={10}>
        <Text style={styles.filterSectionTitle}>Filter by</Text>
        <HStack space={1} mt={5} mb={8} py={1}>
            {ProductCategoryTagInfo.map(tag => {
              return (
                <Box style={styles.filterBox} borderRadius={'xl'} key={tag.label}>
                  <Pressable>
                    <Text style={styles.filterCount}>12</Text>
                    <Text style={styles.filterLabel}>{tag.label}</Text>
                  </Pressable>
                </Box>
              );
            })}
        </HStack>
        <View>
          <SimpleProductCarouselComponent
            products={inventory.products}
            CardComponent={ProductCardComponent}
            horizontal={false}
            scrollEnabled={false}
          />
        </View>
      </Box>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  filterSectionTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    lineHeight: 20,
    color: Colors.Text
  },
  filterBox: {
    backgroundColor: Colors.White,
    padding: 20,
    textAlign: 'center'
  },
  filterCount: {
    fontFamily: 'Inter-Medium',
    fontSize: 60,
    lineHeight: 60,
    color: Colors.SubText,
    textAlign: 'center'
  },
  filterLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    lineHeight: 16,
    color: Colors.Text,
    textAlign: 'center'
  }
})

InventoryScreen.propTypes = {
  inventory: PropTypes.object,
};

export default connectToRedux({
  component: InventoryScreen,
  stateProps: state => ({
    inventory: createInventorySelector()(state),
  }),
});
