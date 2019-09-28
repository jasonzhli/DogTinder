import React from 'react';
import { View, Text, StyleSheet, Button, Image } from 'react-native';

const HomeScreen = props => {
  return (
    <View style={styles.screen}>
      <Image source={require('../dog.png')} style={{ width: 200, height: 200 }}/>
      <View style={styles.welcomeContainer}>
        <Text style={{fontSize: 20}}> Welcome to Doggo Tinder!!</Text>
        <View style={styles.loginContainer}>
          <Button title="Login" />
          <Button title="Signup" />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginContainer: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  welcomeContainer: {
    padding: 20,
  }
});

export default HomeScreen;