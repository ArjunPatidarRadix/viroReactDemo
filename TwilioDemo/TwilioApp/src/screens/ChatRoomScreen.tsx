import {useCallback, useEffect, useLayoutEffect, useRef, useState} from 'react';
import {SafeAreaView, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {GiftedChat, IMessage} from 'react-native-gifted-chat';
import {TwilioService} from '../Services/TwilioService';
import {CHAT_INFO_SCREEN, colors} from '../Utils/AppConstants';
import {UserInfoModal} from '../components/UserInfoModal';
import {Channel, Client} from 'twilio-chat';

export const ChatRoomScreen = ({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) => {
  const {channelId, identity, channelName, channelAdmin, channelType} =
    route.params;
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [userInfoVisible, setUserInfoVisible] = useState(false);
  const [userInfo, setUserInfo] = useState('');
  const chatClientChannel = useRef();
  const chatMessagesPaginator = useRef();
  const membersRef = useRef();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={styles.rightBtn}
          onPress={() => {
            navigation.navigate(CHAT_INFO_SCREEN, {
              members: membersRef.current,
              channelName: channelName,
              channelAdmin: channelAdmin,
              channelType: channelType,
              identity: identity,
            });
          }}>
          <Text style={{color: colors.text, fontSize: 15}}>About</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const setChannelEvents = useCallback((channel: Channel) => {
    chatClientChannel.current = channel;
    chatClientChannel?.current?.on('messageAdded', message => {
      const newMessage = TwilioService.getInstance().parseMessage(message);
      const {giftedId} = message.attributes;
      if (giftedId) {
        setMessages(prevMessages => {
          if (prevMessages.some(({_id}) => _id === giftedId)) {
            return prevMessages.map(m => (m._id === giftedId ? newMessage : m));
          }
          return [newMessage, ...prevMessages];
        });
      }
    });
    return chatClientChannel.current;
  }, []);

  useEffect(() => {
    TwilioService.getInstance()
      .getChatClient()
      .then((client: Client) => client.getChannelBySid(channelId))
      .then((channel: Channel) => setChannelEvents(channel))
      .then((currentChannel: Channel) => {
        currentChannel.getMembers().then(async members => {
          membersRef.current =
            TwilioService.getInstance().parseMembers(members);
        });
        return currentChannel.getMessages();
      })
      .then(paginator => {
        chatMessagesPaginator.current = paginator;
        const newMessages = TwilioService.getInstance().parseMessages(
          paginator.items,
        );
        setMessages(newMessages);
      })
      .catch((err: any) => console.log('error :: ', err))
      .finally(() => setLoading(false));
  }, [channelId, setChannelEvents]);

  const onSend = useCallback((newMessages: IMessage[] = []) => {
    const attributes = {giftedId: newMessages[0]._id};
    setMessages(prevMessages => GiftedChat.append(prevMessages, newMessages));
    chatClientChannel.current?.sendMessage(newMessages[0].text, attributes);
  }, []);

  const onAvatarPress = (username: string) => {
    if (username.length) {
      setUserInfo(username);
      setUserInfoVisible(true);
    }
  };
  return (
    <SafeAreaView style={styles.screen}>
      {!loading && (
        <GiftedChat
          messagesContainerStyle={{backgroundColor: colors.background}}
          renderAvatarOnTop
          user={{_id: identity, name: identity}}
          messages={messages}
          onSend={messages => onSend(messages)}
          renderUsernameOnMessage
          onPressAvatar={user => onAvatarPress(user.name)}
          showUserAvatar
        />
      )}
      <UserInfoModal
        setVisible={setUserInfoVisible}
        visible={userInfoVisible}
        username={userInfo}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  rightBtn: {
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
    flexDirection: 'row',
    gap: 3,
  },
});
