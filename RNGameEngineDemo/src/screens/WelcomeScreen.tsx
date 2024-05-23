import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect, useState} from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {GAME_SCREEN, SCORE_BOARD_SCREEN} from '../utils/constants';
import {height, width} from '../utils/styleSheet';

export const WelcomeScreen = ({navigation}: {navigation: any}) => {
  const Background = require('../assets/WelcomeBackground.jpeg');
  const [existingUser, setExistingUser] = useState('');
  const [newUser, setNewUser] = useState('');
  const getUser = async () => {
    const user = await AsyncStorage.getItem('user');
    if (user) {
      setExistingUser(user);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const onPlayNow = async () => {
    if (existingUser) {
      navigation.navigate(GAME_SCREEN);
    } else {
      if (newUser.length) {
        await AsyncStorage.setItem('user', newUser);
        await navigation.navigate(GAME_SCREEN);
      }
    }
  };

  const onScores = () => {
    navigation.navigate(SCORE_BOARD_SCREEN);
  };

  const onLogout = () => {
    Alert.alert('WAIT!!!', 'You will lose your all achievements! ', [
      {
        text: 'Logout',
        onPress: async () => {
          await AsyncStorage.clear();
          await setExistingUser('');
        },
        style: 'destructive',
      },
      {text: 'Cancel', isPreferred: true},
    ]);
  };

  return (
    <View style={styles.main}>
      <Image source={Background} style={styles.background} />
      <View style={{alignItems: 'center'}}>
        {existingUser.length ? (
          <>
            <Text style={styles.text}>Hi {existingUser}, Welcome back</Text>
            <TouchableOpacity style={styles.button} onPress={onPlayNow}>
              <Text style={styles.buttonText}>Play Now</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={onScores}>
              <Text style={styles.buttonText}>Scores</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={onLogout}>
              <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Text style={styles.text}>Welcome to the game</Text>
            <TextInput
              value={newUser}
              onChangeText={setNewUser}
              placeholder="Enter player name"
              style={styles.input}
            />
            <TouchableOpacity
              style={styles.button}
              onPress={onPlayNow}
              disabled={!newUser}>
              <Text
                style={newUser ? styles.buttonText : styles.buttonTextDisabled}>
                Play Now
              </Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
  },
  button: {
    alignItems: 'center',
    backgroundColor: 'skyblue',
    padding: 10,
    width: 100,
    marginTop: 25,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  buttonTextDisabled: {
    color: 'gray',
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    margin: 12,
    padding: 10,
    width: 200,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#D3D3D3',
  },
  background: {
    width: width,
    height: height,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
