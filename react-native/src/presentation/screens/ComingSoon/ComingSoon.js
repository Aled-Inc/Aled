import Soon from '../../../../assets/illustrations/soon.svg';
import React from 'react';
import I18n from 'i18n-js';
import { StyleSheet } from 'react-native';
import { Colors } from '../../styles/CommonStyle';
import { Center, Text } from 'native-base';

function ComingSoon() {
  return (
    <Center style={styles.center}>
      <Soon width={250} height={250} opacity={0.7} />
      <Text style={styles.illustrationTitle}>{I18n.t('Aled::ComingSoon')}</Text>
    </Center>
  );
}

const styles = StyleSheet.create({
  center: {
    justifyContent: 'center',
    flex: 1,
  },
  illustrationTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    lineHeight: 24,
    color: Colors.SubText,
  },
  illustrationSubTitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.BGDarker,
    textAlign: 'center',
  },
});

export default ComingSoon;
