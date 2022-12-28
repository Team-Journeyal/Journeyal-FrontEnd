import { View, Text, StyleSheet, TextInput, Pressable } from "react-native";
import { requestNewUser, requestLogin } from "./Requests";
import { useState } from "react";
import colors from "../colors";

export default function RegisterScreen({ navigation, route }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    requestNewUser(username, password).then(
      (response) =>
        response.data.id &&
        requestLogin(username, password).then((response) => {
          const token = response.data.auth_token;
          route.params.setAuth(token, username);
          navigation.navigate("Home", { username: username });
        })
    );
  };

  return (
    <View style={styles.background}>
      <View style={styles.header}>
        <Text style={styles.title}>Journeyal</Text>
      </View>
      <View style={styles.register}>
        <Text>Register for Journeyal</Text>
        <TextInput
          autoCorrect={false}
          autoCapitalize="none"
          placeholder="username"
          value={username}
          onChangeText={setUsername}
          style={styles.inputs}
        ></TextInput>
        <TextInput
          autoCorrect={false}
          autoCapitalize="none"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
          placeholder="password"
          style={styles.inputs}
        ></TextInput>
        <Pressable onPress={handleSubmit} style={styles.button}>
          <Text>Register</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: colors.bright,
    borderWidth: 2,
    borderColor: colors.dark,
    borderRadius: 5,
    height: 40,
    width: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    position: "absolute",
    top: 0,
    width: "100%",
    height: "15%",
    backgroundColor: colors.dark,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  inputs: {
    borderWidth: 2,
    borderColor: colors.dark,
    borderRadius: 5,
    margin: 10,
    width: 140,
    height: 25,
    padding: 3,
  },
  register: {
    height: 300,
    width: 300,
    borderWidth: 2,
    borderColor: colors.dark,
    borderRadius: 5,
    backgroundColor: colors.white,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 40,
    color: colors.white,
  },
});
