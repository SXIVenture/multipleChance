import React from 'react';
import Icon from '@expo/vector-icons/FontAwesome'
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import ProfileScreen from '../screen/ProfileScreen';
import MapScreen from '../screen/MapScreen';
import MessageScreen from '../screen/MessageScreen';

const BottomTabNavigatorConfig = {
  initialRouteName: 'Home',
  tabBarOptions: { showLabel: false }
};

const TabNavigator = createAppContainer(
  createBottomTabNavigator(
    {
      Home: {
        screen: ProfileScreen,
        navigationOptions: () => ({
          tabBarIcon: ({ tintColor }) => (
            <Icon name='user' color={tintColor} size={24} />
          )
        })
      },
      Profile: {
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
