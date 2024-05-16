import React from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';

export const ChatListLoader = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    height: 40,
    borderRadius: 10,
    marginBottom: 10,
  },
});
