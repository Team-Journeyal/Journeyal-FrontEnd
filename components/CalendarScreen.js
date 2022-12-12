import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Calendar } from "react-native-calendars";
import CalendarScroll from "./CalendarScroll";

export default function CalendarScreen() {
  return (
    <View style={styles.background}>
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
