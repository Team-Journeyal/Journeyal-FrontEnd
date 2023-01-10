import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  ImageBackground,
  Image,
  ActivityIndicator,
  Keyboard,
  TouchableWithoutFeedback
} from "react-native";
import { requestNewUser, requestLogin } from "./Requests";
import { useState } from "react";
import colors from "../colors";

export default function RegisterScreen({ navigation, route }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false)
  const [registerOpacity, setRegisterOpacity] = useState(1)

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true)
    requestNewUser(username, password).then(
      (response) =>
        response.data.id &&
        requestLogin(username, password).then((response) => {
          const token = response.data.auth_token;
          route.params.setAuth(token, username);
          navigation.navigate("Home", { username: username });
        })
    ).catch(function () {
      setLoading(false)
    });;
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ImageBackground source={require('../assets/kiwihug-zGZYQQVmXw0-unsplash.jpg')} style={styles.background}>
        <View style={styles.background}>
          <Image
            style={styles.image}
            source={require('../assets/JourneyalLogo.png')} />
          <View style={styles.register}>
            <View style={{ height: 30 }}>{loading && <ActivityIndicator color={colors.dark} />}</View>
            <Text style={styles.msgFont}>Register for Journeyal</Text>
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
            <Pressable onPress={handleSubmit} style={[styles.button, {opacity: registerOpacity}]} onPressIn={() => setRegisterOpacity(.5)} onPressOut={() => setRegisterOpacity(1)}>
              <Text style={styles.registerFont}>Register</Text>
            </Pressable>
          </View>
        </View>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: colors.bright,
    borderRadius: 5,
    height: 40,
    width: 100,
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 190,
  },
  inputs: {
    borderWidth: 1,
    borderColor: colors.dark,
    backgroundColor: colors.white,
    borderRadius: 5,
    margin: 10,
    width: 200,
    height: 40,
    padding: 3,
    fontFamily: 'nunitoReg',
    fontSize: 25,
  },
  image: {
    width: 420,
    height: 200,
  },
  msgFont: {
    fontFamily: 'nunitoReg',
    fontSize: 22,
    textAlign: 'center'
  },
  register: {
    height: 380,
    width: 350,
    justifyContent: "center",
    alignItems: "center",
  },
  registerFont: {
    fontFamily: 'nunitoBold',
    fontSize: 20,
    color: colors.white
  },
});
