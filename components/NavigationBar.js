import React from 'react';
import { View, Text, StyleSheet, Image, Button } from 'react-native';

const NavigationBar = props => {
  return (
    <View style={styles.header}>
      <Button title="Profile" onPress={() => {props.navigation.navigate('ProfileScreen')}}/>
      <Button title="Doggos" onPress={() => {props.navigation.navigate('DoggosScreen')}}/>
      <Button title="Events" onPress={() => {props.navigation.navigate('EventsScreen')}}/>
    </View>
  )
};

const styles = StyleSheet.create({
  header: {
    padding: 100,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '100%',
    backgroundColor: '#FFD700'
  }
});

export default NavigationBar;