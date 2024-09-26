import { HStack, Pressable, Text, View } from 'native-base';
import { connectToRedux } from '../../../../common/utils/ReduxConnect';
import AppActions from '../../../../business/store/actions/AppActions';
import PropTypes from 'prop-types';
import AccountActions from '../../../../business/store/actions/AccountActions';
import { modalStyles } from '../../../styles/ModalStyles';
import { Colors } from '../../../styles/CommonStyle';
import i18n from 'i18n-js';

function SendEmailConfirmationModalContent({
  requestConfirmationModal,
  sendEmailConfirmationCode,
}) {
  const sendEmailConfirmCodeThenCloseModal = () => {
    sendEmailConfirmationCode();
    requestConfirmationModal({ modalType: null });
  };

  return (
    <View style={modalStyles.modalView} testID='email-confirmation-content'>
      <Text style={modalStyles.modalTitle}>
        {i18n.t('Aled::Modal:EmailConfirmation')}
      </Text>
      <HStack
        pt={8}
        style={modalStyles.modalButtonRow}
        space={10}
        width={'100%'}>
        <Pressable
          w={100}
          borderRadius={'2xl'}
          backgroundColor={Colors.BGDarker}
          onPress={() => requestConfirmationModal({ modalType: null })}>
          <Text style={modalStyles.modalButtonText}>
            {i18n.t('AbpUi::Cancel')}
          </Text>
        </Pressable>
        <Pressable
          w={100}
          borderRadius={'2xl'}
          backgroundColor={Colors.Element}
          onPress={() => sendEmailConfirmCodeThenCloseModal()}>
          <Text style={modalStyles.modalButtonText}>
            {i18n.t('AbpUi::Yes')}
          </Text>
        </Pressable>
      </HStack>
    </View>
  );
}

SendEmailConfirmationModalContent.propTypes = {
  requestConfirmationModal: PropTypes.func.isRequired,
  sendEmailConfirmationCode: PropTypes.func.isRequired,
};

export default connectToRedux({
  component: SendEmailConfirmationModalContent,
  dispatchProps: {
    requestConfirmationModal: AppActions.requestConfirmationModal,
    sendEmailConfirmationCode: AccountActions.sendEmailVerificationCodeAsync,
  },
});
