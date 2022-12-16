import { View, Text, StyleSheet, Pressable } from "react-native";
import { useState, useEffect } from "react";
import colors from "../colors";
import { requestCalendars } from "./Requests";

export default function HomeScreen({ navigation, route }) {
  const [calendars, setCalendars] = useState([]);

  useEffect(() => {
    requestCalendars(route.params.token).then((response) =>
      setCalendars(response.data)
    );
  }, [route.params.token]);

  return (
    <View style={styles.background}>
      <Text>Hello, {route.params.username}</Text>
      {calendars.map((clndr) => (
        <Pressable
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
  text: {
    color: colors.white,
  },
});
