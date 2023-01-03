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
    requestCalendarsEntries(route.params.token, route.params.calendarId).then(
      (response) => setCalendarEntries(response.data)
    );
  }, [refreshCalendar, route.params.refresh]);


  return (
    <View style={styles.background}>
      <StatusBar barStyle={"light-content"} />
      <Calendar
        style={{
          backgroundColor: colors.white,
        }}
        theme={{
          calendarBackground: colors.white,
          selectedDayBackgroundColor: colors.white,
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
      <View style={{flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center'}}>
        <Text style={[styles.font, {color: colors.white}]}>Details Page:</Text>
      <Pressable style={styles.deetz} onPress={() => navigation.navigate("Day", { selectedDate: selectedCalendarDate, calendarEntries: calendarEntries, setRefreshCalendar: setRefreshCalendar, refreshCalendar: refreshCalendar, calendarId: route.params.calendarId })}>
        <Text style={styles.font}>
          ➤
        </Text>
      </Pressable>
      </View>
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
    width: "30%",
    height: 30,
    borderRadius: 10,
    margin: 4,
    alignSelf: 'center'
  },
  font: {
    fontFamily: 'timbra',
    fontSize: 30,
  }
});
