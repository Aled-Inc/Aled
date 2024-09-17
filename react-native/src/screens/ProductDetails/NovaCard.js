import { Text, View, VStack } from 'native-base';
import { StyleSheet } from 'react-native';
import { Colors } from '../../styles/CommonStyle';

export default function NovaCard({ novascore }) {
  const color = () => {
    switch (novascore) {
      case 1:
        return Colors.NovaGreen;
      case 2:
        return Colors.NovaYellow;
      case 3:
        return Colors.NovaOrange;
      case 4:
        return Colors.NovaRed;
      default:
        return Colors.White;
    }
  };

  return (
    <VStack marginLeft={10}>
      <Text style={styles.title}>NOVA</Text>
      <View style={[styles.card, { backgroundColor: color() }]}>
        <Text style={styles.text}>{novascore}</Text>
      </View>
    </VStack>
  );
}

const styles = StyleSheet.create({
  card: {
    height: 40,
    width: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 22,
    textAlign: 'center',
  },
  title: {
    fontSize: 10,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
