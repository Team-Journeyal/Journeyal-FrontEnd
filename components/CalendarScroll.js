import { View, Text, StyleSheet, ScrollView, Image, ActivityIndicator } from "react-native";
import colors from "../colors";
import { useEffect, useState } from "react";

export default function CalendarScroll({ selectedDate, calendarEntries }) {
  const [empty, setEmpty] = useState(false)
  const [truncated, setTruncated] = useState("")
  let dateArray = []
  let entryArray = []

  useEffect(() => {
    calendarEntries.journals === undefined ? (null) : (
      calendarEntries.journals.map((days) => {
        dateArray.push(days.date),
        dateArray.includes(selectedDate) ? (setEmpty(true)) : (setEmpty(false))
      }))
  }, [calendarEntries, selectedDate])

  useEffect(() => {
    calendarEntries.journals === undefined ? (null) : (
      calendarEntries.journals.map((days) => {
        entryArray.push({entry: days.entry, date: days.date}),
        entryArray.map((entries) => {
          entries.date === selectedDate && entries.entry !== null && (
          entries.entry.length > 36 ? (setTruncated(entries.entry.slice(0,36))) : null)
        })
      })
    )
  }, [calendarEntries, selectedDate])

  return (
    <ScrollView style={styles.scrollview}>
      {calendarEntries.journals === undefined ? (
        <View style={{ position: 'absolute', left: 0, right: 0, top: 90 }}>
          <ActivityIndicator color={colors.dark} size='large' />
        </View>
      ) : (
        <View>
          <View style={styles.eventContainer}>
            {calendarEntries.journals.map((days) =>
              days.date === selectedDate && days.event !== "" && days.event !== null ? (
                <View style={styles.events}>
                  <Text style={styles.user}>{days.user}</Text>
                  <Text style={styles.font}>{days.event}</Text>
                </View>
              ) : null
            )}
          </View>

          <View style={styles.entryContainer}>
            {calendarEntries.journals.map((days) =>
              days.date === selectedDate && days.entry !== "" && days.entry !== null ? (
                <View style={styles.entries}>
                  <Text style={styles.user}>{days.user}</Text>
                  {days.entry.length < 36 ? 
                  <Text style={styles.font}>{days.entry}</Text>
                  : <Text style={styles.font}>{truncated}...</Text>}
                </View>
              ) : null
            )}
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap' }}>
            {calendarEntries.journals.map((days) =>
              days.date === selectedDate &&
                days.journal_images.length !== 0 ? (
                days.journal_images.map((img) =>
                  <View style={styles.imageContainer}>
                    <Image
                      resizeMode='cover'
                      style={styles.imageStyle}
                      source={{ uri: `${img.image}` }}
                    />
                  </View>
                )) : null
            )}
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'center', marginRight: 20, marginTop: 75, }}>
            {calendarEntries.journals.map((days) =>
              days.date === selectedDate && days.tags.length !== 0 ? (
                days.tags.map((tag) =>
                  <View style={styles.tag}>
                    <View style={{ flexDirection: "row", alignItem: "center", justifyContent: 'space-between',}}>
                      <Text style={{ color: '#efefef', fontSize: 8, paddingTop: 4, }}>●</Text>
                      <Text style={{ marginLeft: 5 }}>{tag}</Text>
                    </View>
                  </View>)) : null
            )}
          </View>
                {empty ? (null): (<View style={styles.empty}><Text style={styles.font}>Nothing posted yet!</Text></View>)}
        </View>
      )}

    </ScrollView>
  );
}
const styles = StyleSheet.create({
  empty: {
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.7
  },
  events: {
    borderWidth: 1,
    backgroundColor: colors.white,
    paddingLeft: 10,
    marginBottom: -1,
  },
  entries: {
    borderTopWidth: 1,
    paddingLeft: 10,
    marginBottom: 5,
  },
  eventContainer: {
    margin: 10,
    marginTop: 15,
    marginBottom: 20,
  },
  entryContainer: {
    marginBottom: 20,
    paddingRight: 10,
    paddingLeft: 10,
  },
  font: {
    fontFamily: 'nunitoReg',
    fontSize: 20,
    height: 35,
    marginLeft: 5,
  },
  scrollview: {
    width: "100%",
    backgroundColor: "#efefef",
    padding: 5,
  },
  imageContainer: {
    flexDirection: 'row',
    alignItems: "center",
  },
  imageStyle: {
    width: 80,
    height: 80,
    margin: 3,
  },
  tag: {
    backgroundColor: colors.background,
    margin: 5,
    marginBottom: 50,
    borderBottomLeftRadius: 12,
    borderTopLeftRadius: 12,
    padding: 5,
  },
  user: {
    fontFamily: "nunitoReg",
    margin: 5,
    justifyContent: "flex-end"
  }
});
