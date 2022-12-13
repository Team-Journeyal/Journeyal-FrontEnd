import { View, Text, StyleSheet, TextInput, Pressable } from "react-native";
import colors from "../colors";

export default function RegisterScreen() {
  return (
    <View style={styles.background}>
      <View style={styles.header}>
        <Text style={styles.title}>Journeyal</Text>
      </View>
      <View style={styles.register}>
        <Text>Register for Journeyal</Text>
        <TextInput placeholder="username" style={styles.inputs}></TextInput>
        <TextInput
          secureTextEntry={true}
          placeholder="password"
          style={styles.inputs}
        ></TextInput>
        <Pressable style={styles.button}>
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
