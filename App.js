import { Button } from "react-native";
import { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LogBox } from "react-native";
import LoginScreen from "./components/LoginScreen.js";
import RegisterScreen from "./components/RegisterScreen.js";
import HomeScreen from "./components/HomeScreen.js";
import CalendarScreen from "./components/CalendarScreen.js";
import NewEntryScreen from "./components/NewEntryScreen.js";
import SearchScreen from "./components/SearchScreen.js";
import colors from "./colors.js";

LogBox.ignoreAllLogs();
const Stack = createNativeStackNavigator();

export default function App() {
  const [token, setToken] = useState(null);
  const [username, setUsername] = useState(null);
  const current = new Date();
  const currentDate = `${current.getFullYear()}-${
    current.getMonth() + 1
  }-${current.getDate()}`;
  const [selectedDate, setSelectedDate] = useState(currentDate);
  const [refresh, setRefresh] = useState(false);
  const [calendarId, setCalendarId] = useState("");

  const setAuth = (token, username) => {
    setToken(token);
    setUsername(username);
  };


  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          initialParams={{ setAuth: setAuth }}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          initialParams={{ token: token, setCalendarId: setCalendarId}}
          options={({
            headerBackVisible: false,
            headerStyle: { backgroundColor: colors.dark },
            headerTitleStyle: { color: colors.white },
          
          })
        }
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ headerTransparent: true }}
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
            headerTitleStyle: { color: colors.white },
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
            headerTitleStyle: { color: colors.white },
          }}
        />
        <Stack.Screen
          name="Search"
          component={SearchScreen}
          options={{
            headerStyle: { backgroundColor: colors.dark },
            headerTitleStyle: { color: colors.white },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
