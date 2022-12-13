import { View, Text, StyleSheet, ScrollView, StatusBar } from "react-native";
import { Calendar } from "react-native-calendars";
import CalendarScroll from "./CalendarScroll";

export default function CalendarScreen() {
  return (
    <View style={styles.background}>
      <StatusBar barStyle={"light-content"} />
      <Calendar />
      <CalendarScroll />
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
});
