import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Image } from 'react-native';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';


import Header from './components/Header';
import HomeScreen from './screens/HomeScreen';
import LoadingScreen from './screens/LoadingScreen';
import LoginScreen from './screens/LoginScreen';
import DashboardScreen from './screens/DashboardScreen';

import firebase from 'firebase';
import {firebaseConfig} from './config';
firebase.initializeApp(firebaseConfig);


export default function App() {
  const [enteredGoal, setEnteredGoal] = useState('');
  const [courseGoals, setCourseGoals] = useState([]);
  const [helloText, setText] = useState('Hey Michael how are you doing?');

  
  return (
    <View style={styles.screen}>
      <Header title="Doggo Tinder"></Header>
      {/* <HomeScreen /> */}
      <AppNavigator />

    </View>
  );
}

const AppSwitchNavigator = createSwitchNavigator({
  LoadingScreen: LoadingScreen,
  LoginScreen: LoginScreen,
  DashboardScreen: DashboardScreen
})

const AppNavigator = createAppContainer(AppSwitchNavigator);


const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
  input: { width: 200, borderColor: 'black', borderWidth: 0.5, padding: 15 },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
