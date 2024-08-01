import { HStack, Pressable } from 'native-base';
import { View, Modal, Text } from 'react-native';
import ModalTypes from '../../utils/ModalTypes';
import SendEmailConfirmationModalContent from './Contents/SendEmailConfirmationModalContent';
import PropTypes from 'prop-types';
import { connectToRedux } from '../../utils/ReduxConnect';
import { createRequestedConfirmationModalSelector } from '../../store/selectors/AppSelectors';
import { forwardRef } from 'react';
import { isString } from '../../utils/CommonUtils';
import { modalStyles } from '../../styles/ModalStyles';

function BaseModal({ modalType }) {
  const getContent = () => {
    switch (modalType) {
      case ModalTypes.EmailConfirmationModal:
        return <SendEmailConfirmationModalContent />;
      default:
        return <></>;
    }
  };

  return isString(modalType) ? (
    <View style={modalStyles.centeredView}>
      <Modal animationType="fade" transparent={true} visible={true}>
        <View style={modalStyles.centeredView}>
          { getContent() }
        </View>
      </Modal> 
    </View>
  ) : null;
};

const Forwarded = forwardRef((props, ref) => (
  <BaseModal {...props} forwardRef={ref} />
));

BaseModal.propTypes = {
  modalType: PropTypes.string,
};

export default connectToRedux({
  component: Forwarded,
  stateProps: state => ({
    modalType: createRequestedConfirmationModalSelector()(state),
  }),
});
