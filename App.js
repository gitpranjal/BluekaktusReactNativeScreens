import React, { useState } from "react"
// import { createAppContainer } from 'react-navigation';
// import { createStackNavigator } from 'react-navigation-stack';
// import TextInputModal from './src/screens/TextInputModal';
// import HomeScreen from "./src/screens/HomeScreen";
// import ImageScreen from "./src/screens/ImageScreen"
// import ScrollableDefectsInfo from "./src/components/ScrollableDefectsInfo"
// import userListScreen from "./src/screens/userListScreen"
// import InspectionForm from "./src/screens/InspectionForm"
// import BulkOrderListScreen from "./src/screens/BulkOrderListScreen"

import ScreenNavigator from "./ScreenNavigator"
import * as Font from "expo-font";
import { AppLoading } from "expo";

const fetchFonts = () => {
  return Font.loadAsync({
    "effra-heavy": require("./assets/fonts/Effra_Std_He.ttf"),
    robotoRegular: require("./assets/fonts/Roboto-Regular.ttf"),
  });
};

// const navigator = createStackNavigator(
//   {
//     Home: HomeScreen,
//     ImageScreen: ImageScreen,
//     TextInputModal: TextInputModal,
//     ScrollableDefectsInfo: ScrollableDefectsInfo,
//     userListScreen: userListScreen,
//     InspectionForm: InspectionForm,
//     BulkOrderListScreen: BulkOrderListScreen
//   },
//   {
//     initialRouteName: "Home",
//     defaultNavigationOptions: {
//       title: "App"
//     }
//   }
// );

// export default createAppContainer(navigator);

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
      />
    );
  }
  return <ScreenNavigator/>
}