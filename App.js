import { Button } from "react-native";
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
import TaggedScreen from "./components/TaggedScreen.js";
import colors from "./colors.js";

LogBox.ignoreAllLogs();
const Stack = createNativeStackNavigator();

export default function App() {
  const [token, setToken] = useState(null);
  const [username, setUsername] = useState(null);
  const current = new Date();
  const currentDate = `${current.getFullYear()}-${current.getMonth() + 1
    }-${current.getDate()}`;
  const [selectedDate, setSelectedDate] = useState(currentDate);
  const [refresh, setRefresh] = useState(false);
  const [calendarId, setCalendarId] = useState("");
  const [settings, setSettings] = useState(true)
  const [loaded] = useFonts({
    marker: require('./assets/fonts/PermanentMarker.ttf'),
    lexie: require('./assets/fonts/LovelexieHandwritten.ttf'),
    timbra: require('./assets/fonts/Timbra_Sans_Bold.otf'),
    patrick: require('./assets/fonts/PatrickHand-Regular.ttf')
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
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          initialParams={{ token: token, setCalendarId: setCalendarId, settings: !settings }}
          options={({ navigation }) => ({
            headerBackVisible: false,
            headerStyle: { backgroundColor: colors.dark },
            headerTitleStyle: { color: colors.white, fontFamily: 'marker', fontSize: 30 },
            headerRight: () => (
              <>
                <Button
                  title="⚙️"
                  onPress={() => { setSettings(!settings), navigation.setParams({ settings: settings, setSettings: setSettings }) }}
                />
              </>
            )

          })
          }
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ headerTransparent: true,  fontFamily: 'marker', fontSize: 30, headerTitleStyle: {color: colors.dark} }}
          initialParams={{ setAuth: setAuth }}
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
            headerTitleStyle: { color: colors.white,  fontFamily: 'marker', fontSize: 30 },
            headerRight: () => (
              <>
                <Button
                  title="🔎"
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
                />
                <Button
                  title="+"
                  color={"white"}
                  onPress={
                    (() =>
                      navigation.navigate("Add", {
                        setSelectedDate: setSelectedDate,
                        selectedDate: selectedDate,
                        setRefresh: setRefresh,
                        refresh: refresh,
                        token: token,
                        calendarId: calendarId,
                      }))
                  }
                />
              </>
            ),
          })}
        />
        <Stack.Screen
          name="Add"
          component={NewEntryScreen}
          options={{
            headerStyle: { backgroundColor: colors.dark },
            headerTitleStyle: { color: colors.white, fontFamily: 'marker', fontSize: 30 },
          }}
        />
        <Stack.Screen
          name="Search"
          component={SearchScreen}
          options={{
            headerStyle: { backgroundColor: colors.dark },
            headerTitleStyle: { color: colors.white, fontFamily: 'marker', fontSize: 30 },
          }}
        />
        <Stack.Screen
          name="Day"
          component={DayScreen}
          options={{
            headerStyle: { backgroundColor: colors.dark },
            headerTitleStyle: { color: colors.white, fontFamily: 'marker', fontSize: 30 },
          }}
        />
          <Stack.Screen
          name="Tagged"
          component={TaggedScreen}
          options={{
            title: "Day",
            headerStyle: { backgroundColor: colors.dark },
            headerTitleStyle: { color: colors.white, fontFamily: 'marker', fontSize: 30 },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
