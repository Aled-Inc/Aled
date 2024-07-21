import { StyleSheet } from "react-native";
import { Colors } from "./CommonStyle";

export const homeStyle = StyleSheet.create({
  homeContainer: {
    flex: 1,
    backgroundColor: Colors.BG
  },
  identityBox: {
    width: '100%'
  },
  identityRowView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  identityColView: {
    flexDirection: 'column',
  },
  identityAvatar: {
    width: 90,
    height: 90
  },
  identityText: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    lineHeight: 24,
    username: {
      color: Colors.Element
    }
  },
  identitySubtitle: {
    fontFamily: 'Inter-Medium',
    fontSize: 14
  }
})