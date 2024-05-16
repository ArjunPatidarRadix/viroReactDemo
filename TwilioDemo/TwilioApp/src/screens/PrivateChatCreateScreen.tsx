import {useState} from 'react';
import {
  Button,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {TwilioService} from '../Services/TwilioService';
import {CHAT_ROOM, colors} from '../Utils/AppConstants';
import {Channel, Client} from 'twilio-chat';

export const PrivateChatCreateScreen = ({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) => {
  const {nameParam, username} = route.params;
  const [channelName, setChannelName] = useState(nameParam);
  const [personTwo, setPersonTwo] = useState('');

  const onCreatePrivateChat = () => {
    TwilioService.getInstance()
      .getChatClient()
      .then((client: Client) =>
        client.createChannel({
          uniqueName: channelName,
          friendlyName: channelName,
          isPrivate: true,
          type: 'private',
        }),
      )
      .then(async function (channel: Channel) {
        await channel.join();
        await channel.add(personTwo).then(() => console.log('user added'));
        const newChannel = await TwilioService.getInstance().parseChannel(
          channel,
        );
        await navigation.navigate(CHAT_ROOM, {
          channelId: newChannel.id,
          channelName: newChannel.name,
          channelAdmin: newChannel.admin,
          channelType: newChannel.type,
          identity: username,
        });
      })

      .catch((err: any) => console.log('error :: ', err));
  };
  return (
    <View style={styles.main}>
      <View style={styles.textFieldContainer}>
        <Text style={{color: colors.text}}>Chat Name : </Text>
        <TextInput
          value={channelName}
          onChangeText={setChannelName}
          style={styles.textbox}
          placeholderTextColor={colors.placeholder}
        />
      </View>
      <View style={styles.textFieldContainer}>
        <Text style={{color: colors.text}}>Username : </Text>
        <TextInput
          value={personTwo}
          onChangeText={setPersonTwo}
          style={styles.textbox}
          placeholderTextColor={colors.placeholder}
          placeholder="Enter username of another person"
        />
      </View>
      <Pressable
        disabled={!channelName || !personTwo}
        onPress={onCreatePrivateChat}
        style={[
          styles.button,
          !channelName || !personTwo
            ? styles.buttonDisabled
            : styles.buttonEnable,
        ]}>
        <Text style={styles.buttonText}>{'Create Private Chat'}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'flex-start',
    padding: 10,
  },
  textbox: {
    width: 250,
    borderColor: colors.text,
    borderWidth: 1,
    padding: 5,
    marginVertical: 10,
    borderRadius: 5,
    color: colors.text,
  },
  textFieldContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    margin: 5,
    alignItems: 'center',
  },
  buttonText: {color: colors.text, fontWeight: 'bold', fontSize: 15},
  buttonDisabled: {
    backgroundColor: colors.textSecondary,
  },
  buttonEnable: {
    backgroundColor: colors.secondary,
  },
});
