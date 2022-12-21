import { ScrollView, View, Text } from "react-native"

export default function SearchScroll(results) {
    return (
        <ScrollView>
            <View>
                {console.log(results.results)}
                {results.results.map((things) => <><Text>{things.date}</Text></>)}
            </View>
            
        </ScrollView>

    )
}
