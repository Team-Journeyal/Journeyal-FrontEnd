import { View, Text, StyleSheet, ScrollView } from "react-native";
import colors from "../colors";
import {data} from "../sample.json"

export default function CalendarScroll({selectedDate}) {
  return (
    <ScrollView style={styles.scrollview}>
      <Text> Scroll view area </Text>
      {data.map((days, idx) => days.date === selectedDate ? (days.entries.map((entry) => (<Text>{entry}</Text>))) : (null))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollview: {
    width: "100%",
    backgroundColor: colors.light,
  },
});
