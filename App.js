import { Button } from "react-native";
import { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./components/LoginScreen.js";
import RegisterScreen from "./components/RegisterScreen.js";
import HomeScreen from "./components/HomeScreen.js";
import CalendarScreen from "./components/CalendarScreen.js";
import NewEntryScreen from "./components/NewEntryScreen.js";
import colors from "./colors.js";

const Stack = createNativeStackNavigator();

export default function App({ navigation }) {
  const [pizza, setPizza] = useState("pepperoni");

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerBackVisible: false,
            headerStyle: { backgroundColor: colors.dark },
            headerTitleStyle: { color: colors.white },
          }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ headerTransparent: true }}
        />
        <Stack.Screen
          name="Calendar"
          component={CalendarScreen}
          options={({ navigation }) => ({
            headerStyle: { backgroundColor: colors.dark },
            headerTitleStyle: { color: colors.white },
            headerRight: () => (
              <Button
                title="+"
                color={"white"}
                onPress={() => navigation.navigate("Add", { paramkey: pizza })}
              />
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}
