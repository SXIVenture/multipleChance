import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import createStackNavigator from 'react-navigation-stack';
import PageController from './component/PageController';
import AuthLoadingScreen from './screen/AuthLoadingScreen';
import RegisterScreen from './screen/RegisterScreen';

const AppStack = createStackNavigator({ Home: PageController });
const AuthStack = createStackNavigator({ Login: RegisterScreen });

export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      App: AppStack,
      Auth: AuthStack,
    },
    {
      initialRouteName: 'AuthLoading',
    }
  )
);

