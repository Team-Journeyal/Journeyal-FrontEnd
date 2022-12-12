
import { Button, StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';
import Login from './components/LoginScreen.js'

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false)

  return (
    <Login loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
  );
}

