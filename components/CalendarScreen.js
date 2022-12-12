import { View, Text, StyleSheet } from "react-native";
import { Calendar } from "react-native-calendars";
import colors from "../colors";

export default function CalendarScreen() {
  return (
    <View style={styles.background}>
      <Calendar />
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
