import React from "react"
import { View, Text, Button, TouchableOpacity, Image, StyleSheet} from "react-native"
import TouchableImage from "../components/TouchableImage"

const ImageScreen = () => {

    return (
        <TouchableImage
        source = "http://ai.bluekaktus.com/api/contourApi/static/contourImages/image-1602231948390.jpeg"
        />
    )
}

export default ImageScreen