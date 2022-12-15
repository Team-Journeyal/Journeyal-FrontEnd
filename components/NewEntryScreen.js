import {
  View,
  TextInput,
  Text,
  StyleSheet,
  Pressable,
  Button,
  Keyboard,
  TouchableWithoutFeedback
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import colors from "../colors";
import { data } from "../sample.json";

export default function NewEntryScreen({ route, navigation }) {
  const [addEntry, setAddEntry] = useState([]);
  const [addSchedule, setAddSchedule] = useState([]);
  const [addImage, setAddImage] = useState(null);


  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
    });
    if (result) {
      setAddImage(result.uri);
    }
  };

  let newJson = {
    date: `${route.params.selectedDate}`,
    entries: [`${addEntry}`],
    images: [`${addImage}`],
  };

  const handleSubmit = () => {
    data.push(newJson);
    navigation.navigate("Calendar");
    route.params.setRefresh(!route.params.refresh)
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View style={styles.background}>
      <TextInput
        autoCorrect={false}
        multiline={true}
        style={styles.schedule}
        placeholder="New Schedule Event"
        value={addSchedule}
        onChangeText={setAddSchedule}
      ></TextInput>
      <Button title="Add an image" onPress={pickImage} />
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
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: "center",
  },
  journal: {
    borderWidth: 1,
    borderRadius: 3,
    width: "80%",
    margin: 3,
    padding: 3,
    backgroundColor: colors.white,
    textAlign: "",
  },
  schedule: {
    borderWidth: 1,
    borderRadius: 3,
    width: "80%",
    margin: 3,
    marginTop: 50,
    padding: 3,
    backgroundColor: colors.white,
  },
  submit: {
    borderWidth: 1,
    borderRadius: 3,
    width: 100,
    height: 50,
    backgroundColor: colors.bright,
    marginTop: 30,
    justifyContent: "center",
    alignItems: "center",
  },
});
