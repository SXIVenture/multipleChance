import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import PageController from './component/PageController';
import AuthLoadingScreen from './screen/AuthLoadingScreen';
import ProfileScreen from './screen/ProfileScreen';
import LoginScreen from './screen/LoginScreen';

const AppStack = createStackNavigator({ Home: PageController });
const LoginStack = createStackNavigator({ Login: LoginScreen });
const ProfileStack = createStackNavigator({ UserInfo: ProfileScreen });

export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      App: AppStack,
      Login: LoginStack,
      Profile: ProfileStack
    },
    {
      initialRouteName: 'AuthLoading',
    }
  )
);

