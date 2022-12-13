import { View, Text, StyleSheet, ScrollView } from "react-native";
import colors from "../colors";
import {data} from "../sample.json"

export default function CalendarScroll({selectedDate}) {
  return (
    <ScrollView style={styles.scrollview}>
      <Text> Scroll view area </Text>
      {data.map((days) => days.date === selectedDate ? (<Text>{days.entries}</Text>) : (null))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollview: {
    width: "100%",
    backgroundColor: colors.light,
  },
});
