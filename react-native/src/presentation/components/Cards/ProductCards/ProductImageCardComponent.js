import { Image, Pressable } from 'native-base';
import { StyleSheet } from 'react-native';
import { Colors } from '../../../styles/CommonStyle';
import { useNavigation } from '@react-navigation/native';
import { toDate } from '../../../../common/utils/CommonUtils';

function ProductImageCardComponent({ product }) {
  const navigation = useNavigation();

  return (
    <Pressable
      style={styles.prodctCard}
      onPress={() => {
        navigation.navigate('ProductDetails', {
          code: product.code,
          expiredDate: toDate(product.expirationDate).toLocaleDateString(
            'fr-FR',
          ),
        });
      }}>
      <Image
        style={styles.productImage}
        alt="product_img"
        source={{ uri: product.imageFrontUrl }}></Image>
    </Pressable>
  );
}

const styles = StyleSheet.create({
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
    color: Colors.Text,
  },
});

export default ProductImageCardComponent;
