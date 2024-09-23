import { memo } from 'react';
import { Box, HStack, Image, Text, VStack } from 'native-base';
import { Pressable, StyleSheet } from 'react-native';
import { Colors } from '../../../styles/CommonStyle';
import { toDate } from '../../../../common/utils/CommonUtils';
import Tag from '../../Tags/Tag';
import i18n from 'i18n-js';
import { useNavigation } from '@react-navigation/native';

function ProductCardComponent({ product }) {
  const navigation = useNavigation();
  return (
    <Box style={styles.itemBox}>
      <Pressable
        onPress={() => {
          navigation.navigate('ProductDetails', {
            code: product.code,
          });
        }}>
        <Box style={styles.productCardLess}>
          <HStack space={1}>
            <Box style={styles.productImageBox}>
              <Image
                style={styles.productImage}
                source={{
                  uri: product.imageFrontUrl,
                }}
                alt="product_image"
              />
            </Box>
            <VStack width={'60%'} space={1}>
              <Box width={'60%'}>
                <Text
                  style={styles.productTitle}
                  numberOfLines={1}
                  ellipsizeMode="middle">
                  {product.productName}
                </Text>
              </Box>
              <Text style={styles.productInfoDLC}>
                {i18n.t('Aled::Product:DLC')}:{' '}
                {toDate(product.expirationDate).toLocaleDateString('fr-FR')}
              </Text>
              <Text style={styles.productNote} mt={2}>
                " Pour demain midi "
              </Text>
              <Box style={styles.progressBar_1} mt={2} borderRadius={'full'}>
                <Box style={styles.progressBar_2} borderRadius={'full'} />
              </Box>
              <Text style={styles.productInfoQuantity}>
                {i18n.t('Aled::Product:Quantity')}: {product.quantity}
              </Text>
            </VStack>
          </HStack>
          <Tag productCategoryTag={product.productCategoryTag}></Tag>
        </Box>
      </Pressable>
    </Box>
  );
}

export default memo(ProductCardComponent);

const styles = StyleSheet.create({
  itemBox: {
    marginBottom: 10,
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
    fontSize: 16,
    lineHeight: 22,
  },
  productInfoDLC: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    lineHeight: 12,
  },
  productNote: {
    fontFamily: 'Inter-Medium',
    color: Colors.SubText,
    fontSize: 12,
    lineHeight: 12,
  },
  productInfoQuantity: {
    position: 'absolute',
    bottom: 0,
    fontFamily: 'Inter-Light',
    fontSize: 13,
    lineHeight: 13,
  },
  itemBox: {
    marginBottom: 10,
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
