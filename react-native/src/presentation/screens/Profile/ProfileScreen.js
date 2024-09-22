import PropTypes from 'prop-types';
import { connectToRedux } from '../../utils/ReduxConnect';
import { createUserSelector } from '../../store/selectors/AuthSelector';
import { Avatar, Box, Center, Text, View } from 'native-base';
import { profileStyle } from '../../styles/ProfileStyle';
import { haveValidCommonName } from '../../utils/UserUtils';
import { Colors } from '../../styles/CommonStyle';

function ProfileScreen({ user }) {
  const userCommonName = () => {
    return haveValidCommonName(user) ? <Text style={profileStyle.identityCommonName}>{`${user.name} ${user.surname}`}</Text> : <></>;
  }

  return (
    <View px="3" py="3" flex={1} backgroundColor={Colors.BG}>
      <Box style={profileStyle.identityBox}>
        <View style={profileStyle.identityRowView}>
          <Avatar ml="3" style={profileStyle.identityAvatar} source={require('../../../assets/avatar.png')} />
          <View ml="3" style={profileStyle.identityColView}>
            <Text style={profileStyle.identityUserName}>{ user.userName }</Text>
            {userCommonName()}
            <Text style={profileStyle.identityEmail}>{ user.email }</Text>
          </View>
        </View>
      </Box>
      <Box style={profileStyle.identityBox}>
        <View style={profileStyle.scoreRow}>
          <View style={profileStyle.scoreCol}>
            <Text style={profileStyle.scoreNumber}>36</Text>
            <Text style={profileStyle.scoreLabel}>scanned</Text>
          </View>
          <View style={profileStyle.scoreCol}>
            <Text style={profileStyle.scoreNumber}>5</Text>
            <Text style={profileStyle.scoreLabel}>given</Text>
          </View>
          <View style={profileStyle.scoreCol}>
            <Text style={profileStyle.scoreNumber}>21</Text>
            <Text style={profileStyle.scoreLabel}>saved</Text>
          </View>
          <View style={profileStyle.scoreCol}>
            <Text style={profileStyle.scoreNumber}>2</Text>
            <Text style={profileStyle.scoreLabel}>loosed</Text>
          </View>
        </View>
      </Box>
    </View>
  );
}

ProfileScreen.propTypes = {
  user : PropTypes.object.isRequired,
}

export default connectToRedux({
  component: ProfileScreen,
  stateProps: state => ({
    user: createUserSelector()(state)
  }),
});