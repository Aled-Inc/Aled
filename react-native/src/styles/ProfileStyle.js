import { StyleSheet } from "react-native";
import { Colors } from "./CommonStyle";

export const profileStyle = StyleSheet.create({
  identityBox: {
    width: '100%',
    marginVertical: 20
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
  identityUserName: {
    fontFamily: 'Inter-Medium',
    fontSize: 32,
    lineHeight: 32,
    color: Colors.Text
  },
  identityCommonName: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.SubText,
    opacity: 0.5
  },
  identityEmail: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: Colors.SubText
  },
  scoreRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%'
  },
  scoreCol: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'column',
  },
  scoreNumber : {
    fontFamily: 'Inter-Medium',
    fontSize: 40,
    lineHeight: 40,
    color: Colors.Element
  },
  scoreLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 11,
    color: Colors.Text
  }
})