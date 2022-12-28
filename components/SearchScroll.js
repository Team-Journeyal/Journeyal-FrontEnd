import { ScrollView, View, Text, StyleSheet, Pressable, Button } from "react-native"
import { useNavigation } from "@react-navigation/native"
import colors from "../colors"

export default function SearchScroll({results, calendarId, setSelectedDate}) {
    const navigation = useNavigation(); 

    return (
        <ScrollView style={styles.container}>
            <View>
                {results.map((things) => 
                <>
                {calendarId === things.calendar &&
                <Pressable onPress={() => {setSelectedDate(things.date), navigation.navigate("Calendar"), console.log(things.date)}} style={styles.resultBox}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text style={styles.date}>{things.date}</Text>
                    {things.tags && <Text>🏷{things.tags}</Text>}
                    </View>
                    {things.event && <Text>~{things.event}</Text>}
                    {things.entry && <Text>{things.entry}</Text>}
                </Pressable>}
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