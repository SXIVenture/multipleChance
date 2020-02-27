import Icon from '@expo/vector-icons/FontAwesome';
import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import MapScreen from '../screen/MapScreen';
import HomeScreen from '../screen/HomeScreen';
import MessageScreen from '../screen/MessageScreen';
import ChatRoomScreen from '../screen/ChatRoomScreen';

const ChatStack = createStackNavigator(
  {
    Message: { screen: MessageScreen},
    Chat: { screen: ChatRoomScreen},
  },
  {initialRouteName: 'Chat', mode: 'card', headerMode: 'none'}
  );
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
      ChatRoom: {
        screen: ChatStack,
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
