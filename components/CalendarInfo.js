import { View, Text, StyleSheet, Pressable } from 'react-native'
import { useState } from 'react'
import colors from '../colors'

export default function CalendarInfo({ clndr, setCalId, calId }) {


    return (
        <View>
            <View style={styles.container}>
            <Pressable style={styles.button} onPress={() => {setCalId(clndr.id)}}>
                {calId !== clndr.id ? (<Text style={{ fontSize: 20, color: colors.white }}>▽</Text>) : (null)}
            </Pressable>
            </View>

            <Pressable style={styles.button} onPress={() => {setCalId(null)}}>
                {calId === clndr.id ? (<Text style={{ fontSize: 20, color: colors.white }}>△</Text>) : (null)}
            </Pressable>
        </View>
    )
}
const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        width: 350,
    },
    expand: {
        height: 200,
        width: 350,
        backgroundColor: colors.bright,
        marginBottom: 300,
    }
})