
import React, { useState, useEffect} from "react";
import {StyleSheet,Text,TextInput,View, TouchableOpacity, FlatList, ScrollView, Alert, ActivityIndicator} from "react-native";
import SearchableDropdown from 'react-native-searchable-dropdown'
import { Dimensions } from 'react-native';
import RadioButtonRN from 'radio-buttons-react-native'
import SwitchSelector from "react-native-switch-selector"
import { FloatingLabelInput } from "react-native-floating-label-input"
import ModalDropdown from 'react-native-modal-dropdown'
import styles from "../../assets/styles"

import AsyncStorage from '@react-native-async-storage/async-storage'

const screenFunctions = undefined

const storeData = async (key, value, CurrentScreenId, autoSave = true) => {
  //console.log("#################### screen id recieved in storeData function #############")
  //console.log(CurrentScreenId)
  //console.log("##################### value recieved in storeData function ##############")
  //console.log(value)
  autoSave = false
  if(!autoSave)
  {
    console.log("AutoSave is currently false")
    return
  }

  try {
    const currentCodeData = await getData(CurrentScreenId) 
    var newScreenData = currentCodeData != null ? {...currentCodeData} : null
    //const jsonValue = JSON.stringify(value)
    if(newScreenData != null)
      {    
        //if(newScreenData[key] != null)           // the key doesn't get removed otherwise and another object with same key is added
          //delete newScreenData[key]

        newScreenData[key] = value
      }
      
    else
      {
        newScreenData = {}
        newScreenData[key] = value
      }

      

      //console.log("############# Current screen  data with screen code "+ CurrentScreenId +" after updation #####################")
      //console.log(newScreenData)
    
     
    await AsyncStorage.setItem(CurrentScreenId, JSON.stringify(newScreenData))
    
    //console.log("######## stored key "+key+" with value #######")
  } catch (e) {
    // saving error
    console.log("################ Error saving value to asysync storage ###############")
    console.log(e)
  }
}

const getData = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key)
    return jsonValue != null ? JSON.parse(jsonValue) : null;
    //console.log("########### Got data from async storage ############")
    //console.log(jsonValue)
  } catch(e) {
    console.log("################ Error getting value from asysync storage ###############")
    console.log(e)
  }
}

const removeValue = async (key) => {
  try {
    await AsyncStorage.removeItem(key)
  } catch(e) {
    // remove error
    console.log("################### Error in deleting record for key "+key)
    console.log(e)
  }

  console.log("Romoval of data for screen with ID " + key + "Done")
}

const clearAll = async () => {
  try {
    await AsyncStorage.clear()
  } catch(e) {
    // clear error
  }
  console.log(' Clearing storage Done.')
}

const getCleanData = (currentScreenDataObject, FieldList = {}, DropdownList = {}, HybridDataObjects = {}, ChecklistDataObjects = {}, RadioButtonList = {}) => {


  console.log("############## Screen data object passed to getCleanData function ###################")
  console.log(currentScreenDataObject)

  var cleandataObject = {}

  if(currentScreenDataObject.screenBackgroundInfo != null)
    cleandataObject["screenBackgroundInfo"] = currentScreenDataObject.screenBackgroundInfo
  else
    console.log("############ No background information found for the screen to put in clean data ##################")

  if(currentScreenDataObject["FieldList"] == null)
    currentScreenDataObject["FieldList"] = FieldList
  
  if(currentScreenDataObject["DropdownList"] == null)
    currentScreenDataObject["DropdownList"] = DropdownList

  if(currentScreenDataObject["HybridDataObjects"] == null)
    currentScreenDataObject["HybridDataObjects"] = HybridDataObjects

  if(currentScreenDataObject["ChecklistDataObjects"] == null)
    currentScreenDataObject["ChecklistDataObjects"] = ChecklistDataObjects

  if(currentScreenDataObject["RadioButtonList"] == null)
    currentScreenDataObject["RadioButtonList"] = RadioButtonList

  Object.keys(currentScreenDataObject["FieldList"]).forEach(key => {
    cleandataObject[key] = currentScreenDataObject["FieldList"][key]
  })

  Object.keys(currentScreenDataObject["DropdownList"]).forEach(key => {
    cleandataObject[key] = currentScreenDataObject["DropdownList"][key]["SelectedValue"]["name"] != null ? currentScreenDataObject["DropdownList"][key]["SelectedValue"]["name"] : currentScreenDataObject["DropdownList"][key]["SelectedValue"]
  })

  Object.keys(currentScreenDataObject["HybridDataObjects"]).forEach(key => {
    cleandataObject[key] = currentScreenDataObject["HybridDataObjects"][key].filter(obj => {return obj.id != "-1"})
  })

  Object.keys(currentScreenDataObject["ChecklistDataObjects"]).forEach(key => {
    var currentChecklist = currentScreenDataObject["ChecklistDataObjects"][key].filter(obj => {return obj.id != "-1"})

  Object.keys(currentScreenDataObject["RadioButtonList"]).forEach(key => {
    cleandataObject[key] = currentScreenDataObject["RadioButtonList"][key]
  })

    var compactList = []
    for(var checklistObj of currentChecklist)
    {
      var compactObject = {"id": checklistObj["id"]}
        Object.keys(checklistObj).forEach(key => {
          if(checklistObj[key].type == null)
            return

            if(checklistObj[key].type == "textField")
            {
              compactObject[key] = checklistObj[key]["value"]
              return
            }
            if(checklistObj[key].type == "textInputField")
            {
              compactObject[key] = checklistObj[key]["value"]
              return
            }

            if(checklistObj[key].type == "dropdown")
            {
              compactObject[key] = checklistObj[key]["SelectedValue"].name != null ? checklistObj[key]["SelectedValue"].name : checklistObj[key]["SelectedValue"]
              return
            }

            if(checklistObj[key].type == "radioButton")
            {
              compactObject[key] = checklistObj[key]["value"]
              return
            }
          
          })
      
      compactList.push(compactObject)
    }

    cleandataObject[key] = compactList
  })

  return cleandataObject
}



            const CustomDataModifierFunction = (cleanDataFromScreen) => {

                var resultantObject = {}



                var targetObject = {
                    "saveInspList": [
                  {
                    "ORDER_ID": cleanDataFromScreen.screenBackgroundInfo["ORDER_ID"],
                    "PACKED_QTY": cleanDataFromScreen.packedqty,
                    "SAMPLE_SIZE":cleanDataFromScreen.samplesize ,
                    "INSPECTION_DATE": "2021-04-08 12:24:03",
                    "ACTUAL_RELEASE_TIME": "142",
                    "AQ_LEVEL": cleanDataFromScreen.aqllevel,
                    "MAX_MAJOR_ACCEPTANCE": "0",
                    "MAX_MINOR_ACCEPTANCE": "0",
                    "INSPECTION_REQUEST_ID": "0",
                    "INSPECTION_ACTIVITY_ID": cleanDataFromScreen.screenBackgroundInfo["ACTIVITY_ID"],
                    "USER_ID": "801",
                    "MOBILE_APP_VERSION": "A_1.17",
                    "INSPECTION_RECORD_TYPE": "ADH",
                    "DEFECT_LIST": [
                      {
                        "MAJOR": "1",
                        "MINOR": "1",
                        "TYPE": "Defect",
                        "DEFECT_ID": "58",
                        "MEASUREMENT_VALUE": "",
                        "CRITICAL": "0"
                      },
                      {
                        "MAJOR": "0",
                        "MINOR": "1",
                        "TYPE": "Measurement",
                        "DEFECT_ID": "0",
                        "MEASUREMENT_VALUE": "measurement def",
                        "CRITICAL": "0"
                      },
                      {
                        "MAJOR": "1",
                        "MINOR": "1",
                        "TYPE": "MISC Defect",
                        "DEFECT_ID": "0",
                        "MEASUREMENT_VALUE": "misc defect",
                        "CRITICAL": "0"
                      }
                    ],
                    "CHECK_LIST": [
                      {
                        "CHECK_LIST_ID": "123",
                        "CHECK_LIST_NAME": "Print",
                        "CHECK_STATUS": "1",
                        "REMARKS": "",
                        "BUYER_NAME": ""
                      },
                      {
                        "CHECK_LIST_ID": "111",
                        "CHECK_LIST_NAME": "Embroidery",
                        "CHECK_STATUS": "1",
                        "REMARKS": "",
                        "BUYER_NAME": ""
                      },
                      {
                        "CHECK_LIST_ID": "110",
                        "CHECK_LIST_NAME": "Embellishment",
                        "CHECK_STATUS": "1",
                        "REMARKS": "",
                        "BUYER_NAME": ""
                      },
                      {
                        "CHECK_LIST_ID": "106",
                        "CHECK_LIST_NAME": "Button",
                        "CHECK_STATUS": "1",
                        "REMARKS": "",
                        "BUYER_NAME": ""
                      },
                      {
                        "CHECK_LIST_ID": "128",
                        "CHECK_LIST_NAME": "Zipper",
                        "CHECK_STATUS": "0",
                        "REMARKS": "",
                        "BUYER_NAME": ""
                      },
                      {
                        "CHECK_LIST_ID": "119",
                        "CHECK_LIST_NAME": "Joker Tag",
                        "CHECK_STATUS": "1",
                        "REMARKS": "",
                        "BUYER_NAME": ""
                      },
                      {
                        "CHECK_LIST_ID": "126",
                        "CHECK_LIST_NAME": "Wash",
                        "CHECK_STATUS": "0",
                        "REMARKS": "",
                        "BUYER_NAME": ""
                      },
                      {
                        "CHECK_LIST_ID": "122",
                        "CHECK_LIST_NAME": "Polybag",
                        "CHECK_STATUS": "1",
                        "REMARKS": "",
                        "BUYER_NAME": ""
                      },
                      {
                        "CHECK_LIST_ID": "121",
                        "CHECK_LIST_NAME": "Main Label",
                        "CHECK_STATUS": "0",
                        "REMARKS": "",
                        "BUYER_NAME": ""
                      },
                      {
                        "CHECK_LIST_ID": "107",
                        "CHECK_LIST_NAME": "Care Label",
                        "CHECK_STATUS": "1",
                        "REMARKS": "",
                        "BUYER_NAME": ""
                      },
                      {
                        "CHECK_LIST_ID": "127",
                        "CHECK_LIST_NAME": "Weight [Gsm]",
                        "CHECK_STATUS": "0",
                        "REMARKS": "",
                        "BUYER_NAME": ""
                      },
                      {
                        "CHECK_LIST_ID": "116",
                        "CHECK_LIST_NAME": "Handfeel",
                        "CHECK_STATUS": "1",
                        "REMARKS": "",
                        "BUYER_NAME": ""
                      },
                      {
                        "CHECK_LIST_ID": "120",
                        "CHECK_LIST_NAME": "Loose Thread",
                        "CHECK_STATUS": "0",
                        "REMARKS": "",
                        "BUYER_NAME": ""
                      },
                      {
                        "CHECK_LIST_ID": "115",
                        "CHECK_LIST_NAME": "Garment Odor",
                        "CHECK_STATUS": "1",
                        "REMARKS": "",
                        "BUYER_NAME": ""
                      },
                      {
                        "CHECK_LIST_ID": "117",
                        "CHECK_LIST_NAME": "Hangtag",
                        "CHECK_STATUS": "0",
                        "REMARKS": "",
                        "BUYER_NAME": ""
                      },
                      {
                        "CHECK_LIST_ID": "118",
                        "CHECK_LIST_NAME": "Ironing",
                        "CHECK_STATUS": "1",
                        "REMARKS": "",
                        "BUYER_NAME": ""
                      },
                      {
                        "CHECK_LIST_ID": "113",
                        "CHECK_LIST_NAME": "Fold Size",
                        "CHECK_STATUS": "1",
                        "REMARKS": "",
                        "BUYER_NAME": ""
                      },
                      {
                        "CHECK_LIST_ID": "104",
                        "CHECK_LIST_NAME": "Barcode At Garment",
                        "CHECK_STATUS": "0",
                        "REMARKS": "",
                        "BUYER_NAME": ""
                      },
                      {
                        "CHECK_LIST_ID": "124",
                        "CHECK_LIST_NAME": "Ratio Pack",
                        "CHECK_STATUS": "1",
                        "REMARKS": "",
                        "BUYER_NAME": ""
                      },
                      {
                        "CHECK_LIST_ID": "109",
                        "CHECK_LIST_NAME": "Carton Qty Accuracy",
                        "CHECK_STATUS": "0",
                        "REMARKS": "",
                        "BUYER_NAME": ""
                      },
                      {
                        "CHECK_LIST_ID": "108",
                        "CHECK_LIST_NAME": "Carton Marking",
                        "CHECK_STATUS": "1",
                        "REMARKS": "",
                        "BUYER_NAME": ""
                      },
                      {
                        "CHECK_LIST_ID": "125",
                        "CHECK_LIST_NAME": "Visual Audit",
                        "CHECK_STATUS": "0",
                        "REMARKS": "",
                        "BUYER_NAME": ""
                      },
                      {
                        "CHECK_LIST_ID": "105",
                        "CHECK_LIST_NAME": "Bulk Garment Measurement",
                        "CHECK_STATUS": "1",
                        "REMARKS": "",
                        "BUYER_NAME": ""
                      },
                      {
                        "CHECK_LIST_ID": "112",
                        "CHECK_LIST_NAME": "Fabric Lab Test Report",
                        "CHECK_STATUS": "0",
                        "REMARKS": "",
                        "BUYER_NAME": ""
                      },
                      {
                        "CHECK_LIST_ID": "114",
                        "CHECK_LIST_NAME": "Garment Lab Test Report",
                        "CHECK_STATUS": "1",
                        "REMARKS": "",
                        "BUYER_NAME": ""
                      },
                      {
                        "CHECK_LIST_ID": "103",
                        "CHECK_LIST_NAME": "Availability Of Approved PP Sample",
                        "CHECK_STATUS": "0",
                        "REMARKS": "",
                        "BUYER_NAME": ""
                      },
                      {
                        "CHECK_LIST_ID": "136",
                        "CHECK_LIST_NAME": "RFID Security tag attached",
                        "CHECK_STATUS": "1",
                        "REMARKS": "",
                        "BUYER_NAME": ""
                      },
                      {
                        "CHECK_LIST_ID": "130",
                        "CHECK_LIST_NAME": "Others",
                        "CHECK_STATUS": "1",
                        "REMARKS": "checklist other remark",
                        "BUYER_NAME": ""
                      }
                    ],
                    "RESULT": cleanDataFromScreen.result ,
                    "IS_PARTIAL": "1",
                    "START_TIME": "2021-03-20 12:22:07",
                    "END_TIME": "2021-03-20 12:24:03",
                    "LATITUDE": "28.6879133",
                    "LONGITUDE": "77.2797417",
                    "INVOICE_NO": "",
                    "INVOICE_QTY": "",
                    "PROCESS_DEVIATION": "",
                    "MEASUREMENT_DEVIATION": cleanDataFromScreen.measurementDeviation,
                    "RE_INSPECTION": "N",
                    "CARTON_SAMPLE_SIZE": "1",
                    "CUT_QTY": "0.000",
                    "SELF_AUDIT": "0",
                    "MOBILE_REF_NO": "21032012220737641686118466",
                    "INLINE_INSPECTION_FLAG": "0",
                    "INTERIM_INSPECTION_FLAG": "0",
                    "COMMENT": cleanDataFromScreen.finalRemarks,
                    "FG1_QTY": "2",
                    "FG2_QTY": "",
                    "CARTON_SELECTED": "1",
                    "FACTORY_REPRESENTATIVE": cleanDataFromScreen.factoryrepresentative,
                    "FINAL_SAMPLE_SIZE": "",
                    "TOTAL_CARTONS_GOH": "2",
                    "RE_AUDIT": "0",
                    "TNA_ACTIVITY_ID": cleanDataFromScreen.screenBackgroundInfo["TNA_ACTIVITY_ID"],
                    "QFE_STATUS": "",
                    "SUSTAINABILITY": cleanDataFromScreen.buyername,               // This means buyer name
                    "GPT_REPORT_NO": "",
                    "GPT_APPROVAL_STATUS": "",
                    "GPT_APPROVAL_REMARK": "",
                    "TIMELINE": "",
                    "SUGGESTION_BY_LIFESTYLE": "",
                    "LOG_COMMERCIAL_APPROVAL": "",
                    "REMARK": "",
                    "PACKING_ACCURACY_CHECK": "",
                    "WAREHOUSE_LOCATION": "",
                    "DIGITAL_TAB_REMARK": "",
                    "PO_WISE_DT": [
                      {
                        "PO_NUMBER": "1",
                        "ORDER_QTY": "2",
                        "OFFERED_QTY": "3",
                        "BAL_QTY": "1"
                      }
                    ],
                    "ONHOLD_REASON": [],
                    "PASS_FAIL_REASON": [],
                    "PRODUCTION_STATUS": [],
                    "TOTAL_CTNS_FOR_SHIPMENT": ""
                  }
                ]
                }



                targetObject["saveInspList"][0]["DEFECT_LIST"] = []
                for (var defectObj of cleanDataFromScreen["maindefect"])
                {
                  var newDefectObject = {
                    "MAJOR": defectObj.maindefect_maj,
                    "MINOR": defectObj.maindefect_maj,
                    "TYPE": "Defect",
                    "DEFECT_ID": defectObj.maindefect_maj,
                    "MEASUREMENT_VALUE": "",
                    "CRITICAL": defectObj.maindefect_crit
                  }

                  targetObject["saveInspList"][0]["DEFECT_LIST"].push(newDefectObject)
                }

                for (var defectObj of cleanDataFromScreen["measurementdefect"])
                {
                  var newDefectObject = {
                    "MAJOR": defectObj.measurementdefect_maj,
                    "MINOR": defectObj.measurementdefect_min,
                    "TYPE": "Measurement",
                    "DEFECT_ID": "0",
                    "MEASUREMENT_VALUE": defectObj.measurementdefect,
                    "CRITICAL": defectObj.measurementdefect_crit
                  }
                  targetObject["saveInspList"][0]["DEFECT_LIST"].push(newDefectObject)
                }

                for (var defectObj of cleanDataFromScreen["miscdefect"])
                {
                  var newDefectObject = {
                    "MAJOR": defectObj.miscdefect_maj,
                    "MINOR": defectObj.miscdefect_min,
                    "TYPE": "MISC Defect",
                    "DEFECT_ID": "0",
                    "MEASUREMENT_VALUE": defectObj.miscdefect,
                    "CRITICAL": defectObj.miscdefect_crit
                  }
                  targetObject["saveInspList"][0]["DEFECT_LIST"].push(newDefectObject)
                }

                targetObject["saveInspList"][0]["CHECK_LIST"] = []

                for(var checklistObj of cleanDataFromScreen["auditchecklist"])
                {
                  var newChecklistObj = {
                    "CHECK_LIST_ID": checklistObj.id,
                    "CHECK_LIST_NAME": checklistObj.name,
                    "CHECK_STATUS": checklistObj.result,
                    "REMARKS": checklistObj.remarks,
                    "BUYER_NAME": ""
                  } 
                  targetObject["saveInspList"][0]["CHECK_LIST"].push(newDefectObject)
                }


                return targetObject
                




            }  // function definition ends
        
        


const GeneratedCode = (props) => {
  const [Sentence, SetSentence] = useState("")
  const [FieldList, SetFieldList] = useState({"buyername":"","pono":"","orderqty":"","offeredqty":"","excessshortqty":"","factoryrepresentative":"","pqqty_val":"","doneqty_val":"","cutqty_val":"","packedqty":"","samplesize":"","fg1qty":"","fg2qty":"","inserttotalnoofcarton":"","cartonsamplesize":"","cartonselected":"","maindefect_crit":"","maindefect_maj":"","maindefect_min":"","measurementdefect":"","measurementdefect_crit":"","measurementdefect_maj":"","measurementdefect_min":"","miscdefect":"","miscdefect_crit":"","miscdefect_maj":"","miscdefect_min":"","totalcritdefect":"","totalmajordefect":"","totalminordefect":"","totaldefect":"","defectrate":"","measurementDeviation":"","finalRemarks":""})
  const [DropdownList, SetDropdownList] = useState({"aqllevel":{"SelectedValue":"","ValuesListFunction":"","ValuesListUrl":"https://qualitylite.bluekaktus.com/api/bkQuality/auditing/getNestedAQLDetails","ValuesList":[{"id":"1","name":"option1"},{"id":"2","name":"option2"}]},"maindefect":{"SelectedValue":"","ValuesListUrl":"http://f096186048f0.ngrok.io/api/reactScreenTool/controls/getFormattedDefectsList","ValuesList":[{"id":"1","name":"option1"},{"id":"2","name":"option2"}]}})
  const [RadioButtonList, SetRadioButtonList] = useState({"result":""})
  const [HybridDataObjects, SetHybridDataObjects] = useState({"pono":[{"id":"-1","pono":"PO No","orderqty":"Order Qty","offeredqty":"Offered Qty","excessshortqty":"Excess/Short Qty"}],"maindefect":[{"id":"-1","maindefect":"Select Defect","maindefect_crit":"Critical","maindefect_maj":"Major","maindefect_min":"Minor"}],"measurementdefect":[{"id":"-1","measurementdefect":"Write Defect Description","measurementdefect_crit":"Critical","measurementdefect_maj":"Major","measurementdefect_min":"Minor"}],"miscdefect":[{"id":"-1","miscdefect":"Write Defect Description","miscdefect_crit":"Critical","miscdefect_maj":"Major","miscdefect_min":"Minor"}]})
  const [ChecklistDataObjects, SetChecklistDataObjects] = useState({"auditchecklist":[{"id":"-1","ApiUrl":"http://f096186048f0.ngrok.io/api/reactScreenTool/controls/getFormattedChecklistRows","name":{"type":"textField","title":"Name","options":[]},"result":{"type":"dropdown","title":"Result","options":[{"id":1,"name":"Ok"},{"id":2,"name":"Not Ok"},{"id":3,"name":"NA"}]},"remarks":{"type":"textInputField","title":"Remarks","options":[]}}]})
  const [PlaceholderStates, SetPlaceholderStates] = useState({"DefectsSummary":{"totalCritical":"0","totalMajor":"0","totalMinor":"0"}})
  const [CompleteCurrentScreenData, SetCompleteCurrentScreenData] = useState("")
  const [DataLoaded, SetDataLoaded] = useState(false)
  

  var CurrentScreenId = -1
  var CurrentScreenBackgroundInfo = {}

  

                CurrentScreenBackgroundInfo = props.navigation.getParam("orderInfo")
                CurrentScreenId = props.navigation.getParam("orderInfo")["TNA_ACTIVITY_ID"]

                


                useEffect(() => {

                    console.log("############# Current screen background information ##############")
                    console.log(CurrentScreenBackgroundInfo)

                    var newFieldList = {...FieldList}
                    newFieldList["pqqty_val"] = CurrentScreenBackgroundInfo["PR_QTY"]
                    newFieldList["doneqty_val"] = "0"
                    SetFieldList(newFieldList)
                    

                }, [])

  
            
  

  useEffect(() => {

    
    
    getData(CurrentScreenId)
    .then(data => {
      //console.log("################ Data for screen code "+ CurrentScreenId + " ###################")
      //console.log(data)

      //console.log(JSON.stringify(data, null, 4))
      if(data != null)
        
        {
          data["screenBackgroundInfo"] = CurrentScreenBackgroundInfo
          SetCompleteCurrentScreenData(data)
        }
      else
        SetCompleteCurrentScreenData({"screenBackgroundInfo": CurrentScreenBackgroundInfo })

      
      

// ################# Extracting Text input fields from async storage into the states ##############
      if(data != null && data["FieldList"] != null)
        SetFieldList(data["FieldList"])

// ################## Extracting dropdowns information from async storage into the states #######################

      if(data != null && data["DropdownList"] != null)
        SetDropdownList(data["DropdownList"])
      else
      // ######################## fetching the dropdown information from api since nothing present in async stotage #########
      {
        var tasks = []
        var dropdownsListObject = {...DropdownList}
        Object.keys(dropdownsListObject).forEach((dropdownObjectName) => {

          tasks.push((async (dropdownObject) => {
          dropdownObject = dropdownsListObject[dropdownObjectName]

          if(dropdownObject.ValuesListUrl == "" || dropdownObject.ValuesListUrl == null)
          {
            console.log("############### Couldn't find working or valid url for dropdown: "+dropdownObjectName)
            return
          }
          // fetching configurations should come from placeholder, following is the default configuration
          const fetchConfig = {
              method: "POST",
                    body: JSON.stringify({
                      "basicparams": {
                          "companyID": 84,
                          "userID": 13
                      }
                  }),
                    headers: {
                      "Content-Type": "application/json",
                      Accept: "application/json",
                    },
          }
          const response = await fetch(dropdownObject.ValuesListUrl, fetchConfig)
          var body = await response.json()

          body = body.result != null ? body.result : body
                var modifiedList = []
                if(body.length != 0)
                {
                  var idKey = ""
                  var valueKey = ""
                  for(var key of Object.keys(body[0]))
                  { 
                    
            if(dropdownObjectName == "aqllevel")
            {
            idKey = "aqlLevel"
            valueKey = "aqlLevel"
            continue
            }
        
                    if(key.toString().toLowerCase().includes("id"))
                    {
                      idKey = key
                      continue
                    }
                    if(key.toString().toLowerCase().includes("name") || key.toString().toLowerCase().includes("value"))
                    {
                      valueKey = key
                      continue
                    }
                  }
                  if(body[0][idKey] != null && body[0][valueKey] != null)
                  {
                    for( var obj of body)
                    {

                      var modifiedObject = {...obj}
                      modifiedObject["id"] = obj[idKey].toString()
                      modifiedObject["value"] = obj[valueKey].toString()
                      modifiedObject["name"] = obj[valueKey].toString()
    
                      modifiedList.push(modifiedObject)
                    }
                  }
                }
    
                
                
                dropdownsListObject[dropdownObjectName]["ValuesList"] = modifiedList
                //console.log("########### "+ dropdownObjectName +"Dropdown object after calling its API #########")
                //console.log(dropdownsListObject[dropdownObjectName])

          })(dropdownObjectName))

        })     // Loop ends here

        Promise.all(tasks)
        .then(() => {
          SetDropdownList(dropdownsListObject)
          //storeData("DropdownList", dropdownObject, CurrentScreenId)
          //console.log("################## Setting dropdown list object to ###################")
          //console.log(dropdownsListObject)
        })
        .catch(e => {
          console.log("############### Error in fetching dropdown list information ##########")
          console.log(e)
        })

      }     // dropdown fetching ends here

// ######################################## dropdown fetching ends ###############################################

// ################## Extracting checklist information from async storage into the states ###########################
      if(data != null && data["ChecklistDataObjects"] != null)
      {
        //console.log("######################### Checklist object from async storage ###################")
        //console.log(data["ChecklistDataObjects"])
        SetChecklistDataObjects(data["ChecklistDataObjects"])
      }
      else
      {
        var newChecklistDataObjects = {...ChecklistDataObjects}
        const tasks = [];
        Object.keys(ChecklistDataObjects).forEach((checklistEntity) => {
          tasks.push(
            (async (checklistEntity) => {
              var ChecklistStructureInfoObject = ChecklistDataObjects[
                checklistEntity
              ].filter((obj) => obj.id == "-1")[0];
              //console.log("############ Checklist structure info object for " + checklistEntity +" ########");
              //console.log(ChecklistStructureInfoObject);
              if (
                ChecklistStructureInfoObject.ApiUrl == null ||
                ChecklistStructureInfoObject.ApiUrl == ""
              )
                return;
        
              var rowList = [];
              console.log(
                "########### Requesting url for checklist " +
                  checklistEntity +
                  "############"
              );
              console.log(ChecklistStructureInfoObject.ApiUrl);
        
              const response = await fetch(ChecklistStructureInfoObject.ApiUrl, {
                method: "POST",
                
            body: JSON.stringify({
                "userID": 801,
                "factoryID": 548
        
            }),
        
                headers: {
                  "Content-Type": "application/json",
                  Accept: "application/json",
                },
              });
              // .then(response => response.json())
        
              const body = await response.json();
        
              const newRowlist = body.result != null ? body.result : body;
              //console.log("############# new rowlist for checklist named " +checklistEntity +" from api ##############");
              //console.log(newRowlist);
        
              rowList = rowList.concat(newRowlist);
        
             
    
              for (var i = 0; i < rowList.length; i++) {
                var newRowObject = { id: i.toString() };
        
                for (var column of Object.keys(ChecklistStructureInfoObject)) {
                  if (column == "id" || column == "ApiUrl") continue;
                  //console.log("################ row list object ##############")
                  //console.log(rowList[i])
                  if (ChecklistStructureInfoObject[column]["type"] == "textField") {
                    newRowObject[column] = {
                      type: "textField",
                      value: rowList[i][column],
                    };
                  }
                  if (
                    ChecklistStructureInfoObject[column]["type"] == "textInputField"
                  ) {
                    newRowObject[column] = {
                      type: ChecklistStructureInfoObject[column]["type"],
                      variableName: column + "_" + i,
                      value: ""
                    };
                  }
                  if (ChecklistStructureInfoObject[column]["type"] == "radioButton") {
                    newRowObject[column] = {
                      type: ChecklistStructureInfoObject[column]["type"],
                      variableName: column + "_" + i,
                      options: ChecklistStructureInfoObject[column]["options"],
                      value: ""
                    };
                  }
                  if (ChecklistStructureInfoObject[column]["type"] == "dropdown") {
                    newRowObject[column] = {
                      type: ChecklistStructureInfoObject[column]["type"],
                      variableName: column + "_" + i,
                      SelectedValue: "",
                      ValueListUrl: "",
                      ValuesList: ChecklistStructureInfoObject[column]["options"] ,
                    };
                  }
                }
        
                newChecklistDataObjects[checklistEntity].push(newRowObject);
                // SetChecklistDataObjects(newChecklistDataObjects)
                //ChecklistDataObjects[checklistEntity].push(newRowObject)
              }
            })(checklistEntity)
          );
        
        
        
        
        });
        
        Promise.all(tasks).then(() => {
            SetChecklistDataObjects(newChecklistDataObjects)
            //console.log("##################### newChecklistDataObjects ################")
            //console.log(newChecklistDataObjects)
          }).catch(e => {
            console.log("############## Error in fetching from APIs and adding rows to checklist #############")
            console.log(e)
          })
       
      }

// ########################################### fetching info from api for checklist ends ############################

// ################## Extracting hybrid information from async storage into the states ###########################
      if(data != null && data["HybridDataObjects"] != null)
      {
        //console.log("######################### Combined Hybrid object from async storage ###################")
        //console.log(data["HybridDataObjects"])
        SetHybridDataObjects(data["HybridDataObjects"])
      }

// ################## Extracting hybrid information from async storage into the states ###########################
      if(data != null && data["RadioButtonList"] != null)
      {
        //console.log("######################### Combined radio object from async storage ###################")
        //console.log(data["RadioButtonList"])
        SetRadioButtonList(data["RadioButtonList"])
      }


    })
    .then(() => {
      SetDataLoaded(true)
    })
    .catch( e => {
      console.log("################ Error in fetching data object for Screen Id: "+ CurrentScreenId)
      console.log(e)
    })

    
  }, [])
  

  return (
    <ScrollView 
    contentContainerStyle={{alignItems: "center"}}
    keyboardShouldPersistTaps="always"
    >
    {(() => {
      if(! DataLoaded)
          return (<View style = {{alignSelf: "center", alignItems: "center"}}><ActivityIndicator size="large" color={"green"} /></View>)
      })()}

       

  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
<View id="mainSection" style={{borderWidth: 0, borderColor: "red", alignItems: "center", paddingVertical: 5, paddingHorizontal:5, marginHorizontal: 5}}>

  
  
      
   <View id="view1" 
    style={{marginVertical: 5, 
            borderWidth: 0, 
            borderColor: "grey", justifyContent: "center", 
            alignItems: "center", borderRadius: 7,
            backgroundColor: '#b0c4de',
            paddingVertical: 5,
            elevation: 50,

          }}>
  
      
      
          
      <View style={{flexDirection: "row"}}>
      
          

          {/* ############################################ TEXTINPUT FIELD buyername ###################################################### */}
         <View style={{width: "99%", marginHorizontal: 5, marginVertical: 2}}>  
         <FloatingLabelInput
              label="Buyer"
              labelStyles={{fontSize: 12, fontWeight: "bold", backgroundColor: "#b0c4de", paddingHorizontal: 4, borderRadius: 2, paddingVertical: 1}}
              staticLabel
              customLabelStyles={{
                colorFocused: 'red',
                fontSizeFocused: 12,
              }}
              keyboardType="default"
              containerStyles={{
                borderWidth: 2,
                padding: 10,
                backgroundColor: 'white',
                borderColor: 'grey',
                borderRadius: 5,
              }}
              inputStyles={{fontWeight: "bold", fontSize: 15, color: "gray"}}
              maxLength={50}
              value={FieldList["buyername"]}
              editable={true}
              onChangeText = {(newValue) => {
                  
                  var newFieldsObject = {...FieldList}
                  newFieldsObject["buyername"] = newValue
                  //Some code from placeholder
                  

                  SetFieldList(newFieldsObject)
                  storeData("FieldList", newFieldsObject, CurrentScreenId)
              }}
          />
          </View>
            {/* ############################################ TEXTINPUT FIELD buyername ends ###################################################### */}
            
          
      </View>
      
      
  </View>
  
  
  
  
      
   <View id="view2" 
    style={{marginVertical: 5, 
            borderWidth: 0, 
            borderColor: "grey", justifyContent: "center", 
            alignItems: "center", borderRadius: 7,
            backgroundColor: '#b0c4de',
            paddingVertical: 5,
            elevation: 50,

          }}>
  
      
      
          
      <View style={{flexDirection: "row"}}>
      
          
          {/* ################################################ DROPDOWN aqllevel #################################################### */}
            <SearchableDropdown
               //On text change listner on the searchable input
                 onTextChange={(text) => console.log(text)}
                 onItemSelect={selectedObject => { 
                   
                   var newDropdownList = {...DropdownList}
                   newDropdownList.aqllevel["SelectedValue"] = selectedObject
                   //Some code from placeholder
                   console.log("#### New dropdown list ######")
                   console.log(newDropdownList)
                   SetDropdownList(newDropdownList)
                   storeData("DropdownList", newDropdownList, CurrentScreenId)
                 }}
                 selectedItems={DropdownList.aqllevel["SelectedValue"]}

                 //onItemSelect called after the selection from the dropdown
                 containerStyle={{ padding: 10 ,width: "99%" ,
                 borderWidth:2,
                 borderRadius:5,
                 borderColor:"grey",
                 marginHorizontal: 5,
                 marginVertical:2,
                 backgroundColor: "white"
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
                 items={DropdownList["aqllevel"].ValuesList}
                 //mapping of item array
                 //default selected item index
                 //"Select AQL Level"
                 placeholder={DropdownList["aqllevel"].SelectedValue == "" ? "Select AQL Level" : "aqllevel: " + DropdownList["aqllevel"].SelectedValue.name }
                 placeholderTextColor="#00334e80"
                 //place holder for the search input
                 resetValue={false}
                 //reset textInput Value with true and false state
                 underlineColorAndroid="transparent"
                 //To remove the underline from the android input
             />
                {/* ################################################ DROPDOWN aqllevel ends #################################################### */}
            
          
      </View>
      
      
  </View>
  
  
  
  
      
   <View id="view3" 
    style={{marginVertical: 5, 
            borderWidth: 2, 
            borderColor: "grey", justifyContent: "center", 
            alignItems: "center", borderRadius: 7,
            backgroundColor: '#e6e6fa',
            paddingVertical: 5,
            elevation: 50,

          }}>
  
      
      
      
      
      
      
     <View id="subview1" style={{marginVertical: 5, borderWidth: 0, borderColor: "grey", justifyContent: "center", alignItems: "center"}}>
    
      
      
          
      <View style={{flexDirection: "row"}}>
      
          
            
         <View style={{width: "99%", height: 45, marginHorizontal: 2, marginVertical: 2}}>  
         <FloatingLabelInput
              label="PO No"
              labelStyles={{color: "red", fontSize: 10, fontWeight: "bold"}}
              containerStyles={{
                borderWidth: 2,
                padding: 10,
                backgroundColor: 'white',
                borderColor: 'grey',
                borderRadius: 5,
              }}
              inputStyles={{fontWeight: "bold", fontSize: 15, color: "gray"}}
              keyboardType="default"
              maxLength={50}
              value={FieldList["pono"]}
              editable={true}
              onChangeText = {(newValue) => {
                var newFieldList = {...FieldList}
                newFieldList["pono"] = newValue
                //Some code from placeholder
                
                
                
                SetFieldList(newFieldList)
            }}
          />
          </View>

            
          
      </View>
      
      
      
      
          
          
      <View style={{flexDirection: "row"}}>
      
          
            
         <View style={{width: "49%", height: 45, marginHorizontal: 2, marginVertical: 2}}>  
         <FloatingLabelInput
              label="Order Qty"
              labelStyles={{color: "red", fontSize: 10, fontWeight: "bold"}}
              containerStyles={{
                borderWidth: 2,
                padding: 10,
                backgroundColor: 'white',
                borderColor: 'grey',
                borderRadius: 5,
              }}
              inputStyles={{fontWeight: "bold", fontSize: 15, color: "gray"}}
              keyboardType="numeric"
              maxLength={50}
              value={FieldList["orderqty"]}
              editable={true}
              onChangeText = {(newValue) => {
                var newFieldList = {...FieldList}
                newFieldList["orderqty"] = newValue
                
            if(newFieldList["orderqty"] != "" && newFieldList["offeredqty"] != "")
            {
                var excessQty = parseInt(newFieldList["offeredqty"]) - parseInt(newFieldList["orderqty"])
                newFieldList["excessshortqty"] = excessQty.toString()
            } 
            else
                newFieldList["excessshortqty"] = ""

        
                
                
                
                SetFieldList(newFieldList)
            }}
          />
          </View>

            
          
          
            
         <View style={{width: "49%", height: 45, marginHorizontal: 2, marginVertical: 2}}>  
         <FloatingLabelInput
              label="Offered Qty"
              labelStyles={{color: "red", fontSize: 10, fontWeight: "bold"}}
              containerStyles={{
                borderWidth: 2,
                padding: 10,
                backgroundColor: 'white',
                borderColor: 'grey',
                borderRadius: 5,
              }}
              inputStyles={{fontWeight: "bold", fontSize: 15, color: "gray"}}
              keyboardType="numeric"
              maxLength={50}
              value={FieldList["offeredqty"]}
              editable={true}
              onChangeText = {(newValue) => {
                var newFieldList = {...FieldList}
                newFieldList["offeredqty"] = newValue
                
            if(newFieldList["orderqty"] != "" && newFieldList["offeredqty"] != "")
            {
                var excessQty = parseInt(newFieldList["offeredqty"]) - parseInt(newFieldList["orderqty"])
                newFieldList["excessshortqty"] = excessQty.toString()
            }
            else
                newFieldList["excessshortqty"] = ""
        
                
                
                
                SetFieldList(newFieldList)
            }}
          />
          </View>

            
          
      </View>
      
      
      
      
          
      <View style={{flexDirection: "row"}}>
      
          
            
         <View style={{width: "99%", height: 45, marginHorizontal: 2, marginVertical: 2}}>  
         <FloatingLabelInput
              label="Excess/Short Qty"
              labelStyles={{color: "red", fontSize: 10, fontWeight: "bold"}}
              containerStyles={{
                borderWidth: 2,
                padding: 10,
                backgroundColor: 'white',
                borderColor: 'grey',
                borderRadius: 5,
              }}
              inputStyles={{fontWeight: "bold", fontSize: 15, color: "gray"}}
              keyboardType="default"
              maxLength={50}
              value={FieldList["excessshortqty"]}
              editable={true}
              onChangeText = {(newValue) => {
                var newFieldList = {...FieldList}
                newFieldList["excessshortqty"] = newValue
                //Some code from placeholder
                
                
                
                SetFieldList(newFieldList)
            }}
          />
          </View>

            
          
      </View>
      
      
      
      
          
      <View style={{flexDirection: "row"}}>
      
          
            <View style={{borderColor: "grey", borderRadius: 5, marginTop: 10, borderWidth: 0, width: "80%"}}>
              <TouchableOpacity
                style={{ ...styles.openButton, marginHorizontal: 10, marginVertical: 10, alignSelf: "center"}}
                onPress={() => {
                    
                    var fieldNames = [] 
                    for(var obj of HybridDataObjects["pono"])
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
                    
                    newRowObject["id"] = (HybridDataObjects["pono"].length).toString()

                    var newHybridObjectList = {...HybridDataObjects}
                    newHybridObjectList["pono"].push(newRowObject)
                    console.log("####### Adding new row to table for pono ############")
                    console.log(newRowObject)

                    console.log("############# Hybrid data object being stored for screen id "+ CurrentScreenId+" ##############")
                    console.log(newHybridObjectList)
                    
                    SetHybridDataObjects(newHybridObjectList)

                    SetFieldList(newFieldList)
                    SetRadioButtonList(newRadioButtonList)

                    //Some code from placeholder
                    storeData("HybridDataObjects", newHybridObjectList, CurrentScreenId)
                  }}
              >
                <Text style={styles.textStyle}>Add</Text>
      
              </TouchableOpacity>
            </View>
            
          
      </View>
      
      
      </View>
      
      
  {/* ######################################## HYBRID pono ################################################################### */}

    <View id ="pono table" style={{marginVertical: 10, width: "100%", }}>
    <ScrollView horizontal id="pono table" contentContainerStyle={{flexDirection: "column"}}>
    
      <View style={{flexDirection: "row", paddingVertical: 7, backgroundColor: "#4682b4",  borderRadius: 3, justifyContent: "flex-start", alignItems: "center",}}>
        <FlatList
          id="Headings"
          data={(() => {
            var sampleObjectWithIdNegative1 = {}
            for(var obj of HybridDataObjects["pono"])
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
        data={HybridDataObjects["pono"].filter((rowObject) => rowObject.id != "-1")}
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
                              newHybridDataObjects["pono"] = newHybridDataObjects["pono"].filter((rowObject) => rowObject.id != item.value )
                              storeData("HybridDataObjects", newHybridDataObjects,CurrentScreenId )
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
    

  {/* ######################################## HYBRID block for pono ends ##################################################################### */}
      
  </View>
  
  
  
  
      
   <View id="view4" 
    style={{marginVertical: 5, 
            borderWidth: 0, 
            borderColor: "grey", justifyContent: "center", 
            alignItems: "center", borderRadius: 7,
            backgroundColor: '#b0c4de',
            paddingVertical: 5,
            elevation: 50,

          }}>
  
      
      
          
      <View style={{flexDirection: "row"}}>
      
          

          {/* ############################################ TEXTINPUT FIELD factoryrepresentative ###################################################### */}
         <View style={{width: "99%", marginHorizontal: 5, marginVertical: 2}}>  
         <FloatingLabelInput
              label="Factory Representative"
              labelStyles={{fontSize: 12, fontWeight: "bold", backgroundColor: "#b0c4de", paddingHorizontal: 4, borderRadius: 2, paddingVertical: 1}}
              staticLabel
              customLabelStyles={{
                colorFocused: 'red',
                fontSizeFocused: 12,
              }}
              keyboardType="default"
              containerStyles={{
                borderWidth: 2,
                padding: 10,
                backgroundColor: 'white',
                borderColor: 'grey',
                borderRadius: 5,
              }}
              inputStyles={{fontWeight: "bold", fontSize: 15, color: "gray"}}
              maxLength={50}
              value={FieldList["factoryrepresentative"]}
              editable={true}
              onChangeText = {(newValue) => {
                  
                  var newFieldsObject = {...FieldList}
                  newFieldsObject["factoryrepresentative"] = newValue
                  //Some code from placeholder
                  

                  SetFieldList(newFieldsObject)
                  storeData("FieldList", newFieldsObject, CurrentScreenId)
              }}
          />
          </View>
            {/* ############################################ TEXTINPUT FIELD factoryrepresentative ends ###################################################### */}
            
          
      </View>
      
      
  </View>
  
  
  
  
      
   <View id="view5" 
    style={{marginVertical: 5, 
            borderWidth: 0, 
            borderColor: "grey", justifyContent: "center", 
            alignItems: "center", borderRadius: 7,
            backgroundColor: '#b0c4de',
            paddingVertical: 5,
            elevation: 50,

          }}>
  
      
      
          
          
          
      <View style={{flexDirection: "row"}}>
      
          

          {/* ############################################ TEXTINPUT FIELD pqqty_val ###################################################### */}
         <View style={{width: "32.333333333333336%", marginHorizontal: 5, marginVertical: 2}}>  
         <FloatingLabelInput
              label="PR Quantity"
              labelStyles={{fontSize: 12, fontWeight: "bold", backgroundColor: "#b0c4de", paddingHorizontal: 4, borderRadius: 2, paddingVertical: 1}}
              staticLabel
              customLabelStyles={{
                colorFocused: 'red',
                fontSizeFocused: 12,
              }}
              keyboardType="default"
              containerStyles={{
                borderWidth: 2,
                padding: 10,
                backgroundColor: 'white',
                borderColor: 'grey',
                borderRadius: 5,
              }}
              inputStyles={{fontWeight: "bold", fontSize: 15, color: "gray"}}
              maxLength={50}
              value={FieldList["pqqty_val"]}
              editable={true}
              onChangeText = {(newValue) => {
                  
                  var newFieldsObject = {...FieldList}
                  newFieldsObject["pqqty_val"] = newValue
                  //Some code from placeholder
                  

                  SetFieldList(newFieldsObject)
                  storeData("FieldList", newFieldsObject, CurrentScreenId)
              }}
          />
          </View>
            {/* ############################################ TEXTINPUT FIELD pqqty_val ends ###################################################### */}
            
          
          

          {/* ############################################ TEXTINPUT FIELD doneqty_val ###################################################### */}
         <View style={{width: "32.333333333333336%", marginHorizontal: 5, marginVertical: 2}}>  
         <FloatingLabelInput
              label="Done Quantity"
              labelStyles={{fontSize: 12, fontWeight: "bold", backgroundColor: "#b0c4de", paddingHorizontal: 4, borderRadius: 2, paddingVertical: 1}}
              staticLabel
              customLabelStyles={{
                colorFocused: 'red',
                fontSizeFocused: 12,
              }}
              keyboardType="default"
              containerStyles={{
                borderWidth: 2,
                padding: 10,
                backgroundColor: 'white',
                borderColor: 'grey',
                borderRadius: 5,
              }}
              inputStyles={{fontWeight: "bold", fontSize: 15, color: "gray"}}
              maxLength={50}
              value={FieldList["doneqty_val"]}
              editable={true}
              onChangeText = {(newValue) => {
                  
                  var newFieldsObject = {...FieldList}
                  newFieldsObject["doneqty_val"] = newValue
                  //Some code from placeholder
                  

                  SetFieldList(newFieldsObject)
                  storeData("FieldList", newFieldsObject, CurrentScreenId)
              }}
          />
          </View>
            {/* ############################################ TEXTINPUT FIELD doneqty_val ends ###################################################### */}
            
          
          

          {/* ############################################ TEXTINPUT FIELD cutqty_val ###################################################### */}
         <View style={{width: "32.333333333333336%", marginHorizontal: 5, marginVertical: 2}}>  
         <FloatingLabelInput
              label="Cut Quantity"
              labelStyles={{fontSize: 12, fontWeight: "bold", backgroundColor: "#b0c4de", paddingHorizontal: 4, borderRadius: 2, paddingVertical: 1}}
              staticLabel
              customLabelStyles={{
                colorFocused: 'red',
                fontSizeFocused: 12,
              }}
              keyboardType="default"
              containerStyles={{
                borderWidth: 2,
                padding: 10,
                backgroundColor: 'white',
                borderColor: 'grey',
                borderRadius: 5,
              }}
              inputStyles={{fontWeight: "bold", fontSize: 15, color: "gray"}}
              maxLength={50}
              value={FieldList["cutqty_val"]}
              editable={true}
              onChangeText = {(newValue) => {
                  
                  var newFieldsObject = {...FieldList}
                  newFieldsObject["cutqty_val"] = newValue
                  //Some code from placeholder
                  

                  SetFieldList(newFieldsObject)
                  storeData("FieldList", newFieldsObject, CurrentScreenId)
              }}
          />
          </View>
            {/* ############################################ TEXTINPUT FIELD cutqty_val ends ###################################################### */}
            
          
      </View>
      
      
  </View>
  
  
  
  
      
   <View id="view6" 
    style={{marginVertical: 5, 
            borderWidth: 0, 
            borderColor: "grey", justifyContent: "center", 
            alignItems: "center", borderRadius: 7,
            backgroundColor: '#b0c4de',
            paddingVertical: 5,
            elevation: 50,

          }}>
  
      
      
          
          
      <View style={{flexDirection: "row"}}>
      
          

          {/* ############################################ TEXTINPUT FIELD packedqty ###################################################### */}
         <View style={{width: "49%", marginHorizontal: 5, marginVertical: 2}}>  
         <FloatingLabelInput
              label="Packed Qty"
              labelStyles={{fontSize: 12, fontWeight: "bold", backgroundColor: "#b0c4de", paddingHorizontal: 4, borderRadius: 2, paddingVertical: 1}}
              staticLabel
              customLabelStyles={{
                colorFocused: 'red',
                fontSizeFocused: 12,
              }}
              keyboardType="numeric"
              containerStyles={{
                borderWidth: 2,
                padding: 10,
                backgroundColor: 'white',
                borderColor: 'grey',
                borderRadius: 5,
              }}
              inputStyles={{fontWeight: "bold", fontSize: 15, color: "gray"}}
              maxLength={50}
              value={FieldList["packedqty"]}
              editable={true}
              onChangeText = {(newValue) => {
                  
                  var newFieldsObject = {...FieldList}
                  newFieldsObject["packedqty"] = newValue
                  

            var NestedAqlObject = DropdownList["aqllevel"].SelectedValue
            var currentPackedQty = parseInt(newValue)
            var sampleSize = ""
            var smallestMinValue = Number.MAX_VALUE
            var greatestMaxValue = Number.MIN_VALUE
            var smallestMinValueRangeObject = {minValue: Number.MAX_VALUE}
            var greatestMaxValueRangeObject = {maxValue: Number.MIN_VALUE}
            var rangeFound = false
            for(var rangeObject of NestedAqlObject.aqlDtDetails)
            {
            if(currentPackedQty <= rangeObject.maxValue &&  currentPackedQty >= rangeObject.minValue)
            {
                sampleSize = rangeObject.sampleSize.toString()
                rangeFound = true
                break
            }
            if(rangeObject.minValue <= smallestMinValueRangeObject.minValue)
                smallestMinValueRangeObject = {...rangeObject}
            

            if(rangeObject.maxValue >= greatestMaxValueRangeObject.maxValue )
                greatestMaxValueRangeObject = {...rangeObject}
            
            }

            if( !rangeFound)
            {
            if(currentPackedQty >= greatestMaxValueRangeObject.maxValue)
                sampleSize = greatestMaxValueRangeObject.sampleSize
            else if(currentPackedQty >= smallestMinValueRangeObject.minValue)
                sampleSize = smallestMinValueRangeObject.sampleSize 
            }

            newFieldsObject["samplesize"] = currentPackedQty != "" ? sampleSize.toString() : ""    


        
                  

                  SetFieldList(newFieldsObject)
                  storeData("FieldList", newFieldsObject, CurrentScreenId)
              }}
          />
          </View>
            {/* ############################################ TEXTINPUT FIELD packedqty ends ###################################################### */}
            
          
          

          {/* ############################################ TEXTINPUT FIELD samplesize ###################################################### */}
         <View style={{width: "49%", marginHorizontal: 5, marginVertical: 2}}>  
         <FloatingLabelInput
              label="Sample Size"
              labelStyles={{fontSize: 12, fontWeight: "bold", backgroundColor: "#b0c4de", paddingHorizontal: 4, borderRadius: 2, paddingVertical: 1}}
              staticLabel
              customLabelStyles={{
                colorFocused: 'red',
                fontSizeFocused: 12,
              }}
              keyboardType="numeric"
              containerStyles={{
                borderWidth: 2,
                padding: 10,
                backgroundColor: 'white',
                borderColor: 'grey',
                borderRadius: 5,
              }}
              inputStyles={{fontWeight: "bold", fontSize: 15, color: "gray"}}
              maxLength={50}
              value={FieldList["samplesize"]}
              editable={true}
              onChangeText = {(newValue) => {
                  
                  var newFieldsObject = {...FieldList}
                  newFieldsObject["samplesize"] = newValue
                  //Some code from placeholder
                  

                  SetFieldList(newFieldsObject)
                  storeData("FieldList", newFieldsObject, CurrentScreenId)
              }}
          />
          </View>
            {/* ############################################ TEXTINPUT FIELD samplesize ends ###################################################### */}
            
          
      </View>
      
      
  </View>
  
  
  
  
      
   <View id="view7" 
    style={{marginVertical: 5, 
            borderWidth: 0, 
            borderColor: "grey", justifyContent: "center", 
            alignItems: "center", borderRadius: 7,
            backgroundColor: '#b0c4de',
            paddingVertical: 5,
            elevation: 50,

          }}>
  
      
      
          
          
      <View style={{flexDirection: "row"}}>
      
          

          {/* ############################################ TEXTINPUT FIELD fg1qty ###################################################### */}
         <View style={{width: "49%", marginHorizontal: 5, marginVertical: 2}}>  
         <FloatingLabelInput
              label="FG1 Qty"
              labelStyles={{fontSize: 12, fontWeight: "bold", backgroundColor: "#b0c4de", paddingHorizontal: 4, borderRadius: 2, paddingVertical: 1}}
              staticLabel
              customLabelStyles={{
                colorFocused: 'red',
                fontSizeFocused: 12,
              }}
              keyboardType="numeric"
              containerStyles={{
                borderWidth: 2,
                padding: 10,
                backgroundColor: 'white',
                borderColor: 'grey',
                borderRadius: 5,
              }}
              inputStyles={{fontWeight: "bold", fontSize: 15, color: "gray"}}
              maxLength={50}
              value={FieldList["fg1qty"]}
              editable={true}
              onChangeText = {(newValue) => {
                  
                  var newFieldsObject = {...FieldList}
                  newFieldsObject["fg1qty"] = newValue
                  
            var currentPackedQty = newFieldsObject["packedqty"]
            var currentFg1Qty = newValue

            console.log("############## current packed quantity #############")
            console.log(currentPackedQty)

            console.log("#################### current Fg1 quantity ################")
            console.log(currentFg1Qty)

            if(currentPackedQty == "" || currentFg1Qty == "")
            {
                
                newFieldsObject["fg1qty"] = ""
                newFieldsObject["fg2qty"] = ""
                SetFieldList(newFieldsObject)
                //storeData("FieldList", newFieldsObject)
                Alert.alert("Pleae enter valid fg and packed quantities")
                return
            }   

            if(parseInt(currentPackedQty) < parseInt(currentFg1Qty))
            {
                
                newFieldsObject["fg1qty"] = ""
                newFieldsObject["fg2qty"] = ""
                SetFieldList(newFieldsObject)
                //storeData("FieldList", newFieldsObject)
                Alert.alert("fg values cannot be greater than packed quantity")
                return
            }
            currentPackedQty = parseInt(currentPackedQty)
            currentFg1Qty = parseInt(currentFg1Qty)
            var newFg2Qty = currentPackedQty - currentFg1Qty

            
            newFieldsObject["fg2qty"] = newFg2Qty.toString()

        
        
                  

                  SetFieldList(newFieldsObject)
                  storeData("FieldList", newFieldsObject, CurrentScreenId)
              }}
          />
          </View>
            {/* ############################################ TEXTINPUT FIELD fg1qty ends ###################################################### */}
            
          
          

          {/* ############################################ TEXTINPUT FIELD fg2qty ###################################################### */}
         <View style={{width: "49%", marginHorizontal: 5, marginVertical: 2}}>  
         <FloatingLabelInput
              label="FG2 Qty"
              labelStyles={{fontSize: 12, fontWeight: "bold", backgroundColor: "#b0c4de", paddingHorizontal: 4, borderRadius: 2, paddingVertical: 1}}
              staticLabel
              customLabelStyles={{
                colorFocused: 'red',
                fontSizeFocused: 12,
              }}
              keyboardType="numeric"
              containerStyles={{
                borderWidth: 2,
                padding: 10,
                backgroundColor: 'white',
                borderColor: 'grey',
                borderRadius: 5,
              }}
              inputStyles={{fontWeight: "bold", fontSize: 15, color: "gray"}}
              maxLength={50}
              value={FieldList["fg2qty"]}
              editable={true}
              onChangeText = {(newValue) => {
                  
                  var newFieldsObject = {...FieldList}
                  newFieldsObject["fg2qty"] = newValue
                  //Some code from placeholder
                  

                  SetFieldList(newFieldsObject)
                  storeData("FieldList", newFieldsObject, CurrentScreenId)
              }}
          />
          </View>
            {/* ############################################ TEXTINPUT FIELD fg2qty ends ###################################################### */}
            
          
      </View>
      
      
  </View>
  
  
  
  
      
   <View id="view8" 
    style={{marginVertical: 5, 
            borderWidth: 0, 
            borderColor: "grey", justifyContent: "center", 
            alignItems: "center", borderRadius: 7,
            backgroundColor: '#b0c4de',
            paddingVertical: 5,
            elevation: 50,

          }}>
  
      
      
          
      <View style={{flexDirection: "row"}}>
      
          

          {/* ############################################ TEXTINPUT FIELD inserttotalnoofcarton ###################################################### */}
         <View style={{width: "99%", marginHorizontal: 5, marginVertical: 2}}>  
         <FloatingLabelInput
              label="Insert Total No Of Carton"
              labelStyles={{fontSize: 12, fontWeight: "bold", backgroundColor: "#b0c4de", paddingHorizontal: 4, borderRadius: 2, paddingVertical: 1}}
              staticLabel
              customLabelStyles={{
                colorFocused: 'red',
                fontSizeFocused: 12,
              }}
              keyboardType="numeric"
              containerStyles={{
                borderWidth: 2,
                padding: 10,
                backgroundColor: 'white',
                borderColor: 'grey',
                borderRadius: 5,
              }}
              inputStyles={{fontWeight: "bold", fontSize: 15, color: "gray"}}
              maxLength={50}
              value={FieldList["inserttotalnoofcarton"]}
              editable={true}
              onChangeText = {(newValue) => {
                  
                  var newFieldsObject = {...FieldList}
                  newFieldsObject["inserttotalnoofcarton"] = newValue
                  //Some code from placeholder
                  

                  SetFieldList(newFieldsObject)
                  storeData("FieldList", newFieldsObject, CurrentScreenId)
              }}
          />
          </View>
            {/* ############################################ TEXTINPUT FIELD inserttotalnoofcarton ends ###################################################### */}
            
          
      </View>
      
      
  </View>
  
  
  
  
      
   <View id="view9" 
    style={{marginVertical: 5, 
            borderWidth: 0, 
            borderColor: "grey", justifyContent: "center", 
            alignItems: "center", borderRadius: 7,
            backgroundColor: '#b0c4de',
            paddingVertical: 5,
            elevation: 50,

          }}>
  
      
      
          
          
      <View style={{flexDirection: "row"}}>
      
          

          {/* ############################################ TEXTINPUT FIELD cartonsamplesize ###################################################### */}
         <View style={{width: "49%", marginHorizontal: 5, marginVertical: 2}}>  
         <FloatingLabelInput
              label="Carton Sample Size"
              labelStyles={{fontSize: 12, fontWeight: "bold", backgroundColor: "#b0c4de", paddingHorizontal: 4, borderRadius: 2, paddingVertical: 1}}
              staticLabel
              customLabelStyles={{
                colorFocused: 'red',
                fontSizeFocused: 12,
              }}
              keyboardType="numeric"
              containerStyles={{
                borderWidth: 2,
                padding: 10,
                backgroundColor: 'white',
                borderColor: 'grey',
                borderRadius: 5,
              }}
              inputStyles={{fontWeight: "bold", fontSize: 15, color: "gray"}}
              maxLength={50}
              value={FieldList["cartonsamplesize"]}
              editable={true}
              onChangeText = {(newValue) => {
                  
                  var newFieldsObject = {...FieldList}
                  newFieldsObject["cartonsamplesize"] = newValue
                  
                    var totalCartons = parseInt(newFieldsObject["inserttotalnoofcarton"])
                    var currentSampleSize = parseInt(newFieldsObject["cartonsamplesize"])

                    if(Number.isNaN(totalCartons))
                    {
                        Alert.alert("Enter valid number of total cartons")
                        return
                    }

                    if(currentSampleSize > totalCartons)
                    {
                        Alert.alert("Carton sample size cannot be greater than total cartons")
                        return
                    }
                    
            
                  

                  SetFieldList(newFieldsObject)
                  storeData("FieldList", newFieldsObject, CurrentScreenId)
              }}
          />
          </View>
            {/* ############################################ TEXTINPUT FIELD cartonsamplesize ends ###################################################### */}
            
          
          

          {/* ############################################ TEXTINPUT FIELD cartonselected ###################################################### */}
         <View style={{width: "49%", marginHorizontal: 5, marginVertical: 2}}>  
         <FloatingLabelInput
              label="Carton Selected"
              labelStyles={{fontSize: 12, fontWeight: "bold", backgroundColor: "#b0c4de", paddingHorizontal: 4, borderRadius: 2, paddingVertical: 1}}
              staticLabel
              customLabelStyles={{
                colorFocused: 'red',
                fontSizeFocused: 12,
              }}
              keyboardType="numeric"
              containerStyles={{
                borderWidth: 2,
                padding: 10,
                backgroundColor: 'white',
                borderColor: 'grey',
                borderRadius: 5,
              }}
              inputStyles={{fontWeight: "bold", fontSize: 15, color: "gray"}}
              maxLength={50}
              value={FieldList["cartonselected"]}
              editable={true}
              onChangeText = {(newValue) => {
                  
                  var newFieldsObject = {...FieldList}
                  newFieldsObject["cartonselected"] = newValue
                  //Some code from placeholder
                  

                  SetFieldList(newFieldsObject)
                  storeData("FieldList", newFieldsObject, CurrentScreenId)
              }}
          />
          </View>
            {/* ############################################ TEXTINPUT FIELD cartonselected ends ###################################################### */}
            
          
      </View>
      
      
  </View>
  
  
  
  
      
   <View id="view10" 
    style={{marginVertical: 5, 
            borderWidth: 0, 
            borderColor: "grey", justifyContent: "center", 
            alignItems: "center", borderRadius: 7,
            backgroundColor: '#e6e6fa',
            paddingVertical: 5,
            elevation: 50,

          }}>
  
      
    {/* ############################################## CHECKLIST auditchecklist START ######################################################################## */}

    <View id ="auditchecklist table" style={{marginVertical: 10, width: "100%",}}>
    <ScrollView horizontal id="auditchecklist table" contentContainerStyle={{flexDirection: "column"}}>
    
      <View style={{flexDirection: "row", paddingVertical: 7, backgroundColor: "#4682b4",  borderRadius: 3, justifyContent: "flex-start", alignItems: "center",}}>
        <FlatList
          id="Headings"
          data={(() => {
            var sampleObjectWithIdNegative1 = {}
            for(var obj of ChecklistDataObjects["auditchecklist"])
            {
              if(obj["id"] == "-1")
                sampleObjectWithIdNegative1 = obj
            }
            var ColumnHeadings = []
            for(var key of Object.keys(sampleObjectWithIdNegative1))
            {
              if(key == "id" || key == "ApiUrl")
               continue
              ColumnHeadings.push(sampleObjectWithIdNegative1[key])
            }
            return ColumnHeadings
          })() }
          keyExtractor={(columnNameObject) => columnNameObject.title}
          contentContainerStyle = {{flexDirection: "row"}}
          renderItem = {({item}) => {
            return <Text numberOfLines={10} style={{color: "white", width: 120, textAlign: 'center', fontWeight: "bold", fontSize: 12, }}>{item.title}</Text>
          }}
        />
      </View>
      <FlatList
        id="Table content"
        data={ChecklistDataObjects["auditchecklist"].filter((rowObject) => rowObject.id != "-1")}
        keyExtractor={(dataObject) => dataObject.id.toString()}
        contentContainerStyle = {{borderColor: "black",}}
        renderItem = {({item}) => {
          var currentRowArray = []
          var i = 0
          for(var key of Object.keys(item))
          {
            if(key == "id")
              continue

            currentRowArray.push({"id": i.toString(), "valueObject": item[key], "type": key, "rowId": item.id})      ;{/* type ~ columnName */}
            i += 1
          }
          return (
            
            <FlatList 
              id="rowContent"
              data={currentRowArray}
              keyExtractor={(currentElementObject) => currentElementObject.id.toString()}
              style={{paddingVertical: 5, flexDirection: "row", borderWidth: 2, borderColor: "red", borderRadius: 5, justifyContent: "flex-start",  alignItem: "center", alignItems: "center"}}
              renderItem = {({item}) => {
                
               

                  if(item["valueObject"].type == "radioButton")
                  {
                    const InputKey = item["valueObject"].variableName
                    return (
                      <SwitchSelector
                                    options={(() => {
                                      var Options = []
                                      for(var optionObject of item["valueObject"]["options"])
                                        Options.push({"label": optionObject.name, "value": optionObject.name})
                                      
                                      return Options
                                    })()}
                                    initial={-1}
                                    onPress={(newValue) => {
                                      
                                      var newChecklistDataObjects = {...ChecklistDataObjects}
                                      for(var i = 0; i<newChecklistDataObjects["auditchecklist"].length; i++ )
                                      {
                                        if(newChecklistDataObjects["auditchecklist"][i].id == item.rowId)
                                        {
                                          newChecklistDataObjects["auditchecklist"][i][item.type]["value"] = newValue
                                          break
                                        }
                                      }
                                      storeData("ChecklistDataObjects", newChecklistDataObjects, CurrentScreenId)
                                      SetChecklistDataObjects(newChecklistDataObjects)
                                    }}
                                    textColor={"black"} //'#7a44cf'

                                    selectedColor={"green"}
                                    buttonColor={"red"}
                                    borderColor={"blue"}
                                    hasPadding
                                    style={{width: 110, marginHorizontal: 10}}
                                    height={25}
                                    textStyle={{fontSize:10, fontWeight: "bold"}}
                                    selectedTextStyle={{fontSize:10, fontWeight: "bold"}}
                                    borderRadius={5}
                           />
                    )
                  }
                  if(item["valueObject"].type == "dropdown")
                  {
                    const InputKey = item["valueObject"].variableName
                    return (
                      <ModalDropdown 
                        options={(() => {
                          var Options = []
                          for (var obj of item["valueObject"].ValuesList)
                          {
                            if(obj.name != null)
                              Options.push(obj.name)
                            else
                              Options.push(obj)
                          }
                          return Options
                        })() }
                        style={{marginHorizontal: 5, padding: 7, borderWidth: 2, borderColor: "grey", borderRadius: 4, marginVertical: 5, width: 110}}
                        textStyle={{color: "grey", fontWeight: "bold", fontSize: 12}}
                        dropdownTextStyle={{color: "black"}}
                        defaultValue= {item["valueObject"].SelectedValue != "" ? item["valueObject"].SelectedValue :"Select a value"}
                        
                        onSelect={(selectedIndex) => {
                          
                          var newChecklistDataObjects = {...ChecklistDataObjects}
                          for(var i = 0; i<newChecklistDataObjects["auditchecklist"].length; i++ )
                          {
                            if(newChecklistDataObjects["auditchecklist"][i].id == item.rowId)
                            {
                              newChecklistDataObjects["auditchecklist"][i][item.type]["SelectedValue"] = newChecklistDataObjects["auditchecklist"][i][item.type]["ValuesList"][selectedIndex].name
                              break
                            }
                          }

                        storeData("ChecklistDataObjects", newChecklistDataObjects, CurrentScreenId)
                        SetChecklistDataObjects(newChecklistDataObjects)

                        console.log("#################### current checklist object modified to ####################")
                        console.log(newChecklistDataObjects["auditchecklist"])

                        }}
                      />
                    )
                  }
                  if(item["valueObject"].type == "textInputField")
                  {  
                    const InputKey = item["valueObject"].variableName
                    return (
                      <TextInput
                      // style= {{marginLeft: 4, color: "blue"}}
                      style={{borderBottomColor:'black', paddingHorizontal: 15, fontSize: 10, borderBottomWidth: 1, paddingVertical: 3, marginHorizontal: 15, width: 90}}
                      placeholder={""}
                      placeholderTextColor={"grey"}
                      maxLength={50}
                      // onBlur={Keyboard.dismiss}
                      value={ChecklistDataObjects["auditchecklist"].filter((rowObject) => rowObject.id == item.rowId)[0][item.type]["value"]}    //item.type means the column(name)
                      editable={true}
                      onChangeText = {(newValue) => {
                        
                        var newChecklistDataObjects = {...ChecklistDataObjects}
                        for(var i = 0; i<newChecklistDataObjects["auditchecklist"].length; i++ )
                        {
                          if(newChecklistDataObjects["auditchecklist"][i].id == item.rowId)
                          {
                            newChecklistDataObjects["auditchecklist"][i][item.type]["value"] = newValue
                            break
                          }
                        }
                        storeData("ChecklistDataObjects", newChecklistDataObjects, CurrentScreenId) 
                        SetChecklistDataObjects(newChecklistDataObjects)
                      }}
                  /> 
                    )
                  }

                
                return <Text numberOfLines={10} style={{textAlign: 'center', width: 120, color: "grey", fontWeight: "bold", fontSize: 10,}}>{item.valueObject.value}</Text>
              }}
              
            />
           
          )
        }}
      />
    
    </ScrollView>
    </View>
      {/* #################################################### CHECKLIST END ######################################################### */}
    
      
  </View>
  
  
  
  
      
   <View id="view11" 
    style={{marginVertical: 5, 
            borderWidth: 2, 
            borderColor: "grey", justifyContent: "center", 
            alignItems: "center", borderRadius: 7,
            backgroundColor: '#e6e6fa',
            paddingVertical: 5,
            elevation: 50,

          }}>
  
      
      
      
      
      
     <View id="subview1" style={{marginVertical: 5, borderWidth: 0, borderColor: "grey", justifyContent: "center", alignItems: "center"}}>
    
      
      
          
      <View style={{flexDirection: "row"}}>
      
          
  
            <SearchableDropdown
               //On text change listner on the searchable input
                 onTextChange={(text) => console.log(text)}
                 onItemSelect={selectedObject => { 
                   var newDropdownList = {...DropdownList}
                   newDropdownList.maindefect["SelectedValue"] = selectedObject
                   //Some code from placeholder
                   console.log("#### New dropdown list ######")
                   console.log(newDropdownList)
                   SetDropdownList(newDropdownList)
                   
                 }}
                 selectedItems={DropdownList.maindefect["SelectedValue"]}
                 //onItemSelect called after the selection from the dropdown
                 containerStyle={{ padding: 10 ,width: "99%" ,
                 borderWidth:2,
                 borderRadius:5,
                 borderColor:"grey",
                 marginHorizontal: 5,
                 marginVertical:5,
                 backgroundColor: "white"
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
                 items={DropdownList["maindefect"].ValuesList}
                 //mapping of item array
                 //default selected item index
                 placeholder={"Select Select Defect"}
                 placeholderTextColor="#00334e80"
                 //place holder for the search input
                 resetValue={false}
                 //reset textInput Value with true and false state
                 underlineColorAndroid="transparent"
                 //To remove the underline from the android input
             />
            
            
          
      </View>
      
      
      
      
          
          
          
      <View style={{flexDirection: "row"}}>
      
          
            
         <View style={{width: "32.333333333333336%", height: 45, marginHorizontal: 2, marginVertical: 2}}>  
         <FloatingLabelInput
              label="Critical"
              labelStyles={{color: "red", fontSize: 10, fontWeight: "bold"}}
              containerStyles={{
                borderWidth: 2,
                padding: 10,
                backgroundColor: 'white',
                borderColor: 'grey',
                borderRadius: 5,
              }}
              inputStyles={{fontWeight: "bold", fontSize: 15, color: "gray"}}
              keyboardType="numeric"
              maxLength={50}
              value={FieldList["maindefect_crit"]}
              editable={true}
              onChangeText = {(newValue) => {
                var newFieldList = {...FieldList}
                newFieldList["maindefect_crit"] = newValue
                //Some code from placeholder
                
                
                
                SetFieldList(newFieldList)
            }}
          />
          </View>

            
          
          
            
         <View style={{width: "32.333333333333336%", height: 45, marginHorizontal: 2, marginVertical: 2}}>  
         <FloatingLabelInput
              label="Major"
              labelStyles={{color: "red", fontSize: 10, fontWeight: "bold"}}
              containerStyles={{
                borderWidth: 2,
                padding: 10,
                backgroundColor: 'white',
                borderColor: 'grey',
                borderRadius: 5,
              }}
              inputStyles={{fontWeight: "bold", fontSize: 15, color: "gray"}}
              keyboardType="numeric"
              maxLength={50}
              value={FieldList["maindefect_maj"]}
              editable={true}
              onChangeText = {(newValue) => {
                var newFieldList = {...FieldList}
                newFieldList["maindefect_maj"] = newValue
                //Some code from placeholder
                
                
                
                SetFieldList(newFieldList)
            }}
          />
          </View>

            
          
          
            
         <View style={{width: "32.333333333333336%", height: 45, marginHorizontal: 2, marginVertical: 2}}>  
         <FloatingLabelInput
              label="Minor"
              labelStyles={{color: "red", fontSize: 10, fontWeight: "bold"}}
              containerStyles={{
                borderWidth: 2,
                padding: 10,
                backgroundColor: 'white',
                borderColor: 'grey',
                borderRadius: 5,
              }}
              inputStyles={{fontWeight: "bold", fontSize: 15, color: "gray"}}
              keyboardType="numeric"
              maxLength={50}
              value={FieldList["maindefect_min"]}
              editable={true}
              onChangeText = {(newValue) => {
                var newFieldList = {...FieldList}
                newFieldList["maindefect_min"] = newValue
                //Some code from placeholder
                
                
                
                SetFieldList(newFieldList)
            }}
          />
          </View>

            
          
      </View>
      
      
      
      
          
      <View style={{flexDirection: "row"}}>
      
          
            <View style={{borderColor: "grey", borderRadius: 5, marginTop: 10, borderWidth: 0, width: "80%"}}>
              <TouchableOpacity
                style={{ ...styles.openButton, marginHorizontal: 10, marginVertical: 10, alignSelf: "center"}}
                onPress={() => {
                    
                    var fieldNames = [] 
                    for(var obj of HybridDataObjects["maindefect"])
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
                    
                    newRowObject["id"] = (HybridDataObjects["maindefect"].length).toString()

                    var newHybridObjectList = {...HybridDataObjects}
                    newHybridObjectList["maindefect"].push(newRowObject)
                    console.log("####### Adding new row to table for maindefect ############")
                    console.log(newRowObject)

                    console.log("############# Hybrid data object being stored for screen id "+ CurrentScreenId+" ##############")
                    console.log(newHybridObjectList)
                    
                    SetHybridDataObjects(newHybridObjectList)

                    SetFieldList(newFieldList)
                    SetRadioButtonList(newRadioButtonList)

                    
            
            var newFieldList = {...FieldList}

            newFieldList["totalcritdefect"] = newFieldList["totalcritdefect"] != "" ? (parseInt(newFieldList["totalcritdefect"]) + parseInt(newRowObject.maindefect_crit)).toString() :  newRowObject.maindefect_crit.toString()
            newFieldList["totalmajordefect"] = newFieldList["totalmajordefect"] != "" ? (parseInt(newFieldList["totalmajordefect"]) + parseInt(newRowObject.maindefect_maj)).toString() : newRowObject.maindefect_maj.toString()
            newFieldList["totalminordefect"] = newFieldList["totalminordefect"] != "" ? (parseInt(newFieldList["totalminordefect"]) + parseInt(newRowObject.maindefect_min)).toString() :  newRowObject.maindefect_min.toString()
            newFieldList["totaldefect"] = (parseInt(newFieldList["totalcritdefect"]) + parseInt(newFieldList["totalmajordefect"]) + parseInt(newFieldList["totalminordefect"])).toString()
            
            var SampleSize = newFieldList["samplesize"]
            var defectRate = SampleSize != "" && newFieldList["totaldefect"] != "" ? ((parseInt(newFieldList["totaldefect"])/parseInt(SampleSize))*100).toString() : ""
            newFieldList["defectrate"] = defectRate + "%"
            SetFieldList(newFieldList)
            storeData("FieldList",newFieldList , CurrentScreenId)
        
            
                    storeData("HybridDataObjects", newHybridObjectList, CurrentScreenId)
                  }}
              >
                <Text style={styles.textStyle}>Add</Text>
      
              </TouchableOpacity>
            </View>
            
          
      </View>
      
      
      </View>
      
      
  {/* ######################################## HYBRID maindefect ################################################################### */}

    <View id ="maindefect table" style={{marginVertical: 10, width: "100%", }}>
    <ScrollView horizontal id="maindefect table" contentContainerStyle={{flexDirection: "column"}}>
    
      <View style={{flexDirection: "row", paddingVertical: 7, backgroundColor: "#4682b4",  borderRadius: 3, justifyContent: "flex-start", alignItems: "center",}}>
        <FlatList
          id="Headings"
          data={(() => {
            var sampleObjectWithIdNegative1 = {}
            for(var obj of HybridDataObjects["maindefect"])
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
        data={HybridDataObjects["maindefect"].filter((rowObject) => rowObject.id != "-1")}
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
                              newHybridDataObjects["maindefect"] = newHybridDataObjects["maindefect"].filter((rowObject) => rowObject.id != item.value )
                              storeData("HybridDataObjects", newHybridDataObjects,CurrentScreenId )
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
    

  {/* ######################################## HYBRID block for maindefect ends ##################################################################### */}
      
  </View>
  
  
  
  
      
   <View id="view12" 
    style={{marginVertical: 5, 
            borderWidth: 2, 
            borderColor: "grey", justifyContent: "center", 
            alignItems: "center", borderRadius: 7,
            backgroundColor: '#e6e6fa',
            paddingVertical: 5,
            elevation: 50,

          }}>
  
      
      
      
      
      
     <View id="subview1" style={{marginVertical: 5, borderWidth: 0, borderColor: "grey", justifyContent: "center", alignItems: "center"}}>
    
      
      
          
      <View style={{flexDirection: "row"}}>
      
          
            
         <View style={{width: "99%", height: 45, marginHorizontal: 2, marginVertical: 2}}>  
         <FloatingLabelInput
              label="Write Defect Description"
              labelStyles={{color: "red", fontSize: 10, fontWeight: "bold"}}
              containerStyles={{
                borderWidth: 2,
                padding: 10,
                backgroundColor: 'white',
                borderColor: 'grey',
                borderRadius: 5,
              }}
              inputStyles={{fontWeight: "bold", fontSize: 15, color: "gray"}}
              keyboardType="default"
              maxLength={50}
              value={FieldList["measurementdefect"]}
              editable={true}
              onChangeText = {(newValue) => {
                var newFieldList = {...FieldList}
                newFieldList["measurementdefect"] = newValue
                //Some code from placeholder
                
                
                
                SetFieldList(newFieldList)
            }}
          />
          </View>

            
          
      </View>
      
      
      
      
          
          
          
      <View style={{flexDirection: "row"}}>
      
          
            
         <View style={{width: "32.333333333333336%", height: 45, marginHorizontal: 2, marginVertical: 2}}>  
         <FloatingLabelInput
              label="Critical"
              labelStyles={{color: "red", fontSize: 10, fontWeight: "bold"}}
              containerStyles={{
                borderWidth: 2,
                padding: 10,
                backgroundColor: 'white',
                borderColor: 'grey',
                borderRadius: 5,
              }}
              inputStyles={{fontWeight: "bold", fontSize: 15, color: "gray"}}
              keyboardType="numeric"
              maxLength={50}
              value={FieldList["measurementdefect_crit"]}
              editable={true}
              onChangeText = {(newValue) => {
                var newFieldList = {...FieldList}
                newFieldList["measurementdefect_crit"] = newValue
                //Some code from placeholder
                
                
                
                SetFieldList(newFieldList)
            }}
          />
          </View>

            
          
          
            
         <View style={{width: "32.333333333333336%", height: 45, marginHorizontal: 2, marginVertical: 2}}>  
         <FloatingLabelInput
              label="Major"
              labelStyles={{color: "red", fontSize: 10, fontWeight: "bold"}}
              containerStyles={{
                borderWidth: 2,
                padding: 10,
                backgroundColor: 'white',
                borderColor: 'grey',
                borderRadius: 5,
              }}
              inputStyles={{fontWeight: "bold", fontSize: 15, color: "gray"}}
              keyboardType="numeric"
              maxLength={50}
              value={FieldList["measurementdefect_maj"]}
              editable={true}
              onChangeText = {(newValue) => {
                var newFieldList = {...FieldList}
                newFieldList["measurementdefect_maj"] = newValue
                //Some code from placeholder
                
                
                
                SetFieldList(newFieldList)
            }}
          />
          </View>

            
          
          
            
         <View style={{width: "32.333333333333336%", height: 45, marginHorizontal: 2, marginVertical: 2}}>  
         <FloatingLabelInput
              label="Minor"
              labelStyles={{color: "red", fontSize: 10, fontWeight: "bold"}}
              containerStyles={{
                borderWidth: 2,
                padding: 10,
                backgroundColor: 'white',
                borderColor: 'grey',
                borderRadius: 5,
              }}
              inputStyles={{fontWeight: "bold", fontSize: 15, color: "gray"}}
              keyboardType="numeric"
              maxLength={50}
              value={FieldList["measurementdefect_min"]}
              editable={true}
              onChangeText = {(newValue) => {
                var newFieldList = {...FieldList}
                newFieldList["measurementdefect_min"] = newValue
                //Some code from placeholder
                
                
                
                SetFieldList(newFieldList)
            }}
          />
          </View>

            
          
      </View>
      
      
      
      
          
      <View style={{flexDirection: "row"}}>
      
          
            <View style={{borderColor: "grey", borderRadius: 5, marginTop: 10, borderWidth: 0, width: "80%"}}>
              <TouchableOpacity
                style={{ ...styles.openButton, marginHorizontal: 10, marginVertical: 10, alignSelf: "center"}}
                onPress={() => {
                    
                    var fieldNames = [] 
                    for(var obj of HybridDataObjects["measurementdefect"])
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
                    
                    newRowObject["id"] = (HybridDataObjects["measurementdefect"].length).toString()

                    var newHybridObjectList = {...HybridDataObjects}
                    newHybridObjectList["measurementdefect"].push(newRowObject)
                    console.log("####### Adding new row to table for measurementdefect ############")
                    console.log(newRowObject)

                    console.log("############# Hybrid data object being stored for screen id "+ CurrentScreenId+" ##############")
                    console.log(newHybridObjectList)
                    
                    SetHybridDataObjects(newHybridObjectList)

                    SetFieldList(newFieldList)
                    SetRadioButtonList(newRadioButtonList)

                    
                
                var totalCriticals = 0
                var totalMajors = 0
                var totalMinors  = 0
    
    
                for(var defectObj of HybridDataObjects["measurementdefect"])
                {
                    if(defectObj.id == "-1")
                        continue
    
                    totalCriticals += parseInt(defectObj.measurementdefect_crit)
                    totalMajors += parseInt(defectObj.measurementdefect_maj)
                    totalMinors += parseInt(defectObj.measurementdefect_min)
                }
    
                var newFieldList = {...FieldList}
    
                newFieldList["totalcritdefect"] = newFieldList["totalcritdefect"] != "" ? (parseInt(newFieldList["totalcritdefect"]) + parseInt(newRowObject.measurementdefect_crit)).toString() :  newRowObject.measurementdefect_crit.toString()
                newFieldList["totalmajordefect"] = newFieldList["totalmajordefect"] != "" ? (parseInt(newFieldList["totalmajordefect"]) + parseInt(newRowObject.measurementdefect_maj)).toString() : newRowObject.measurementdefect_maj.toString()
                newFieldList["totalminordefect"] = newFieldList["totalminordefect"] != "" ? (parseInt(newFieldList["totalminordefect"]) + parseInt(newRowObject.measurementdefect_min)).toString() :  newRowObject.measurementdefect_min.toString()
                newFieldList["totaldefect"] = (parseInt(newFieldList["totalcritdefect"]) + parseInt(newFieldList["totalmajordefect"]) + parseInt(newFieldList["totalminordefect"])).toString()
                
                var SampleSize = newFieldList["samplesize"]
                var defectRate = SampleSize != "" && newFieldList["totaldefect"] != "" ? ((parseInt(newFieldList["totaldefect"])/parseInt(SampleSize))*100).toString() : ""
                newFieldList["defectrate"] = defectRate + "%"

                
                SetFieldList(newFieldList)
                storeData("FieldList",newFieldList , CurrentScreenId)
                
                    storeData("HybridDataObjects", newHybridObjectList, CurrentScreenId)
                  }}
              >
                <Text style={styles.textStyle}>Add</Text>
      
              </TouchableOpacity>
            </View>
            
          
      </View>
      
      
      </View>
      
      
  {/* ######################################## HYBRID measurementdefect ################################################################### */}

    <View id ="measurementdefect table" style={{marginVertical: 10, width: "100%", }}>
    <ScrollView horizontal id="measurementdefect table" contentContainerStyle={{flexDirection: "column"}}>
    
      <View style={{flexDirection: "row", paddingVertical: 7, backgroundColor: "#4682b4",  borderRadius: 3, justifyContent: "flex-start", alignItems: "center",}}>
        <FlatList
          id="Headings"
          data={(() => {
            var sampleObjectWithIdNegative1 = {}
            for(var obj of HybridDataObjects["measurementdefect"])
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
        data={HybridDataObjects["measurementdefect"].filter((rowObject) => rowObject.id != "-1")}
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
                              newHybridDataObjects["measurementdefect"] = newHybridDataObjects["measurementdefect"].filter((rowObject) => rowObject.id != item.value )
                              storeData("HybridDataObjects", newHybridDataObjects,CurrentScreenId )
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
    

  {/* ######################################## HYBRID block for measurementdefect ends ##################################################################### */}
      
  </View>
  
  
  
  
      
   <View id="view13" 
    style={{marginVertical: 5, 
            borderWidth: 2, 
            borderColor: "grey", justifyContent: "center", 
            alignItems: "center", borderRadius: 7,
            backgroundColor: '#e6e6fa',
            paddingVertical: 5,
            elevation: 50,

          }}>
  
      
      
      
      
      
     <View id="subview1" style={{marginVertical: 5, borderWidth: 0, borderColor: "grey", justifyContent: "center", alignItems: "center"}}>
    
      
      
          
      <View style={{flexDirection: "row"}}>
      
          
            
         <View style={{width: "99%", height: 45, marginHorizontal: 2, marginVertical: 2}}>  
         <FloatingLabelInput
              label="Write Defect Description"
              labelStyles={{color: "red", fontSize: 10, fontWeight: "bold"}}
              containerStyles={{
                borderWidth: 2,
                padding: 10,
                backgroundColor: 'white',
                borderColor: 'grey',
                borderRadius: 5,
              }}
              inputStyles={{fontWeight: "bold", fontSize: 15, color: "gray"}}
              keyboardType="default"
              maxLength={50}
              value={FieldList["miscdefect"]}
              editable={true}
              onChangeText = {(newValue) => {
                var newFieldList = {...FieldList}
                newFieldList["miscdefect"] = newValue
                //Some code from placeholder
                
                
                
                SetFieldList(newFieldList)
            }}
          />
          </View>

            
          
      </View>
      
      
      
      
          
          
          
      <View style={{flexDirection: "row"}}>
      
          
            
         <View style={{width: "32.333333333333336%", height: 45, marginHorizontal: 2, marginVertical: 2}}>  
         <FloatingLabelInput
              label="Critical"
              labelStyles={{color: "red", fontSize: 10, fontWeight: "bold"}}
              containerStyles={{
                borderWidth: 2,
                padding: 10,
                backgroundColor: 'white',
                borderColor: 'grey',
                borderRadius: 5,
              }}
              inputStyles={{fontWeight: "bold", fontSize: 15, color: "gray"}}
              keyboardType="numeric"
              maxLength={50}
              value={FieldList["miscdefect_crit"]}
              editable={true}
              onChangeText = {(newValue) => {
                var newFieldList = {...FieldList}
                newFieldList["miscdefect_crit"] = newValue
                //Some code from placeholder
                
                
                
                SetFieldList(newFieldList)
            }}
          />
          </View>

            
          
          
            
         <View style={{width: "32.333333333333336%", height: 45, marginHorizontal: 2, marginVertical: 2}}>  
         <FloatingLabelInput
              label="Major"
              labelStyles={{color: "red", fontSize: 10, fontWeight: "bold"}}
              containerStyles={{
                borderWidth: 2,
                padding: 10,
                backgroundColor: 'white',
                borderColor: 'grey',
                borderRadius: 5,
              }}
              inputStyles={{fontWeight: "bold", fontSize: 15, color: "gray"}}
              keyboardType="numeric"
              maxLength={50}
              value={FieldList["miscdefect_maj"]}
              editable={true}
              onChangeText = {(newValue) => {
                var newFieldList = {...FieldList}
                newFieldList["miscdefect_maj"] = newValue
                //Some code from placeholder
                
                
                
                SetFieldList(newFieldList)
            }}
          />
          </View>

            
          
          
            
         <View style={{width: "32.333333333333336%", height: 45, marginHorizontal: 2, marginVertical: 2}}>  
         <FloatingLabelInput
              label="Minor"
              labelStyles={{color: "red", fontSize: 10, fontWeight: "bold"}}
              containerStyles={{
                borderWidth: 2,
                padding: 10,
                backgroundColor: 'white',
                borderColor: 'grey',
                borderRadius: 5,
              }}
              inputStyles={{fontWeight: "bold", fontSize: 15, color: "gray"}}
              keyboardType="numeric"
              maxLength={50}
              value={FieldList["miscdefect_min"]}
              editable={true}
              onChangeText = {(newValue) => {
                var newFieldList = {...FieldList}
                newFieldList["miscdefect_min"] = newValue
                //Some code from placeholder
                
                
                
                SetFieldList(newFieldList)
            }}
          />
          </View>

            
          
      </View>
      
      
      
      
          
      <View style={{flexDirection: "row"}}>
      
          
            <View style={{borderColor: "grey", borderRadius: 5, marginTop: 10, borderWidth: 0, width: "80%"}}>
              <TouchableOpacity
                style={{ ...styles.openButton, marginHorizontal: 10, marginVertical: 10, alignSelf: "center"}}
                onPress={() => {
                    
                    var fieldNames = [] 
                    for(var obj of HybridDataObjects["miscdefect"])
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
                    
                    newRowObject["id"] = (HybridDataObjects["miscdefect"].length).toString()

                    var newHybridObjectList = {...HybridDataObjects}
                    newHybridObjectList["miscdefect"].push(newRowObject)
                    console.log("####### Adding new row to table for miscdefect ############")
                    console.log(newRowObject)

                    console.log("############# Hybrid data object being stored for screen id "+ CurrentScreenId+" ##############")
                    console.log(newHybridObjectList)
                    
                    SetHybridDataObjects(newHybridObjectList)

                    SetFieldList(newFieldList)
                    SetRadioButtonList(newRadioButtonList)

                    
                    
                    var totalCriticals = 0
                    var totalMajors = 0
                    var totalMinors  = 0
        
        
                    for(var defectObj of HybridDataObjects["miscdefect"])
                    {
                        if(defectObj.id == "-1")
                            continue
        
                        totalCriticals += parseInt(defectObj.miscdefect_crit)
                        totalMajors += parseInt(defectObj.miscdefect_maj)
                        totalMinors += parseInt(defectObj.miscdefect_min)
                    }
        
                    var newFieldList = {...FieldList}
        
                    newFieldList["totalcritdefect"] = newFieldList["totalcritdefect"] != "" ? (parseInt(newFieldList["totalcritdefect"]) + parseInt(newRowObject.miscdefect_crit)).toString() :  newRowObject.miscdefect_crit.toString()
                    newFieldList["totalmajordefect"] = newFieldList["totalmajordefect"] != "" ? (parseInt(newFieldList["totalmajordefect"]) + parseInt(newRowObject.miscdefect_maj)).toString() : newRowObject.miscdefect_maj.toString()
                    newFieldList["totalminordefect"] = newFieldList["totalminordefect"] != "" ? (parseInt(newFieldList["totalminordefect"]) + parseInt(newRowObject.miscdefect_min)).toString() :  newRowObject.miscdefect_min.toString()
                    newFieldList["totaldefect"] = (parseInt(newFieldList["totalcritdefect"]) + parseInt(newFieldList["totalmajordefect"]) + parseInt(newFieldList["totalminordefect"])).toString()
                    
                    var SampleSize = newFieldList["samplesize"]
                    var defectRate = SampleSize != "" && newFieldList["totaldefect"] != "" ? ((parseInt(newFieldList["totaldefect"])/parseInt(SampleSize))*100).toString() : ""
                    newFieldList["defectrate"] = defectRate + "%"
                    
                    
                    SetFieldList(newFieldList)
                    storeData("FieldList",newFieldList , CurrentScreenId)
                    
                    storeData("HybridDataObjects", newHybridObjectList, CurrentScreenId)
                  }}
              >
                <Text style={styles.textStyle}>Add</Text>
      
              </TouchableOpacity>
            </View>
            
          
      </View>
      
      
      </View>
      
      
  {/* ######################################## HYBRID miscdefect ################################################################### */}

    <View id ="miscdefect table" style={{marginVertical: 10, width: "100%", }}>
    <ScrollView horizontal id="miscdefect table" contentContainerStyle={{flexDirection: "column"}}>
    
      <View style={{flexDirection: "row", paddingVertical: 7, backgroundColor: "#4682b4",  borderRadius: 3, justifyContent: "flex-start", alignItems: "center",}}>
        <FlatList
          id="Headings"
          data={(() => {
            var sampleObjectWithIdNegative1 = {}
            for(var obj of HybridDataObjects["miscdefect"])
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
        data={HybridDataObjects["miscdefect"].filter((rowObject) => rowObject.id != "-1")}
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
                              newHybridDataObjects["miscdefect"] = newHybridDataObjects["miscdefect"].filter((rowObject) => rowObject.id != item.value )
                              storeData("HybridDataObjects", newHybridDataObjects,CurrentScreenId )
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
    

  {/* ######################################## HYBRID block for miscdefect ends ##################################################################### */}
      
  </View>
  
  
  
  
      
   <View id="view14" 
    style={{marginVertical: 5, 
            borderWidth: 0, 
            borderColor: "grey", justifyContent: "center", 
            alignItems: "center", borderRadius: 7,
            backgroundColor: '#b0c4de',
            paddingVertical: 5,
            elevation: 50,

          }}>
  
      
      
          
      <View style={{flexDirection: "row"}}>
      
          

          {/* ############################################ TEXTINPUT FIELD totalcritdefect ###################################################### */}
         <View style={{width: "99%", marginHorizontal: 5, marginVertical: 2}}>  
         <FloatingLabelInput
              label="Total Critical Defect"
              labelStyles={{fontSize: 12, fontWeight: "bold", backgroundColor: "#b0c4de", paddingHorizontal: 4, borderRadius: 2, paddingVertical: 1}}
              staticLabel
              customLabelStyles={{
                colorFocused: 'red',
                fontSizeFocused: 12,
              }}
              keyboardType="default"
              containerStyles={{
                borderWidth: 2,
                padding: 10,
                backgroundColor: 'white',
                borderColor: 'grey',
                borderRadius: 5,
              }}
              inputStyles={{fontWeight: "bold", fontSize: 15, color: "gray"}}
              maxLength={50}
              value={FieldList["totalcritdefect"]}
              editable={true}
              onChangeText = {(newValue) => {
                  
                  var newFieldsObject = {...FieldList}
                  newFieldsObject["totalcritdefect"] = newValue
                  //Some code from placeholder
                  

                  SetFieldList(newFieldsObject)
                  storeData("FieldList", newFieldsObject, CurrentScreenId)
              }}
          />
          </View>
            {/* ############################################ TEXTINPUT FIELD totalcritdefect ends ###################################################### */}
            
          
      </View>
      
      
  </View>
  
  
  
  
      
   <View id="view15" 
    style={{marginVertical: 5, 
            borderWidth: 0, 
            borderColor: "grey", justifyContent: "center", 
            alignItems: "center", borderRadius: 7,
            backgroundColor: '#b0c4de',
            paddingVertical: 5,
            elevation: 50,

          }}>
  
      
      
          
      <View style={{flexDirection: "row"}}>
      
          

          {/* ############################################ TEXTINPUT FIELD totalmajordefect ###################################################### */}
         <View style={{width: "99%", marginHorizontal: 5, marginVertical: 2}}>  
         <FloatingLabelInput
              label="Total Major Defect"
              labelStyles={{fontSize: 12, fontWeight: "bold", backgroundColor: "#b0c4de", paddingHorizontal: 4, borderRadius: 2, paddingVertical: 1}}
              staticLabel
              customLabelStyles={{
                colorFocused: 'red',
                fontSizeFocused: 12,
              }}
              keyboardType="default"
              containerStyles={{
                borderWidth: 2,
                padding: 10,
                backgroundColor: 'white',
                borderColor: 'grey',
                borderRadius: 5,
              }}
              inputStyles={{fontWeight: "bold", fontSize: 15, color: "gray"}}
              maxLength={50}
              value={FieldList["totalmajordefect"]}
              editable={true}
              onChangeText = {(newValue) => {
                  
                  var newFieldsObject = {...FieldList}
                  newFieldsObject["totalmajordefect"] = newValue
                  //Some code from placeholder
                  

                  SetFieldList(newFieldsObject)
                  storeData("FieldList", newFieldsObject, CurrentScreenId)
              }}
          />
          </View>
            {/* ############################################ TEXTINPUT FIELD totalmajordefect ends ###################################################### */}
            
          
      </View>
      
      
  </View>
  
  
  
  
      
   <View id="view16" 
    style={{marginVertical: 5, 
            borderWidth: 0, 
            borderColor: "grey", justifyContent: "center", 
            alignItems: "center", borderRadius: 7,
            backgroundColor: '#b0c4de',
            paddingVertical: 5,
            elevation: 50,

          }}>
  
      
      
          
      <View style={{flexDirection: "row"}}>
      
          

          {/* ############################################ TEXTINPUT FIELD totalminordefect ###################################################### */}
         <View style={{width: "99%", marginHorizontal: 5, marginVertical: 2}}>  
         <FloatingLabelInput
              label="Total Minor Defect"
              labelStyles={{fontSize: 12, fontWeight: "bold", backgroundColor: "#b0c4de", paddingHorizontal: 4, borderRadius: 2, paddingVertical: 1}}
              staticLabel
              customLabelStyles={{
                colorFocused: 'red',
                fontSizeFocused: 12,
              }}
              keyboardType="default"
              containerStyles={{
                borderWidth: 2,
                padding: 10,
                backgroundColor: 'white',
                borderColor: 'grey',
                borderRadius: 5,
              }}
              inputStyles={{fontWeight: "bold", fontSize: 15, color: "gray"}}
              maxLength={50}
              value={FieldList["totalminordefect"]}
              editable={true}
              onChangeText = {(newValue) => {
                  
                  var newFieldsObject = {...FieldList}
                  newFieldsObject["totalminordefect"] = newValue
                  //Some code from placeholder
                  

                  SetFieldList(newFieldsObject)
                  storeData("FieldList", newFieldsObject, CurrentScreenId)
              }}
          />
          </View>
            {/* ############################################ TEXTINPUT FIELD totalminordefect ends ###################################################### */}
            
          
      </View>
      
      
  </View>
  
  
  
  
      
   <View id="view17" 
    style={{marginVertical: 5, 
            borderWidth: 0, 
            borderColor: "grey", justifyContent: "center", 
            alignItems: "center", borderRadius: 7,
            backgroundColor: '#b0c4de',
            paddingVertical: 5,
            elevation: 50,

          }}>
  
      
      
          
      <View style={{flexDirection: "row"}}>
      
          

          {/* ############################################ TEXTINPUT FIELD totaldefect ###################################################### */}
         <View style={{width: "99%", marginHorizontal: 5, marginVertical: 2}}>  
         <FloatingLabelInput
              label="Total Defect"
              labelStyles={{fontSize: 12, fontWeight: "bold", backgroundColor: "#b0c4de", paddingHorizontal: 4, borderRadius: 2, paddingVertical: 1}}
              staticLabel
              customLabelStyles={{
                colorFocused: 'red',
                fontSizeFocused: 12,
              }}
              keyboardType="default"
              containerStyles={{
                borderWidth: 2,
                padding: 10,
                backgroundColor: 'white',
                borderColor: 'grey',
                borderRadius: 5,
              }}
              inputStyles={{fontWeight: "bold", fontSize: 15, color: "gray"}}
              maxLength={50}
              value={FieldList["totaldefect"]}
              editable={true}
              onChangeText = {(newValue) => {
                  
                  var newFieldsObject = {...FieldList}
                  newFieldsObject["totaldefect"] = newValue
                  //Some code from placeholder
                  

                  SetFieldList(newFieldsObject)
                  storeData("FieldList", newFieldsObject, CurrentScreenId)
              }}
          />
          </View>
            {/* ############################################ TEXTINPUT FIELD totaldefect ends ###################################################### */}
            
          
      </View>
      
      
  </View>
  
  
  
  
      
   <View id="view18" 
    style={{marginVertical: 5, 
            borderWidth: 0, 
            borderColor: "grey", justifyContent: "center", 
            alignItems: "center", borderRadius: 7,
            backgroundColor: '#b0c4de',
            paddingVertical: 5,
            elevation: 50,

          }}>
  
      
      
          
      <View style={{flexDirection: "row"}}>
      
          

          {/* ############################################ TEXTINPUT FIELD defectrate ###################################################### */}
         <View style={{width: "99%", marginHorizontal: 5, marginVertical: 2}}>  
         <FloatingLabelInput
              label="Defect Rate"
              labelStyles={{fontSize: 12, fontWeight: "bold", backgroundColor: "#b0c4de", paddingHorizontal: 4, borderRadius: 2, paddingVertical: 1}}
              staticLabel
              customLabelStyles={{
                colorFocused: 'red',
                fontSizeFocused: 12,
              }}
              keyboardType="default"
              containerStyles={{
                borderWidth: 2,
                padding: 10,
                backgroundColor: 'white',
                borderColor: 'grey',
                borderRadius: 5,
              }}
              inputStyles={{fontWeight: "bold", fontSize: 15, color: "gray"}}
              maxLength={50}
              value={FieldList["defectrate"]}
              editable={true}
              onChangeText = {(newValue) => {
                  
                  var newFieldsObject = {...FieldList}
                  newFieldsObject["defectrate"] = newValue
                  //Some code from placeholder
                  

                  SetFieldList(newFieldsObject)
                  storeData("FieldList", newFieldsObject, CurrentScreenId)
              }}
          />
          </View>
            {/* ############################################ TEXTINPUT FIELD defectrate ends ###################################################### */}
            
          
      </View>
      
      
  </View>
  
  
  
  
      
   <View id="view19" 
    style={{marginVertical: 5, 
            borderWidth: 2, 
            borderColor: "grey", justifyContent: "center", 
            alignItems: "center", borderRadius: 7,
            backgroundColor: '#b0c4de',
            paddingVertical: 5,
            elevation: 50,

          }}>
  
      
      
          
      <View style={{flexDirection: "row"}}>
      
          
          {/* ################################################## RADIO BUTTON result ########################################## */}
            <View style={{borderColor: "grey", borderRadius: 5, marginTop: 10, borderWidth: 0, width: "80%"}}>
                <Text style={{color: "red", fontSize: 15, marginHorizontal: 10, marginTop: 10}}>result</Text>
                <RadioButtonRN
                    style={{width: "80%", marginHorizontal: 25, marginBottom: 15}}
                    textStyle={{marginHorizontal: 10, fontSize: 12, fontWeight: "bold", color: "grey"}}
                    data={

                        (() => {
                          var labelList = []
                          for (var labelObject of [{"name":"Passed"},{"name":"Failed"},{"name":"onhold"}])
                            labelList.push({label: labelObject.name})

                          return labelList
                        })()
                      }
                    selectedBtn={(SelectedOutcome) => {
                    
                    var newRadioButtonList = {...RadioButtonList}
                    newRadioButtonList["result"] = SelectedOutcome.label
                    //Some code from placeholder
                    SetRadioButtonList(newRadioButtonList)
                    storeData("RadioButtonList", newRadioButtonList, CurrentScreenId)
                    
                    }}
                    initial={(() => {
                      
                      var index = 1
                      for (var labelObject of [{"name":"Passed"},{"name":"Failed"},{"name":"onhold"}])
                      {
                          if(RadioButtonList["result"] == labelObject.name)
                            return index

                          index = index + 1
                      }
                      
                      return -1

                  })()}
                    circleSize={10}
                    boxStyle={{height: 45, backgroundColor: "white"}}
                    deactiveColor="grey"
                    activeColor="green"
                    
                    // boxActiveBgColor={InspectionOutcome == "FAILED" ? "#f08080" : "#90ee90"}

                />   
            </View>
                {/* ################################################## RADIO BUTTON result ends ########################################## */}
            
          
      </View>
      
      
  </View>
  
  
  
  
      
      
   <View id="view20" 
    style={{marginVertical: 5, 
            borderWidth: 0, 
            borderColor: "grey", justifyContent: "center", 
            alignItems: "center", borderRadius: 7,
            backgroundColor: '#b0c4de',
            paddingVertical: 5,
            elevation: 50,

          }}>
  
      
      
          
      <View style={{flexDirection: "row"}}>
      
          

          {/* ############################################ TEXTINPUT FIELD measurementDeviation ###################################################### */}
         <View style={{width: "99%", marginHorizontal: 5, marginVertical: 2}}>  
         <FloatingLabelInput
              label="Measurement Deviation"
              labelStyles={{fontSize: 12, fontWeight: "bold", backgroundColor: "#b0c4de", paddingHorizontal: 4, borderRadius: 2, paddingVertical: 1}}
              staticLabel
              customLabelStyles={{
                colorFocused: 'red',
                fontSizeFocused: 12,
              }}
              keyboardType="default"
              containerStyles={{
                borderWidth: 2,
                padding: 10,
                backgroundColor: 'white',
                borderColor: 'grey',
                borderRadius: 5,
              }}
              inputStyles={{fontWeight: "bold", fontSize: 15, color: "gray"}}
              maxLength={50}
              value={FieldList["measurementDeviation"]}
              editable={true}
              onChangeText = {(newValue) => {
                  
                  var newFieldsObject = {...FieldList}
                  newFieldsObject["measurementDeviation"] = newValue
                  //Some code from placeholder
                  

                  SetFieldList(newFieldsObject)
                  storeData("FieldList", newFieldsObject, CurrentScreenId)
              }}
          />
          </View>
            {/* ############################################ TEXTINPUT FIELD measurementDeviation ends ###################################################### */}
            
          
      </View>
      
      
      
      
          
      <View style={{flexDirection: "row"}}>
      
          

          {/* ############################################ TEXTINPUT FIELD finalRemarks ###################################################### */}
         <View style={{width: "99%", marginHorizontal: 5, marginVertical: 2}}>  
         <FloatingLabelInput
              label="Comments"
              labelStyles={{fontSize: 12, fontWeight: "bold", backgroundColor: "#b0c4de", paddingHorizontal: 4, borderRadius: 2, paddingVertical: 1}}
              staticLabel
              customLabelStyles={{
                colorFocused: 'red',
                fontSizeFocused: 12,
              }}
              keyboardType="default"
              containerStyles={{
                borderWidth: 2,
                padding: 10,
                backgroundColor: 'white',
                borderColor: 'grey',
                borderRadius: 5,
              }}
              inputStyles={{fontWeight: "bold", fontSize: 15, color: "gray"}}
              maxLength={50}
              value={FieldList["finalRemarks"]}
              editable={true}
              onChangeText = {(newValue) => {
                  
                  var newFieldsObject = {...FieldList}
                  newFieldsObject["finalRemarks"] = newValue
                  //Some code from placeholder
                  

                  SetFieldList(newFieldsObject)
                  storeData("FieldList", newFieldsObject, CurrentScreenId)
              }}
          />
          </View>
            {/* ############################################ TEXTINPUT FIELD finalRemarks ends ###################################################### */}
            
          
      </View>
      
      
  </View>
  
  
  
  
      
   <View id="view21" 
    style={{marginVertical: 5, 
            borderWidth: 0, 
            borderColor: "grey", justifyContent: "center", 
            alignItems: "center", borderRadius: 7,
            backgroundColor: '#e6e6fa',
            paddingVertical: 5,
            elevation: 50,

          }}>
  
      
      
          
      <View style={{flexDirection: "row"}}>
      
          
          {/* ################################################## BUTTON finalSubmission ################################################ */}
            <View style={{borderColor: "green", borderRadius: 5, marginTop: 10, borderWidth: 0, width: "80%"}}>
              <TouchableOpacity
                style={{ ...styles.openButton, marginHorizontal: 10, marginVertical: 10, alignSelf: "center"}}
                onPress={() => {
                  
                  
                //clearAll()
                //return 

                var cleanData = getCleanData({...CompleteCurrentScreenData}, {...FieldList}, {...DropdownList}, {...HybridDataObjects}, {...ChecklistDataObjects} , {...RadioButtonList})
                console.log("############################ Cleaned data for current screen ##########################")
                console.log(cleanData)
            
                var resquestObject = CustomDataModifierFunction(cleanData)

                console.log("############## Data being sent to API ################")
                console.log(resquestObject)
                const fetchConfig = {
                  method: "POST",
                        body: JSON.stringify(resquestObject),
                        headers: {
                          "Content-Type": "application/json",
                          Accept: "application/json",
                        },
                  }

                  fetch("https://maxservicestg.bluekaktus.com/Service1.svc/SaveInspectionFormData_max", fetchConfig)
                  .then(response => response.json())
                  .then(body => {
                    Alert.alert(body["MESSAGE"])
                    removeValue(cleanData.screenBackgroundInfo["TNA_ACTIVITY_ID"])
                    
                  })
                  .then(() => props.navigation.navigate("Home"))
                  
            
              }}
              >
                <Text style={styles.textStyle}>Submit</Text>
      
              </TouchableOpacity>
            </View>
            {/* ################################################## BUTTON finalSubmission ends ################################################ */}
            
          
      </View>
      
      
  </View>
  
  
</View>


        <Text style={{color: "grey", fontSize: 20, fontWeight: "bold", marginVertical: 10}}>{Sentence}</Text>
    
    </ScrollView>
  );
};

{/*
  const styles = StyleSheet.create({
    input: {
        borderWidth: 2,
        paddingHorizontal: 15,
        borderColor: "grey",
        padding: 10,
        marginVertical: 2,
        marginHorizontal: 5,
        color: "gray",
        fontSize: 15,
        fontWeight: "bold",
        borderRadius: 5,
        width: "100%"
       
       
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
      },
      openButton: {
        backgroundColor: "#b0c4de",
        borderRadius: 5,
        padding: 10,
        elevation: 10,

      }
});
*/}

export default GeneratedCode;

