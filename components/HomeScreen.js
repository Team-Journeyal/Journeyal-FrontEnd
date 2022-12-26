import {
  View,
  ScrollView,
  Text,
  Image,
  StyleSheet,
  Pressable,
  TextInput,
  Alert
} from "react-native";
import { useState, useEffect, useRef } from "react";
import colors from "../colors";
import {
  requestCalendars,
  requestDeleteCalendar,
  requestNewCalendar,
  requestEditCalendar
} from "./Requests";

export default function HomeScreen({ navigation, route }) {
  const [calendars, setCalendars] = useState([]);
  const [calendarName, setCalendarName] = useState("");
  const [refresh, setRefresh] = useState(true);


  useEffect(() => {
    requestCalendars(route.params.token).then((response) =>
      setCalendars(response.data)
    );
  }, [route.params.token, refresh]);

  const handleSubmit = () => {
    requestNewCalendar(route.params.token, calendarName);
    setRefresh(!refresh);
    setCalendarName("");
  };

  const handleCalendarEntries = (clndr) => {
    navigation.navigate("Calendar", { calendarId: clndr.id });
    route.params.setCalendarId(clndr.id);
    setRefresh(!refresh);

  };

  const handleCalendarDelete = (clndr) => {
    requestDeleteCalendar(route.params.token, clndr.id);
    setRefresh(!refresh);
  }

  const handleCalendarEdit = (calname, clndr) => {
    requestEditCalendar(route.params.token, calname, clndr.id),
      setRefresh(!refresh);
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
  console.log(`refresh ${refresh}`)
  return (
    <View style={styles.background}>
      <ScrollView style={{ width: "100%" }}>
        <View style={styles.container}>

          <Text>Hello, {route.params.username}</Text>
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
                  source={{ uri: "https://picsum.photos/200/300" }}
                />
                <Text style={styles.text}>{clndr.name}</Text>
              </Pressable>
              <>
                {route.params.settings === true ? (<>
                  <View style={styles.settings}>
                    <Pressable onPress={() => { handleRenameAlert(clndr) }} style={styles.edit}><Text>Edit</Text></Pressable>
                    <Pressable onPress={() => { handleDeleteAlert(clndr) }} style={styles.delete}><Text>Delete</Text></Pressable>
                  </View></>)

                  : (null)}
              </>
            </View>
          ))}
          {route.params.settings === true ? (
            <View style={styles.submitBox}>
              <TextInput
                autoCorrect={false}
                autoCapitalize="none"
                value={calendarName}
                placeholder="New Calendar"
                onChangeText={setCalendarName}
                style={styles.inputs}
              />
              <Pressable style={styles.newButton} onPress={handleSubmit}>
                <Text>Add calendar</Text>
              </Pressable>
            </View>
          ) : null}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
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
    marginBottom: 10,
  },
  submitBox: {
    alignItems: "center",
    borderWidth: 2,
    borderColor: colors.dark,
    marginBottom: 20,
  },
  text: {
    color: colors.white,
    margin: 5,
  },
});
