import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect, useState} from 'react';
import {FlatList, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {ScoreListItem} from '../components/ScoreListItem';

export const ScoreBoardScreen = () => {
  const [scores, setScores] = useState();

  const getScores = async () => {
    const temp = await AsyncStorage.getItem('score');
    setScores(JSON.parse(temp).reverse());
  };

  useEffect(() => {
    getScores();
  }, []);

  return (
    <SafeAreaView style={styles.main}>
      <FlatList
        data={scores}
        renderItem={({item}) => <ScoreListItem score={item} />}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#87CEEB',
  },
  container: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    color: 'white',
    textAlign: 'center',
  },
});
