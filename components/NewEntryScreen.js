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
      // allowsMultipleSelection: true,
      // selectionLimit: 4,
      // quality: 1,
    });
    if (result) {
      // console.log(result.uri)
      imgArray.push(result.uri)
      let testz = imgArray.concat(addImage)
      setAddImage(testz)
    }
    // imgArray.map((thing) => setAddImage(thing))
    
    // setAddImage(imgArray)
    // console.log(addImage)
    // return addImage
  }; 
  
  // console.log(addImage)

  const handleSubmit = () => {
    let formData = new FormData()
    formData.append('date', route.params.selectedDate)
    formData.append('calendar', route.params.calendarId)
    addEvent.length !== 0 && formData.append('event', addEvent)
    addEntry.length !== 0 && formData.append('entry', addEntry)
    addImage.length !== 0 && formData.append('uploaded_images', {uri: addImage, name:'my_photo.jpg', type: 'image/jpg'})
    addTag.length !== 0 && formData.append('tags', addTag)
    requestAddEntry(route.params.token, formData)
    navigation.navigate("Calendar", {calendarId: route.params.calendarId, refresh: route.params.refresh});
    route.params.setRefresh(!route.params.refresh)
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
      {addImage.map((thing) => 
      <Image resizeMode= "cover" style={styles.image} source={{uri: `${thing}`}}/>)}
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
