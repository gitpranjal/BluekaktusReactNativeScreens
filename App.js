import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import TextInputModal from './src/screens/TextInputModal';
import HomeScreen from "./src/screens/HomeScreen";
import ImageScreen from "./src/screens/ImageScreen"
import ScrollableDefectsInfo from "./src/components/ScrollableDefectsInfo"
const navigator = createStackNavigator(
  {
    Home: HomeScreen,
    ImageScreen: ImageScreen,
    TextInputModal: TextInputModal,
    ScrollableDefectsInfo: ScrollableDefectsInfo
  },
  {
    initialRouteName: "Home",
    defaultNavigationOptions: {
      title: "App"
    }
  }
);

export default createAppContainer(navigator);
