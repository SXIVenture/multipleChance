import React from 'react';
import Icon from '@expo/vector-icons/FontAwesome'
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Profile from './Profile';
import Map from './Map';
import Message from './Message';

const BottomTabNavigatorConfig = {
  initialRouteName: 'Home',
  tabBarOptions: { showLabel: false }
};

const TabNavigator = createAppContainer(
  createBottomTabNavigator(
    {
      Home: {
        screen: Profile,
        navigationOptions: () => ({
          tabBarIcon: ({ tintColor }) => (
            <Icon name='user' color={tintColor} size={24} />
          )
        })
      },
      Profile: {
        screen: Map,
        navigationOptions: () => ({
          tabBarIcon: ({ tintColor }) => (
            <Icon name='thumbs-o-up' color={tintColor} size={24} />
          )
        })
      },
      Message: {
        screen: Message,
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
