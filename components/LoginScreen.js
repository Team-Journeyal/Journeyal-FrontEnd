import { View, Text, StyleSheet, TextInput, Pressable, Button } from 'react-native';
import { useState } from 'react';
import Register from './RegisterScreen.js';
import Home from './HomeScreen.js';

export default function Login({ loggedIn, setLoggedIn }) {
    const [register, setRegister] = useState(false)

    if (register) return <Register/>
    
    return (
        <View style={styles.background}>
            {loggedIn ? (<Home/>) :(
                <>
            <View style={styles.header}>
                <Text style={styles.title}>Journeyal</Text>
            </View>
                    <View style={styles.login}>
                        <TextInput placeholder="username" style={styles.inputs}></TextInput>
                        <TextInput placeholder="password" style={styles.inputs}></TextInput>
                        <Pressable style={styles.button} onPress={() => setLoggedIn(true)}>
                            <Text>Log In</Text>
                        </Pressable>
                        <Button title='press it' onPress={() => setRegister(true)}/>
                    </View>
                    </>
                )}
        </View>
    )
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: 'grey',
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        backgroundColor: 'yellow',
        borderWidth: 2,
        borderColor: 'black',
        borderRadius: 5,
        height: 40,
        width: 60,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        position: 'absolute',
        top: 0,
        width: '100%',
        height: 200,
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    inputs: {
        borderWidth: 2,
        borderColor: 'black',
        borderRadius: 5,
        margin: 10,
        width: 130,
    },
    login: {
        height: 300,
        width: 300,
        borderWidth: 2,
        borderColor: 'black',
        borderRadius: 5,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 40,
        color: 'white',
    },
});