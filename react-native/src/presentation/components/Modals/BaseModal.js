import { View, Modal } from 'react-native';
import ModalTypes from '../../../common/utils/ModalTypes';
import SendEmailConfirmationModalContent from './Contents/SendEmailConfirmationModalContent';
import PropTypes from 'prop-types';
import { connectToRedux } from '../../../common/utils/ReduxConnect';
import { createRequestedConfirmationModalSelector } from '../../../business/store/selectors/AppSelectors';
import { forwardRef } from 'react';
import { isString } from '../../../common/utils/CommonUtils';
import { modalStyles } from '../../styles/ModalStyles';

function BaseModal({ modalType }) {
  const getContent = () => {
    if (modalType === ModalTypes.EmailConfirmationModal) {
      return <SendEmailConfirmationModalContent />;
    }

    return <></>;
  };

  return isString(modalType) ? (
    <View style={modalStyles.centeredView}>
      <Modal animationType="fade" transparent={true} visible={true}>
        <View style={modalStyles.centeredView}>{getContent()}</View>
      </Modal>
    </View>
  ) : null;
}

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
