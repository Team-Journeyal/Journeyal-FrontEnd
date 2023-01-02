import { View, Text, StyleSheet, Pressable } from 'react-native'
import {useState} from 'react'

export default function CalendarInfo ({clndr }) {
    const [info, setInfo] = useState(false)


    return (
        <View style={styles.container}> 
            <Pressable onPress={() => setInfo(!info)} style={styles.button}><Text>▽</Text></Pressable>
            {console.log(clndr)}
            {info && 
            <Text>Test</Text>}
        </View>
    )
}
const styles = StyleSheet.create({
    button: {
        width: "50%",
        backgroundColor: "pink"
    },
    container: {
        width: 100,
        height: 100
    }
})