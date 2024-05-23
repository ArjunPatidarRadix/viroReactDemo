import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {
  GAME_SCREEN,
  SCORE_BOARD_SCREEN,
  WELCOME_SCREEN,
} from '../utils/constants';
import {WelcomeScreen} from '../screens/WelcomeScreen';
import {GameScreen} from '../screens/GameScreen';
import {ScoreBoardScreen} from '../screens/ScoreBoardScreen';

export const AppStack = () => {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name={WELCOME_SCREEN}
          component={WelcomeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={GAME_SCREEN}
          component={GameScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={SCORE_BOARD_SCREEN}
          component={ScoreBoardScreen}
          options={{
            title: 'ScoreBoard',
            headerStyle: {backgroundColor: '#87CEEB'},
            headerBackTitleStyle: {color: 'white'},
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
