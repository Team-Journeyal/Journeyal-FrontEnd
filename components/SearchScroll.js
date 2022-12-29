import { ScrollView, View, Text, StyleSheet, Pressable } from "react-native"
import { useNavigation } from "@react-navigation/native"
import colors from "../colors"

export default function SearchScroll({results, calendarId}) {
    const navigation = useNavigation(); 

    return (
        <ScrollView style={styles.container}>
            <View>
                {results.map((things) => 
                <>
                {calendarId === things.calendar &&
                <Pressable onPress={() => {navigation.navigate("Tagged", {taggedDate: things.date, results: results})}} style={styles.resultBox}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text style={styles.date}>{things.date}</Text>
                    {things.tags && <Text style={styles.font}>🏷{things.tags}</Text>}
                    </View>
                    {things.event && <Text style={styles.font}>~{things.event}</Text>}
                    {things.entry && <Text style={styles.font}>{things.entry}</Text>}
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
        fontFamily: 'lexie',
        fontSize: 18,
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