import { Image, Pressable } from "native-base";
import { StyleSheet } from "react-native";
import { Colors } from "../../../styles/CommonStyle";

function ProductImageCardComponent({product}) {
  return (
    <Pressable style={styles.prodctCard}>
        <Image style={styles.productImage} alt='product_img' source={{uri: product.imageFrontUrl}}></Image>
      </Pressable>
  )
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
    color: Colors.Text
  }
});

export default ProductImageCardComponent;