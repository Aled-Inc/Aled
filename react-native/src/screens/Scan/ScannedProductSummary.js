import { Box, Center, FlatList, Pressable, Text } from 'native-base';
import ScannedProductCardComponent from '../../components/Cards/ProductCards/ScannedProductCardComponent';
import { StyleSheet } from 'react-native';
import { Colors } from '../../styles/CommonStyle';
import { Ionicons } from '@expo/vector-icons';
import i18n from 'i18n-js';

function ScannedProductSummary({ products, onRefresh }) {
  const productRender = ({ item }) => {
    return (
      <Box style={styles.itemBox}>
        <ScannedProductCardComponent product={item} />
      </Box>
    );
  };

  return (
    <Center>
      <Text style={styles.title}>{i18n.t('Aled::Scan:Summary')}</Text>
      <Pressable
        onPress={onRefresh}
        style={styles.refreshButton}
        borderRadius={'full'}>
        <Ionicons name="refresh" size={22} color={Colors.Text} />
      </Pressable>
      <FlatList data={products} renderItem={productRender} style={styles.flatlist}></FlatList>
    </Center>
  );
}

const styles = StyleSheet.create({
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    lineHeight: 18,
    marginTop: 20,
    marginBottom: 20,
    color: Colors.BGDarker,
  },
  refreshButton: {
    position: 'absolute',
    right: 10,
    top: 10,
    padding: 5,
    backgroundColor: Colors.Element,
  },
  flatlist: {
    height: '50%',
    width: '100%',
    paddingHorizontal: 20
  },
  itemBox: {
    marginBottom: 10,
  }
});

export default ScannedProductSummary;
