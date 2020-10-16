import React, { useState } from "react";
import { View, Text, Button, TouchableOpacity, Image, StyleSheet} from "react-native"
import { Dimensions } from 'react-native'
import {
  Alert,
  Modal,
  TextInput,
  TouchableHighlight,
  Keyboard
} from "react-native";

const { width, height } = Dimensions.get("window")

const TouchableImage = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [textInput, setTextInput] = useState('');
  const [x, setX] = useState(-1)
  const [y, setY] = useState(-1)
  
    return (
        <View style={{ flex: 1, backgroundColor: '#2196F3', alignItems: 'center', justifyContent: 'center' }}>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                Alert.alert("Modal has been closed.");
              }}
            >
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                <TextInput
                      style={{ ...styles.textInput, backgroundColor: 'white', margin: 7, width: 150, borderColor: "#F194FF", borderWidth:2}}
                      placeholder="Enter the defect"
                      maxLength={20}
                      onBlur={Keyboard.dismiss}
                      value={textInput}
                      onChangeText={newText => setTextInput(newText)}
                  />
                  
                  {/* #2196F3 */}
                  <TouchableHighlight
                    style={{ ...styles.openButton, backgroundColor: "#F194FF" }}
                    onPress={() => {
                      console.log("Defect: "+textInput+"  X coord: "+x+" Y coord: "+y)
                      setModalVisible(!modalVisible);
                    }}
                  >
                    <Text style={styles.textStyle}>Submit</Text>
                  </TouchableHighlight>
                </View>
              </View>
            </Modal>
            <TouchableOpacity onPress = { (event) => {

              // x = event.nativeEvent.locationX
              // y = event.nativeEvent.locationY
              setX(event.nativeEvent.locationX)
              setY(event.nativeEvent.locationY)
              setModalVisible(true)
              // getDefectCoordinates(event)
            
            }}
              style={{}}
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
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22
    },
    modalView: {
      margin: 20,
      backgroundColor: "#2196F3",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5
    },
    openButton: {
      backgroundColor: "#F194FF",
      borderRadius: 20,
      padding: 10,
      elevation: 2
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center"
    },
    circle: {
      width: 2,
      height: 2,
      borderRadius: 2,
      backgroundColor: 'red'
  }
  });
  
  export default TouchableImage