import { Button, Pressable, Image, StyleSheet, Text } from "react-native";
import { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LogBox } from "react-native";
import { useFonts } from 'expo-font';
import LoginScreen from "./components/LoginScreen.js";
import RegisterScreen from "./components/RegisterScreen.js";
import HomeScreen from "./components/HomeScreen.js";
import CalendarScreen from "./components/CalendarScreen.js";
import NewEntryScreen from "./components/NewEntryScreen.js";
import SearchScreen from "./components/SearchScreen.js";
import DayScreen from "./components/DayScreen.js";
import colors from "./colors.js";

LogBox.ignoreAllLogs();
const Stack = createNativeStackNavigator();

export default function App() {
  const [token, setToken] = useState(null);
  const [username, setUsername] = useState(null);
  const current = new Date();
  const month = String(current.getMonth() + 1)
  const day = String(current.getDate())
  const checkedMonth = month.length === 1 ? `0${month}` : `${month}`
  const checkedDay = day.length === 1 ? `0${day}` : `${day}`

  const currentDate = `${current.getFullYear()}-${checkedMonth}-${checkedDay}`;

  const [selectedDate, setSelectedDate] = useState(currentDate);
  const [refresh, setRefresh] = useState(false);
  const [calendarId, setCalendarId] = useState("");
  const [settings, setSettings] = useState(true);
  const [editDay, setEditDay] =useState(true);
  const [addOpacity, setAddOpacity] = useState(1)
  const [searchOpacity, setSearchOpacity] = useState(1)
  const [loaded] = useFonts({
    nunitoReg: require('./assets/fonts/Nunito-Regular.ttf'),
    nunitoBold: require('./assets/fonts/Nunito-Bold.ttf'),
    nunitoBlack: require('./assets/fonts/Nunito-Black.ttf'),
    yeseva: require('./assets/fonts/YesevaOne-Regular_v2.otf')
  })

  if(!loaded) {
    return null;
  }

  const setAuth = (token, username) => {
    setToken(token);
    setUsername(username);
  };

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ gestureEnabled: false }}>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          initialParams={{ setAuth: setAuth }}
          options={{
            headerBackVisible: false,
            headerStyle: { backgroundColor: colors.dark },
            headerTitleStyle: { color: colors.white, fontFamily: 'yeseva', fontSize: 30 },
            title : '' }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          initialParams={{ token: token, setCalendarId: setCalendarId }}
          options={({ navigation }) => ({
            headerBackVisible: false,
            headerStyle: { backgroundColor: colors.dark },
            headerTitleStyle: { color: colors.white, fontFamily: 'yeseva', fontSize: 30 },
          })
          }
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          initialParams={{ setAuth: setAuth }}
          options={{ 
            headerBackTitle: 'Log In',
            headerStyle: { backgroundColor: colors.dark },
            headerTitleStyle: { color: colors.white, fontFamily: 'yeseva', fontSize: 30 },
            title : 'Register' }}
        />
        <Stack.Screen
          name="Calendar"
          component={CalendarScreen}
          initialParams={{
            setSelectedDate: setSelectedDate,
            selectedDate: selectedDate,
            token: token,
          }}
          options={({ navigation }) => ({
            headerStyle: { backgroundColor: colors.dark },
            headerTitleStyle: { color: colors.white,  fontFamily: 'yeseva', fontSize: 30 },
            headerRight: () => (
              <>
                <Pressable
                  onPress={() =>
                    navigation.navigate("Search", {
                      setSelectedDate: setSelectedDate,
                      selectedDate: selectedDate,
                      setRefresh: setRefresh,
                      refresh: refresh,
                      token: token,
                      calendarId: calendarId,
                    })
                  }
                  style={{opacity: addOpacity}}
                  onPressIn={() => setAddOpacity(.5)} onPressOut={() => setAddOpacity(1)}
                ><Image style={styles.icon} source={require("./assets/searchicon.png")}/></Pressable>
                <Pressable
                  style={{marginLeft: 15, opacity: searchOpacity}}
                  onPress={() =>
                      navigation.navigate("Add", {
                        setSelectedDate: setSelectedDate,
                        selectedDate: selectedDate,
                        setRefresh: setRefresh,
                        refresh: refresh,
                        token: token,
                        calendarId: calendarId,
                      })
                  }
                  onPressIn={() => setSearchOpacity(.5)} onPressOut={() => setSearchOpacity(1)}
                ><Image style={styles.icon} source={require("./assets/plusicon.png")}/></Pressable>
              </>
            ),
          })}
        />
        <Stack.Screen
          name="Add"
          component={NewEntryScreen}
          options={{
            headerStyle: { backgroundColor: colors.dark },
            headerTitleStyle: { color: colors.white, fontFamily: 'yeseva', fontSize: 30 },
          }}
        />
        <Stack.Screen
          name="Search"
          component={SearchScreen}
          options={{
            headerStyle: { backgroundColor: colors.dark },
            headerTitleStyle: { color: colors.white, fontFamily: 'yeseva', fontSize: 30 },
          }}
        />
        <Stack.Screen
          name="Day"
          component={DayScreen}
          initialParams={{ editDay: !editDay, token: token, setRefresh: setRefresh, refresh: !refresh}}
          options={({ navigation }) => ({
            headerStyle: { backgroundColor: colors.dark },
            headerTitleStyle: { color: colors.white, fontFamily: 'yeseva', fontSize: 30 },
          })
          }
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  icon: {
    height: 25, 
    width: 25,
  },
})