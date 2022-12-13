import { View, Text, StyleSheet, ScrollView } from "react-native";
import colors from "../colors";
import {data} from "../sample.json"



export default function CalendarScroll({selectedDate}) {
  return (
    <ScrollView style={styles.scrollview}>
      <Text> Scroll view area </Text>
      {/* {data.map((dayz) => {date11.includes(dayz.info.date) ? (<Text>{dayz.info.entries}</Text>) : (console.log("false"))})} */}
      {data[0].info.date === selectedDate ? (console.log("true")) : (console.log("false"))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollview: {
    width: "100%",
    backgroundColor: colors.light,
  },
});
