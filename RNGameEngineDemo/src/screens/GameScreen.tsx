import React, {useState} from 'react';
import {Image, StatusBar, StyleSheet, Text, View} from 'react-native';
import {GameEngine} from 'react-native-game-engine';
import {Entities} from '../entities';
import systems from '../systems';
import {GameOver} from '../components/GameOver';
import {Timer} from '../components/Timer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {WELCOME_SCREEN} from '../utils/constants';
import {height, width} from '../utils/styleSheet';

export const GameScreen = ({navigation}: {navigation: any}) => {
  const [running, setRunning] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [gameEngine, setGameEngine] = useState<GameEngine | null>(null);
  const nature = require('../assets/nature.jpg');

  const onRestart = () => {
    setGameOver(false);
    setScore(0);
    gameEngine.swap(Entities());
  };

  const onGoBack = () => {
    navigation.reset({
      index: 0,
      routes: [{name: WELCOME_SCREEN}],
    });
  };

  const saveFinalScore = async () => {
    if (gameOver) {
      console.log('save final score function called');
      const dateTime = new Date().toLocaleString();
      const previousScores = await AsyncStorage.getItem('score');
      const previousScoresArray = previousScores
        ? JSON.parse(previousScores)
        : []; // if previousScores is null, it will return an empty array
      previousScoresArray.push({date: dateTime, score: score});
      await AsyncStorage.setItem('score', JSON.stringify(previousScoresArray));
    }
  };

  return (
    <View style={styles.container}>
      <Image source={nature} style={styles.background} />
      <GameEngine
        ref={ref => setGameEngine(ref)}
        entities={Entities()}
        running={running}
        style={styles.gameContainer}
        systems={systems}
        onEvent={event => {
          if (event.type === 'gameOver') {
            setRunning(false);
            setGameOver(true);
            saveFinalScore();
          } else if (event.type === 'score') {
            setScore(score + 1);
          }
        }}>
        <StatusBar hidden={true} />
      </GameEngine>
      {running ? (
        <Text style={styles.score}>{score}</Text>
      ) : (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          {gameOver ? (
            <GameOver score={score} onRestart={onRestart} onGoback={onGoBack} />
          ) : (
            <Timer
              startGame={() => {
                setRunning(true);
              }}
            />
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  gameContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  score: {
    color: 'black',
    fontSize: 50,
    fontWeight: 'bold',
    textAlign: 'center',
    top: 100,
    fontFamily: 'crackman-regular',
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
