import { StyleSheet } from "react-native";

export const modalStyles = StyleSheet.create({
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
  modalTitle: {
    fontFamily: 'Inter-Regular',
    textAlign: 'center',
    fontSize: 15,
  },
  modalButtonRow: {
    width: '100%'
  },
  modalButtonText: {
    fontFamily: 'Inter-Medium',
    textAlign: 'center',
    paddingHorizontal: 20,
    paddingVertical: 5
  }
});