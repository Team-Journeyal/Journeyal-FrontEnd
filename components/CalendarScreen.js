import { useEffect, useState } from "react";
import { View, StyleSheet, StatusBar, Text, Pressable } from "react-native";
import { Calendar } from "react-native-calendars";
import colors from "../colors";
import CalendarScroll from "./CalendarScroll";
import { requestCalendarsEntries } from "./Requests";

export default function CalendarScreen({ navigation, route }) {
  const [selectedCalendarDate, setSelectedCalendarDate] = useState(
    route.params.selectedDate
  );
  const [calendarEntries, setCalendarEntries] = useState([]);
  const [refreshCalendar, setRefreshCalendar] = useState(false)

  useEffect(() => {
    console.log(route.params.calendarId)
    console.log(route.params.token)
    requestCalendarsEntries(route.params.token, route.params.calendarId).then(
      (response) => setCalendarEntries(response.data)
    );
  }, [refreshCalendar]);

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
      <Pressable style={styles.deetz} onPress={() => navigation.navigate("Day", {selectedDate: selectedCalendarDate, calendarEntries: calendarEntries, setRefreshCalendar: setRefreshCalendar, refreshCalendar: refreshCalendar, calendarId: route.params.calendarId})}>
        <Text style={styles.font}>
          The Deetz
        </Text>
      </Pressable>
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
  deetz: {
    backgroundColor: colors.bright,
    justifyContent: 'center',
    alignItems: 'center',
    width: "50%",
    height: 28,
    borderRadius: 10,
    margin: 4,
    alignSelf: 'center'
  }, 
  font: {
    fontFamily: 'timbra',
    fontSize: 30,
  }
});
