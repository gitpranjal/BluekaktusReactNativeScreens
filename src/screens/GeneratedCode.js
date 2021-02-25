
import React, { useState, useEffect} from "react";
import {StyleSheet,Text,TextInput,View, TouchableOpacity, FlatList, ScrollView} from "react-native";
import SearchableDropdown from 'react-native-searchable-dropdown'
import { Dimensions } from 'react-native';
import RadioButtonRN from 'radio-buttons-react-native'
import SwitchSelector from "react-native-switch-selector"
import { FloatingLabelInput } from "react-native-floating-label-input"

const screenFunctions = {"frameSentence": (FieldsObjectList) => {
        var sentence = ""
        for (var FieldsObject of FieldsObjectList)
        {
          for(var key of Object.keys(FieldsObject))
          {
            sentence = sentence+key.toString()+":"+FieldsObject[key].toString()+"\n"
          }
        }
        
        return sentence
      },

      "getAqlList": () => {

        return [{"id":"1", "name": "1"}, {"id": "2", "name": "2"}, {"id": "3", "name": "2.5"}, {"id":4, "name":"4"}]
      },
      "getMaindefectsList": () => {

        return [{"id":"1", "name": "Defect1"}, {"id": "2", "name": "Defect2"}, {"id": "3", "name": "Defect3"}, {"id":4, "name":"Defect4"}]
      },
      "getFactoryList": () => {
        return [{"id":"1", "name": "Factory1"}, {"id": "2", "name": "Factory2"}]
      },

      "getAdhaarList": () => {
        return [{"id":"1", "name": "uvw1"}, {"id": "2", "name": "xyz2"}]
      },

      "addMainDefect": () => {

      },
      
    
    }
const GeneratedCode = () => {
  const [Sentence, SetSentence] = useState("")
  const [FieldList, SetFieldList] = useState({"brand":"","orderNo":"","orderQuantity":"","offeredQuantity":"","excessQuantity":"","factoryRepresentative":"Babu Rao Apte","packedQty":"","sampleSize":"","cartonSampleSize":"","CartonSelected":"","TotalCartons":"","columnB_id_0":"","columnC_id_0":"","columnB_id_1":"","columnC_id_1":"","mainCritical":"","mainMajor":"","mainMinor":"","mean":"","median":"","MiscellaneousDefect":"","missCritical":"","missMajor":"","missMinor":""})
  const [DropdownList, SetDropdownList] = useState({"AqlIndex":{"SelectedValue":"","ValuesListFunction":"getAqlList","ValuesListUrl":"","ValuesList":[{"id":"-1","name":"no values found"}]},"Factory":{"SelectedValue":"","ValuesListFunction":"","ValuesListUrl":"","ValuesList":[{"id":"-1","name":"no values found"}]},"MainDefect":{"SelectedValue":"","ValuesListFunction":"getMaindefectsList","ValuesListUrl":"","ValuesList":[{"id":"-1","name":"no values found"}]},"randomDropDown":{"SelectedValue":"","ValuesListUrl":"","ValuesList":[{"id":"-1","name":"no values found"}]}})
  const [RadioButtonList, SetRadioButtonList] = useState({"Inspection Type":"","columnD_id_0":"","columnD_id_1":"","Result":""})
  const [HybridDataObjects, SetHybridDataObjects] = useState({"checkList1":[{"id":"-1","columnA":"Column A","columnB":"Column B","columnZ":"Column Z","columnC":"Column C","columnD":"columnD"},{"id":"0","columnA":"Value 1","columnB":"INPUT:textInputField:columnB_id_0","columnZ":"Value Z1","columnC":"INPUT:textInputField:columnC_id_0","columnD":"INPUT:radioButton:columnD_id_0"},{"id":"1","columnA":"Value 2","columnB":"INPUT:textInputField:columnB_id_1","columnZ":"ValueZ2","columnC":"INPUT:textInputField:columnC_id_1","columnD":"INPUT:radioButton:columnD_id_1"}],"Main Defect":[{"id":"-1","MainDefect":"Main defect name","mainCritical":"Critical","mainMajor":"Major","mainMinor":"Minor","mean":"Mean","median":"Median"}],"Miss Defect":[{"id":"-1","MiscellaneousDefect":"Miscellaneous Defect","missCritical":"Critical","missMajor":"Major","missMinor":"Minor","randomDropDown":"A random value"}]})
  const [PlaceholderStates, SetPlaceholderStates] = useState({"DefectsSummary":{"totalCritical":"0","totalMajor":"0","totalMinor":"0"}})

  var dropdownObject = {...DropdownList}
  useEffect(() => {
    Object.keys(dropdownObject).forEach((field) => {
      if(dropdownObject[field].ValuesListUrl != "")
      {
        
        //useEffect(() => {
          console.log("########### Requesting url ############")
          console.log(dropdownObject[field].ValuesListUrl)
          fetch(
            dropdownObject[field].ValuesListUrl,
            {
              method: "POST",
              //body: JSON.stringify({
                
              //}),
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
              },
            }
          )
          .then(res => res.json())
          .then(body => {
            
            dropdownObject[field]["ValuesList"] = body
            console.log("########### Drop down object structure #########")
            console.log(dropdownObject)
            //SetDropdownList(dropdownObject)
          })
          .catch((error) => {
            console.log("############### Error fetching from url #############")
            console.log(error)
          })
        //}, [])
        
      }
    })
    SetDropdownList(dropdownObject)
  }, [])
  
  
  

  return (
    <ScrollView 
    contentContainerStyle={{alignItems: "center"}}
    keyboardShouldPersistTaps="always"
    >
       

  
  
  
  
  
  
  
  
  
  
  
  
  
<View id="mainSection" style={{borderWidth: 2, borderColor: "red", alignItems: "center", paddingVertical: 5, paddingHorizontal:5, marginHorizontal: 5}}>

  
  
      
      
   <View id="view1" style={{marginVertical: 10, borderWidth: 0, borderColor: "green", justifyContent: "center", alignItems: "center"}}>
  
      
      
          
      <View style={{flexDirection: "row"}}>
      
          
  
            <SearchableDropdown
               //On text change listner on the searchable input
                 onTextChange={(text) => console.log(text)}
                 onItemSelect={selectedObject => { 
                   var newDropdownList = {...DropdownList}
                   newDropdownList.AqlIndex["SelectedValue"] = selectedObject
                   console.log("#### New dropdown list ######")
                   console.log(newDropdownList)
                   SetDropdownList(newDropdownList)
                   
                 }}
                 selectedItems={DropdownList.AqlIndex["SelectedValue"]}
                 //onItemSelect called after the selection from the dropdown
                 containerStyle={{ padding: 8 ,width: "99%" ,
                 borderWidth:2,
                 borderRadius:10,
                 borderColor:"black",
                 marginHorizontal: 5,
                 marginVertical:5,
                 }}
                 //suggestion container style
                 textInputStyle={{
                   //inserted text style
                   paddingLeft:10,
                   fontSize: 15,
                   fontWeight: "bold",
                   color:"blue"
          
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
                   fontSize: 15,
                   fontWeight: "bold",
                   color:"blue",
                 }}
                 itemsContainerStyle={{
                   //items container style you can pass maxHeight
                   //to restrict the items dropdown hieght
                   maxHeight: '100%',
                 }}
                 items={DropdownList["AqlIndex"].ValuesList}
                 //mapping of item array
                 //default selected item index
                 placeholder={"Select AQL Value"}
                 placeholderTextColor="#00334e80"
                 //place holder for the search input
                 resetValue={false}
                 //reset textInput Value with true and false state
                 underlineColorAndroid="transparent"
                 //To remove the underline from the android input
             />
            
            
          
      </View>
      
      
      
      
          
      <View style={{flexDirection: "row"}}>
      
          
  
            <SearchableDropdown
               //On text change listner on the searchable input
                 onTextChange={(text) => console.log(text)}
                 onItemSelect={selectedObject => { 
                   var newDropdownList = {...DropdownList}
                   newDropdownList.Factory["SelectedValue"] = selectedObject
                   console.log("#### New dropdown list ######")
                   console.log(newDropdownList)
                   SetDropdownList(newDropdownList)
                   
                 }}
                 selectedItems={DropdownList.Factory["SelectedValue"]}
                 //onItemSelect called after the selection from the dropdown
                 containerStyle={{ padding: 8 ,width: "99%" ,
                 borderWidth:2,
                 borderRadius:10,
                 borderColor:"black",
                 marginHorizontal: 5,
                 marginVertical:5,
                 }}
                 //suggestion container style
                 textInputStyle={{
                   //inserted text style
                   paddingLeft:10,
                   fontSize: 15,
                   fontWeight: "bold",
                   color:"blue"
          
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
                   fontSize: 15,
                   fontWeight: "bold",
                   color:"blue",
                 }}
                 itemsContainerStyle={{
                   //items container style you can pass maxHeight
                   //to restrict the items dropdown hieght
                   maxHeight: '100%',
                 }}
                 items={DropdownList["Factory"].ValuesList}
                 //mapping of item array
                 //default selected item index
                 placeholder={"Select Factory"}
                 placeholderTextColor="#00334e80"
                 //place holder for the search input
                 resetValue={false}
                 //reset textInput Value with true and false state
                 underlineColorAndroid="transparent"
                 //To remove the underline from the android input
             />
            
            
          
      </View>
      
      
  </View>
  
  
  
  
      
      
   <View id="view2" style={{marginVertical: 10, borderWidth: 0, borderColor: "green", justifyContent: "center", alignItems: "center"}}>
  
      
      
          
      <View style={{flexDirection: "row"}}>
      
          
         <View style={{width: "99%", height: 45, marginHorizontal: 5}}>  
         <FloatingLabelInput
              label="Brand"
              labelStyles={{color: "grey", fontSize: 12, fontWeight: "bold"}}
          
              //containerStyles={{...styles.input,  width: "99%", height: 45}}
              inputStyles={{fontWeight: "bold", fontSize: 15, color: "blue"}}
              maxLength={50}
              value={FieldList["brand"]}
              editable={true}
              onChangeText = {(newValue) => {
                  var newFieldsObject = {...FieldList}
                  newFieldsObject["brand"] = newValue
                  SetFieldList(newFieldsObject)
              }}
          />
          </View>
            
          
      </View>
      
      
      
      
          
      <View style={{flexDirection: "row"}}>
      
          
         <View style={{width: "99%", height: 45, marginHorizontal: 5}}>  
         <FloatingLabelInput
              label="Order Number"
              labelStyles={{color: "grey", fontSize: 12, fontWeight: "bold"}}
          
              //containerStyles={{...styles.input,  width: "99%", height: 45}}
              inputStyles={{fontWeight: "bold", fontSize: 15, color: "blue"}}
              maxLength={50}
              value={FieldList["orderNo"]}
              editable={true}
              onChangeText = {(newValue) => {
                  var newFieldsObject = {...FieldList}
                  newFieldsObject["orderNo"] = newValue
                  SetFieldList(newFieldsObject)
              }}
          />
          </View>
            
          
      </View>
      
      
  </View>
  
  
  
  
      
   <View id="view3" style={{marginVertical: 10, borderWidth: 0, borderColor: "green", justifyContent: "center", alignItems: "center"}}>
  
      
      
          
          
      <View style={{flexDirection: "row"}}>
      
          
                <Text
                style={{...styles.input, width: "49%"}}
                >
                Date : 21-01-2021
                </Text> 
                    
          
          
              <Text
              style={{...styles.input, width: "49%"}}
              >
              Brand : {FieldList["brand"]}
              </Text> 
                  
          
      </View>
      
      
  </View>
  
  
  
  
      
      
   <View id="view4" style={{marginVertical: 10, borderWidth: 0, borderColor: "green", justifyContent: "center", alignItems: "center"}}>
  
      
      
          
          
      <View style={{flexDirection: "row"}}>
      
          
         <View style={{width: "49%", height: 45, marginHorizontal: 5}}>  
         <FloatingLabelInput
              label="Order Qty"
              labelStyles={{color: "grey", fontSize: 12, fontWeight: "bold"}}
          
              //containerStyles={{...styles.input,  width: "49%", height: 45}}
              inputStyles={{fontWeight: "bold", fontSize: 15, color: "blue"}}
              maxLength={50}
              value={FieldList["orderQuantity"]}
              editable={true}
              onChangeText = {(newValue) => {
                  var newFieldsObject = {...FieldList}
                  newFieldsObject["orderQuantity"] = newValue
                  SetFieldList(newFieldsObject)
              }}
          />
          </View>
            
          
          
         <View style={{width: "49%", height: 45, marginHorizontal: 5}}>  
         <FloatingLabelInput
              label="Offered Qty"
              labelStyles={{color: "grey", fontSize: 12, fontWeight: "bold"}}
          
              //containerStyles={{...styles.input,  width: "49%", height: 45}}
              inputStyles={{fontWeight: "bold", fontSize: 15, color: "blue"}}
              maxLength={50}
              value={FieldList["offeredQuantity"]}
              editable={true}
              onChangeText = {(newValue) => {
                  var newFieldsObject = {...FieldList}
                  newFieldsObject["offeredQuantity"] = newValue
                  SetFieldList(newFieldsObject)
              }}
          />
          </View>
            
          
      </View>
      
      
      
      
          
      <View style={{flexDirection: "row"}}>
      
          
         <View style={{width: "49%", height: 45, marginHorizontal: 5}}>  
         <FloatingLabelInput
              label="Excess Qty"
              labelStyles={{color: "grey", fontSize: 12, fontWeight: "bold"}}
          
              //containerStyles={{...styles.input,  width: "49%", height: 45}}
              inputStyles={{fontWeight: "bold", fontSize: 15, color: "blue"}}
              maxLength={50}
              value={FieldList["excessQuantity"]}
              editable={true}
              onChangeText = {(newValue) => {
                  var newFieldsObject = {...FieldList}
                  newFieldsObject["excessQuantity"] = newValue
                  SetFieldList(newFieldsObject)
              }}
          />
          </View>
            
          
      </View>
      
      
  </View>
  
  
  
  
      
   <View id="view5" style={{marginVertical: 10, borderWidth: 0, borderColor: "green", justifyContent: "center", alignItems: "center"}}>
  
      
      
          
      <View style={{flexDirection: "row"}}>
      
          
         <View style={{width: "99%", height: 45, marginHorizontal: 5}}>  
         <FloatingLabelInput
              label="Factory Representative"
              labelStyles={{color: "grey", fontSize: 12, fontWeight: "bold"}}
          
              //containerStyles={{...styles.input,  width: "99%", height: 45}}
              inputStyles={{fontWeight: "bold", fontSize: 15, color: "blue"}}
              maxLength={50}
              value={FieldList["factoryRepresentative"]}
              editable={false}
              onChangeText = {(newValue) => {
                  var newFieldsObject = {...FieldList}
                  newFieldsObject["factoryRepresentative"] = newValue
                  SetFieldList(newFieldsObject)
              }}
          />
          </View>
            
          
      </View>
      
      
  </View>
  
  
  
  
      
   <View id="view6" style={{marginVertical: 10, borderWidth: 2, borderColor: "green", justifyContent: "center", alignItems: "center"}}>
  
      
      
          
      <View style={{flexDirection: "row"}}>
      
          
            <View style={{borderColor: "green", borderRadius: 5, marginTop: 10, borderWidth: 0, width: "80%"}}>
                <Text style={{color: "blue", fontSize: 15, marginHorizontal: 10, marginTop: 10}}>Inspection Type</Text>
                <RadioButtonRN
                    style={{width: "80%", marginHorizontal: 25, marginBottom: 15}}
                    textStyle={{marginHorizontal: 10, fontSize: 12, fontWeight: "bold", color: "grey"}}
                    data={

                        (() => {
                          var labelList = []
                          for (var labelObject of [{"name":"Part Inspection"},{"name":"Normal Inspection"},{"name":"Sub Inspection"}])
                            labelList.push({label: labelObject.name})

                          return labelList
                        })()
                      }
                    selectedBtn={(SelectedOutcome) => {
                    
                    var newRadioButtonList = {...RadioButtonList}
                    newRadioButtonList["Inspection Type"] = SelectedOutcome.label
                    SetRadioButtonList(newRadioButtonList)
                    
                    }}
                    circleSize={10}
                    boxStyle={{height: 45}}
                    deactiveColor="grey"
                    activeColor="green"
                    
                    // boxActiveBgColor={InspectionOutcome == "FAILED" ? "#f08080" : "#90ee90"}

                />   
            </View>
            
          
      </View>
      
      
  </View>
  
  
  
  
      
      
      
   <View id="view7" style={{marginVertical: 10, borderWidth: 0, borderColor: "green", justifyContent: "center", alignItems: "center"}}>
  
      
      
          
          
      <View style={{flexDirection: "row"}}>
      
          
         <View style={{width: "49%", height: 45, marginHorizontal: 5}}>  
         <FloatingLabelInput
              label="Packed Quantity"
              labelStyles={{color: "grey", fontSize: 12, fontWeight: "bold"}}
          
              //containerStyles={{...styles.input,  width: "49%", height: 45}}
              inputStyles={{fontWeight: "bold", fontSize: 15, color: "blue"}}
              maxLength={50}
              value={FieldList["packedQty"]}
              editable={true}
              onChangeText = {(newValue) => {
                  var newFieldsObject = {...FieldList}
                  newFieldsObject["packedQty"] = newValue
                  SetFieldList(newFieldsObject)
              }}
          />
          </View>
            
          
          
         <View style={{width: "49%", height: 45, marginHorizontal: 5}}>  
         <FloatingLabelInput
              label="sampleSize"
              labelStyles={{color: "grey", fontSize: 12, fontWeight: "bold"}}
          
              //containerStyles={{...styles.input,  width: "49%", height: 45}}
              inputStyles={{fontWeight: "bold", fontSize: 15, color: "blue"}}
              maxLength={50}
              value={FieldList["sampleSize"]}
              editable={true}
              onChangeText = {(newValue) => {
                  var newFieldsObject = {...FieldList}
                  newFieldsObject["sampleSize"] = newValue
                  SetFieldList(newFieldsObject)
              }}
          />
          </View>
            
          
      </View>
      
      
      
      
          
          
      <View style={{flexDirection: "row"}}>
      
          
         <View style={{width: "49%", height: 45, marginHorizontal: 5}}>  
         <FloatingLabelInput
              label="cartonSampleSize"
              labelStyles={{color: "grey", fontSize: 12, fontWeight: "bold"}}
          
              //containerStyles={{...styles.input,  width: "49%", height: 45}}
              inputStyles={{fontWeight: "bold", fontSize: 15, color: "blue"}}
              maxLength={50}
              value={FieldList["cartonSampleSize"]}
              editable={true}
              onChangeText = {(newValue) => {
                  var newFieldsObject = {...FieldList}
                  newFieldsObject["cartonSampleSize"] = newValue
                  SetFieldList(newFieldsObject)
              }}
          />
          </View>
            
          
          
         <View style={{width: "49%", height: 45, marginHorizontal: 5}}>  
         <FloatingLabelInput
              label="CartonSelected"
              labelStyles={{color: "grey", fontSize: 12, fontWeight: "bold"}}
          
              //containerStyles={{...styles.input,  width: "49%", height: 45}}
              inputStyles={{fontWeight: "bold", fontSize: 15, color: "blue"}}
              maxLength={50}
              value={FieldList["CartonSelected"]}
              editable={true}
              onChangeText = {(newValue) => {
                  var newFieldsObject = {...FieldList}
                  newFieldsObject["CartonSelected"] = newValue
                  SetFieldList(newFieldsObject)
              }}
          />
          </View>
            
          
      </View>
      
      
      
      
          
      <View style={{flexDirection: "row"}}>
      
          
         <View style={{width: "49%", height: 45, marginHorizontal: 5}}>  
         <FloatingLabelInput
              label="TotalCartons"
              labelStyles={{color: "grey", fontSize: 12, fontWeight: "bold"}}
          
              //containerStyles={{...styles.input,  width: "49%", height: 45}}
              inputStyles={{fontWeight: "bold", fontSize: 15, color: "blue"}}
              maxLength={50}
              value={FieldList["TotalCartons"]}
              editable={true}
              onChangeText = {(newValue) => {
                  var newFieldsObject = {...FieldList}
                  newFieldsObject["TotalCartons"] = newValue
                  SetFieldList(newFieldsObject)
              }}
          />
          </View>
            
          
      </View>
      
      
  </View>
  
  
  
  
      
   <View id="view8" style={{marginVertical: 10, borderWidth: 0, borderColor: "green", justifyContent: "center", alignItems: "center"}}>
  
      
    <View id ="checkList1 table" style={{marginVertical: 10, width: "100%", }}>
    <ScrollView horizontal id="checkList1 table" contentContainerStyle={{flexDirection: "column"}}>
    
      <View style={{flexDirection: "row", paddingVertical: 5, backgroundColor: "blue",  borderRadius: 5, justifyContent: "flex-start", alignItems: "center",}}>
        <FlatList
          id="Headings"
          data={(() => {
            var sampleObjectWithIdNegative1 = {}
            for(var obj of HybridDataObjects["checkList1"])
            {
              if(obj["id"] == "-1")
                sampleObjectWithIdNegative1 = obj
            }
            return Object.values(sampleObjectWithIdNegative1).filter((columnName) => columnName != "-1")
          })() }
          keyExtractor={(columnName) => columnName}
          contentContainerStyle = {{flexDirection: "row"}}
          renderItem = {({item}) => {
            return <Text numberOfLines={10} style={{color: "white", width: 120, textAlign: 'center', fontWeight: "bold", fontSize: 12, }}>{item}</Text>
          }}
        />
      </View>
      <FlatList
        id="Table content"
        data={HybridDataObjects["checkList1"].filter((rowObject) => rowObject.id != "-1")}
        keyExtractor={(dataObject) => dataObject.id.toString()}
        contentContainerStyle = {{borderColor: "black",}}
        renderItem = {({item}) => {
          var currentRowArray = []
          var i = 0
          for(var key of Object.keys(item))
          {
            if(key == "id")
              continue

            currentRowArray.push({"id": i.toString(), "value": item[key], "type": key})
            i += 1
          }
          return (
            
            <FlatList 
              id="rowContent"
              data={currentRowArray}
              keyExtractor={(currentElementObject) => currentElementObject.id.toString()}
              style={{paddingVertical: 5, flexDirection: "row", borderWidth: 2, borderColor: "red", borderRadius: 5, justifyContent: "flex-start",  alignItem: "center", alignItems: "center"}}
              renderItem = {({item}) => {
                
                if((item["value"].toString()).split(":")[0]  == "INPUT")
                {
                  
                  
                  const InputKey = (item["value"].toString()).split(":")[2].toString()
                  const InputType = (item["value"].toString()).split(":")[1].toString()

                  if(InputType == "radioButton")
                  {
                    return (
                      <SwitchSelector
                                    options={ [
                                        { label: "PASS", value: "passed" },
                                        { label: "FAIL", value: "failed" },
                                      ]}
                                    initial={-1}
                                    onPress={(value) => {
                                      var newRadioButtonList = {...RadioButtonList}
                                      newRadioButtonList[InputKey] = value
                                      SetRadioButtonList(newRadioButtonList)
                                    }}
                                    textColor={"black"} //'#7a44cf'

                                    selectedColor={"green"}
                                    buttonColor={"red"}
                                    borderColor={"blue"}
                                    hasPadding
                                    style={{width: 100, marginHorizontal: 10}}
                                    height={25}
                                    textStyle={{fontSize:10, fontWeight: "bold"}}
                                    selectedTextStyle={{fontSize:10, fontWeight: "bold"}}
                                    borderRadius={8}
                           />
                    )
                  }
                  if(InputType == "textInputField")
                  {  
                    return (
                      <TextInput
                      // style= {{marginLeft: 4, color: "blue"}}
                      style={{borderBottomColor:'black', paddingHorizontal: 15, fontSize: 10, borderBottomWidth: 1, paddingVertical: 3, marginHorizontal: 15, width: 90}}
                      placeholder={""}
                      placeholderTextColor={"grey"}
                      maxLength={50}
                      // onBlur={Keyboard.dismiss}
                      value={FieldList[InputKey]}
                      editable={true}
                      onChangeText = {(newValue) => {
                          var newFieldsObject = {...FieldList}
                          newFieldsObject[InputKey] = newValue
                          SetFieldList(newFieldsObject)
                      }}
                  /> 
                    )
                  }

                }

                return <Text numberOfLines={10} style={{textAlign: 'center', width: 120, color: "grey", fontWeight: "bold", fontSize: 10,}}>{item.value}</Text>
              }}
              
            />
           
          )
        }}
      />
    
    </ScrollView>
    </View>
    
      
  </View>
  
  
  
  
      
   <View id="view9" style={{marginVertical: 10, borderWidth: 2, borderColor: "green", justifyContent: "center", alignItems: "center"}}>
  
      
      
      
      
      
      
     <View id="subview1" style={{marginVertical: 10, borderWidth: 0, borderColor: "green", justifyContent: "center", alignItems: "center"}}>
    
      
      
          
      <View style={{flexDirection: "row"}}>
      
          
  
            <SearchableDropdown
               //On text change listner on the searchable input
                 onTextChange={(text) => console.log(text)}
                 onItemSelect={selectedObject => { 
                   var newDropdownList = {...DropdownList}
                   newDropdownList.MainDefect["SelectedValue"] = selectedObject
                   console.log("#### New dropdown list ######")
                   console.log(newDropdownList)
                   SetDropdownList(newDropdownList)
                   
                 }}
                 selectedItems={DropdownList.MainDefect["SelectedValue"]}
                 //onItemSelect called after the selection from the dropdown
                 containerStyle={{ padding: 8 ,width: "99%" ,
                 borderWidth:2,
                 borderRadius:10,
                 borderColor:"black",
                 marginHorizontal: 5,
                 marginVertical:5,
                 }}
                 //suggestion container style
                 textInputStyle={{
                   //inserted text style
                   paddingLeft:10,
                   fontSize: 15,
                   fontWeight: "bold",
                   color:"blue"
          
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
                   fontSize: 15,
                   fontWeight: "bold",
                   color:"blue",
                 }}
                 itemsContainerStyle={{
                   //items container style you can pass maxHeight
                   //to restrict the items dropdown hieght
                   maxHeight: '100%',
                 }}
                 items={DropdownList["MainDefect"].ValuesList}
                 //mapping of item array
                 //default selected item index
                 placeholder={"Select Main defect name"}
                 placeholderTextColor="#00334e80"
                 //place holder for the search input
                 resetValue={false}
                 //reset textInput Value with true and false state
                 underlineColorAndroid="transparent"
                 //To remove the underline from the android input
             />
            
            
          
      </View>
      
      
      
      
          
          
          
      <View style={{flexDirection: "row"}}>
      
          
            <TextInput
             // style= {{marginLeft: 4, color: "blue"}}
             style={{...styles.input, width: "32.333333333333336%"}}
             placeholder={"Critical"}
             placeholderTextColor={"grey"}
             maxLength={50}
             // onBlur={Keyboard.dismiss}
             value={FieldList["mainCritical"]}
             editable={true}
             onChangeText = {(newValue) => {
                 var newFieldsObject = {...FieldList}
                 newFieldsObject["mainCritical"] = newValue
                 SetFieldList(newFieldsObject)
             }}
         /> 
            
          
          
            <TextInput
             // style= {{marginLeft: 4, color: "blue"}}
             style={{...styles.input, width: "32.333333333333336%"}}
             placeholder={"Major"}
             placeholderTextColor={"grey"}
             maxLength={50}
             // onBlur={Keyboard.dismiss}
             value={FieldList["mainMajor"]}
             editable={true}
             onChangeText = {(newValue) => {
                 var newFieldsObject = {...FieldList}
                 newFieldsObject["mainMajor"] = newValue
                 SetFieldList(newFieldsObject)
             }}
         /> 
            
          
          
            <TextInput
             // style= {{marginLeft: 4, color: "blue"}}
             style={{...styles.input, width: "32.333333333333336%"}}
             placeholder={"Minor"}
             placeholderTextColor={"grey"}
             maxLength={50}
             // onBlur={Keyboard.dismiss}
             value={FieldList["mainMinor"]}
             editable={true}
             onChangeText = {(newValue) => {
                 var newFieldsObject = {...FieldList}
                 newFieldsObject["mainMinor"] = newValue
                 SetFieldList(newFieldsObject)
             }}
         /> 
            
          
      </View>
      
      
      
      
          
          
      <View style={{flexDirection: "row"}}>
      
          
            <TextInput
             // style= {{marginLeft: 4, color: "blue"}}
             style={{...styles.input, width: "32.333333333333336%"}}
             placeholder={"Mean"}
             placeholderTextColor={"grey"}
             maxLength={50}
             // onBlur={Keyboard.dismiss}
             value={FieldList["mean"]}
             editable={true}
             onChangeText = {(newValue) => {
                 var newFieldsObject = {...FieldList}
                 newFieldsObject["mean"] = newValue
                 SetFieldList(newFieldsObject)
             }}
         /> 
            
          
          
            <TextInput
             // style= {{marginLeft: 4, color: "blue"}}
             style={{...styles.input, width: "32.333333333333336%"}}
             placeholder={"Median"}
             placeholderTextColor={"grey"}
             maxLength={50}
             // onBlur={Keyboard.dismiss}
             value={FieldList["median"]}
             editable={true}
             onChangeText = {(newValue) => {
                 var newFieldsObject = {...FieldList}
                 newFieldsObject["median"] = newValue
                 SetFieldList(newFieldsObject)
             }}
         /> 
            
          
      </View>
      
      
      
      
          
      <View style={{flexDirection: "row"}}>
      
          
            <View style={{borderColor: "green", borderRadius: 5, marginTop: 10, borderWidth: 0, width: "80%"}}>
              <TouchableOpacity
                style={{ ...styles.openButton, marginHorizontal: 10, marginVertical: 10, alignSelf: "center"}}
                onPress={() => {
                    
                    var fieldNames = [] 
                    for(var obj of HybridDataObjects["Main Defect"])
                    {
                      if(obj["id"] == "-1")
                      {
                        fieldNames = Object.keys(obj)
                        break
                      }
                    }
                    

                    var newRowObject = {}
                    var newFieldList = {...FieldList}
                    var newRadioButtonList = {...RadioButtonList}

                    

                    for(var fieldName of fieldNames)
                    {
                      if(fieldName in FieldList)
                      {
             
                        newRowObject[fieldName] = FieldList[fieldName]
                        newFieldList[fieldName] = ""
                        continue
                      }
                      if(fieldName in DropdownList)
                      {
                        newRowObject[fieldName] = DropdownList[fieldName].SelectedValue.name
                        continue
                      }
                      if(fieldName in RadioButtonList)
                      {
                        newRowObject[fieldName] = RadioButtonList[fieldName]
                        
                        newRadioButtonList[fieldName] = ""
                        
                        continue
                      }
                    }
                    
                    newRowObject["id"] = HybridDataObjects["Main Defect"].length

                    var newHybridObjectList = {...HybridDataObjects}
                    newHybridObjectList["Main Defect"].push(newRowObject)
                    console.log("####### Adding new row to table for Main Defect ############")
                    console.log(newRowObject)

                    console.log("############# Hybrid data object ##############")
                    console.log(newHybridObjectList)
                    SetHybridDataObjects(newHybridObjectList)

                    SetFieldList(newFieldList)
                    SetRadioButtonList(newRadioButtonList)

                    
                //From Placeholder AddMainDefect key
                var newPlaceholderStates = {...PlaceholderStates}
                var newTotalCritical = newPlaceholderStates.DefectsSummary.totalCritical != null  ? parseInt(newPlaceholderStates.DefectsSummary.totalCritical) : 0
                var newTotalMajor = newPlaceholderStates.DefectsSummary.totalMajor != null ? parseInt(newPlaceholderStates.DefectsSummary.totalMajor) : 0
                var newTotalMinor = newPlaceholderStates.DefectsSummary.totalMinor != null ? parseInt(newPlaceholderStates.DefectsSummary.totalMinor) : 0
                for (var MainDefectObject of HybridDataObjects["Main Defect"])
                {
                    if(MainDefectObject.id != "-1")
                    {
                        newTotalCritical += (parseInt(MainDefectObject.mainCritical))
                        newTotalMajor += (parseInt(MainDefectObject.mainMajor))
                        newTotalMinor += (parseInt(MainDefectObject.mainMinor))
                    }
                }
                newPlaceholderStates.DefectsSummary.totalCritical = newTotalCritical.toString()
                newPlaceholderStates.DefectsSummary.totalMajor = newTotalMajor.toString()
                newPlaceholderStates.DefectsSummary.totalMinor = newTotalMinor.toString()
                SetPlaceholderStates(newPlaceholderStates)
        
                }}
              >
                <Text style={styles.textStyle}>Add Main defect</Text>
      
              </TouchableOpacity>
            </View>
            
          
      </View>
      
      
      </View>
      
      
    <View id ="Main Defect table" style={{marginVertical: 10, width: "100%", }}>
    <ScrollView horizontal id="Main Defect table" contentContainerStyle={{flexDirection: "column"}}>
    
      <View style={{flexDirection: "row", paddingVertical: 5, backgroundColor: "blue",  borderRadius: 5, justifyContent: "flex-start", alignItems: "center",}}>
        <FlatList
          id="Headings"
          data={(() => {
            var sampleObjectWithIdNegative1 = {}
            for(var obj of HybridDataObjects["Main Defect"])
            {
              if(obj["id"] == "-1")
                sampleObjectWithIdNegative1 = obj
            }
            return Object.values(sampleObjectWithIdNegative1).filter((columnName) => columnName != "-1")
          })() }
          keyExtractor={(columnName) => columnName}
          contentContainerStyle = {{flexDirection: "row"}}
          renderItem = {({item}) => {
            return <Text numberOfLines={10} style={{color: "white", width: 120, textAlign: 'center', fontWeight: "bold", fontSize: 12, }}>{item}</Text>
          }}
        />
      </View>
      <FlatList
        id="Table content"
        data={HybridDataObjects["Main Defect"].filter((rowObject) => rowObject.id != "-1")}
        keyExtractor={(dataObject) => dataObject.id.toString()}
        contentContainerStyle = {{borderColor: "black",}}
        renderItem = {({item}) => {
          var currentRowArray = []
          var i = 0
          for(var key of Object.keys(item))
          {
            currentRowArray.push({"id": i.toString(), value: item[key], type: key})
            i += 1
          }
          return (
            
            <FlatList 
              id="rowContent"
              data={currentRowArray}
              keyExtractor={(currentElementObject) => currentElementObject.id.toString()}
              style={{paddingVertical: 5, flexDirection: "row", borderWidth: 2, borderColor: "red", borderRadius: 5, justifyContent: "flex-start",  alignItem: "center", alignItems: "center"}}
              renderItem = {({item}) => {
                if(item.type == "id")
                  return (
                    <View style={{flexDirection: "row",}}>
                      <TouchableOpacity
                          id="rowDeletion"
                          style={{backgroundColor: "red", width: 20, alignItems: "center", borderRadius: 5, justifyContent: "center", marginHorizontal: 10}}
                          onPress={() => {
                              console.log("deletion will take place")
                              var newHybridDataObjects = {...HybridDataObjects}
                              newHybridDataObjects["Main Defect"] = newHybridDataObjects["Main Defect"].filter((rowObject) => rowObject.id != item.value )
                              SetHybridDataObjects(newHybridDataObjects)
                          }}
                  
                      >
                          <Text style={{color: "white", fontSize: 15, fontWeight: "bold"}}>X</Text>
                      </TouchableOpacity> 
                      
                      {(() => {
                        if(currentRowArray.length > 10)
                          return (
                            <TouchableOpacity
                            id="ViewingDetail"
                            style={{borderColor: "grey", borderWidth: 2, borderRadius: 5, paddingHorizontal: 5, paddingVertical: 5}}
                            onPress={() => {
                                console.log("for viewing details")
                               
                            }}
                    
                        >
                            <Text style={{color: "grey", fontSize: 12, fontWeight: "bold"}}>Detail</Text>
                          </TouchableOpacity>   
                          )
                      })()}
                     
                    </View>  
                  )

                return <Text numberOfLines={10} style={{textAlign: 'center', width: 120, color: "grey", fontWeight: "bold", fontSize: 10,}}>{item.value}</Text>
              }}
              
            />
           
          )
        }}
      />
    
    </ScrollView>
    </View>
    
      
  </View>
  
  
  
  
      
   <View id="view10" style={{marginVertical: 10, borderWidth: 2, borderColor: "green", justifyContent: "center", alignItems: "center"}}>
  
      
      
      
      
      
      
     <View id="subview1" style={{marginVertical: 10, borderWidth: 0, borderColor: "green", justifyContent: "center", alignItems: "center"}}>
    
      
      
          
      <View style={{flexDirection: "row"}}>
      
          
            <TextInput
             // style= {{marginLeft: 4, color: "blue"}}
             style={{...styles.input, width: "99%"}}
             placeholder={"Miscellaneous Defect"}
             placeholderTextColor={"grey"}
             maxLength={50}
             // onBlur={Keyboard.dismiss}
             value={FieldList["MiscellaneousDefect"]}
             editable={true}
             onChangeText = {(newValue) => {
                 var newFieldsObject = {...FieldList}
                 newFieldsObject["MiscellaneousDefect"] = newValue
                 SetFieldList(newFieldsObject)
             }}
         /> 
            
          
      </View>
      
      
      
      
          
          
          
      <View style={{flexDirection: "row"}}>
      
          
            <TextInput
             // style= {{marginLeft: 4, color: "blue"}}
             style={{...styles.input, width: "32.333333333333336%"}}
             placeholder={"Critical"}
             placeholderTextColor={"grey"}
             maxLength={50}
             // onBlur={Keyboard.dismiss}
             value={FieldList["missCritical"]}
             editable={true}
             onChangeText = {(newValue) => {
                 var newFieldsObject = {...FieldList}
                 newFieldsObject["missCritical"] = newValue
                 SetFieldList(newFieldsObject)
             }}
         /> 
            
          
          
            <TextInput
             // style= {{marginLeft: 4, color: "blue"}}
             style={{...styles.input, width: "32.333333333333336%"}}
             placeholder={"Major"}
             placeholderTextColor={"grey"}
             maxLength={50}
             // onBlur={Keyboard.dismiss}
             value={FieldList["missMajor"]}
             editable={true}
             onChangeText = {(newValue) => {
                 var newFieldsObject = {...FieldList}
                 newFieldsObject["missMajor"] = newValue
                 SetFieldList(newFieldsObject)
             }}
         /> 
            
          
          
            <TextInput
             // style= {{marginLeft: 4, color: "blue"}}
             style={{...styles.input, width: "32.333333333333336%"}}
             placeholder={"Minor"}
             placeholderTextColor={"grey"}
             maxLength={50}
             // onBlur={Keyboard.dismiss}
             value={FieldList["missMinor"]}
             editable={true}
             onChangeText = {(newValue) => {
                 var newFieldsObject = {...FieldList}
                 newFieldsObject["missMinor"] = newValue
                 SetFieldList(newFieldsObject)
             }}
         /> 
            
          
      </View>
      
      
      
      
          
      <View style={{flexDirection: "row"}}>
      
          
  
            <SearchableDropdown
               //On text change listner on the searchable input
                 onTextChange={(text) => console.log(text)}
                 onItemSelect={selectedObject => { 
                   var newDropdownList = {...DropdownList}
                   newDropdownList.randomDropDown["SelectedValue"] = selectedObject
                   console.log("#### New dropdown list ######")
                   console.log(newDropdownList)
                   SetDropdownList(newDropdownList)
                   
                 }}
                 selectedItems={DropdownList.randomDropDown["SelectedValue"]}
                 //onItemSelect called after the selection from the dropdown
                 containerStyle={{ padding: 8 ,width: "99%" ,
                 borderWidth:2,
                 borderRadius:10,
                 borderColor:"black",
                 marginHorizontal: 5,
                 marginVertical:5,
                 }}
                 //suggestion container style
                 textInputStyle={{
                   //inserted text style
                   paddingLeft:10,
                   fontSize: 15,
                   fontWeight: "bold",
                   color:"blue"
          
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
                   fontSize: 15,
                   fontWeight: "bold",
                   color:"blue",
                 }}
                 itemsContainerStyle={{
                   //items container style you can pass maxHeight
                   //to restrict the items dropdown hieght
                   maxHeight: '100%',
                 }}
                 items={DropdownList["randomDropDown"].ValuesList}
                 //mapping of item array
                 //default selected item index
                 placeholder={"Select A random value"}
                 placeholderTextColor="#00334e80"
                 //place holder for the search input
                 resetValue={false}
                 //reset textInput Value with true and false state
                 underlineColorAndroid="transparent"
                 //To remove the underline from the android input
             />
            
            
          
      </View>
      
      
      
      
          
      <View style={{flexDirection: "row"}}>
      
          
            <View style={{borderColor: "green", borderRadius: 5, marginTop: 10, borderWidth: 0, width: "80%"}}>
              <TouchableOpacity
                style={{ ...styles.openButton, marginHorizontal: 10, marginVertical: 10, alignSelf: "center"}}
                onPress={() => {
                    
                    var fieldNames = [] 
                    for(var obj of HybridDataObjects["Miss Defect"])
                    {
                      if(obj["id"] == "-1")
                      {
                        fieldNames = Object.keys(obj)
                        break
                      }
                    }
                    

                    var newRowObject = {}
                    var newFieldList = {...FieldList}
                    var newRadioButtonList = {...RadioButtonList}

                    

                    for(var fieldName of fieldNames)
                    {
                      if(fieldName in FieldList)
                      {
             
                        newRowObject[fieldName] = FieldList[fieldName]
                        newFieldList[fieldName] = ""
                        continue
                      }
                      if(fieldName in DropdownList)
                      {
                        newRowObject[fieldName] = DropdownList[fieldName].SelectedValue.name
                        continue
                      }
                      if(fieldName in RadioButtonList)
                      {
                        newRowObject[fieldName] = RadioButtonList[fieldName]
                        
                        newRadioButtonList[fieldName] = ""
                        
                        continue
                      }
                    }
                    
                    newRowObject["id"] = HybridDataObjects["Miss Defect"].length

                    var newHybridObjectList = {...HybridDataObjects}
                    newHybridObjectList["Miss Defect"].push(newRowObject)
                    console.log("####### Adding new row to table for Miss Defect ############")
                    console.log(newRowObject)

                    console.log("############# Hybrid data object ##############")
                    console.log(newHybridObjectList)
                    SetHybridDataObjects(newHybridObjectList)

                    SetFieldList(newFieldList)
                    SetRadioButtonList(newRadioButtonList)

                    
                //From Placeholder AddMissDefect key
                var newPlaceholderStates = {...PlaceholderStates}
                var newTotalCritical = newPlaceholderStates.DefectsSummary.totalCritical != null  ? parseInt(newPlaceholderStates.DefectsSummary.totalCritical) : 0
                var newTotalMajor = newPlaceholderStates.DefectsSummary.totalMajor != null ? parseInt(newPlaceholderStates.DefectsSummary.totalMajor) : 0
                var newTotalMinor = newPlaceholderStates.DefectsSummary.totalMinor != null ? parseInt(newPlaceholderStates.DefectsSummary.totalMinor) : 0
                for (var MissDefectObject of HybridDataObjects["Miss Defect"])
                {
                    if(MissDefectObject.id != "-1")
                    {
                        newTotalCritical += (parseInt(MissDefectObject.missCritical))
                        newTotalMajor += (parseInt(MissDefectObject.missMajor))
                        newTotalMinor += (parseInt(MissDefectObject.missMinor))
                    }
                }
                newPlaceholderStates.DefectsSummary.totalCritical = newTotalCritical.toString()
                newPlaceholderStates.DefectsSummary.totalMajor = newTotalMajor.toString()
                newPlaceholderStates.DefectsSummary.totalMinor = newTotalMinor.toString()
                SetPlaceholderStates(newPlaceholderStates)
        
                }}
              >
                <Text style={styles.textStyle}>Add Miscellaneous Defect</Text>
      
              </TouchableOpacity>
            </View>
            
          
      </View>
      
      
      </View>
      
      
    <View id ="Miss Defect table" style={{marginVertical: 10, width: "100%", }}>
    <ScrollView horizontal id="Miss Defect table" contentContainerStyle={{flexDirection: "column"}}>
    
      <View style={{flexDirection: "row", paddingVertical: 5, backgroundColor: "blue",  borderRadius: 5, justifyContent: "flex-start", alignItems: "center",}}>
        <FlatList
          id="Headings"
          data={(() => {
            var sampleObjectWithIdNegative1 = {}
            for(var obj of HybridDataObjects["Miss Defect"])
            {
              if(obj["id"] == "-1")
                sampleObjectWithIdNegative1 = obj
            }
            return Object.values(sampleObjectWithIdNegative1).filter((columnName) => columnName != "-1")
          })() }
          keyExtractor={(columnName) => columnName}
          contentContainerStyle = {{flexDirection: "row"}}
          renderItem = {({item}) => {
            return <Text numberOfLines={10} style={{color: "white", width: 120, textAlign: 'center', fontWeight: "bold", fontSize: 12, }}>{item}</Text>
          }}
        />
      </View>
      <FlatList
        id="Table content"
        data={HybridDataObjects["Miss Defect"].filter((rowObject) => rowObject.id != "-1")}
        keyExtractor={(dataObject) => dataObject.id.toString()}
        contentContainerStyle = {{borderColor: "black",}}
        renderItem = {({item}) => {
          var currentRowArray = []
          var i = 0
          for(var key of Object.keys(item))
          {
            currentRowArray.push({"id": i.toString(), value: item[key], type: key})
            i += 1
          }
          return (
            
            <FlatList 
              id="rowContent"
              data={currentRowArray}
              keyExtractor={(currentElementObject) => currentElementObject.id.toString()}
              style={{paddingVertical: 5, flexDirection: "row", borderWidth: 2, borderColor: "red", borderRadius: 5, justifyContent: "flex-start",  alignItem: "center", alignItems: "center"}}
              renderItem = {({item}) => {
                if(item.type == "id")
                  return (
                    <View style={{flexDirection: "row",}}>
                      <TouchableOpacity
                          id="rowDeletion"
                          style={{backgroundColor: "red", width: 20, alignItems: "center", borderRadius: 5, justifyContent: "center", marginHorizontal: 10}}
                          onPress={() => {
                              console.log("deletion will take place")
                              var newHybridDataObjects = {...HybridDataObjects}
                              newHybridDataObjects["Miss Defect"] = newHybridDataObjects["Miss Defect"].filter((rowObject) => rowObject.id != item.value )
                              SetHybridDataObjects(newHybridDataObjects)
                          }}
                  
                      >
                          <Text style={{color: "white", fontSize: 15, fontWeight: "bold"}}>X</Text>
                      </TouchableOpacity> 
                      
                      {(() => {
                        if(currentRowArray.length > 10)
                          return (
                            <TouchableOpacity
                            id="ViewingDetail"
                            style={{borderColor: "grey", borderWidth: 2, borderRadius: 5, paddingHorizontal: 5, paddingVertical: 5}}
                            onPress={() => {
                                console.log("for viewing details")
                               
                            }}
                    
                        >
                            <Text style={{color: "grey", fontSize: 12, fontWeight: "bold"}}>Detail</Text>
                          </TouchableOpacity>   
                          )
                      })()}
                     
                    </View>  
                  )

                return <Text numberOfLines={10} style={{textAlign: 'center', width: 120, color: "grey", fontWeight: "bold", fontSize: 10,}}>{item.value}</Text>
              }}
              
            />
           
          )
        }}
      />
    
    </ScrollView>
    </View>
    
      
  </View>
  
  
  
  
      
   <View id="view11" style={{marginVertical: 10, borderWidth: 2, borderColor: "green", justifyContent: "center", alignItems: "center"}}>
  
      
      
          
      <View style={{flexDirection: "row"}}>
      
          
            <View style={{borderColor: "green", borderRadius: 5, marginTop: 10, borderWidth: 0, width: "80%"}}>
                <Text style={{color: "blue", fontSize: 15, marginHorizontal: 10, marginTop: 10}}>Result</Text>
                <RadioButtonRN
                    style={{width: "80%", marginHorizontal: 25, marginBottom: 15}}
                    textStyle={{marginHorizontal: 10, fontSize: 12, fontWeight: "bold", color: "grey"}}
                    data={

                        (() => {
                          var labelList = []
                          for (var labelObject of [{"name":"Passed"},{"name":"Failed"}])
                            labelList.push({label: labelObject.name})

                          return labelList
                        })()
                      }
                    selectedBtn={(SelectedOutcome) => {
                    
                    var newRadioButtonList = {...RadioButtonList}
                    newRadioButtonList["Result"] = SelectedOutcome.label
                    SetRadioButtonList(newRadioButtonList)
                    
                    }}
                    circleSize={10}
                    boxStyle={{height: 45}}
                    deactiveColor="grey"
                    activeColor="green"
                    
                    // boxActiveBgColor={InspectionOutcome == "FAILED" ? "#f08080" : "#90ee90"}

                />   
            </View>
            
          
      </View>
      
      
  </View>
  
  
  
  
      
      
      
   <View id="view12" style={{marginVertical: 10, borderWidth: 0, borderColor: "green", justifyContent: "center", alignItems: "center"}}>
  
      
      
          
      <View style={{flexDirection: "row"}}>
      
          
            <Text
            style={{...styles.input, width: "99%"}}
            >
            Total Critical Defect : {(
              () => {
                
           
            return PlaceholderStates.DefectsSummary.totalCritical
        
                
              }
              
              )()}
            </Text> 
                
          
      </View>
      
      
      
      
          
      <View style={{flexDirection: "row"}}>
      
          
            <Text
            style={{...styles.input, width: "99%"}}
            >
            Total Major Defect : {(
              () => {
                
            return PlaceholderStates.DefectsSummary.totalMajor
        
                
              }
              
              )()}
            </Text> 
                
          
      </View>
      
      
      
      
          
      <View style={{flexDirection: "row"}}>
      
          
            <Text
            style={{...styles.input, width: "99%"}}
            >
            Total Minor Defect : {(
              () => {
                
            return PlaceholderStates.DefectsSummary.totalMinor
        
                
              }
              
              )()}
            </Text> 
                
          
      </View>
      
      
  </View>
  
  
  
  
      
   <View id="view13" style={{marginVertical: 10, borderWidth: 0, borderColor: "green", justifyContent: "center", alignItems: "center"}}>
  
      
      
          
      <View style={{flexDirection: "row"}}>
      
          
            <View style={{borderColor: "green", borderRadius: 5, marginTop: 10, borderWidth: 0, width: "80%"}}>
              <TouchableOpacity
                style={{ ...styles.openButton, marginHorizontal: 10, width: "20%", marginVertical: 10, alignSelf: "center"}}
                onPress={() => {
                  var FieldsObjectList = [FieldList,DropdownList,RadioButtonList]
                  var newSentence = screenFunctions.frameSentence(FieldsObjectList)
                  SetSentence(newSentence)
                  //Some code from placeholder
              }}
              >
                <Text style={styles.textStyle}>Done</Text>
      
              </TouchableOpacity>
            </View>
            
          
      </View>
      
      
  </View>
  
  
</View>


        <Text style={{color: "grey", fontSize: 20, fontWeight: "bold", marginVertical: 10}}>{Sentence}</Text>
    
    </ScrollView>
  );
};

const styles = StyleSheet.create({
    input: {
        borderWidth: 2,
        paddingHorizontal: 15,
        borderColor: "black",
        padding: 3,
        marginVertical: 5,
        marginHorizontal: 5,
        color: "blue",
        fontSize: 15,
        fontWeight: "bold",
        borderRadius: 10,
        width: "100%"
       
       
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
      },
      openButton: {
        backgroundColor: "blue",
        borderRadius: 10,
        padding: 10,
        elevation: 10,

      }
});

export default GeneratedCode;

