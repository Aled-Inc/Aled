import { Box, HStack, Image, Pressable, Text, VStack } from 'native-base';
import { StyleSheet } from 'react-native';
import { Colors } from '../../../presentation/styles/CommonStyle';
import { ProductCategoryTagInfo } from '../../../utils/ProductCategoryTagUtils';
import { toDate } from '../../../utils/CommonUtils';
import { useNavigation } from '@react-navigation/native';
import Tag from '../../Tags/Tag';
import i18n from 'i18n-js';

function ScannedProductCardComponent({ product }) {
  const navigation = useNavigation();

  return (
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
          <VStack width={'60%'} flexDirection={'column-reverse'}>
            <Text
              style={styles.productTitle}
              numberOfLines={1}
              ellipsizeMode="middle">
              {product.productName}
            </Text>
            <Text style={styles.productInfoDLC}>
              {i18n.t('Aled::Product:DLC')}:{' '}
              {toDate(product.expirationDate).toLocaleDateString('fr-FR')}
            </Text>
            <Text style={styles.productInfoQuantity}>
              {i18n.t('Aled::Product:Quantity')}: 0
            </Text>
          </VStack>
        </HStack>
        <Tag productCategoryTag={product.productCategoryTag}></Tag>
      </Box>
    </Pressable>
  );
}

const styles = StyleSheet.create({
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
});

export default ScannedProductCardComponent;
