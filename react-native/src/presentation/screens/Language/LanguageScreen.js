import PropTypes from 'prop-types';
import { connectToRedux } from '../../../common/utils/ReduxConnect';
import { createLanguageSelector, createLanguagesSelector } from '../../../business/store/selectors/AppSelectors';
import AppActions from '../../../business/store/actions/AppActions';
import { Box, Divider, FlatList, HStack, Pressable, Text, View } from 'native-base';
import { Colors } from '../../styles/CommonStyle';
import { settingsStyle } from '../../styles/SettingsStyle';
import CountryFlag from 'react-native-country-flag';
import { Feather } from '@expo/vector-icons';

function LanguageScreen({language, languages, setLanguage}) {

  const Item = ({ culture, onPress, isSelected }) => (
    <Box>
      <Pressable onPress={onPress} disabled={isSelected}>
        <HStack py={3} style={isSelected ? settingsStyle.pressed : null}>
          <Box
            style={settingsStyle.category.iconBox}
            paddingTop={1}
            paddingLeft={5}>
            <CountryFlag
              size={25}
              style={settingsStyle.category.icon}
              isoCode={culture.twoLetterISOLanguageName}>
            </CountryFlag>
          </Box>
          <Text paddingLeft={7} style={settingsStyle.category.label}>
            {culture.displayName}
          </Text>
          {isSelected ? (
            <Feather name="check" style={settingsStyle.buttonArrow} />
          ) : null}
        </HStack>
      </Pressable>
      <Divider style={settingsStyle.dividerView}></Divider>
    </Box>
  );

  const languageRender = ({ item }) => {
    return (
      <Item 
        culture={item}
        onPress={() => setLanguage(item.cultureName)}
        isSelected={item.cultureName === language.cultureName}
        />
    );
  };

  return (
    <View flex={1} backgroundColor={Colors.BG}>
      <FlatList data={languages} renderItem={languageRender} />
    </View>
  );
};

LanguageScreen.propTypes = {
  language: PropTypes.object.isRequired,
  languages: PropTypes.array.isRequired,
  setLanguage: PropTypes.func.isRequired,
};

export default connectToRedux({
  component: LanguageScreen,
  stateProps: state => ({
    languages: createLanguagesSelector()(state),
    language: createLanguageSelector()(state),
  }),
  dispatchProps: {
    setLanguage: AppActions.setLanguageAsync,
  },
});