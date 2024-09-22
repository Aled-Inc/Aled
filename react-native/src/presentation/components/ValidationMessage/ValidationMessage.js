import i18n from 'i18n-js';
import React, {forwardRef} from 'react';
import { Text} from 'react-native';
import { Colors } from '../../../styles/CommonStyle';

const ValidationMessage = ({children, value = 0, ...props}) =>
    children ? <Text style={styles} {...props}>{i18n.t(children, {0: value})}</Text> : null;

const styles = {
  fontFamily: 'Inter-Regular',
    fontSize: 12,
    marginTop: 3,
    color: Colors.Red,
};

const Forwarded = forwardRef((props, ref) => <ValidationMessage {...props} forwardedRef={ref}/>);

export default Forwarded
