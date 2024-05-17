import {
  FlatList,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { ChatListItem } from "../components/ChatListItem";
import {
  CHAT_ROOM,
  PUBLIC_CHATS_SCREEN,
  WELCOME_SCREEN,
  colors,
} from "../Utils/AppConstants";
import { getToken } from "../Services/ApiService";
import { IParsedChannel, TwilioService } from "../Services/TwilioService";
import { ChatListLoader } from "../components/ChatListLoader";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import { Client } from "twilio-chat";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const ChatListScreen = ({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) => {
  const { username } = route.params;
  const [list, setList] = useState<IParsedChannel[]>([]);
  const channelPaginator = useRef();
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={styles.rightBtn}
          onPress={() => navigation.navigate(PUBLIC_CHATS_SCREEN, { username })}
        >
          <MaterialIcons name="group-add" size={23} color={colors.text} />
          <Text style={styles.headerBtnText}>Join</Text>
        </TouchableOpacity>
      ),
      headerLeft: () => (
        <TouchableOpacity
          style={styles.leftBtn}
          onPress={async () => {
            await AsyncStorage.removeItem("user");
            await navigation.replace(WELCOME_SCREEN);
          }}
        >
          <SimpleLineIcons name="logout" size={23} color={colors.text} />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const getSubscribedChannels = useCallback((client: Client) => {
    client
      .getSubscribedChannels()
      .then((paginator) => {
        channelPaginator.current = paginator;
        const newChannels = TwilioService.getInstance().parseChannels(
          channelPaginator.current.items
        );
        setList(newChannels);
      })
      .catch((error) => console.log("error :: ", error));
  }, []);

  const getChannels = () => {
    setRefresh(true);
    let chatC: any;
    getToken(username)
      .then((token) => {
        return TwilioService.getInstance().getChatClient(token);
      })
      .then((chatClient) => {
        chatC = chatClient;

        return TwilioService.getInstance().addTokenListener(getToken);
      })
      .then(() => {
        return getSubscribedChannels(chatC);
      })
      .then(() => {
        setLoading(false);
        setRefresh(false);
      })
      .catch((err) => console.log("error :: ", err))
      .finally(() => {
        setLoading(false);
        setRefresh(false);
      });
  };

  useEffect(() => {
    getChannels();
    return () => TwilioService.getInstance().clientShutdown();
  }, [username, getSubscribedChannels]);

  const sortedChannels: IParsedChannel[] = useMemo(
    () =>
      list.sort(
        (channelA, channelB) =>
          channelB.lastMessageTime - channelA.lastMessageTime
      ),
    [list]
  );

  return (
    <SafeAreaView style={styles.screen}>
      {loading ? (
        <ChatListLoader />
      ) : (
        <FlatList
          data={sortedChannels}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ChatListItem
              channel={item}
              onPress={() => {
                navigation.navigate(CHAT_ROOM, {
                  channelId: item.id,
                  channelName: item.name,
                  channelAdmin: item.admin,
                  channelType: item.type,
                  identity: username,
                });
              }}
            />
          )}
          refreshControl={
            <RefreshControl
              refreshing={refresh}
              onRefresh={() => {
                getChannels();
              }}
            />
          }
          ListHeaderComponent={
            <Text style={{ color: colors.textSecondary }}>
              Swipe down to refresh
            </Text>
          }
          ListHeaderComponentStyle={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        />
      )}
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
    alignItems: "center",
    justifyContent: "center",
    marginRight: 15,
    flexDirection: "row",
    gap: 3,
  },
  leftBtn: {
    height: 24,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 5,
    flexDirection: "row",
    gap: 3,
  },
  headerBtnText: {
    color: colors.text,
  },
});
