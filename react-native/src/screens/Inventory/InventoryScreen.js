import PropTypes from 'prop-types';
import { Box, Center, Text, View, TextInput, Pressable } from 'native-base';
import React, { useEffect, useState } from 'react';
import SimpleProductCarouselComponent from '../../components/Caroussels/SimpleProductCaroussel';
import { Colors } from '../../styles/CommonStyle';
import { createInventorySelector } from '../../store/selectors/InventorySelector';
import { StyleSheet } from 'react-native';
import { connectToRedux } from '../../utils/ReduxConnect';

function InventoryScreen({ inventory }) {
  const [productListUser, setProductListUser] = useState([]);
  const [foodSearch, setFoodSearch] = useState('');
  const [productListSearch, setProductListSearch] = useState([]);
  const [productListLatest, setProductListLatest] = useState([]);

  function searchProduct(value) {
    const productListFilter = productListUser.filter(product =>
      product.productName.includes(value),
    );
    setProductListSearch(productListFilter);
    setFoodSearch(value);
  }

  function sortProductList(productList) {
    const sortList = productList.sort((productA, productB) => {
      const dateProductA = new Date(productA.addedDate);
      const dateProductB = new Date(productB.addedDate);
      return dateProductA - dateProductB;
    });

    return sortList;
  }

  function filterProductList(value) {
    const dateNow = new Date();

    if (value == 'All') {
      searchProduct(foodSearch);
    } else if (value == 'Expired') {
      setProductListSearch(
        productListSearch.filter(product => {
          const dateExpirationProduct = new Date(product.expirationDate);
          return dateNow < dateExpirationProduct;
        }),
      );
    } else {
      setProductListSearch(sortProductList(productListSearch));
    }
  }

  useEffect(() => {
    setProductListSearch(inventory.products);
    console.log(productListSearch);
    setProductListUser(inventory.products);
    setProductListLatest(sortProductList(inventory.products));
  }, [productListSearch]);

  return (
    <View>
      <Box>
        <View>
          <Text style={styles.title}>My food</Text>
          {/* <TextInput
            onChangeText={searchProduct}
            value={foodSearch}
            placeholder="search..."
          /> */}
        </View>
      </Box>
      <Box>
        <View>
          <View>
            <Pressable
              onPress={() => {
                filterProductList('All');
              }}>
              <Text>All</Text>
            </Pressable>
          </View>
          <View>
            <Pressable
              onPress={() => {
                filterProductList('Expired');
              }}>
              <Text>Expired</Text>
            </Pressable>
          </View>
          <View>
            <Pressable
              onPress={() => {
                filterProductList('Latest');
              }}>
              <Text>Latest</Text>
            </Pressable>
          </View>
        </View>
        <View>
          <SimpleProductCarouselComponent productList={productListSearch} />
        </View>
      </Box>
      <Box>
        <View>
          <Text>My latest</Text>
          <View>
            <SimpleProductCarouselComponent productList={productListLatest} />
          </View>
        </View>
      </Box>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontFamily: 'Inter-Light',
    fontSize: 14,
    color: Colors.Text,
  },
});

InventoryScreen.propTypes = {
  inventory: PropTypes.object,
};

export default connectToRedux({
  component: InventoryScreen,
  stateProps: state => ({
    inventory: createInventorySelector()(state),
  }),
});
