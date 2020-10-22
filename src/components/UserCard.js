import React from "react";
import { Text, StyleSheet, View, Button} from "react-native";

const userCard = (props) => {
  return (
    <View style={styles.card}>
    <Text style={styles.title}>{props.userCardData.userFName}</Text>
    <Text >{props.userCardData.loginID}</Text>
    <Text >{props.userCardData.phoneNo}</Text>
  </View>
  )
};

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    alignSelf: "stretch",
    color: "white",
    backgroundColor: "#4682b4"
  },
  card: {
    borderColor: "#4682b4",
    borderWidth: 2,
    height: 100,
    

  }
});

export default userCard;
