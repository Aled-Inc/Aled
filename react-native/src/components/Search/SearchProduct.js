import { Box, FlatList, Text, View } from 'native-base';
import { Pressable, StyleSheet, TextInput } from 'react-native';
import { Colors } from '../../styles/CommonStyle';
import { useState } from 'react';
import { hexToRGB } from '../../utils/CommonUtils';
import { percentOfScreenHeight } from '../../utils/SizeUtils';
import ProductCardComponent from '../Cards/ProductCards/ProductCardComponent';
import i18n from 'i18n-js';

export default function ProductSearch({ products }) {
  const [productList, setProductList] = useState([]);
  const [searchValue, onSearchValueChanged] = useState('');

  function searchProduct(value) {
    onSearchValueChanged(value);

    const searchResult = products.filter(product =>
      product.productName.toLowerCase().includes(value.toLowerCase()),
    );

    setProductList(searchResult);
  }

  const productRender = ({ item }) => <ProductCardComponent product={item} />;

  const searchButton = () => {
    return (
      <Box backgroundColor={Colors.Element} borderRadius={'full'} mt={5}>
        <Pressable onPress={() => {}}>
          <Text px={5} py={4} textAlign={'center'} style={styles.searchText}>
            {i18n.t('Aled::Inventory:Search')}
          </Text>
        </Pressable>
      </Box>
    );
  };

  const renderListResult = () => {
    return searchValue.length > 0 ? (
      <View flex={1} style={styles.container} mt={10}>
        <View
          flex={1}
          flexGrow={1}
          borderRadius={20}
          overflow={'hidden'}
          maxH={percentOfScreenHeight(50)}>
          <FlatList
            data={productList}
            initialNumToRender={10}
            renderItem={productRender}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}></FlatList>
        </View>
        {searchButton()}
      </View>
    ) : (
      <></>
    );
  };

  return (
    <Box marginY={5} zIndex={1}>
      <TextInput
        onChangeText={searchProduct}
        placeholder={i18n.t('Aled::Inventory:Search:Placeholder')}
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
    fontSize: 14,
    color: Colors.Text,
    backgroundColor: Colors.White,
    paddingLeft: 15,
    paddingVertical: 10,
    borderRadius: 20,
  },
  container: {
    backgroundColor: hexToRGB(Colors.White, 0.8),
    width: '100%',
    position: 'absolute',
    borderRadius: 25,
    padding: 20,
  },
  progressBar_1: {
    height: 5,
    width: '100%',
    backgroundColor: Colors.BGDarker,
  },
  progressBar_2: {
    height: 5,
    width: '70%',
    backgroundColor: Colors.Green,
  },
  searchText: {
    fontFamily: 'Inter-Medium',
    color: Colors.Text,
    fontSize: 16,
    lineHeight: 16,
  },
});
