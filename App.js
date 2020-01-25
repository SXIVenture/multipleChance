import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import firebase from 'firebase';
import PageController from './component/PageController';
import Login from './screen/LoginScreen';

// ここにFirebaseの情報をペーズト

const AppNavigator = createStackNavigator(
	{
		Home: PageController,
		Sub: Login
	},
	{
		initialRouteName: 'Home',
		defaultNavigationOptions: {
			headerShown: false
		}
	}
);

export default createAppContainer(AppNavigator);
