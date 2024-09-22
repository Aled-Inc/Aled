import { Box, Center, Pressable, Text, View } from "native-base";
import { Colors } from "../../styles/CommonStyle";
import { Feather } from '@expo/vector-icons';
import { StyleSheet } from "react-native";
import ActionStatus from "../../utils/ActionStatus";
import PropTypes from 'prop-types';
import i18n from "i18n-js";
import { connectToRedux } from "../../utils/ReduxConnect";
import AuthActions from "../../store/actions/AuthActions";
import { useEffect } from "react";

function EmailConfirmationScreen({ route, navigation, reloadCurrentUserInfo }) {
  const { state } = route.params;

  useEffect(() => {
    reloadCurrentUserInfo();
  }, []);

  const succeededBody = () => (
    <>
      <Text flex={0.15} style={styles.title}>{i18n.t('Aled::EmailConfirmation:Succeeded')}</Text>
      <Feather name="check-circle" size={100} color={Colors.Green} />
      <Text paddingTop={5} style={styles.text}>{i18n.t('Aled::EmailConfirmation:SucceededDescription')}</Text>
    </>
  );

  const failedBody = () => (
    <>
      <Text flex={0.15} style={styles.title}>{i18n.t('Aled::EmailConfirmation:Failed')}</Text>
      <Feather name="x-circle" size={100} color={Colors.Red} />
      <Text paddingTop={5} style={styles.text}>{i18n.t('Aled::EmailConfirmation:FailedDescription')}</Text>
    </>
  );

  return (
    <View flex={1} backgroundColor={Colors.BG} px={5}>
      <Center flex={0.9}>
          { state === ActionStatus.succeeded ? succeededBody() : failedBody() }
          <Pressable onPress={() => navigation.navigate('Home')}>
            <Box borderRadius={'full'} backgroundColor={Colors.Element} py={3} px={5} marginTop={20}>
              <Text style={styles.buttonText}>{i18n.t('Aled::SeeMyFridge')}</Text>
            </Box>
          </Pressable>
      </Center>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontFamily: 'Inter-SemmiBold',
    fontSize: 45,
    lineHeight: 45
  },
  text: {
    fontFamily: 'Inter-Regular',
    marginTop: 20,
    textAlign: 'center',
    fontSize: 20,
  },
  buttonText: {
    fontFamily: 'Inter-Regular',
    textAlign: 'center',
    fontSize: 15,
  }
});

EmailConfirmationScreen.propTypes = {
  reloadCurrentUserInfo: PropTypes.func.isRequired,
};

export default connectToRedux({
  component: EmailConfirmationScreen,
  dispatchProps: {
    reloadCurrentUserInfo: AuthActions.reloadCurrentUserInfoAsync
  },
});