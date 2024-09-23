import { Badge, HStack, Text } from 'native-base';
import { StyleSheet } from 'react-native';
import { Colors } from '../../styles/CommonStyle';
import { firstLetterUpper, toPascalCase } from '../../../common/utils/CommonUtils';
import I18n from 'i18n-js';

export default function TriLine({ name, value }) {
  const color = () => {
    switch (value) {
      case 'low':
        return Colors.NovaGreen;
      case 'moderate':
        return Colors.NovaOrange;
      case 'high':
        return Colors.NovaRed;
      default:
        return Colors.White;
    }
  };

  return (
    <HStack justifyContent="space-between">
      <Text flex={30} color={Colors.LightText}>
        {I18n.t(`Aled::Product:Details:Nutrients:${toPascalCase(name)}`)} :
      </Text>
      <Text flex={30} fontStyle={'italic'} color={Colors.LightText}>
        {I18n.t(`Aled::${toPascalCase(value)}`)}
      </Text>
      <Badge
        style={styles.badge}
        variant="solid"
        backgroundColor={color()}></Badge>
    </HStack>
  );
}

const styles = StyleSheet.create({
  badge: {
    width: 20,
    height: 20,
  },
});
