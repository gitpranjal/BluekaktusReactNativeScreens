import React, { useState } from "react"
import { View, Text, Button, TouchableHighlight, FlatList, StyleSheet, Modal, TextInput, Keyboard, CheckBox } from "react-native"
import userCard from "../components/UserCard"
import UserCard from "../components/UserCard"
import { Dimensions } from 'react-native';
import { withOrientation } from "react-navigation";


async function getUserList() 
{
  let response = await fetch(
                          "https://qualitylite.bluekaktus.com/api/bkquality/users/getUserList",
                          {
                            method: "POST",
                            body: JSON.stringify({
                              basicparams: {
                                companyID: 1,
                              //   userID: 13,
                              },

                            }),
                            headers: {
                              "Content-Type": "application/json",
                              Accept: "application/json",
                            },
                          }
                        )
  let data = await response.json()
  return data;
}

const userListScreen =  () => {

   

    const screenHeight = Dimensions.get('window').height

    const [UserAdditionModalVisible, SetUserAdditionModalVisible] = useState(false)
    const [UserFirstName, SetUserFirstName] = useState("")
    const [UserLastName, SetUserLastName] = useState("")
    const [EmailId, SetEmailId] = useState("")
    const [Phone, SetPhone] = useState("")
    const [Location, SetRoleType] = useState("")

    const roleNames = ["Edit Brand", "Edit Style", "Edit Size", "Edit Color", "Edit Company", "Edit Factory"]
    const [roles, SetRoles] = useState({"Edit Brand": false, "Edit Style": false, "Edit Color": false, "Edit Company": false, "Edit Factory": false})

    exampleList = [
        {
            "userID": 1,
            "companyID": 1,
            "userFName": "admin",
            "userLName": "",
            "loginID": "admin@bluekaktus.com",
            "phoneNo": "7838786206",
            "userRoleID": 4,
            "userRoleDesc": "Admin"
        },
        {
            "userID": 10,
            "companyID": 1,
            "userFName": "merchant",
            "userLName": "",
            "loginID": "merchant@bluekaktus.com",
            "phoneNo": "9192939495",
            "userRoleID": 5,
            "userRoleDesc": "Merchant"
        },
        {
            "userID": 11,
            "companyID": 1,
            "userFName": "manager",
            "userLName": "",
            "loginID": "manager@bluekaktus.com",
            "phoneNo": "9192939495",
            "userRoleID": 6,
            "userRoleDesc": "Quality Manager"
        },
        {
            "userID": 12,
            "companyID": 1,
            "userFName": "auditor",
            "userLName": "",
            "loginID": "auditor@bluekaktus.com",
            "phoneNo": "9192939495",
            "userRoleID": 7,
            "userRoleDesc": "Quality Auditor"
        },
        {
            "userID": 13,
            "companyID": 1,
            "userFName": "checker",

            "userLName": "",
            "loginID": "checker@bluekaktus.com",
            "phoneNo": "9192939495",
            "userRoleID": 8,
            "userRoleDesc": "Quality Controller"
        }
    ]

    const [userList, SetUserList] = useState([])

    // getUserList()
    // .then((data) => {
    //   console.log(data.result)
    //   SetUserList(data.result)
      
    // })
    
      fetch(
        "https://qualitylite.bluekaktus.com/api/bkquality/users/getUserList",
        {
          method: "POST",
          body: JSON.stringify({
            basicparams: {
              companyID: 1,
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
        console.log(body.result)
        SetUserList(body.result)
      })

  

    return (
        <View>
            <TouchableHighlight onPress={() => SetUserAdditionModalVisible(true)}>
                <View style={{alignItems:"center", marginTop: 20, borderColor: "#00008b", borderWidth: 2}}>
                    <Text style={{color: "#00008b", marginVertical: 5, fontWeight: "bold"}}>Add new user</Text>
                </View>
            </TouchableHighlight>
            <View style={{marginTop: 50}}>

            <FlatList 
                // style={{flex: 1}}
                // contentContainerStyle={{ flexDirection: 'column', flexGrow: 1}}
                // data={[{key:"1", text:"AFYFJGFJF"}, {key:"2", text:"B"}, {key:"3", text:"B"}, {key:"4", text:"B"}, {key:"5", text:"B"}]}
                data={userList}
                keyExtractor={(userCardData) => userCardData.userID.toString()}
                renderItem={({item}) => {
                return (
                
                    <TouchableHighlight
                    //   style={{...styles.openButtonForBottomScrollView, flexGrow: 1}}
                    //   onPress={() => {
                    //   setModalVisible(true);
                    //   setDefectTitle(item.title)
                    //   setDefectDetail(item.text)
                    //   SetDefectCoordinateX(item.x)
                    //   SetDefectCoordinateY(item.y)
                    //   }}
                    >
                <UserCard
                    userCardData={item}
                
                ></UserCard>
                </TouchableHighlight>

                )
                }}
            />
            </View>


            <Modal
                animationType="slide"
                // transparent={true}
                visible={UserAdditionModalVisible}
                onRequestClose={() => {
                    SetUserAdditionModalVisible(false)
                }}
            >
                  <View style={{...styles.centeredView, backgroundColor: 'rgba(0, 0, 0, 0.5)'}} >
                  <View style={{...styles.modalView, width:"90%", height: 0.85*screenHeight, backgroundColor:"#4682b4", position: 'absolute'}}>
                     
                    {/* <Text style={{color:"white", marginLeft: 7}}>FIRST NAME</Text> */}
                    <View style={{backgroundColor: "white", borderRadius: 10}}>
                        <Text style={{margin: 5, color: "#4682b4", fontWeight: "bold"}}>NEW USER DETAILS</Text>
                    </View>
                    
                    <View style={{marginTop: 25}}>

                        <View style={{ ...styles.textInput, elevation: 10,  justifyContent: 'center',  backgroundColor: 'white', margin: 7, height: 50,  width: 250, borderColor: "#F194FF", borderWidth:2}}>
                            <TextInput
                                style= {{marginLeft: 4}}
                                placeholder="First Name"
                                maxLength={20}
                                onBlur={Keyboard.dismiss}
                                value={UserFirstName}
                                onChangeText={(newText) => {
                                    SetUserFirstName(newText)
                                }}
                            />
                        </View>
                        
                        
                        <View style={{ ...styles.textInput, elevation: 10,  justifyContent: 'center',  backgroundColor: 'white', margin: 7, height: 50,  width: 250, borderColor: "#F194FF", borderWidth:2}}>
                            <TextInput
                                style= {{marginLeft: 4}}
                            placeholder="Last Name"
                            maxLength={20}
                            onBlur={Keyboard.dismiss}
                            value={UserLastName}
                            onChangeText={(newText) => {
                                SetUserLastName(newText)
                            }}
                            />
                        </View>

                        {/* <Text style={{color:"white", right: "43%"}}>EMAIL ID</Text> */}
                        <View style={{ ...styles.textInput, elevation: 10, justifyContent: 'center',  backgroundColor: 'white', margin: 7, height: 50,  width: 250, borderColor: "#F194FF", borderWidth:2}}>
                            <TextInput
                            style= {{marginLeft: 4}}
                            placeholder="Email Id"
                            maxLength={20}
                            onBlur={Keyboard.dismiss}
                            value={EmailId}
                            onChangeText={(newText) => {
                                SetEmailId(newText)
                            }}
                            />
                        </View>

                        {/* <Text style={{color:"white", right: "43%"}}>Phone Number</Text> */}
                        <View style={{ ...styles.textInput, elevation: 10, justifyContent: 'center',  backgroundColor: 'white', margin: 7, height: 50,  width: 250, borderColor: "#F194FF", borderWidth:2}}>
                            <TextInput
                            style= {{marginLeft: 4}}
                            placeholder="Phone Number"
                            maxLength={20}
                            onBlur={Keyboard.dismiss}
                            value={Phone}
                            onChangeText={(newText) => {
                                SetPhone(newText)
                            }}
                            />
                        </View>

                        {/* <Text style={{color:"white", right: "43%"}}>User Type</Text> */}
                        <View style={{ ...styles.textInput, elevation: 10,  justifyContent: 'center',  backgroundColor: 'white', margin: 7, height: 50,  width: 250, borderColor: "#F194FF", borderWidth:2}}>
                            <TextInput
                            style= {{marginLeft: 4}}
                            placeholder="Location"
                            maxLength={20}
                            onBlur={Keyboard.dismiss}
                            value={Location}
                            onChangeText={(newText) => {
                                SetRoleType(newText)
                            }}
                            />
                        </View>

                    </View>
                    

                    
                    <View style={{...styles.floatView, elevation: 25, borderRadius: 5}}>

                        <FlatList 
                            data={roleNames}
                            keyExtractor={(roleName) => roleName.split(" ")[1]}  
                            renderItem = {({item}) => {

                                return (

                                    <View style={styles.checkboxContainer}>
                    
                                        <CheckBox
                                            // style={{alignSelf: "center"}}
                                            value={roles[item]}
                                            onValueChange={() => {
                                                const newRoles = {...roles}
                                                newRoles[item] = !roles[item]
                                                
                                                SetRoles(newRoles)
                                            }}
                                            // style={styles.checkbox}
                                        />
                                        <Text style={{margin:8}}>{item}</Text>
                                    </View>

                                )

                            }}  
                        
                        />

                    </View>

                    <TouchableHighlight
                    style={{ ...styles.openButton, backgroundColor: "#ff69b4", top:195 }}
                    onPress={() => {
                        // console.log("#####"+DefectDetail)
                        
            
                        //   const request = {
                        //     "method": "POST",
                        //     "header": [],
                        //     "body": {
                        //       "mode": "raw",
                        //       "raw": {
                        //         "basicparams": {
                        //           "companyID": 1,
                        //           "userID": 13
                        //         },
                        //         "userParams": {
                        //           "companyID": 1,
                        //           "userFname": "FNAME",
                        //           "userLname": "LNAME",
                        //           "loginID": "abc@company.com",
                        //           "emailID": "abc@company.com",
                        //           "loginPwd": "LOGINinHASHform",
                        //           "phoneNo": "7848584194",
                        //           "mobileNo": "3527623564",
                        //           "userRoleID": 4,
                        //           "userPermissionsParams": {
                        //             "editBrand": 1,
                        //             "editSize": 1,
                        //             "editStyle": 1,
                        //             "editColor": 0,
                        //             "editCompany": 1,
                        //             "editFactory": 1
                        //           }
                        //         }
                        //       },
                        //       "options": {
                        //         "raw": {
                        //           "language": "json"
                        //         }
                        //       }
                        //     }
                        //   }

                        const request = {
                            "method": "POST",
                            "header": [],
                            "body": {
                              "mode": "raw",
                              "raw": {
                                "basicparams": {
                                  "companyID": 1,
                                  "userID": 13
                                },
                                "userParams": {
                                  "companyID": 1,
                                  "userFname": UserFirstName,
                                  "userLname": UserLastName,
                                  "loginID": EmailId,
                                  "emailID": EmailId,
                                  "loginPwd": "LOGINinHASHform",
                                  "phoneNo": Phone.toString(),
                                  "mobileNo": Phone.toString(),
                                  "userRoleID": 4,
                                  "userPermissionsParams": {
                                    "editBrand": (roles["Edit Brand"] === true) ? 1 : 0,
                                    "editSize": (roles["Edit Size"] === true) ? 1 : 0,
                                    "editStyle": (roles["Edit Style"] === true) ? 1 : 0,
                                    "editColor": (roles["Edit Color"] === true) ? 1 : 0,
                                    "editCompany": (roles["Edit Company"] === true) ? 1 : 0,
                                    "editFactory": (roles["Edit Factory"] === true) ? 1 : 0
                                  }
                                }
                              },
                              "options": {
                                "raw": {
                                  "language": "json"
                                }
                              }
                            }
                          }

                        console.log("#### Request Object: ")
                        console.log(request)

                        SetUserAdditionModalVisible(!UserAdditionModalVisible);
                        SetUserFirstName("")
                        SetUserLastName("")
                        SetEmailId("")
                        SetPhone("")
            
                    }}
                    >
                    <Text style={{...styles.textStyle}}>Done</Text>
                </TouchableHighlight>
                    </ View>
                  </ View>
                  
            </Modal>

        </View>
        
       
    )
}

const styles = StyleSheet.create({
    title: {
      fontSize: 30,
      alignSelf: "stretch",
      color: "white",
      backgroundColor: "#00008b"
    },
    
    card: {
      borderColor: "#00008b",
      borderWidth: 2,
      height: 100,
    
    },
    openButton: {
        backgroundColor: "#2196F3",
        borderRadius: 20,
        padding: 10,
        elevation: 10
      },

      modalView: {

        margin: 20,
        backgroundColor: "white",
        borderRadius: 10,
        borderColor: "#00008b",
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
      },
      centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
      },
      floatView: {
        position: 'absolute',
        width: '100%',
        height: "25%",
        bottom: "13%" ,
        alignSelf: 'center',
        // left: 40,
        backgroundColor: 'white',
      },
      checkboxContainer: {
        flexDirection: "row",
        marginBottom: 20,
      },
  });

export default userListScreen