import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import colors from "../colors";

export default function CalendarScroll({ selectedDate, calendarEntries }) {
  return (
    <ScrollView style={styles.scrollview}>
      {console.log(calendarEntries.journals)}
      {calendarEntries.journals.map(
        (days) =>
          days.date === selectedDate &&
          days.event.map((eventx, idx) =>
            eventx !== "" ? <Text key={idx}>~{eventx}</Text> : null
          )
      )}

      {calendarEntries.journals.map(
        (days) =>
          days.date === selectedDate &&
          days.entry.map((entryx, idx) =>
            entryx !== "" ? <Text key={idx}>{entryx}</Text> : null
          )
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
  scrollview: {
    width: "100%",
    backgroundColor: colors.light,
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
