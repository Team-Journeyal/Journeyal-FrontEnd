import { useState } from "react";
import { View, Text, TextInput, StyleSheet, Pressable, ScrollView } from "react-native";
import SearchScroll from "./SearchScroll";
import colors from "../colors";
import { requestTagSearch } from "./Requests";

export default function SearchScreen({route}) {
  const [searchString, setSearchString] = useState("");
  const [results, setResults] = useState([''])
  const [searchOpacity, setSearchOpacity] = useState(1)

  const handleSubmit = () => {
    requestTagSearch(route.params.token, searchString)
      .then((response) => setResults(response.data))    
    }

let calId = results.map((cal) => {
  return cal.calendar
})

  return (
    <View style={styles.background}>
    <TextInput autoCapitalize="none" autoCorrect={false} onChangeText={setSearchString} value={searchString} style={styles.input}/>
    <Pressable onPress={handleSubmit} style={[styles.search, {opacity: searchOpacity}]}
      onPressIn={() => setSearchOpacity(.5)} onPressOut={() => setSearchOpacity(1)}>
      <Text style={styles.font}>Search</Text>
    </Pressable>
    {results.length === 0 || !calId.includes(route.params.calendarId) ? (results.length === 0 && <Text style={{margin: 20}}>No results</Text>
    ) : (
    <SearchScroll 
      setSelectedDate={route.params.setSelectedDate}
      results={results}
      calendarId={route.params.calendarId}/>)}
    </View>
  );
}


const styles = StyleSheet.create({
  background: {
    flex:1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  font: {
    fontFamily: 'nunitoBold',
    color: colors.white,
    fontSize: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.dark,
    borderRadius: 5,
    margin: 10,
    width: "80%",
    height: 45,
    padding: 3,
    backgroundColor: colors.white,
    fontFamily: 'nunitoReg',
    fontSize: 20,
  },
  search: {
    backgroundColor: colors.bright,
    borderRadius: 5,
    height: 40,
    width: 80,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
});
