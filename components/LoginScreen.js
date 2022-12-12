import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Button,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { useState } from "react";
import Register from "./RegisterScreen.js";
import Home from "./HomeScreen.js";
import colors from "../colors.js";

export default function Login({ loggedIn, setLoggedIn }) {
  const [register, setRegister] = useState(false);

  if (register) return <Register />;

  return (
    <View style={styles.background}>
      {loggedIn ? (
        <Home />
      ) : (
        <>
          <StatusBar barStyle={"light-content"} />
          <View style={styles.header}>
            <Text style={styles.title}>Journeyal</Text>
          </View>
          <View style={styles.login}>
            <TextInput placeholder="username" style={styles.inputs}></TextInput>
            <TextInput
              secureTextEntry={true}
              placeholder="password"
              style={styles.inputs}
            ></TextInput>
            <Pressable style={styles.button} onPress={() => setLoggedIn(true)}>
              <Text>Log In</Text>
            </Pressable>
            <Button title="Register" onPress={() => setRegister(true)} />
          </View>
        </>
      )}
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
    height: "20%",
    backgroundColor: colors.dark,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  inputs: {
    borderWidth: 2,
    borderColor: colors.dark,
    borderRadius: 5,
    margin: 10,
    width: 130,
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
