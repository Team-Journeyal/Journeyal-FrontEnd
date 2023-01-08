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
  const [addTag, setAddTag] = useState([]);
  const imgArray = []

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
    });
    if (result) {
      imgArray.push(result.uri)
      let addedImages = imgArray.concat(addImage)
      setAddImage(addedImages)
    }
  }; 

  const handleSubmit = () => {
    let formData = new FormData()
    formData.append('date', route.params.selectedDate)
    formData.append('calendar', route.params.calendarId)
    addEvent.length !== 0 && formData.append('event', addEvent)
    addEntry.length !== 0 && formData.append('entry', addEntry)
    addImage.length !== 0 && addImage.forEach((imgUri) => 
    formData.append('uploaded_images', {uri: imgUri, name: 'my_photo.jpg', type: 'image/jpg'}))
    addTag.length !== 0 && formData.append('tags', addTag)
    requestAddEntry(route.params.token, formData)
    route.params.setRefresh(!route.params.refresh)
    navigation.navigate("Calendar", {calendarId: route.params.calendarId, refresh: route.params.refresh});
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View style={styles.background}>
      <Text style={styles.font}>{route.params.selectedDate}</Text>
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

      <Button title="Add an Image" onPress={pickImage} />

      {addImage.length !== 0 && 
      <View style={styles.grid}>
      {addImage.map((imgUri) => 
      <Image resizeMode= "cover" style={styles.image} source={{uri: `${imgUri}`}}/>)}
      </View>}

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
    width: 100,
    height: 100,
    margin: 3,
  },
  font: {
    fontFamily: 'nunitoBold',
    fontSize: 30,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: 350,
    justifyContent: "center"
    },
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
