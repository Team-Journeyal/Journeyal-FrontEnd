import { View, Text, StyleSheet, Pressable } from "react-native";
import colors from "../colors";

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.background}>
      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate("Calendar")}
      >
        <Text style={styles.text}>Calendar</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    width: 200,
    height: 50,
    backgroundColor: colors.bright,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: colors.white,
  },
});
