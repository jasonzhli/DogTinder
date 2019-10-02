import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Image } from 'react-native';
import { createAppContainer, createSwitchNavigator, TabNavigator, createStackNavigator} from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Icon } from 'react-native-elements';


import LoadingScreen from './screens/LoadingScreen';
import LoginScreen from './screens/LoginScreen';
import ProfileScreen from './screens/ProfileScreen';
import DoggosScreen from './screens/DoggosScreen';
import EventsScreen from './screens/EventsScreen';
import EventDetailsScreen from './screens/EventDetailsScreen';

import firebase from 'firebase';
import {firebaseConfig} from './config';
firebase.initializeApp(firebaseConfig);

console.disableYellowBox = true;

export default function App() {
  return (
    <View style={styles.screen}>
      <AppContainer />
    </View>
  );
}

const EventStack = createStackNavigator({
  EventsScreen: EventsScreen,
  EventDetailsScreen: EventDetailsScreen
});

EventStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible;
  if (navigation.state.routes.length > 1) {
    navigation.state.routes.map(route => {
      if (route.routeName === "EventDetailsScreen") {
        tabBarVisible = false;
      } else {
        tabBarVisible = true;
      }
    });
  }

  return {
    tabBarVisible
  };
};


const Tabs = createBottomTabNavigator(
  {
    Profile: ProfileScreen,
    Doggos: DoggosScreen,
    Events: EventStack,
  },
  {
    initialRouteName: 'Doggos',
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Events') {
          iconName = `event`;
        } else if (routeName === 'Profile') {
          iconName = `person`;
        } else if (routeName === 'Doggos') {
          iconName = `favorite`;
        }

        return <Icon name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    },
  }
)

const AuthenticationSwitchNavigator = createSwitchNavigator({
  LoadingScreen: LoadingScreen,
  LoginScreen: LoginScreen,
  HomeScreen: Tabs,
})

const AppContainer = createAppContainer(AuthenticationSwitchNavigator);


const styles = StyleSheet.create({
  screen: {
    flex: 1,
  }
});

