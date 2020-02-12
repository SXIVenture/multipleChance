import Icon from '@expo/vector-icons/FontAwesome';
import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import MapScreen from '../screen/MapScreen';
import MessageScreen from '../screen/MessageScreen';
import HomeScreen from '../screen/HomeScreen';


const BottomTabNavigatorConfig = {
  initialRouteName: 'Profile',
  tabBarOptions: { showLabel: false }
};

const TabNavigator = createAppContainer(
  createBottomTabNavigator(
    {
      Profile: {
        screen: HomeScreen,
        navigationOptions: () => ({
          tabBarIcon: ({ tintColor }) => (
            <Icon name='user' color={tintColor} size={24} />
          )
        })
      },
      Map: {
        screen: MapScreen,
        navigationOptions: () => ({
          tabBarIcon: ({ tintColor }) => (
            <Icon name='thumbs-o-up' color={tintColor} size={24} />
          )
        })
      },
      Message: {
        screen: MessageScreen,
        navigationOptions: () => ({
          tabBarIcon: ({ tintColor }) => (
            <Icon name='send-o' color={tintColor} size={24} />
          )
        })
      },
    },
    BottomTabNavigatorConfig
  )
);

export default TabNavigator;
