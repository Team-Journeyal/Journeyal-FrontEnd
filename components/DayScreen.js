import { View, ScrollView, Text, StyleSheet, TextInput, Pressable, Modal, TouchableOpacity, ActivityIndicator, Vibration } from 'react-native';
import { useState, useEffect } from 'react';
import colors from '../colors';
import { requestCalendarsEntries } from './Requests';

export default function DayScreen({ route }) {
    const [today, setToday] = useState(route.params.selectedDate)
    const [editDay, setEditDay] = useState(false)
    const [editJournal, setEditJournal] = useState([])
    const [modalOpacity, setModalOpacity] = useState(1)
    const [modalVisible, setModalVisible] = useState(false)
    const [calendarEntries, setCalendarEntries] = useState([])


    useEffect(() => {
        console.log(route.params.calendarId)
        console.log(route.params.token)
        requestCalendarsEntries(route.params.token, route.params.calendarId).then(
          (response) => setCalendarEntries(response.data)
        );
      }, [route.params.refresh]);

    return (
        <ScrollView style={styles.scrollview}>
            {calendarEntries.journals === undefined ? (
                <View style={{position: 'absolute', left: 0, right: 0, top: 90}}><ActivityIndicator color={colors.dark} size='large'/></View>
            ) : (
                <View>

                    <Modal
                        animationType="none"
                        transparent={true}
                        visible={modalVisible}>
                        <TouchableOpacity style={styles.modalBox} onPress={() => { setModalVisible(false), setModalOpacity(1) }}>
                            <TouchableOpacity onPress={null} style={styles.modalThing} activeOpacity={1}>
                                <Text>Edit Schedule/Journal</Text>
                                <TextInput
                                    autoCorrect={false}
                                    autoCapitalize="none"
                                    value={editJournal}
                                    defaultValue={editJournal}
                                    onChangeText={setEditJournal}
                                    style={styles.inputs}/>
                                <View style={{ width: 250, flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 5 }}>
                                    <Pressable onPress={() => {setModalVisible(!modalVisible) }} style={styles.modalButton}>
                                        <Text style={styles.font}>Submit</Text>
                                    </Pressable>
                                    <Pressable onPress={() => { setModalVisible(!modalVisible), setEditJournal([]), setModalOpacity(1) }} style={styles.modalButton}>
                                        <Text style={styles.font}>Cancel</Text>
                                    </Pressable>
                                </View>
                            </TouchableOpacity>
                        </TouchableOpacity>
                    </Modal>

                    <Text style={styles.dateFont}>{today}</Text>
                    <View style={styles.eventContainer}>
                        {calendarEntries.journals.map((days) =>
                            days.date === today && days.event !== "" && days.event !== null ? (
                                <Pressable onLongPress={() => {Vibration.vibrate(), setEditJournal(days.event), setModalVisible(!modalVisible) }}>
                                    <View style={styles.events}><Text style={styles.font}>·{days.event}</Text></View>
                                </Pressable>
                            ) : null
                        )}
                    </View>

                    <View style={styles.entryContainer}>
                        {calendarEntries.journals.map((days) =>
                            days.date === today && days.entry !== "" && days.entry !== null ? (
                                <Pressable onLongPress={() => {Vibration.vibrate(), setEditJournal(days.entry), setModalVisible(!modalVisible) }}>
                                <View style={styles.events}><Text style={styles.font}>{days.entry}</Text></View>
                            </Pressable>
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
    dateFont: {
        fontFamily: 'patrick',
        fontSize: 30,
        textAlign: 'center',
    },
    imageContainer: {
        alignItems: "center",
    },
    imageStyle: {
        width: 300,
        height: 200,
        margin: 3,
    },
    modalBox: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
    },
    modalButton: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        backgroundColor: "green"
    },
    modalThing: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    inputs: {
        borderWidth: 2,
        borderColor: colors.dark,
        borderRadius: 5,
        margin: 10,
        width: 200,
        height: 40,
        padding: 3,
        textAlign: "center",
        fontFamily: 'patrick',
        fontSize: 20,
    },
});
