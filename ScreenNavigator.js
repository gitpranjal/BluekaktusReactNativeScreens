import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import TextInputModal from './src/screens/TextInputModal';
import HomeScreen from "./src/screens/HomeScreen";
import ImageScreen from "./src/screens/ImageScreen"
import ScrollableDefectsInfo from "./src/components/ScrollableDefectsInfo"
import userListScreen from "./src/screens/userListScreen"
import InspectionForm from "./src/screens/InspectionForm"
import BulkOrderListScreen from "./src/screens/BulkOrderListScreen"
import CameraScreen from "./src/screens/CameraScreen"
import ImageOpeningButtonScreen from "./src/screens/ImageOpeningButtonScreen"
import ImageDrawing from "./src/screens/ImageDrawing"



const ScreenNavigator = createStackNavigator(
    {
      Home: HomeScreen,
      ImageScreen: ImageScreen,
      TextInputModal: TextInputModal,
      ScrollableDefectsInfo: ScrollableDefectsInfo,
      userListScreen: userListScreen,
      InspectionForm: InspectionForm,
      BulkOrderListScreen: BulkOrderListScreen,
      CameraScreen: CameraScreen,
      ImageOpeningButtonScreen: ImageOpeningButtonScreen,
      ImageDrawing: ImageDrawing
    },
    {
      initialRouteName: "Home",
      defaultNavigationOptions: {
        title: "App"
      }
    }
  );


  export default createAppContainer(ScreenNavigator)