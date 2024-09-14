import { Center, FlatList, Image, Pressable, Text } from 'native-base';
import React, { useEffect, useState } from 'react';
import { Colors } from '../../styles/CommonStyle';
import EmptyBox from '../../../assets/icons/empty_box.svg';
import { StyleSheet } from 'react-native';
import i18n from 'i18n-js';
import { Filters } from '../../utils/InventoryUtils';

function SimpleProductCarouselComponent({products = [], filter = Filters.All}) {
  const [productList, setProductList] = useState(products);
  const dateNow = new Date();

  const productRender = ({item}) => {
    return (
      <Pressable style={styles.prodctCard}>
        <Image style={styles.productImage} alt='product_img' source={{uri: item.imageFrontUrl}}></Image>
      </Pressable>
    );
  };

  const emptyItems = () => {
    return (
      <Center backgroundColor={Colors.BGDarker} borderRadius={'2xl'} py={10} mt={2}>
        <EmptyBox width={80} height={80} opacity={0.6}/>
        <Text style={styles.noProductText}>{i18n.t('Aled::Component:SimpleProductCarousel:NoProduct')}</Text>
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
        setProductList(sortProductList(products));
        break;
      default: 
        setProductList(products);
        break;
    }
  };

  useEffect(() => {
    filterProductList(filter);
  }, [filter]);

  function sortProductList(productList) {
    let sortList = [...productList].sort((productA, productB) => {
      let dateProductA = new Date(productA.addedDate);
      let dateProductB = new Date(productB.addedDate);
      return dateProductA - dateProductB;
    });
  
    return sortList;
  }

  return (
    <>
      {productList.length > 0 ? (
        <FlatList
          style={styles.list}
          data={productList}
          renderItem={productRender}
          horizontal={true}
        />
      ) : (
        emptyItems()
      )}
    </>
  )
}

const styles = StyleSheet.create({
  list: {
    paddingTop: 10,
  },
  prodctCard: {
    padding: 10,
    backgroundColor: Colors.NavBG,
    borderRadius: 15,
    marginRight: 10,
  },
  productImage: {
    height: 150,
    width: 100,
    borderRadius: 5,
  },
  noProductText: {
    fontFamily: 'Inter-Light',
    fontSize: 14,
    color: Colors.Text
  }
});

export default SimpleProductCarouselComponent;