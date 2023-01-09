import { View, ScrollView, Text, StyleSheet, TextInput, Pressable, Modal, TouchableOpacity, ActivityIndicator, Vibration, Image } from 'react-native';
import { useState, useEffect } from 'react';
import colors from '../colors';
import { requestCalendarsEntries, requestEditEvent, requestEditEntry } from './Requests';
import CarouselCards from './CarouselCards'


export default function DayScreen({ route }) {
    const today = route.params.selectedDate
    const [editJournal, setEditJournal] = useState([]);
    const [modalOpacity, setModalOpacity] = useState(1);
    const [modalVisible, setModalVisible] = useState(false);
    const [imgVisible, setImgVisible] = useState(false);
    const [calendarEntries, setCalendarEntries] = useState([]);
    const [editingEvent, setEditingEvent] = useState(false);
    const [editingEntry, setEditingEntry] = useState(false);
    const [editId, setEditId] = useState([]);
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        requestCalendarsEntries(route.params.token, route.params.calendarId)
        .then((response) =>  setCalendarEntries(response.data)
        );
    }, [refresh]);

    const handleEventEdit = () => {
        requestEditEvent(route.params.token, editJournal, editId)
            .then((res) => (res && setRefresh(!refresh), setEditJournal([]), setEditingEvent(false),
                route.params.setRefreshCalendar(!route.params.refreshCalendar), setModalOpacity(1)))
    }

    const handleEntryEdit = () => {
        requestEditEntry(route.params.token, editJournal, editId)
            .then((res) => (res && setRefresh(!refresh), setEditJournal([]), setEditingEntry(false),
                route.params.setRefreshCalendar(!route.params.refreshCalendar), setModalOpacity(1)))
    }

    const imageArray = []
    calendarEntries.journals && calendarEntries.journals.map((days) => 
        days.date === today && days.journal_images.length !== 0 && (
        days.journal_images.map((img) => imageArray.push({image: img.image}))))

    return (
        <View style={[styles.scrollview, { opacity: modalOpacity }]}>
            <ScrollView>
                {calendarEntries.journals === undefined ? (
                    <View style={{ position: 'absolute', left: 0, right: 0, top: 90 }}>
                        <ActivityIndicator color={colors.dark} size='large' />
                    </View>
                ) : (
                    <View>

                        <Modal
                            animationType="none"
                            transparent={true}
                            visible={modalVisible}>
                            <TouchableOpacity style={styles.modalBox} onPress={() => {
                                setModalVisible(false),
                                    setModalOpacity(1)
                            }}>
                                <TouchableOpacity onPress={null} style={styles.modalThing} activeOpacity={1}>
                                    <Text>Edit Schedule/Journal</Text>
                                    <TextInput
                                        autoCorrect={false}
                                        autoCapitalize="none"
                                        value={editJournal}
                                        defaultValue={editJournal}
                                        onChangeText={setEditJournal}
                                        style={styles.inputs} />
                                    <View style={{ width: 250, flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 5 }}>
                                        <Pressable onPress={() => {
                                            setModalVisible(!modalVisible);
                                            { editingEvent && (handleEventEdit(), setEditingEvent(false)) };
                                            { editingEntry && (handleEntryEdit(), setEditingEntry(false)) };
                                            setModalOpacity(1)
                                        }}
                                            style={styles.modalButton}>
                                            <Text style={styles.font}>Submit</Text>
                                        </Pressable>
                                        <Pressable onPress={() => {
                                            setModalVisible(!modalVisible),
                                                setEditJournal([]),
                                                setEditingEntry(false),
                                                setEditingEvent(false),
                                                setModalOpacity(1)
                                        }}
                                            style={[styles.modalButton, { backgroundColor: 'silver' }]}>
                                            <Text style={styles.font}>Cancel</Text>
                                        </Pressable>
                                    </View>
                                </TouchableOpacity>
                            </TouchableOpacity>
                        </Modal>

                        <Text style={styles.dateFont}>{today}</Text>
                        <CarouselCards imageArray={imageArray}/>

                        <View style={styles.eventContainer}>
                            {calendarEntries.journals.map((days) =>
                                days.date === today && days.event !== "" && days.event !== null ? (
                                    <Pressable onLongPress={() => {
                                        Vibration.vibrate(),
                                            setEditJournal(days.event),
                                            setEditId(days.id),
                                            setEditingEvent(true),
                                            setModalVisible(!modalVisible),
                                            setModalOpacity(.3)
                                    }}>
                                        <View style={styles.events}>
                                            <Text style={styles.user}>{days.user}</Text>
                                            <Text style={styles.font}>{days.event}</Text>
                                        </View>
                                    </Pressable>
                                ) : null
                            )}
                        </View>

                        <View style={styles.entryContainer}>
                            {calendarEntries.journals.map((days) =>
                                days.date === today && days.entry !== "" && days.entry !== null ? (
                                    <Pressable onLongPress={() => {
                                        Vibration.vibrate(),
                                            setEditJournal(days.entry),
                                            setEditId(days.id),
                                            setEditingEntry(true),
                                            setModalVisible(!modalVisible),
                                            setModalOpacity(.3)
                                    }}>
                                        <View style={styles.entries}>
                                            <Text style={styles.user}>{days.user}</Text>
                                            <Text style={styles.font}>{days.entry}</Text>
                                        </View>
                                    </Pressable>
                                ) : null
                            )}
                        </View>

                        <View style={styles.tagContainer}>
                            {calendarEntries.journals.map((days) => 
                                days.date === today && 
                                days.tags.length !== 0 &&
                            <View style={styles.tagBox}>
                            {days.tags.map((tag) =>
                            <View style={styles.tag}>
                                <View style={{flexDirection: "row", alignItem: "center", justifyContent: 'center', }}>
                                    <Text style={{color: colors.white, fontSize: 8, paddingTop: 4, }}>●</Text>
                                    <Text style={{marginLeft: 5}}>{tag}</Text>
                                </View>
                            </View>)}
                            </View>
            
                            )}
                        </View>
                    </View>
                )}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    img: {
        width: 300,
        height: 300,
    },
    events: {
        borderTopWidth: 1,
        backgroundColor: colors.white,
        paddingLeft: 10,
        paddingBottom: 10,
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
    entries: {
        borderTopWidth: 1,
        paddingLeft: 10,
        marginBottom: 5,
    },
    entryContainer: {
        borderRadius: 5,
        marginBottom: 20,
    },
    scrollview: {
        flex: 1,
        width: "100%",
        padding: 5,

    },
    inputFont: {
        borderWidth: 1,
        fontFamily: 'nunitoReg',
        fontSize: 25,
        backgroundColor: colors.white,
    },
    font: {
        fontFamily: 'nunitoReg',
        fontSize: 20,
        marginLeft: 10,
    },
    dateFont: {
        fontFamily: 'nunitoBold',
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
        backgroundColor: colors.bright
    },
    modalThing: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 15,
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
        borderWidth: 1,
        borderColor: colors.dark,
        borderRadius: 5,
        margin: 10,
        width: 200,
        height: 40,
        padding: 3,
        textAlign: "center",
        fontFamily: 'nunitoReg',
        fontSize: 20,
    },
    tag: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
        backgroundColor: colors.background,
        margin: 5,
        borderBottomLeftRadius: 12,
        borderTopLeftRadius: 12,
        padding: 5,
    },
    tagBox: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: 'center',
        alignItems: 'center',
    },
    tagContainer:{
        flexDirection: 'row', 
        justifyContent: 'center', 
        flexWrap: "wrap",
        marginTop: 40,
        marginBottom: 100,
    },
    user: {
        fontFamily: "nunitoReg",
        margin: 5
    }
});
