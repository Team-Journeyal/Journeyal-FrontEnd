import React from 'react'
import { View, StyleSheet, Dimensions, Image } from "react-native"

export const SLIDER_WIDTH = Dimensions.get('window').width + 80
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.75)

const CarouselCardItem = ({ item, index }) => {
  return (
    <View style={styles.container} key={index}>
      <Image
        source={{ uri: item.image}}
        style={styles.image}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 8,
    width: ITEM_WIDTH,
    shadowColor: "#000",
    shadowOffset: {
      width: 5,
      height: 5,
    },
    marginBottom: 15,
    shadowOpacity: 0.6,
    shadowRadius: 5,
    elevation: 7,
  },
  image: {
    width: ITEM_WIDTH,
    height: 300,
    borderRadius: 5,
  },
})

export default CarouselCardItem