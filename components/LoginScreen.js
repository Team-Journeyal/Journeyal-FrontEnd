import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  StatusBar,
  ActivityIndicator,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ImageBackground,
  Image
} from "react-native";
import colors from "../colors.js";
import { requestLogin } from "./Requests.js";

export default function LoginScreen({ navigation, route }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [invalid, setInvalid] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    setInvalid(false);
    requestLogin(username, password)
      .then((response) => {
        const token = response.data.auth_token;
        route.params.setAuth(token, username);
        { token && navigation.navigate("Home", { username: username }); }
      })
      .catch(function () {
        setInvalid(true);
        setLoading(false);
      });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ImageBackground source={require('../assets/paperBackground.jpg')} style={styles.background}>
        <View style={styles.background}>
          <StatusBar barStyle={"light-content"} />
          <Image
            style={styles.image}
            source={require('../assets/JourneyalLogo.png')} />
          <View style={styles.login}>
            {invalid === true ? (
              <>
              <Text style={styles.errorFont}>Please enter a valid</Text>
              <Text style={styles.errorFont}>username or password</Text>
              </>
            ) : null}
            <View style={{ height: 30 }}>{loading && <ActivityIndicator color={colors.dark} />}</View>
            <TextInput
              autoCorrect={false}
              autoCapitalize="none"
              value={username}
              placeholder="username"
              onChangeText={setUsername}
              style={styles.inputs}
            ></TextInput>
            <TextInput
              autoCorrect={false}
              autoCapitalize="none"
              value={password}
              secureTextEntry={true}
              placeholder="password"
              onChangeText={setPassword}
              style={styles.inputs}
            ></TextInput>
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.loginFont}>Log In</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Register");
                setInvalid(false);
                setUsername("");
                setPassword("");
              }}><Text style={styles.registerFont}>Register</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    borderColor: colors.dark,
    backgroundColor: colors.bright,
    borderRadius: 5,
    height: 40,
    width: 80,
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  errorFont: {
    fontFamily: 'nunitoReg',
    fontSize: 22,
    textAlign: 'center'
  },
  image: {
    width: 420,
    height: 200,
  },
  inputs: {
    borderColor: colors.dark,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderRadius: 5,
    margin: 10,
    width: 200,
    height: 40,
    padding: 3,
    paddingLeft: 8,
    fontFamily: 'nunitoReg',
    fontSize: 25,
  },
  login: {
    height: 380,
    width: 350,
    alignItems: "center",
  },
  loginFont: {
    fontFamily: 'nunitoBold',
    color: colors.white,
    fontSize: 20
  },
  registerFont: {
    fontFamily: 'nunitoReg',
    fontSize: 25,
    color: 'royalblue',
    marginTop: 15,
  },
});
