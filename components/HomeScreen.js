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
  Vibration,
} from "react-native";
import { useState, useEffect } from "react";
import * as ImagePicker from "expo-image-picker";
import colors from "../colors";
import CalendarInfo from './CalendarInfo.js'
import {
  requestCalendars,
  requestDeleteCalendar,
  requestNewCalendar,
  requestEditCalendar,
  requestUserSearch,
  requestAddUser
} from "./Requests";

export default function HomeScreen({ navigation, route }) {
  const [calendars, setCalendars] = useState([]);
  const [refresh, setRefresh] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [editVisisble, setEditVisible] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false)
  const [calendarName, setCalendarName] = useState('');
  const [addImage, setAddImage] = useState([]);
  const [calId, setCalId] = useState();
  const [modalOpacity, setModalOpacity] = useState(1);
  const [searchString, setSearchString] = useState("");
  const [userResults, setUserResults] = useState([]);
  const [selectedUser, setSelectedUser] = useState()
  const [selectedUserId, setSelectedUserId] = useState()


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

  const handleDeleteAlert = (clndr) => {
    Vibration.vibrate()
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
  };

  const handleCalendarDelete = () => {
    requestDeleteCalendar(route.params.token, calId)
      .then((res) => (res && setRefresh(!refresh), setModalOpacity(1)))
  };

  const handleCalendarEdit = () => {
    let formData = new FormData();
    formData.append('name', calendarName)
    formData.append('cal_image', { uri: addImage, name: 'my_photo.jpg', type: 'image/jpg' })
    requestEditCalendar(route.params.token, formData, calId)
      .then((res) => (res && setRefresh(!refresh), setAddImage([]), setCalendarName(''), setModalOpacity(1)))
  };

  const handleUserSearch = () => {
    requestUserSearch(route.params.token, searchString)
      .then((res) => (setUserResults(res.data), setModalOpacity(1)))
  }

  const handleAddUser = () => {
    console.log(calId, selectedUserId)
    requestAddUser(route.params.token, calId, selectedUserId)
      .then((res) => (console.log(res)))
  }


  return (
    <View style={[styles.background, { opacity: modalOpacity }]}>
      <ScrollView style={{ width: "100%" }}>
        <View style={styles.container}>
          <Text style={styles.userFont}>Hello, {route.params.username}</Text>


          <Modal
            animationType="none"
            transparent={true}
            visible={modalVisible}>
            <TouchableOpacity style={styles.modalBox} onPress={() => { setModalVisible(false), setModalOpacity(1) }}>
              <TouchableOpacity onPress={null} style={styles.modalThing} activeOpacity={1}>
                <Text style={styles.settingsFont}>Create a new Journeyal</Text>
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
                <View style={{ width: 200, flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Pressable onPress={() => { handleSubmit(); setModalVisible(!modalVisible) }} style={styles.modalButton}>
                    <Text style={styles.font}>Submit</Text>
                  </Pressable>
                  <Pressable onPress={() => { setModalVisible(!modalVisible), setModalOpacity(1) }} style={[styles.modalButton, { backgroundColor: 'silver' }]}>
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
            <TouchableOpacity style={styles.modalBox} onPress={() => { setEditVisible(false), setModalOpacity(1) }}>
              <TouchableOpacity onPress={null} style={styles.modalThing} activeOpacity={1}>
                <Text style={styles.settingsFont}>Edit your Journeyal</Text>
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
                  <Pressable onPress={() => {
                    setEditVisible(!editVisisble),
                      setCalendarName(''),
                      setAddImage([]),
                      setModalOpacity(1)
                  }}
                    style={[styles.modalButton, { backgroundColor: 'silver' }]}>
                    <Text style={styles.font}>Cancel</Text>
                  </Pressable>
                </View>
              </TouchableOpacity>
            </TouchableOpacity>
          </Modal>


          <Modal
            animationType="none"
            transparent={true}
            visible={searchVisible}>
            <TouchableOpacity style={styles.modalBox} onPress={() => { setSearchVisible(false), setSearchString([]), setUserResults([]), setSelectedUser(), setModalOpacity(1) }}>
              <TouchableOpacity onPress={null} style={styles.modalThing} activeOpacity={1}>
                <Text style={styles.settingsFont}>Search for a user</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <TextInput
                    autoCorrect={false}
                    autoCapitalize="none"
                    value={searchString}
                    onChangeText={setSearchString}
                    style={styles.inputs} />
                  <Pressable onPress={() => handleUserSearch()} ><Text style={{ fontSize: 25 }}>🔎</Text></Pressable>
                </View>
                <View style={{ alignItems: 'center' }}>
                  {userResults.map((users) =>
                    <Pressable onPress={() => {setSelectedUser(users.username), setSelectedUserId(users.id)}}>
                      {console.log(userResults)}
                      <Text style={{ fontSize: 25 }}>{users.username}</Text></Pressable>)}
                </View>

                {selectedUser ? (<Pressable onPress={() => handleAddUser()}
                style={styles.searchButton}><Text>Add {selectedUser}</Text></Pressable>) : (null)}

              </TouchableOpacity>
            </TouchableOpacity>
          </Modal>



          <Pressable style={styles.add} onPress={() => {
            setModalVisible(!modalVisible),
              setModalOpacity(.4)
          }}>
            <Text style={styles.addFont}>Add Journeyal</Text>
          </Pressable>

          {calendars.map((clndr, idx) => (
            <View key={idx}>
              <Pressable
                style={styles.button}
                onPress={() => {
                  handleCalendarEntries(clndr);
                }}>
                <Image
                  style={styles.image}
                  source={{ uri: clndr.cal_image }}
                />
                <Text style={styles.text}>{clndr.name}</Text>
                <View style={styles.edit}>
                  <CalendarInfo clndr={clndr} calId={calId} setCalId={setCalId} />
                </View>
              </Pressable>

              <View>
                {calId === clndr.id ?
                  (
                    <View style={styles.info}>
                      <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-evenly',
                        alignItems: 'center',
                      }}>
                        <Pressable onPress={() => {
                          setEditVisible(!editVisisble),
                            setCalId(clndr.id),
                            setCalendarName(clndr.name),
                            setAddImage(clndr.cal_image),
                            setModalOpacity(.4)
                        }}
                          style={styles.modalAdd}>
                          <Text style={styles.font}>Edit</Text>
                        </Pressable>

                        <Pressable onPress={() => { setSearchVisible(true) }} style={[styles.modalAdd, { width: 100 }]}>
                          <Text style={styles.font}>Add User</Text>
                        </Pressable>

                        <Pressable onPress={() => { handleDeleteAlert(clndr), console.log(clndr) }} style={styles.modalDelete}>
                          <Text style={styles.font}>Delete</Text>
                        </Pressable>

                      </View>
                      <View style={{ paddingTop: 5 }}>
                        <Text style={styles.font}>{clndr.name} Users</Text>
                        <Text style={styles.font}>~{clndr.owner}</Text>
                        <Text style={styles.font}>~{clndr.users}</Text>
                      </View>
                    </View>) : (null)}
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  addFont: {
    fontFamily: 'timbra',
    fontSize: 25,
    color: colors.white,
  },
  searchButton: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    backgroundColor: colors.bright,
    width: 150,
    alignItems: 'center'
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
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    backgroundColor: colors.bright,
  },
  modalAdd: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    backgroundColor: colors.bright,
    width: 70,
    alignItems: 'center'
  },
  modalDelete: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    backgroundColor: colors.red,
    width: 70,
    alignItems: 'center'
  },
  modalImage: {
    height: 200,
    width: 200,
  },
  add: {
    borderRadius: 5,
    width: 180,
    height: 50,
    backgroundColor: colors.bright,
    justifyContent: 'center',
    alignItems: 'center'
  },
  addBox: {
    alignItems: "center",
    marginTop: 50,
  },
  background: {
    flex: 1,
  },
  button: {
    width: 350,
    height: 250,
    backgroundColor: colors.dark,
    alignItems: "center",
    justifyContent: "space-evenly",
    margin: 10,
    padding: 10,
  },
  container: {
    alignItems: "center",
    marginTop: 25,
    marginBottom: 50,
  },
  edit: {
    borderRadius: 5,
    width: 60,
    height: 20,
    alignItems: 'center',
  },
  font: {
    fontFamily: 'timbra',
    fontSize: 20,
    color: colors.white
  },
  image: {
    height: "80%",
    width: "90%",
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
    borderWidth: 1,

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
    textAlign: "center"
  },
  userFont: {
    fontFamily: 'timbra',
    fontSize: 35,
    marginBottom: 10,
  },
  words: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  info: {
    backgroundColor: colors.dark,
    width: 350,
    margin: 10,
    marginTop: -10,
    padding: 10,
  }
});
