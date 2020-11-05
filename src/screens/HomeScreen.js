import React from "react";
import { Text, StyleSheet, View, Button} from "react-native";

const HomeScreen = (props) => {
  return (
    <View>
    <Text style={styles.text}>Choose an options</Text>
    <Button
        onPress = {() => {
          props.navigation.navigate('ImageScreen')
        }}
        title = "Go to Image screen"
    />

    <Button
        onPress = {() => {
          props.navigation.navigate('TextInputModal')
        }}
        title = "Go to modal screen"
    />
    <Button
        onPress = {() => {
          props.navigation.navigate('ScrollableDefectsInfo')
        }}
        title = "Go to scrollable defects screen"
    />
    <Button
        onPress = {() => {
          props.navigation.navigate('userListScreen')
        }}
        title = "Go to userList screen"
    />
    <Button
        onPress = {() => {
          props.navigation.navigate('InspectionForm')
        }}
        title = "Go to InspectionForm"
    />
    <Button
        onPress = {() => {
          props.navigation.navigate('BulkOrderListScreen')
        }}
        title = "Go to BulkOrderList screen"
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
