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
    tags: addTag.length === 0 ? ([]): ([`${addTag}`]),
  };

  const handleSubmit = () => {
    requestAddEntry(route.params.token, newJson)
    navigation.navigate("Calendar", {calendarId: route.params.calendarId, refresh: route.params.refresh});
    route.params.setRefresh(!route.params.refresh)
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View style={styles.background}>
      <Text style={styles.font}>{route.params.selectedDate}</Text>
      {/* <View style={styles.inputBox}> */}
      <TextInput
        autoCorrect={false}
        multiline={true}
        style={styles.schedule}
        placeholder="Add an Event"
        value={addEvent}
        onChangeText={setAddEvent}
      ></TextInput>
      <TextInput
        autoCorrect={false}
        multiline={true}
        style={styles.journal}
        placeholder="Add a Journal Entry"
        value={addEntry}
        onChangeText={setAddEntry}
      ></TextInput>
      <TextInput
          autoCorrect={false}
          autoCapitalize="none"
          multiline={true}
          style={styles.journal}
          placeholder="Add a Tag to Your Post"
          value={addTag}
          onChangeText={setAddTag}
          ></TextInput>
      {/* </View> */}
      <Button title="Add an Image" onPress={pickImage} />
      {addImage && (
        <Image 
          resizeMode="contain"
          style={styles.image}
          source={{uri: `${addImage}`}}/>
      )}
      <Pressable style={styles.submit} onPress={handleSubmit}>
        <Text style={[styles.font, {color: colors.white, fontSize: 20,}]}> Submit </Text>
      </Pressable>
    </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 200,
  },
  font: {
    fontFamily: 'nunitoBold',
    fontSize: 30,
  },
  // inputBox: {
  //   width: 400,
  //   alignItems: "center"
  // },
  journal: {
    borderWidth: 1,
    borderRadius: 3,
    height: 45,
    width: "80%",
    margin: 3,
    padding: 3,
    paddingTop: 7,
    paddingLeft: 10,
    backgroundColor: colors.white,
    fontFamily: 'nunitoReg',
    fontSize: 20,
  },
  schedule: {
    borderWidth: 1,
    borderRadius: 3,
    height: 45,
    width: "80%",
    margin: 3,
    marginTop: 50,
    padding: 3,
    paddingTop: 7,
    paddingLeft: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.white,
    fontFamily: 'nunitoReg', 
    fontSize: 20,
  },
  submit: {
    borderRadius: 3,
    width: 100,
    height: 50,
    width: 120,
    backgroundColor: colors.bright,
    color: colors.white,
    marginTop: 30,
    justifyContent: "center",
    alignItems: "center",
  },
});
