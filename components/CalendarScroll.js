import { View, Text, StyleSheet, ScrollView, Image, ActivityIndicator } from "react-native";
import colors from "../colors";

export default function CalendarScroll({ selectedDate, calendarEntries }) {


  return (
    <ScrollView style={styles.scrollview}>
      {calendarEntries.journals === undefined ? (
        <View style={{position: 'absolute', left: 0, right: 0, top: 90}}>
          <ActivityIndicator color={colors.dark} size='large'/>
          </View>
      ) : (
        <View>
          <View style={styles.eventContainer}>
            {calendarEntries.journals.map((days) =>
              days.date === selectedDate && days.event !== "" && days.event !== null ? (
            <View style={styles.events}>
              <Text style={styles.user}>{days.user}</Text>
              <Text style={styles.font}>·{days.event}</Text>
            </View>
            ) : null
            )}
          </View>

          <View style={styles.entryContainer}>
            {calendarEntries.journals.map((days) =>
              days.date === selectedDate && days.entry !== "" && days.entry !== null ? (
            <View style={styles.entries}>
              <Text style={styles.user}>{days.user}</Text>
              <Text style={styles.font}>{days.entry}</Text>
            </View>
            ) : null
            )}
          </View>

      <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap'}}> 
      {calendarEntries.journals.map((days) =>
          days.date === selectedDate &&
              days.journal_images.length !== 0 && (
                days.journal_images.map((img) => 
                <View style={styles.imageContainer}>
                  <Image
                    resizeMode= 'cover'
                    style={styles.imageStyle}
                    source={{ uri: `${img.image}` }}
                  />
                </View>
              ))
      )}
      </View>

      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        {calendarEntries.journals.map((days) => 
          days.date === selectedDate && days.tags.length !== 0 &&
        <View style={styles.tag}>
          <View style={{flexDirection: "row", justifyContent: 'space-evenly'}}>
            <Text style={{color: colors.white, }}>·</Text>
            <Text style={{marginLeft: 5}}>{days.tags}</Text>
          </View>
        </View>  
        )}
      </View>

        </View>
      )}

    </ScrollView>
  );
}
const styles = StyleSheet.create({
  events: {
    borderTopWidth: 1,
    backgroundColor: colors.white,
    paddingLeft: 10,
    marginBottom: 5,
  },
  entries: {
    borderTopWidth: 1,
    paddingLeft: 10,
    marginBottom: 5,
  },
  eventContainer: {
    borderRadius: 5,
    margin: 10,
    marginTop: 0,
    marginBottom: 20,
    borderRightWidth: 3,
    borderLeftWidth: 1,
    borderBottomWidth: 2.5,
  },
  entryContainer: {
    marginBottom: 20,
    paddingRight: 10,
    paddingLeft: 10,
  } , 
  font: {
    fontFamily: 'nunitoReg',
    fontSize: 20,
    height: 35,
    marginLeft: 10,
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
  tag:{
    minWidth: 55,
    backgroundColor: colors.background,
    margin: 5,
    marginBottom: 50,
    borderBottomLeftRadius: 9,
    borderTopLeftRadius: 9,
    padding: 5,
  },
  user: {
    fontFamily: "nunitoReg",
    margin: 5,
  }
});
