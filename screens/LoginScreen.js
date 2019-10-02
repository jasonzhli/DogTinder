import React, {useState} from 'react';
import { View, StyleSheet, Button, Image, ActivityIndicator} from 'react-native';
import * as Google from 'expo-google-app-auth';
import firebase from 'firebase';
import Header from '../components/Header';


const LoginScreen = props => {

  const isUserEqual = (googleUser, firebaseUser) => {
    if (firebaseUser) {
      var providerData = firebaseUser.providerData;
      for (var i = 0; i < providerData.length; i++) {
        if (providerData[i].providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
          providerData[i].uid === googleUser.getBasicProfile().getId()) {
          // We don't need to reauth the Firebase connection.
          return true;
        }
      }
    }
    return false;
  }

  const onSignIn = (googleUser) => {
    console.log('Google Auth Response', googleUser);
    // We need to register an Observer on Firebase Auth to make sure auth is initialized.
    var unsubscribe = firebase.auth().onAuthStateChanged(function (firebaseUser) {
      unsubscribe();
      // Check if we are already signed-in Firebase with the correct user.
      if (!isUserEqual(googleUser, firebaseUser)) {
        // Build Firebase credential with the Google ID token.
        var credential = firebase.auth.GoogleAuthProvider.credential(
          // *** googleUser.getAuthResponse().id_token);
          googleUser.idToken,
          googleUser.accessToken
        );
        // Sign in with credential from the Google user.
        firebase.auth().signInWithCredential(credential).then(function (result) {
          console.log('user signed in');
          if(result.additionalUserInfo.isNewUser) {
            firebase
              .database()
              .ref('/users/' + result.user.uid)
              .set({
                gmail: result.user.email,
                profile_picture: result.additionalUserInfo.profile.picture,
                locale: result.additionalUserInfo.profile.locale,
                first_name: result.additionalUserInfo.profile.given_name,
                last_name: result.additionalUserInfo.profile.family_name,
                created_at: Date.now()
              })
          } else {
            firebase
              .database()
              .ref('/users/' + result.user.uid).update({
                last_logged_in: Date.now()
              })
          }
        }).catch(function (error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          // ...
        });
      } else {
        console.log('User already signed-in Firebase.');
      }
    });
  }

  const signInWithGoogleAsync = async () => {
    try {
      const result = await Google.logInAsync({
        behavior: 'web',
        iosClientId: '190143165099-7419k6g6jnblku4f5tbngrcb10g2vnq3.apps.googleusercontent.com',
        scopes: ['profile', 'email'],
      });
      if (result.type === 'success') {
        onSignIn(result);
        return result.accessToken;
      } else {
        console.log('canceled');
        return { cancelled: true };
      }
    } catch (e) {
      console.log("error", e);
    }
  }

  
  return (
    <View style={styles.container}>
      <View style={styles.backgroundContainer}>
        <Image style={styles.bakcgroundImage} source={require('../dog3.jpeg')} />
      </View>
      <View>
        <Header />
      </View>
      <View style={styles.loginButton}>
        <Button 
         title="Sign In With Google"
         onPress={() => {
           signInWithGoogleAsync();
         }}
       />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  backgroundContainer: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  bakcgroundImage: {
    flex: 1,
    width: null,
    height: null
  },
  loginButton: {
    paddingBottom: 300
  }
});

export default LoginScreen;