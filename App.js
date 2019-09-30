import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Image } from 'react-native';
import {createAppContainer, createSwitchNavigator, createStackNavigator} from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Icon } from 'react-native-elements';


import Header from './components/Header';
import HomeScreen from './screens/HomeScreen';
import LoadingScreen from './screens/LoadingScreen';
import LoginScreen from './screens/LoginScreen';
import DashboardScreen from './screens/DashboardScreen';
import ProfileScreen from './screens/ProfileScreen';
import DoggosScreen from './screens/DoggosScreen';
import EventsScreen from './screens/EventsScreen';
import NavigationBar from './components/NavigationBar';

import firebase from 'firebase';
import {firebaseConfig} from './config';
firebase.initializeApp(firebaseConfig);


export default function App() {
  return (
    <View style={styles.screen}>
      {/* <Header title="Doggo Tinder"></Header> */}
      <AppContainer />
    </View>
  );
}

const AuthenticationSwitchNavigator = createSwitchNavigator({
  LoadingScreen: LoadingScreen,
  LoginScreen: LoginScreen,
  DoggosScreen: DoggosScreen,
})

// const AppNavigator = createStackNavigator(
//   {
//     Auth: AuthenticationSwitchNavigator,
//     ProfileScreen: ProfileScreen,
//     DoggosScreen: DoggosScreen,
//     EventsScreen: EventsScreen,
//   }
// )

// const TabNavigator = createBottomTabNavigator({
//   ProfileScreen: ProfileScreen,
//   DoggosScreen: DoggosScreen,
//   EventsScreen: EventsScreen,
// });

// const AppContainer = createAppContainer(AppNavigator);
const AppContainer = createAppContainer(createBottomTabNavigator(
  {
    Profile: ProfileScreen,
    Doggos: AuthenticationSwitchNavigator,
    // DoggosScreen: DoggosScreen,
    Events: EventsScreen,
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
));


const styles = StyleSheet.create({
  screen: {
    flex: 1,
  }
});
