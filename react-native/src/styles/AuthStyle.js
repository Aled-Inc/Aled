import { StyleSheet } from "react-native";

export const authStyles = StyleSheet.create({
  titleBox: {
    flex: 0.55,
    width: '100%',
    marginTop: '20%',
    alignItems: 'center'
  },
  formBox: {
    flex: 1,
    width: '100%',
  },
  buttonBox: {
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#FFC700',
    borderRadius: 25,
    height: 45,
    marginTop: 100,
    marginBottom: 15,
    text: {
      fontFamily: 'Inter-Light',
      fontSize: 14,
      color: '#000'
    }
  },
  input: {
    height: 40,
    paddingHorizontal: 15,
    fontSize: 14,
    backgroundColor: '#ffffff',
  },
  title: {
    fontFamily: 'Inter-Medium',
    fontSize: 40
  },
  subtitle: {
    fontFamily: 'Inter-Light',
    fontSize: 15,
    color: '#808080',
    marginTop: 5,
    marginBottom: 20
  },
  appTitle: {
    fontFamily: 'Inter-Light',
    fontSize: 16,
    color: '#808080'
  },
  forgotPassword: {
    fontFamily: 'Inter-Light',
    fontSize: 12,
    paddingTop: 5,
    paddingLeft: 10
  },
  authPhrase: {
    fontFamily: 'Inter-Light',
    fontSize: 14,
  },
  authLink: {
    fontFamily: 'Inter-Light',
    fontSize: 14,
    color: '#808080',
    textDecorationLine: 'underline'
  }
});