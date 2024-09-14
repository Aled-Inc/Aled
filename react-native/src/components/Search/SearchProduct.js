import { Box, FlatList, HStack, Image, Text, VStack } from 'native-base';
import { Pressable, StyleSheet, TextInput } from 'react-native';
import i18n from 'i18n-js';
import { Colors } from '../../styles/CommonStyle';
import { useState } from 'react';
import { ProductCategoryTagInfo } from '../../utils/ProductCategoryTagUtils';
import { hexToRGB } from '../../utils/CommonUtils';

export default function ProductSearch({products}) {
  const [productList, setProductList] = useState([]);
  const [searchValue, onSearchValueChanged] = useState('');

  function searchProduct(value) {
    onSearchValueChanged(value);

    const searchResult = products.filter(product =>
      product.productName.toLowerCase().includes(value.toLowerCase()),
    );

    setProductList(searchResult);
  };

  const getTag = (item) => {
    let tag = ProductCategoryTagInfo.at(item.productCategoryTag);
    
    return (
      <Box style={styles.tagBox} backgroundColor={tag.backgroundColor}>
        <Text style={styles.tagText} color={tag.labelColor}>{tag.label}</Text>
      </Box>
    );
  };

  const renderItem = (item) => {
    return (
      <Pressable>
        <Box style={styles.productCardLess}>
        <HStack space={1}>
          <Box style={styles.productImageBox}>
            <Image
              style={styles.productImage}
              source={{
                uri: item.imageFrontUrl,
              }}
              alt="product_image"
            />
          </Box>
          <VStack width={'60%'} flexDirection={'column-reverse'}>
            <Text
              style={styles.productTitle}
              numberOfLines={1}
              ellipsizeMode="middle">
              {item.productName}
            </Text>
            <Text style={styles.productInfoDLC}>DLC: 26/07/2024</Text>
            <Text style={styles.productInfoQuantity}>Quantité: 0</Text>
          </VStack>
        </HStack>
        {getTag(item)}
      </Box>
      </Pressable>
    );
  };

  const productRender = ({ item }) => {
    console.log(item);
    return (
      <Box style={styles.itemBox}>
        {renderItem(item)}
      </Box>
    );
  };

  const renderListResult = () => {
    return searchValue.length > 0 ? (
      <FlatList
        marginTop={10}
        style={styles.list}
        data={productList}
        renderItem={productRender}
        keyExtractor={item => item.id}
        ListEmptyComponent={<Text>No products.</Text>}></FlatList>
    ) : (
      <></>
    );
  };

  return (
    <Box marginY={5} zIndex={1}>
      <TextInput
        onChangeText={searchProduct}
        placeholder={i18n.t('Aled::Inventory:Search')}
        placeholderTextColor={Colors.SubText}
        style={styles.search}
      />
      {renderListResult()}
    </Box>
  );
}

const styles = StyleSheet.create({
  search: {
    fontFamily: 'Inter-Light',
    fontSize: 16,
    color: Colors.Text,
    backgroundColor: Colors.White,
    paddingLeft: 15,
    paddingVertical: 10,
    borderRadius: 20,
  },
  list : {
    backgroundColor: hexToRGB(Colors.White, 0.9),
    borderRadius: 25,
    padding: 20,
    position: 'absolute',
    width: '100%'
  },
  productCardLess: {
    backgroundColor: Colors.BG,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 20,
    overflow: 'hidden',
  },
  productImageBox: {
    paddingLeft: 10,
    width: 120,
    height: 100,
  },
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  productTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 22,
    lineHeight: 22,
  },
  productInfoDLC: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    lineHeight: 14,
  },
  productInfoQuantity: {
    position: 'absolute',
    top: 0,
    fontFamily: 'Inter-Light',
    fontSize: 14,
    lineHeight: 14,
  },
  tagBox: {
    position: 'absolute',
    top: 10,
    right: 10,
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  tagText: {
    fontFamily: 'Inter-Light',
    fontSize: 12,
    lineHeight: 12,
  },
  itemBox: {
    marginBottom: 10,
  }
});
