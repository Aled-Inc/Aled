import { StyleSheet } from "react-native";
import { Colors } from "./CommonStyle";

const dividerCategoryWidth = 85;

const buttonArrowWidth = 10;

let iconBoxWidth = 100 - dividerCategoryWidth;
let buttonCategoryLabelWidth = (100 - buttonArrowWidth) - iconBoxWidth;

export const settingsStyle = StyleSheet.create({
  sectionTitle: {
    fontFamily: 'Inter-Black',
    color: Colors.Text,
    marginBottom: 5,
    opacity: 0.7,
    fontSize: 13
  },
  dividerView: {
    alignItems: 'flex-end',
    width: '100%',
    color: Colors.SubText
  },
  buttonArrow: {
    fontSize: 30,
    color: Colors.Text,
    opacity: 0.7,
    width: `${buttonArrowWidth}%`
  },
  logoutButton: {
    backgroundColor: Colors.Element,
  },
  logoutButtonLabel: {
    fontFamily: 'Inter-Bold',
    color: Colors.White
  },
  redButton: {
    fontFamily: 'Inter-SemiBold',
    lineHeight: 32,
    fontSize: 15,
    color: Colors.Red
  },
  pressed: {
    backgroundColor: Colors.BGDarker
  },
  
  category: {
    divider: {
      width: `${dividerCategoryWidth}%`
    },
    iconBox: {
      width: `${iconBoxWidth}%`,
      alignItems: 'center'
    },
    icon: {
      color: Colors.Text,
      opacity: 0.7
    },
    label: {
      fontFamily: 'Inter-SemiBold',
      fontSize: 15,
      color: Colors.Text,
      opacity: 0.7,
      lineHeight: 32,
      width: `${buttonCategoryLabelWidth}%`
    },
  },

  data: {
    divider: {
      width: '95%'
    },
    labelBox: {
      width: '45%',
    },
    infoBox: {
      width: '45%',
      alignItems: 'flex-end',
      paddingRight: 5
    },
    label: {
      fontFamily: 'Inter-SemiBold',
      lineHeight: 32,
      fontSize: 15,
      color: Colors.Text,
      opacity: 0.7
    },
    info: {
      fontFamily: 'Inter-SemiBold',
      lineHeight: 32,
      color: Colors.Text,
      opacity: 0.5
    }
  },

  deleteButton: {
    fontSize: 15,
    lineHeight: 20,
    color: Colors.Text,
    opacity: 0.7
  },
  inputValue: {
    width: '90%',
    fontFamily: 'Inter-SemiBold',
    lineHeight: 20,
    fontSize: 16,
    color: Colors.Text,
    opacity: 0.7,
  }
});