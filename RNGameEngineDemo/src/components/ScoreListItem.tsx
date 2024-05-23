import {StyleSheet, Text, View} from 'react-native';

export const ScoreListItem = ({
  score,
}: {
  score: {date: string; score: number};
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{score.date}</Text>
      <Text style={styles.text}>{score.score}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#0D6986',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderRadius: 10,
    margin: 5,
  },
  text: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
