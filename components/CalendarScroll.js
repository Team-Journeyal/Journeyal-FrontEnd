import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import colors from "../colors";
import {data} from "../sample.json"

export default function CalendarScroll({selectedDate}) {
  return (
    <ScrollView style={styles.scrollview}>
      {data.map((days) => days.date === selectedDate &&
        (days.entries.map((entry, idx) => (
          <Text key={idx}>{entry}</Text>))))}

      {data.map((days) => days.date === selectedDate &&
        (days.images.map((img, idx) => (
          <View key={idx} style={styles.imageContainer}><Image resizeMode='contain' style={styles.imageStyle} source={{uri: `${img}`}}/></View>))))}

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
  }
});
