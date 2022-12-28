import { useEffect, useState } from "react";
import { View, Text, TextInput, StyleSheet, Pressable, ScrollView } from "react-native";
import SearchScroll from "./SearchScroll";
import colors from "../colors";
import { requestCalendarsEntries, requestTagSearch } from "./Requests";

export default function SearchScreen({route}) {
  const [searchString, setSearchString] = useState("");
  const [results, setResults] = useState([''])
  const [noResults, setNoResults] = useState('')

  // useEffect(() => {
  //   requestCalendarsEntries(route.params.token, route.params.calendarId).then((response)=>
  //   setResults(response.data.journals))
  // }, [])

  // const tags = results.map((entries) => 
  //   entries.tags)

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
    <Pressable onPress={handleSubmit} style={styles.search}>
      <Text>Search</Text>
    </Pressable>
    {results.length === 0 || !calId.includes(route.params.calendarId) ? (results.length === 0 && <Text style={{margin: 20}}>No results</Text>) : (<SearchScroll 
      results={results}
      calendarId={route.params.calendarId}/>)}

    </View>
  );
}
const styles = StyleSheet.create({
  background: {
    flex:1,
    backgroundColor: colors.background,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  input: {
    borderWidth: 2,
    borderColor: colors.dark,
    borderRadius: 5,
    margin: 10,
    width: "80%",
    height: 30,
    padding: 3,
    backgroundColor: colors.white,
  },
  search: {
    backgroundColor: colors.bright,
    borderWidth: 2,
    borderColor: colors.dark,
    borderRadius: 5,
    height: 40,
    width: 60,
    justifyContent: "center",
    alignItems: "center",
  },
});
