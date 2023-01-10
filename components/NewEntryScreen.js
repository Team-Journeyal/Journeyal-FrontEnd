import {
  View,
  TextInput,
  Text,
  StyleSheet,
  Pressable,
  Button,
  Keyboard,
  Image,
  TouchableWithoutFeedback,
  ActivityIndicator
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
  const [tags, setTags] =useState([])
  const [loading, setLoading] = useState(false)
  const [submitOpacity, setSubmitOpacity] = useState(1)
  const [tagOpacity, setTagOpacity] = useState(1)
  const tagArray = []
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

  const handleTags = () => {
    tagArray.push(addTag)
    let addedTags = tagArray.concat(tags)
    setTags(addedTags)
    setAddTag([])
  }

  const handleSubmit = () => {
    setLoading(true)
    let formData = new FormData()
    formData.append('date', route.params.selectedDate)
    formData.append('calendar', route.params.calendarId)
    addEvent.length !== 0 && formData.append('event', addEvent)
    addEntry.length !== 0 && formData.append('entry', addEntry)
    addImage.length !== 0 && addImage.map((imgUri) => 
    formData.append('uploaded_images', {uri: imgUri, name: 'my_photo.jpg', type: 'image/jpg'}))
    tags.length !== 0 && tags.map((tag) => 
    formData.append('tags', tag))
    requestAddEntry(route.params.token, formData).then((response) => 
      {response && navigation.navigate("Calendar", {calendarId: route.params.calendarId, refresh: route.params.refresh}), setLoading(false)})
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View style={styles.background}>
      <Text style={styles.font}>{route.params.selectedDate}</Text>
      <View style={{height: 30, marginTop: 20}}>{loading && <ActivityIndicator color={colors.dark} size='large' />}</View>
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
      <View style={{flexDirection: "row", alignItems: "center"}}>
      <TextInput
          autoCorrect={false}
          autoCapitalize="none"
          multiline={true}
          style={styles.tagInput}
          placeholder="Add a Tag to Your Post"
          value={addTag}
          onChangeText={setAddTag}
          ></TextInput> 
          <Pressable style={[styles.tagAdd, {opacity: tagOpacity}]} onPress={handleTags} onPressIn={() => setTagOpacity(.5)} onPressOut={() => setTagOpacity(1)}>
            <Image style={styles.icon} source={require("../assets/plusicon.png")}/>
          </Pressable>
        </View>
      <Button title="Add an Image" onPress={pickImage} />

      {addImage.length !== 0 && 
      <View style={styles.grid}>
      {addImage.map((imgUri) => 
      <Image resizeMode= "cover" style={styles.image} source={{uri: `${imgUri}`}}/>)}
      </View>}

      {tags.length !== 0 &&
      <View style={styles.tagBox}>
        {tags.map((tag) => 
        <View style={styles.tag}>
          <Text style={styles.tagFont}>{tag}</Text>
        </View>)}
      </View>
      }

      <Pressable style={[styles.submit, {opacity: submitOpacity}]} onPress={handleSubmit} onPressIn={() => setSubmitOpacity(.5)} onPressOut={() => setSubmitOpacity(1)}>
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
    icon: {
      height: 15, 
      width: 15,
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
  tag:{
    minWidth: 60,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.background,
    borderBottomLeftRadius: 9,
    borderTopLeftRadius: 9,
    padding: 5,
    margin: 3,
    flexDirection: "row",

  },
  tagAdd: {
    borderRadius: 3, 
    height: 45,
    width:"9%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.bright,
  },
  tagBox: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  tagInput: {
    borderWidth: 1,
    borderRadius: 3,
    height: 45,
    width: "70%",
    margin: 3,
    padding: 3,
    paddingTop: 7,
    paddingLeft: 10,
    backgroundColor: colors.white,
    fontFamily: 'nunitoReg',
    fontSize: 20,
  },
  tagFont: {
    fontFamily: 'nunitoReg',
    fontSize: 15,
}
});
