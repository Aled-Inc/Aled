import { StyleSheet } from "react-native";

export const homeStyle = StyleSheet.create({
  homeContainer: {
    flex: 0.25
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
      color: '#FFC700'
    }
  },
  identitySubtitle: {
    fontFamily: 'Inter-Medium',
    fontSize: 14
  }
})