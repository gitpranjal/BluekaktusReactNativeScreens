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


import Colors from "../../constants/colors"
import { Dimensions } from 'react-native';
import { TouchableOpacity } from "react-native";
import { FlatList } from "react-native";
import { SearchBar } from "react-native-elements"

import BulkOrderSuperItem from "../components/BulkOrderSuperItem"
import ModalDropdown from 'react-native-modal-dropdown'

const screenHeight = Dimensions.get('window').height
const screenWidth = Dimensions.get('window').width

const BulkOrderListScreen = () => {

    const companyID = 1
    const userID = 13
    const ApiUrl = "https://qualitylite.bluekaktus.com"


    const [FactoryList, SetFactoryList] = useState([])
    const [BulkOrderList, SetBulkOrderList] = useState([])
    const [Factory, SetFactory] = useState({})
    const [SearchBarText, SetSearchBarText] = useState("")
    const [FilteredList, SetFilteredList] = useState([])
    const [SelectedOrder, SetSelectedOrder] = useState({})

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
          SetFilteredList(newBulkOrderList)
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

            <View>

            <ModalDropdown 
            options={['option 1', 'option 2']}
            style={{padding: 10, borderWidth: 2, borderColor: "black", borderRadius: 4, marginVertical: 5}}
            textStyle={{color: "grey", fontWeight: "bold", fontSize: 15}}
            dropdownTextStyle={{color: "black"}}
            onSelect={() => {
              
            }}
            />

              <SearchBar
                placeholder="Search by order brand or style"
                placeholderTextColor={Colors.primaryColor}
              
                containerStyle={{
                  backgroundColor: "#f6f5f5",
                  borderBottomColor: "transparent",
                  borderTopColor: "transparent",
                  
                }}
                inputContainerStyle={{
                  backgroundColor: "#b5b5b580",
                  marginHorizontal: -7,
                  marginVertical: 10,
                  width: Dimensions.get("window").width/1.06
                  
                }}
                editable={true}
                value={SearchBarText}
                onChangeText={(text) => {
                  SetSearchBarText(text)
                  // searchBarFilter(text)
                }}
              />

              <View id="Bulk order list" style={{backgroundColor: "#f0f8ff", height: 0.74*Dimensions.get("window").height}}>
                
              

                <FlatList 
                    data={FilteredList}
                    keyExtractor={(BulkOrderData) => BulkOrderData.orderID.toString()}
                    renderItem={({item}) => {
                    return (
                    

                    <TouchableOpacity
                      
                      onPress={() => {
                        SetSelectedOrder({
                          "brandID": item.brandID,
                          "brandName": item.brandName,
                          "orderID": item.orderID,
                          "orderNo": item.orderNo,
                          "styleID": item.styleID,
                          "styleNo": item.styleNo

                        })

                      }}
                    
                    >

                      <BulkOrderSuperItem
                        brandName={item.brandName}
                        orderNo={item.orderNo}
                        styleNo={item.styleNo}
                        brandID={item.brandID}
                        orderID={item.orderID}
                        styleID={item.styleID}
                      />
                    </TouchableOpacity>
                      
                    )
                    }}
                />

              </View>

            </View>

            
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