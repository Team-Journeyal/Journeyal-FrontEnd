import { View, ScrollView, Text, StyleSheet, TextInput, Pressable } from 'react-native';
import { useState } from 'react';
import colors from '../colors';

export default function DayScreen({ route }) {
    const [today, setToday] = useState(route.params.selectedDate)
    const [todaysEntry, setTodaysEntry] = useState(route.params.calendarEntries)
    const [editDay, setEditDay] = useState(false)
    const [editEvent, setEditEvent] = useState([])

    return (
        <ScrollView style={styles.scrollview}>
            {todaysEntry.journals === undefined ? (
                <View></View>
            ) : (
                <View>
                    <View style={styles.eventContainer}>
                        {todaysEntry.journals.map((days) =>
                            days.date === today && days.event !== "" && days.event !== null ? (
                                <Pressable onLongPress={() => setEditDay(!editDay)}>
                                    {editDay ? (<TextInput defaultValue={days.event} style={styles.inputFont} />)
                                        : (<View style={styles.events}><Text style={styles.font}>·{days.event}</Text></View>)}
                                </Pressable>
                            ) : null
                        )}
                    </View>

                    <View style={styles.entryContainer}>
                        {todaysEntry.journals.map((days) =>
                            days.date === today && days.entry !== "" && days.entry !== null ? (
                                <View style={styles.events}><Text style={styles.font}>{days.entry}</Text></View>
                            ) : null
                        )}
                    </View>
                </View>
            )}
        </ScrollView>
    )
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
    },
    scrollview: {
        width: "100%",
        backgroundColor: colors.light,
        padding: 5,
    },
    inputFont: {
        borderWidth: 1,
        fontFamily: 'patrick',
        fontSize: 25,
        backgroundColor: colors.white,
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
