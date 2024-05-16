import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {CHAT_LIST, colors} from '../Utils/AppConstants';
import {MemberListItem} from '../components/MemberListItem';
import {useLayoutEffect, useState} from 'react';
import {TwilioService} from '../Services/TwilioService';
import {UserInfoModal} from '../components/UserInfoModal';
import {Channel, Client} from 'twilio-chat';

export const ChatInfo = ({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) => {
  const {members, channelName, channelAdmin, identity, channelType} =
    route.params;

  const [userInfoVisible, setUserInfoVisible] = useState(false);
  const [userInfo, setUserInfo] = useState('');

  const onListItemPress = (username: string) => {
    if (username.length) {
      setUserInfo(username);
      setUserInfoVisible(true);
    }
  };

  const leaveChannel = () => {
    TwilioService.getInstance()
      .getChatClient()
      .then((client: Client) => {
        return client.getChannelByUniqueName(channelName);
      })
      .then((channel: Channel) => {
        channel.leave();
      })
      .then(() => {
        navigation.replace(CHAT_LIST, {identity});
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  useLayoutEffect(() => {
    if (identity !== channelAdmin) {
      navigation.setOptions({
        headerRight: () => (
          <TouchableOpacity style={styles.rightBtn} onPress={leaveChannel}>
            <Text style={{color: colors.text, fontSize: 15}}>Leave</Text>
          </TouchableOpacity>
        ),
      });
    } else {
      <></>;
    }
  }, [navigation]);

  const ListHeader = () => {
    return (
      <View style={{alignItems: 'center'}}>
        <MaterialIcons name="groups" size={150} color={colors.text} />
        <Text style={styles.chatName}>{channelName}</Text>
        <View style={styles.info}>
          <Text style={styles.memberCount}>{`Created by : ${
            channelAdmin ? channelAdmin : ''
          }`}</Text>
          <Text style={styles.memberCount}>{`Chat type : ${channelType}`}</Text>
          <Text style={styles.memberCount}>
            {members?.length} {members?.length > 1 ? 'members' : 'member'}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.main}>
      <FlatList
        ListHeaderComponent={ListHeader}
        data={members}
        renderItem={({item}) => (
          <MemberListItem
            name={item.name}
            onPress={() => {
              onListItemPress(item.name);
            }}
          />
        )}
        style={{width: '100%'}}
      />
      {userInfoVisible && userInfo !== '' && (
        <UserInfoModal
          setVisible={setUserInfoVisible}
          visible={userInfoVisible}
          username={userInfo}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  chatName: {
    color: colors.text,
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  memberCount: {
    color: colors.textSecondary,
  },
  info: {
    alignItems: 'center',
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
