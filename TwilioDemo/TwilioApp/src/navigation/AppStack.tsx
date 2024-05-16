import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {
  CHAT_INFO_SCREEN,
  CHAT_LIST,
  CHAT_ROOM,
  PRIVATE_CHAT_CREATE_SCREEN,
  PUBLIC_CHATS_SCREEN,
  USER_PROFILE_SCREEN,
  WELCOME_SCREEN,
  colors,
} from '../Utils/AppConstants';
import {WelcomeScreen} from '../screens/WelcomeScreen';
import {PublicChatsScreen} from '../screens/PublicChatsScreen';
import {ChatListScreen} from '../screens/ChatListScreen';
import {ChatRoomScreen} from '../screens/ChatRoomScreen';
import {PrivateChatCreateScreen} from '../screens/PrivateChatCreateScreen';
import {ChatInfo} from '../screens/ChatInfoScreen';
import {UserProfileScreen} from '../screens/UserProfileScreen';

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
          name={PUBLIC_CHATS_SCREEN}
          component={PublicChatsScreen}
          options={{
            headerTitle: 'Public Chats',
            headerTitleStyle: {color: 'white'},
            headerStyle: {backgroundColor: colors.header},
            headerBackTitleStyle: {color: 'white'},
            headerBackTitle: 'Chats',
          }}
        />
        <Stack.Screen
          name={CHAT_ROOM}
          component={ChatRoomScreen}
          options={({route}) => ({
            title: route.params.channelName,
            headerTitleStyle: {color: 'white'},
            headerStyle: {backgroundColor: colors.header},
            headerBackTitleStyle: {color: 'white'},
          })}
        />

        <Stack.Screen
          name={PRIVATE_CHAT_CREATE_SCREEN}
          component={PrivateChatCreateScreen}
          options={{
            headerTitle: 'New Private Chat',
            headerTitleStyle: {color: 'white'},
            headerStyle: {backgroundColor: colors.header},
            headerBackTitleStyle: {color: 'white'},
          }}
        />

        <Stack.Screen
          name={CHAT_INFO_SCREEN}
          component={ChatInfo}
          options={{
            headerTitle: 'About',
            headerTitleStyle: {color: 'white'},
            headerStyle: {backgroundColor: colors.header},
            headerBackTitleStyle: {color: 'white'},
          }}
        />

        <Stack.Screen
          name={USER_PROFILE_SCREEN}
          component={UserProfileScreen}
          options={({route}) => ({
            title: route.params.username,
            headerTitleStyle: {color: 'white'},
            headerStyle: {backgroundColor: colors.header},
            headerBackTitleStyle: {color: 'white'},
          })}
        />

        <Stack.Screen
          name={CHAT_LIST}
          component={ChatListScreen}
          options={{
            headerTitle: 'Chats',
            headerTitleStyle: {color: colors.text},
            headerStyle: {backgroundColor: colors.header},
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
