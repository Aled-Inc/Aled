import { View } from 'native-base';
import SettingsSectionLayout from '../Settings/SettingsSectionLayout';
import SettingsButtonRow from '../Settings/SettingsButtonRow';
import PropTypes from 'prop-types';
import { connectToRedux } from '../../utils/ReduxConnect';
import { createUserSelector } from '../../store/selectors/AuthSelector';
import { settingsStyle } from '../../styles/SettingsStyle';
import AccountActions from '../../store/actions/AccountActions';
import { Colors } from '../../styles/CommonStyle';
import PropRoles from '../../utils/PropRoles';
import i18n from 'i18n-js';

function AccountScreen({
  navigation,
  user,
  updateUsername,
  updateName,
  updateSurname,
  updateEmail,
  updatePhone,
  changePassword,
  disableProfile,
  deleteProfile,
}) {
  const onEditProp = (
    propName,
    propValue,
    propRole = PropRoles.common,
    submit = () => {},
  ) => {
    navigation.navigate('Edit', {
      title: propName,
      propName,
      propValue,
      propRole,
      submit,
    });
  };

  return (
    <View p={5} flex={1} backgroundColor={Colors.BG}>
      <SettingsSectionLayout title={i18n.t('Aled::Settings:Account:Information')} isCategory={false}>
        <SettingsButtonRow.Data
          label={i18n.t('AbpIdentity::DisplayName:UserName')}
          data={user.userName}
          onPress={() =>
            onEditProp(
              i18n.t('AbpIdentity::DisplayName:UserName'),
              user.userName,
              PropRoles.common,
              updateUsername,
            )
          }></SettingsButtonRow.Data>
        <SettingsButtonRow.Data
          label={i18n.t('AbpIdentity::DisplayName:Name')}
          data={user.name}
          onPress={() =>
            onEditProp(i18n.t('AbpIdentity::DisplayName:Name'), user.name, PropRoles.common, updateName)
          }></SettingsButtonRow.Data>
        <SettingsButtonRow.Data
          label={i18n.t('AbpIdentity::DisplayName:Surname')}
          data={user.surname}
          onPress={() =>
            onEditProp(i18n.t('AbpIdentity::DisplayName:Surname'), user.surname, PropRoles.common, updateSurname)
          }></SettingsButtonRow.Data>
        <SettingsButtonRow.Data
          label={i18n.t('AbpIdentity::DisplayName:Email')}
          data={user.email}
          onPress={() =>
            onEditProp(i18n.t('AbpIdentity::DisplayName:Email'), user.email, PropRoles.email, updateEmail)
          }></SettingsButtonRow.Data>
        <SettingsButtonRow.Data
          label={i18n.t('Aled::PhoneNumber')}
          data={user.phoneNumber}
          onPress={() =>
            onEditProp(i18n.t('Aled::PhoneNumber'), user.phoneNumber, PropRoles.phone, updatePhone)
          }></SettingsButtonRow.Data>
      </SettingsSectionLayout>

      <SettingsSectionLayout
        title={i18n.t('Aled::Settings:Account:Logins')}
        isCategory={false}>
        <SettingsButtonRow.Data
          label={i18n.t('Aled::Password')}
          onPress={() =>
            onEditProp(i18n.t('AbpIdentity::DisplayName:NewPassword'), null, PropRoles.password, changePassword)
          }></SettingsButtonRow.Data>
      </SettingsSectionLayout>

      <SettingsSectionLayout title={i18n.t('Aled::Settings:Account:Manage')} isCategory={false}>
        <SettingsButtonRow.Button
          label={i18n.t('Aled::Settings:Account:Manage:Disable')}
          onPress={() => disableProfile()}></SettingsButtonRow.Button>
        <SettingsButtonRow.Button
          label={i18n.t('Aled::Settings:Account:Manage:Delete')}
          style={settingsStyle.redButton}
          onPress={() => deleteProfile()}></SettingsButtonRow.Button>
      </SettingsSectionLayout>
    </View>
  );
}

AccountScreen.propTypes = {
  user: PropTypes.object.isRequired,
  updateUsername: PropTypes.func.isRequired,
  updateName: PropTypes.func.isRequired,
  updateSurname: PropTypes.func.isRequired,
  updateEmail: PropTypes.func.isRequired,
  updatePhone: PropTypes.func.isRequired,
  changePassword: PropTypes.func.isRequired,
  disableProfile: PropTypes.func.isRequired,
  deleteProfile: PropTypes.func.isRequired,
};

export default connectToRedux({
  component: AccountScreen,
  stateProps: state => ({
    user: createUserSelector()(state),
  }),
  dispatchProps: {
    updateUsername: AccountActions.updateUsernameAsync,
    updateName: AccountActions.updateNameAsync,
    updateSurname: AccountActions.updateSurnameAsync,
    updateEmail: AccountActions.updateEmailAsync,
    updatePhone: AccountActions.updatePhoneAsync,
    changePassword: AccountActions.changePasswordAsync,
    disableProfile: AccountActions.disableProfileAsync,
    deleteProfile: AccountActions.deleteProfileAsync,
  },
});