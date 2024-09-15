import PropTypes from 'prop-types';
import { Box, Text, View, Pressable, HStack, ScrollView } from 'native-base';
import React, { useState, useMemo, useCallback } from 'react';
import SimpleProductCarouselComponent from '../../components/Caroussels/SimpleProductCaroussel';
import { Colors } from '../../styles/CommonStyle';
import { createInventorySelector } from '../../store/selectors/InventorySelector';
import { connectToRedux } from '../../utils/ReduxConnect';
import { inventoryStyle } from '../../styles/InventoryStyle';
import i18n from 'i18n-js';
import ProductSearch from '../../components/Search/SearchProduct';
import { ProductCategoryTagInfo, ProductTag } from '../../utils/ProductCategoryTagUtils';
import { StyleSheet } from 'react-native';
import ProductCardComponent from '../../components/Cards/ProductCards/ProductCardComponent';

function InventoryScreen({ inventory }) {
  const [activeFilter, setActiveFilter] = useState(null);
  const [productList, setProductList] = useState(inventory.products);

  const filtersToRender = useMemo(() => {
    const minFiltersToRender = Object.keys(ProductTag).filter(tag => tag !== ProductTag.Unknown).length;
    const maxFiltersToRender = Object.keys(ProductTag).length;
    return inventory.unknownProductCount > 0 ? maxFiltersToRender : minFiltersToRender;
  }, [inventory.unknownProductCount]);

  const getfilterWidth = useMemo(() => `${(100 - (2 * filtersToRender)) / filtersToRender}%`, [filtersToRender]);
  const getfilterCountSize = useMemo(() => (60 * Object.keys(ProductTag).filter(tag => tag !== ProductTag.Unknown).length) / filtersToRender, [filtersToRender]);
  const getfilterCountLabelSize = useMemo(() => (16 * Object.keys(ProductTag).filter(tag => tag !== ProductTag.Unknown).length) / filtersToRender, [filtersToRender]);

  const getProductCountOfTag = useCallback((tag) => {
    switch (tag) {
      case ProductTag.Unknown:
        return inventory.unknownProductCount;
      case ProductTag.Cupboard:
        return inventory.cupboardProductCount;
      case ProductTag.Fridge:
        return inventory.fridgeProductCount;
      case ProductTag.Freezer:
        return inventory.freezerProductCount;
      default:
        return 0;
    }
  }, [inventory]);

  const filterProductsByTag = useCallback((filterTag) => {
    const filteredProducts = filterTag !== null
      ? inventory.products.filter(product => product.productCategoryTag === filterTag)
      : inventory.products;
    setProductList(filteredProducts);
  }, [inventory.products]);

  const toggleFilter = useCallback((filterTag) => {
    const value = filterTag === activeFilter ? null : filterTag;
    setActiveFilter(value);
    filterProductsByTag(value);
  }, [activeFilter, filterProductsByTag]);

  const isActive = useCallback((filterTag) => (filterTag === activeFilter ? ProductCategoryTagInfo[filterTag].backgroundColor : Colors.SubText), [activeFilter]);

  const renderCategoryFilters = useCallback((filterTag) => (
    <Box py={3} style={styles.filterBox} borderRadius="xl" key={filterTag} width={getfilterWidth}>
      <Pressable onPress={() => toggleFilter(filterTag)}>
        <Text py={5} style={styles.filterCount} fontSize={getfilterCountSize} lineHeight={getfilterCountSize} color={isActive(filterTag)}>
          {getProductCountOfTag(filterTag)}
        </Text>
        <Text style={styles.filterLabel} fontSize={getfilterCountLabelSize} lineHeight={getfilterCountLabelSize}>
          {ProductCategoryTagInfo[filterTag].label}
        </Text>
      </Pressable>
    </Box>
  ), [getfilterWidth, getfilterCountSize, getfilterCountLabelSize, isActive, toggleFilter, getProductCountOfTag]);

  return (
    <ScrollView flex={1} px={5} py={5} backgroundColor={Colors.BG}>
      <Text style={inventoryStyle.title}>
        {i18n.t('Aled::Inventory:MyProducts')}
      </Text>
      <ProductSearch products={inventory.products} />
      <Box mt={2}>
        <View>
          <SimpleProductCarouselComponent products={inventory.products} />
        </View>
      </Box>
      <Box my={10}>
        <Text style={styles.filterSectionTitle}>{i18n.t('Aled::Inventory:FilterBy')}</Text>
        <HStack space={2} mt={5} mb={8} py={1}>
          {Object.values(ProductTag).map(tag => renderCategoryFilters(tag))}
        </HStack>
        <View>
          <SimpleProductCarouselComponent
            products={productList}
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
    color: Colors.Text,
  },
  filterBox: {
    backgroundColor: Colors.White,
    textAlign: 'center',
  },
  filterCount: {
    fontFamily: 'Inter-Medium',
    textAlign: 'center',
  },
  filterLabel: {
    fontFamily: 'Inter-Medium',
    color: Colors.Text,
    textAlign: 'center',
  },
});

InventoryScreen.propTypes = {
  inventory: PropTypes.object,
};

export default connectToRedux({
  component: InventoryScreen,
  stateProps: (state) => ({
    inventory: createInventorySelector()(state),
  }),
});
