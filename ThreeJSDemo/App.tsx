/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {Nike3d} from './src/Nike3d';
import {SafeAreaView} from 'react-native';

function App(): React.JSX.Element {
  return (
    <SafeAreaView style={{flex: 1}}>
      <Nike3d />
    </SafeAreaView>
  );
}
export default App;
