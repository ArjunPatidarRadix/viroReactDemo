import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { CHAT_LIST, colors } from "../Utils/AppConstants";
import Entypo from "react-native-vector-icons/Entypo";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const WelcomeScreen = ({ navigation }: { navigation: any }) => {
  const [username, setUsername] = useState("");

  const getUser = async () => {
    const user = await AsyncStorage.getItem("user");
    if (user) {
      await navigation.replace(CHAT_LIST, { username: user });
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const onLoginPress = async () => {
    if (username !== "") {
      await AsyncStorage.setItem("user", username);
      await navigation.replace(CHAT_LIST, { username });
    }
  };

  return (
    <View style={styles.main}>
      <Entypo
        name="chat"
        size={100}
        color={colors.text}
        style={{ marginBottom: 30 }}
      />
      <View style={styles.container}>
        <Text style={styles.welcomeText}>Welcome to Twilio chat</Text>
        <TextInput
          value={username}
          onChangeText={setUsername}
          placeholder="Username"
          style={styles.textbox}
          placeholderTextColor={colors.placeholder}
        />
        <TouchableOpacity
          disabled={!username}
          onPress={onLoginPress}
          style={[
            styles.button,
            !username ? styles.buttonDisabled : styles.buttonEnable,
          ]}
        >
          <Text style={styles.welcomeText}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background,
  },
  textbox: {
    width: 200,
    borderColor: colors.text,
    borderWidth: 2,
    padding: 5,
    marginVertical: 10,
    borderRadius: 5,
    color: colors.text,
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    padding: 10,
    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: colors.header,
    width: 300,
    height: 200,
    marginBottom: 50,
  },
  welcomeText: {
    color: colors.text,
    fontWeight: "bold",
    fontSize: 17,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    margin: 5,
    marginTop: 10,
  },
  buttonDisabled: {
    backgroundColor: colors.textSecondary,
  },
  buttonEnable: {
    backgroundColor: colors.secondary,
  },
});
