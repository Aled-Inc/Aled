import i18n from 'i18n-js';
import { Avatar, Box, Center, FlatList, HStack, Image, Pressable, Text, View } from 'native-base';
import React from 'react';
import { connectToRedux } from '../../utils/ReduxConnect';
import { createUserSelector } from '../../store/selectors/AuthSelector';
import PropTypes from 'prop-types';
import { homeStyle } from '../../styles/HomeStyle';
import { StyleSheet } from 'react-native';
import { Colors } from '../../styles/CommonStyle';
import EmptyBox from '../../../assets/icons/empty_box.svg';

const productList = [
  // {
  //   image: 'https://images.openfoodfacts.org/images/products/356/007/075/9354/front_en.69.400.jpg'
  // },
  // {
  //   image: 'https://images.openfoodfacts.org/images/products/356/007/075/9354/front_en.69.400.jpg'
  // },
  // {
  //   image: 'https://images.openfoodfacts.org/images/products/356/007/075/9354/front_en.69.400.jpg'
  // },
  // {
  //   image: 'https://images.openfoodfacts.org/images/products/356/007/075/9354/front_en.69.400.jpg'
  // },
  // {
  //   image: 'https://images.openfoodfacts.org/images/products/356/007/075/9354/front_en.69.400.jpg'
  // },
  // {
  //   image: 'https://images.openfoodfacts.org/images/products/356/007/075/9354/front_en.69.400.jpg'
  // },
  // {
  //   image: 'https://images.openfoodfacts.org/images/products/356/007/075/9354/front_en.69.400.jpg'
  // },
  // {
  //   image: 'https://images.openfoodfacts.org/images/products/356/007/075/9354/front_en.69.400.jpg'
  // },
  // {
  //   image: 'https://images.openfoodfacts.org/images/products/356/007/075/9354/front_en.69.400.jpg'
  // },
  // {
  //   image: 'https://images.openfoodfacts.org/images/products/356/007/075/9354/front_en.69.400.jpg'
  // },
]

function HomeScreen({ user }) {
  const productRender = ({item}) => {
    return (
      <Pressable style={styles.prodctCard}>
        <Image style={styles.productImage} alt='product_img' source={{uri: item.image}}></Image>
      </Pressable>
    );
  };

  const emptyItems = () => {
    return (
      <Center backgroundColor={Colors.BGDarker} borderRadius={'2xl'} py={3} mt={2}>
        <EmptyBox width={75} height={75} opacity={0.8}/>
        <Text style={styles.noProductText}>No product, go scan them !</Text>
      </Center>
    );
  };

  return (
    <View style={homeStyle.homeContainer} px="3">
      <Box style={homeStyle.identityBox}>
        <View style={homeStyle.identityRowView}>
          <Avatar
            ml="3"
            style={homeStyle.identityAvatar}
            source={require('../../../assets/avatar.png')}
          />
          <View ml="3" style={homeStyle.identityColView}>
            <Text style={homeStyle.identityText}>
              {i18n.t('::Welcome')}
              <Text style={homeStyle.identityText.username}>
                {' '}
                {user.userName}
              </Text>
            </Text>
            <Text style={homeStyle.identitySubtitle}>
              {i18n.t('Aled::Home:Subtitle')}
            </Text>
          </View>
        </View>
      </Box>

      <Box mt={10} px={5}>
        <Text style={styles.listTitle}>They expire soon...</Text>
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
      </Box>
    </View>
  );
}

const styles = StyleSheet.create({
  listTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 22,
    lineHeight: 22,
    color: Colors.Text
  },
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
    fontSize: 12,
    color: Colors.Text
  }
});

HomeScreen.propTypes = {
  user: PropTypes.object.isRequired,
};

export default connectToRedux({
  component: HomeScreen,
  stateProps: state => ({
    user: createUserSelector()(state),
  }),
});
