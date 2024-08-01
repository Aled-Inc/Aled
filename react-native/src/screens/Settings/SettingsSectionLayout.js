import {Box, Button, Divider, Text, View, VStack,} from 'native-base';
import { settingsStyle } from '../../styles/SettingsStyle';
import { Colors } from '../../styles/CommonStyle';

const SettingsSectionLayout = ({ title = null, isCategory = true, bgColor = null, marginBottom = 5, children }) => {
  const getTitle = () =>
    title ? <Text style={settingsStyle.sectionTitle}>{title}</Text> : <></>;

  return (
    <View marginTop={5} marginBottom={marginBottom}>
      {getTitle()}
      <Box borderRadius="xl" backgroundColor={bgColor ?? Colors.White} overflow={'hidden'}>
        <VStack
          divider={
            <View style={settingsStyle.dividerView}>
              <Divider style={isCategory ? settingsStyle.category.divider : settingsStyle.data.divider} />
            </View>
          }>
            {children}
          </VStack>
      </Box>
    </View>
  );
};

export default SettingsSectionLayout;
