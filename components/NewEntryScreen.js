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
import { ImagePicker } from 'expo-image-multiple-picker'
import { useState } from "react";
import colors from "../colors";
import { requestAddEntry } from "./Requests";

export default function NewEntryScreen({ route, navigation }) {
  const [addEvent, setAddEvent] = useState([]);
  const [addEntry, setAddEntry] = useState([]);
  const [addImage, setAddImage] = useState([]);
  const [addTag, setAddTag] = useState([])
  const [pickImage, setPickImage] =useState(false)
  const [assets, setAssets] =useState([])

  const assets2 = assets.map((stuff) => stuff.filename)
  console.log(assets2)
  // const pickImage = async () => {
  //   let result = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.Images,
  //     allowsEditing: true,
  //   });
  //   if (result) {
  //     setAddImage(result.uri);
  //   }
  // };


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

  const handleSubmit2 = () => {
    let formData = new FormData();
    formData.append('date', route.params.selectedDate)
    formData.append('calendar', route.params.calendarId)
    formData.append('uploaded_images', { uri: addImage, type: 'image/jpg' })
    formData.append('entry', addEntry)
    console.log(formData)
    requestAddEntry(route.params.token, formData)
      .then(navigation.navigate("Calendar", {calendarId: route.params.calendarId, refresh: route.params.refresh}),
      route.params.setRefresh(!route.params.refresh))
      .catch(function (error) {
      })
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View style={styles.background}>
      <Text style={styles.font}>{route.params.selectedDate}</Text>
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
      <Button title="Add an image" onPress={() => setPickImage(!pickImage)} />


      {addImage && (
        <Image 
        resizeMode="contain"
        style={styles.image}
        source={{uri: `${addImage}`}}/>
        )}
      <TextInput
          autoCorrect={false}
          autoCapitalize="none"
          multiline={true}
          style={styles.journal}
          placeholder="Add a tag to your post"
          value={addTag}
          onChangeText={setAddTag}
          ></TextInput>

{pickImage &&
    <ImagePicker
    onSave={(assets) => {setAssets(assets), console.log(assets)}}
    onCancel={() => console.log('no permissions or user go back')}
    multiple
  />}
      <Pressable style={styles.submit} onPress={handleSubmit2}>
        <Text style={styles.font}> Submit </Text>
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
    fontFamily: 'timbra',
    fontSize: 35,
  },
  journal: {
    borderWidth: 1,
    borderRadius: 3,
    height: 45,
    width: "80%",
    margin: 3,
    padding: 3,
    backgroundColor: colors.white,
    fontFamily: 'patrick',
    fontSize: 25,
  },
  schedule: {
    borderWidth: 1,
    borderRadius: 3,
    height: 45,
    width: "80%",
    margin: 3,
    marginTop: 50,
    padding: 3,
    backgroundColor: colors.white,
    fontFamily: 'patrick', 
    fontSize: 25,
  },
  submit: {
    borderRadius: 3,
    width: 100,
    height: 50,
    backgroundColor: colors.bright,
    marginTop: 30,
    justifyContent: "center",
    alignItems: "center",
  },
});
