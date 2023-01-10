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
  ActivityIndicator
} from "react-native";
import { useState, useEffect } from "react";
import * as ImagePicker from "expo-image-picker";
import colors from "../colors";
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
  const [selectedUser, setSelectedUser] = useState();
  const [selectedUserId, setSelectedUserId] = useState();
  const [addUsers, setAddUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const userIds = [];

  useEffect(() => {
    requestCalendars(route.params.token).then((response) =>
      (response && setCalendars(response.data), setLoading(false))
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

  const handleUserIds = (clndr) => {
    {clndr.length !== 0 ? (
      clndr.map((thing) => {
        userIds.push(thing.id)
        setAddUsers(userIds)
      })
    ) : (setAddUsers([]))}}

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
      .then((res) => (setUserResults(res.data)))
  }

  const handleAddUser = () => {
    requestAddUser(route.params.token, calId, addUsers)
      .then((res) => (res && setRefresh(!refresh), setSearchString(""), setUserResults([]), setSelectedUser(), setSearchVisible(false), setModalOpacity(1)))
  }

  return (
    <View style={[styles.background, { opacity: modalOpacity }]}>
      <ScrollView style={{ width: "100%" }}>
        <View style={styles.container}>
          <Text style={styles.userFont}>Hello {route.params.username}</Text>


          <Modal
            animationType="none"
            transparent={true}
            visible={modalVisible}>
            <TouchableOpacity style={styles.modalScreen} onPress={() => { setModalVisible(false), setModalOpacity(1) }}>
              <TouchableOpacity onPress={null} style={styles.modalBox} activeOpacity={1}>
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
                  <TouchableOpacity onPress={() => { handleSubmit(); setModalVisible(!modalVisible) }} style={styles.modalButton}>
                    <Text style={styles.font}>Submit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => { setModalVisible(!modalVisible), setModalOpacity(1) }} style={[styles.modalButton, { backgroundColor: '#747474'}]}>
                    <Text style={styles.font}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            </TouchableOpacity>
          </Modal>

          <Modal
            animationType="none"
            transparent={true}
            visible={editVisisble}>
            <TouchableOpacity style={styles.modalScreen} onPress={() => { setEditVisible(false), setModalOpacity(1), setCalendarName(''), setAddImage([]) }}>
              <TouchableOpacity onPress={null} style={styles.modalBox} activeOpacity={1}>
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
                  <TouchableOpacity onPress={() => { handleCalendarEdit(); setEditVisible(!editVisisble) }} 
                  style={styles.modalButton}>
                    <Text style={styles.font}>Submit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => {
                    setEditVisible(!editVisisble),
                      setCalendarName(''),
                      setAddImage([]),
                      setModalOpacity(1)
                  }}
                    style={[styles.modalButton, { backgroundColor: '#747474' }]}>
                    <Text style={styles.font}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            </TouchableOpacity>
          </Modal>


          <Modal
            animationType="none"
            transparent={true}
            visible={searchVisible}>
            <TouchableOpacity style={styles.modalScreen} onPress={() => { setSearchVisible(false), setSearchString([]), setUserResults([]), setSelectedUser(), setModalOpacity(1)}}>
              <TouchableOpacity onPress={null} style={styles.modalBox} activeOpacity={1}>
                <Text style={styles.settingsFont}>Search for a user</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <TextInput
                    autoCorrect={false}
                    autoCapitalize="none"
                    value={searchString}
                    onChangeText={setSearchString}
                    style={styles.inputs} />
                  <TouchableOpacity onPress={() => handleUserSearch()}><Image style={styles.icon} source={require("../assets/searchiconblack.png")}/></TouchableOpacity>
                </View>
                <View style={{ alignItems: 'center' }}>
                  {userResults.map((users) =>
                    <TouchableOpacity onPress={() => {setSelectedUser(users.username), setSelectedUserId(users.id)}}>
                      <Text style={{ fontSize: 20 }}>{users.username}</Text></TouchableOpacity>)}
                </View>

                {selectedUser ? (<TouchableOpacity onPress={() => {addUsers.push(selectedUserId), handleAddUser()}}
                style={styles.searchButton}><Text style={styles.addUserFont}>Add {selectedUser}</Text></TouchableOpacity>) : (null)}

              </TouchableOpacity>
            </TouchableOpacity>
          </Modal>



          <TouchableOpacity style={styles.add} onPress={() => {setModalVisible(!modalVisible), setModalOpacity(0.7)}}>
            <Text style={styles.addFont}>Add Journeyal</Text>
          </TouchableOpacity>
          {loading && <View style={{marginTop: 40}}><ActivityIndicator color={colors.dark} size='large' /></View>}
          {calendars.map((clndr, idx) => (
            <View key={idx}>
              <Pressable
                style={styles.journeyalContainer}
                onPress={() => {
                  handleCalendarEntries(clndr);
                }}>
                <Image
                  style={styles.image}
                  source={{ uri: clndr.cal_image }}
                />
                <Text style={styles.text}>{clndr.name}</Text>
                <Text style={{fontSize: 20, color: colors.white}}>⎯⎯⎯⎯⎯</Text>
                <View style={styles.edit}>
                  <View style={styles.downArrow}>
                    <TouchableOpacity style={styles.arrowButton} onPress={() => {setCalId(clndr.id), handleUserIds(clndr.users)}}>
                      {calId !== clndr.id ? (
                      <Text style={{ fontSize: 30, color: colors.white, margin: -13, }}>⌄</Text>
                      ) : (null)}
                    </TouchableOpacity>
                  </View>
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
                        marginBottom: 15,
                      }}>
                        <TouchableOpacity onPress={() => {
                          setEditVisible(!editVisisble),
                            setCalId(clndr.id),
                            setCalendarName(clndr.name),
                            setAddImage(clndr.cal_image),
                            setModalOpacity(0.7)
                        }}
                          style={styles.modalEdit}>
                          <Text style={styles.font}>Edit</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => { setSearchVisible(true), setModalOpacity(0.7)}} style={[styles.modalAdd, { width: 100 }]}>
                          <Text style={styles.font}>Add User</Text>
                        </TouchableOpacity>


                        <TouchableOpacity onPress={() => { handleDeleteAlert(clndr)}} 
                        style={styles.modalDelete}>
                          <Text style={styles.font}>Delete</Text>
                        </TouchableOpacity>

                      </View>
                      <View style={{padding: 5,}}>
                        <Text style={styles.userList}>⎯⎯ Journeyalists ⎯⎯</Text>
                        <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap'}}>
                        <View style={{margin: 5, padding: 5}}><Text style={styles.font}>{clndr.owner}</Text></View>
                        {clndr.users.map((usr) => <View style={{margin: 5, padding: 5}}><Text style={styles.font}>{usr.username}</Text></View>)}
                        </View>
                      </View>
                      <TouchableOpacity style={{alignItems: "center"}} onPress={() => {setCalId(null)}}>
                        <Text style={{ fontSize: 20, color: colors.white }}>⌃</Text>
                      </TouchableOpacity>

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
    fontFamily: 'nunitoBold',
    fontSize: 20,
    color: colors.white,
  },
  searchButton: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    backgroundColor: colors.bright,
    width: 150,
    alignItems: 'center',
    marginTop: 10,
  },
  modalScreen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalBox: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    width: 360,
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
  modalEdit: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    backgroundColor: "#2a6f97",
    width: 70,
    alignItems: 'center'
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
  arrowButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  downArrow: {
    width: 350,
    height: 25,
  },
  add: {
    borderRadius: 5,
    width: 180,
    height: 50,
    backgroundColor: colors.bright,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addBox: {
    alignItems: "center",
    marginTop: 50,
  },
  addUserFont: {
    fontFamily: 'nunitoBold',
    fontSize: 20,
    color: colors.white
  },
  background: {
    flex: 1,
  },
  journeyalContainer: {
    width: 350,
    height: 320,
    borderRadius: 10,
    backgroundColor: colors.dark,
    alignItems: "center",
    justifyContent: "space-evenly",
    margin: 10,
    padding: 15,
    
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
    fontFamily: 'nunitoBold',
    fontSize: 15,
    color: colors.white
  },
  icon: {
    height: 25, 
    width: 25,
  },
  image: {
    height: "80%",
    width: "95%",
    marginTop: 15,
  },
  info: {
    backgroundColor: colors.dark,
    width: 350,
    margin: 10,
    marginTop: -25,
    padding: 10,
    borderRadius: 10,
  },
  inputs: {
    borderWidth: 2,
    borderColor: colors.dark,
    borderRadius: 5,
    margin: 10,
    width: 200,
    height: 35,
    textAlign: "center",
    fontFamily: 'nunitoReg',
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
    fontFamily: 'nunitoReg',
    fontSize: 25,
  },
  text: {
    color: colors.white,
    fontFamily: 'nunitoBold',
    fontSize: 30,
    textAlign: "center",
    paddingTop: 20,
    marginBottom: 10,
  },
  userFont: {
    fontFamily: 'nunitoReg',
    fontSize: 35,
    marginBottom: 10,
  },
  userList: {
    textAlign: "center",
    fontFamily: 'nunitoReg',
    fontSize: 20,
    color: colors.white
  },
  words: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
});
