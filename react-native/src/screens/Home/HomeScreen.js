import i18n from 'i18n-js';
import { Avatar, Box, Center, Text, View } from 'native-base';
import React from 'react';
import { connectToRedux } from '../../utils/ReduxConnect';
import { createUserSelector } from '../../store/selectors/AuthSelector';
import PropTypes from 'prop-types';
import { homeStyle } from '../../styles/HomeStyle';

function HomeScreen({ user }) {
  return (
    <View style={homeStyle.homeContainer} px="3">
      <Box style={homeStyle.identityBox}>
        <View style={homeStyle.identityRowView}>
          <Avatar ml="3" style={homeStyle.identityAvatar} source={require('../../../assets/avatar.png')} />
          <View ml="3" style={homeStyle.identityColView}>
            <Text style={homeStyle.identityText}>
              {i18n.t('::Welcome')}
              <Text style={homeStyle.identityText.username}> {user.userName}</Text>
            </Text>
            <Text style={homeStyle.identitySubtitle}>{i18n.t('Aled::Home:Subtitle')}</Text>
          </View>
        </View>
      </Box>
    </View>
  );
}

HomeScreen.propTypes = {
  user: PropTypes.object.isRequired,
};

export default connectToRedux({
  component: HomeScreen,
  stateProps: state => ({
    user: createUserSelector()(state),
  }),
});
