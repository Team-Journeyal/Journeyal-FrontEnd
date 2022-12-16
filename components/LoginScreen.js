import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Button,
  StatusBar,
} from "react-native";
import colors from "../colors.js";
import { requestLogin } from "./Requests.js";

export default function LoginScreen({ navigation, route }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    requestLogin(username, password).then((response) => {
      const token = response.data.auth_token;
      console.log(token);
      route.params.setAuth(token, username);
      {
        token && navigation.navigate("Home");
      }
    });
  };
  console.log(`username: ${username}, password: ${password}`);

  return (
    <View style={styles.background}>
      <StatusBar barStyle={"light-content"} />
      <View style={styles.header}>
        <Text style={styles.title}>Journeyal</Text>
      </View>
      <View style={styles.login}>
        <TextInput
          value={username}
          placeholder="username"
          onChangeText={setUsername}
          style={styles.inputs}
        ></TextInput>
        <TextInput
          value={password}
          secureTextEntry={true}
          placeholder="password"
          onChangeText={setPassword}
          style={styles.inputs}
        ></TextInput>
        <Pressable style={styles.button} onPress={handleSubmit}>
          <Text>Log In</Text>
        </Pressable>
        <Button
          title="Register"
          onPress={() => navigation.navigate("Register")}
        />
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
  login: {
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
