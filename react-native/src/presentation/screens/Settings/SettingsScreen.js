import { Button, Text, View } from 'native-base';
import PropTypes from 'prop-types';
import React from 'react';
import AppActions from '../../../business/store/actions/AppActions';
import { connectToRedux } from '../../../common/utils/ReduxConnect';
import { settingsStyle } from '../../styles/SettingsStyle';
import SettingsButtonRow from './SettingsButtonRow';
import SettingsSectionLayout from './SettingsSectionLayout';
import { Colors } from '../../styles/CommonStyle';
import { Ionicons } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import i18n from 'i18n-js';

function SettingsScreen({
  navigation,
  logoutAsync,
}) {
  return (
    <View flex={1} p={5} backgroundColor={Colors.BG}>
      <SettingsSectionLayout title={i18n.t('Aled::Settings:AccountSettings')}>
        <SettingsButtonRow.Category
          iconName="account-circle"
          label={i18n.t('AbpAccount::Menu:Account')}
          onPress={() =>
            navigation.navigate('Account')
          }></SettingsButtonRow.Category>
        <SettingsButtonRow.Category
          iconName="security"
          label={i18n.t('Aled::Settings:ConfidentialityAndSecurity')}
          onPress={() => navigation.navigate('ConfSecu')}>
        </SettingsButtonRow.Category>
      </SettingsSectionLayout>

      <SettingsSectionLayout title={i18n.t('Aled::Settings:AppSettings')}>
        <SettingsButtonRow.Category
          iconName="language-sharp"
          label={i18n.t('AbpUi::Languages')}
          as={Ionicons}
          onPress={() =>
            navigation.navigate('Language')
          }></SettingsButtonRow.Category>
          <SettingsButtonRow.Category
          iconName="notifications-sharp"
          label={i18n.t('Aled::Settings:AppSettings:Notification')}
          as={Ionicons}
          onPress={() =>
            navigation.navigate('Account')
          }></SettingsButtonRow.Category>
      </SettingsSectionLayout>

      <SettingsSectionLayout title={i18n.t('Aled::Settings:Assistance')}>
        <SettingsButtonRow.Category
          iconName="question"
          label={i18n.t('Aled::Settings:Assistance:ContactUs')}
          as={Octicons}
          onPress={() =>
            navigation.navigate('Account')
          }></SettingsButtonRow.Category>
      </SettingsSectionLayout>

      <Button
        borderRadius="xl"
        py={3}
        my={10}
        style={settingsStyle.logoutButton}
        onPress={() => logoutAsync({ showLoading: true })}>
        <Text style={settingsStyle.logoutButtonLabel}>{i18n.t('AbpUi::Logout')}</Text>
      </Button>
    </View>
  );
}

SettingsScreen.propTypes = {
  logoutAsync: PropTypes.func.isRequired,
};

export default connectToRedux({
  component: SettingsScreen,
  dispatchProps: {
    logoutAsync: AppActions.logoutAsync,
  },
});
