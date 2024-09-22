import { View } from 'native-base';
import { Keyboard, TouchableNativeFeedback } from 'react-native';
import { Colors } from '../../presentation/styles/CommonStyle';

const Wrapper = ({ children }) => {
  return (
    <TouchableNativeFeedback onPress={Keyboard.dismiss} accessible={false}>
      {/* <View flex={1} backgroundColor={Colors.BG}>
      </View> */}
      {children}
    </TouchableNativeFeedback>
  );
};

export default Wrapper;
