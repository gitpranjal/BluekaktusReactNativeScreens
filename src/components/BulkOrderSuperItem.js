import React, { useState } from "react";
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Platform,
  Dimensions,
  FlatList,
  Image,
  TouchableNativeFeedback,
  Switch,
} from "react-native";
import Colors from "../../constants/colors";

class BulkOrderSuperItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      InspectionType: props.ACTIVITY_NAME,
      InspectionStatus: props.ACTIVITY_STATUS,
      PONumber:props.PO_NO,
      PRNumber: props.PR_NO,
      PRQty: props.PR_QTY,
      
    };
  }

  render() {
    const state = this.state;
    let TouchableCmp = TouchableOpacity;

    if (Platform.OS === "android" && Platform.Version >= 21) {
      TouchableCmp = TouchableNativeFeedback;
    }
    return (
        <View
        style={{
          backgroundColor: Colors.primaryColor,
          flex: 1,
          margin: 5,
          shadowColor: "black",
          shadowOpacity: 0.26,
          shadowOffset: { width: 0, height: 2 },
          shadowRadius: 10,
          elevation: 3,
          borderRadius: 3,
          overflow: "hidden",
        }}
        // onPress={state.onSelect}
      >
        {/* <TouchableOpacity activeOpacity={0.8} onPress={state.onSelect}> */}
          <View>
        
            <Text style={styles.desc} numberOfLines={1}>
              {"Inspection Type:  "+state.InspectionType.toUpperCase()}
            </Text>
            <Text style={styles.desc} numberOfLines={1}>
              {"Inspection Status:  "+state.InspectionStatus}
            </Text>
            <Text style={styles.desc} numberOfLines={1}>
              {"PO Number:  "+state.PONumber}
            </Text>
            <Text style={styles.desc} numberOfLines={1}>
              {"PR Number:  "+state.PRNumber}
            </Text>
            <Text style={styles.desc} numberOfLines={1}>
              {"PR Qty:  "+state.PRQty}
            </Text>
          </View>
        {/* </TouchableOpacity> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container2: {
    padding: 5,
    flexDirection: "row",
    alignContent: "flex-start",
    justifyContent: "space-between",
  },
  color: {
    paddingRight: 10,
    borderRadius: 4,
    fontSize: 25,
    paddingLeft:10,
    textAlign: "left",
    fontFamily: "robotoRegular",
    fontWeight: "bold",
    maxWidth: Dimensions.get("window").width / 1.2,
    color: Colors.accentColor,
  },
  desc: {
    marginHorizontal: 10,
    textAlignVertical: "top",
    marginBottom: 5,
    borderRadius: 4,
    fontSize: 20,
    textAlign: "left",
    fontFamily: "robotoRegular",
    maxWidth: Dimensions.get("window").width / 1.2,
    color: Colors.accentColor,
  },
  status: {
    marginTop: 6,
    marginLeft: 15,
    marginRight: 10,
    fontSize: 15,
    color: Colors.accentColor,
    textAlign: "center",
    fontFamily: "robotoRegular",
  },
});

export default BulkOrderSuperItem;
