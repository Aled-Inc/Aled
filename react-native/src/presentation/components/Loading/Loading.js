import {Spinner, View} from 'native-base';
import PropTypes from 'prop-types';
import React, {forwardRef} from 'react';
import {StyleSheet} from 'react-native';
import {createLoadingSelector, createOpacitySelector} from '../../store/selectors/LoadingSelectors';
import {connectToRedux} from '../../utils/ReduxConnect';

function Loading({loading, opacity}) {
    return loading ? (
        <View style={styles.container}>
            <View
                style={{
                    ...styles.backdrop,
                    opacity: opacity || 0.6,
                }}
            />
            <Spinner style={styles.spinner} color={styles.spinner.color}/>
        </View>
    ) : null;
}

const Forwarded = forwardRef((props, ref) => <Loading {...props} forwardedRef={ref}/>);

const backdropStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
};

export const styles = StyleSheet.create({
    container: {
        ...backdropStyle,
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
    },
    backdrop: backdropStyle,
    spinner: {
        fontSize: 100,
    },
});

Loading.propTypes = {
    loading: PropTypes.bool,
    opacity: PropTypes.number,
};

export default connectToRedux({
    component: Forwarded,
    stateProps: state => ({
        loading: createLoadingSelector()(state),
        opacity: createOpacitySelector()(state),
    }),
});
