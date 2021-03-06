import React, { useState } from "react";
import { View, Text, Button, TouchableOpacity, FlatList, StyleSheet} from "react-native"
import { Dimensions } from 'react-native'
import ScrollableDefectsInfo from "./ScrollableDefectsInfo"
import {
  Alert,
  Modal,
  TextInput,
  TouchableHighlight,
  Keyboard,
  ImageBackground
} from "react-native";



const TouchableImage = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [DefectTitleInput, setDefectTitle] = useState('');
  const [DefectDetailInput, setDefectDetail] = useState('')
  const [x, setX] = useState(-1)
  const [y, setY] = useState(-1)
  const [defectDotList, addDefectDot] = useState([])
  const [dotViewsList, addDefectDotView] = useState([])
  
    return (
      // style={{ flex: 1, backgroundColor: '#2196F3', alignItems: 'center', justifyContent: 'center' }}
        <View style={{backgroundColor: "#008080", width: Dimensions.get('window').width, height: Dimensions.get('window').height}}>
            
            
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
                <Text style={{color:"white", right: "37%"}}>TITLE</Text>
                <TextInput
                      style={{ ...styles.textInput, backgroundColor: 'white', margin: 7, width: 250, borderColor: "#F194FF", borderWidth:2}}
                      placeholder="Enter the defect title"
                      maxLength={20}
                      onBlur={Keyboard.dismiss}
                      value={DefectTitleInput}
                      onChangeText={(newText) => {
                        setDefectTitle(newText)
                      }}
                  />
                  <Text style={{color:"white", right: "35%"}}>DETAILS</Text>
                  <TextInput
                      style={{ ...styles.textInput, backgroundColor: 'white', margin: 7, width: 250, height:80, borderColor: "#F194FF", borderWidth:2}}
                      placeholder="Enter the defect details"
                      onBlur={Keyboard.dismiss}
                      value={DefectDetailInput}
                      onChangeText={(newText) => {
                        setDefectDetail(newText)
                      }}
                  />
                  
                  {/* #2196F3 */}
                  <TouchableHighlight
                    style={{ ...styles.openButton, backgroundColor: "#F194FF" }}
                    onPress={() => {
                      console.log("Defect: "+DefectTitleInput+"  X coord: "+x+" Y coord: "+y+" with detail"+ DefectDetailInput)
                      // console.log(defectDotList)
                      setModalVisible(!modalVisible);
                      addDefectDot(defectDotList.concat([{key: defectDotList.length.toString(), x: x, y: y, title: DefectTitleInput, text: DefectDetailInput}]))
                      // console.log("#Defect dotlist after adding element##")
                      // console.log(defectDotList)
                      setDefectDetail("")
                      setDefectTitle("")
                    }}
                  >
                    <Text style={styles.textStyle}>Done</Text>
                  </TouchableHighlight>
                </View>
              </View>
            </Modal>
            
            <View style={{...styles.logo}}>
            
            <TouchableOpacity onPress = { (event) => {

              // x = event.nativeEvent.locationX
              // y = event.nativeEvent.locationY
              setX(event.nativeEvent.locationX)
              setY(event.nativeEvent.locationY)
              // defectDotList.push({key: defectDotList.length.toString(), x: event.nativeEvent.locationX, y: event.nativeEvent.locationY})
              setModalVisible(true)
              addDefectDotView(dotViewsList.concat([<View key={dotViewsList.length.toString()} style={{...styles.circle, left:event.nativeEvent.locationX, top:event.nativeEvent.locationY}}></View>]))
              
              // getDefectCoordinates(event)

              }}
              >
            
            <ImageBackground
              style={{width: 300, height: 350}}
              source={{
              uri: props.source,
              // flex:1
              }}
            >
            {/* <FlatList 
              contentContainerStyle={{ flexGrow: 1 }}
              // style={{width: '100%', height: '100%'}}
              data={defectDotList}
              renderItem={({item}) => {
                // console.log(item)
              
                return <View  style={{...styles.circle, left:item.x, top:item.y}}></View>
              }}
            /> */}
            
            {/* <View style={{...styles.circle, left:defectDotList[defectDotList.length-1].x, top:defectDotList[defectDotList.length-1].y}}></View> */}
      
            {dotViewsList}
            

            </ImageBackground>
            
            </TouchableOpacity>
             
            

            </View>
            
            <ScrollableDefectsInfo 
                source={props.source}
                markedDefects={defectDotList}
            /> 
            
        </View>
    )
}

// const getDots = (defectotList) => {
//   var dots = []
//   for( var item of defectotList)
//     dots.push(<View style={{...styles.circle, left:item.x, top:item.y}}></View>)
  
//     return dots
// }

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
      width: 300,
      height: 350,
      alignSelf: 'center',
      bottom: '-15%'

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
      width: 10,
      height: 10,
      borderRadius: 10,
      backgroundColor: 'red',
      position: "absolute"
  }
  });
  
  export default TouchableImage