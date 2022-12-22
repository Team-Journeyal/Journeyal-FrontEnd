import { ScrollView, View, Text, StyleSheet } from "react-native"
import colors from "../colors"

export default function SearchScroll({results, calendarId}) {
    return (
        <ScrollView style={styles.container}>
            <View>
                {console.log(calendarId)}
                {console.log(results)}
                {results.map((things) => 
                <>
                {calendarId === things.calendar &&
                <View style={styles.resultBox}>
                    <Text style={styles.date}>{things.date}</Text>
                    <Text>{things.event}</Text>
                    <Text>{things.entry}</Text>
                </View>}
                </>
                )}
            </View>
            
        </ScrollView>

    )
}


const styles = StyleSheet.create({
    container: {
        width: "90%",
    },
    date: {
        fontWeight: "bold",
        marginBottom: 2,
    },
    resultBox: {
        width: "100%",
        height: 100,
        marginTop: 10, 
        padding: 10,
        borderWidth: 2,
        backgroundColor: colors.white
    }
})