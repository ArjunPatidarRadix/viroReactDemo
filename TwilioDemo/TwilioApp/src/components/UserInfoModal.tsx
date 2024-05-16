import {
  Dimensions,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {colors} from '../Utils/AppConstants';
import {Dispatch, SetStateAction, useEffect, useState} from 'react';
import {TwilioService} from '../Services/TwilioService';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {Client} from 'twilio-chat';

export const UserInfoModal = ({
  visible,
  setVisible,
  username,
}: {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
  username: string;
}) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    if (username.length > 0) {
      TwilioService.getInstance()
        .getChatClient()
        .then((client: Client) =>
          client
            .getUser(username)
            .then(user => setUser(TwilioService.getInstance().parseUser(user))),
        )
        .catch((error: any) => console.log('error  :: ', error));
    }
  }, [username]);
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
            <FontAwesome5
              name="user"
              color={colors.text}
              size={90}
              style={styles.userIcon}
            />
            <Text style={styles.userText}>{user.name}</Text>
            <Text style={styles.userStatus}>
              {user.online ? 'Online' : 'Offline'}
            </Text>
            <Pressable
              style={styles.button}
              onPress={() => setVisible(!visible)}>
              <Text style={styles.textStyle}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.overlayBackground,
  },
  modalView: {
    marginVertical: Dimensions.get('window').height / 2.8,
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
    backgroundColor: colors.secondary,
    marginTop: 10,
  },
  textStyle: {
    color: colors.text,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  userIcon: {
    marginBottom: 20,
  },
  userText: {
    color: colors.text,
    fontSize: 20,
  },
  userStatus: {
    color: colors.text,
    fontSize: 12,
  },
});
