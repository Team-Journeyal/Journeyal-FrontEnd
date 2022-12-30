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
  TouchableOpacity,
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
  const [editVisisble, setEditVisible] = useState(false)
  const [calId, setCalId] = useState()
  const [modalOpacity, setModalOpacity] = useState(1)


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
    formData.append('cal_image', { uri: addImage, name: 'my_photo.jpg', type: 'image/jpg' })
    requestNewCalendar(route.params.token, formData)
      .then((res) => (res && setRefresh(!refresh), setAddImage([]), setCalendarName(''), setModalOpacity(1)))
      .catch(function (error) {
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

  const handleCalendarEdit = () => {
    let formData = new FormData();
    formData.append('name', calendarName)
    formData.append('cal_image', { uri: addImage, name: 'my_photo.jpg', type: 'image/jpg' })
    requestEditCalendar(route.params.token, formData, calId)
      .then((res) => (res && setRefresh(!refresh), setAddImage([]), setCalendarName(''), setModalOpacity(1)))
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

  return (
    <View style={[styles.background, {opacity: modalOpacity}]}>
      <ScrollView style={{ width: "100%" }}>
        <View style={styles.container}>
          <Text style={styles.userFont}>Hello, {route.params.username}</Text>


          <Modal
            animationType="none"
            transparent={true}
            visible={modalVisible}>
            <TouchableOpacity  style={styles.modalBox} onPress={() => {setModalVisible(false), setModalOpacity(1)}}>
              <TouchableOpacity onPress={null} style={styles.modalThing} activeOpacity={1}>
                <Text style={styles.settingsFont}>Create a new calendar</Text>
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
                    source={{ uri: `${addImage}` }} />
                )}
                <View style={{ width: 160, flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Pressable onPress={() => { handleSubmit(); setModalVisible(!modalVisible) }} style={styles.modalButton}>
                    <Text style={styles.font}>Submit</Text>
                  </Pressable>
                  <Pressable onPress={() => { setModalVisible(!modalVisible), setModalOpacity(1)}} style={styles.modalButton}>
                    <Text style={styles.font}>Cancel</Text>
                  </Pressable>
                </View>
              </TouchableOpacity>
            </TouchableOpacity>
          </Modal>

          <Modal
            animationType="none"
            transparent={true}
            visible={editVisisble}>
            <TouchableOpacity  style={styles.modalBox} onPress={() => {setEditVisible(false), setModalOpacity(1)}}>
              <TouchableOpacity onPress={null} style={styles.modalThing} activeOpacity={1}>
                <Text style={styles.settingsFont}>Edit/Rename your calendar</Text>
                <TextInput
                  autoCorrect={false}
                  autoCapitalize="none"
                  value={calendarName}
                  defaultValue={calendarName}
                  onChangeText={setCalendarName}
                  style={styles.inputs}
                />
                <Button title="Add an image" onPress={pickImage} />
                {addImage && (
                  <Image
                    resizeMode="contain"
                    defaultSource={addImage}
                    style={styles.modalImage}
                    source={{ uri: `${addImage}` }} />
                )}
                <View style={{ width: 160, flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>
                  <Pressable onPress={() => { handleCalendarEdit(); setEditVisible(!editVisisble) }} style={styles.modalButton}>
                    <Text style={styles.font}>Submit</Text>
                  </Pressable>
                  <Pressable onPress={() => { setEditVisible(!editVisisble),  setCalendarName(''), setAddImage([]), setModalOpacity(1)}} style={styles.modalButton}>
                    <Text style={styles.font}>Cancel</Text>
                  </Pressable>
                </View>
              </TouchableOpacity>
            </TouchableOpacity>
          </Modal>




          <Pressable style={styles.add} onPress={() => {setModalVisible(!modalVisible), setModalOpacity(.4)}}><Text style={styles.addFont}>Add Calendar</Text></Pressable>

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
                  source={{ uri: clndr.cal_image }}
                />
                <Text style={styles.text}>{clndr.name}</Text>
              </Pressable>
              <View style={styles.settingsBox}>
                {route.params.settings === true ? (<>
                  <View style={styles.settings}>
                    <Pressable onPress={() => { setEditVisible(!editVisisble),  setCalId(clndr.id), setCalendarName(clndr.name), setAddImage(clndr.cal_image), setModalOpacity(.4)}} style={styles.edit}><Text style={styles.font}>Edit</Text></Pressable>
                    <Pressable onPress={() => { handleDeleteAlert(clndr) }} style={styles.delete}><Text style={styles.font}>Delete</Text></Pressable>
                  </View></>)
                  : (null)}
              </View>
            </View>
          ))}
{console.log(calendarName)}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  addFont: {
    fontFamily: 'timbra',
    fontSize: 25,
  },
  modalBox: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
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
    borderRadius: 5,
    width: 80,
    height: 20,
    backgroundColor: colors.red,
    justifyContent: 'center',
    alignItems: 'center',
    color: colors.white,
  },
  edit: {
    borderRadius: 5,
    width: 80,
    height: 20,
    backgroundColor: colors.bright,
    justifyContent: 'center',
    alignItems: 'center'
  },
  font: {
    fontFamily: 'timbra',
    fontSize: 20,
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
    height: 35,

    textAlign: "center",
    fontFamily: 'patrick',
    fontSize: 18,
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
  settingsFont: {
    fontFamily: 'timbra',
    fontSize: 25,
  },
  text: {
    color: colors.white,
    fontFamily: 'patrick',
    fontSize: 30,
    marginTop: 10,
  },
  userFont: {
    fontFamily: 'timbra',
    fontSize: 35,
    marginBottom: 10,
  }
});
