import { ScrollView, View, Text, StyleSheet, Pressable} from "react-native"
import { useNavigation } from "@react-navigation/native"
import colors from "../colors"


export default function SearchScroll({ results, calendarId }) {
    const navigation = useNavigation();

    return (
        <ScrollView style={styles.container}>
            <View>
                {results.map((days) =>
                    <>
                        {calendarId === days.calendar &&
                            <Pressable onPress={() => { navigation.navigate("Day", { selectedDate: days.date, calendarId: calendarId }) }} style={styles.resultBox}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={styles.date}>{days.date}</Text>
                                    <View>
                                        <ScrollView>
                                            {days.tags && days.tags.map((tag) =>
                                                <View style={styles.tag}>
                                                    <View style={{ flexDirection: "row", justifyContent: 'space-between'}}>
                                                        <Text style={{ color: '#fff', fontSize: 8, paddingTop: 4, }}>●</Text>
                                                        <Text style={{marginLeft: 5 }}>{tag}</Text>
                                                    </View>
                                                </View>)}
                                        </ScrollView>
                                    </View>
                                </View>
                                {days.event && <Text style={styles.font}>·{days.event}</Text>}
                                {days.entry && <Text style={styles.font}>{days.entry}</Text>}
                            </Pressable>}
                    </>
                )}
            </View>
        </ScrollView>

    )
}


const styles = StyleSheet.create({
    container: {
        width: "95%",
        borderTopWidth: 1,
    },
    date: {
        fontFamily: "nunitoBold",
        marginBottom: 2,
    },
    font: {
        fontFamily: 'nunitoReg',
        fontSize: 18,
    },
    resultBox: {
        width: "100%",
        height: 130,
        marginTop: 10,
        padding: 10,
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: colors.white
    },
    tag: {
        backgroundColor: colors.background,
        borderBottomLeftRadius: 12,
        borderTopLeftRadius: 12,
        padding: 5,
        marginTop: 2
    },
    tagFont: {
        fontFamily: 'nunitoReg',
        fontSize: 18,
    }
})