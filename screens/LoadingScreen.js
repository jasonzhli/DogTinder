import React, {useEffect} from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import firebase from 'firebase';

const LoadingScreen = (props) => {
  const checkIfLoggedIn = () => {
    firebase.auth().onAuthStateChanged((user)=>{
      if (user){
        props.navigation.navigate('HomeScreen');
      }
      else {
        props.navigation.navigate('LoginScreen');
      }
    })
  }

  useEffect(() => {
    checkIfLoggedIn();
  }, [])

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default LoadingScreen;