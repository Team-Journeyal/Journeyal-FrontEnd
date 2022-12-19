import { useState } from "react";
import { View, Text, TextInput, StyleSheet, Pressable } from "react-native";
import colors from "../colors";

export default function SearchScreen() {
  const [searchString, setSearchString] = useState("");

  return (
    <View style={styles.background}>
      <TextInput
        autoCapitalize="none"
        autoCorrect={false}
        value={searchString}
        onChangeText={setSearchString}
        placeholder="Look for a memory"
        style={styles.input}
      ></TextInput>
      <Pressable style={styles.search}>
        <Text>Search</Text>
      </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  input: {
    borderWidth: 2,
    borderColor: colors.dark,
    borderRadius: 5,
    margin: 10,
    width: "80%",
    height: 30,
    padding: 3,
    backgroundColor: colors.white,
  },
  search: {
    backgroundColor: colors.bright,
    borderWidth: 2,
    borderColor: colors.dark,
    borderRadius: 5,
    height: 40,
    width: 60,
    justifyContent: "center",
    alignItems: "center",
  },
});
