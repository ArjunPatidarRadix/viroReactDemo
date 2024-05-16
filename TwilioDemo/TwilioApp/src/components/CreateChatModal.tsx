import {Dispatch, SetStateAction, useState} from 'react';
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {
  CHAT_ROOM,
  PRIVATE_CHAT_CREATE_SCREEN,
  colors,
} from '../Utils/AppConstants';
import {TwilioService} from '../Services/TwilioService';
import {Client} from 'twilio-chat';

export const CreateChatModal = ({
  visible,
  setVisible,
  navigation,
  username,
}: {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
  navigation: any;
  username: string;
}) => {
  const [channelName, setChannelName] = useState('');

  const onCreateOrJoinPress = async () => {
    TwilioService.getInstance()
      .getChatClient()
      .then((client: Client) => {
        client
          .getChannelByUniqueName(channelName)
          .then(channel =>
            channel.channelState.status !== 'joined' ? channel.join() : channel,
          )
          .catch(() =>
            client
              .createChannel({
                uniqueName: channelName,
                friendlyName: channelName,
              })
              .then(channel => {
                channel.join();
                setVisible(!visible);
                const newChannel =
                  TwilioService.getInstance().parseChannel(channel);
                navigation.navigate(CHAT_ROOM, {
                  channelId: newChannel.id,
                  channelName: newChannel.name,
                  channelAdmin: newChannel.admin,
                  channelType: newChannel.type,
                  identity: username,
                });
              }),
          );
      })
      .catch((err: any) => console.log('error :: ', err));
  };

  const onCreatePrivateChatPress = () => {
    setVisible(!visible);
    navigation.navigate(PRIVATE_CHAT_CREATE_SCREEN, {
      username: username,
      nameParam: channelName,
    });
  };

  return (
    <View style={styles.main}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={visible}
        onRequestClose={() => setVisible(!visible)}
        style={styles.modalView}>
        <View style={styles.main}>
          <View style={styles.modalView}>
            <TextInput
              value={channelName}
              onChangeText={setChannelName}
              placeholder="Enter Channel name"
              style={styles.textbox}
              placeholderTextColor={colors.placeholder}
            />
            <Pressable
              style={[
                styles.button,
                !channelName ? styles.buttonDisabled : styles.buttonEnable,
              ]}
              onPress={() => onCreateOrJoinPress()}
              disabled={!channelName}>
              <Text style={styles.textStyle}>Join or Create group chat</Text>
            </Pressable>
            <Pressable
              style={[
                styles.button,
                !channelName ? styles.buttonDisabled : styles.buttonEnable,
              ]}
              onPress={() => onCreatePrivateChatPress()}
              disabled={!channelName}>
              <Text style={styles.textStyle}>Create Private Chat</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonEnable]}
              onPress={() => setVisible(!visible)}>
              <Text style={styles.textStyle}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.overlayBackground,
  },
  modalView: {
    margin: 20,
    backgroundColor: colors.header,
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    margin: 5,
  },
  buttonDisabled: {
    backgroundColor: colors.textSecondary,
  },
  buttonEnable: {
    backgroundColor: colors.secondary,
  },
  textStyle: {
    color: colors.text,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  textbox: {
    width: 200,
    borderWidth: 1,
    borderColor: colors.text,
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
    color: colors.text,
    fontSize: 15,
  },
});
