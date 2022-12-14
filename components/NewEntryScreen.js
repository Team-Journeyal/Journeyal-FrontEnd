import { View, TextInput, Text, StyleSheet, Pressable } from "react-native";
import { useState } from "react";
import colors from "../colors";
import { data } from "../sample.json";

export default function NewEntryScreen({ route }) {
  const [addEntry, setAddEntry] = useState(null);
  const [addSchedule, setAddSchedule] = useState(null);
  const [addImage, setAddImage] = useState(null);

  let newJson = {
    date: "2022-12-11",
    entries: [`${addEntry}`],
    images: [`${addImage}`],
  };
  const handleSubmit = () => {
    data.push(newJson);
    console.log(newJson);
    console.log(data);
  };
  console.log(route.params.paramkey);
  return (
    <View style={styles.background}>
      <TextInput
        autoCorrect={false}
        multiline={true}
        style={styles.schedule}
        placeholder="New Schedule Event"
        value={addSchedule}
        onChangeText={setAddSchedule}
      ></TextInput>
      <TextInput
        autoCorrect={false}
        multiline={true}
        style={styles.journal}
        placeholder="New Journal Entry"
        value={addEntry}
        onChangeText={setAddEntry}
      ></TextInput>
      <Pressable style={styles.submit} onPress={handleSubmit}>
        <Text> Submit </Text>
      </Pressable>
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
  journal: {
    borderWidth: 1,
    borderRadius: 3,
    width: "85%",
    height: "60%",
    margin: 3,
    padding: 3,
    backgroundColor: colors.white,
    textAlign: "",
  },
  schedule: {
    borderWidth: 1,
    borderRadius: 3,
    width: "85%",
    height: "20%",
    margin: 3,
    padding: 3,
    backgroundColor: colors.white,
  },
  submit: {
    borderWidth: 1,
    borderRadius: 3,
    width: 100,
    height: 50,
    backgroundColor: colors.bright,
    justifyContent: "center",
    alignItems: "center",
  },
});
