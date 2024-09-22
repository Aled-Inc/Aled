import PropTypes from 'prop-types';
import { connectToRedux } from '../../utils/ReduxConnect';
import React, {forwardRef, useEffect} from 'react';
import { createActionStatusSelector } from '../../store/selectors/LoadingSelectors';
import ActionStatus from '../../utils/ActionStatus';
import { View, Modal, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Colors } from '../../presentation/styles/CommonStyle';
import LoadingActions from '../../store/actions/LoadingActions';
import i18n from 'i18n-js';
import { modalStyles } from '../../presentation/styles/ModalStyles';

function ActionStatusModal({ actionStatus, setIdle }) {
  useEffect(() => {
    if (actionStatus === ActionStatus.succeeded) {
      const timer = setTimeout(() => {
        setIdle();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [actionStatus, setIdle]);

  const succeeded = () => {
    return (
      <>
        <Feather name="check-circle" size={75} color={Colors.Green} />
        <Text style={modalStyles.modalText}>{i18n.t('Aled::ErrorSave:Successful')}</Text>
      </>
    );
  };

  const error = () => {
    return (
      <>
        <Feather name="x-circle" size={75} color={Colors.Red} />
        <Text style={modalStyles.modalText}>{i18n.t('Aled::ErrorSave:TryAgainOrLater')}</Text>
      </>
    );
  };

  return actionStatus == ActionStatus.idle || actionStatus == ActionStatus.pendging ? null : (
    <View style={modalStyles.centeredView}>
      <Modal 
        animationType='fade'
        transparent={true}
        visible={true}
        onShow={() => {
          setTimeout(() => setIdle(), 5000);
        }}
        >
        <View style={modalStyles.centeredView}>
          <View style={modalStyles.modalView}>
            { actionStatus === ActionStatus.succeeded ? succeeded() : error() }
          </View>
        </View>
      </Modal>
    </View>
  );
};

const Forwarded = forwardRef((props, ref) => <ActionStatusModal {...props} forwardRef={ref} /> );

ActionStatusModal.propTypes = {
  setIdle: PropTypes.func.isRequired,
  actionStatus: PropTypes.string,
};

export default connectToRedux({
  component: Forwarded,
  stateProps: state => ({
    actionStatus: createActionStatusSelector()(state),
  }),
  dispatchProps: {
    setIdle: LoadingActions.idle
  }
});