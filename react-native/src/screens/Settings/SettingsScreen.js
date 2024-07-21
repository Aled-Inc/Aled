import { Button, Text, View } from 'native-base';
import PropTypes from 'prop-types';
import React from 'react';
import AppActions from '../../store/actions/AppActions';
import {
  createLanguageSelector,
  createLanguagesSelector,
} from '../../store/selectors/AppSelectors';
import { createTenantSelector } from '../../store/selectors/PersistentStorageSelectors';
import { connectToRedux } from '../../utils/ReduxConnect';
import { settingsStyle } from '../../styles/SettingsStyle';
import SettingsButtonRow from './SettingsButtonRow';
import SettingsSectionLayout from './SettingsSectionLayout';
import { Colors } from '../../styles/CommonStyle';
import { Ionicons } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import i18n from 'i18n-js';

function SettingsScreen({
  navigation,
  language,
  languages,
  setLanguageAsync,
  logoutAsync,
}) {
  return (
    <View flex={1} p={5} backgroundColor={Colors.BG}>
      {/* <List px="0" py="0" borderWidth="0">
                <List.Item
                    style={{backgroundColor: '#fff'}}
                    onPress={() => navigation.navigate('ManageProfile')}>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            width: '100%',
                        }}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Avatar ml="2" source={require('../../../assets/avatar.png')}/>
                            <Text ml="2">
                                {tenant.name ? `${tenant.name}/` : ''}
                                {user.userName ? `${user.userName}` : ''}
                            </Text>
                        </View>

                        <List.Icon as={Ionicons} name="arrow-forward" size="5"/>
                    </View>
                </List.Item>
                <Divider thickness={5}/>
                <List.Item
                    style={{backgroundColor: '#fff'}}
                    onPress={() => navigation.navigate('ChangePassword')}>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            width: '100%',
                        }}>
                        <Text ml="2">{i18n.t('AbpUi::ChangePassword')}</Text>

                        <List.Icon as={Ionicons} name="arrow-forward" size="5"/>
                    </View>
                </List.Item>
                <Divider thickness={5}/>
                <List.Item style={{backgroundColor: '#fff'}}>
                    <FormControl my="2">
                        <Stack mx="2">
                            <FormControl.Label>{i18n.t('AbpUi::Language')}</FormControl.Label>
                            <Select
                                mode="dropdown"
                                onValueChange={setLanguageAsync}
                                selectedValue={language.cultureName}>
                                {languages.map(lang => (
                                    <Select.Item
                                        label={lang.displayName}
                                        value={lang.cultureName}
                                        key={lang.cultureName}
                                    />
                                ))}
                            </Select>
                        </Stack>
                    </FormControl>
                </List.Item>
                <Divider thickness={10}/>
                <Button
                    bg="danger.500"
                    style={{borderRadius: 0}}
                    onPress={() => {
                        logout();
                    }}>
                    {i18n.t('AbpAccount::Logout')}
                </Button>
            </List> */}
      <SettingsSectionLayout title={i18n.t('Aled::Settings:AccountSettings')}>
        <SettingsButtonRow.Category
          iconName="account-circle"
          label={i18n.t('AbpAccount::Menu:Account')}
          onPress={() =>
            navigation.navigate('Account')
          }></SettingsButtonRow.Category>
        <SettingsButtonRow.Category
          iconName="security"
          label="Confidentiality & Security"></SettingsButtonRow.Category>
      </SettingsSectionLayout>

      <SettingsSectionLayout title={i18n.t('Aled::Settings:AppSettings')}>
        <SettingsButtonRow.Category
          iconName="language-sharp"
          label={i18n.t('AbpUi::Languages')}
          as={Ionicons}
          onPress={() =>
            navigation.navigate('Account')
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
  setLanguageAsync: PropTypes.func.isRequired,
  logoutAsync: PropTypes.func.isRequired,
  language: PropTypes.object.isRequired,
  languages: PropTypes.array.isRequired,
  tenant: PropTypes.object.isRequired,
};

export default connectToRedux({
  component: SettingsScreen,
  stateProps: state => ({
    languages: createLanguagesSelector()(state),
    language: createLanguageSelector()(state),
    tenant: createTenantSelector()(state),
  }),
  dispatchProps: {
    setLanguageAsync: AppActions.setLanguageAsync,
    logoutAsync: AppActions.logoutAsync,
  },
});
