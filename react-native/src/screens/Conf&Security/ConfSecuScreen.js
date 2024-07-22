import { View } from "native-base";
import { Colors } from "../../styles/CommonStyle";
import SettingsSectionLayout from "../Settings/SettingsSectionLayout";
import SettingsButtonRow from '../Settings/SettingsButtonRow';
import { Ionicons } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import i18n from "i18n-js";
import { connectToRedux } from "../../utils/ReduxConnect";
import { createUserSelector } from "../../store/selectors/AuthSelector";

function ConfSecuScreen({ user }) {
  return (
    <View flex={1} p={5} backgroundColor={Colors.BG}>
      <SettingsSectionLayout title={'Informations vérifiées'}>
        <SettingsButtonRow.Check
          iconName="email"
          isChecked={user.emailConfirmed}
          label={i18n.t('AbpIdentity::DisplayName:Email')}
          onPress={() =>
            console.log("")
          }></SettingsButtonRow.Check>
        <SettingsButtonRow.Check
          iconName="phone-portrait"
          isChecked={user.phoneNumberConfirmed}
          as={Ionicons}
          label={i18n.t('Aled::PhoneNumber')}
          onPress={() => console.log("")}>
        </SettingsButtonRow.Check>
      </SettingsSectionLayout>

      <SettingsSectionLayout title={'Sécurité'}>
        <SettingsButtonRow.Check
          iconName="lock-closed"
          as={Ionicons}
          isChecked={user.twoFactorEnabled}
          label={i18n.t('AbpIdentity::DisplayName:TwoFactorEnabled')}
          onPress={() =>
            console.log("")
          }></SettingsButtonRow.Check>
      </SettingsSectionLayout>
    </View>
  );
};

ConfSecuScreen.propTypes = {
  user: PropTypes.object.isRequired
}

export default connectToRedux({
  component: ConfSecuScreen,
  stateProps: state => ({
    user: createUserSelector()(state)
  }),
});