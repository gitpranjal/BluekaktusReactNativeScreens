import {StatusBar} from 'expo-status-bar'
import React, { useState } from 'react'
import {StyleSheet, Text, View, TouchableOpacity, ImageBackground} from 'react-native'
import CameraScreen from "./CameraScreen"
import {Camera} from 'expo-camera'

export default function ImageOpeningButtonScreen(props) {

    const [StartCamera, SetStartCamera] = React.useState(false)
    const [ImgUri, SetImgUri] = React.useState("")
    c

    const __startCamera = async () => {
        const {status} = await Camera.requestPermissionsAsync()
        if (status === 'granted') {
          // start the camera
          SetStartCamera(true)
        } else {
          Alert.alert('Access denied')
        }
      }
  const ImageObjectList = []
  const getImageInfo = (PhotoObject, ImgObjectList) => {
    SetImgUri(PhotoObject.uri)
    SetStartCamera(false)
    ImgObjectList.push(PhotoObject)
    console.log("############ Current List ##################3")
    console.log(ImageObjectList)
  }

  if(StartCamera)
    return (
        <CameraScreen 
            // imageObjectList={ImageObjectList}
            callback={getImageInfo}
        ></CameraScreen>
    )
  return (
    <View style={{alignItems: "center", justifyContent: "center"}}>
        {(() => {
            if(ImgUri != "")
                return (
                    <ImageBackground
                    style={{width: 300, height: 350, marginHorizontal: 10, marginVertical: 10}}
                    source={{
                    uri: ImgUri,
                    // flex:1
                    }}
                ></ImageBackground>
                )
        })()}
        
      
        <TouchableOpacity
          style={{
            width: 130,
            borderRadius: 4,
            backgroundColor: '#14274e',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            height: 40
          }}
          onPress={__startCamera}
        >
          <Text
            style={{
              color: '#fff',
              fontWeight: 'bold',
              textAlign: 'center'
            }}
          >
            Take picture
          </Text>
        </TouchableOpacity>
      </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})