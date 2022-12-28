import { View, ScrollView, Text, StyleSheet } from 'react-native'
import colors from '../colors';

export default function TaggedScreen({ route }) {
    const tagged = route.params.results


    return (
        <ScrollView style={styles.scrollview}>
                <View>
                    {tagged.map((days) =>
                        days.date === route.params.taggedDate && days.event !== "" && days.event !== null ? (
                            <Text>~{days.event}</Text>
                        ) : null
                    )}

                    {tagged.map((days) =>
                        days.date === route.params.taggedDate && days.entry !== "" && days.entry !== null ? (
                            <Text>{days.entry}</Text>
                        ) : null
                    )}
                </View>
        </ScrollView>

    )
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