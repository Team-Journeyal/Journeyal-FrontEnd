import { View, Text, StyleSheet, ScrollView } from "react-native";
import colors from "../colors";

export default function CalendarScroll() {
  return (
    <ScrollView style={styles.scrollview}>
      <Text> Scroll view area </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollview: {
    width: "100%",
    backgroundColor: colors.light,
  },
});
