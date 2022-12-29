import { View, ScrollView, Text, StyleSheet } from 'react-native'
import colors from '../colors';

export default function DayScreen({ route }) {
    const today = route.params.selectedDate
    const todaysEntry = route.params.calendarEntries


    return (
        <ScrollView style={styles.scrollview}>
            {todaysEntry.journals === undefined ? (
                <View></View>
            ) : (
                <View>
                    {todaysEntry.journals.map((days) =>
                        days.date === today && days.event !== "" && days.event !== null ? (
                            <Text style={styles.font}>~{days.event}</Text>
                        ) : null
                    )}

                    {todaysEntry.journals.map((days) =>
                        days.date === today && days.entry !== "" && days.entry !== null ? (
                            <Text style={styles.font}>{days.entry}</Text>
                        ) : null
                    )}
                </View>
            )}
        </ScrollView>


    )
}

const styles = StyleSheet.create({
    scrollview: {
        width: "100%",
        backgroundColor: colors.light,
        padding: 5,
    },
    font: {
        fontFamily: 'patrick',
        fontSize: 25,
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
