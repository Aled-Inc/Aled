import { View } from "native-base";
import { Colors } from "../../styles/CommonStyle";
import SettingsSectionLayout from "../Settings/SettingsSectionLayout";
import SettingsButtonRow from '../Settings/SettingsButtonRow';
import { Ionicons } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import i18n from "i18n-js";
import { connectToRedux } from "../../../common/utils/ReduxConnect";
import { createUserSelector } from "../../../business/store/selectors/AuthSelector";
import ModalTypes from "../../../common/utils/ModalTypes";
import AppActions from "../../../business/store/actions/AppActions";

function ConfSecuScreen({ user, requestConfirmationModal }) {
  return (
    <View flex={1} p={5} backgroundColor={Colors.BG}>
      <SettingsSectionLayout title={i18n.t('Aled::Settings:ConfidentialityAndSecurity:VerifiedInformation')}>
        <SettingsButtonRow.Check
          iconName="email"
          isChecked={user.emailConfirmed}
          label={i18n.t('AbpIdentity::DisplayName:Email')}
          onPress={() =>
            user.emailConfirmed ? null : requestConfirmationModal({ modalType: ModalTypes.EmailConfirmationModal })
          }></SettingsButtonRow.Check>
        <SettingsButtonRow.Check
          iconName="phone-portrait"
          isChecked={user.phoneNumberConfirmed}
          as={Ionicons}
          label={i18n.t('Aled::PhoneNumber')}
          onPress={() => {}}>
        </SettingsButtonRow.Check>
      </SettingsSectionLayout>

      <SettingsSectionLayout title={i18n.t('Aled::Settings:ConfidentialityAndSecurity:Security')}>
        <SettingsButtonRow.Check
          iconName="lock-closed"
          as={Ionicons}
          isChecked={user.twoFactorEnabled}
          label={i18n.t('AbpIdentity::DisplayName:TwoFactorEnabled')}
          onPress={() =>
            {}
          }></SettingsButtonRow.Check>
      </SettingsSectionLayout>
    </View>
  );
};

ConfSecuScreen.propTypes = {
  user: PropTypes.object.isRequired,
  requestConfirmationModal: PropTypes.func.isRequired,
}

export default connectToRedux({
  component: ConfSecuScreen,
  stateProps: state => ({
    user: createUserSelector()(state)
  }),
  dispatchProps: {
    requestConfirmationModal: AppActions.requestConfirmationModal,
  },
});