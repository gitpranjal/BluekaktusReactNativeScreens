
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

const storeData = async (key, value, CurrentScreenId, autoSave = true, explicitSave = false) => {
  //console.log("#################### screen id recieved in storeData function #############")
  //console.log(CurrentScreenId)
  //console.log("##################### value recieved in storeData function ##############")
  //console.log(value)
  autoSave = autoSave
  if(!autoSave && !explicitSave)
  {
    console.log("AutoSave is currently false")
    return
  }

  if(explicitSave == true)
  {
    console.log("######## Saving data explicitcly at screen ID "+CurrentScreenId+"############")
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

  //if(currentScreenDataObject["FieldList"] == null)
    currentScreenDataObject["FieldList"] = FieldList
  
  //if(currentScreenDataObject["DropdownList"] == null)
    currentScreenDataObject["DropdownList"] = DropdownList

  //if(currentScreenDataObject["HybridDataObjects"] == null)
    currentScreenDataObject["HybridDataObjects"] = HybridDataObjects

  //if(currentScreenDataObject["ChecklistDataObjects"] == null)
    currentScreenDataObject["ChecklistDataObjects"] = ChecklistDataObjects

  //if(currentScreenDataObject["RadioButtonList"] == null)
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
                    "INSPECTION_DATE": "2021-04-09 10:24:03",
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
                    "RESULT": cleanDataFromScreen.InspectionResult ,
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
                    "MINOR": defectObj.maindefect_min,
                    "TYPE": "Defect",
                    "DEFECT_ID": defectObj.id,
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
  const [FieldList, SetFieldList] = useState({"buyer_name":"","cut_qty":"","stitch_qty":"","wash_qty":"","pkd_qty":"","workmanship_comments":"","factory_representative":""})
  const [DropdownList, SetDropdownList] = useState({})
  const [RadioButtonList, SetRadioButtonList] = useState({})
  const [HybridDataObjects, SetHybridDataObjects] = useState({})
  const [ChecklistDataObjects, SetChecklistDataObjects] = useState({"quality_checklist":[{"id":"-1","name":{"type":"textField","title":"Name","options":[]},"result":{"type":"radioButton","title":"Result","options":[{"id":1,"name":"Accept"},{"id":2,"name":"Reject"},{"id":3,"name":"NA"}]},"remarks":{"type":"textInputField","title":"Remarks","options":[]}}]})
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
      console.log("################ Data for screen code "+ CurrentScreenId + " ###################")
      console.log(data)

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
      
          

          {/* ############################################ TEXTINPUT FIELD buyer_name ###################################################### */}
         <View style={{width: "99%", marginHorizontal: 5, marginVertical: 2}}>  
         <FloatingLabelInput
              label="Buyer"
              labelStyles={{fontSize: 12, fontWeight: "bold", backgroundColor: "#b0c4de", paddingHorizontal: 4, borderRadius: 2, paddingVertical: 1}}
              staticLabel
              customLabelStyles={{
                //colorFocused: 'red',
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
              value={FieldList["buyer_name"]}
              editable={true}
              onChangeText = {(newValue) => {
                  
                  var newFieldsObject = {...FieldList}
                  newFieldsObject["buyer_name"] = newValue
                  //Some code from placeholder
                  

                  SetFieldList(newFieldsObject)
                  storeData("FieldList", newFieldsObject, CurrentScreenId)
              }}
          />
          </View>
            {/* ############################################ TEXTINPUT FIELD buyer_name ends ###################################################### */}
            
          
      </View>
      
      
  </View>
  
  
  
  
      
   <View id="view2" 
    style={{marginVertical: 5, 
            borderWidth: 0, 
            borderColor: "grey", justifyContent: "center", 
            alignItems: "center", borderRadius: 7,
            backgroundColor: '#e6e6fa',
            paddingVertical: 5,
            elevation: 50,

          }}>
  
      
      
          
      <View style={{flexDirection: "row"}}>
      
          
          {/* ################################################## BUTTON upload_image ################################################ */}
            <View style={{borderColor: "green", borderRadius: 5, marginTop: 10, borderWidth: 0, width: "80%"}}>
              <TouchableOpacity
                style={{ ...styles.openButton, marginHorizontal: 10, marginVertical: 10, alignSelf: "center"}}
                onPress={() => {
                  
                  //Some code from placeholder
              }}
              >
                <Text style={styles.textStyle}>Upload Image</Text>
      
              </TouchableOpacity>
            </View>
            {/* ################################################## BUTTON upload_image ends ################################################ */}
            
          
      </View>
      
      
  </View>
  
  
  
  
      
   <View id="view3" 
    style={{marginVertical: 5, 
            borderWidth: 0, 
            borderColor: "grey", justifyContent: "center", 
            alignItems: "center", borderRadius: 7,
            backgroundColor: '#e6e6fa',
            paddingVertical: 5,
            elevation: 50,

          }}>
  
      
      
          
          
          
          
      <View style={{flexDirection: "row"}}>
      
          
              <Text
              style={{...styles.input, width: "24%"}}
              >
              Fit Sample Comments : {FieldList["fit_sample"]}
              </Text> 

            {/* ######################################### TEXT FIELD BLOC OF fit_sample ends ############################################## */}
                  
          
          
              <Text
              style={{...styles.input, width: "24%"}}
              >
              undefined : {FieldList["undefined"]}
              </Text> 

            {/* ######################################### TEXT FIELD BLOC OF undefined ends ############################################## */}
                  
          
          
              <Text
              style={{...styles.input, width: "24%"}}
              >
              undefined : {FieldList["undefined"]}
              </Text> 

            {/* ######################################### TEXT FIELD BLOC OF undefined ends ############################################## */}
                  
          
          
              <Text
              style={{...styles.input, width: "24%"}}
              >
              undefined : {FieldList["undefined"]}
              </Text> 

            {/* ######################################### TEXT FIELD BLOC OF undefined ends ############################################## */}
                  
          
      </View>
      
      
  </View>
  
  
  
  
      
   <View id="view4" 
    style={{marginVertical: 5, 
            borderWidth: 0, 
            borderColor: "grey", justifyContent: "center", 
            alignItems: "center", borderRadius: 7,
            backgroundColor: '#e6e6fa',
            paddingVertical: 5,
            elevation: 50,

          }}>
  
      
      
          
          
          
          
      <View style={{flexDirection: "row"}}>
      
          
              <Text
              style={{...styles.input, width: "24%"}}
              >
              PP Sample : {FieldList["pp_sample"]}
              </Text> 

            {/* ######################################### TEXT FIELD BLOC OF pp_sample ends ############################################## */}
                  
          
          
              <Text
              style={{...styles.input, width: "24%"}}
              >
              undefined : {FieldList["undefined"]}
              </Text> 

            {/* ######################################### TEXT FIELD BLOC OF undefined ends ############################################## */}
                  
          
          
              <Text
              style={{...styles.input, width: "24%"}}
              >
              undefined : {FieldList["undefined"]}
              </Text> 

            {/* ######################################### TEXT FIELD BLOC OF undefined ends ############################################## */}
                  
          
          
              <Text
              style={{...styles.input, width: "24%"}}
              >
              undefined : {FieldList["undefined"]}
              </Text> 

            {/* ######################################### TEXT FIELD BLOC OF undefined ends ############################################## */}
                  
          
      </View>
      
      
  </View>
  
  
  
  
      
   <View id="view5" 
    style={{marginVertical: 5, 
            borderWidth: 0, 
            borderColor: "grey", justifyContent: "center", 
            alignItems: "center", borderRadius: 7,
            backgroundColor: '#e6e6fa',
            paddingVertical: 5,
            elevation: 50,

          }}>
  
      
      
          
          
          
          
      <View style={{flexDirection: "row"}}>
      
          
              <Text
              style={{...styles.input, width: "24%"}}
              >
              Approved Fabrics & Trims : {FieldList["approved_fabric_trims"]}
              </Text> 

            {/* ######################################### TEXT FIELD BLOC OF approved_fabric_trims ends ############################################## */}
                  
          
          
              <Text
              style={{...styles.input, width: "24%"}}
              >
              undefined : {FieldList["undefined"]}
              </Text> 

            {/* ######################################### TEXT FIELD BLOC OF undefined ends ############################################## */}
                  
          
          
              <Text
              style={{...styles.input, width: "24%"}}
              >
              undefined : {FieldList["undefined"]}
              </Text> 

            {/* ######################################### TEXT FIELD BLOC OF undefined ends ############################################## */}
                  
          
          
              <Text
              style={{...styles.input, width: "24%"}}
              >
              undefined : {FieldList["undefined"]}
              </Text> 

            {/* ######################################### TEXT FIELD BLOC OF undefined ends ############################################## */}
                  
          
      </View>
      
      
  </View>
  
  
  
  
      
   <View id="view6" 
    style={{marginVertical: 5, 
            borderWidth: 0, 
            borderColor: "grey", justifyContent: "center", 
            alignItems: "center", borderRadius: 7,
            backgroundColor: '#e6e6fa',
            paddingVertical: 5,
            elevation: 50,

          }}>
  
      
      
          
      <View style={{flexDirection: "row"}}>
      
          
              <Text
              style={{...styles.input, width: "99%"}}
              >
              Production Status : {FieldList["production_status"]}
              </Text> 

            {/* ######################################### TEXT FIELD BLOC OF production_status ends ############################################## */}
                  
          
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
      
          

          {/* ############################################ TEXTINPUT FIELD cut_qty ###################################################### */}
         <View style={{width: "49%", marginHorizontal: 5, marginVertical: 2}}>  
         <FloatingLabelInput
              label="Cut Qty"
              labelStyles={{fontSize: 12, fontWeight: "bold", backgroundColor: "#b0c4de", paddingHorizontal: 4, borderRadius: 2, paddingVertical: 1}}
              staticLabel
              customLabelStyles={{
                //colorFocused: 'red',
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
              value={FieldList["cut_qty"]}
              editable={true}
              onChangeText = {(newValue) => {
                  
                  var newFieldsObject = {...FieldList}
                  newFieldsObject["cut_qty"] = newValue
                  //Some code from placeholder
                  

                  SetFieldList(newFieldsObject)
                  storeData("FieldList", newFieldsObject, CurrentScreenId)
              }}
          />
          </View>
            {/* ############################################ TEXTINPUT FIELD cut_qty ends ###################################################### */}
            
          
          

          {/* ############################################ TEXTINPUT FIELD stitch_qty ###################################################### */}
         <View style={{width: "49%", marginHorizontal: 5, marginVertical: 2}}>  
         <FloatingLabelInput
              label="Stitch Qty"
              labelStyles={{fontSize: 12, fontWeight: "bold", backgroundColor: "#b0c4de", paddingHorizontal: 4, borderRadius: 2, paddingVertical: 1}}
              staticLabel
              customLabelStyles={{
                //colorFocused: 'red',
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
              value={FieldList["stitch_qty"]}
              editable={true}
              onChangeText = {(newValue) => {
                  
                  var newFieldsObject = {...FieldList}
                  newFieldsObject["stitch_qty"] = newValue
                  //Some code from placeholder
                  

                  SetFieldList(newFieldsObject)
                  storeData("FieldList", newFieldsObject, CurrentScreenId)
              }}
          />
          </View>
            {/* ############################################ TEXTINPUT FIELD stitch_qty ends ###################################################### */}
            
          
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
      
          

          {/* ############################################ TEXTINPUT FIELD wash_qty ###################################################### */}
         <View style={{width: "49%", marginHorizontal: 5, marginVertical: 2}}>  
         <FloatingLabelInput
              label="Wash Qty"
              labelStyles={{fontSize: 12, fontWeight: "bold", backgroundColor: "#b0c4de", paddingHorizontal: 4, borderRadius: 2, paddingVertical: 1}}
              staticLabel
              customLabelStyles={{
                //colorFocused: 'red',
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
              value={FieldList["wash_qty"]}
              editable={true}
              onChangeText = {(newValue) => {
                  
                  var newFieldsObject = {...FieldList}
                  newFieldsObject["wash_qty"] = newValue
                  //Some code from placeholder
                  

                  SetFieldList(newFieldsObject)
                  storeData("FieldList", newFieldsObject, CurrentScreenId)
              }}
          />
          </View>
            {/* ############################################ TEXTINPUT FIELD wash_qty ends ###################################################### */}
            
          
          

          {/* ############################################ TEXTINPUT FIELD pkd_qty ###################################################### */}
         <View style={{width: "49%", marginHorizontal: 5, marginVertical: 2}}>  
         <FloatingLabelInput
              label="Pkd Qty"
              labelStyles={{fontSize: 12, fontWeight: "bold", backgroundColor: "#b0c4de", paddingHorizontal: 4, borderRadius: 2, paddingVertical: 1}}
              staticLabel
              customLabelStyles={{
                //colorFocused: 'red',
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
              value={FieldList["pkd_qty"]}
              editable={true}
              onChangeText = {(newValue) => {
                  
                  var newFieldsObject = {...FieldList}
                  newFieldsObject["pkd_qty"] = newValue
                  //Some code from placeholder
                  

                  SetFieldList(newFieldsObject)
                  storeData("FieldList", newFieldsObject, CurrentScreenId)
              }}
          />
          </View>
            {/* ############################################ TEXTINPUT FIELD pkd_qty ends ###################################################### */}
            
          
      </View>
      
      
  </View>
  
  
  
  
      
   <View id="view9" 
    style={{marginVertical: 5, 
            borderWidth: 0, 
            borderColor: "grey", justifyContent: "center", 
            alignItems: "center", borderRadius: 7,
            backgroundColor: '#e6e6fa',
            paddingVertical: 5,
            elevation: 50,

          }}>
  
      
      
          
      <View style={{flexDirection: "row"}}>
      
          
              <Text
              style={{...styles.input, width: "99%"}}
              >
              Quality Checklist : {FieldList["quality_checklist_label"]}
              </Text> 

            {/* ######################################### TEXT FIELD BLOC OF quality_checklist_label ends ############################################## */}
                  
          
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
  
      
    {/* ############################################## CHECKLIST quality_checklist START ######################################################################## */}

    <View id ="quality_checklist table" style={{marginVertical: 10, width: "100%",}}>
    <ScrollView horizontal id="quality_checklist table" contentContainerStyle={{flexDirection: "column"}}>
    
      <View style={{flexDirection: "row", paddingVertical: 7, backgroundColor: "#4682b4",  borderRadius: 3, justifyContent: "flex-start", alignItems: "center",}}>
        <FlatList
          id="Headings"
          data={(() => {
            var sampleObjectWithIdNegative1 = {}
            for(var obj of ChecklistDataObjects["quality_checklist"])
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
        data={ChecklistDataObjects["quality_checklist"].filter((rowObject) => rowObject.id != "-1")}
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
                                      for(var i = 0; i<newChecklistDataObjects["quality_checklist"].length; i++ )
                                      {
                                        if(newChecklistDataObjects["quality_checklist"][i].id == item.rowId)
                                        {
                                          newChecklistDataObjects["quality_checklist"][i][item.type]["value"] = newValue
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
                          for(var i = 0; i<newChecklistDataObjects["quality_checklist"].length; i++ )
                          {
                            if(newChecklistDataObjects["quality_checklist"][i].id == item.rowId)
                            {
                              newChecklistDataObjects["quality_checklist"][i][item.type]["SelectedValue"] = newChecklistDataObjects["quality_checklist"][i][item.type]["ValuesList"][selectedIndex].name
                              break
                            }
                          }

                        storeData("ChecklistDataObjects", newChecklistDataObjects, CurrentScreenId)
                        SetChecklistDataObjects(newChecklistDataObjects)

                        console.log("#################### current checklist object modified to ####################")
                        console.log(newChecklistDataObjects["quality_checklist"])

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
                      value={ChecklistDataObjects["quality_checklist"].filter((rowObject) => rowObject.id == item.rowId)[0][item.type]["value"]}    //item.type means the column(name)
                      editable={true}
                      onChangeText = {(newValue) => {
                        
                        var newChecklistDataObjects = {...ChecklistDataObjects}
                        for(var i = 0; i<newChecklistDataObjects["quality_checklist"].length; i++ )
                        {
                          if(newChecklistDataObjects["quality_checklist"][i].id == item.rowId)
                          {
                            newChecklistDataObjects["quality_checklist"][i][item.type]["value"] = newValue
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
            borderWidth: 0, 
            borderColor: "grey", justifyContent: "center", 
            alignItems: "center", borderRadius: 7,
            backgroundColor: '#b0c4de',
            paddingVertical: 5,
            elevation: 50,

          }}>
  
      
      
          
      <View style={{flexDirection: "row"}}>
      
          

          {/* ############################################ TEXTINPUT FIELD workmanship_comments ###################################################### */}
         <View style={{width: "99%", marginHorizontal: 5, marginVertical: 2}}>  
         <FloatingLabelInput
              label="Workmanship Comments"
              labelStyles={{fontSize: 12, fontWeight: "bold", backgroundColor: "#b0c4de", paddingHorizontal: 4, borderRadius: 2, paddingVertical: 1}}
              staticLabel
              customLabelStyles={{
                //colorFocused: 'red',
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
              value={FieldList["workmanship_comments"]}
              editable={true}
              onChangeText = {(newValue) => {
                  
                  var newFieldsObject = {...FieldList}
                  newFieldsObject["workmanship_comments"] = newValue
                  //Some code from placeholder
                  

                  SetFieldList(newFieldsObject)
                  storeData("FieldList", newFieldsObject, CurrentScreenId)
              }}
          />
          </View>
            {/* ############################################ TEXTINPUT FIELD workmanship_comments ends ###################################################### */}
            
          
      </View>
      
      
  </View>
  
  
  
  
      
   <View id="view12" 
    style={{marginVertical: 5, 
            borderWidth: 0, 
            borderColor: "grey", justifyContent: "center", 
            alignItems: "center", borderRadius: 7,
            backgroundColor: '#b0c4de',
            paddingVertical: 5,
            elevation: 50,

          }}>
  
      
      
          
      <View style={{flexDirection: "row"}}>
      
          

          {/* ############################################ TEXTINPUT FIELD factory_representative ###################################################### */}
         <View style={{width: "99%", marginHorizontal: 5, marginVertical: 2}}>  
         <FloatingLabelInput
              label="Factory Representative"
              labelStyles={{fontSize: 12, fontWeight: "bold", backgroundColor: "#b0c4de", paddingHorizontal: 4, borderRadius: 2, paddingVertical: 1}}
              staticLabel
              customLabelStyles={{
                //colorFocused: 'red',
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
              value={FieldList["factory_representative"]}
              editable={true}
              onChangeText = {(newValue) => {
                  
                  var newFieldsObject = {...FieldList}
                  newFieldsObject["factory_representative"] = newValue
                  //Some code from placeholder
                  

                  SetFieldList(newFieldsObject)
                  storeData("FieldList", newFieldsObject, CurrentScreenId)
              }}
          />
          </View>
            {/* ############################################ TEXTINPUT FIELD factory_representative ends ###################################################### */}
            
          
      </View>
      
      
  </View>
  
  
  
  
      
   <View id="view13" 
    style={{marginVertical: 5, 
            borderWidth: 0, 
            borderColor: "grey", justifyContent: "center", 
            alignItems: "center", borderRadius: 7,
            backgroundColor: '#e6e6fa',
            paddingVertical: 5,
            elevation: 50,

          }}>
  
      
      
          
      <View style={{flexDirection: "row"}}>
      
          
          {/* ################################################## BUTTON submit ################################################ */}
            <View style={{borderColor: "green", borderRadius: 5, marginTop: 10, borderWidth: 0, width: "80%"}}>
              <TouchableOpacity
                style={{ ...styles.openButton, marginHorizontal: 10, marginVertical: 10, alignSelf: "center"}}
                onPress={() => {
                  
                  //Some code from placeholder
              }}
              >
                <Text style={styles.textStyle}>Submit</Text>
      
              </TouchableOpacity>
            </View>
            {/* ################################################## BUTTON submit ends ################################################ */}
            
          
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

