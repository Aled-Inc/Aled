import { Box, HStack, Image, Pressable, Text, VStack } from 'native-base';
import { StyleSheet } from 'react-native';
import { Colors } from '../../../styles/CommonStyle';

function ScannedProductCardComponent({ product }) {
  return (
    <Pressable onPress={() => {}}>
      <Box style={styles.productCardLess}>
        <HStack space={1}>
          <Box style={styles.productImageBox}>
            <Image
              style={styles.productImage}
              source={{
                uri: product.image_front_url,
              }}
              alt="product_image"
            />
          </Box>
          <VStack width={'60%'} flexDirection={'column-reverse'}>
            <Text
              style={styles.productTitle}
              numberOfLines={1}
              ellipsizeMode="middle">
              {product.product_name}
            </Text>
            <Text style={styles.productInfoDLC}>DLC: 26/07/2024</Text>
            <Text style={styles.productInfoQuantity}>Quantité: 0</Text>
          </VStack>
        </HStack>
        <Box style={styles.tagBox}>
          <Text style={styles.tagText}>cupboard</Text>
        </Box>
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
    backgroundColor: Colors.Element,
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