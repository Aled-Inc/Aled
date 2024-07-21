import PropTypes from 'prop-types';
import { connectToRedux } from '../../utils/ReduxConnect';
import React, {forwardRef, useEffect} from 'react';
import { createActionStatusSelector } from '../../store/selectors/LoadingSelectors';
import ActionStatus from '../../utils/ActionStatus';
import { View, Modal, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Colors } from '../../styles/CommonStyle';
import LoadingActions from '../../store/actions/LoadingActions';
import i18n from 'i18n-js';

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
        <Text style={styles.modalText}>{i18n.t('ErrorSave::Successful')}</Text>
      </>
    );
  };

  const error = () => {
    return (
      <>
        <Feather name="x-circle" size={75} color={Colors.Red} />
        <Text style={styles.modalText}>{i18n.t('Aled::ErrorSave::TryAgainOrLater')}</Text>
      </>
    );
  };

  return actionStatus == ActionStatus.idle || actionStatus == ActionStatus.pendging ? null : (
    <View style={styles.centeredView}>
      <Modal 
        animationType='fade'
        transparent={true}
        visible={true}
        onShow={() => {
          setTimeout(() => setIdle(), 5000);
        }}
        >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            { actionStatus === ActionStatus.succeeded ? succeeded() : error() }
          </View>
        </View>
      </Modal>
    </View>
  );
};

const Forwarded = forwardRef((props, ref) => <ActionStatusModal {...props} forwardRef={ref} /> );

const styles = StyleSheet.create({
  centeredView: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.2)'
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 35,
    alignItems: 'center',
    textAlign: 'center',
    elevation: 5,
  },
  modalText: {
    fontFamily: 'Inter-Regular',
    marginTop: 20,
    textAlign: 'center',
  },
});

ActionStatusModal.prototype = {
  setIdle: PropTypes.object.isRequired,
  actionLoading: PropTypes.string,
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