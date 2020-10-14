import React from "react"
import { View, Text, Button, TouchableOpacity, Image, StyleSheet} from "react-native"
import { Dimensions } from 'react-native'
const { width, height } = Dimensions.get("window")

const TouchableImage = (props) => {
    return (
        <View style={{ flex: 1, backgroundColor: 'blue', alignItems: 'center', justifyContent: 'center' }}>
            <TouchableOpacity onPress = { (event) => {getDefectCoordinates(event)}}
              style={{}}
              onLayout={({ nativeEvent }) => {
                console.log(nativeEvent.layout)
              }}
            >
            <Image
                style={styles.logo}
                resizeMode='contain'
                source={{
                uri: props.source,
                }}
            /> 
            </TouchableOpacity>
            
        </View>
    )
}

const getDefectCoordinates = (event) => {
  console.log(`x coord = ${event.nativeEvent.locationX} y coord = ${event.nativeEvent.locationY}`)
}

const styles = StyleSheet.create({
    container: {
      // paddingTop: 50,
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#00008b',
      
    },
    tinyLogo: {
      width: 50,
      height: 50,
    },
    logo: {
      width: width,
      height: height,
    },
  });
  
  export default TouchableImage