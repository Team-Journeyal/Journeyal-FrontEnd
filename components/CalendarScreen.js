import { useEffect, useState } from "react";
import { View, StyleSheet, StatusBar, Text, Button } from "react-native";
import { Calendar } from "react-native-calendars";
import colors from "../colors";
import CalendarScroll from "./CalendarScroll";
import { requestCalendarsEntries } from "./Requests";

export default function CalendarScreen({ navigation, route }) {
  const [selectedCalendarDate, setSelectedCalendarDate] = useState(
    route.params.selectedDate
  );
  const [calendarEntries, setCalendarEntries] = useState([]);

  useEffect(() => {
    console.log(route.params.calendarId)
    console.log(route.params.token)
    requestCalendarsEntries(route.params.token, route.params.calendarId).then(
      (response) => setCalendarEntries(response.data)
    );
  }, [route.params.refresh]);
console.log(route.params.selectedDate)
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
          textDayFontFamily: 'marker',
          textMonthFontFamily: 'marker',
          textDayHeaderFontFamily: 'marker',
        }}
        onMonthChange={day => {
            route.params.setSelectedDate(day.dateString),
              setSelectedCalendarDate(day.dateString);
          }}
        onDayPress={(day) => {
          {
            route.params.setSelectedDate(day.dateString),
              setSelectedCalendarDate(day.dateString);
          }
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
      <Button title={`Selected date: ${selectedCalendarDate}`} color={colors.white} onPress={() => navigation.navigate("Day", {selectedDate: selectedCalendarDate, calendarEntries: calendarEntries})}/>
      <CalendarScroll
        selectedDate={selectedCalendarDate}
        calendarEntries={calendarEntries}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: colors.dark,
    color: colors.white,
  },
});
