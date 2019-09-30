import React from 'react';
import NavigationBar from '../components/NavigationBar';
import { View, Text, StyleSheet, Button } from 'react-native';
import firebase from 'firebase';


const DashboardScreen = props => {
  return (
    <View>
      <NavigationBar navigation={props.navigation}/>
    </View>
  );
};

const styles = StyleSheet.create({
  // container: {
  //   // flex: 1,
  //   // paddingTop: 0,
  //   backgroundColor: '#fff',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // }
});

export default DashboardScreen;