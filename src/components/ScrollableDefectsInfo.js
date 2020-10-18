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


const  ScrollableDefectsInfo = (props) => {

    const [modalVisible, setModalVisible] = useState(false);
    const [DefectText, SetDefectText] = useState('');
    const [DefectCoordinateX, SetDefectCoordinateX] = useState(-1)
    const [DefectCoordinateY, SetDefectCoordinateY] = useState(-1)

    const [DefectDetailmodalVisible, SetDefectDetailmodalVisibility] = useState(false);
    

    return (
        <View style={styles.floatView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={DefectDetailmodalVisible}
                onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                }}
            >
                  <View style={styles.centeredView} >
                  <View style={{...styles.modalView, width:"60%", height: "40%", backgroundColor:"#00008b"}}>
                      <ScrollView showsVerticalScrollIndicator={true}>
                        <Text style={{color:"white"}}>{DefectText}</Text>
                      </ScrollView>
                      <TouchableHighlight
                        style={{ ...styles.openButton, backgroundColor: "#ff69b4", top:"-4%" }}
                        onPress={() => {
                            console.log("#####"+DefectText)
                            SetDefectDetailmodalVisibility(!DefectDetailmodalVisible);
                        }}
                        >
                        <Text style={{...styles.textStyle}}>Okay</Text>
                    </TouchableHighlight>
                    </ View>
                  </ View>
                  
            </Modal>


            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                }}
            >
                <View style={styles.centeredView}>
                    <View style={{...styles.modalView, width:"90%", height: "75%", backgroundColor: "#ba55d3"}}>
                    
                      <TouchableOpacity onPress = {() => SetDefectDetailmodalVisibility(true)}>
                        <Text style={styles.defectTextHeading}>{DefectText}</Text>
                      </TouchableOpacity>
                    

                    <View>
                      
                      <ImageBackground
                        style={{width: 300, height: 350, right:"0%", top: "7%"}}
                        source={{
                        uri: props.source,
                        // flex:1
                        }}
                      >
                          <View style={{...styles.circle, left:DefectCoordinateX, top:DefectCoordinateY}}></View>
                      </ImageBackground>
                    </View> 

                        <TouchableHighlight
                        style={{ ...styles.openButton, backgroundColor: "#00008b", top:"15%" }}
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
                // style={{flex: 1}}
                // contentContainerStyle={{ flexDirection: 'column', flexGrow: 1}}
                // data={[{key:"1", text:"AFYFJGFJF"}, {key:"2", text:"B"}, {key:"3", text:"B"}, {key:"4", text:"B"}, {key:"5", text:"B"}]}
                data={props.markedDefects}
                renderItem={({item}) => {
                return (
                  
                    <TouchableHighlight
                      style={{...styles.openButtonForBottomScrollView, flexGrow: 1}}
                      onPress={() => {
                      setModalVisible(true);
                      SetDefectText(item.text)
                      SetDefectCoordinateX(item.x)
                      SetDefectCoordinateY(item.y)
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
      borderColor:"blue",
      borderWidth: 2,
      // flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22
      // elevation: 10
    },
    openButtonForBottomScrollView: {
        backgroundColor: "#00008b",
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
    height: "30%",
    bottom: "5%" ,
    alignSelf: 'center',
    // left: 40,
    backgroundColor: '#db7093',
  },
  defectTextHeading: {
    backgroundColor: '#00008b',
    color: 'white',
    width: "100%",
    borderRadius: 7,
    textAlign: 'center',
    fontWeight: 'bold',
    marginLeft: '5%',
    padding: "2%",
    fontSize:  27,
    marginTop: '-5%'
  }
  });

export default ScrollableDefectsInfo