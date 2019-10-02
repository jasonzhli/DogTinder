import React, { Component } from 'react';
import dummyData from '../dummyData';

import {
  StyleSheet,
  Text,
  View
} from 'react-native';



const EventDetailsScreen = (props) => {

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {props.navigation.getParam('details').name}{"\n"}
        {props.navigation.getParam('details').group.name}{"\n"}
        {props.navigation.getParam('details').venue.name}{"\n"}
        {props.navigation.getParam('details').venue.address_1}, {props.navigation.getParam('details').city}{"\n"}
        {"\n"}{"\n"}
        {props.navigation.getParam('details').description}
        
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  }
});

export default EventDetailsScreen;