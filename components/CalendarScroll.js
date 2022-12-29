import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import colors from "../colors";

export default function CalendarScroll({ selectedDate, calendarEntries }) {
  return (
    <ScrollView style={styles.scrollview}>
      {calendarEntries.journals === undefined ? (
        <View></View>
      ) : (
        <View>

          <View style={styles.eventContainer}>
          {calendarEntries.journals.map((days) =>
            days.date === selectedDate && days.event !== "" && days.event !== null ? (
            <View style={styles.events}>
              <Text style={styles.font}>•{days.event}</Text>
            </View>
            ) : null
          )}
          </View>


          <View style={styles.entryContainer}>
          {calendarEntries.journals.map((days) =>
            days.date === selectedDate && days.entry !== "" && days.entry !== null ? (
            <View style={styles.events}>
              <Text style={styles.font}>{days.entry}</Text>
            </View>
            ) : null
          )}
          </View>
        </View>
      )}

      {/* {calendarEntries.map(
        (days) =>
          days.date === selectedDate &&
          days.images.map(
            (img, idx) =>
              img !== "" && (
                <View key={idx} style={styles.imageContainer}>
                  <Image
                    resizeMode="contain"
                    style={styles.imageStyle}
                    source={{ uri: `${img}` }}
                  />
                </View>
              )
          )
      )} */}
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  events: {
    borderBottomWidth: 2.5,
    borderTopWidth: 1,
    backgroundColor: colors.white,
    paddingLeft: 5,
  },
  eventContainer: {
    borderRadius: 5,
    marginBottom: 20,
    borderRightWidth: 3,
    borderLeftWidth: 1,
  },
  entryContainer: {
    borderRadius: 5,
    marginBottom: 20,
    borderRightWidth: 3,
    borderLeftWidth: 1,
  } , 
  font: {
    fontFamily: 'patrick',
    fontSize: 25,
  },
  scrollview: {
    width: "100%",
    backgroundColor: colors.background,
    padding: 5,
  },
  imageContainer: {
    alignItems: "center",
  },
  imageStyle: {
    width: 300,
    height: 200,
    margin: 3,
  },
});
