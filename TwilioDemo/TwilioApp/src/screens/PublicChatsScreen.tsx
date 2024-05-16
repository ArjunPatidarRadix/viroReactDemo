import {useEffect, useLayoutEffect, useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import {IParsedChannel, TwilioService} from '../Services/TwilioService';
import {CHAT_ROOM, colors} from '../Utils/AppConstants';
import {ChatListLoader} from '../components/ChatListLoader';
import {ChatListItem} from '../components/ChatListItem';
import Icon from 'react-native-vector-icons/AntDesign';
import {getToken} from '../Services/ApiService';
import {CreateChatModal} from '../components/CreateChatModal';
import {Client} from 'twilio-chat';

export const PublicChatsScreen = ({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) => {
  const [visible, setVisible] = useState(false);
  const [channelList, setChannelList] = useState<IParsedChannel[]>([]);
  const [loading, setLoading] = useState(true);
  const {username} = route?.params;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={styles.rightBtn}
          onPress={() => setVisible(true)}>
          <Icon name="addusergroup" size={23} color={colors.text} />
          <Text style={{color: colors.text}}>New</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const getPublicChannelDescriptors = (client: Client) => {
    client.getPublicChannelDescriptors().then(paginator => {
      console.log('paginator :: ', paginator.items);
      const suggestedChannels = TwilioService.getInstance().parseChannels(
        paginator.items,
      );
      console.log('suggestedChannels :: ', suggestedChannels);
      const finalChannelList = suggestedChannels.filter(
        (channel: IParsedChannel) => {
          if (channel.admin !== username) {
            return channel;
          }
        },
      );
      setChannelList(finalChannelList);
    });
  };

  useEffect(() => {
    let chatC: any;
    getToken(username)
      .then(token => {
        return TwilioService.getInstance().getChatClient(token);
      })
      .then(chatClient => {
        chatC = chatClient;

        return TwilioService.getInstance().addTokenListener(getToken);
      })
      .then(() => {
        return getPublicChannelDescriptors(chatC);
      })
      .then(() => {
        setLoading(false);
      })
      .catch(err => console.log('error :: ', err))
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const onJoinChannel = ({
    id,
    name,
    admin,
    type,
  }: {
    id: string;
    name: string;
    admin: string;
    type: string;
  }) => {
    TwilioService.getInstance()
      .getChatClient()
      .then((client: Client) =>
        client
          .getChannelByUniqueName(name)
          .then(channel =>
            channel.channelState.status !== 'joined' ? channel.join() : channel,
          ),
      )
      .then(() => {
        navigation.navigate(CHAT_ROOM, {
          channelId: id,
          channelName: name,
          identity: username,
          channelAdmin: admin,
          channelType: type,
        });
      });
  };

  return (
    <SafeAreaView style={styles.main}>
      {loading ? (
        <ChatListLoader />
      ) : (
        <FlatList
          data={channelList}
          renderItem={({item}) => (
            <ChatListItem
              channel={item}
              onPress={() => {
                onJoinChannel({
                  id: item.id,
                  name: item.name,
                  admin: item.admin,
                  type: item.type,
                });
              }}
            />
          )}
          numColumns={2}
        />
      )}
      {visible && (
        <CreateChatModal
          visible={visible}
          setVisible={setVisible}
          navigation={navigation}
          username={username}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  main: {
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
