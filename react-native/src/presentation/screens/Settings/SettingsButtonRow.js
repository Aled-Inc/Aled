import { Box, HStack, Icon, Text } from 'native-base';
import React, {  } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Pressable, TextInput } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { settingsStyle } from '../../styles/SettingsStyle';
import { Octicons } from '@expo/vector-icons';
import { isString } from '../../../common/utils/CommonUtils';
import { ActivityIndicator } from 'react-native';
import { Colors } from '../../styles/CommonStyle';
import { Ionicons } from '@expo/vector-icons';
import PropRoles from '../../../common/utils/PropRoles';

function SettingButtonRow() {
  return null;
}

const Category = ({ iconName, label, onPress, as = MaterialCommunityIcons}) => {
  return (
    <Pressable onPress={onPress}>
      {({ pressed }) => (
        <HStack py={3} style={pressed ? settingsStyle.pressed : {}}>
          <Box style={settingsStyle.category.iconBox}>
            <Icon size={8} style={settingsStyle.category.icon} name={iconName} as={as}/>
          </Box>
          <Text style={settingsStyle.category.label}>{label}</Text>
          <Feather name="chevron-right" style={settingsStyle.buttonArrow} />
        </HStack>
      )}
    </Pressable>
  );
};


const Check = ({ iconName, label, isChecked, onPress, as = MaterialCommunityIcons}) => {
  return (
    <Pressable onPress={onPress}>
      {({ pressed }) => (
        <HStack py={3} style={pressed ? settingsStyle.pressed : {}}>
          <Box style={settingsStyle.category.iconBox}>
            <Icon size={8} style={settingsStyle.category.icon} name={iconName} as={as}/>
          </Box>
          <Text style={settingsStyle.category.label}>{label}</Text>
          { isChecked ?
            <Ionicons name="checkmark-circle" style={[settingsStyle.buttonArrow, {color: Colors.Green}]} /> :
            <Ionicons name="close-circle" style={[settingsStyle.buttonArrow, {color: Colors.Red}]}  />
          }
        </HStack>
      )}
    </Pressable>
  );
};

const Data = ({ label, data, onPress }) => {
  return (
    <Pressable onPress={onPress}>
      {({ pressed }) => (
        <HStack py={3} style={pressed ? settingsStyle.pressed : {}}>
          <Box paddingLeft={5} style={settingsStyle.data.labelBox}>
            <Text style={settingsStyle.data.label}>{label}</Text>
          </Box>
          <Box style={settingsStyle.data.infoBox}>
            <Text style={settingsStyle.data.info}>{data}</Text>
          </Box>
          <Feather name="chevron-right" style={settingsStyle.buttonArrow} />
        </HStack>
      )}
    </Pressable>
  );
};

const Button = ({ label, loading, style, isTextCentered = false, onPress }) => {
  return loading ? (
    <Box py={3}>
      <ActivityIndicator size="small" color={Colors.White} />
    </Box>
  ) : (
    <Pressable onPress={onPress}>
      {({ pressed }) => (
        <Text
          py={3}
          paddingLeft={isTextCentered ? 0 : 5}
          textAlign={isTextCentered ? 'center' : undefined}
          style={[
            style ? style : settingsStyle.data.label,
            pressed ? settingsStyle.pressed : {},
          ]}>
          {label}
        </Text>
      )}
    </Pressable>
  );
};

const Edit = ({
  role,
  propValue = null,
  placeholder = '',
  onChange,
  onDelete,
}) => {
  const removeButton = () => {
    return (
      <Box style={{ width: '100%' }}>
        <Octicons
          name="x-circle-fill"
          style={settingsStyle.deleteButton}
          onPress={onDelete}
        />
      </Box>
    );
  };

  return (
    <Box py={4} paddingLeft={3}>
      <HStack>
        <TextInput
          marginLeft={5}
          placeholder={placeholder}
          value={propValue}
          style={settingsStyle.inputValue}
          onChangeText={onChange}
          autoComplete="off"
          secureTextEntry={role === PropRoles.password}></TextInput>
        {isString(propValue) ? removeButton() : null}
      </HStack>
    </Box>
  );
};

SettingButtonRow.Category = Category;
SettingButtonRow.Data = Data;
SettingButtonRow.Button = Button;
SettingButtonRow.Edit = Edit;
SettingButtonRow.Check = Check;

export default SettingButtonRow;
