import { StyleSheet } from 'react-native';
import { Colors } from './CommonStyle';

export const homeStyle = StyleSheet.create({
  homeContainer: {
    flex: 1,
    backgroundColor: Colors.BG,
  },
  identityBox: {
    width: '100%',
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
    height: 90,
  },
  identityText: {
    fontFamily: 'Inter-Bold',
    fontSize: 26,
    lineHeight: 26,
    color: Colors.Text,
    username: {
      color: Colors.Element,
    },
  },
  identitySubtitle: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    lineHeight: 16,
  },
  listTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 22,
    lineHeight: 22,
    color: Colors.Text,
  },
  notificationHeader: {
    backgroundColor: '#FFC700',
  },
  notificationCard: {
    padding: 10,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  noNotificationsText: {
    textAlign: 'center',
    color: '#888',
    paddingVertical: 10,
  },
});
