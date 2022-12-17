import { View, Text, StyleSheet, Pressable, TextInput } from "react-native";
import { useState, useEffect } from "react";
import colors from "../colors";
import { requestCalendars, requestNewCalendar } from "./Requests";

export default function HomeScreen({ navigation, route }) {
  const [calendars, setCalendars] = useState([]);
  const [calendarName, setCalendarName] = useState("")
  const [refresh, setRefresh] = useState(false)

  useEffect(() => {
    requestCalendars(route.params.token).then((response) =>
      setCalendars(response.data)
    )
  }, [route.params.token, refresh]);

  const handleSubmit = () => {
      requestNewCalendar(route.params.token, calendarName)
      setRefresh(!refresh)
      setCalendarName("")
  }

  return (
    <View style={styles.background}>
      <Text>Hello, {route.params.username}</Text>
        <Pressable 
        style={styles.button} 
        onPress={handleSubmit}>
            <Text>Add calendar</Text>
        </Pressable>
        <TextInput
            autoCorrect={false}
            autoCapitalize="none"
            value={calendarName}
            placeholder="New Calendar"
            onChangeText={setCalendarName}
            style={styles.inputs}/>
      {calendars.map((clndr, idx) => (
        <Pressable
          key={idx}
          style={styles.button}
          onPress={() => navigation.navigate("Calendar")}
        >
          <Text style={styles.text}>{clndr.name}</Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    width: 200,
    height: 50,
    backgroundColor: colors.bright,
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
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
  text: {
    color: colors.white,
  },
});
