import {
  View,
  TextInput,
  Text,
  StyleSheet,
  Pressable,
  Button,
  Keyboard,
  Image,
  TouchableWithoutFeedback
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import colors from "../colors";
import { data } from "../sample.json";
import { requestAddEntry } from "./Requests";

export default function NewEntryScreen({ route, navigation }) {
  const [addEvent, setAddEvent] = useState([]);
  const [addEntry, setAddEntry] = useState([]);
  const [addImage, setAddImage] = useState([]);
  const [addTag, setAddTag] = useState([])


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
    calendar: `${route.params.calendarId}`,
    date: `${route.params.selectedDate}`,
    event: `${addEvent}`,
    entry: `${addEntry}`,
    tags: `${addTag}`,
  };

  const handleSubmit = () => {
    requestAddEntry(route.params.token, newJson)
    navigation.navigate("Calendar", {calendarId: route.params.calendarId, refresh: route.params.refresh});
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
        value={addEvent}
        onChangeText={setAddEvent}
      ></TextInput>
      <TextInput
        autoCorrect={false}
        multiline={true}
        style={styles.journal}
        placeholder="New Journal Entry"
        value={addEntry}
        onChangeText={setAddEntry}
      ></TextInput>
      <Button title="Add an image" onPress={pickImage} />
      {addImage && (
        <Image 
          resizeMode="contain"
          style={styles.image}
          source={{uri: `${addImage}`}}/>
      )}
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
  image: {
    width: "100%",
    height: 200,
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
