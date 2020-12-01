
import React, { Component, useState } from 'react';
import {
  Image,
  StyleSheet,
  View,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  Text
} from 'react-native';

import ExpoPixi from 'expo-pixi'
import {captureRef as takeSnapShotAsync} from "react-native-view-shot"
import { TouchableHighlight } from 'react-native-gesture-handler';


const ImageDrawing = () => {

   const [CurrentUri, SetCurrentUri] = useState("bhupp bhosdike")

    const color = 0xff0000;
    const width = 5;
    const alpha = 0.5;
    var sketch = ""
    const onChange = async ({ width, height }) => {
      const options = {
        format: 'jpg', /// PNG because the view has a clear background
        quality: 0.1, /// Low quality works because it's just a line
        result: 'file',
        height,
        width
      };
      /// Using 'Expo.takeSnapShotAsync', and our view 'this.sketch' we can get a uri of the image
      const uri = await takeSnapShotAsync(sketch, options);
      // console.log(uri)
      SetCurrentUri(uri)
    };

    return (

      <ScrollView style={styles.container}>
        <ImageBackground 
          source={{uri: "https://asia.olympus-imaging.com/content/000107507.jpg"}} 
          style={{width: "100%", height: 400}}
          ref={ref => sketch = ref}
          >
          <ExpoPixi.Sketch
            strokeColor={color}
            strokeWidth={width}
            strokeAlpha={alpha}
            
            style={{ flex: 1 }}
            
            // onChange={onChange}
          />
        </ImageBackground>
        <TouchableOpacity
          style={{width: 200, height: 50, backgroundColor: "blue", borderRadius: 7, alignItems: "center", justifyContent: "center", alignSelf: "center", marginVertical: 10}}
          onPress={onChange}
        >
          <Text style={{color: "white", fontWeight: "bold", fontSize: 20}}>Save</Text>
        </TouchableOpacity>
        
        <Image
          source={{ uri: CurrentUri }}
          style={{ width: "100%", height: 400}}
        />

        
    </ScrollView>
    // <ExpoPixi.Sketch 
      // ref={ref => this.sketch = ref}
      // onChange={onChange}
    // />
    )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: '#ecf0f1',
  }
})

export default ImageDrawing