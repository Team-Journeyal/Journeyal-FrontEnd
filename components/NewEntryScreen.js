import { View, TextInput, Text, StyleSheet, Pressable } from "react-native";
import { useState } from "react";
import colors from "../colors";

export default function NewEntryScreen({ selectedDate }) {
  const [addEntry, setAddEntry] = useState(null);
  const [addImage, setAddImage] = useState(null);

  //   let newJson = {
  //     datefield: `${selectedDate}`,
  //     entries: `${addEntry}`,
  //     images: `${addImage}`,
  //   };

  //   const handleSubmit = () => {
  //     data.push(newJson);
  //   };

  return (
    <View style={styles.background}>
      <TextInput
        style={styles.schedule}
        placeholder="New Schedule Event"
        value={addEntry}
        onChange={(e) => setAddEntry(e.target.value)}
      ></TextInput>
      <TextInput
        style={styles.journal}
        placeholder="New Journal Entry"
        value={addImage}
        onChange={(e) => setAddImage(e.target.value)}
      ></TextInput>
      <Pressable
        style={styles.submit}
        //   onPress={handleSubmit}
      >
        <Text> Submit </Text>
      </Pressable>
      {console.log(addEntry)}
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
    height: "40%",
    margin: 3,
    padding: 3,
    backgroundColor: colors.white,
  },
  schedule: {
    borderWidth: 1,
    borderRadius: 3,
    width: "85%",
    height: "40%",
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
