import { Center, FlatList, Image, Pressable, Text } from 'native-base';
import React from 'react';
import { Colors } from '../../styles/CommonStyle';
import EmptyBox from '../../../assets/icons/empty_box.svg';
import { StyleSheet } from 'react-native';
import i18n from 'i18n-js';

function SimpleProductCarousselComponent({productList = []}) {
  const productRender = ({item}) => {
    return (
      <Pressable style={styles.prodctCard}>
        <Image style={styles.productImage} alt='product_img' source={{uri: item.image}}></Image>
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

export default SimpleProductCarousselComponent;