import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
  Keyboard,
  ScrollView,
  SafeAreaView
} from "react-native";

import SearchableDropdown from 'react-native-searchable-dropdown'
import { Dropdown } from 'react-native-material-dropdown'


import Colors from "../../constants/colors"
import { Dimensions } from 'react-native';
import { TouchableOpacity } from "react-native";
import { FlatList } from "react-native";

const screenHeight = Dimensions.get('window').height
const screenWidth = Dimensions.get('window').width

const BulkOrderListScreen = () => {

    const companyID = 1
    const userID = 13
    const ApiUrl = "https://qualitylite.bluekaktus.com"


    const [FactoryList, SetFactoryList] = useState([])
    const [BulkOrderList, SetBulkOrderList] = useState([])
    const [Factory, SetFactory] = useState({})

    useEffect(() => {

        fetch(
          `${ApiUrl}/api/bkQuality/companyFactory/getAllfactoryDetails`,
          {
            method: "POST",
            body: JSON.stringify({
              basicparams: {
                companyID: companyID,
              //   userID: 13,
              },
      
            }),
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        )
        .then(res => res.json())
        .then(body => {
          // SetUserRoleList(body.result)
          var newFactoryList = []
          console.log("############ Factory List ##########")
          
          body.result.forEach((factoryObject) => {
            const newFactoryObject = {id: factoryObject.factoryID, name: factoryObject.factoryName}
            newFactoryList.push(newFactoryObject)
          })
          console.log(body.result)
          
          SetFactoryList(newFactoryList)
        })
        .catch((error) => console.log(error)); //to catch the errors if any
  
      }, [])

      useEffect(() => {

        fetch(
          `${ApiUrl}/api/bkQuality/checking/getBOSList`,
          {
            method: "POST",
            body: JSON.stringify({
              basicparams: {
                companyID: companyID,
                  userID: userID,
              },
      
            }),
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        )
        .then(res => res.json())
        .then(body => {
          // SetUserRoleList(body.result)
          var newBulkOrderList = []
          console.log("############ Bulk Order List ##########")
          
          body.result.forEach((bulkOrderObject) => {
            const newBulkOrderObject = {...bulkOrderObject}
            newBulkOrderList.push(newBulkOrderObject)
          })
          console.log(newBulkOrderList)
          
          SetBulkOrderList(newBulkOrderList)
        })
        .catch((error) => console.log(error)); //to catch the errors if any
  
      }, [])


      return (
        <View style={{marginHorizontal: 10}}>
            <SearchableDropdown
              //On text change listner on the searchable input
              onTextChange={(text) => console.log(text)}
              onItemSelect={item => { SetFactory(item)
              }}
              selectedItems={Factory}
              //onItemSelect called after the selection from the dropdown
              containerStyle={{ padding: 8 ,width:Dimensions.get("window").width / 1.1 ,
               borderWidth:3,
               borderRadius:10,
               borderColor:Colors.primaryColor,
               marginTop: 10,
              }}
              //suggestion container style
              textInputStyle={{
                //inserted text style
                paddingLeft:10,
                fontSize: 20,
                fontWeight: "bold",
                color:Colors.primaryColor
    
              }}
              itemStyle={{
                //single dropdown item style
                padding: 3,
                marginLeft:5,
                width:Dimensions.get("window").width / 1.25 ,
                marginTop: 2,
                borderBottomColor:"#00334e80",
                borderBottomWidth: 1,
              }}
              itemTextStyle={{
                //text style of a single dropdown item
                fontSize: 18,
                fontWeight: "bold",
                color:Colors.primaryColor,
              }}
              itemsContainerStyle={{
                //items container style you can pass maxHeight
                //to restrict the items dropdown hieght
                maxHeight: '100%',
              }}
              items={FactoryList}
              //mapping of item array
              //default selected item index
              placeholder={"Select factory"}
              placeholderTextColor="#00334e80"
              //place holder for the search input
              resetValue={false}
              //reset textInput Value with true and false state
              underlineColorAndroid="transparent"
              //To remove the underline from the android input
            />
        </View>
    )



}



const Styles = StyleSheet.create({
    input: {
        borderWidth: 3,
        paddingLeft: 20,
        borderColor: Colors.primaryColor,
        padding: 8,
        marginTop: 40,
        color: Colors.primaryColor,
        fontSize: 20,
        fontWeight: "bold",
        borderRadius: 10,
        width: Dimensions.get("window").width / 1.1,
    },

})


export default BulkOrderListScreen