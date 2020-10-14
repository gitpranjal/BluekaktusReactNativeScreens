import React from "react";
import { Text, StyleSheet, View, Button} from "react-native";

const HomeScreen = (props) => {
  return (
    <View>
    <Text style={styles.text}>Choose an options</Text>
    <Button
        onPress = {() => {
          console.log("Touched")
          props.navigation.navigate('ImageScreen')
        }}
        title = "Go to Image screen"
    />

    <Button
        onPress = {() => {
          console.log("Touched")
          props.navigation.navigate('TextInputModal')
        }}
        title = "Go to modal screen"
    />
    
  </View>
  )
};

const styles = StyleSheet.create({
  text: {
    fontSize: 30
  }
});

export default HomeScreen;
