import { useState } from "react";
import { View, StyleSheet, StatusBar, Button } from "react-native";
import { Calendar } from "react-native-calendars";
import colors from "../colors";
import CalendarScroll from "./CalendarScroll";

export default function CalendarScreen({ route }) {
  const [selectedCalendarDate, setSelectedCalendarDate] = useState(route.params.selectedDate)

  return (
    <View style={styles.background}>
      <StatusBar barStyle={"light-content"} />
      <Calendar
        style={{
          backgroundColor: colors.light,
        }}
        theme={{
          calendarBackground: colors.light,
          selectedDayBackgroundColor: colors.bright,
        }}
        onDayPress={(day) => {
          {route.params.setSelectedDate(day.dateString), setSelectedCalendarDate(day.dateString)}
        }}
        markingType={"multi-dot"}
        markedDates={{
          [selectedCalendarDate]: {
            selected: true,
            selectedColor: colors.bright,
          },
        }}
        initialDate={selectedCalendarDate}
      />
      <CalendarScroll selectedDate={selectedCalendarDate} />
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
});
