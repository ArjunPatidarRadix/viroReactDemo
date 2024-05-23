import {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {height, width} from '../utils/styleSheet';
import ReactNativeModal from 'react-native-modal';

export const Timer = ({startGame}: {startGame: () => void}) => {
  const [counter, setCounter] = useState(5);

  useEffect(() => {
    if (counter > 0) {
      setTimeout(() => setCounter(counter - 1), 1000);
    } else {
      startGame();
    }
  }, [counter]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{counter}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width - 100,
    height: height / 3,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 10,
  },
  text: {
    color: 'white',
    fontSize: 50,
    textAlign: 'center',
    padding: 10,
  },
});
