import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import PageController from './component/PageController';
import AuthLoadingScreen from './screen/AuthLoadingScreen';
import ProfileScreen from './screen/ProfileScreen';
import LoginScreen from './screen/LoginScreen';

export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      App: PageController,
      Login: LoginScreen,
      Profile: ProfileScreen,
    },
    {
      initialRouteName: 'AuthLoading',
    }
  )
);

