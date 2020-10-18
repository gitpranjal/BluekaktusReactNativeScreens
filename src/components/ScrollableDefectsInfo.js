import React , { useState } from "react"
import { View, Text, Button, FlatList,TouchableOpacity, ImageBackground, StyleSheet} from "react-native"
import {
    Alert,
    Modal,
    TextInput,
    TouchableHighlight,
    Keyboard,
    ScrollView
  } from "react-native";


const  ScrollableDefectsInfo = () => {

    const [modalVisible, setModalVisible] = useState(false);
    const [DefectText, SetDefectText] = useState('');

    return (
        
        <View style={styles.floatView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                }}
            >
                <View style={styles.centeredView}>
                    <View style={{...styles.modalView, width:"90%", height: "60%"}}>
                    <View style={styles.textScrollViewStyle} >
                      <ScrollView>
                        <Text >{DefectText}</Text>
                      </ScrollView>
                    </ View>

                    <View>
                      
                      <ImageBackground
                        style={{width: "90%", height: "90%", right:"41%", top: "5%"}}
                        source={{
                        uri: "http://ai.bluekaktus.com/api/contourApi/static/contourImages/image-1602231948390.jpeg",
                        // flex:1
                        }}
                      >
                          <View style={{...styles.circle, left:0, top:0}}></View>
                      </ImageBackground>
                    </View> 

                        <TouchableHighlight
                        style={{ ...styles.openButton, backgroundColor: "#2196F3", top:"-3%" }}
                        onPress={() => {
                            console.log("#####"+DefectText)
                            setModalVisible(!modalVisible);
                        }}
                        >
                        <Text style={{...styles.textStyle}}>Gotcha!</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </Modal>
            <FlatList 
              contentContainerStyle={{ flexGrow: 1 }}
              data={[{key:"1", text:"A"}, {key:"2", text:"B"}, {key:"3", text:"B"}, {key:"4", text:"B"}, {key:"5", text:"B"}]}
              renderItem={({item}) => {
              return (
                <TouchableHighlight
                    style={styles.openButtonForBottomScrollView}
                    onPress={() => {
                    setModalVisible(true);
                    SetDefectText(item.text)
                    }}
                >
                <Text style={styles.textStyle}>{item.text}</Text>
                 </TouchableHighlight>

              )
              }}
            />

       
        

        </View>
    )
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
      bottom: '-20%'

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
      backgroundColor: "#2196F3",
      borderRadius: 20,
      padding: 10,
      elevation: 10
    },
    textScrollViewStyle: {
      backgroundColor: "white",
      borderRadius: 5,
      width: "90%",
      height: "10%",
      // elevation: 10
    },
    openButtonForBottomScrollView: {
        backgroundColor: "#2196F3",
        borderRadius: 7,
        padding: 15,
        elevation: 10,
        borderColor:"#F194FF",
        borderWidth:2
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
  },
  floatView: {
    position: 'absolute',
    width: '100%',
    height: "20%",
    bottom: 0 ,
    alignSelf: 'center',
    // left: 40,
    backgroundColor: '#F194FF',
  }
  });

export default ScrollableDefectsInfo