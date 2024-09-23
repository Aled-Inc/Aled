import { Center, Text } from "native-base";
import StoreFront from '../../../../assets/illustrations/storefront.svg';
import { StyleSheet } from "react-native";
import { Colors } from "../../styles/CommonStyle";
import I18n from "i18n-js";

function EmptyScanIllustration() {
  return (
    <Center style={styles.center}>
      <Text style={styles.illustrationTitle}>{I18n.t('Aled::Scan:Empty')}</Text>
      <StoreFront width={250} height={225} opacity={0.7} />
      <Text style={styles.illustrationSubTitle}>{I18n.t('Aled::Scan:NoProduct?')}</Text>
      <Text style={styles.illustrationSubTitle}>
        {I18n.t('Aled::Scan:ScanThem!')}
      </Text>
    </Center>
  );
}

const styles = StyleSheet.create({
  center: {
    paddingTop: 20,
  },
  illustrationTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    lineHeight: 24,
    color: Colors.BGDarker
  },
  illustrationSubTitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.BGDarker,
    textAlign: 'center'
  },
});

export default EmptyScanIllustration;
