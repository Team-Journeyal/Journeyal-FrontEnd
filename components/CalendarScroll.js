import { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import colors from "../colors";

export default function CalendarScroll({ selectedDate, calendarEntries }) {
  return (
    <ScrollView style={styles.scrollview}>
      {calendarEntries.journals === undefined ? (
        <View></View>
      ) : (
        <View>
          {calendarEntries.journals.map((days) =>
            days.date === selectedDate && days.event !== "" ? (
              <Text>~{days.event}</Text>
            ) : null
          )}

          {calendarEntries.journals.map((days) =>
            days.date === selectedDate && days.entry !== "" ? (
              <Text>{days.entry}</Text>
            ) : null
          )}
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
