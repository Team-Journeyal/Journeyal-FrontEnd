import { useState } from "react";
import { View, StyleSheet, StatusBar, Button } from "react-native";
import { Calendar } from "react-native-calendars";
import colors from "../colors";
import CalendarScroll from "./CalendarScroll";

export default function CalendarScreen({ navigation }) {
  const [selectedDate, setSelectedDate] = useState();

  return (
    <View style={styles.background}>
      <StatusBar barStyle={"light-content"} />
      <Button
        title="new entry"
        color={"black"}
        onPress={() => navigation.navigate("Add", { paramkey: selectedDate })}
      />
      <Calendar
        style={{
          backgroundColor: colors.light,
        }}
        theme={{
          calendarBackground: colors.light,
          selectedDayBackgroundColor: colors.bright,
        }}
        onDayPress={(day) => {
          setSelectedDate(day.dateString);
        }}
        markedDates={{
          [selectedDate]: {
            selected: true,
            selectedColor: colors.bright,
          },
        }}
        initialDate={selectedDate}
      />
      <CalendarScroll selectedDate={selectedDate} />
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
});
