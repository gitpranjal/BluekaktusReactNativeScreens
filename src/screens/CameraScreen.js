import {StatusBar} from 'expo-status-bar'
import React from 'react'
import {StyleSheet, Text, View, TouchableOpacity, Alert} from 'react-native'
import {Camera} from 'expo-camera'

export default function CameraScreen(props) {

  // const [startCamera,setStartCamera] = React.useState(false)
  
  var camera = ""

  // const __startCamera = async () => {
  //   const {status} = await Camera.requestPermissionsAsync()
  //   if (status === 'granted') {
  //     // start the camera
  //     setStartCamera(true)
  //   } else {
  //     Alert.alert('Access denied')
  //   }
  // }

  

  const __takePicture = async () => {
    if (!camera) return
    const photo = await camera.takePictureAsync()
    // Alert.alert(photo.uri)
    props.callback(photo)
  }

    return (
        <Camera
        style={{flex: 1,width:"100%", justifyContent: "flex-end"}}
        ref={(r) => {
          camera = r
        }}
      >
          <TouchableOpacity
            style={{width: 150, height: 50, alignSelf: "center", backgroundColor: "white", marginBottom: 20, alignItems: "center", justifyContent: "center"}}
            onPress={__takePicture}
          >
              <Text>Click</Text>
          </TouchableOpacity>
      </Camera>
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