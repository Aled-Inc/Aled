import { Box, HStack, Image, Pressable, Text, VStack } from 'native-base';
import { StyleSheet } from 'react-native';
import { Colors } from '../../../styles/CommonStyle';
import { ProductCategoryTagInfo } from '../../../utils/ProductCategoryTagUtils';
import { useNavigation } from '@react-navigation/native';

function ScannedProductCardComponent({ product }) {
  const navigation = useNavigation();
  const getTag = () => {
    let tag = ProductCategoryTagInfo.at(product.productCategoryTag);

    return (
      <Box style={styles.tagBox} backgroundColor={tag.backgroundColor}>
        <Text style={styles.tagText} color={tag.labelColor}>
          {tag.label}
        </Text>
      </Box>
    );
  };

  return (
    <Pressable onPress={() => {}}>
      <Box style={styles.productCardLess}>
        <HStack space={1}>
          <Pressable
            onPress={() => {
              console.log('Pressed');
              navigation.navigate('ProductDetails', {
                code: product.code,
              });
            }}>
            <Box style={styles.productImageBox}>
              <Image
                style={styles.productImage}
                source={{
                  uri: product.imageFrontUrl,
                }}
                alt="product_image"
              />
            </Box>
          </Pressable>
          <VStack width={'60%'} flexDirection={'column-reverse'}>
            <Text
              style={styles.productTitle}
              numberOfLines={1}
              ellipsizeMode="middle">
              {product.productName}
            </Text>
            <Text style={styles.productInfoDLC}>DLC: 26/07/2024</Text>
            <Text style={styles.productInfoQuantity}>Quantité: 0</Text>
          </VStack>
        </HStack>
        {getTag()}
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
});

export default ScannedProductCardComponent;
