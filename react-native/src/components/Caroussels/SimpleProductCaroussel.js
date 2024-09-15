import { Center, FlatList, Image, Pressable, Text } from 'native-base';
import React, { useEffect, useState } from 'react';
import { Colors } from '../../styles/CommonStyle';
import EmptyBox from '../../../assets/icons/empty_box.svg';
import { StyleSheet } from 'react-native';
import i18n from 'i18n-js';
import { Filters } from '../../utils/InventoryUtils';
import { toDate } from '../../utils/CommonUtils';
import ProductImageCardComponent from '../Cards/ProductCards/ProductImageCardComponent';
import FiltersComponent from '../../Filters/FiltersComponent';

function SimpleProductCarouselComponent({
  products = [],
  filter = Filters.All,
  CardComponent = ProductImageCardComponent,
  horizontal = true,
  scrollEnabled = true
}) {
  const [activeFilter, setActiveFilter] = useState(filter);
  const [productList, setProductList] = useState(products);
  const dateNow = new Date();

  const productRender = ({ item }) => <CardComponent product={item} />;

  const emptyItems = () => {
    return (
      <Center
        backgroundColor={Colors.BGDarker}
        borderRadius={'2xl'}
        py={10}
        mt={2}>
        <EmptyBox width={80} height={80} opacity={0.6} />
        <Text style={styles.noProductText}>
          {i18n.t('Aled::Component:SimpleProductCarousel:NoProduct')}
        </Text>
      </Center>
    );
  };

  function filterProductList(value) {
    switch (value) {
      case Filters.Expired:
        setProductList(
          products.filter(product => {
            const dateExpirationProduct = new Date(product.expirationDate);
            return dateNow > dateExpirationProduct;
          }),
        );
        break;
      case Filters.Latest:
        setProductList(getLatestProducts(products));
        break;
      case Filters.ExpiredSoon:
        setProductList(getExpiredSoonProducts(products));
        break;
      default:
        setProductList(products);
        break;
    }
  }

  function getLatestProducts(productList) {
    let sortList = [...productList].sort((productA, productB) => {
      let dateProductA = toDate(productA.addedDate);
      let dateProductB = toDate(productB.addedDate);
      return dateProductA - dateProductB;
    });

    return sortList;
  }

  function getExpiredSoonProducts(productList) {
    let sortList = [...productList].sort((productA, productB) => {
      let dateProductA = toDate(productA.expirationDate);
      let dateProductB = toDate(productB.expirationDate);
      return dateProductA - dateProductB;
    });

    return sortList;
  }

  const getActiveFilter = (filter) => {
    setActiveFilter(filter);
  }

  useEffect(() => {
    filterProductList(activeFilter);
  }, [activeFilter]);

  return (
    <>
      <FiltersComponent getActiveFilter={getActiveFilter}/>
      {productList.length > 0 ? (
        <FlatList
          style={styles.list}
          data={productList}
          renderItem={productRender}
          horizontal={horizontal}
          initialNumToRender={10}
          scrollEnabled={scrollEnabled}
        />
      ) : (
        emptyItems()
      )}
    </>
  );
}

const styles = StyleSheet.create({
  list: {
    paddingTop: 10,
  },
  noProductText: {
    fontFamily: 'Inter-Light',
    fontSize: 14,
    color: Colors.Text,
  },
});

export default SimpleProductCarouselComponent;
