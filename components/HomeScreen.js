import {
  View,
  ScrollView,
  Text,
  Image,
  StyleSheet,
  Pressable,
  TextInput,
  Alert, 
  Modal,
  Button,
} from "react-native";
import { useState, useEffect } from "react";
import * as ImagePicker from "expo-image-picker";
import colors from "../colors";
import {
  requestCalendars,
  requestDeleteCalendar,
  requestNewCalendar,
  requestEditCalendar
} from "./Requests";

export default function HomeScreen({ navigation, route }) {
  const [calendars, setCalendars] = useState([]);
  const [refresh, setRefresh] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [calendarName, setCalendarName] = useState('');
  const [addImage, setAddImage] = useState([]);
  
  
  useEffect(() => {
    requestCalendars(route.params.token).then((response) =>
    setCalendars(response.data)
    );
  }, [refresh]);
  



  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
    });
    if (result) {
      setAddImage(result.uri);
    }
  };

  
  const handleSubmit = () => {
    let formData = new FormData();
    formData.append('name', calendarName)
    formData.append('cal_image', {uri: addImage, name: 'my_photo.jpg', type: 'image/jpg'})
    requestNewCalendar(route.params.token, formData)
    .then((res) => (res && setRefresh(!refresh), console.log(res)))
    .catch(function(error) {
      console.log(error)
      console.log(formData)
    })
  };

  const handleCalendarEntries = (clndr) => {
    navigation.navigate("Calendar", { calendarId: clndr.id });
    route.params.setCalendarId(clndr.id);
    setRefresh(!refresh);
  };

  const handleCalendarDelete = (clndr) => {
    requestDeleteCalendar(route.params.token, clndr.id)
    .then((res) => (res && setRefresh(!refresh)))
  }

  const handleCalendarEdit = (calname, clndr) => {
    requestEditCalendar(route.params.token, calname, clndr.id)
    .then((res) => (res && setRefresh(!refresh)))
  }

  const handleRenameAlert = (clndr) => {
    Alert.prompt(
      'Rename',
      `${clndr.name}`,
      (calname) => handleCalendarEdit(calname, clndr)
    )
  }

  const handleDeleteAlert = (clndr) => {
    console.log(clndr.id)
    Alert.alert(
      'Delete',
      'Are you sure?',
      [{
        text: 'Yes',
        onPress: () => handleCalendarDelete(clndr)
      }, {
        text: 'Cancel',
        style: 'cancel'
      }]
    )
  }


  console.log(refresh)
  return (
    <View style={styles.background}>
      <ScrollView style={{ width: "100%" }}>
        <View style={styles.container}>
          <Text>Hello, {route.params.username}</Text>


          <Modal
          animationType="none"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {Alert.alert("Modal closed"); setModalVisible(!modalVisible)}}
          >
            <View style={styles.modalBox}>
              <View style={styles.modalThing}>
                <Text>Create a new calendar</Text>
              <TextInput
                autoCorrect={false}
                autoCapitalize="none"
                value={calendarName}
                placeholder="New Calendar"
                onChangeText={setCalendarName}
                style={styles.inputs}
              />
              <Button title="Add an image" onPress={pickImage} />
              {addImage && (
              <Image 
              resizeMode="contain"
              style={styles.modalImage}
              source={{uri: `${addImage}`}}/>
              )}
              <Pressable onPress={() => {handleSubmit(); setModalVisible(!modalVisible)}} style={styles.modalButton}>
                <Text>Submit</Text>
                </Pressable>
              </View>
              </View>
              </Modal>
          
          
          <Pressable style={styles.add} onPress={() => setModalVisible(!modalVisible)}><Text>Add Calendar</Text></Pressable>
          
          {calendars.map((clndr, idx) => (
            <View key={idx}>
              <Pressable
                style={styles.button}
                onPress={() => {
                  handleCalendarEntries(clndr);
                }}
              >

                <Image
                  style={styles.image}
                  source={{ uri: clndr.cal_image}}
                />
                <Text style={styles.text}>{clndr.name}</Text>
              </Pressable>
              <View style={styles.settingsBox}>
                {route.params.settings === true ? (<>
                  <View style={styles.settings}>
                    <Pressable onPress={() => { handleRenameAlert(clndr) }} style={styles.edit}><Text>Edit</Text></Pressable>
                    <Pressable onPress={() => { handleDeleteAlert(clndr) }} style={styles.delete}><Text>Delete</Text></Pressable>
                  </View></>)
                  : (null)}
              </View>
            </View>
          ))}

        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  modalBox: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalThing: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalButton: {
    borderRadius: 20,
    padding: 10,
    elevation: 2, 
    backgroundColor: "green"
  },
  modalImage: {
    height: 100,
    width: 100,
  },
  add: {
    borderWidth: 1,
    borderRadius: 5,
    width: 180,
    height: 50,
    backgroundColor: "gold",
    justifyContent: 'center',
    alignItems: 'center'
  },
  addBox: {
    alignItems: "center",
    marginTop: 50,
  },
  background: {
    flex: 1,
    backgroundColor: colors.background,
  },
  button: {
    width: 350,
    height: 250,
    backgroundColor: colors.bright,
    alignItems: "center",
    justifyContent: "flex-end",
    margin: 10,
    padding: 10,
  },
  container: {
    alignItems: "center",
    marginTop: 25,

  },
  delete: {
    borderWidth: 1,
    borderRadius: 5,
    width: 80,
    height: 20,
    backgroundColor: colors.red,
    justifyContent: 'center',
    alignItems: 'center',
    color: colors.white,
  },
  edit: {
    borderWidth: 1,
    borderRadius: 5,
    width: 80,
    height: 20,
    backgroundColor: colors.bright,
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    height: "80%",
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
  },
  inputs: {
    borderWidth: 2,
    borderColor: colors.dark,
    borderRadius: 5,
    margin: 10,
    width: 200,
    height: 25,
    padding: 3,
    textAlign: "center",
  },
  newButton: {
    width: 350,
    height: 50,
    backgroundColor: colors.bright,
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
    padding: 10,
  },
  settings: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',

  },
  settingsBox: {
    height: 30,
    justifyContent: "center",
  },
  text: {
    color: colors.white,
    margin: 5,
  },
});
