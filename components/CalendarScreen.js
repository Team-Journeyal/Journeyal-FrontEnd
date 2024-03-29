import { useEffect, useState } from "react";
import { View, StyleSheet, StatusBar, Text, Pressable, TouchableOpacity } from "react-native";
import { Calendar } from "react-native-calendars";
import colors from "../colors";
import CalendarScroll from "./CalendarScroll";
import { requestCalendarsEntries } from "./Requests";
import { useIsFocused } from "@react-navigation/native";

export default function CalendarScreen({ navigation, route }) {
  const [selectedCalendarDate, setSelectedCalendarDate] = useState(route.params.selectedDate);
  const [calendarEntries, setCalendarEntries] = useState([]);
  const dotMarker = { key: 'dotMarker', color: colors.dark }
  const isFocused = useIsFocused()

  useEffect(() => {
    requestCalendarsEntries(route.params.token, route.params.calendarId).then(
      (response) => { response && setCalendarEntries(response.data) }
    );
  }, [isFocused]);

  let dateObject = { [selectedCalendarDate]: { selected: true, selectedColor: colors.bright } }

  calendarEntries.length !== 0 && calendarEntries.journals.map((dots) => {
    dateObject[dots.date] = {
      dots: [dotMarker],
      selectedColor: colors.bright,
    };
  });

  return (
    <View style={styles.background}>
      <StatusBar barStyle={"light-content"} />
      <Calendar
        style={{
          backgroundColor: colors.white,
          paddingBottom: 13,
        }}
        theme={{
          calendarBackground: colors.white,
          selectedDayBackgroundColor: colors.white,
          textDayFontFamily: 'nunitoBlack',
          textMonthFontFamily: 'nunitoBlack',
          textMonthFontSize: 20,
          textDayHeaderFontFamily: 'nunitoBlack',
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
        markedDates={dateObject}
        initialDate={selectedCalendarDate}
      />
      <View style={styles.bar}>
        <Text style={styles.font}>More about this day</Text>
        <TouchableOpacity style={styles.deetz}
          onPress={() => navigation.navigate("Day", {
            selectedDate: selectedCalendarDate,
            calendarId: route.params.calendarId })}>
          <Text style={styles.arrow}>➤</Text>
        </TouchableOpacity>
      </View>
      <CalendarScroll
        selectedDate={selectedCalendarDate}
        calendarEntries={calendarEntries}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  arrow: {
    color: colors.dark,
    fontSize: 25,
  },
  background: {
    flex: 1,
    backgroundColor: colors.dark,
    color: colors.white,
  },
  bar: {
    flexDirection: 'row', 
    justifyContent: 'space-evenly', 
    alignItems: 'center', 
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
    color: colors.white,
    fontFamily: 'nunitoBold',
    fontSize: 20,
  }
});
