import { ScrollView, View, Text, StyleSheet, Pressable } from "react-native"
import { useNavigation } from "@react-navigation/native"
import colors from "../colors"

export default function SearchScroll({results, calendarId}) {
    const navigation = useNavigation(); 

    return (
        <ScrollView style={styles.container}>
            <View>
                {results.map((days) => 
                <>
                {calendarId === days.calendar &&
                <Pressable onPress={() => {navigation.navigate("Day", {selectedDate: days.date, calendarId: calendarId})}} style={styles.resultBox}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text style={styles.date}>{days.date}</Text>
                    <View style={styles.tag}>
                    {things.tags && <Text style={styles.font}>{days.tags}</Text>}
                    </View>
                    </View>
                    {things.event && <Text style={styles.font}>·{days.event}</Text>}
                    {things.entry && <Text style={styles.font}>{days.entry}</Text>}
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
        fontWeight: "bold",
        marginBottom: 2,
    },
    font:{
        fontFamily: 'patrick',
        fontSize: 18,
    },
    resultBox: {
        width: "100%",
        height: 113,
        marginTop: 10, 
        padding: 10,
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: colors.white
    },
    tag:{
        minWidth: 55,
        alignItems: "center",
        backgroundColor: colors.background,
        borderBottomLeftRadius: 9,
        borderTopLeftRadius: 9,
        padding: 5,
      }
})