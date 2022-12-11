import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';
import Login from './components/Login.js'

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false)

  return (
    <View style={styles.container}>
      <Text>Hello World</Text>
      <Button onPress={() => {setLoggedIn(true)}}>to login</Button>
      {loggedIn && <Login />}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
