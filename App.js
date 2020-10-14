import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import TextInputModal from './src/screens/TextInputModal';
import HomeScreen from "./src/screens/HomeScreen";
import ImageScreen from "./src/screens/ImageScreen"
const navigator = createStackNavigator(
  {
    Home: HomeScreen,
    ImageScreen: ImageScreen,
    TextInputModal: TextInputModal
  },
  {
    initialRouteName: "Home",
    defaultNavigationOptions: {
      title: "App"
    }
  }
);

export default createAppContainer(navigator);
