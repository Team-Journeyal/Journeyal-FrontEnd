import {
  View,
  ScrollView,
  Text,
  Image,
  StyleSheet,
  Pressable,
  TextInput,
} from "react-native";
import { useState, useEffect } from "react";
import colors from "../colors";
import {
  requestCalendars,
  requestDeleteCalendar,
  requestNewCalendar,
} from "./Requests";

export default function HomeScreen({ navigation, route }) {
  const [calendars, setCalendars] = useState([]);
  const [calendarName, setCalendarName] = useState("");
  const [refresh, setRefresh] = useState(false);


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
    route.params.setCalendarId(clndr.id)
  };

  const handleCalendarDelete = () => {
    requestDeleteCalendar(route.params.token, clnd.id);
    setRefresh(!refresh);
  }

  return (
    <View style={styles.background}>
      <ScrollView style={{ width: "100%" }}>
        <View style={styles.container}>
          <Text>Hello, {route.params.username}</Text>
          {calendars.map((clndr, idx) => (
            <View>
            <Pressable
              key={idx}
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
              {route.params.settings === true ? ( <>
            <View style={styles.settings}>
              <Pressable style={styles.edit}><Text>Edit</Text></Pressable>
              <Pressable onPress={handleCalendarDelete} style={styles.delete}><Text>Delete</Text></Pressable>
            </View></>)
          
            : (null)}
            </>
            </View>
          ))}
          <View style={styles.submitBox}>
            <Pressable style={styles.button} onPress={handleSubmit}>
              <Text>Add calendar</Text>
            </Pressable>
            <TextInput
              autoCorrect={false}
              autoCapitalize="none"
              value={calendarName}
              placeholder="New Calendar"
              onChangeText={setCalendarName}
              style={styles.inputs}
            />
          </View>
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
    marginTop: 50,
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
    width: 140,
    height: 25,
    padding: 3,
  },
  settings: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  submitBox: {
    alignItems: "center",
    borderWidth: 2,
    borderColor: colors.dark,
  },
  text: {
    color: colors.white,
    margin: 5,
  },
});
