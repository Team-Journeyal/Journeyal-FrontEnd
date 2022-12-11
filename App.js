
import { Button, StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';
import Login from './components/Login.js'
import Register from './components/Register.js'

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false)

  return (
    <View style={styles.container}>

      <Text>Hello World</Text>
      <Button onPress={() => {setLoggedIn(!loggedIn)}} title="Login" />
      {loggedIn ? <Login /> : <Register/>}
    
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
