import {StyleSheet, Text, View} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {colors} from '../Utils/AppConstants';
import {useEffect, useState} from 'react';
import {IParsedUser, TwilioService} from '../Services/TwilioService';
import {Client, User} from 'twilio-chat';

export const UserProfileScreen = ({route}: {route: any}) => {
  const {username} = route.params;
  const [user, setUser] = useState<IParsedUser | {}>({});

  useEffect(() => {
    TwilioService.getInstance()
      .getChatClient()
      .then((client: Client) =>
        client
          .getUser(username)
          .then((user: User) =>
            setUser(TwilioService.getInstance().parseUser(user)),
          ),
      );
  }, [username]);

  return (
    <View style={styles.main}>
      <FontAwesome5
        name="user"
        color={colors.text}
        size={90}
        style={styles.userIcon}
      />
      <Text style={styles.userText}>{user.name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
  },
  userIcon: {
    marginTop: 70,
    marginBottom: 20,
  },
  userText: {
    color: colors.text,
    fontSize: 20,
  },
});
