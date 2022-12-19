import { View, ScrollView, Text, Image, StyleSheet, Pressable, TextInput } from "react-native";
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
    <ScrollView style={{width: "100%"}}>
    <View style={styles.container}>
      <Text>Hello, {route.params.username}</Text>
      {calendars.map((clndr, idx) => (
        <Pressable
          key={idx}
          style={styles.button}
          onPress={() => navigation.navigate("Calendar")}
        >
          <Image style= {styles.image} source={{uri: "https://picsum.photos/200/300"}}/>
          <Text style={styles.text}>{clndr.name}</Text>
        </Pressable>
      ))}
      <View style={styles.submitBox}>
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
