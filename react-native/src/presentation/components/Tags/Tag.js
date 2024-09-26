import { Box, Text } from 'native-base';
import { ProductCategoryTagInfo } from '../../../common/utils/ProductCategoryTagUtils';
import { StyleSheet } from 'react-native';

function Tag({ productCategoryTag }) {
  let tag = ProductCategoryTagInfo.at(productCategoryTag);

  return (
    <Box style={styles.tagBox} backgroundColor={tag.backgroundColor} testID='tag-box'>
      <Text style={styles.tagText} color={tag.labelColor}>
        {tag.label}
      </Text>
    </Box>
  );
}

const styles = StyleSheet.create({
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
    fontSize: 10,
    lineHeight: 10,
  },
});

export default Tag;
