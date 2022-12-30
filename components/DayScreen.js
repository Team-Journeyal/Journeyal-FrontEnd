import { View, ScrollView, Text, StyleSheet, TextInput, Pressable, Modal, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import colors from '../colors';

export default function DayScreen({ route }) {
    const [today, setToday] = useState(route.params.selectedDate)
    const [todaysEntry, setTodaysEntry] = useState(route.params.calendarEntries)
    const [editDay, setEditDay] = useState(false)
    const [editJournal, setEditJournal] = useState([])
    const [modalOpacity, setModalOpacity] = useState(1)
    const [modalVisible, setModalVisible] = useState(false)

    return (
        <ScrollView style={styles.scrollview}>
            {todaysEntry.journals === undefined ? (
                <View></View>
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


                    <View style={styles.eventContainer}>
                        {todaysEntry.journals.map((days) =>
                            days.date === today && days.event !== "" && days.event !== null ? (
                                <Pressable onLongPress={() => { setModalVisible(!modalVisible), setEditJournal(days.event) }}>
                                    <View style={styles.events}><Text style={styles.font}>·{days.event}</Text></View>
                                </Pressable>
                            ) : null
                        )}
                    </View>

                    <View style={styles.entryContainer}>
                        {todaysEntry.journals.map((days) =>
                            days.date === today && days.entry !== "" && days.entry !== null ? (
                                <Pressable onLongPress={() => { setModalVisible(!modalVisible), setEditJournal(days.entry) }}>
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
        height: 30,
        padding: 3,
        textAlign: "center",
        fontFamily: 'patrick',
        fontSize: 20,
    },
});
