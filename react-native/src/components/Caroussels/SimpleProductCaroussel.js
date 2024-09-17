import { Box, Center, Circle, FlatList, HStack, Pressable, Text } from 'native-base';
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
  scrollEnabled = true,
  showFilter = true,
  showPagination = false,
  defaultItemsNumber = 10,
  onPageChanged,
}) {
  const [activeFilter, setActiveFilter] = useState(filter);
  const [productList, setProductList] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
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
            const dateExpirationProduct = toDate(product.expirationDate);
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

 const onPreviousPageChanged = () => {
  const page = currentPage - 1;

  setCurrentPage(page);
  onPageChanged(page);
 }

 const onNextPageChanged = () => {
  const page = currentPage + 1;

  setCurrentPage(page);
  onPageChanged(page);
 }

  const renderPagination = () => {
    return (
      <Box alignItems={'center'}>
        <HStack space={7}>
          <Pressable py={2} px={4} borderRadius={'full'} onPress={() => onPreviousPageChanged()} disabled={currentPage == 0} backgroundColor={Colors.BGDarker}>
            <Text style={styles.filter}>{i18n.t('AbpUi::PagerPrevious')}</Text>
          </Pressable>
          <Circle size={10} backgroundColor={Colors.Element}>
            <Text>{currentPage + 1}</Text>
          </Circle>
          <Pressable py={2} px={4} borderRadius={'full'} onPress={() => onNextPageChanged()} disabled={productList.length < defaultItemsNumber} backgroundColor={Colors.BGDarker}>
            <Text style={styles.filter}>{i18n.t('AbpUi::PagerNext')}</Text>
          </Pressable>
        </HStack>
      </Box>
    );
  }

  useEffect(() => {
    filterProductList(activeFilter);
  }, [activeFilter, products]);

  return (
    <>
      {showFilter ? <FiltersComponent getActiveFilter={getActiveFilter}/> : <></>}
      {productList.length > 0 ? (
        <Box>
          <FlatList
          style={styles.list}
          data={productList}
          renderItem={productRender}
          horizontal={horizontal}
          initialNumToRender={10}
          scrollEnabled={scrollEnabled}
        />
        {showPagination ? renderPagination() : <></>}
        </Box>
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
  filter: {
    fontFamily: 'Inter-Light',
    fontSize: 12,
    color: Colors.Text,
  }
});

export default SimpleProductCarouselComponent;
