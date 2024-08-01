import { View } from "native-base";
import { Keyboard, TouchableNativeFeedback } from "react-native";
import { Colors } from "../../styles/CommonStyle";

const Wrapper = ({ children }) => {
  return (
    <TouchableNativeFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View flex={1} backgroundColor={Colors.BG}>
        {children}
      </View>
    </TouchableNativeFeedback>
  );
}

export default Wrapper;