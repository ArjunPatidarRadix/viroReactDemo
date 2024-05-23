import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {height, width} from '../utils/styleSheet';

export const GameOver = ({
  score,
  onRestart,
  onGoback,
}: {
  score: number;
  onRestart: () => void;
  onGoback: () => void;
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Game Over</Text>
      <Text style={styles.text}>Score: {score}</Text>
      <TouchableOpacity onPress={onRestart} style={styles.button}>
        <Text style={styles.buttonText}>Restart</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onGoback} style={styles.button}>
        <Text style={styles.buttonText}>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width - 100,
    height: height / 2.5,
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 10,
  },
  text: {
    color: 'white',
    fontSize: 30,
    textAlign: 'center',
    padding: 10,
  },
  button: {
    alignItems: 'center',
    backgroundColor: 'skyblue',
    padding: 10,
    width: 100,
    marginTop: 25,
    borderRadius: 10,
  },
  buttonText: {color: 'white', fontWeight: 'bold'},
});
